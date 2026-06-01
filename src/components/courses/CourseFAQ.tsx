import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Sparkles, MessageCircleQuestion, Compass, Activity, BookOpen, Layers } from 'lucide-react';

const faqs = [
  { 
    q: "How do I choose between JEE and MHT-CET batches?", 
    a: "JEE is calibrated for National-Level IITs/NITs with higher conceptual complexity. CET focus is State-Level with absolute emphasis on lightning speed and pattern recognition. We provide comprehensive telemetry diagnostics and 1-on-1 counseling to map your academic vector.",
    theme: "from-blue-500/10 to-indigo-500/10",
    glow: "rgba(99, 102, 241, 0.08)",
    badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    visualizer: "split",
    tags: ["★ Ranks Audited", "★ 1-on-1 Counseling", "★ Aptitude Diagnostic"]
  },
  { 
    q: "What is the student-teacher ratio in each batch?", 
    a: "We maintain a strict maximum limit of 30 scholars per batch. This allows our mentors to conduct granular daily diagnostic checks, track custom problem-solving paths, and provide individual real-time audit feedback.",
    theme: "from-rose-500/10 to-pink-500/10",
    glow: "rgba(244, 63, 94, 0.08)",
    badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    visualizer: "ratio",
    tags: ["★ Max 30 Scholars", "★ Granular Checks", "★ Daily Mentoring"]
  },
  { 
    q: "Are study materials included in the course fee?", 
    a: "Yes. Our deep-tech research modules, physical daily practice sheets (DPPs) with video audits, and complete digital interactive dashboard access are entirely inclusive with zero hidden overheads.",
    theme: "from-emerald-500/10 to-teal-500/10",
    glow: "rgba(16, 185, 129, 0.08)",
    badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    visualizer: "modules",
    tags: ["★ Video Audits", "★ DPP Sheets", "★ Zero Overheads"]
  },
  { 
    q: "Do you provide recorded sessions for missed classes?", 
    a: "Absolutely. Every lecture is captured via our studio arrays and immediately uploaded to your student portal alongside hand-written concept notes, micro-quizzes, and smart transcripts.",
    theme: "from-amber-500/10 to-orange-500/10",
    glow: "rgba(245, 158, 11, 0.08)",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    visualizer: "recorded",
    tags: ["★ Studio Arrays", "★ 24/7 Portal Access", "★ Smart Transcripts"]
  },
];

// Reusable SVG definitions and keyframe styles for FAQ visuals
const FAQStylesAndGradients = () => (
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      <linearGradient id="splitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
    <style>{`
      @keyframes pathSplitLeft {
        0% { stroke-dashoffset: 60; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes pathSplitRight {
        0% { stroke-dashoffset: 60; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes dialScaleOscillate {
        0%, 100% { transform: rotate(-25deg); }
        50% { transform: rotate(25deg); }
      }
      @keyframes soundwaveActive {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1); }
      }
    `}</style>
  </svg>
);

