import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  padZero?: boolean;
}

const AnimatedCounter = ({ value, duration = 1.5, decimals = 0, prefix = '', suffix = '', padZero = false }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const incrementTime = 30; // 30ms interval
    const totalSteps = totalMiliseconds / incrementTime;
    const stepValue = (end - start) / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const currentVal = start + stepValue * currentStep;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentVal);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const displayValue = padZero 
    ? String(Math.round(count)).padStart(2, '0') 
    : count.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

const STATS = [
  { 
    label: 'Total Toppers', 
    value: 12, 
    suffix: 'k+', 
    padZero: false,
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.2)',
    svg: (
      <svg className="w-28 h-20 text-blue-500/15 pointer-events-none" viewBox="0 0 100 60" fill="none">
        <motion.path
          d="M 5,50 Q 25,45 45,30 T 85,10"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.circle
          cx="85"
          cy="10"
          r="4.5"
          fill="currentColor"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.4, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </svg>
    )
  },
  { 
    label: 'AIR 1 Ranks', 
    value: 8, 
    suffix: '', 
    padZero: true,
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    svg: (
      <svg className="w-24 h-24 text-emerald-500/15 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path
          d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a4 4 0 0 0-4 4v5c0 2.2 1.8 4 4 4s4-1.8 4-4V6a4 4 0 0 0-4-4Z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.circle cx="12" cy="7" r="1" fill="currentColor" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
        <motion.circle cx="7" cy="4" r="1.5" fill="currentColor" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        <motion.circle cx="17" cy="4" r="1.5" fill="currentColor" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }} />
      </svg>
    )
  },
  { 
    label: 'Regional Hubs', 
    value: 45, 
    suffix: '', 
    padZero: false,
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.2)',
    svg: (
      <svg className="w-24 h-24 text-indigo-500/15 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="40" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="10" />
        <motion.line
          x1="50"
          y1="50"
          x2="90"
          y2="50"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{ transformOrigin: '50px 50px' }}
        />
        <motion.circle cx="35" cy="40" r="3" fill="currentColor" animate={{ scale: [0.5, 1.3, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} />
        <motion.circle cx="65" cy="30" r="3" fill="currentColor" animate={{ scale: [0.5, 1.3, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.4 }} />
        <motion.circle cx="55" cy="70" r="3" fill="currentColor" animate={{ scale: [0.5, 1.3, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }} />
      </svg>
    )
  },
  { 
    label: 'Digital Assets', 
    value: 1, 
    suffix: 'M+', 
    padZero: false,
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.2)',
    svg: (
      <svg className="w-24 h-24 text-purple-500/15 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path
          d="M12 2C6.48 2 2 3.34 2 5v4c0 1.66 4.48 3 10 3s10-1.34 10-3V5c0-1.66-4.48-3-10-3Z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M2 9v4c0 1.66 4.48 3 10 3s10-1.34 10-3V9"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.path
          d="M2 13v4c0 1.66 4.48 3 10 3s10-1.34 10-3v-4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.circle cx="6" cy="11" r="0.8" fill="currentColor" animate={{ y: [0, -15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }} />
        <motion.circle cx="12" cy="15" r="0.8" fill="currentColor" animate={{ y: [0, -15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.4, ease: "easeOut" }} />
        <motion.circle cx="18" cy="11" r="0.8" fill="currentColor" animate={{ y: [0, -15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.8, ease: "easeOut" }} />
      </svg>
    )
  }
];

interface StatCardProps {
  stat: typeof STATS[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}

const StatCard = ({ stat, index, hoveredIndex, setHoveredIndex }: StatCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glossX: 50, glossY: 50, isHovered: false });
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth 3D tilt calculation (max 10 degrees)
    const rotateX = ((y / rect.height) - 0.5) * -10; 
    const rotateY = ((x / rect.width) - 0.5) * 10;
    
    setTilt({
      x: rotateX,
      y: rotateY,
      glossX: (x / rect.width) * 100,
      glossY: (y / rect.height) * 100,
      isHovered: true
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glossX: 50, glossY: 50, isHovered: false });
    setHoveredIndex(null);
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.025 : 1,
          translateY: isHovered ? -6 : 0
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? `0 30px 60px -10px ${stat.glowColor}, inset 0 0 20px rgba(255,255,255,0.6)` : undefined,
          opacity: isAnyHovered && !isHovered ? 0.65 : 1
        }}
        className={`relative p-[32px] md:p-[40px] rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden min-h-[190px] flex flex-col justify-between ${
          isHovered 
            ? 'border-slate-200 bg-white' 
            : isAnyHovered 
              ? 'border-slate-100/50 bg-white/40' 
              : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
        }`}
      >
        {/* Specular gloss shine overlay */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${tilt.glossX}% ${tilt.glossY}%, ${stat.accentColor}18 0%, transparent 60%)`,
            mixBlendMode: 'overlay',
            opacity: isHovered ? 1 : 0
          }}
        />
        
        {/* Dynamic colored background wash */}
        <div 
          className="absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${stat.accentColor}06, transparent)`,
            opacity: isHovered ? 1 : 0
          }}
        />

        {/* Floating 3D SVG Illustration (physically hovers 30px above card face) */}
        <div 
          className="absolute right-6 bottom-6 transition-all duration-500 ease-out z-10 pointer-events-none"
          style={{
            transform: isHovered 
              ? `translate3d(${-tilt.y * 1.5}px, ${tilt.x * 1.5}px, 30px) scale(1.1)` 
              : 'translate3d(0, 0, 0) scale(1)',
            filter: isHovered ? `drop-shadow(0 15px 30px ${stat.glowColor})` : 'none'
          }}
        >
          {stat.svg}
        </div>

        {/* Content wrapper with 3D depth (physically hovers 15px above card face) */}
        <div 
          className="relative z-10 flex flex-col justify-center h-full gap-[8px] transition-transform duration-500"
          style={{
            transform: isHovered ? 'translate3d(0, 0, 15px)' : 'none'
          }}
        >
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block font-sans">
            {stat.label}
          </span>
          
          <div className="text-[44px] md:text-[54px] font-black text-slate-950 tracking-tighter font-sans">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} padZero={stat.padZero} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const HomeStatTicker = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-slate-50/40 overflow-hidden border-b border-slate-100">
      {/* Grid Backdrop Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #0f172a 1.5px, transparent 0),
            linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
        }}
      />

      {/* Dynamic Background Light Orb */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.08] pointer-events-none transition-all duration-1000 ease-out hidden md:block"
        style={{
          background: hoveredIndex !== null ? STATS[hoveredIndex].accentColor : 'rgba(99, 102, 241, 0.4)',
          left: hoveredIndex !== null ? `${(hoveredIndex) * 25 + 12.5}%` : '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatCard 
              key={i} 
              stat={stat} 
              index={i} 
              hoveredIndex={hoveredIndex} 
              setHoveredIndex={setHoveredIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
