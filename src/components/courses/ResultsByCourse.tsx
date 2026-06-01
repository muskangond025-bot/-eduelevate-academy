import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Cpu, Sparkles, Activity, ShieldCheck, Trophy, Sparkle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const resultsByCourse = [
  { 
    course: "JEE Advanced", 
    air: "IIT Bombay CSE Selection", 
    stat: "1 in 4 Students Qualified", 
    color: "from-blue-500 to-indigo-600",
    glow: "rgba(59, 130, 246, 0.2)",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    targetNum: 25,
    unit: "%",
    metricLabel: "IITB CSE Entry Rate",
    telemetry: ["INITIALIZE WAVE MATRIX...", "COHERENCE RATIO: 99.4%", "IITB SELECTION DETECTED", "SUCCESS VECTOR ACTIVE"],
    visualizer: "jee"
  },
  { 
    course: "NEET UG", 
    air: "715/720 Peak Score", 
    stat: "85% Selection Ratio", 
    color: "from-rose-500 to-red-600",
    glow: "rgba(244, 63, 94, 0.2)",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    targetNum: 715,
    unit: "/720",
    metricLabel: "Peak Scholar Score",
    telemetry: ["ECG PULSE CONNECTED...", "ACCURACY CALIBRATION: 99.8%", "180+ SEATS LOCKED IN", "SCHOLAR SYSTEM ACTIVE"],
    visualizer: "neet"
  },
  { 
    course: "MHT-CET", 
    air: "99.99%tile Rank 1", 
    stat: "1500+ Merit Rankings", 
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16, 185, 129, 0.2)",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    targetNum: 99.99,
    unit: "%",
    metricLabel: "AIR Rank Percentile",
    telemetry: ["RADAR CONSOLE ACTIVE...", "100%tile PATH SCANNED", "VJTI & COEP LOCKED IN", "EXCELLENCE CONFIRMED"],
    visualizer: "cet"
  },
  { 
    course: "NDA", 
    air: "SSB Recommended Scholars", 
    stat: "Top Selection in District", 
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245, 158, 11, 0.2)",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    targetNum: 12,
    unit: " Officers",
    metricLabel: "SSB Recommended Officers",
    telemetry: ["COMPASS ORIENTATION...", "TARGET ACQUISITION: 100%", "FLYING BRANCH SELECTED", "OFFICER CALIBRATED"],
    visualizer: "nda"
  },
];

