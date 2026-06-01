import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar, Sparkles, Terminal, Activity, Eye, ShieldCheck } from 'lucide-react';

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

const FocusCalibrationWidget = () => {
  return (
    <div className="relative w-full aspect-square max-w-[260px] mx-auto flex flex-col items-center justify-center bg-slate-950/60 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl select-none overflow-hidden group">
      {/* Visual background grid ticks */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-4 border border-dashed border-white/5 rounded-full pointer-events-none" />
      <div className="absolute inset-16 border border-dashed border-white/5 rounded-full pointer-events-none" />

      {/* Crosshair lines */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/5 pointer-events-none" />
      
      {/* 360 Degree Spinning Radar Sweep */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="w-52 h-52 rounded-full border border-dashed border-indigo-500/10 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-26 bg-gradient-to-t from-transparent to-indigo-500" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 blur-[2px] animate-ping" />
        </motion.div>
      </div>

      {/* Target Focus rings */}
      <motion.div
        animate={{ scale: [0.96, 1.04, 0.96] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full border-2 border-indigo-500/30 flex items-center justify-center relative shrink-0 z-10"
      >
        <div className="absolute inset-[-6px] border border-dotted border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        <Activity size={24} className="text-indigo-400 animate-pulse" />
      </motion.div>

      {/* Visual statistics bars & sliders */}
      <div className="w-full mt-8 flex flex-col gap-2 font-mono text-[7px] text-slate-400 z-10">
        <div className="flex justify-between items-center text-slate-300">
          <span>DEEP WORK INDEX:</span>
          <span className="text-indigo-400 font-bold">96.8%</span>
        </div>
        <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: ["75%", "96.8%", "75%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" 
          />
        </div>
        
        <div className="flex justify-between items-center text-slate-300 mt-1">
          <span>BURNOUT RISK:</span>
          <span className="text-emerald-400 font-bold">CRITICAL_ZERO // SAFE</span>
        </div>
        <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: ["20%", "5%", "20%"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="h-full bg-emerald-500" 
          />
        </div>
      </div>


    </div>
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

    setBtnCoords({ x, y });
    setPosition({
      x: (x - centerX) * 0.15,
      y: (y - centerY) * 0.15
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Border laser sweep highlight trailing cursor inside button */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3" style={{ transform: "translateZ(10px)" }}>
        {children}
      </span>
    </motion.button>
  );
};

export const FeaturedArticles = ({ onArticleClick }: { onArticleClick: (article: any) => void }) => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [cardCoords, setCardCoords] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCardCoords({ x, y });
    setCardTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-32 bg-[#FAF9F6] relative z-10 overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
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

      {/* Layout lines guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header entrance reveal */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-4">
            Elite Strategy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic">Disclosures</span>
          </h2>
        </div>

        {/* Premium Frosted Glassmorphic Featured Card */}
        <motion.div 
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="relative rounded-[4rem] border transition-all duration-500 overflow-hidden bg-[#060813] border-white/10 shadow-2xl min-h-[580px] flex items-center group cursor-pointer"
          style={{
            transform: `perspective(1000px) rotateX(${-cardTilt.y * 3.5}deg) rotateY(${cardTilt.x * 3.5}deg) scale3d(${isCardHovered ? 1.015 : 1}, ${isCardHovered ? 1.015 : 1}, 1)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Border laser sweep highlight trailing cursor inside card */}
          <div
            className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(150px circle at ${cardCoords.x}px ${cardCoords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
              padding: '1.2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Dynamic Holographic Foil Sheen Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 mix-blend-overlay"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(99,102,241,0.08) 50%, rgba(34,211,238,0.06) 60%, rgba(255,255,255,0) 100%)`,
              transform: `translate(${cardTilt.x * 25}px, ${cardTilt.y * 25}px)`
            }}
          />

          {/* Sparks Trail */}
          <SparkParticlesTrail coords={cardCoords} colorClass="bg-cyan-400" />

          {/* Background Image Panel */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
              alt="Featured Article" 
              className="w-full h-full object-cover opacity-[0.16] group-hover:opacity-[0.22] group-hover:scale-[1.03] transition-all duration-1000 filter grayscale contrast-125"
            />
            {/* Ambient glows and gradients inside card */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#060813] via-[#060813]/90 to-[#060813]/20" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
          </div>

          <div className="relative z-10 w-full p-12 md:p-20 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 text-left" style={{ transform: "translateZ(30px)" }}>
              {/* Iridescent Holographic Foil Sticker Badge */}
              <div className="relative mb-8 w-fit" style={{ transform: "translateZ(10px)" }}>
                <span className="relative inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg relative z-10 select-none overflow-hidden">
                  Top Priority
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-pulse" />
                </span>
                {/* Dashed outer spinner */}
                <div className="absolute -inset-1 border border-dashed border-indigo-400/30 rounded-2xl animate-spin pointer-events-none" style={{ animationDuration: '10s' }} />
              </div>

              {/* Title Header with gradient text reveal */}
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter uppercase select-none overflow-visible py-1">
                The 18-Hour Rule:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 font-extrabold italic px-1">
                  Mastering Focus
                </span>{" "}
                for JEE Advanced 2026.
              </h3>
              
              {/* Subtext description paragraph */}
              <p className="text-lg text-slate-300 mb-10 leading-relaxed font-semibold max-w-xl">
                Our 2024 toppers share the exact psychological blueprint that helped them stay productive for 100+ days without burnout.
              </p>
              
              {/* Metadata block with custom monospaced visualizers */}
              <div className="flex flex-wrap items-center gap-8 mb-12 select-none" style={{ transform: "translateZ(15px)" }}>
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-indigo-300/90 font-mono">
                  <Calendar size={14} className="text-indigo-400" />
                  <span>MAY 20, 2026</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-cyan-300/90 font-mono">
                  <Clock size={14} className="text-cyan-400" />
                  <span>15 MIN READ</span>
                </div>
              </div>

              {/* Magnetic Action CTA Button */}
              <MagneticActionButton 
                className="px-10 py-5.5 bg-white text-[#060813] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 hover:text-white"
                laserColor="rgba(99, 102, 241, 0.4)"
                onClick={() => onArticleClick({
                  title: "The 18-Hour Rule: Mastering Focus for JEE Advanced 2026",
                  excerpt: "Our 2024 toppers share the exact psychological blueprint that helped them stay productive for 100+ days without burnout.",
                  author: "Academic Board",
                  date: "May 20, 2026",
                  readTime: "15 min read",
                  category: "Strategy",
                  image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
                  content: [
                    "The path to securing a single-digit rank in JEE Advanced is paved with more than just academic knowledge; it is a game of cognitive endurance and psychological resilience. In our interactions with the Top 50 rankers of the 2024 session, one recurring system emerged: The 18-Hour Rule.",
                    "This system does not imply studying for 18 hours a day—which is biologically unsustainable and counterproductive. Instead, it represents an 18-hour continuous cycle of cognitive discipline, divided into three crucial buffers: Deep Execution (8 hours), Restorative Synthesis (8 hours), and Active Deliberation (2 hours).",
                    "Deep Execution refers to high-concentration study blocks, free from digital friction or interruptions. Our toppers recommend dividing this into three 150-minute blocks matching the exact testing hours of the JEE Advanced papers. During these blocks, mock test analysis and high-difficulty problem sets must be prioritized.",
                    "Restorative Synthesis covers sleep and neural consolidation. Research shows that complex problem-solving patterns are encoded into long-term memory during deep slow-wave sleep. Reducing sleep below 7 hours immediately degrades mathematical processing speed by up to 22% the following day.",
                    "Active Deliberation is the secret ingredient: 2 hours of light physical activation, mindfulness, and constructive discussion with mentors. This lowers stress markers and resets executive functions for the next execution cycle.",
                    "By adopting this calibrated balance, aspirants can achieve a sustainable peak-performance state, unlocking maximum syllabus depth with zero burnout potential."
                  ]
                })}
              >
                <span>Read Full Story</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
              </MagneticActionButton>
            </div>

            {/* Right Column - Interactive Focus Calibration Console */}
            <div className="hidden lg:flex items-center justify-center" style={{ transform: "translateZ(40px)" }}>
              <FocusCalibrationWidget />
            </div>

          </div>


        </motion.div>
      </div>
    </section>
  );
};
