import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, PlayCircle, X, Radio, Shield } from 'lucide-react';

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
            <div className="bg-slate-955 rounded-[2rem] border border-white/5 p-6 mb-6 relative overflow-hidden flex flex-col justify-between h-72">
              {/* Scanline laser line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />

              {/* Center Equalizer & Telemetry */}
              <div className="flex-1 flex flex-col justify-center">
                <AudioWaveVisualizer />
              </div>
            </div>

            {/* Playback Control Bar */}
            <div className="mb-6 flex flex-col gap-2 font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-400 select-none">
                <span>{formatTime(playbackTime)}</span>
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
                <div className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase mt-0.5">{story.rank}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const StudentStoryCard = ({
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
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/5 border-white/10 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_0_50px_rgba(99,102,241,0.15)] border-indigo-500/30 bg-white/10'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-white/5'
            : 'hover:shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      <style>{`
        @keyframes avatar-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-avatar-orbit {
          animation: avatar-orbit 12s linear infinite;
        }
      `}</style>

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
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
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

      {/* Huge Background Quote Mark */}
      <Quote 
        className="absolute bottom-6 right-8 text-white/5 w-32 h-32 pointer-events-none transition-all duration-700 select-none" 
        style={{
          transform: isSelfHovered ? 'scale(1.1) rotate(15deg) translateZ(10px)' : 'scale(1) rotate(0deg)',
          opacity: isSelfHovered ? 0.08 : 0.03
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center" style={{ transform: "translateZ(25px)" }}>
        {/* Left avatar with rotating HUD circle */}
        <div className="relative shrink-0 select-none">
          {/* HUD orbits */}
          <div className="absolute inset-[-10px] border border-dashed border-white/10 rounded-[3.2rem] pointer-events-none opacity-60 animate-avatar-orbit group-hover/card:border-indigo-500/30" />
          <div className="absolute inset-[-4px] border border-white/5 rounded-[2.8rem] pointer-events-none" />

          {/* Avatar frame */}
          <div className="w-36 h-36 rounded-[2.5rem] overflow-hidden border border-white/10 relative z-10 bg-slate-950/40">
            <img 
              src={story.img} 
              alt={story.name} 
              className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 scale-100 group-hover/card:scale-105" 
            />
          </div>

          {/* Floating Play Button */}
          <div className="absolute -bottom-2 -right-2 z-20">
            <MagneticActionButton 
              onClick={onPlayClick}
              className="w-11 h-11 !p-0 !rounded-full text-white bg-indigo-600 border border-indigo-500 hover:bg-indigo-700"
              laserColor="rgba(255, 255, 255, 0.4)"
            >
              <PlayCircle size={18} className="animate-pulse" />
            </MagneticActionButton>
          </div>
        </div>

        {/* Right testimonial text */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-6">
            <p className="text-slate-300 font-semibold leading-relaxed text-base italic-small relative">
              "{story.quote}"
            </p>
          </div>

          <div>
            <h4 className="text-xl font-black text-white tracking-tight group-hover/card:text-indigo-200 transition-colors uppercase leading-none mb-2">
              {story.name}
            </h4>
            <span className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 font-mono text-[9px] font-black text-indigo-400 uppercase tracking-widest">
              {story.rank}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const StudentStories = () => {
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
    {
      name: "Rohan Sharma",
      rank: "AIR 12 (JEE ADV)",
      quote: "The personalized test analysis at this institute changed my perspective on Physics. I wasn't just solving problems; I was understanding the universe.",
      img: "https://i.pravatar.cc/300?u=a1"
    },
    {
      name: "Ananya Gupta",
      rank: "AIR 45 (NEET)",
      quote: "The biological visualizations and the focus on NCERT depth gave me the confidence to handle the trickiest questions with ease and speed.",
      img: "https://i.pravatar.cc/300?u=a2"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-24 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
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
        
        {/* Header Title with cinematic staggered clip-mask details */}
        <div className="text-center mb-12 relative select-none">

          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase leading-none">
            Student{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
              Stories.
            </span>
          </h2>
          <p className="text-slate-400 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Real journeys of transformation from average to extraordinary.
          </p>
        </div>

        {/* 2-column testimonial cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {stories.map((story, i) => (
            <StudentStoryCard
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
