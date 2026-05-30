import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, PhoneCall, Calendar, ArrowRight, Activity, Radio, Compass, Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GridWarpCanvas = ({ mousePos, isHovered }: { mousePos: { x: number; y: number }; isHovered: boolean }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1400,
          height: containerRef.current.clientHeight || 600
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cols = 14;
  const rows = 9;
  const paths = [];

  // Highlight active horizontal and vertical grid indices near the cursor
  const activeCol = isHovered ? Math.floor((mousePos.x / dimensions.width) * cols) : -1;
  const activeRow = isHovered ? Math.floor((mousePos.y / dimensions.height) * rows) : -1;

  for (let i = 1; i < cols; i++) {
    const x = (dimensions.width / cols) * i;
    let d = `M ${x} 0`;
    
    if (isHovered) {
      const distanceY = dimensions.height / 2;
      const dx = mousePos.x - x;
      const dy = mousePos.y - distanceY;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 180 - dist) * 0.45;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    const isActive = i === activeCol;
    paths.push(
      <path 
        key={`v-${i}`} 
        d={d} 
        stroke={isActive ? "rgba(99, 102, 241, 0.25)" : "rgba(99, 102, 241, 0.08)"} 
        strokeWidth={isActive ? "1.5" : "1"} 
        fill="none" 
        className="transition-all duration-300 ease-out" 
      />
    );
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;

    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 180 - dist) * 0.45;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    const isActive = i === activeRow;
    paths.push(
      <path 
        key={`h-${i}`} 
        d={d} 
        stroke={isActive ? "rgba(99, 102, 241, 0.25)" : "rgba(99, 102, 241, 0.08)"} 
        strokeWidth={isActive ? "1.5" : "1"} 
        fill="none" 
        className="transition-all duration-300 ease-out" 
      />
    );
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

const SoundwaveVisualizer = ({ localMouse, isHovered }: { localMouse: { x: number; y: number }; isHovered: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(380);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth || 380);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-36 w-full bg-slate-950/90 rounded-[2rem] border border-white/5 flex items-center justify-center gap-1.5 overflow-hidden p-6 relative group/wave transition-all duration-500 hover:border-indigo-500/30"
    >
      <style>{`
        @keyframes soundwave-pulse-fast {
          0%, 100% { height: 10px; }
          50% { height: 74px; }
        }
        .bar-pulse-fast {
          animation: soundwave-pulse-fast 1.2s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      
      {Array.from({ length: 24 }).map((_, i) => {
        const barX = (containerWidth / 24) * i;
        const dx = isHovered ? Math.abs(localMouse.x - barX) : 999;
        
        // Reactive scale based on mouse proximity
        const proximityScale = isHovered ? Math.max(1, 2.5 - dx * 0.008) : 1;
        const heightMultiplier = Math.sin((i / 23) * Math.PI) * 0.8 + 0.2;
        const delay = (i * 0.05).toFixed(2);
        const duration = (0.7 + Math.random() * 0.5).toFixed(2);
        
        return (
          <div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-indigo-600 via-indigo-400 to-indigo-300 transition-all duration-200 bar-pulse-fast"
            style={{
              height: `${20 * heightMultiplier}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `scaleY(${proximityScale})`,
              boxShadow: isHovered && dx < 120 ? '0 0 15px rgba(99, 102, 241, 0.6)' : 'none'
            }}
          />
        );
      })}
      
      {/* HUD Reticle Coordinate Ticker */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-indigo-400">
        <Activity size={11} className="animate-pulse" />
        <span>Voice Stream Active // X_{localMouse.x.toFixed(0)}</span>
      </div>
    </div>
  );
};

