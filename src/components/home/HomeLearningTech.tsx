import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { Zap, Brain, ShieldCheck, ArrowRight, Activity, Award } from 'lucide-react';

// Animated Counter Component
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

const FEATURES = [
  { 
    icon: Brain, 
    title: 'Adaptive Learning', 
    desc: 'System adjusts difficulty based on real-time performance',
    color: 'text-blue-500',
    accentColor: '#3B82F6',
    tabIndex: 0
  },
  { 
    icon: Zap, 
    title: 'Predictive Ranking', 
    desc: 'Projected AIR updated every 24 hours',
    color: 'text-amber-500',
    accentColor: '#F59E0B',
    tabIndex: 1
  },
  { 
    icon: ShieldCheck, 
    title: 'Precision Testing', 
    desc: 'Exam environments that mirror NTA/IIT patterns',
    color: 'text-indigo-500',
    accentColor: '#6366F1',
    tabIndex: 2
  }
];

export const HomeLearningTech = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto rotate tabs slowly if user doesn't interact, to keep dashboard dynamic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % FEATURES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Bind useScroll to track the section entering the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Map scroll progress to 3D book folding angles (80deg to 0deg)
  const rotateYLeft = useTransform(scrollYProgress, [0.1, 0.85], [80, 0]);
  const rotateYRight = useTransform(scrollYProgress, [0.1, 0.85], [-80, 0]);
  
  // Staggered depth scale expansion
  const scaleBook = useTransform(scrollYProgress, [0.1, 0.85], [0.92, 1]);
  
  // Staggered opacity fade-in
  const opacityBook = useTransform(scrollYProgress, [0.1, 0.5], [0.6, 1]);

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Subtle grid lines */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* 2. Interactive AI Engine Console Card (Left Side) */}
          <div className="lg:col-span-7 w-full">
            
            {/* A. DESKTOP 3D FOLDING BOOK VIEW (hidden on mobile, visible on lg screens) */}
            <motion.div
              style={{
                scale: scaleBook,
                opacity: opacityBook,
                perspective: '1500px',
                transformStyle: 'preserve-3d'
              }}
              className="hidden lg:grid grid-cols-2 gap-0 relative w-full group/book"
            >
              {/* Left Page (Selectable Feature Tabs, hinges at right edge) */}
              <motion.div
                style={{
                  rotateY: rotateYLeft,
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d'
                }}
                className="p-8 bg-slate-950 rounded-l-[2.5rem] border-y border-l border-slate-900 shadow-[inset_-12px_0_30px_rgba(0,0,0,0.85)] relative flex flex-col justify-center min-h-[380px]"
              >
                {/* Accent glow on active tab */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr opacity-5 pointer-events-none transition-all duration-700 rounded-l-[2.5rem]"
                  style={{ backgroundImage: `radial-gradient(circle at 0% 50%, ${FEATURES[activeTab].accentColor}, transparent)` }}
                />

                <div className="flex flex-col gap-3 justify-center z-10">
                  {FEATURES.map((f, i) => {
                    const Icon = f.icon;
                    const isActive = activeTab === i;

                    return (
                      <button
                        key={i}
                        onMouseEnter={() => setActiveTab(i)}
                        onClick={() => setActiveTab(i)}
                        className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                          isActive 
                            ? 'border-slate-800 bg-slate-900/60 shadow-inner' 
                            : 'border-transparent hover:bg-slate-900/20'
                        }`}
                      >
                        <div 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isActive 
                              ? 'bg-white text-slate-950 border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          <Icon size={20} className={isActive ? f.color : 'text-slate-400'} />
                        </div>
                        <div>
                          <h5 className={`font-black uppercase tracking-widest text-[11px] mb-1 transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}>
                            {f.title}
                          </h5>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            {f.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Page (Live Output Viewport, hinges at left edge) */}
              <motion.div
                style={{
                  rotateY: rotateYRight,
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d'
                }}
                className="p-8 bg-slate-950 rounded-r-[2.5rem] border-y border-r border-slate-900 shadow-[inset_12px_0_30px_rgba(0,0,0,0.85)] relative flex flex-col justify-center min-h-[380px]"
              >
                {/* Soft ambient orb wash */}
                <div 
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[90px] opacity-10 pointer-events-none transition-all duration-700"
                  style={{ backgroundColor: FEATURES[activeTab].accentColor }}
                />

                {/* Inner Glowing Viewport Box */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] z-10 w-full">
                  <AnimatePresence mode="wait">
                    {activeTab === 0 && (
                      <motion.div
                        key="adaptive"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col items-center"
                      >
                        <div className="flex items-center gap-1.5 mb-4 text-[10px] font-mono text-blue-400 tracking-wider">
                          <Activity size={12} className="animate-pulse" />
                          <span>LIVE ACCURACY TRACKER</span>
                        </div>

                        {/* Spline accuracy wave */}
                        <svg className="w-full h-32 overflow-visible" viewBox="0 0 200 100">
                          <defs>
                            <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <line x1="0" y1="50" x2="200" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
                          <path 
                            d="M0 60 C 30 20, 60 80, 100 30 C 140 10, 170 70, 200 20 L 200 100 L 0 100 Z" 
                            fill="url(#blueGlow)" 
                          />
                          <motion.path 
                            d="M0 60 C 30 20, 60 80, 100 30 C 140 10, 170 70, 200 20" 
                            fill="none" 
                            stroke="#3B82F6" 
                            strokeWidth="2.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />
                          <motion.circle 
                            cx="100" 
                            cy="30" 
                            r="5" 
                            fill="#60A5FA" 
                            animate={{ r: [5, 8, 5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        </svg>

                        <div className="flex justify-between w-full mt-4 text-[9px] font-mono text-slate-500">
                          <span>DIFFICULTY: LEVEL 8/10</span>
                          <span className="text-emerald-400">ACCURACY: 94.2%</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 1 && (
                      <motion.div
                        key="predictive"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col items-center justify-center text-center h-full"
                      >
                        <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono text-amber-400 tracking-wider">
                          <Award size={12} />
                          <span>PROJECTED INDIAN RANK</span>
                        </div>

                        <span className="text-6xl font-black font-sans text-amber-500 tracking-tighter italic mb-1">
                          #245
                        </span>
                        
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] mb-4">
                          <span>▲ +48 RANKS THIS WEEK</span>
                        </div>

                        <div className="flex gap-2 justify-center w-full max-w-[120px]">
                          {[...Array(6)].map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`h-3 w-1.5 rounded-full ${idx < 5 ? 'bg-amber-500/80 animate-pulse' : 'bg-slate-800'}`} 
                              style={{ animationDelay: `${idx * 0.08}s` }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 2 && (
                      <motion.div
                        key="precision"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full text-slate-300 font-mono"
                      >
                        <div className="flex justify-between items-center text-[9px] text-slate-500 mb-4 pb-2 border-b border-slate-800/80">
                          <span>IIT MOCK ENGINE #09</span>
                          <span className="text-rose-500 animate-pulse">02:59:45 left</span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400">Q1. Electrostatics</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">SOLVED</span>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400">Q2. Chemical Kinetics</span>
                            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">FLAGGED</span>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400">Q3. Calculus Integrals</span>
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-500">IN PROGRESS</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* B. MOBILE / TABLET STATIC FLAT VIEW (Rendered on screens smaller than lg breakpoint: < 1024px) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:hidden p-6 md:p-8 bg-slate-950 rounded-[2.5rem] shadow-[0_30px_60px_rgba(15,23,42,0.08)] text-white relative flex flex-col justify-between overflow-hidden border border-slate-900"
            >
              <div 
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: FEATURES[activeTab].accentColor }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch min-h-[360px]">
                <div className="md:col-span-6 flex flex-col gap-3 justify-center">
                  {FEATURES.map((f, i) => {
                    const Icon = f.icon;
                    const isActive = activeTab === i;

                    return (
                      <button
                        key={i}
                        onMouseEnter={() => setActiveTab(i)}
                        onClick={() => setActiveTab(i)}
                        className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                          isActive 
                            ? 'border-slate-800 bg-slate-900/60 shadow-inner' 
                            : 'border-transparent hover:bg-slate-900/20'
                        }`}
                      >
                        <div 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isActive 
                              ? 'bg-white text-slate-950 border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          <Icon size={20} className={isActive ? f.color : 'text-slate-400'} />
                        </div>
                        <div>
                          <h5 className={`font-black uppercase tracking-widest text-[11px] mb-1 transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}>
                            {f.title}
                          </h5>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            {f.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="md:col-span-6 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[250px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 0 && (
                      <motion.div
                        key="adaptive-m"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full flex flex-col items-center"
                      >
                        <div className="flex items-center gap-1.5 mb-4 text-[10px] font-mono text-blue-400 tracking-wider">
                          <Activity size={12} className="animate-pulse" />
                          <span>LIVE ACCURACY TRACKER</span>
                        </div>
                        <svg className="w-full h-32 overflow-visible" viewBox="0 0 200 100">
                          <line x1="0" y1="50" x2="200" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
                          <path d="M0 60 C 30 20, 60 80, 100 30 C 140 10, 170 70, 200 20 L 200 100 L 0 100 Z" fill="url(#blueGlow)" />
                          <path d="M0 60 C 30 20, 60 80, 100 30 C 140 10, 170 70, 200 20" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
                          <circle cx="100" cy="30" r="5" fill="#60A5FA" />
                        </svg>
                        <div className="flex justify-between w-full mt-4 text-[9px] font-mono text-slate-500">
                          <span>DIFFICULTY: LEVEL 8/10</span>
                          <span className="text-emerald-400">ACCURACY: 94.2%</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 1 && (
                      <motion.div
                        key="predictive-m"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full flex flex-col items-center justify-center text-center h-full"
                      >
                        <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono text-amber-400 tracking-wider">
                          <Award size={12} />
                          <span>PROJECTED INDIAN RANK</span>
                        </div>
                        <span className="text-6xl font-black font-sans text-amber-500 tracking-tighter italic mb-1">#245</span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] mb-4">
                          <span>▲ +48 RANKS THIS WEEK</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 2 && (
                      <motion.div
                        key="precision-m"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full text-slate-300 font-mono"
                      >
                        <div className="flex justify-between items-center text-[9px] text-slate-500 mb-4 pb-2 border-b border-slate-800/80">
                          <span>IIT MOCK ENGINE #09</span>
                          <span className="text-rose-500 animate-pulse">02:59:45 left</span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400">Q1. Electrostatics</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">SOLVED</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>

          {/* 3. Text & Animated Stats Columns (Right Side) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Title */}
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] uppercase tracking-tighter mb-8 font-sans">
                Human IQ + <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold italic">
                  Machine ML.
                </span>
              </h2>
              
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12">
                While others rely on standard static modules, our diagnostic algorithms pinpoint the exact concepts, subtopics, and testing flaws causing you to drop marks.
              </p>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                
                {/* Stat Card 1 */}
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.08)' }}
                  className="p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.015)] transition-all flex flex-col justify-between"
                >
                  <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 italic tracking-tighter font-sans">
                    <AnimatedCounter value={88} suffix="%" />
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    Efficiency Boost
                  </div>
                </motion.div>

                {/* Stat Card 2 */}
                <motion.div 
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.08)' }}
                  className="p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.015)] transition-all flex flex-col justify-between"
                >
                  <div className="text-4xl md:text-5xl font-black text-indigo-600 mb-2 italic tracking-tighter font-sans">
                    <AnimatedCounter value={1.2} decimals={1} suffix="s" />
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    Feedback Latency
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
