import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, TrendingUp, AlertTriangle, Star, ArrowUpRight } from 'lucide-react';

const SparkParticlesTrail = ({ coords, colorClass }: { coords: { x: number; y: number }; colorClass: string }) => {
  const [sparks, setSparks] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (coords.x === 0 && coords.y === 0) return;
    setSparks((prev) => {
      const next = [{ x: coords.x, y: coords.y, id: Math.random() }, ...prev];
      return next.slice(0, 3);
    });
  }, [coords]);

  return (
    <>
      {sparks.map((spark, idx) => (
        <div
          key={spark.id}
          className={`absolute pointer-events-none rounded-full blur-[1px] transition-all duration-300 ${colorClass}`}
          style={{
            left: spark.x,
            top: spark.y,
            width: `${6 - idx * 1.5}px`,
            height: `${6 - idx * 1.5}px`,
            opacity: 0.7 - idx * 0.2,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        />
      ))}
    </>
  );
};

const HighlightCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    example: string;
    badge: string;
    laserColor: string;
    glowColor: string;
    bgHover: string;
    borderGlow: string;
    sparkColor: string;
    widget: React.ReactNode;
  };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setHoveredIndex(index);
    setIsCardHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
    setIsCardHovered(false);
  };

  const isSelfHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-10 rounded-[3.2rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/40 shadow-sm border-slate-200/50 ${
        isSelfHovered
          ? `scale-[1.02] shadow-2xl ${item.bgHover} ${item.borderGlow}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-100/50'
            : 'hover:shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* CSS Animation Styles embedded locally for bulletproof rendering */}
      <style>{`
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes radar-pulse {
          0% { transform: scale(0.9); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.6; }
          100% { transform: scale(0.9); opacity: 0.2; }
        }
        @keyframes target-pulse {
          0%, 100% { stroke-width: 1px; opacity: 0.5; }
          50% { stroke-width: 2px; opacity: 1; }
        }
        @keyframes speed-sweep {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 280; }
        }
        .animate-radar-sweep {
          transform-origin: 80px 80px;
          animation: radar-sweep 5s linear infinite;
        }
        .animate-radar-pulse {
          transform-origin: 100px 110px;
          animation: radar-pulse 2s ease-in-out infinite;
        }
        .animate-target-pulse {
          animation: target-pulse 1.5s ease-in-out infinite;
        }
        .animate-speed-sweep {
          stroke-dasharray: 10, 80;
          animation: speed-sweep 4s linear infinite;
        }
      `}</style>

      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${item.glowColor}, transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[3.2rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass={item.sparkColor} />

      <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          {/* Header Cyber Badge & Icon */}
          <div className="flex items-center justify-between mb-8">
            <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner border border-slate-100/50 group-hover/card:scale-105 transition-all duration-300 text-primary`}>
              {React.cloneElement(item.icon as React.ReactElement, { size: 28, className: isSelfHovered ? 'animate-pulse' : '' })}
            </div>
            <div className="font-mono text-[8px] font-black text-slate-400 bg-slate-100/60 px-3 py-1.5 rounded-lg border border-slate-200/40 select-none">
              {item.badge}
            </div>
          </div>

          <h4 className="text-2xl font-black text-primary mb-3 tracking-tight group-hover/card:text-indigo-950 transition-colors uppercase leading-none">
            {item.title}
          </h4>
          <p className="text-slate-500 text-[13px] font-semibold leading-relaxed mb-6 italic-small">
            {item.desc}
          </p>
        </div>

        {/* Telemetry Visual Widget Box */}
        <div className="w-full h-44 bg-slate-900/5 rounded-3xl border border-slate-100 backdrop-blur-sm mb-6 flex items-center justify-center overflow-hidden relative group-hover/card:border-slate-200/50 group-hover/card:bg-slate-900/[0.02] transition-colors">
          {item.widget}
        </div>

        {/* Real-time Data Footer */}
        <div className="pt-5 border-t border-slate-200/60 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Real-time Data Example</div>
            <div className="text-[13px] font-black text-indigo-950 flex items-center gap-1.5 italic select-none">
              <Star size={13} className="text-amber-500" fill="currentColor" /> {item.example}
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-400 group-hover/card:text-indigo-600 group-hover/card:border-indigo-200 group-hover/card:bg-indigo-50/50 transition-all duration-300 shrink-0`}>
            <ArrowUpRight size={14} className="group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Tech brackets for HUD look */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute top-6 right-6 w-2.5 h-2.5 border-t-2 border-r-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 right-6 w-2.5 h-2.5 border-b-2 border-r-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
    </motion.div>
  );
};

export const AnalyticsFeaturesExtended = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const highlights = [
    {
      icon: <AlertTriangle className="text-rose-500" />,
      title: "Weak Topic Detection",
      desc: "Our AI flags sub-topics where your accuracy drops below 40% (e.g. Rotational Mechanics).",
      example: "Physics: Rigid Body Dynamics",
      badge: "[DIAGNOSTIC_GAP: UNRESOLVED // GAP_ALERT]",
      laserColor: "rgba(239, 68, 68, 0.4)",
      glowColor: "rgba(239, 68, 68, 0.04)",
      bgHover: "hover:bg-rose-50/10",
      borderGlow: "hover:border-rose-500/20",
      sparkColor: "bg-rose-500",
      widget: (
        <svg width="160" height="160" viewBox="0 0 160 160" className="w-[140px] h-[140px] select-none">
          {/* Radar background grid */}
          <line x1="20" y1="80" x2="140" y2="80" stroke="rgba(0,0,0,0.04)" strokeDasharray="3 3" />
          <line x1="80" y1="20" x2="80" y2="140" stroke="rgba(0,0,0,0.04)" strokeDasharray="3 3" />
          <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="1" />
          <circle cx="80" cy="80" r="45" fill="none" stroke="rgba(99,102,241,0.05)" strokeDasharray="4 4" />
          <circle cx="80" cy="80" r="30" fill="none" stroke="rgba(0,0,0,0.03)" />
          
          {/* Radar Sweep Ray */}
          <g className="animate-radar-sweep">
            <line x1="80" y1="80" x2="80" y2="20" stroke="url(#radarSweepGrad)" strokeWidth="2" strokeLinecap="round" />
            <polygon points="80,80 80,20 105,30" fill="url(#radarSweepFade)" opacity="0.15" />
          </g>

          {/* Interconnected Skill Nodes */}
          <line x1="80" y1="50" x2="50" y2="70" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
          <line x1="80" y1="50" x2="110" y2="70" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
          <line x1="50" y1="70" x2="100" y2="110" stroke="rgba(239,68,68,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="110" y1="70" x2="100" y2="110" stroke="rgba(239,68,68,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Regular concept nodes */}
          <circle cx="80" cy="50" r="5" fill="#6366f1" className="animate-pulse" />
          <circle cx="50" cy="70" r="4" fill="#3b82f6" />
          <circle cx="110" cy="70" r="4" fill="#10b981" />

          {/* WEAK NODE (Alert flashing Rotational Mechanics) */}
          <g>
            <circle cx="100" cy="110" r="14" fill="rgba(239,68,68,0.12)" className="animate-radar-pulse" />
            <circle cx="100" cy="110" r="6" fill="#ef4444" />
            {/* Target bracket outline */}
            <path d="M 94,103 L 94,100 L 97,100" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M 106,103 L 106,100 L 103,100" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M 94,117 L 94,120 L 97,120" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M 106,117 L 106,120 L 103,120" fill="none" stroke="#ef4444" strokeWidth="1" />
          </g>

          <defs>
            <linearGradient id="radarSweepGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(99,102,241,0.1)" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="radarSweepFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      icon: <Target className="text-indigo-600" />,
      title: "Accuracy Tracking",
      desc: "Measure your strike rate across Easy, Medium, and Hard difficulty levels.",
      example: "92% Accuracy in Easy Qs",
      badge: "[CALIB_STRIKE: 92% // ACTIVE_RATE]",
      laserColor: "rgba(99, 102, 241, 0.4)",
      glowColor: "rgba(99, 102, 241, 0.04)",
      bgHover: "hover:bg-indigo-50/10",
      borderGlow: "hover:border-indigo-500/20",
      sparkColor: "bg-indigo-500",
      widget: (
        <svg width="160" height="160" viewBox="0 0 160 160" className="w-[140px] h-[140px] select-none">
          {/* Target crosshairs */}
          <line x1="80" y1="15" x2="80" y2="145" stroke="rgba(99,102,241,0.06)" strokeWidth="1.5" />
          <line x1="15" y1="80" x2="145" y2="80" stroke="rgba(99,102,241,0.06)" strokeWidth="1.5" />

          {/* Concentric rings */}
          <circle cx="80" cy="80" r="50" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1.5" />
          <circle cx="80" cy="80" r="35" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1.5" />
          <circle cx="80" cy="80" r="20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1.5" />

          {/* Accuracy Arcs (Easy Qs has 92% strike rate represented by orange arc) */}
          <circle cx="80" cy="80" r="45" fill="none" stroke="rgba(245,158,11,0.08)" strokeWidth="5" />
          {/* 92% arc length = 2 * PI * r * 0.92 = 282 * 0.92 = 260 */}
          <circle cx="80" cy="80" r="45" fill="none" stroke="#f59e0b" strokeWidth="3" 
            strokeDasharray="260 282" 
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            className="animate-target-pulse"
          />

          {/* Running calibration dot */}
          <circle cx="80" cy="80" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
            className="animate-speed-sweep"
            transform="rotate(-90 80 80)"
            opacity="0.25"
          />

          {/* Bullseye target core */}
          <circle cx="80" cy="80" r="8" fill="#6366f1" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="80" cy="80" r="5" fill="#6366f1" />

          {/* Calibration Pointer Index Dial */}
          <g transform="rotate(52 80 80)">
            <line x1="80" y1="80" x2="80" y2="48" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
            <polygon points="80,42 77,48 83,48" fill="#4f46e5" />
          </g>

          {/* Monospaced Dial HUD Text */}
          <text x="80" y="145" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">[ACCURACY_GAP: 8%]</text>
        </svg>
      )
    },
    {
      icon: <TrendingUp className="text-blue-500" />,
      title: "Rank Prediction",
      desc: "Estimated All India Rank (AIR) based on current velocity and competitive data.",
      example: "Est. AIR: 450 - 620",
      badge: "[PREDICT_INDEX: AIR_SYNC // STABLE]",
      laserColor: "rgba(59, 130, 246, 0.4)",
      glowColor: "rgba(59, 130, 246, 0.04)",
      bgHover: "hover:bg-blue-50/10",
      borderGlow: "hover:border-blue-500/20",
      sparkColor: "bg-blue-500",
      widget: (
        <svg width="160" height="160" viewBox="0 0 160 160" className="w-[140px] h-[140px] select-none">
          {/* Cyber console backdrop grid lines */}
          <line x1="15" y1="130" x2="145" y2="130" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          <line x1="20" y1="20" x2="20" y2="135" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          
          <line x1="20" y1="95" x2="145" y2="95" stroke="rgba(0,0,0,0.02)" strokeDasharray="3 3" />
          <line x1="20" y1="60" x2="145" y2="60" stroke="rgba(0,0,0,0.02)" strokeDasharray="3 3" />
          <line x1="20" y1="25" x2="145" y2="25" stroke="rgba(0,0,0,0.02)" strokeDasharray="3 3" />
          
          <line x1="60" y1="20" x2="60" y2="130" stroke="rgba(0,0,0,0.02)" strokeDasharray="3 3" />
          <line x1="100" y1="20" x2="100" y2="130" stroke="rgba(0,0,0,0.02)" strokeDasharray="3 3" />
          <line x1="140" y1="20" x2="140" y2="130" stroke="rgba(0,0,0,0.02)" strokeDasharray="3 3" />

          {/* Spline area fill under the curve */}
          <path d="M 20 120 C 50 110, 75 75, 100 55 T 140 28 L 140 130 L 20 130 Z" fill="url(#rankSplineArea)" opacity="0.3" />

          {/* Spline curve (AIR Projection Spline) */}
          <path d="M 20 120 C 50 110, 75 75, 100 55 T 140 28" fill="none" stroke="url(#rankSplineGrad)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Locator point projecting onto coordinates */}
          {/* When mouse is interactive, let it pulse on a target segment */}
          <g>
            {/* Projected dotted axis lines */}
            <line x1="100" y1="55" x2="100" y2="130" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="20" y1="55" x2="100" y2="55" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="2 2" />

            {/* Glowing target node */}
            <circle cx="100" cy="55" r="9" fill="rgba(59,130,246,0.18)" className="animate-ping" style={{ animationDuration: '2.5s' }} />
            <circle cx="100" cy="55" r="5" fill="#3b82f6" />
          </g>

          {/* Ranks Indicator Brackets labels */}
          <rect x="74" y="28" width="52" height="15" rx="4" fill="#090d16" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <text x="100" y="38" textAnchor="middle" fill="#3b82f6" fontSize="7" fontFamily="monospace" fontWeight="bold">AIR: 450-620</text>

          {/* Axis Labels */}
          <text x="22" y="142" fill="#64748b" fontSize="6.5" fontFamily="monospace">JAN</text>
          <text x="138" y="142" fill="#64748b" fontSize="6.5" fontFamily="monospace">JUN</text>

          <defs>
            <linearGradient id="rankSplineGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="rankSplineArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Light Blueprint Grid Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic Cursor spotlight Nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
          zIndex: 1
        }}
      />

      {/* Decorative Grid Guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Header with cinematic reveal masks */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
          >
            <Star size={11} className="text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Precision Diagnostics</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none">
            Precision{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">
              Insight.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Deep-dive examples of what our engine tracks. We measure every parameter to ensure you stay ahead of the curve.
          </p>
        </div>

        {/* 3-Column Awwwards Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {highlights.map((item, i) => (
            <HighlightCard
              key={i}
              item={item}
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