const RadarSweepVisualizer = ({ localMouse, isHovered }: { localMouse: { x: number; y: number }; isHovered: boolean }) => {
  return (
    <div className="h-36 w-full bg-slate-950/90 rounded-[2rem] border border-white/5 flex items-center justify-center overflow-hidden relative group/radar transition-all duration-500 hover:border-purple-500/30">
      <style>{`
        @keyframes radar-sweep-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reticle-pulse-hud {
          0%, 100% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        .radar-sweep-360 {
          animation: radar-sweep-360 4.5s linear infinite;
        }
        .radar-pulse-hud {
          animation: reticle-pulse-hud 2.5s ease-in-out infinite;
        }
      `}</style>
      
      {/* Concentric blueprint HUD rings */}
      <div className="absolute w-20 h-20 rounded-full border border-dashed border-purple-500/20" />
      <div className="absolute w-36 h-36 rounded-full border border-purple-500/10" />
      <div className="absolute w-52 h-52 rounded-full border border-purple-500/5" />
      
      {/* Grid crosshairs */}
      <div className="absolute w-full h-px bg-purple-500/10" />
      <div className="absolute h-full w-px bg-purple-500/10" />
      
      {/* Ticks/Angle markers */}
      <span className="absolute top-2 text-[6.5px] font-mono font-black text-purple-500/40 tracking-widest">000° // NORTH</span>
      <span className="absolute right-2 text-[6.5px] font-mono font-black text-purple-500/40 tracking-widest">090°</span>
      <span className="absolute bottom-2 text-[6.5px] font-mono font-black text-purple-500/40 tracking-widest">180° // SOUTH</span>
      <span className="absolute left-2 text-[6.5px] font-mono font-black text-purple-500/40 tracking-widest">270°</span>

      {/* Rotating Sweep Hand */}
      <div className="absolute w-56 h-56 radar-sweep-360 pointer-events-none">
        <div 
          className="w-1/2 h-full absolute right-0 top-0 origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)',
            transform: 'rotate(-90deg)',
          }}
        />
      </div>

      {/* Dynamic Reticle tracking mouse coordinates */}
      {isHovered && (
        <div 
          className="absolute w-5 h-5 border border-dashed border-purple-400 rounded-full radar-pulse-hud pointer-events-none"
          style={{
            left: localMouse.x - 10,
            top: localMouse.y - 10,
            boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)'
          }}
        />
      )}

      {/* Fixed Target reticles */}
      <div className="absolute top-1/4 left-1/3 radar-pulse-hud">
        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
        <span className="absolute left-3 -top-1.5 font-mono text-[5.5px] text-purple-400 font-bold bg-purple-950/60 px-1 py-0.5 border border-purple-500/10 rounded">DPS_SYNC</span>
      </div>
      <div className="absolute bottom-1/4 right-1/4 radar-pulse-hud" style={{ animationDelay: '1.2s' }}>
        <div className="w-2 h-2 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
        <span className="absolute left-3 -top-1.5 font-mono text-[5.5px] text-pink-400 font-bold bg-pink-950/60 px-1 py-0.5 border border-pink-500/10 rounded">CAMPUS_N3</span>
      </div>

      <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-purple-400">
        <Radio size={11} className="animate-spin" style={{ animationDuration: '3.5s' }} />
        <span>Campus Grid Synced // Y_{localMouse.y.toFixed(0)}</span>
      </div>
    </div>
  );
};