// Reusable SVG Gradient and Style Definitions
const SVGStylesAndGradients = () => (
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#10B981" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="blueGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <filter id="glowFilter">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <style>{`
      @keyframes ecgPulse {
        0% { stroke-dashoffset: 240; }
        60% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -240; }
      }
      @keyframes radarSweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes radarLockOn {
        0%, 100% { opacity: 0.3; transform: scale(0.85); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      @keyframes targetReticleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(4px, -4px) scale(1.05); }
      }
      @keyframes glowPulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.95; }
      }
    `}</style>
  </svg>
);

// MAPPED INTERACTIVE STREAM VISUALIZERS
const VisualizerContainer = ({ type, isHovered }: { type: string; isHovered: boolean }) => {
  switch (type) {
    case "jee":
      // JEE (Concentric electron orbitals)
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(96, 165, 250, 0.06)" strokeWidth="1" strokeDasharray="2 2" />
          
          <circle cx="50" cy="50" r="5" fill="url(#blueGlowGradient)" filter="url(#glowFilter)" style={{ animation: 'glowPulse 2s infinite' }} />
          
          <g className={`origin-center ${isHovered ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_10s_linear_infinite]'}`}>
            <circle cx="94" cy="50" r="3.5" fill="#3B82F6" filter="url(#glowFilter)" />
          </g>
          <g className={`origin-center ${isHovered ? 'animate-[spin_2.5s_linear_infinite_reverse]' : 'animate-[spin_7s_linear_infinite_reverse]'}`}>
            <circle cx="82" cy="50" r="3" fill="#6366F1" filter="url(#glowFilter)" />
          </g>
          <g className={`origin-center ${isHovered ? 'animate-[spin_1.5s_linear_infinite]' : 'animate-[spin_5s_linear_infinite]'}`}>
            <circle cx="70" cy="50" r="2.5" fill="#60A5FA" filter="url(#glowFilter)" />
          </g>
        </svg>
      );
      
    case "neet":
      // NEET (ECG Pulse waves with a running tracker)
      return (
        <svg className="w-full h-full" viewBox="0 0 120 80">
          <path d="M 0 40 L 120 40" stroke="rgba(244, 63, 94, 0.05)" strokeWidth="0.8" strokeDasharray="3 3" />
          <path 
            d="M 10 40 L 35 40 L 40 32 L 45 48 L 50 12 L 55 68 L 60 40 L 75 40 L 80 35 L 85 45 L 90 40 L 110 40" 
            fill="none" 
            stroke="rgba(244, 63, 94, 0.15)" 
            strokeWidth="1.5" 
          />
          <path 
            d="M 10 40 L 35 40 L 40 32 L 45 48 L 50 12 L 55 68 L 60 40 L 75 40 L 80 35 L 85 45 L 90 40 L 110 40" 
            fill="none" 
            stroke="#F43F5E" 
            strokeWidth="2.5" 
            strokeDasharray="240"
            strokeDashoffset="240"
            filter="url(#glowFilter)"
            style={{ animation: 'ecgPulse 2.5s ease-in-out infinite' }}
          />
        </svg>
      );
      
    case "cet":
      // MHT-CET (Concentric radar scanning board)
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(16, 185, 129, 0.03)" strokeWidth="1" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="0.8" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="0.8" />
          
          <g className="origin-center" style={{ animation: `radarSweep ${isHovered ? '2.5s' : '5s'} linear infinite` }}>
            <line x1="50" y1="50" x2="50" y2="5" stroke="url(#radarGradient)" strokeWidth="2.5" />
          </g>
          
          <circle cx="70" cy="30" r="3" fill="#10B981" filter="url(#glowFilter)" style={{ animation: 'radarLockOn 2s infinite' }} />
          <circle cx="30" cy="65" r="2.5" fill="#34D399" filter="url(#glowFilter)" style={{ animation: 'radarLockOn 1.6s infinite 0.4s' }} />
        </svg>
      );
      
    case "nda":
      // NDA (Military compass coordinate target acquisition locking reticle)
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(245, 158, 11, 0.12)" strokeWidth="1" strokeDasharray="5 3" className="animate-[spin_12s_linear_infinite]" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="0.8" />
          
          <path d="M 50 12 L 50 25 M 50 75 L 50 88 M 12 50 L 25 50 M 75 50 L 88 50" stroke="rgba(245, 158, 11, 0.18)" strokeWidth="1.2" />
          
          <g className="origin-center animate-[spin_6s_linear_infinite_reverse]">
            <rect x="40" y="40" width="20" height="20" fill="none" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1" strokeDasharray="4 2" />
          </g>
          
          <g style={{ animation: 'targetReticleFloat 3s ease-in-out infinite' }}>
            <circle cx="50" cy="50" r="2" fill="#F59E0B" filter="url(#glowFilter)" />
            <path d="M 45 45 L 48 45 M 45 45 L 45 48 M 55 45 L 52 45 M 55 45 L 55 48 M 45 55 L 48 55 M 45 55 L 45 52 M 55 55 L 52 55 M 55 55 L 55 52" stroke="#F59E0B" strokeWidth="1.2" />
          </g>
        </svg>
      );
      
    default:
      return null;
  }
};

// Coordinate-Tracking Sparks trail
const SparkParticlesTrail = ({ mouseX, mouseY, active }: { mouseX: number; mouseY: number; active: boolean }) => {
  if (!active) return null;
  return (
    <>
      <div 
        className="absolute w-2 h-2 rounded-full bg-indigo-400/40 pointer-events-none blur-[1.5px] transition-all duration-300 ease-out"
        style={{ left: mouseX - 4, top: mouseY - 4 }}
      />
      <div 
        className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/30 pointer-events-none blur-[1px] transition-all duration-500 ease-out"
        style={{ left: mouseX - 3, top: mouseY - 3 }}
      />
      <div 
        className="absolute w-1 h-1 rounded-full bg-white/50 pointer-events-none transition-all duration-700 ease-out"
        style={{ left: mouseX - 2, top: mouseY - 2 }}
      />
    </>
  );
};

// Interactive Typewriter Calibration Diagnostics
const TypewriterTerminal = ({ logs, active }: { logs: string[]; active: boolean }) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!active) {
      setVisibleLogs([]);
      return;
    }

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setVisibleLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 280); // cascades

    return () => clearInterval(interval);
  }, [active, logs]);

  return (
    <div className="space-y-1.5 min-h-[92px]">
      {visibleLogs.map((log, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[11px] font-mono font-bold text-indigo-200/50"
        >
          <span className="text-indigo-400 font-extrabold">&gt;</span>
          <span className="font-mono tracking-wide">{log}</span>
        </motion.div>
      ))}
      {active && visibleLogs.length < logs.length && (
        <span className="inline-block w-1.5 h-3 bg-indigo-400 animate-pulse ml-1 align-middle" />
      )}
    </div>
  );
};