// MAPPED FAQ MICRO VISUALIZERS
const FAQVisualizer = ({ type, isHovered }: { type: string; isHovered: boolean }) => {
  switch (type) {
    case "split":
      // Split Path Node trajectory
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          <path d="M 10 30 L 25 30 L 38 18 L 50 18 M 25 30 L 38 42 L 50 42" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" />
          <path 
            d="M 10 30 L 25 30 L 38 18 L 50 18 M 25 30 L 38 42 L 50 42" 
            fill="none" 
            stroke="url(#splitGlow)" 
            strokeWidth="2" 
            strokeDasharray="60"
            strokeDashoffset="60"
            style={{ animation: `pathSplitLeft ${isHovered ? '1.5s' : '3s'} linear infinite` }}
          />
          <circle cx="10" cy="30" r="3" fill="#3B82F6" />
          <circle cx="50" cy="18" r="2.5" fill="#4F46E5" />
          <circle cx="50" cy="42" r="2.5" fill="#6366F1" />
        </svg>
      );
      
    case "ratio":
      // Geometric dial scale indicator
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          <path d="M 12 45 A 22 22 0 0 1 48 45" fill="none" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 12 45 A 22 22 0 0 1 30 23" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="45" r="4" fill="#E11D48" />
          
          <g className="origin-center" style={{ 
            transformOrigin: '30px 45px', 
            animation: `dialScaleOscillate ${isHovered ? '1.2s' : '3s'} ease-in-out infinite` 
          }}>
            <line x1="30" y1="45" x2="30" y2="25" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
      
    case "modules":
      // Stacked documents sheets sliding
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          {/* Third sheet */}
          <rect 
            x="14" 
            y="14" 
            width="28" 
            height="34" 
            rx="3" 
            fill="none" 
            stroke="rgba(16, 185, 129, 0.15)" 
            strokeWidth="1.5" 
            className="transition-transform duration-500"
            style={{ transform: isHovered ? 'translate(4px, 4px)' : 'none' }}
          />
          {/* Second sheet */}
          <rect 
            x="18" 
            y="10" 
            width="28" 
            height="34" 
            rx="3" 
            fill="none" 
            stroke="rgba(16, 185, 129, 0.3)" 
            strokeWidth="1.5" 
            className="transition-transform duration-500"
            style={{ transform: isHovered ? 'translate(2px, 2px)' : 'none' }}
          />
          {/* Front sheet */}
          <rect x="22" y="6" width="28" height="34" rx="3" fill="none" stroke="#10B981" strokeWidth="2" />
          <line x1="28" y1="14" x2="44" y2="14" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="22" x2="38" y2="22" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
      
    case "recorded":
      // Active rising soundwaves
      return (
        <svg className="w-full h-full" viewBox="0 0 60 60">
          <g className="origin-bottom" style={{ transform: 'translate(0px, 42px)' }}>
            {[10, 18, 26, 34, 42, 50].map((x, idx) => (
              <rect 
                key={idx}
                x={x} 
                y="-30" 
                width="4.5" 
                height="30" 
                rx="2" 
                fill={idx % 2 === 0 ? '#F59E0B' : '#D97706'} 
                className="origin-bottom"
                style={{ 
                  animation: `soundwaveActive ${isHovered ? '0.6s' : '1.2s'} ease-in-out infinite`,
                  animationDelay: `${idx * 0.15}s`
                }}
              />
            ))}
          </g>
        </svg>
      );
      
    default:
      return null;
  }
};

// Coordinate trailing sparks inside FAQ row
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
        className="absolute w-1 h-1 rounded-full bg-indigo-200/40 pointer-events-none transition-all duration-700 ease-out"
        style={{ left: mouseX - 2, top: mouseY - 2 }}
      />
    </>
  );
};

