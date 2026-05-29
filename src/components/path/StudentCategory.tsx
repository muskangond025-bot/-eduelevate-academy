import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { 
    title: "10th → 11th", 
    desc: "The most critical transition. Switch from school curriculum to competitive logic seamlessly.", 
    visualizer: "rocket",
    glow: "rgba(99, 102, 241, 0.15)",
    badgeColor: "text-indigo-600 bg-indigo-500/5 border-indigo-500/10",
    theme: "from-blue-500 to-indigo-600",
    tags: ["★ Foundation Matrix", "★ Competitive Logic", "★ Transition calibration"],
    stats: "2.4x Speed Advantage"
  },
  { 
    title: "11th Student", 
    desc: "Strengthen your base. Master the core principles before jumping into advanced application.", 
    visualizer: "book",
    glow: "rgba(244, 63, 94, 0.15)",
    badgeColor: "text-rose-600 bg-rose-500/5 border-rose-500/10",
    theme: "from-rose-500 to-red-600",
    tags: ["★ Core Mastery", "★ Dynamic Syllabus", "★ Deep Concept Mapping"],
    stats: "AIR 100 Calibrated"
  },
  { 
    title: "12th Student", 
    desc: "The final sprint. Balanced revision for both board excellence and entrance exam success.", 
    visualizer: "target",
    glow: "rgba(16, 185, 129, 0.15)",
    badgeColor: "text-emerald-600 bg-emerald-500/5 border-emerald-500/10",
    theme: "from-emerald-500 to-teal-600",
    tags: ["★ Final Sprint Pack", "★ Board Synchronization", "★ Speed & Accuracy Audits"],
    stats: "99.8% Perfect Score"
  },
  { 
    title: "Dropper", 
    desc: "Pure focused approach. 100% commitment to cracking the top ranks with intensive practice.", 
    visualizer: "scholars",
    glow: "rgba(245, 158, 11, 0.15)",
    badgeColor: "text-amber-600 bg-amber-500/5 border-amber-500/10",
    theme: "from-amber-500 to-orange-600",
    tags: ["★ Intensive Practice", "★ 100% Commitment", "★ Advanced Error Auditing"],
    stats: "SSB & JEE Flagship"
  },
];

// Reusable SVG definitions and keyframe styles for Stage visuals
const StageStylesAndGradients = () => (
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      <linearGradient id="rocketFireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
      </linearGradient>
    </defs>
    <style>{`
      @keyframes rocketVibrate {
        0%, 100% { transform: translate(0, 0) rotate(45deg); }
        25% { transform: translate(0.8px, -0.8px) rotate(46deg); }
        75% { transform: translate(-0.8px, 0.8px) rotate(44deg); }
      }
      @keyframes exhaustParticles {
        0% { transform: translate(0, 0) scale(1); opacity: 0.9; }
        100% { transform: translate(-14px, 14px) scale(0.2); opacity: 0; }
      }
      @keyframes pagesFlipping {
        0%, 100% { transform: rotateY(0deg) skewY(0deg); }
        50% { transform: rotateY(-36deg) skewY(-3deg); }
      }
      @keyframes radarArcsRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes scholarsNodePulse {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.2); opacity: 0.95; }
      }
    `}</style>
  </svg>
);