// Ticking Live Telemetry Counter
const LiveCounter = ({ target, unit, isHovered }: { target: number; unit: string; isHovered: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 1000; // ms
    const stepTime = 16; 
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(target % 1 === 0 ? 0 : 2)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, isHovered]);

  return (
    <span className="font-mono text-4xl lg:text-5xl font-black tracking-tight text-white select-none">
      {count}
      <span className="text-lg font-bold opacity-60 ml-0.5">{unit}</span>
    </span>
  );
};

export const ResultsByCourse = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Parallax Tilt angles
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
        rotateX: (yc - y) / 10, // 3d tilt coordinates
        rotateY: (x - xc) / 10
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
      className="pt-6 pb-24 bg-[#04060E] text-white relative overflow-hidden"
    >
      {/* Global CSS Gradients and styling values */}
      <SVGStylesAndGradients />

      {/* Grid Canvas backdrop overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glowing backdrop meshes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-28 gap-10">
          <div>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
              Course-Wise <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 italic">Excellence</span>
            </h2>
            <p className="text-indigo-200/70 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Every syllabus and batch is calibrated with cybernetic precision. Experience our peerless results through detailed metrics.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/results')}
            className="relative group overflow-hidden bg-slate-900 border border-white/10 text-white font-extrabold tracking-widest text-xs uppercase px-10 py-5 rounded-2xl shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:scale-102 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Full Results Report <ArrowUpRight size={16} className="text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Dynamic Card Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resultsByCourse.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;
            const tilt = tilts[i] || { rotateX: 0, rotateY: 0 };
            const localMouse = cardMice[i] || { x: 0, y: 0 };

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  handleCardMouseLeave(i);
                }}
                onMouseMove={(e) => handleCardMouseMove(e, i)}
                onClick={() => navigate('/results')}
                className={`relative group bg-[#0d1222]/30 border rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between min-h-[420px] overflow-hidden backdrop-blur-xl cursor-pointer ${
                  isHovered 
                    ? 'border-indigo-500/40 shadow-2xl scale-[1.03] z-20 bg-[#0d1222]/70' 
                    : isAnyHovered 
                      ? 'border-white/5 opacity-30 blur-[1px]' 
                      : 'border-white/10'
                }`}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  boxShadow: isHovered ? `0 25px 60px -15px ${item.glow}` : 'none',
                }}
              >
                {/* Individual Card Ambient Spotlight */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.glow}, transparent 80%)`
                  }}
                />

                {/* Card Background Color Gradient Mesh */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${item.color} opacity-[0.02] group-hover:opacity-[0.07] blur-3xl transition-opacity duration-500 pointer-events-none`} />

                {/* Sparks Tracker trailing cursor */}
                <SparkParticlesTrail mouseX={localMouse.x} mouseY={localMouse.y} active={isHovered} />

                {/* SVG Visualizer Feeds in Corner */}
                <div className="absolute top-8 right-8 w-20 h-20 pointer-events-none transition-all duration-500 group-hover:scale-105">
                  <VisualizerContainer type={item.visualizer} isHovered={isHovered} />
                </div>
                
                {/* Top Section */}
                <div className="p-8 pb-0">
                  
                  <div className="text-3xl font-black text-white tracking-tighter mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-colors">
                    {item.course}
                  </div>
                  <div className="w-12 h-0.5 bg-white/20 mb-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-700" />
                  
                  <div className="text-base font-extrabold text-indigo-200/90 leading-tight group-hover:translate-x-1.5 transition-transform">
                    {item.air}
                  </div>
                </div>

                {/* Bottom Section & Telemetry Drawer */}
                <div className="relative p-8">


                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      {/* Live Metric Ticker Indicator */}
                      <div className="h-12 flex items-center">
                        {isHovered ? (
                          <LiveCounter target={item.targetNum} unit={item.unit} isHovered={isHovered} />
                        ) : (
                          <div className="text-xl font-extrabold text-white/50 group-hover:text-white transition-colors">
                            {item.stat}
                          </div>
                        )}
                      </div>
                      
                      <span className="text-[10px] font-mono font-black text-indigo-200/30 uppercase tracking-widest mt-1">
                        {item.metricLabel}
                      </span>
                    </div>

                    {/* Spring-Loaded Link Arrow */}
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