// Typewriter disclosure for Accordion Answer
const AnswerTypewriter = ({ text, active, tags }: { text: string; active: boolean; tags: string[] }) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!active) {
      setTypedText("");
      return;
    }

    let start = 0;
    const speed = 10; // typed characters speed
    const timer = setInterval(() => {
      if (start < text.length) {
        setTypedText(text.substring(0, start + 1));
        start++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [active, text]);

  return (
    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 lg:p-8 space-y-4 shadow-inner relative overflow-hidden backdrop-blur-md">
      {/* Subtle terminal-like visual cue */}
      <div className="absolute top-3 right-4 flex gap-1 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      </div>
      
      <div className="text-slate-500 leading-relaxed font-semibold text-base lg:text-lg min-h-[48px]">
        {typedText}
        {active && typedText.length < text.length && (
          <span className="inline-block w-1.5 h-4 bg-indigo-500 animate-pulse ml-0.5 align-middle" />
        )}
      </div>

      {/* Metric details tags display */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        {tags.map((tag, tIdx) => (
          <span 
            key={tIdx} 
            className="text-[10px] font-mono font-black text-indigo-500/70 bg-indigo-500/5 px-2.5 py-1 rounded-full uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const CourseFAQ = () => {
  const [active, setActive] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Row coordinate states for magnetic buttons
  const [btnTilts, setBtnTilts] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
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

  const handleRowMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom coordinates properties on element styles
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

    setCardMice(prev => {
      const next = [...prev];
      next[index] = { x, y };
      return next;
    });
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35; // 35% magnetic strength
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    
    setBtnTilts(prev => {
      const next = [...prev];
      next[index] = { x, y };
      return next;
    });
  };

  const handleButtonMouseLeave = (index: number) => {
    setBtnTilts(prev => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="pt-12 pb-12 bg-[#F8FAFC] text-slate-900 relative overflow-hidden"
    >
      {/* Styles and Gradients Definitions */}
      <FAQStylesAndGradients />

      {/* Light Slate Matrix Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Interactive Floating Neon Spotlight */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 transition-opacity duration-300 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(165, 180, 252, 0.2) 0%, transparent 70%)',
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-28">
          <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            {/* Concentric Rotating Vector Rings */}
            <div className="absolute inset-0 rounded-full border border-indigo-100 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-indigo-200 animate-[spin_7s_linear_infinite_reverse]" />
            <div className="absolute inset-4 rounded-full bg-indigo-50 flex items-center justify-center shadow-inner text-indigo-600">
              <MessageCircleQuestion size={36} className="animate-pulse" />
            </div>
            {/* Tiny absolute sparkles */}
            <div className="absolute -top-1 -right-1 text-amber-500 animate-bounce">
              <Sparkles size={16} />
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none select-none">
            Everything You <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 italic">Need to Know</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium mt-6 max-w-xl mx-auto">
            Clear, analytical answers to elevate your perspective and align your goals.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((item, i) => {
            const isActive = active === i;
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;
            const localMouse = cardMice[i] || { x: 0, y: 0 };
            const btnTilt = btnTilts[i] || { x: 0, y: 0 };

            return (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={(e) => handleRowMouseMove(e, i)}
                className={`relative rounded-[2rem] border transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                  isActive 
                    ? 'bg-white border-indigo-200 shadow-2xl shadow-indigo-100/50 scale-[1.01]' 
                    : isHovered 
                      ? 'bg-white/80 border-slate-300 shadow-md scale-[1.005]'
                      : isAnyHovered 
                        ? 'bg-white/40 border-slate-100 opacity-45 blur-[0.5px]' 
                        : 'bg-white/80 border-slate-200'
                }`}
              >
                {/* Custom Hover Spotlight Overlay inside the card */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.glow}, transparent 80%)`
                  }}
                />

                {/* Subtle colored glow badge backglow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none`} />

                {/* Sparks trail following mouse cursor inside card */}
                <SparkParticlesTrail mouseX={localMouse.x} mouseY={localMouse.y} active={isHovered} />

                {/* Header panel trigger */}
                <div 
                  onClick={() => setActive(isActive ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left relative z-10 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-6 pr-4">
                    {/* Unique SVG Visualizer Feed */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                      <FAQVisualizer type={item.visualizer} isHovered={isHovered} />
                    </div>
                    
                    <span className={`text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300 leading-tight ${isActive ? 'text-indigo-600' : 'text-slate-800 group-hover:text-slate-900'}`}>
                      {item.q}
                    </span>
                  </div>
                  
                  {/* Magnetic Rotating plus/minus indicator */}
                  <div 
                    onMouseMove={(e) => handleButtonMouseMove(e, i)}
                    onMouseLeave={() => handleButtonMouseLeave(i)}
                    style={{
                      transform: `translate3d(${btnTilt.x}px, ${btnTilt.y}px, 0)`,
                      transition: btnTilt.x === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 border-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-350 group-hover:bg-slate-100 group-hover:text-slate-600 shadow-sm'
                    }`}
                  >
                    {isActive ? <Minus size={20} className="transition-transform" /> : <Plus size={20} className="transition-transform" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-8 pb-8 border-t border-slate-100 pt-6">
                        {/* Custom typewriter technical disclosures */}
                        <AnswerTypewriter text={item.a} active={isActive} tags={item.tags} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