// MAPPED INTERACTIVE STAGE VISUALIZERS
const StageVisualizer = ({ type, isHovered, isActive }: { type: string; isHovered: boolean; isActive: boolean }) => {
  const primaryColor = isActive ? '#FFFFFF' : '#6366F1';
  const secondaryColor = isActive ? 'rgba(255,255,255,0.2)' : 'rgba(99, 102, 241, 0.15)';

  switch (type) {
    case "rocket":
      // Rocket vibrating and firing exhaust dots downwards
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          {/* Exhaust trail particles */}
          <circle cx="20" cy="40" r="3" fill="url(#rocketFireGrad)" style={{ animation: isHovered ? 'exhaustParticles 0.4s linear infinite' : 'none' }} />
          <circle cx="15" cy="45" r="2.5" fill="url(#rocketFireGrad)" style={{ animation: isHovered ? 'exhaustParticles 0.4s linear infinite 0.15s' : 'none' }} />
          <circle cx="25" cy="35" r="2" fill="url(#rocketFireGrad)" style={{ animation: isHovered ? 'exhaustParticles 0.4s linear infinite 0.3s' : 'none' }} />
          
          <g style={{ 
            transformOrigin: '30px 30px', 
            animation: isHovered ? 'rocketVibrate 0.15s linear infinite' : 'none',
            transform: 'rotate(45deg)'
          }}>
            {/* Rocket Body */}
            <path d="M 30 12 C 34 16 38 28 36 38 L 24 38 C 22 28 26 16 30 12 Z" fill={primaryColor} />
            {/* Thruster bottom */}
            <rect x="27" y="38" width="6" height="3" fill="#EF4444" rx="1" />
            {/* Rocket fins */}
            <path d="M 24 32 L 18 38 L 24 38 Z" fill={isActive ? '#E0E7FF' : '#4F46E5'} />
            <path d="M 36 32 L 42 38 L 36 38 Z" fill={isActive ? '#E0E7FF' : '#4F46E5'} />
            {/* Window */}
            <circle cx="30" cy="24" r="3" fill={isActive ? '#0F172A' : '#FFFFFF'} />
          </g>
        </svg>
      );
      
    case "book":
      // Frog-perspective open book with pages scanning/turning
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          <path d="M 12 42 Q 30 36 30 16 Q 30 36 48 42 L 48 18 Q 30 12 30 32 Q 30 12 12 18 Z" fill="none" stroke={primaryColor} strokeWidth="2.5" />
          <line x1="30" y1="16" x2="30" y2="44" stroke={primaryColor} strokeWidth="2" />
          
          {/* Scanning pages */}
          <path 
            d="M 14 40 Q 30 34 30 16" 
            fill="none" 
            stroke={isActive ? '#E0E7FF' : '#818CF8'} 
            strokeWidth="1.5" 
            style={{ 
              transformOrigin: '30px 16px',
              animation: `pagesFlipping ${isHovered ? '0.8s' : '2s'} ease-in-out infinite` 
            }} 
          />
          <path 
            d="M 46 40 Q 30 34 30 16" 
            fill="none" 
            stroke={isActive ? '#E0E7FF' : '#818CF8'} 
            strokeWidth="1.5" 
            style={{ 
              transformOrigin: '30px 16px',
              animation: `pagesFlipping ${isHovered ? '0.8s' : '2s'} ease-in-out infinite_reverse` 
            }} 
          />
        </svg>
      );
      
    case "target":
      // Concentric target sweep reticles
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="24" fill="none" stroke={secondaryColor} strokeWidth="1.5" />
          <circle cx="30" cy="30" r="16" fill="none" stroke={secondaryColor} strokeWidth="1" />
          <circle cx="30" cy="30" r="4" fill={isActive ? '#FFFFFF' : '#10B981'} className="animate-pulse" />
          
          {/* Rotating arcs */}
          <circle 
            cx="30" 
            cy="30" 
            r="20" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="2.2" 
            strokeDasharray="40 25" 
            style={{ 
              transformOrigin: 'center',
              animation: `radarArcsRotate ${isHovered ? '2.5s' : '6s'} linear infinite` 
            }} 
          />
        </svg>
      );
      
    case "scholars":
      // Connected linked network pings
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          <line x1="30" y1="16" x2="16" y2="40" stroke={secondaryColor} strokeWidth="2" />
          <line x1="30" y1="16" x2="44" y2="40" stroke={secondaryColor} strokeWidth="2" />
          <line x1="16" y1="40" x2="44" y2="40" stroke={secondaryColor} strokeWidth="2" strokeDasharray="3 3" />
          
          <circle cx="30" cy="16" r="5.5" fill={primaryColor} style={{ animation: 'scholarsNodePulse 2s infinite' }} />
          <circle cx="16" cy="40" r="5" fill={isActive ? '#E0E7FF' : '#4F46E5'} style={{ animation: 'scholarsNodePulse 1.6s infinite 0.3s' }} />
          <circle cx="44" cy="40" r="5" fill={isActive ? '#E0E7FF' : '#4F46E5'} style={{ animation: 'scholarsNodePulse 1.6s infinite 0.6s' }} />
        </svg>
      );
      
    default:
      return null;
  }
};

// Coordinate trailing sparks inside Category card
const SparkParticlesTrail = ({ mouseX, mouseY, active }: { mouseX: number; mouseY: number; active: boolean }) => {
  if (!active) return null;
  return (
    <>
      <div 
        className="absolute w-2 h-2 rounded-full bg-indigo-400/25 pointer-events-none blur-[1px] transition-all duration-300 ease-out"
        style={{ left: mouseX - 4, top: mouseY - 4 }}
      />
      <div 
        className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/20 pointer-events-none blur-[1px] transition-all duration-500 ease-out"
        style={{ left: mouseX - 3, top: mouseY - 3 }}
      />
      <div 
        className="absolute w-1 h-1 rounded-full bg-white/40 pointer-events-none transition-all duration-700 ease-out"
        style={{ left: mouseX - 2, top: mouseY - 2 }}
      />
    </>
  );
};

