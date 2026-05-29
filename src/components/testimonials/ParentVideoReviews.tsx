import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, X, Radio, Shield, Heart } from 'lucide-react';

const SparkParticlesTrail = ({ coords, colorClass }: { coords: { x: number; y: number }; colorClass: string }) => {
  const [sparks, setSparks] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (coords.x === 0 && coords.y === 0) return;
    setSparks((prev) => {
      const next = [{ x: coords.x, y: coords.y, id: Math.random() }, ...prev];
      return next.slice(0, 3);
    });
  }, [coords]);

  return (
    <>
      {sparks.map((spark, idx) => (
        <div
          key={spark.id}
          className={`absolute pointer-events-none rounded-full blur-[1px] transition-all duration-300 ${colorClass}`}
          style={{
            left: spark.x,
            top: spark.y,
            width: `${5 - idx * 1.2}px`,
            height: `${5 - idx * 1.2}px`,
            opacity: 0.6 - idx * 0.15,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        />
      ))}
    </>
  );
};

const MagneticActionButton = ({
  children,
  onClick,
  className,
  isSecondary = false,
  laserColor = "rgba(99, 102, 241, 0.25)"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isSecondary?: boolean;
  laserColor?: string;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setPosition({
      x: (x - centerX) * 0.25,
      y: (y - centerY) * 0.25
    });
    setBtnCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className={`px-6 py-3 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 ${className} ${
        isSecondary
          ? 'bg-slate-900 border border-white/10 text-white hover:bg-slate-800'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
      }`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

const AudioWaveVisualizer = () => {
  return (
    <div className="flex items-end justify-center gap-1.5 h-20 my-8 select-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full"
          animate={{
            height: [
              "10px",
              `${Math.floor(Math.random() * 65) + 15}px`,
              "10px"
            ]
          }}
          transition={{
            duration: 0.6 + (i % 4) * 0.15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const VideoHUDModal = ({
  isOpen,
  onClose,
  review
}: {
  isOpen: boolean;
  onClose: () => void;
  review: any;
}) => {
  const [playbackTime, setPlaybackTime] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPlaybackTime((prev) => (prev >= 75 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-955/85 backdrop-blur-md bg-slate-950/80"
          />

          {/* Modal Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0b0f1e]/95 border border-white/10 rounded-[3rem] p-8 md:p-10 max-w-lg w-full relative overflow-hidden backdrop-blur-2xl z-10 shadow-2xl shadow-indigo-500/10"
          >
            {/* macOS Dot Indicators */}
            <div className="flex items-center gap-1.5 absolute top-6 left-8 select-none">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>

            {/* Title / Close Bar */}
            <div className="flex justify-end mb-6">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* Video Bezel Screen Viewport */}
            <div className="bg-slate-955/60 rounded-[2rem] border border-white/5 p-6 mb-6 relative overflow-hidden flex flex-col justify-between h-72">
              {/* Scanline laser line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />

              {/* Header Status Row */}
              <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-500 select-none">
                <div className="flex items-center gap-1.5">
                  <Radio size={8} className="text-rose-500 animate-pulse" />
                  <span>[PLAYBACK: GUARDIAN_REVIEW]</span>
                </div>
                <div>[SOURCE_ID: {review.name.replace(/[^A-Za-z0-9]/g, '_')}]</div>
              </div>

              {/* Center Equalizer & Telemetry */}
              <div className="flex-1 flex flex-col justify-center">
                <AudioWaveVisualizer />
                <p className="text-center font-mono text-[9px] text-indigo-400 uppercase tracking-wider select-none animate-pulse">
                  &lt; STREAMING PARENTAL INSIGHT &gt;
                </p>
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="flex items-end justify-between font-mono text-[8px] text-slate-500 mt-4 select-none">
                <div className="flex flex-col items-start gap-1">
                  <span>[LOCATION: {review.location.toUpperCase()}]</span>
                  <span>[STREAM_FPS: 60.00]</span>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span>[VOLUME: 100% // VERIFIED]</span>
                  <span>[STATUS: SECURE_LINK]</span>
                </div>
              </div>
            </div>

            {/* Playback Control Bar */}
            <div className="mb-6 flex flex-col gap-2 font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-400 select-none">
                <span>{formatTime(playbackTime)}</span>
                <span className="text-indigo-400 font-bold">PARENT STICKER FEED</span>
                <span>01:15</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  style={{ width: `${(playbackTime / 75) * 100}%` }}
                />
              </div>
            </div>

            {/* Testimonial Quote inside Modal */}
            <div className="mb-8 relative select-none">
              <p className="text-slate-300 font-semibold italic text-center text-sm md:text-base leading-relaxed relative z-10 px-4">
                "{review.desc}"
              </p>
            </div>

            {/* Profile Footer */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{review.name}</h4>
                <div className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase mt-0.5">{review.location} Campus Parent</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ParentVideoCard = ({
  rev,
  index,
  hoveredIndex,
  setHoveredIndex,
  onPlayClick
}: {
  rev: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  onPlayClick: () => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  const isSelfHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`aspect-[16/10] rounded-[4rem] overflow-hidden border transition-all duration-500 relative bg-white/5 border-white/10 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_0_50px_rgba(99,102,241,0.15)] border-indigo-500/30 bg-white/10'
          : isDimmed
            ? 'opacity-40 scale-[0.985] blur-[0.5px] border-white/5'
            : 'shadow-2xl'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      <img 
        src={rev.img} 
        alt={rev.name} 
        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 absolute inset-0"
        style={{
          filter: isSelfHovered ? 'grayscale(0) scale(1.05)' : 'grayscale(1) opacity(0.4)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

      {/* Orbit Play Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(25px)" }}>
        <button 
          onClick={onPlayClick}
          className="w-20 h-20 bg-[#FAF9F6] text-slate-950 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform pointer-events-auto cursor-pointer hover:bg-indigo-500 hover:text-white"
        >
          <PlayCircle size={32} fill="currentColor" opacity="0.3" className="animate-pulse" />
        </button>
      </div>

      <div className="absolute bottom-10 left-10 right-10 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">
          <Heart size={14} className="text-rose-500 animate-pulse" /> Trusted Review
        </div>
        <h4 className="text-2xl font-bold text-white mb-1 tracking-tight">{rev.name}</h4>
        <p className="text-indigo-200 text-sm font-medium opacity-60 italic-small">"{rev.desc}"</p>
      </div>
    </motion.div>
  );
};

export const ParentVideoReviews = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const reviews = [
    { name: "Mrs. Sunita Verma", location: "Pune", desc: "How AcademyPro's discipline helped my son.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" },
    { name: "Mr. Ramesh K.", location: "Mumbai", desc: "Transparent fee structure and great results.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-24 bg-[#060813] border-t border-white/5 relative overflow-hidden"
    >
      {/* Visual divider label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-4 bg-indigo-600 text-white font-black uppercase tracking-[0.3em] rounded-full text-xs shadow-2xl z-20 select-none">
        Parental Perspective
      </div>

      {/* Deep Space Coordinates Grid Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic spotlight nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(6, 8, 19, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Guidelines layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        <div className="text-center mb-24 select-none">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase leading-none">
            Parent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
              Video Reviews.
            </span>
          </h2>
          <p className="text-slate-400 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Hear directly from the guardians of our success stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reviews.map((rev, i) => (
            <ParentVideoCard
              key={i}
              rev={rev}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              onPlayClick={() => setSelectedReview(rev)}
            />
          ))}
        </div>
      </div>

      {/* Cybernetic Video HUD Overlay Modal */}
      <VideoHUDModal
        isOpen={selectedReview !== null}
        onClose={() => setSelectedReview(null)}
        review={selectedReview || reviews[0]}
      />
    </section>
  );
};
