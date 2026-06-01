import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, X, Radio, Shield, Star, Volume2 } from 'lucide-react';

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

const MagneticPlayButton = ({
  onClick,
  themeColor
}: {
  onClick: () => void;
  themeColor: string;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setPosition({
      x: (x - centerX) * 0.35,
      y: (y - centerY) * 0.35
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20",
    amber: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20"
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 12 }}
      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors relative overflow-hidden group/btn ${colorMap[themeColor] || colorMap.indigo}`}
    >
      {/* Outer rotating vector dashes */}
      <div className="absolute inset-1 border border-dashed border-white/30 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '6s' }} />
      <PlayCircle size={22} className="relative z-10 group-hover/btn:scale-110 transition-transform" />
    </motion.button>
  );
};

const AudioWaveVisualizer = () => {
  return (
    <div className="flex items-end justify-center gap-1.5 h-16 my-6 select-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full"
          animate={{
            height: [
              "8px",
              `${Math.floor(Math.random() * 50) + 12}px`,
              "8px"
            ]
          }}
          transition={{
            duration: 0.5 + (i % 3) * 0.15,
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
  video
}: {
  isOpen: boolean;
  onClose: () => void;
  video: any;
}) => {
  const [playbackTime, setPlaybackTime] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPlaybackTime((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hudColors: Record<string, string> = {
    indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-950/20",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20",
    amber: "text-amber-400 border-amber-500/20 bg-amber-950/20"
  };

  const activeColor = hudColors[video.themeColor] || hudColors.indigo;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
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
            className="bg-[#0c0f1d]/95 border border-white/10 rounded-[3rem] p-8 md:p-10 max-w-lg w-full relative overflow-hidden backdrop-blur-2xl z-10 shadow-2xl shadow-indigo-500/10"
          >
            {/* macOS Chrome Dots */}
            <div className="flex items-center gap-1.5 absolute top-6 left-8">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>

            {/* Close Bar */}
            <div className="flex justify-end mb-6">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* Video Bezel Screen Viewport */}
            <div className="bg-slate-950/80 rounded-[2rem] border border-white/5 p-6 mb-6 relative overflow-hidden flex flex-col justify-between h-64">
              {/* Scanline laser animation */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />

              {/* Status Header */}
              <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Radio size={8} className="text-rose-500 animate-pulse" />
                  <span>[PLAYBACK: ACTIVE_FEED]</span>
                </div>
                <div>[ID: {video.badgeCode.replace(/\s+/g, '')}]</div>
              </div>

              {/* Audio Wave Visualizer */}
              <div className="flex-1 flex flex-col justify-center">
                <AudioWaveVisualizer />
                <p className="text-center font-mono text-[8px] text-slate-500 uppercase tracking-widest animate-pulse">
                  &lt; SYSTEM DECODING VIDEO BROADCAST &gt;
                </p>
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="flex items-end justify-between font-mono text-[8px] text-slate-500 mt-2">
                <div className="flex flex-col items-start gap-0.5">
                  <span>[DECRYPT: SECURE]</span>
                  <span>[STREAM_TYPE: MPEG_4]</span>
                </div>
                <div className="text-right flex flex-col items-end gap-0.5">
                  <span className="flex items-center gap-1"><Volume2 size={8} /> 100% // READY</span>
                  <span>[INTEGRITY: MATCHED]</span>
                </div>
              </div>
            </div>

            {/* Playback Progress Indicator */}
            <div className="mb-6 flex flex-col gap-2 font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>{formatTime(playbackTime)}</span>
                <span className="text-indigo-400 font-bold uppercase tracking-widest">ALUMNI BROADCAST</span>
                <span>01:00</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  style={{ width: `${(playbackTime / 60) * 100}%` }}
                />
              </div>
            </div>

            {/* Quote details inside modal */}
            <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-2xl relative">
              <p className="text-slate-300 font-semibold italic text-center text-xs md:text-sm leading-relaxed relative z-10 px-2">
                "We had structured schedules, standard-breaking tests, and conceptual clarity that allowed me to approach examination boards and competitive exams with zero doubt."
              </p>
            </div>

            {/* Profile Footer */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                <img src={video.img} alt={video.student} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{video.student}</h4>
                <div className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase mt-0.5">{video.rank}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const VideoTestimonialCard = ({
  vid,
  index,
  hoveredIndex,
  setHoveredIndex,
  onPlayClick
}: {
  vid: any;
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
      className={`rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md group/card bg-white/70 border-slate-200/50 ${
        isSelfHovered
          ? 'scale-[1.03] shadow-[0_20px_50px_rgba(99,102,241,0.1)] border-indigo-500/20'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.03 : 1}, ${isSelfHovered ? 1.03 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Razor-thin laser border highlight */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${vid.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate particles sparks */}
      <SparkParticlesTrail coords={coords} colorClass={vid.sparkClass} />

      {/* Image container with grayscale-to-color transition */}
      <div className="aspect-video w-full relative overflow-hidden border-b border-slate-100 shrink-0">
        <img
          src={vid.img}
          alt={vid.title}
          className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 scale-100 group-hover/card:scale-105 transition-all duration-700 pointer-events-none"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Info console footer */}
      <div className="p-8 relative z-10" style={{ transform: "translateZ(20px)" }}>
        {/* Monospaced Technical Badge */}
        <div className="flex items-center gap-2 mb-4 font-mono text-[7.5px] text-slate-400">
          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded">[ID: {vid.badgeCode}]</span>
          <span>★</span>
          <span className="text-slate-500 font-bold uppercase">ALUMNI BROADCAST</span>
        </div>

        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-4 uppercase leading-none group-hover/card:text-indigo-600 transition-colors">
          {vid.title}
        </h3>

        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">{vid.rank}</span>
            <span className="text-sm font-black text-slate-700 uppercase leading-none">{vid.student}</span>
          </div>
          
          <MagneticPlayButton
            onClick={onPlayClick}
            themeColor={vid.themeColor}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const StudentVideoTestimonials = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

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

  const videos = [
    { 
      title: "Cracking JEE Advanced", 
      student: "Rohan S.", 
      rank: "AIR 12", 
      img: "https://images.unsplash.com/photo-1523240715632-99bb5d06d332?auto=format&fit=crop&q=80&w=600",
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "AIR_12 // JEE_ADV"
    },
    { 
      title: "NEET Journey", 
      student: "Ananya G.", 
      rank: "AIR 45", 
      img: "https://images.unsplash.com/photo-1544717297-fa95b3697628?auto=format&fit=crop&q=80&w=600",
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "AIR_45 // NEET"
    },
    { 
      title: "Foundation to Merit", 
      student: "Aryan K.", 
      rank: "Class 10 Topper", 
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
      themeColor: "amber",
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "TOPPER // CLASS_10"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-24 bg-[#FAF9F6] text-slate-800 relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL tracking Spotlight */}
      <div
        className="absolute pointer-events-none transition-opacity duration-75 blur-[120px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(250, 249, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Guidelines layout anchors */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        
        {/* Header Title with premium badging console */}
        <div className="text-center mb-12 relative">
          <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4 uppercase leading-none">
            Student{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black">
              Voices.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Watch real student accounts documenting their conceptual mastery and rank transformations.
          </p>
        </div>

        {/* 3-column video cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {videos.map((vid, i) => (
            <VideoTestimonialCard
              key={i}
              vid={vid}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              onPlayClick={() => setSelectedVideo(vid)}
            />
          ))}
        </div>
      </div>

      {/* Cybernetic Video HUD Overlay Modal */}
      <VideoHUDModal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo || videos[0]}
      />
    </section>
  );
};
