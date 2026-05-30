import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Radio, Shield, Quote } from 'lucide-react';

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
  laserColor = "rgba(255, 255, 255, 0.45)"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
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
      className={`px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 ${className}`}
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
  story
}: {
  isOpen: boolean;
  onClose: () => void;
  story: any;
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
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
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
            <div className="bg-slate-950/60 rounded-[2rem] border border-white/5 p-6 mb-6 relative overflow-hidden flex flex-col justify-center h-72">
              {/* Scanline laser line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />

              {/* Center Equalizer & Telemetry */}
              <div className="flex flex-col justify-center">
                <AudioWaveVisualizer />
              </div>
            </div>

            {/* Playback Control Bar */}
            <div className="mb-6 flex flex-col gap-2 font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-400 select-none">
                <span>{formatTime(playbackTime)}</span>
                <span className="text-indigo-400 font-bold">ALUMNI STICKER FEED</span>
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
              <Quote className="absolute -top-4 -left-4 text-indigo-500/10 w-16 h-16 pointer-events-none" />
              <p className="text-slate-300 font-semibold italic text-center text-sm md:text-base leading-relaxed relative z-10 px-4">
                "{story.quote}"
              </p>
            </div>

            {/* Profile Footer */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{story.name}</h4>
                <div className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase mt-0.5">{story.result} Alumni</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SuccessCard = ({
  story,
  index,
  hoveredIndex,
  setHoveredIndex,
  onPlayClick
}: {
  story: any;
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
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col bg-white/5 border-white/10 ${
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
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

      {/* Profile avatar with spinning concentric HUD orbits */}
      <div className="relative mb-10 inline-block self-start select-none" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-8px] border border-dashed border-white/10 rounded-[2.5rem] pointer-events-none opacity-60 animate-spin" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-[-4px] border border-white/5 rounded-[2.2rem] pointer-events-none" />

        <div className="w-24 h-24 rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 relative z-10 shrink-0">
          <img src={story.img} alt={story.name} className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700" />
        </div>

        {/* Bouncing Play Button Badge */}
        <button 
          onClick={onPlayClick}
          className="absolute -bottom-3 -right-3 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover/card:scale-110 transition-transform pointer-events-auto cursor-pointer border border-indigo-500 z-20"
        >
          <Play size={16} fill="white" className="text-white animate-pulse" />
        </button>
      </div>

      <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight" style={{ transform: "translateZ(20px)" }}>
        {story.name}
      </h3>
      
      <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6" style={{ transform: "translateZ(15px)" }}>
        {story.result}
      </div>
      
      <p className="text-slate-400 font-semibold leading-relaxed italic-small" style={{ transform: "translateZ(10px)" }}>
        "{story.quote}"
      </p>

    </motion.div>
  );
};

export const SuccessStories = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);

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

  const stories = [
    { name: "Rahul Deshpande", result: "IIT Bombay CSE", quote: "The 24/7 doubt portal and the small batch size kept me focused when things got hard.", img: "https://i.pravatar.cc/300?u=r2" },
    { name: "Priya Sharma", result: "AIIMS Delhi", quote: "I learned how to visualize biology. That was the game changer for me during NEET.", img: "https://i.pravatar.cc/300?u=p1" },
    { name: "Vikram Roy", result: "COEP Pune", quote: "MHT-CET is about speed. AcademyPro's test series taught me exactly how to manage time.", img: "https://i.pravatar.cc/300?u=v4" },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="select-none">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-md"
            >
              <Shield size={11} className="text-indigo-400 animate-pulse" />
              <span>Alumni Achievements</span>
            </motion.div>

            <h2 className="text-5xl font-black text-white tracking-tighter mb-6 uppercase leading-none">
              Student Success{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
                Stories.
              </span>
            </h2>
            <p className="text-slate-400 font-semibold max-w-xl opacity-80 leading-relaxed text-sm md:text-base italic-small">
              Deep-dive into the journeys of students who transformed their dreams into reality.
            </p>
          </div>
          
          <MagneticActionButton onClick={() => setSelectedStory(stories[0])}>
            Watch Video Stories
          </MagneticActionButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <SuccessCard
              key={i}
              story={story}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              onPlayClick={() => setSelectedStory(story)}
            />
          ))}
        </div>
      </div>

      {/* Cybernetic Video HUD Overlay Modal */}
      <VideoHUDModal
        isOpen={selectedStory !== null}
        onClose={() => setSelectedStory(null)}
        story={selectedStory || stories[0]}
      />
    </section>
  );
};
