import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Stethoscope, Shield, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ThreeDAtomIcon = ({ size = 28, className, isHovered }: { size?: number; className?: string; isHovered?: boolean }) => {
  const nucleusGradStart = isHovered ? '#E0F2FE' : '#818CF8';
  const nucleusGradMiddle = isHovered ? '#38BDF8' : '#3B82F6';
  const nucleusGradEnd = isHovered ? '#0369A1' : '#1E3A8A';
  
  const orbit1Start = isHovered ? 'rgba(255, 255, 255, 0.9)' : '#93C5FD';
  const orbit1Middle = isHovered ? 'rgba(224, 242, 254, 0.5)' : '#3B82F6';
  const orbit1End = isHovered ? 'rgba(56, 189, 248, 0.9)' : '#1D4ED8';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="nucleusGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={nucleusGradStart} />
          <stop offset="50%" stopColor={nucleusGradMiddle} />
          <stop offset="100%" stopColor={nucleusGradEnd} />
        </radialGradient>
        
        <filter id="nucleusGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={orbit1Start} />
          <stop offset="50%" stopColor={orbit1Middle} stopOpacity="0.4" />
          <stop offset="100%" stopColor={orbit1End} />
        </linearGradient>

        <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isHovered ? 'rgba(255, 255, 255, 0.8)' : '#60A5FA'} />
          <stop offset="50%" stopColor={isHovered ? 'rgba(14, 165, 233, 0.3)' : '#3B82F6'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isHovered ? '#0284C7' : '#1E40AF'} />
        </linearGradient>

        <radialGradient id="electronGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor={isHovered ? '#7DD3FC' : '#60A5FA'} />
          <stop offset="100%" stopColor={isHovered ? '#0284C7' : '#1D4ED8'} />
        </radialGradient>
      </defs>

      {/* Orbit 1 (Rotated 45 deg) */}
      <g transform="translate(50,50) rotate(45) translate(-50,-50)">
        <ellipse 
          cx="50" 
          cy="50" 
          rx="42" 
          ry="15" 
          stroke="url(#orbitGrad1)" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
        <circle cx="92" cy="50" r="5.5" fill="url(#electronGrad)" style={{ filter: `drop-shadow(0 2px 4px ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(59,130,246,0.5)'})` }} />
      </g>

      {/* Orbit 2 (Rotated -45 deg) */}
      <g transform="translate(50,50) rotate(-45) translate(-50,-50)">
        <ellipse 
          cx="50" 
          cy="50" 
          rx="42" 
          ry="15" 
          stroke="url(#orbitGrad2)" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
        <circle cx="8" cy="50" r="5.5" fill="url(#electronGrad)" style={{ filter: `drop-shadow(0 2px 4px ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(59,130,246,0.5)'})` }} />
      </g>

      {/* Orbit 3 (Rotated 90 deg) */}
      <g transform="translate(50,50) rotate(90) translate(-50,-50)">
        <ellipse 
          cx="50" 
          cy="50" 
          rx="42" 
          ry="15" 
          stroke="url(#orbitGrad1)" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
        <circle cx="50" cy="8" r="5.5" fill="url(#electronGrad)" style={{ filter: `drop-shadow(0 2px 4px ${isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(59,130,246,0.5)'})` }} />
      </g>

      {/* Glow Backing of Nucleus */}
      <circle cx="50" cy="50" r="14" fill={isHovered ? '#38BDF8' : '#3B82F6'} opacity="0.4" style={{ filter: 'url(#nucleusGlow)' }} />

      {/* Perfect 3D Nucleus (Central Sphere) */}
      <circle 
        cx="50" 
        cy="50" 
        r="11" 
        fill="url(#nucleusGrad)" 
        style={{ filter: `drop-shadow(0 4px 10px ${isHovered ? 'rgba(14,165,233,0.5)' : 'rgba(30,58,138,0.5)'})` }}
      />
    </svg>
  );
};

