import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Shield, Sparkles, Play, RotateCcw, Brain, CheckCircle2, MapPin, Smartphone, ArrowRight, Pause, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LOGOS = ['DPS', 'LOYOLA', 'DAV', 'IIT-B', 'AIIMS', 'BITS'];

// Reusable Count-up component
interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

const AnimatedCounter = ({ value, duration = 1.5, decimals = 0, suffix = '' }: CounterProps) => {
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

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const TRUST_LOGOS = [
  { name: 'DPS', metric: '85+ JEE Selections', desc: 'Delhi Public School network alumni' },
  { name: 'LOYOLA', metric: '110+ NTSE Scholars', desc: 'Loyola School academic cohort' },
  { name: 'DAV', metric: '210+ Board Toppers', desc: 'DAV School network toppers' },
  { name: 'IIT-B', metric: '74+ CS Selections', desc: 'IIT Bombay student placement' },
  { name: 'AIIMS', metric: '120+ MBBS Admits', desc: 'AIIMS New Delhi selection rate' },
  { name: 'BITS', metric: '130+ Selections', desc: 'BITS Pilani campus intakes' }
];

export const HomeCombinedTrust = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative pt-20 pb-4 bg-slate-50/40 overflow-hidden text-slate-800 border-b border-slate-100">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Trusted by Elite Academic Institutions</div>
        </div>

        <div 
          className="w-full overflow-hidden relative select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex whitespace-nowrap gap-16 pt-6 pb-28"
            animate={{ x: isPaused ? undefined : [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...TRUST_LOGOS, ...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, idx) => (
              <div key={idx} className="group/logo relative inline-flex flex-col items-center cursor-default">
                
                {/* Badge Card Frame */}
                <div className="px-10 py-5 bg-white border border-slate-100/80 rounded-2xl shadow-[0_4px_15px_rgba(15,23,42,0.01)] hover:border-indigo-200 hover:shadow-[0_10px_35px_rgba(99,102,241,0.06)] hover:scale-105 transition-all duration-300">
                  <span className="text-2xl font-black tracking-widest text-slate-300 group-hover/logo:text-indigo-600 transition-colors">
                    {logo.name}
                  </span>
                </div>

                {/* Dropdown Detail */}
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover/logo:scale-100 group-hover/logo:opacity-100 transition-all duration-300 pointer-events-none bg-slate-900 text-white p-4 rounded-xl shadow-xl z-50 min-w-[200px] border border-slate-800 text-center">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-t border-l border-slate-800 rotate-45 translate-y-[8px]" />
                  <span className="block text-xs font-black text-indigo-400 uppercase tracking-wider mb-1">{logo.metric}</span>
                  <span className="block text-[10px] font-semibold text-slate-300 leading-tight">{logo.desc}</span>
                </div>

              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HomeAdaptiveAssessment = () => {
  const [thermoMastery, setThermoMastery] = useState(38);
  const [studentMastery, setStudentMastery] = useState(71);
  const [simState, setSimState] = useState<'idle' | 'analyzing' | 'testing' | 'complete'>('idle');
  
  // Track hover state for the diagnostic visualizer card (paper tear cover)
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Scroll tracking container for viewport entrance of the Adaptive Assessments section
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Client-side window size state to prevent SSR issues and run Framer Motion hooks unconditionally
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Staggered scroll-linked fanning and overlapping coordinates
  const x0 = useTransform(scrollYProgress, [0.15, 0.65], [130, 0]);
  const y0 = useTransform(scrollYProgress, [0.15, 0.65, 0.77], [70, 0, -20]);
  const r0 = useTransform(scrollYProgress, [0.15, 0.65], [-6, 0]);
  const opacity0 = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const x1 = useTransform(scrollYProgress, [0.15, 0.70], [-130, 0]);
  const y1 = useTransform(scrollYProgress, [0.15, 0.70, 0.82], [70, 0, -20]);
  const r1 = useTransform(scrollYProgress, [0.15, 0.70], [6, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.50], [0, 1]);

  const x2 = useTransform(scrollYProgress, [0.15, 0.75], [130, 0]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.75, 0.87], [-70, 0, -20]);
  const r2 = useTransform(scrollYProgress, [0.15, 0.75], [-4, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  const x3 = useTransform(scrollYProgress, [0.15, 0.80], [-130, 0]);
  const y3 = useTransform(scrollYProgress, [0.15, 0.80, 0.92], [-70, 0, -20]);
  const r3 = useTransform(scrollYProgress, [0.15, 0.80], [4, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.15, 0.60], [0, 1]);

  const xTransforms = [x0, x1, x2, x3];
  const yTransforms = [y0, y1, y2, y3];
  const rTransforms = [r0, r1, r2, r3];
  const opacityTransforms = [opacity0, opacity1, opacity2, opacity3];

  const startSimulation = () => {
    if (simState !== 'idle') return;
    
    setSimState('analyzing');
    
    // Stage 1: Analyzing
    setTimeout(() => {
      setSimState('testing');
      
      // Stage 2: Testing & Bridging Mastery Gap
      let currentThermo = 38;
      const targetThermo = 88;
      const steps = 25;
      const stepVal = (targetThermo - currentThermo) / steps;
      let stepCount = 0;
      
      const interval = setInterval(() => {
        stepCount++;
        currentThermo += stepVal;
        setThermoMastery(Math.round(currentThermo));
        setStudentMastery(Math.round(71 + (currentThermo - 38) * 0.26));
        
        if (stepCount >= steps) {
          clearInterval(interval);
          setSimState('complete');
        }
      }, 60);
    }, 1200);
  };

  const resetSimulation = () => {
    setThermoMastery(38);
    setStudentMastery(71);
    setSimState('idle');
  };

  return (
    <section ref={sectionRef} className="pt-12 pb-32 bg-slate-50/50 relative overflow-hidden border-b border-slate-100">
      {/* Subtle Grid Backdrop */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
           
           {/* Left Content Column */}
           <div className="lg:w-[45%]">
              {/* Badge Tagline */}


              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-8 font-sans overflow-visible py-1">
                Adaptive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 font-extrabold italic px-1">
                  Assessments.
                </span>
              </h2>

              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12">
                Every mock test you take is generated specifically for your current mastery level. We don't believe in "one test for all." If you're strong in Mechanics but weak in Thermodynamics, our test identifies and bridges that gap instantly.
              </p>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-2 gap-6" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                {[
                  { label: 'Avg Improvement', val: 42, suffix: '%' },
                  { label: 'Syllabus Depth', val: 100, suffix: '%' },
                  { label: 'Real-time Analytics', val: 0.5, decimals: 1, suffix: 's' },
                  { label: 'Doubt Resolution', val: 24, suffix: '/7' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(99, 102, 241, 0.08)' }} 
                    className="p-6 bg-white rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.015)] border border-slate-100 transition-all flex flex-col justify-between"
                    style={{
                      x: isDesktop ? xTransforms[i] : 0,
                      y: isDesktop ? yTransforms[i] : 0,
                      rotate: isDesktop ? rTransforms[i] : 0,
                      opacity: opacityTransforms[i],
                      transformStyle: 'preserve-3d',
                    }}
                  >
                     <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2 italic tracking-tighter font-sans">
                       {stat.suffix === '/7' ? (
                         <span>24/7</span>
                       ) : (
                         <AnimatedCounter value={stat.val} decimals={stat.decimals} suffix={stat.suffix} />
                       )}
                     </div>
                     <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
           </div>

           {/* Right Interactive Skill Map Column */}
           <div className="lg:w-[55%] w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                className="p-6 md:p-8 bg-slate-950 rounded-[2.5rem] shadow-[0_30px_60px_rgba(15,23,42,0.08)] border border-slate-900 text-white relative overflow-hidden flex flex-col justify-between"
              >


                {/* SVG Visual Node Map */}
                <div className="relative bg-slate-900/40 border border-slate-900 rounded-2xl p-4 flex items-center justify-center mb-6">
                  
                  <svg className="w-full h-[240px] max-w-[420px] overflow-visible" viewBox="0 0 300 200">
                    {/* Glowing effect filters */}
                    <defs>
                      <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="glow-violet" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Dotted target lines */}
                    <line x1="150" y1="100" x2="50" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="150" y1="100" x2="250" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="150" y1="100" x2="50" y2="150" stroke={simState === 'testing' ? '#F59E0B' : '#334155'} strokeWidth="2" strokeDasharray={simState === 'testing' ? '4 4' : '3 3'} className="transition-all duration-300" />
                    <line x1="150" y1="100" x2="250" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Animated diagnostic pulses */}
                    {simState === 'testing' && (
                      <motion.circle 
                        r="5" 
                        fill="#F59E0B"
                        style={{ filter: 'url(#glow-orange)' }}
                        animate={{
                          cx: [150, 50],
                          cy: [100, 150]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    {/* Center Node: Student Mastery */}
                    <g>
                      <circle cx="150" cy="100" r="30" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2.5" style={{ filter: 'url(#glow-violet)' }} />
                      <text x="150" y="94" fill="#c7d2fe" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">MASTERY</text>
                      <text x="150" y="112" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">{studentMastery}%</text>
                      <text x="150" y="145" fill="#8b5cf6" fontSize="7" fontWeight="bold" textAnchor="middle">INDEX PROFILE</text>
                    </g>

                    {/* Branch Node 1: Mechanics */}
                    <g>
                      <circle cx="50" cy="50" r="20" fill="#022c22" stroke="#10B981" strokeWidth="2" />
                      <text x="50" y="54" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">92%</text>
                      <text x="50" y="80" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Mechanics</text>
                    </g>

                    {/* Branch Node 2: Electromagnetism */}
                    <g>
                      <circle cx="250" cy="50" r="20" fill="#172554" stroke="#3B82F6" strokeWidth="2" />
                      <text x="250" y="54" fill="#3B82F6" fontSize="10" fontWeight="bold" textAnchor="middle">74%</text>
                      <text x="250" y="80" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Electromagnetism</text>
                    </g>

                    {/* Branch Node 3: Thermodynamics (Diagnostic Target) */}
                    <g>
                      <motion.circle 
                        cx="50" 
                        cy="150" 
                        r="20" 
                        fill={thermoMastery > 50 ? '#022c22' : '#2b1b04'} 
                        stroke={thermoMastery > 50 ? '#10B981' : '#F59E0B'} 
                        strokeWidth="2" 
                        animate={simState === 'testing' ? { scale: [1, 1.08, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <text x="50" y="154" fill={thermoMastery > 50 ? '#10B981' : '#F59E0B'} fontSize="10" fontWeight="bold" textAnchor="middle">{thermoMastery}%</text>
                      <text x="50" y="180" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Thermodynamics</text>
                      {simState === 'analyzing' && (
                        <circle cx="50" cy="150" r="25" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: '50px 150px' }} />
                      )}
                    </g>

                    {/* Branch Node 4: Optics */}
                    <g>
                      <circle cx="250" cy="150" r="20" fill="#172554" stroke="#3B82F6" strokeWidth="2" />
                      <text x="250" y="154" fill="#3B82F6" fontSize="10" fontWeight="bold" textAnchor="middle">81%</text>
                      <text x="250" y="180" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Optics</text>
                    </g>
                  </svg>

                  {/* Overlays during states */}
                  <AnimatePresence>
                    {simState === 'analyzing' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm"
                      >
                        <Brain className="text-violet-500 animate-bounce mb-2" size={32} />
                        <span className="text-xs font-mono tracking-widest text-slate-300">ANALYZING SKILL FLUX...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dashboard Action Panel */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/60 border border-slate-900 p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Active Simulation Target</span>
                    <span className="text-sm font-black text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${simState === 'complete' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      Thermodynamics Gap Bridge
                    </span>
                  </div>

                  {simState === 'idle' && (
                    <button
                      onClick={startSimulation}
                      className="px-6 py-3 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-bold rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
                    >
                      <Play size={12} fill="white" />
                      Diagnose Gaps
                    </button>
                  )}

                  {(simState === 'analyzing' || simState === 'testing') && (
                    <button
                      disabled
                      className="px-6 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl text-xs uppercase tracking-widest flex items-center gap-2"
                    >
                      <span className="w-3 h-3 rounded-full border border-t-transparent border-slate-400 animate-spin" />
                      Running...
                    </button>
                  )}

                  {simState === 'complete' && (
                    <button
                      onClick={resetSimulation}
                      className="px-6 py-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 active:scale-95 font-bold rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                    >
                      <RotateCcw size={12} />
                      Reset Demo
                    </button>
                  )}
                </div>

                {/* --- TORN PAPER REVEAL COVER (Mountain landscape splits on hover to reveal interactive map) --- */}
                {/* Left Half backing fibers */}
                <motion.div 
                  className="absolute inset-0 bg-slate-100/90 z-30 pointer-events-none transition-opacity duration-300"
                  style={{ 
                    clipPath: 'polygon(0% 0%, 51.5% 0%, 48.5% 6%, 53.5% 13%, 47.5% 22%, 52.5% 33%, 48.5% 44%, 53.5% 54%, 47.5% 65%, 52.5% 76%, 48.5% 88%, 51.5% 100%, 0% 100%)',
                    left: '2px' 
                  }}
                  animate={{ 
                    x: (!isCardHovered && simState === 'idle') ? '0%' : '-105%', 
                    rotate: (!isCardHovered && simState === 'idle') ? 0 : -8,
                    opacity: (!isCardHovered && simState === 'idle') ? 0.95 : 0 
                  }}
                  transition={{ type: 'spring', damping: 26, stiffness: 85 }}
                />

                {/* Left Half cover image */}
                <motion.div 
                  className="absolute inset-0 z-40 bg-cover bg-center select-none animate-fadeIn"
                  style={{ 
                    backgroundImage: 'url("/mountain_cover.png")',
                    clipPath: 'polygon(0% 0%, 51.5% 0%, 48.5% 6%, 53.5% 13%, 47.5% 22%, 52.5% 33%, 48.5% 44%, 53.5% 54%, 47.5% 65%, 52.5% 76%, 48.5% 88%, 51.5% 100%, 0% 100%)',
                    pointerEvents: (!isCardHovered && simState === 'idle') ? 'auto' : 'none'
                  }}
                  animate={{ 
                    x: (!isCardHovered && simState === 'idle') ? '0%' : '-105%', 
                    rotate: (!isCardHovered && simState === 'idle') ? 0 : -8,
                    opacity: (!isCardHovered && simState === 'idle') ? 1 : 0 
                  }}
                  transition={{ type: 'spring', damping: 26, stiffness: 85 }}
                />

                {/* Right Half backing fibers */}
                <motion.div 
                  className="absolute inset-0 bg-slate-100/90 z-30 pointer-events-none transition-opacity duration-300"
                  style={{ 
                    clipPath: 'polygon(51.5% 0%, 100% 0%, 100% 100%, 51.5% 100%, 48.5% 88%, 52.5% 76%, 47.5% 65%, 53.5% 54%, 48.5% 44%, 52.5% 33%, 47.5% 22%, 53.5% 13%, 48.5% 6%)',
                    left: '-2px' 
                  }}
                  animate={{ 
                    x: (!isCardHovered && simState === 'idle') ? '0%' : '105%', 
                    rotate: (!isCardHovered && simState === 'idle') ? 0 : 8,
                    opacity: (!isCardHovered && simState === 'idle') ? 0.95 : 0 
                  }}
                  transition={{ type: 'spring', damping: 26, stiffness: 85 }}
                />

                {/* Right Half cover image */}
                <motion.div 
                  className="absolute inset-0 z-40 bg-cover bg-center select-none"
                  style={{ 
                    backgroundImage: 'url("/mountain_cover.png")',
                    clipPath: 'polygon(51.5% 0%, 100% 0%, 100% 100%, 51.5% 100%, 48.5% 88%, 52.5% 76%, 47.5% 65%, 53.5% 54%, 48.5% 44%, 52.5% 33%, 47.5% 22%, 53.5% 13%, 48.5% 6%)',
                    pointerEvents: (!isCardHovered && simState === 'idle') ? 'auto' : 'none'
                  }}
                  animate={{ 
                    x: (!isCardHovered && simState === 'idle') ? '0%' : '105%', 
                    rotate: (!isCardHovered && simState === 'idle') ? 0 : 8,
                    opacity: (!isCardHovered && simState === 'idle') ? 1 : 0 
                  }}
                  transition={{ type: 'spring', damping: 26, stiffness: 85 }}
                />

                {/* Centered Hover to Reveal Call-To-Action Hint overlay */}
                <AnimatePresence>
                  {(!isCardHovered && simState === 'idle') && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none p-8 text-center"
                    >
                      <div className="px-6 py-3.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-center gap-2">
                        <Sparkles size={14} className="text-violet-400 animate-pulse" />
                        <span className="text-[10px] font-black tracking-widest text-slate-100 uppercase font-sans">Hover to Reveal Diagnostic Map</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
           </div>

        </div>
      </div>
    </section>
  );
};

export const HomeStudyEcosystem = () => {
  const navigate = useNavigate();
  const [hoveredPane, setHoveredPane] = useState<'physical' | 'digital' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="pt-12 pb-32 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Subtle Grid Backdrop */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-20">


          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-6 font-sans overflow-visible py-1">
            The Hybrid{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold italic px-1">
              Ecosystem.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto">
            Seamless transition between offline focused classrooms and infinite digital resources. Learning never stops.
          </p>
        </div>

        {/* Interactive Split Board */}
        <div className="flex flex-col lg:flex-row rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_30px_60px_rgba(15,23,42,0.04)] bg-slate-900 min-h-[580px]">
          
          {/* Left Pane: Physical Center */}
          <div
            onMouseEnter={() => setHoveredPane('physical')}
            onMouseLeave={() => setHoveredPane(null)}
            className="relative overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] flex flex-col justify-between p-8 md:p-12 text-white border-b lg:border-b-0 lg:border-r border-slate-850"
            style={{
              flex: hoveredPane === 'physical' ? '1.8 1 0%' : hoveredPane === 'digital' ? '1 1.8 0%' : '1.4 1 0%'
            }}
          >
            {/* Background Image Parallax */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop')",
                transform: hoveredPane === 'physical' ? 'scale(1.1)' : 'scale(1.05)'
              }}
            />
            {/* Color Overlay wash */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30 transition-opacity duration-500" 
              style={{ opacity: hoveredPane === 'physical' ? 0.95 : 0.88 }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Header Icon Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <MapPin size={22} />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  OFFLINE CAMPUS
                </span>
              </div>

              {/* Middle Section: Copy */}
              <div className="my-auto">
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-3 tracking-tight text-white">
                  Physical Centers
                </h3>
                <p className="text-sm text-slate-300 font-medium max-w-md leading-relaxed mb-6">
                  Experience face-to-face mentorship, smart visual laboratories, and structured group study halls that build real-world discipline.
                </p>

                {/* Features (reveal when hovered or stacked) */}
                <div className="overflow-hidden transition-all duration-505 lg:max-h-none opacity-0 lg:opacity-100"
                  style={{
                    maxHeight: hoveredPane === 'physical' ? '250px' : '0px',
                    opacity: hoveredPane === 'physical' ? 1 : 0
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 pt-2">
                    {['Smart Classrooms', 'Face-to-Face Mentors', 'In-Person Mock Exams', 'Structured Library Hall'].map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={12} className="text-blue-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button 
                  onClick={() => navigate('/about')}
                  className="px-8 py-4 bg-white hover:bg-blue-500 hover:text-white text-slate-950 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  Explore Infrastructure <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Pane: Digital Companion */}
          <div
            onMouseEnter={() => setHoveredPane('digital')}
            onMouseLeave={() => setHoveredPane(null)}
            className="relative overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] flex flex-col justify-between p-8 md:p-12 text-white"
            style={{
              flex: hoveredPane === 'digital' ? '1.8 1 0%' : hoveredPane === 'physical' ? '1 1.8 0%' : '1.4 1 0%'
            }}
          >
            {/* Background Image Parallax */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop')",
                transform: hoveredPane === 'digital' ? 'scale(1.1)' : 'scale(1.05)'
              }}
            />
            {/* Color Overlay wash */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30 transition-opacity duration-500" 
              style={{ opacity: hoveredPane === 'digital' ? 0.95 : 0.88 }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Header Icon Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Smartphone size={22} />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  DIGITAL COMPANION
                </span>
              </div>

              {/* Middle Section: Copy */}
              <div className="my-auto">
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-3 tracking-tight text-white">
                  Mobile Companion
                </h3>
                <p className="text-sm text-slate-300 font-medium max-w-md leading-relaxed mb-6">
                  Carry your classes, tests, diagnostic reports, and 24/7 instant doubt support right in your pocket. Study on your schedule, anywhere.
                </p>

                {/* Features (reveal when hovered or stacked) */}
                <div className="overflow-hidden transition-all duration-505 lg:max-h-none opacity-0 lg:opacity-100"
                  style={{
                    maxHeight: hoveredPane === 'digital' ? '250px' : '0px',
                    opacity: hoveredPane === 'digital' ? 1 : 0
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 pt-2">
                    {['AI Diagnostics Engine', '24/7 Doubt Resolver', 'Adaptive Worksheets', 'Live Leaderboard Games'].map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={12} className="text-purple-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button 
                  onClick={() => {
                    setIsPaused(false);
                    setToastMessage('📲 Setup initialized. Downloading quantum-encrypted dashboard console package...');
                    setShowToast(true);
                    // Reset toast after 4s
                    setTimeout(() => {
                      setShowToast(false);
                    }, 4000);
                  }}
                  className="px-8 py-4 bg-white hover:bg-purple-500 hover:text-white text-slate-950 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  Download Portal App <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Premium Floating Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-6 bg-slate-950/95 border border-indigo-500/30 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.5)] max-w-sm flex items-start gap-4 text-white"
            style={{
              boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Smartphone size={20} className={isPaused ? "animate-none" : "animate-pulse"} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                {isPaused ? "Installation Paused" : "Installation Initiated"} <Sparkles size={12} className="text-indigo-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isPaused ? "Installation task suspended. Thread state preserved." : toastMessage}
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isPaused ? { width: "35%" } : { width: '100%' }}
                  transition={isPaused ? { duration: 0 } : { duration: 3.5, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                />
              </div>

              {/* Pause & Folder controls */}
              <div className="flex items-center gap-3 mt-3.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPaused(!isPaused);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[9px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer select-none text-indigo-200"
                >
                  {isPaused ? <Play size={10} /> : <Pause size={10} />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[9px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer select-none text-indigo-200"
                >
                  <Folder size={10} /> Folder
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