export const StudentCategory = () => {
  const navigate = useNavigate();
  const slugs = ['transition', 'grade-11', 'grade-12', 'dropper'];
  const [activeCategory, setActiveCategory] = useState<number | null>(1); // 11th Student selected by default
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Parallax Tilt state per card
  const [tilts, setTilts] = useState<Array<{ rotateX: number; rotateY: number }>>([
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
  ]);

  // Card specific local coordinates tracking
  const [cardMice, setCardMice] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Set custom coordinates properties on element styles
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

    setCardMice(prev => {
      const next = [...prev];
      next[index] = { x, y };
      return next;
    });

    setTilts(prev => {
      const next = [...prev];
      next[index] = { 
        rotateX: (yc - y) / 14, // 3d tilt coordinates
        rotateY: (x - xc) / 14
      };
      return next;
    });
  };

  const handleCardMouseLeave = (index: number) => {
    setTilts(prev => {
      const next = [...prev];
      next[index] = { rotateX: 0, rotateY: 0 };
      return next;
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="py-36 bg-[#F8FAFC] text-slate-900 relative overflow-hidden"
    >
      {/* Visual gradients and style tags declarations */}
      <StageStylesAndGradients />

      {/* Light Slate Matrix Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Global Interactive Coordinates Spotlight */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 transition-opacity duration-300 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(165, 180, 252, 0.15) 0%, transparent 70%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-sm font-semibold tracking-wider uppercase mb-6 shadow-inner select-none">
            <Cpu size={14} className="animate-pulse" />
            Path Calibration
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-none select-none uppercase">
            Identify <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 italic">Your Stage</span>
          </h2>
          <p className="text-slate-500 text-lg lg:text-xl font-medium max-w-xl mx-auto mt-6">
            Click on your current grade to see your recommended roadmap.
          </p>
        </div>

        {/* Stateful Cards Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item, idx) => {
            const isActive = activeCategory === idx;
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            const tilt = tilts[idx] || { rotateX: 0, rotateY: 0 };
            const localMouse = cardMice[idx] || { x: 0, y: 0 };

            return (
              <div
                key={idx}
                onClick={() => setActiveCategory(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  handleCardMouseLeave(idx);
                }}
                onMouseMove={(e) => handleCardMouseMove(e, idx)}
                className={`relative group rounded-[3.2rem] p-10 flex flex-col justify-between min-h-[460px] overflow-hidden border transition-all duration-500 cursor-pointer backdrop-blur-xl ${
                  isActive 
                    ? 'bg-[#0A0D1A] border-indigo-500/40 text-white shadow-2xl scale-[1.03] z-20' 
                    : isHovered 
                      ? 'bg-white border-slate-300 shadow-xl scale-[1.01] text-slate-900 z-10'
                      : isAnyHovered 
                        ? 'bg-white/40 border-slate-100 opacity-45 blur-[0.5px] text-slate-800' 
                        : 'bg-white/80 border-slate-200 text-slate-800'
                }`}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  boxShadow: isActive ? '0 30px 70px -15px rgba(99, 102, 241, 0.25)' : isHovered ? '0 20px 40px -10px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {/* Local Card Hover Spotlight Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isActive ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.06)'}, transparent 80%)`
                  }}
                />

                {/* Ambient Color mesh badge backglow inside card */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${item.theme} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none`} />

                {/* Sparks trail following mouse cursor inside card */}
                <SparkParticlesTrail mouseX={localMouse.x} mouseY={localMouse.y} active={isHovered} />

                {/* Top Section */}
                <div className="flex flex-col items-center text-center">
                  
                  {/* Micro-Animated Custom SVG Badge */}
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border transition-all duration-500 ${
                    isActive 
                      ? 'bg-indigo-600/20 border-indigo-500/35 text-white' 
                      : 'bg-slate-50 border-slate-150 text-indigo-600 group-hover:bg-indigo-50 group-hover:scale-105 group-hover:rotate-3 shadow-inner'
                  }`}>
                    <StageVisualizer type={item.visualizer} isHovered={isHovered} isActive={isActive} />
                  </div>

                  <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none select-none">
                    {item.title}
                  </h3>
                  
                  <p className={`font-semibold leading-relaxed text-sm lg:text-base select-none transition-colors duration-300 ${isActive ? 'text-indigo-200/70' : 'text-slate-500 group-hover:text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Section - Telemetry drawer & Spring CTA */}
                <div className="mt-8 flex flex-col items-center w-full gap-4 pt-4 border-t border-slate-100/10 relative z-10">
                  
                  {/* Detailed technical categories metadata tags display */}
                  <div className="flex flex-col gap-1 w-full text-center">
                    <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${isActive ? 'text-indigo-400' : 'text-indigo-600/70'}`}>
                      {item.stats}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/path/${slugs[idx]}`); }}
                    className={`py-4 px-8 font-black text-xs uppercase tracking-widest rounded-2xl w-full flex items-center justify-center gap-2 group transition-all duration-300 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/20 hover:scale-103' 
                        : 'bg-slate-50 border border-slate-200 text-slate-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white group-hover:shadow-md'
                    }`}
                  >
                    Select Path 
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

