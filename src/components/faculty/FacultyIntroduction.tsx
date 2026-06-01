import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Zap, Star } from 'lucide-react';

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

const FeatureCardItem = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: { icon: React.ReactNode; title: string; desc: string; themeColor: string; laserColor: string; sparkColor: string; badgeCode: string };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
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
      className={`p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/40 shadow-sm border-slate-200/50 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-xl border-indigo-500/20 bg-white/70'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-100/50'
            : 'hover:shadow-md'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      <style>{`
        @keyframes intro-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-intro-orbit {
          animation: intro-orbit 10s linear infinite;
        }
      `}</style>

      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${item.themeColor}, transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(80px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass={item.sparkColor} />

      <div className="relative z-10 flex gap-6 items-start" style={{ transform: "translateZ(15px)" }}>
        {/* Concentric rotating icon HUD orbit */}
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0 select-none">
          <div className="absolute inset-[-4px] border border-dashed border-slate-200 rounded-xl pointer-events-none opacity-60 animate-intro-orbit group-hover/card:border-indigo-500/20" />
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0 shadow-sm border border-slate-100/50 group-hover/card:bg-indigo-600 group-hover/card:text-white transition-colors duration-300">
            {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[7px] text-slate-400 select-none">
            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200/40 uppercase font-black">{item.badgeCode}</span>
            <span>★</span>
            <span className="text-indigo-650 font-bold">VERIFIED_METRIC</span>
          </div>
          <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover/card:text-indigo-950 transition-colors uppercase leading-none mb-2">
            {item.title}
          </h4>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const CyberBezelImageConsole = () => {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={consoleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-[#060813] border border-white/10 rounded-[3.8rem] p-6 relative overflow-hidden transition-all duration-500 shadow-2xl group/console ${
        isHovered ? 'scale-[1.01] shadow-indigo-950/20' : ''
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 4}deg) rotateY(${tilt.x * 4}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Laser cursor sweep borders */}
      <div
        className="absolute inset-0 rounded-[3.8rem] pointer-events-none opacity-0 group-hover/console:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* macOS Browser Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5 select-none font-mono text-[8px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/70" />
          <div className="w-2 h-2 rounded-full bg-amber-500/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
        </div>
        <div className="text-[7.5px] tracking-widest text-slate-400">
          [VIEWPORT_TARGET: ACTIVE_CLASSROOM // ADDR_0x92B]
        </div>
        <div className="w-10 text-right">[SECURE]</div>
      </div>

      {/* Viewport Image Area */}
      <div className="aspect-square bg-slate-900 rounded-[2.8rem] overflow-hidden relative border border-white/5">
        {/* Active scanline laser sweep */}
        {isHovered && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-20 pointer-events-none"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Dynamic target reticles */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 border border-dashed border-indigo-400/40 rounded-full animate-intro-orbit flex items-center justify-center pointer-events-none opacity-40 z-10">
          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
        </div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-dashed border-cyan-400/30 rounded-full animate-intro-orbit flex items-center justify-center pointer-events-none opacity-40 z-10" 
          style={{ animationDirection: 'reverse' }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
        </div>

        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000" 
          alt="Faculty Meeting" 
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/console:grayscale-0 group-hover/console:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20" />
    </motion.div>
  );
};

const HolographicSticker = () => {
  const stickerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!stickerRef.current) return;
    const rect = stickerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={stickerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden sm:block absolute -bottom-10 -right-10 p-10 bg-secondary rounded-[3rem] shadow-2xl text-primary max-w-xs cursor-pointer select-none group/sticker overflow-hidden z-20"
      style={{
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        transform: `perspective(1000px) rotateX(${(coords.y - 60) * 0.15}deg) rotateY(${-(coords.x - 120) * 0.15}deg)`
      }}
    >
      {/* Holographic Gloss Sheen reflection */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover/sticker:opacity-60 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(140px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.75), transparent 80%)`
        }}
      />
      <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
        <div className="text-4xl font-black mb-2 tracking-tighter leading-none select-none uppercase">150+</div>
        <div className="text-[10px] font-black uppercase tracking-widest leading-tight">Years of Combined Coaching Excellence</div>
      </div>
    </motion.div>
  );
};

export const FacultyIntroduction = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const items = [
    { 
      icon: <ShieldCheck />, 
      title: "Ex-IITians & PhDs", 
      desc: "Our core team is composed of subject experts from premier Indian institutes.",
      themeColor: "rgba(99, 102, 241, 0.12)", 
      laserColor: "rgba(99, 102, 241, 0.4)", 
      sparkColor: "bg-indigo-500",
      badgeCode: "[TEAM_PHD]" 
    },
    { 
      icon: <Target />, 
      title: "Result Oriented", 
      desc: "Every mentor is trained to focus on 'Output-per-Hour' for every student.",
      themeColor: "rgba(16, 185, 129, 0.12)", 
      laserColor: "rgba(16, 185, 129, 0.4)", 
      sparkColor: "bg-emerald-500",
      badgeCode: "[OP_HOUR]" 
    },
    { 
      icon: <Zap />, 
      title: "Real-time Support", 
      desc: "Direct access to faculty for personalized doubt clearance sessions.",
      themeColor: "rgba(245, 158, 11, 0.12)", 
      laserColor: "rgba(245, 158, 11, 0.4)", 
      sparkColor: "bg-amber-500",
      badgeCode: "[DOUBT_RT]" 
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-24 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Light Dotted Matrix coordinates Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic spotlights nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Guidelines layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Heading & Features */}
          <div className="flex flex-col">
            <div className="relative select-none mb-4">
              <h2 className="text-4xl lg:text-5xl font-black text-primary tracking-tighter uppercase leading-tight mb-6 overflow-visible py-1">
                Experienced Minds,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black px-1">
                  Exceptional Mentorship.
                </span>
              </h2>
              <p className="text-slate-500 font-semibold italic-small leading-relaxed text-base md:text-lg">
                Success in competitive exams isn't just about reading textbooks; it's about strategy, mental stamina, and pattern recognition. Our faculty brings a combined experience of over 150 years in shaping national toppers.
              </p>
            </div>
            
            {/* Features Cooperative Deck */}
            <div className="space-y-6">
              {items.map((item, i) => (
                <FeatureCardItem
                  key={i}
                  item={item}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Console Viewport with image */}
          <div className="relative">
            <CyberBezelImageConsole />
            <HolographicSticker />
          </div>

        </div>
      </div>
    </section>
  );
};
