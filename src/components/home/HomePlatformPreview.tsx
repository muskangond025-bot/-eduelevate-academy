import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Radio, Users, Send } from 'lucide-react';

const CHAT_MESSAGES = [
  { sender: 'Rohan Deshmukh', text: 'Is the angular momentum quantized in all orbits?' },
  { sender: 'Dr. Rahul Verma (HOD)', text: 'Yes Rohan! L = n * (h / 2π). Let\'s verify this on the blackboard.' },
  { sender: 'Ananya Gupta', text: 'Does this explain the spectral series lines?' },
  { sender: 'Dr. Rahul Verma (HOD)', text: 'Exactly, the transition between energy states releases specific photon wavelengths.' },
  { sender: 'Siddharth Roy', text: 'Got it, the emission lines correspond to those energy gaps!' }
];

const getElectronProps = (
  time: number,
  a: number,
  b: number,
  phiDeg: number,
  speed: number,
  phase: number
) => {
  const phi = (phiDeg * Math.PI) / 180;
  const theta = time * speed + phase;
  
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  
  const xEllipse = a * cosTheta;
  const yEllipse = b * sinTheta;
  
  const x = 120 + xEllipse * Math.cos(phi) - yEllipse * Math.sin(phi);
  const y = 120 + xEllipse * Math.sin(phi) + yEllipse * Math.cos(phi);
  
  // sinTheta represents the depth of the electron along the circular orbit:
  // -1 is furthest back, +1 is closest front.
  const depth = sinTheta; 
  const isBack = sinTheta < 0;
  
  // Calculate un-squashed 3D visual properties
  const r = 7.5 + depth * 2.2; // perfect circle size scaling from 5.3px to 9.7px
  const opacity = 0.7 + (depth + 1) * 0.15; // opacity ranges from 0.7 to 1.0
  const glow = 8 + (depth + 1) * 4; // glow shadow radius from 8px to 16px

  return { x, y, r, opacity, glow, isBack };
};