const iconVariants: Record<string, any> = {
  blue: {
    hover: { 
      rotate: 360,
      transition: { repeat: Infinity, duration: 3, ease: "linear" }
    },
    initial: { rotate: 0 }
  },
  rose: {
    hover: { 
      scale: [1, 1.2, 0.95, 1.15, 1],
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    initial: { scale: 1 }
  },
  amber: {
    hover: { 
      rotate: [0, -12, 12, -8, 8, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    initial: { rotate: 0 }
  },
  indigo: {
    hover: { 
      y: [0, -8, 2, -2, 0],
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    initial: { y: 0 }
  }
};

const PATHS = [
  {
    title: 'JEE Advanced',
    desc: 'IIT/NIT Engineering Goal',
    icon: ThreeDAtomIcon,
    color: 'blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    gradient: 'from-blue-500/10 via-blue-500/2 to-transparent',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50/80',
    highlights: ['Interactive Physics Labs', 'Real-time Exam Simulator', 'Doubt Solved in < 15m'],
    duration: '2-Yr Program',
    target: 'Class 11 & 12'
  },
  {
    title: 'NEET Medical',
    desc: 'AIIMS/Government Medical',
    icon: Stethoscope,
    color: 'rose',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    gradient: 'from-rose-500/10 via-rose-500/2 to-transparent',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50/80',
    highlights: ['3D Anatomy Visualizer', 'Daily Bio-Quiz Battles', 'NCERT Line-by-Line Master'],
    duration: '2-Yr Program',
    target: 'Class 11 & 12'
  },
  {
    title: 'NDA Defense',
    desc: 'Indian Armed Forces Career',
    icon: Shield,
    color: 'amber',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    gradient: 'from-amber-500/10 via-amber-500/2 to-transparent',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50/80',
    highlights: ['Officer Intelligence Rating', 'SSB Interview Blueprint', 'General Studies Mastery'],
    duration: '1-Yr Intensive',
    target: 'Class 12 & Pass'
  },
  {
    title: 'Foundation',
    desc: '8th-10th Core Building',
    icon: GraduationCap,
    color: 'indigo',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    gradient: 'from-indigo-500/10 via-indigo-500/2 to-transparent',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50/80',
    highlights: ['Olympiad Integrated Prep', 'Logical Reasoning Boost', 'Scientific Enquiry Labs'],
    duration: '3-Yr Integrated',
    target: 'Class 8 to 10'
  }
];

export const HomeAcademicPaths = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activePath = hoveredIndex !== null ? PATHS[hoveredIndex] : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate fanned offsets to fit perfectly inside the viewport bounds on narrow desktop screens
  // Card step distance = 120px (360, 120, -120, -360)
  const x1 = useTransform(scrollYProgress, [0, 0.55], [360, 0]);
  const x2 = useTransform(scrollYProgress, [0.08, 0.65], [120, 0]);
  const x3 = useTransform(scrollYProgress, [0.16, 0.75], [-120, 0]);
  const x4 = useTransform(scrollYProgress, [0.24, 0.85], [-360, 0]);

  // 3D Rotation transforms (sweep around Y-axis)
  const rotateY1 = useTransform(scrollYProgress, [0, 0.55], [-120, 0]);
  const rotateY2 = useTransform(scrollYProgress, [0.08, 0.65], [-120, 0]);
  const rotateY3 = useTransform(scrollYProgress, [0.16, 0.75], [-120, 0]);
  const rotateY4 = useTransform(scrollYProgress, [0.24, 0.85], [-120, 0]);

  // Subtle Fan rotations around Z-axis
  const rotateZ1 = useTransform(scrollYProgress, [0, 0.55], [-6, 0]);
  const rotateZ2 = useTransform(scrollYProgress, [0.08, 0.65], [-2, 0]);
  const rotateZ3 = useTransform(scrollYProgress, [0.16, 0.75], [2, 0]);
  const rotateZ4 = useTransform(scrollYProgress, [0.24, 0.85], [6, 0]);

  // Scale stack compression
  const scale1 = useTransform(scrollYProgress, [0, 0.55], [0.88, 1]);
  const scale2 = useTransform(scrollYProgress, [0.08, 0.65], [0.92, 1]);
  const scale3 = useTransform(scrollYProgress, [0.16, 0.75], [0.96, 1]);
  const scale4 = useTransform(scrollYProgress, [0.24, 0.85], [1, 1]);

  return (
    <>
      {/* 1. DESKTOP STICKY SCROLL VIEW (Rendered on lg: 1024px+ screens) */}
      <div ref={containerRef} className="hidden lg:block relative h-[230vh] bg-slate-50/40 border-t border-b border-slate-100 mb-[80px]">
        
        {/* Sticky viewport container with compact bottom padding to prevent card footers from overflowing on short screens */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-start pt-[24px] pb-[32px] z-10">
          
          {/* Subtle Grid Backdrop */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, #0f172a 1.5px, transparent 0),
                linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px, 120px 120px, 120px 120px',
            }}
          />

          {/* Ambient Glowing Background Orb */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.14] pointer-events-none transition-all duration-1000 ease-out"
            style={{
              background: activePath ? activePath.accentColor : 'rgba(99, 102, 241, 0.4)',
              left: activePath ? `${(hoveredIndex ?? 0) * 25 + 10}%` : '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-[8px]">
            
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-black leading-[1.05] uppercase tracking-tighter mb-8 font-sans text-slate-900">
                  Architect Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-extrabold italic">
                    Academic Path.
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  We don't just teach subjects; we engineer career trajectories based on student aptitude and ambition. Discover your route to top-tier universities.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/path')}
                className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all shadow-md"
              >
                <span className="relative z-10 flex items-center gap-2">
                  System Roadmap <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </div>

            {/* Desktop Flex Cards Container (Perspective context) */}
            <div className="flex justify-center items-center gap-8 w-full relative h-[430px]" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
              {PATHS.map((path, i) => {
                const Icon = path.icon;
                const isHovered = hoveredIndex === i;
                const isAnyHovered = hoveredIndex !== null;

                return (
                  <motion.div
                    key={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => navigate('/portal/student')}
                    className={`relative w-[280px] shrink-0 p-[24px] rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[420px] ${
                      isHovered 
                        ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.06)]' 
                        : isAnyHovered 
                          ? 'border-slate-100/50 bg-white/40' 
                          : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 30px 60px -10px ${path.glowColor}` : undefined,
                      x: i === 0 ? x1 : i === 1 ? x2 : i === 2 ? x3 : x4,
                      rotateY: i === 0 ? rotateY1 : i === 1 ? rotateY2 : i === 2 ? rotateY3 : rotateY4,
                      rotateZ: i === 0 ? rotateZ1 : i === 1 ? rotateZ2 : i === 2 ? rotateZ3 : rotateZ4,
                      scale: i === 0 ? scale1 : i === 1 ? scale2 : i === 2 ? scale3 : scale4,
                      zIndex: (i === 0 ? 10 : i === 1 ? 20 : i === 2 ? 30 : 40) + (isHovered ? 50 : 0),
                      transformStyle: 'preserve-3d',
                      opacity: isAnyHovered && !isHovered ? 0.65 : 1
                    }}
                  >
                    <div 
                      className={`absolute inset-0 bg-gradient-to-b ${path.gradient} opacity-0 transition-opacity duration-500 pointer-events-none`}
                      style={{ opacity: isHovered ? 1 : 0 }}
                    />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-[20px]">
                        <div 
                          className={`w-64 h-64 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isHovered ? 'bg-white text-white' : `${path.iconBg} ${path.iconColor}`
                          }`}
                          style={{
                            backgroundColor: isHovered ? path.accentColor : undefined,
                            boxShadow: isHovered ? `0 10px 20px -5px ${path.accentColor}` : 'none'
                          }}
                        >
                          <motion.div
                            variants={iconVariants[path.color]}
                            animate={isHovered ? "hover" : "initial"}
                          >
                            <Icon size={28} className={isHovered ? (path.title === 'JEE Advanced' ? '' : 'text-white') : path.iconColor} isHovered={isHovered} />
                          </motion.div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/50 text-slate-500">
                          {path.target}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight mb-2 text-slate-900">
                        {path.title}
                      </h3>
                      <p className="text-xs font-bold mb-6 tracking-widest text-slate-400 uppercase">
                        {path.desc}
                      </p>

                      <div className="space-y-3 mb-[20px]">
                        {path.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                            <span 
                              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: isHovered ? path.accentColor : '#94a3b8',
                                transform: isHovered ? 'scale(1.3)' : 'scale(1)'
                              }}
                            />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex justify-between items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {path.duration}
                      </span>
                      
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/portal/student');
                        }}
                        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
                        style={{
                          backgroundColor: isHovered ? path.accentColor : 'rgba(15,23,42,0.03)',
                          color: isHovered ? '#ffffff' : '#334155',
                          boxShadow: isHovered ? `0 4px 15px ${path.glowColor}` : 'none'
                        }}
                      >
                        <span>Access</span>
                        <ArrowRight 
                          size={11} 
                          className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* 2. MOBILE / TABLET VIEW (Rendered on screens smaller than lg breakpoint: < 1024px) */}
      <section className="lg:hidden relative py-32 bg-slate-50/40 overflow-hidden text-slate-800 border-t border-b border-slate-100">
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, #0f172a 1.5px, transparent 0),
              linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 120px 120px, 120px 120px',
          }}
        />

        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.14] pointer-events-none transition-all duration-1000 ease-out"
          style={{
            background: activePath ? activePath.accentColor : 'rgba(99, 102, 241, 0.4)',
            left: activePath ? `${(hoveredIndex ?? 0) * 25 + 10}%` : '40%',
            top: '35%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-black leading-[1.05] uppercase tracking-tighter mb-8 font-sans text-slate-900">
                Architect Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-extrabold italic">
                  Academic Path.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                We don't just teach subjects; we engineer career trajectories based on student aptitude and ambition. Discover your route to top-tier universities.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/path')}
              className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all shadow-md"
            >
              <span className="relative z-10 flex items-center gap-2">
                System Roadmap <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PATHS.map((path, i) => {
              const Icon = path.icon;
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate('/portal/student')}
                  className={`relative p-32 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[460px] ${
                    isHovered 
                      ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.06)]' 
                      : isAnyHovered 
                        ? 'border-slate-100/50 bg-white/40' 
                        : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 30px 60px -10px ${path.glowColor}` : undefined,
                    transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
                    opacity: isAnyHovered && !isHovered ? 0.65 : 1
                  }}
                >
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b ${path.gradient} opacity-0 transition-opacity duration-500 pointer-events-none`}
                    style={{ opacity: isHovered ? 1 : 0 }}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-32">
                      <div 
                        className={`w-64 h-64 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isHovered ? 'bg-white text-white' : `${path.iconBg} ${path.iconColor}`
                        }`}
                        style={{
                          backgroundColor: isHovered ? path.accentColor : undefined,
                          boxShadow: isHovered ? `0 10px 20px -5px ${path.accentColor}` : 'none'
                        }}
                      >
                        <motion.div
                          variants={iconVariants[path.color]}
                          animate={isHovered ? "hover" : "initial"}
                        >
                          <Icon size={28} className={isHovered ? (path.title === 'JEE Advanced' ? '' : 'text-white') : path.iconColor} isHovered={isHovered} />
                        </motion.div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/50 text-slate-500">
                        {path.target}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black tracking-tight mb-2 text-slate-900">
                      {path.title}
                    </h3>
                    <p className="text-xs font-bold mb-6 tracking-widest text-slate-400 uppercase">
                      {path.desc}
                    </p>

                    <div className="space-y-3 mb-32">
                      {path.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                          <span 
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: isHovered ? path.accentColor : '#94a3b8',
                              transform: isHovered ? 'scale(1.3)' : 'scale(1)'
                            }}
                          />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex justify-between items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide whitespace-nowrap">
                      {path.duration}
                    </span>
                    
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/portal/student');
                      }}
                      className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
                      style={{
                        backgroundColor: isHovered ? path.accentColor : 'rgba(15,23,42,0.03)',
                        color: isHovered ? '#ffffff' : '#334155',
                        boxShadow: isHovered ? `0 4px 15px ${path.glowColor}` : 'none'
                      }}
                    >
                      <span>Access</span>
                      <ArrowRight 
                        size={11} 
                        className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
