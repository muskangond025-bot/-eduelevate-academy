import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Zap, Coffee, Clock, Sparkles, Terminal, Code, ArrowRight, Play } from 'lucide-react';

const SpotlightCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[3rem] bg-white border border-slate-100/80 p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-indigo-500/25 group ${className}`}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(79, 70, 229, 0.05), transparent 80%)`,
        }}
      />
      
      {/* Sparkle particle trail */}
      {isHovered && (
        <div 
          className="absolute w-2 h-2 rounded-full bg-indigo-500/30 blur-[2px] pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: coords.x - 4,
            top: coords.y - 4,
          }}
        />
      )}

      {/* Decorative Corner Brackets */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-slate-200/50 group-hover:border-indigo-500/30 transition-colors" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-slate-200/50 group-hover:border-indigo-500/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-slate-200/50 group-hover:border-indigo-500/30 transition-colors" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-slate-200/50 group-hover:border-indigo-500/30 transition-colors" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

const VisualClarityWidget = () => {
  return (
    <div className="h-56 w-full relative flex items-center justify-center overflow-hidden bg-slate-50/50 rounded-[2.5rem] border border-slate-100 mt-6 group-hover:bg-indigo-50/20 transition-all duration-500">
      {/* Interactive solar orbits */}
      <div className="absolute w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center z-10">
        <div className="w-4 h-4 rounded-full bg-indigo-600 shadow-lg shadow-indigo-500/50 animate-pulse" />
        <div className="absolute w-4 h-4 rounded-full bg-indigo-600 shadow-lg shadow-indigo-500/50 animate-ping" style={{ animationDuration: '2s' }} />
      </div>
      
      {/* Concentric rotating neon loops */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        className="absolute w-28 h-28 rounded-full border border-dashed border-indigo-200 flex items-center justify-start group-hover:border-indigo-400/60 transition-colors"
      >
        <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/40 -ml-1.5" />
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 13, ease: "linear" }}
        className="absolute w-40 h-40 rounded-full border border-dashed border-purple-200 flex items-center justify-end group-hover:border-purple-400/60 transition-colors"
      >
        <div className="w-3 h-3 rounded-full bg-purple-500 shadow-md shadow-purple-500/40 -mr-1.5" />
      </motion.div>

      <motion.div 
        animate={{ rotate: 180 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute w-48 h-48 rounded-full border border-dashed border-emerald-200 flex items-center justify-center group-hover:border-emerald-400/60 transition-colors"
      >
        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/40 absolute top-0 -mt-1.5" />
        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/40 absolute bottom-0 -mb-1.5" />
      </motion.div>

      {/* Futuristic Scope Ring */}
      <div className="absolute inset-4 rounded-[2rem] border border-indigo-500/5 pointer-events-none" />
    </div>
  );
};

const ProblemSolvingWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'solving' | 'hacked'>('idle');
  const [time, setTime] = useState(12.4);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      setPhase('solving');
      setTime(0);
      let startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= 1.4) {
          clearInterval(interval);
          setPhase('hacked');
          setTime(3.8);
        } else {
          setTime(elapsed);
        }
      }, 45);
    } else {
      setPhase('idle');
      setTime(12.4);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-80 w-full bg-slate-950 rounded-[2.5rem] p-6 font-mono text-[11px] text-slate-300 relative overflow-hidden flex flex-col justify-between border border-slate-900 shadow-inner mt-6 transition-all duration-300 hover:border-slate-800"
    >
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .scan-bar {
          animation: scanline 4s linear infinite;
        }
      `}</style>
      
      {/* Matrix scanning bar */}
      <div className="absolute left-0 right-0 h-1 bg-indigo-500/10 scan-bar pointer-events-none blur-[1px]" />

      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
        </div>
        <span className="text-[8px] uppercase tracking-widest text-slate-500 font-black flex items-center gap-1">
          <Terminal size={10} />
          <span>AcademyPro_Terminal v3</span>
        </span>
      </div>

      {/* Console Body */}
      <div className="flex-1 py-4 space-y-3 flex flex-col justify-center">
        <div>
          <span className="text-indigo-400 font-black flex items-center gap-1">
            <Code size={10} />
            <span># CALCULUS VECTOR STRUCTURE:</span>
          </span>
          <p className="text-white mt-1 font-black text-xs">Integrate: f(x) = x * e^(x²)</p>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="text-slate-500 font-bold">// Standard integration steps (90s avg)</p>
              <p className="text-slate-400 text-[10px]">Let u = x², du = 2x dx...</p>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5 mt-2">
                <span className="text-amber-500 font-black text-[9px] uppercase tracking-wider">Estimated Time:</span>
                <span className="font-black text-white">{time.toFixed(1)}s</span>
              </div>
            </motion.div>
          )}

          {phase === 'solving' && (
            <motion.div 
              key="solving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-indigo-400 font-black">
                <span className="animate-spin w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full" />
                <span>Injecting matrix substitution...</span>
              </div>
              <p className="text-slate-500">Injecting substitution variables...</p>
              <div className="flex justify-between items-center bg-indigo-500/5 p-3 rounded-2xl border border-indigo-500/10">
                <span className="text-indigo-400 font-black text-[9px] uppercase tracking-wider">COMPILING SPEED:</span>
                <span className="font-black text-slate-200">{time.toFixed(2)}s</span>
              </div>
            </motion.div>
          )}

          {phase === 'hacked' && (
            <motion.div 
              key="hacked"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-md text-[8px] font-black uppercase tracking-widest">
                <Sparkles size={8} />
                <span>★ TARGET COMPLETED</span>
              </div>
              <p className="text-white font-black text-xs">Solution: F(x) = (1/2)e^(x²) + C</p>
              <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                <span className="text-emerald-400 font-black text-[9px] uppercase tracking-wider">SOLVE RATE:</span>
                <span className="font-black text-emerald-400 text-xs">{time.toFixed(1)}s!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Console Footer */}
      <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[8px] text-slate-500">
        <span>STATUS: {phase === 'hacked' ? 'SUCCESS_SYNTAX' : phase === 'solving' ? 'EXECUTING' : 'READY_VECTOR'}</span>
        <span className="text-indigo-400 animate-pulse font-bold">HOVER TO COMPILE HACK</span>
      </div>
    </div>
  );
};

const InteractionWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const chats = [
    { sender: "student", text: "Why does light bend in water?" },
    { sender: "faculty", text: "Refractive index change slows it down!" },
    { sender: "student", text: "Got it! Simple analogy." }
  ];

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-56 w-full relative flex flex-col justify-end overflow-hidden bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-5 mt-6 group-hover:bg-indigo-50/20 transition-all duration-500"
    >
      <div className="space-y-3">
        {chats.map((chat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: idx === 0 ? 1 : 0, y: 0 }}
            transition={{ delay: idx * 0.18, duration: 0.4 }}
            className={`flex ${chat.sender === 'student' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-xs font-bold leading-snug shadow-sm ${
              chat.sender === 'student' 
                ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
                : 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/10'
            }`}>
              {chat.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TimeStrategyWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-56 w-full relative flex items-center justify-center overflow-hidden bg-slate-50/50 rounded-[2.5rem] border border-slate-100 mt-6 group-hover:bg-indigo-50/20 transition-all duration-500"
    >
      {/* Speed Dial Gauge */}
      <div className="relative flex items-center justify-center">
        <svg className="w-28 h-28 transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="44"
            className="stroke-slate-100 fill-none"
            strokeWidth="8"
          />
          <motion.circle
            cx="56"
            cy="56"
            r="44"
            className="stroke-indigo-600 fill-none"
            strokeWidth="8"
            strokeDasharray="276"
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: isHovered ? 56 : 138 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        {/* Core display */}
        <div className="absolute text-center select-none">
          <motion.span className="text-2xl font-black text-primary block">
            {isHovered ? "2.5x" : "1.0x"}
          </motion.span>
          <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest block">
            {isHovered ? "Pacing Rate" : "Standard Speed"}
          </span>
        </div>
      </div>
      
      {/* Floating indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-around px-4">
        <div className="text-center">
          <span className="text-[8px] font-black text-slate-400 block uppercase tracking-wide">Accuracy</span>
          <span className="text-xs font-black text-emerald-500">{isHovered ? "98%" : "68%"}</span>
        </div>
        <div className="text-center">
          <span className="text-[8px] font-black text-slate-400 block uppercase tracking-wide">Doubt Rate</span>
          <span className="text-xs font-black text-indigo-550">{isHovered ? "<2%" : "24%"}</span>
        </div>
      </div>
    </div>
  );
};

export const DemoBenefits = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Dot Pattern Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6"
          >
            <Sparkles size={11} className="text-indigo-500 animate-bounce" />
            <span>Interactive Framework</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-primary tracking-tighter mb-6 uppercase leading-none"
          >
            Why Attend a Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">Demo?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto font-medium text-base"
          >
            Discover our customized learning infrastructure, visual learning setups, and pacing frameworks that boost diagnostic scores instantly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Problem Solving (Left, spans 2 rows on desktop) */}
          <SpotlightCard className="lg:col-span-1 lg:row-span-2 flex flex-col justify-between" delay={0}>
            <div>
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-inner border border-indigo-100/30">
                <Zap size={28} />
              </div>
              <h4 className="text-2xl font-black text-primary tracking-tight mb-3">Problem Solving</h4>
              <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                Utilize customized <span className="text-indigo-600 font-bold">"AcademyPro Hacks"</span> to compress standard integration tasks from 90s into 4s. Hover the terminal console to activate the hack compiled speed.
              </p>
            </div>
            <ProblemSolvingWidget />
          </SpotlightCard>

          {/* Card 2: Visual Clarity (Top Right, spans 2 columns) */}
          <SpotlightCard className="lg:col-span-2 lg:row-span-1 flex flex-col sm:flex-row gap-8 items-center" delay={0.1}>
            <div className="flex-1">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-inner border border-indigo-100/30">
                <Eye size={28} />
              </div>
              <h4 className="text-2xl font-black text-primary tracking-tight mb-3">Visual Clarity</h4>
              <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                Understand complex 3D concepts and vectors with our high-end digital visualization orbits. Move your mouse to explore the mesh nodes in real-time.
              </p>
            </div>
            <div className="w-full sm:w-1/2">
              <VisualClarityWidget />
            </div>
          </SpotlightCard>

          {/* Card 3: Interaction (Bottom Middle, 1 column) */}
          <SpotlightCard className="lg:col-span-1 lg:row-span-1 flex flex-col justify-between" delay={0.2}>
            <div>
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-inner border border-indigo-100/30">
                <Coffee size={28} />
              </div>
              <h4 className="text-2xl font-black text-primary tracking-tight mb-3">Active Interaction</h4>
              <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                Experience dynamic live doubt-solving matrices where every question meets a real-time vector response from top faculty.
              </p>
            </div>
            <InteractionWidget />
          </SpotlightCard>

          {/* Card 4: Time Strategy (Bottom Right, 1 column) */}
          <SpotlightCard className="lg:col-span-1 lg:row-span-1 flex flex-col justify-between" delay={0.3}>
            <div>
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-inner border border-indigo-100/30">
                <Clock size={28} />
              </div>
              <h4 className="text-2xl font-black text-primary tracking-tight mb-3">Time Strategy</h4>
              <p className="text-slate-500 text-[13px] font-semibold leading-relaxed">
                Tune your standard baseline speeds into accelerated diagnostic pacing loops through circular HSL speedometer widgets.
              </p>
            </div>
            <TimeStrategyWidget />
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
