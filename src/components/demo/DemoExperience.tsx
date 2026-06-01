import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MonitorPlay, Users2, FileText, CheckCircle2, Heart, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

const LiveStreamingScreen = () => {
  const [seconds, setSeconds] = useState(15);
  
  useEffect(() => {
    const int = setInterval(() => {
      setSeconds(s => (s + 1) % 60);
    }, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl relative overflow-hidden flex flex-col justify-between p-5 border border-white/5 shadow-inner">
      <style>{`
        @keyframes ecg-line {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        .ecg-curve {
          stroke-dasharray: 400;
          animation: ecg-line 3s linear infinite;
        }
      `}</style>

      {/* Header telemetry */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2 bg-rose-600 px-3 py-1 rounded-md text-[9px] font-black tracking-widest text-white uppercase animate-pulse shadow-lg shadow-rose-600/30">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>LIVE 4K SIGNAL</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded">
          00:42:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      {/* Center animated ECG soundwave */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg className="w-full h-32" viewBox="0 0 400 100">
          {/* Flat line, sharp peak, drop, flat */}
          <path 
            d="M0,50 L120,50 L130,20 L140,80 L150,45 L160,55 L170,50 L280,50 L290,10 L300,90 L310,40 L320,50 L400,50" 
            fill="none" 
            stroke="rgba(99, 102, 241, 0.4)" 
            strokeWidth="2.5" 
            className="ecg-curve" 
          />
        </svg>
      </div>

      {/* Concentric HUD orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg className="w-44 h-44 animate-spin" style={{ animationDuration: '15s' }}>
          <circle cx="88" cy="88" r="60" className="stroke-indigo-500 fill-none" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="88" cy="88" r="80" className="stroke-purple-500 fill-none" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Footer controls */}
      <div className="flex justify-between items-center z-10 border-t border-white/5 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Physics - Calculus L3</span>
        </div>
        <div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 text-[9px] font-black text-indigo-400 tracking-widest uppercase">
          <Heart size={10} className="animate-pulse" />
          <span>HOD STREAM ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

const SmartChatScreen = () => {
  const [messages, setMessages] = useState([
    { user: "Aarav", msg: "Could you explain option C again?" },
    { user: "HOD Physics", msg: "Option C assumes constant acceleration.", isHOD: true }
  ]);

  const pool = [
    { user: "Sneha", msg: "Ah! Because of the force vector!" },
    { user: "HOD Physics", msg: "Correct. F = ma is vector-aligned here.", isHOD: true },
    { user: "Kabir", msg: "Is this formula valid in vacuum too?" },
    { user: "HOD Physics", msg: "Yes, gravity doesn't require medium.", isHOD: true }
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setMessages(prev => {
        const next = [...prev, pool[index]];
        if (next.length > 3) next.shift();
        return next;
      });
      index = (index + 1) % pool.length;
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl p-5 flex flex-col justify-between border border-white/5 font-mono text-[10px] shadow-inner">
      <div className="border-b border-white/5 pb-3 flex justify-between items-center">
        <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
          <Sparkles size={11} className="text-indigo-400" />
          <span>Active Moderation Feed</span>
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[8px] font-black text-emerald-400">SECURE</span>
        </div>
      </div>
      
      <div className="flex-1 py-3 space-y-3 overflow-hidden flex flex-col justify-end">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-2xl"
          >
            <div className="flex justify-between items-center">
              <span className={m.isHOD ? "text-indigo-400 font-black" : "text-amber-500 font-black"}>
                {m.isHOD ? "★ " : ""}{m.user}
              </span>
              <span className="text-[7.5px] text-slate-600 font-bold uppercase">{m.isHOD ? "HOD COUNSELOR" : "STUDENT"}</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-bold">{m.msg}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-white/5 pt-2 flex items-center justify-end text-[8px] text-slate-500 font-bold uppercase tracking-wider">
        <span>Auto-scroll Enabled</span>
      </div>
    </div>
  );
};

const HandoutsScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setProgress(0);
    setIsDone(false);
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / 2000) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl p-5 flex flex-col justify-center items-center border border-white/5 shadow-inner">
      {/* Futuristic PDF Card */}
      <div className="w-full max-w-[210px] bg-slate-900/80 rounded-2xl p-4 border border-white/5 flex flex-col items-center gap-3 relative shadow-2xl my-2 overflow-hidden group">
        <style>{`
          @keyframes border-glow {
            0%, 100% { border-color: rgba(99, 102, 241, 0.1); }
            50% { border-color: rgba(99, 102, 241, 0.4); }
          }
          .card-glow {
            animation: border-glow 2s ease-in-out infinite;
          }
        `}</style>
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10" />

        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
          <FileText size={20} />
        </div>
        <div className="text-center font-mono">
          <span className="text-[10px] font-black text-slate-200 block truncate max-w-[150px]">Physics_Calculus_L3.pdf</span>
          <span className="text-[8px] text-slate-500 uppercase block font-black mt-0.5">1.8 MB</span>
        </div>
        
        {/* Progress bar or done badge */}
        {!isDone ? (
          <div className="w-full space-y-1.5">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-secondary to-indigo-500 transition-all duration-75" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              <span className="animate-pulse">DELIVERING...</span>
              <span>{progress}%</span>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 text-emerald-400 font-mono text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md"
          >
            <CheckCircle2 size={12} />
            <span>Delivered via Mail</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DiagnosticTestScreen = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl p-5 flex flex-col justify-between border border-white/5 font-mono text-[10px] shadow-inner">
      <div className="flex justify-end items-center border-b border-white/5 pb-3 text-[9px] text-indigo-400 font-bold uppercase tracking-wider">
        <span className="font-black">XP: {selected === 'B' ? '+50 XP' : '0 XP'}</span>
      </div>

      <div className="space-y-3 my-1">
        <div className="flex gap-2">
          <span className="text-indigo-400 font-black">Q:</span>
          <p className="text-slate-200 font-black leading-relaxed">Which element has the absolute highest electronegativity?</p>
        </div>
        
        <div className="space-y-2">
          {['Oxygen', 'Fluorine', 'Chlorine'].map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isCorrect = letter === 'B';
            const isSel = selected === letter;
            let btnClass = "border-white/5 bg-white/[0.01] text-slate-400";
            if (selected) {
              if (isCorrect) btnClass = "border-emerald-500/35 bg-emerald-550/10 text-emerald-400 shadow-lg shadow-emerald-500/5";
              else if (isSel) btnClass = "border-rose-500/35 bg-rose-550/10 text-rose-450";
            } else {
              btnClass = "border-white/5 bg-white/[0.01] text-slate-400 hover:border-indigo-500/30 hover:bg-white/[0.03]";
            }
            return (
              <button
                key={letter}
                disabled={selected !== null}
                onClick={() => setSelected(letter)}
                className={`w-full text-left py-2.5 px-4 rounded-xl border transition-all duration-300 flex items-center justify-between font-mono font-bold ${btnClass}`}
              >
                <span>{letter}) {opt}</span>
                {selected && isCorrect && <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />}
                {selected && isSel && !isCorrect && <ShieldAlert size={12} className="text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end items-center border-t border-white/5 pt-2 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
        {selected && (
          <button 
            onClick={() => setSelected(null)} 
            className="text-indigo-400 underline uppercase tracking-widest font-black flex items-center gap-1 hover:text-indigo-300 transition-colors"
          >
            Reset Test
          </button>
        )}
      </div>
    </div>
  );
};

export const DemoExperience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    { title: "Live Streaming", desc: "4K interruption-free streaming with sub-second latency.", icon: <MonitorPlay />, color: "border-indigo-500 text-indigo-400 shadow-indigo-500/10" },
    { title: "Smart Chat", desc: "Real-time query resolution using our proprietary chat moderation.", icon: <Users2 />, color: "border-purple-500 text-purple-400 shadow-purple-500/10" },
    { title: "Handouts", desc: "Instant PDF summary of the entire session delivered to your mail.", icon: <FileText />, color: "border-amber-500 text-amber-400 shadow-amber-500/10" },
    { title: "Diagnostic Test", desc: "A micro 15-min post-class test to check your absorption.", icon: <CheckCircle2 />, color: "border-emerald-500 text-emerald-400 shadow-emerald-500/10" }
  ];

  const screens = [
    <LiveStreamingScreen key="streaming" />,
    <SmartChatScreen key="chat" />,
    <HandoutsScreen key="handouts" />,
    <DiagnosticTestScreen key="diagnostic" />
  ];

  return (
    <section className="pt-12 pb-12 bg-slate-950 text-white overflow-hidden relative">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Cyber lights */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35%] h-full bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left panel: Information & Tabs */}
          <div className="lg:w-1/2 w-full">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-5xl lg:text-6xl font-black tracking-tighter mb-8 uppercase leading-none"
             >
               The Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-500 italic">Experience.</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-slate-400 font-medium mb-12 text-base leading-relaxed max-w-lg"
             >
               We construct highly immersive visual narratives instead of standard lecturing loops. Sit in on an active live class and test our modular tools below.
             </motion.p>
             
             <div className="space-y-4">
                {steps.map((step, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTab(i)}
                    className={`w-full flex gap-6 items-start text-left p-6 rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden group ${
                      activeTab === i 
                        ? 'bg-white/5 border-white/10 shadow-lg' 
                        : 'border-transparent hover:bg-white/[0.02]'
                    }`}
                  >
                     {activeTab === i && (
                       <motion.div 
                         layoutId="activeTabGlow"
                         className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-secondary to-indigo-500" 
                       />
                     )}
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                       activeTab === i 
                         ? step.color + ' bg-white/5 shadow-inner' 
                         : 'bg-white/5 border-white/10 text-slate-500 group-hover:text-slate-300'
                     }`}>
                        {React.cloneElement(step.icon, { size: 20 })}
                     </div>
                     <div>
                        <h4 className={`text-lg font-bold mb-1 transition-colors ${
                          activeTab === i ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>{step.title}</h4>
                        <p className={`text-xs transition-colors leading-relaxed ${
                          activeTab === i ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'
                        }`}>{step.desc}</p>
                     </div>
                  </button>
                ))}
             </div>
          </div>

          {/* Right panel: Cyber Slate Console Mock */}
          <div className="lg:w-1/2 w-full relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.96 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="aspect-[4/3] bg-white/[0.02] rounded-[3.5rem] p-6 border border-white/10 relative shadow-2xl flex flex-col backdrop-blur-2xl"
             >

                {/* Dashboard Viewport Display Screen */}
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      {screens[activeTab]}
                    </motion.div>
                  </AnimatePresence>
                </div>
             </motion.div>
             {/* Decorative neon backglow behind console */}
             <div className="absolute inset-0 bg-gradient-to-tr from-secondary/15 to-indigo-500/15 rounded-[3.5rem] filter blur-2xl -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