export const HomePlatformPreview = () => {
  const [visibleChats, setVisibleChats] = useState<typeof CHAT_MESSAGES>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animId: number;
    const tick = () => {
      setTime(t => t + 0.015);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    setVisibleChats([CHAT_MESSAGES[0]]);
    let idx = 1;
    const interval = setInterval(() => {
      setVisibleChats(prev => {
        const next = [...prev, CHAT_MESSAGES[idx]];
        if (next.length > 3) next.shift(); // Keep last 3 messages
        return next;
      });
      idx = (idx + 1) % CHAT_MESSAGES.length;
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const e1 = getElectronProps(time, 64, 24, -25, 1.6, 0);
  const e2 = getElectronProps(time, 90, 34, 35, -1.1, 2.0);
  const e3 = getElectronProps(time, 114, 42, 95, 0.8, 4.0);

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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
           <div className="max-w-3xl">


              <h2 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 uppercase tracking-tighter mb-8 font-sans overflow-visible py-1">
                Live Digital{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold italic px-1">
                  Infrastructure.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                Experience the most advanced virtual classroom in India. High-definition interactive streaming, instant in-class doubt-solving, and peer-to-peer competition.
              </p>
           </div>
        </div>

        {/* Dashboard Console Preview Box */}
        <div className="relative group">
           {/* Glow background wash */}
           <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.5rem] opacity-10 blur-2xl group-hover:opacity-15 transition-opacity duration-700" />
           
           <div className="relative bg-slate-950 rounded-[2.5rem] border border-slate-900 shadow-[0_30px_60px_rgba(15,23,42,0.06)] overflow-hidden">
              
              {/* Console Main Body Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 min-h-[480px]">
                 
                 {/* Video Stream Canvas (Left 60%) */}
                 <div className="lg:col-span-7 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-900 flex flex-col justify-between relative overflow-hidden bg-slate-950">
                    
                    {/* Background SVG grid */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, white 1px, transparent 1px),
                          linear-gradient(to bottom, white 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Lesson tag overlay */}
                    <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                       Topic: Modern Atom & Bohr Orbitals
                    </div>

                    {/* Animated Bohr Atom SVG Visualizer */}
                    <div className="flex items-center justify-center my-auto py-12">
                       <svg className="w-[260px] h-[260px] overflow-visible" viewBox="0 0 240 240">
                          <defs>
                            {/* Glowing central core gradients */}
                            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                            </radialGradient>
                            
                            <radialGradient id="nucleusGrad1" cx="30%" cy="30%" r="70%">
                              <stop offset="0%" stopColor="#f87171" />
                              <stop offset="40%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#b91c1c" />
                            </radialGradient>

                            <radialGradient id="nucleusGrad2" cx="30%" cy="30%" r="70%">
                              <stop offset="0%" stopColor="#c084fc" />
                              <stop offset="40%" stopColor="#a855f7" />
                              <stop offset="100%" stopColor="#7e22ce" />
                            </radialGradient>

                            {/* Electron 3D Gradients */}
                            <radialGradient id="electronBlue" cx="30%" cy="30%" r="70%">
                              <stop offset="0%" stopColor="#a5f3fc" />
                              <stop offset="35%" stopColor="#38bdf8" />
                              <stop offset="100%" stopColor="#0369a1" />
                            </radialGradient>

                            <radialGradient id="electronRed" cx="30%" cy="30%" r="70%">
                              <stop offset="0%" stopColor="#fecdd3" />
                              <stop offset="35%" stopColor="#f43f5e" />
                              <stop offset="100%" stopColor="#be123c" />
                            </radialGradient>

                            <radialGradient id="electronGreen" cx="30%" cy="30%" r="70%">
                              <stop offset="0%" stopColor="#a7f3d0" />
                              <stop offset="35%" stopColor="#34d399" />
                              <stop offset="100%" stopColor="#047857" />
                            </radialGradient>
                          </defs>

                          {/* 1. Orbit lines (drawn in background with precise direct ellipses for uniform strokes) */}
                          <ellipse cx="120" cy="120" rx="64" ry="24" transform="rotate(-25, 120, 120)" fill="none" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <ellipse cx="120" cy="120" rx="90" ry="34" transform="rotate(35, 120, 120)" fill="none" stroke="rgba(244, 63, 94, 0.18)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <ellipse cx="120" cy="120" rx="114" ry="42" transform="rotate(95, 120, 120)" fill="none" stroke="rgba(52, 211, 153, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* 2. Background Electrons (drawn behind nucleus when isBack is true) */}
                          {e1.isBack && (
                            <circle 
                              cx={e1.x} 
                              cy={e1.y} 
                              r={e1.r} 
                              fill="url(#electronBlue)" 
                              opacity={e1.opacity}
                              style={{ filter: `drop-shadow(0 0 ${e1.glow}px #38bdf8)` }} 
                            />
                          )}
                          {e2.isBack && (
                            <circle 
                              cx={e2.x} 
                              cy={e2.y} 
                              r={e2.r} 
                              fill="url(#electronRed)" 
                              opacity={e2.opacity}
                              style={{ filter: `drop-shadow(0 0 ${e2.glow}px #f43f5e)` }} 
                            />
                          )}
                          {e3.isBack && (
                            <circle 
                              cx={e3.x} 
                              cy={e3.y} 
                              r={e3.r} 
                              fill="url(#electronGreen)" 
                              opacity={e3.opacity}
                              style={{ filter: `drop-shadow(0 0 ${e3.glow}px #34d399)` }} 
                            />
                          )}

                          {/* 3. Pulsating 3D Nucleus Core Cluster */}
                          <motion.g
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            style={{ transformOrigin: '120px 120px' }}
                          >
                            {/* Large Ambient Nucleus Glow */}
                            <circle cx="120" cy="120" r="30" fill="url(#coreGlow)" />
                            
                            {/* Overlapping Protons/Neutrons (Stunning 3D Cluster) */}
                            <circle cx="114" cy="126" r="9" fill="url(#nucleusGrad1)" style={{ filter: 'drop-shadow(0 2px 4px rgba(185,28,28,0.4))' }} />
                            <circle cx="127" cy="115" r="9" fill="url(#nucleusGrad2)" style={{ filter: 'drop-shadow(0 2px 4px rgba(126,34,206,0.4))' }} />
                            <circle cx="126" cy="126" r="9.5" fill="url(#nucleusGrad1)" style={{ filter: 'drop-shadow(0 2px 4px rgba(185,28,28,0.4))' }} />
                            <circle cx="113" cy="114" r="9" fill="url(#nucleusGrad2)" style={{ filter: 'drop-shadow(0 2px 4px rgba(126,34,206,0.4))' }} />
                            <circle cx="120" cy="121" r="9.5" fill="url(#nucleusGrad1)" style={{ filter: 'drop-shadow(0 2px 4px rgba(185,28,28,0.5))' }} />
                          </motion.g>

                          {/* 4. Foreground Electrons (drawn in front of nucleus when isBack is false) */}
                          {!e1.isBack && (
                            <circle 
                              cx={e1.x} 
                              cy={e1.y} 
                              r={e1.r} 
                              fill="url(#electronBlue)" 
                              opacity={e1.opacity}
                              style={{ filter: `drop-shadow(0 0 ${e1.glow}px #38bdf8)` }} 
                            />
                          )}
                          {!e2.isBack && (
                            <circle 
                              cx={e2.x} 
                              cy={e2.y} 
                              r={e2.r} 
                              fill="url(#electronRed)" 
                              opacity={e2.opacity}
                              style={{ filter: `drop-shadow(0 0 ${e2.glow}px #f43f5e)` }} 
                            />
                          )}
                          {!e3.isBack && (
                            <circle 
                              cx={e3.x} 
                              cy={e3.y} 
                              r={e3.r} 
                              fill="url(#electronGreen)" 
                              opacity={e3.opacity}
                              style={{ filter: `drop-shadow(0 0 ${e3.glow}px #34d399)` }} 
                            />
                          )}
                       </svg>
                    </div>

                    {/* Stream footer bar */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-900/60">
                       <span>STREAM QUALITY: 4K SOURCE</span>
                       <span>FPS: 60.00</span>
                    </div>

                 </div>

                 {/* Active Q&A, Chat & Interactive Poll (Right 40%) */}
                 <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-slate-950/80 backdrop-blur-md">
                    
                    {/* Live Q&A Section */}
                    <div className="flex-1 flex flex-col justify-between mb-6">
                       <div>
                          <div className="flex items-center gap-1.5 mb-6 text-[10px] font-mono text-indigo-400 tracking-wider">
                             <MessageSquare size={12} />
                             <span>CLASSROOM CHAT FEED</span>
                          </div>

                          {/* Chat Roll */}
                          <div className="space-y-4 min-h-[160px] flex flex-col justify-end">
                            <AnimatePresence>
                              {visibleChats.map((chat, idx) => (
                                <motion.div
                                  key={chat.sender + idx}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="text-xs"
                                >
                                  <span 
                                    className="font-bold font-mono mr-2"
                                    style={{ color: chat.sender.includes('HOD') ? '#8b5cf6' : '#94a3b8' }}
                                  >
                                    {chat.sender}:
                                  </span>
                                  <span className="text-slate-300 font-medium leading-relaxed">{chat.text}</span>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                       </div>
                    </div>

                    {/* Interactive Poll Widget */}
                    <div className="space-y-3.5 pt-6 border-t border-slate-900">
                      <div className="space-y-2.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Live Interactive Poll</span>
                        <span className="text-xs text-slate-300 font-bold block">Q. Which model explains the discrete spectrum of Hydrogen?</span>
                        
                        {/* Option 1 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-slate-400">
                            <span>Bohr Orbit Model</span>
                            <span className="text-emerald-400 font-bold">84%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '84%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981]" 
                            />
                          </div>
                        </div>

                        {/* Option 2 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-slate-400">
                            <span>Rutherford Core Model</span>
                            <span>12%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '12%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-slate-700 rounded-full" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                 </div>

              </div>

           </div>
        </div>
      </div>
    </section>
  );
};