export const CareerPathGuidance = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Local card mouse positions
  const [cardMouse0, setCardMouse0] = useState({ x: 0, y: 0 });
  const [cardMouse1, setCardMouse1] = useState({ x: 0, y: 0 });

  // Parallax tilts
  const [tilt0, setTilt0] = useState({ x: 0, y: 0 });
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredCard(null);
  };

  // Card Mouse & Tilt logic
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    if (cardIndex === 0) {
      setCardMouse0({ x, y });
      setTilt0({ x: normX, y: normY });
    } else {
      setCardMouse1({ x, y });
      setTilt1({ x: normX, y: normY });
    }
    setHoveredCard(cardIndex);
  };

  const handleCardMouseLeave = (cardIndex: number) => {
    if (cardIndex === 0) {
      setTilt0({ x: 0, y: 0 });
    } else {
      setTilt1({ x: 0, y: 0 });
    }
    setHoveredCard(null);
  };

  // Magnetic Button Effect
  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.02)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-36 bg-[#03050C] relative overflow-hidden transition-all duration-500 border-t border-white/5"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.06), rgba(168, 85, 247, 0.02) 40%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Grid Warp Background */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] mb-8 shadow-2xl backdrop-blur-md"
          >
            <HelpCircle size={12} className="text-indigo-400 animate-pulse" />
            <span>Still Confused About Your Path?</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 uppercase leading-tight select-none overflow-visible py-1"
          >
            LET'S DECRYPT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic px-1">YOUR VECTOR.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Choosing the right academic path is a monumental decision. Don't navigate it blindly. Review your scores, targets, and passions side-by-side with our senior academic advisors.
          </motion.p>
        </div>

        {/* Dynamic Holographic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Talk to a Counselor */}
          <div
            onMouseMove={(e) => handleCardMouseMove(e, 0)}
            onMouseLeave={() => handleCardMouseLeave(0)}
            className={`p-10 md:p-12 rounded-[3.5rem] bg-[#070913]/90 border backdrop-blur-xl transition-all duration-500 text-left flex flex-col justify-between relative group overflow-hidden ${
              hoveredCard === 0 
                ? 'border-indigo-500/40 bg-[#070913] shadow-[0_0_50px_rgba(99,102,241,0.1)]' 
                : hoveredCard === null 
                  ? 'border-white/5'
                  : 'border-white/5 opacity-40 scale-[0.98] blur-[0.5px]'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${-tilt0.y * 10}deg) rotateY(${tilt0.x * 10}deg) scale3d(${hoveredCard === 0 ? 1.02 : 1}, ${hoveredCard === 0 ? 1.02 : 1}, 1)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Razor-Thin Cursor-Tracking Border Laser */}
            <div 
              className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(130px circle at ${cardMouse0.x}px ${cardMouse0.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Corner Bracket Accents */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-indigo-500/30 group-hover:border-indigo-400 transition-colors" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-indigo-500/30 group-hover:border-indigo-400 transition-colors" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-indigo-500/30 group-hover:border-indigo-400 transition-colors" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-indigo-500/30 group-hover:border-indigo-400 transition-colors" />

            <div>
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/5 mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 shadow-inner">
                <PhoneCall size={26} />
              </div>
              <h4 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Talk to a Counselor</h4>
              <p className="text-slate-500 text-[11px] font-bold mb-10 uppercase tracking-[0.18em] leading-relaxed">
                Connect with our elite counseling matrix instantly via digital phone link.
              </p>
            </div>

            <div className="space-y-8 relative z-20">
              <SoundwaveVisualizer localMouse={cardMouse0} isHovered={hoveredCard === 0} />
              <button 
                onClick={() => navigate('/counseling/call')}
                onMouseMove={handleButtonMove}
                onMouseLeave={handleButtonLeave}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-xl shadow-indigo-500/10"
              >
                <span>Initiate Call Session</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Offline Counseling */}
          <div
            onMouseMove={(e) => handleCardMouseMove(e, 1)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            className={`p-10 md:p-12 rounded-[3.5rem] bg-[#070913]/90 border backdrop-blur-xl transition-all duration-500 text-left flex flex-col justify-between relative group overflow-hidden ${
              hoveredCard === 1 
                ? 'border-purple-500/40 bg-[#070913] shadow-[0_0_50px_rgba(168,85,247,0.1)]' 
                : hoveredCard === null 
                  ? 'border-white/5'
                  : 'border-white/5 opacity-40 scale-[0.98] blur-[0.5px]'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${-tilt1.y * 10}deg) rotateY(${tilt1.x * 10}deg) scale3d(${hoveredCard === 1 ? 1.02 : 1}, ${hoveredCard === 1 ? 1.02 : 1}, 1)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Razor-Thin Cursor-Tracking Border Laser */}
            <div 
              className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(130px circle at ${cardMouse1.x}px ${cardMouse1.y}px, rgba(168, 85, 247, 0.4), transparent 80%)`,
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Corner Bracket Accents */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-purple-500/30 group-hover:border-purple-400 transition-colors" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-purple-500/30 group-hover:border-purple-400 transition-colors" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-purple-500/30 group-hover:border-purple-400 transition-colors" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-purple-500/30 group-hover:border-purple-400 transition-colors" />

            <div>
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-purple-400 border border-white/5 mb-8 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500 transition-all duration-300 shadow-inner">
                <Calendar size={26} />
              </div>
              <h4 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Offline Counseling</h4>
              <p className="text-slate-500 text-[11px] font-bold mb-10 uppercase tracking-[0.18em] leading-relaxed">
                Visit our physical premium academy campus in person for absolute diagnostics.
              </p>
            </div>

            <div className="space-y-8 relative z-20">
              <RadarSweepVisualizer localMouse={cardMouse1} isHovered={hoveredCard === 1} />
              <button 
                onClick={() => navigate('/counseling/walkthrough')}
                onMouseMove={handleButtonMove}
                onMouseLeave={handleButtonLeave}
                className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-slate-100 shadow-xl"
              >
                <span>Book Offline Walkthrough</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
