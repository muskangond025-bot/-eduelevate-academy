import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Award, Sparkles, Target, Compass, Globe, Compass as CompassIcon, Cpu } from 'lucide-react';

const GridWarpCanvas = ({ mousePos, isHovered }: { mousePos: { x: number; y: number }; isHovered: boolean }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1400,
          height: containerRef.current.clientHeight || 600
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cols = 12;
  const rows = 8;
  const paths = [];

  for (let i = 1; i < cols; i++) {
    const x = (dimensions.width / cols) * i;
    let d = `M ${x} 0`;
    
    if (isHovered) {
      const distanceY = dimensions.height / 2;
      const dx = mousePos.x - x;
      const dy = mousePos.y - distanceY;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 150 - dist) * 0.35;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;

    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 150 - dist) * 0.35;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

export const Eligibility = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Parallax tilt on image console
  const [consoleTilt, setConsoleTilt] = useState({ x: 0, y: 0 });
  const [isConsoleHovered, setIsConsoleHovered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setConsoleTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsConsoleHovered(true);
  };

  const handleConsoleMouseLeave = () => {
    setConsoleTilt({ x: 0, y: 0 });
    setIsConsoleHovered(false);
  };

  const criteria = [
    { 
      text: "Students currently studying in Grades 8th, 9th, 10th", 
      tag: "GRADES 8-10", 
      image: "https://images.unsplash.com/photo-1523240715632-99bb5d06d332?auto=format&fit=crop&q=80&w=1000",
      alt: "Grades 8 to 10 Students studying"
    },
    { 
      text: "Students passed/appearing for Grade 12th in 2026", 
      tag: "BATCH 2026", 
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000",
      alt: "Grade 12 Senior Students studying"
    },
    { 
      text: "Droppers who are preparing for JEE/NEET 2027", 
      tag: "TARGET 2027", 
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000",
      alt: "Intense JEE/NEET Preparation Dropper Study"
    },
    { 
      text: "Olympiad and NTSE aspirants", 
      tag: "COMPETITIVE", 
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1000",
      alt: "Olympiad and Competitive Exam Aspirants"
    },
    { 
      text: "Minimum 60% marks in the last academic year", 
      tag: "MIN 60% MARKS", 
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000",
      alt: "Academic Report and Grades Success"
    }
  ];

  const activeImage = hoveredRow !== null ? criteria[hoveredRow].image : criteria[0].image;
  const activeAlt = hoveredRow !== null ? criteria[hoveredRow].alt : criteria[0].alt;

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pt-12 pb-24 bg-[#05070F] relative overflow-hidden transition-all duration-500 border-t border-white/5"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.01) 50%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Grid Warp Background */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Who Can Apply details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full text-left"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase leading-none select-none">
              Who Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black">Apply?</span>
            </h2>
            
            <p className="text-base md:text-lg text-slate-400 font-medium mb-12 leading-relaxed">
              The National Scholarship Test (NST) is open to a wide range of academic levels, ensuring we identify talent at every crucial stage.
            </p>
            
            {/* Holographic Eligibility List */}
            <div className="space-y-4">
               {criteria.map((item, i) => {
                 const isSelfHovered = hoveredRow === i;
                 const isDimmed = hoveredRow !== null && hoveredRow !== i;
                 
                 return (
                   <div 
                     key={i} 
                     onMouseEnter={() => setHoveredRow(i)}
                     onMouseLeave={() => setHoveredRow(null)}
                     className={`p-5 rounded-[1.8rem] border backdrop-blur-md flex items-center justify-between gap-4 transition-all duration-300 group ${
                       isSelfHovered 
                         ? 'border-indigo-500/35 bg-white/[0.04] scale-[1.01] shadow-lg shadow-indigo-500/5' 
                         : isDimmed
                           ? 'border-white/5 opacity-40 blur-[0.5px] scale-[0.98]'
                           : 'border-white/5 bg-white/[0.01]'
                     }`}
                   >
                     <div className="flex items-center gap-4">
                       {/* Spinning HUD check reticle */}
                       <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                         isSelfHovered 
                           ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                           : 'bg-white/5 border-white/10 text-slate-400'
                       }`}>
                         <CheckCircle2 size={16} className={isSelfHovered ? 'animate-pulse' : ''} />
                       </div>
                       <span className={`text-sm font-bold leading-snug transition-colors ${
                         isSelfHovered ? 'text-white' : 'text-slate-300'
                       }`}>{item.text}</span>
                     </div>

                     {/* Telemetry drawer tag */}
                     <span className={`px-2.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase border shrink-0 transition-all ${
                       isSelfHovered 
                         ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 opacity-100 translate-x-0' 
                         : 'border-transparent text-transparent opacity-0 translate-x-1'
                     }`}>
                       {item.tag}
                     </span>
                   </div>
                 );
               })}
            </div>
          </motion.div>

          {/* Right Column: Interactive diagnostics console image mock */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full flex justify-center"
          >
             <div 
               onMouseMove={handleConsoleMouseMove}
               onMouseLeave={handleConsoleMouseLeave}
               className="w-full max-w-[480px] bg-slate-900/60 rounded-[3.5rem] p-6 border border-white/10 relative shadow-2xl backdrop-blur-xl group/console"
               style={{
                 transform: `perspective(1000px) rotateX(${-consoleTilt.y * 10}deg) rotateY(${consoleTilt.x * 10}deg) scale3d(${isConsoleHovered ? 1.015 : 1}, ${isConsoleHovered ? 1.015 : 1}, 1)`,
                 transformStyle: "preserve-3d",
                 boxShadow: isConsoleHovered 
                   ? '0 30px 60px -15px rgba(99, 102, 241, 0.12)' 
                   : '0 20px 40px -12px rgba(0, 0, 0, 0.5)'
               }}
             >
                {/* Razor border laser */}
                <div 
                  className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/console:opacity-100 transition-opacity duration-500 z-30"
                  style={{
                    background: `radial-gradient(150px circle at ${mousePos.x - 300}px ${mousePos.y - 100}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />


                {/* Actual image frame inside glass bezel */}
                <div className="aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden relative shadow-inner bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      src={activeImage} 
                      alt={activeAlt}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.75, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover group-hover/console:scale-105 transition-all duration-700 filter contrast-125"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent to-transparent pointer-events-none z-10" />
                  
                  {/* Concentric targets scanning on image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-10">
                    <svg className="w-32 h-32 animate-spin" style={{ animationDuration: '10s' }}>
                      <circle cx="64" cy="64" r="40" className="stroke-indigo-500 fill-none" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="64" cy="64" r="50" className="stroke-amber-500 fill-none" strokeWidth="1" strokeDasharray="3 6" />
                    </svg>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-950/90 to-transparent z-20">
                     <div className="flex items-center gap-1.5 text-amber-500 font-black text-[9px] uppercase tracking-widest mb-1.5">
                       <Globe size={11} className="animate-pulse" />
                       <span>Open Globally</span>
                     </div>
                     <p className="text-slate-400 text-xs font-bold leading-normal">
                       Students from all school boards and academic matrices are eligible to compete for national waivers.
                     </p>
                  </div>
                </div>

                {/* Cyber indicators around image */}
                <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-white/20" />
                <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-white/20" />
                <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-white/20" />

             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
