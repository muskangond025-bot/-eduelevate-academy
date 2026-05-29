import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, Quote, Target, Award } from 'lucide-react';

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
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(79, 70, 229, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
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
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(79, 70, 229, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

const EmberParticles = ({ isHovered }: { isHovered: boolean }) => {
  if (!isHovered) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      <style>{`
        @keyframes ember-float-light {
          0% { transform: translateY(110%) translateX(0px) scale(0.8); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-20%) translateX(var(--x-shift)) scale(0.3); opacity: 0; }
        }
        .ember-dot-light {
          animation: ember-float-light 2.5s ease-in-out infinite;
        }
      `}</style>
      {Array.from({ length: 8 }).map((_, idx) => {
        const left = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 2;
        const xShift = (Math.random() * 40 - 20).toFixed(0);
        return (
          <div
            key={idx}
            className="absolute rounded-full bg-amber-500/20 ember-dot-light"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              bottom: '0',
              animationDelay: `${delay}s`,
              '--x-shift': `${xShift}px`
            } as any}
          />
        );
      })}
    </div>
  );
};

export const ScholarshipDetails = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Individual card local mouse coordinates and tilt states
  const [cardMouse, setCardMouse] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [cardTilt, setCardTilt] = useState<{ [key: number]: { x: number; y: number } }>({});

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
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCardMouse(prev => ({ ...prev, [cardIndex]: { x, y } }));
    setCardTilt(prev => ({
      ...prev,
      [cardIndex]: {
        x: (x - centerX) / centerX,
        y: (y - centerY) / centerY
      }
    }));
    setHoveredCard(cardIndex);
  };

  const handleCardMouseLeave = (cardIndex: number) => {
    setCardTilt(prev => ({ ...prev, [cardIndex]: { x: 0, y: 0 } }));
    setHoveredCard(null);
  };

  const tiers = [
    { 
      rank: "Top 1-10", 
      discount: "100%", 
      sub: "Full Waiver", 
      note: "Pure Merit basis",
      barcode: "*NST-TIER-01*",
      theme: "border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] via-orange-500/[0.01] to-transparent shadow-amber-500/5",
      laser: "rgba(245, 158, 11, 0.4)",
      shimmer: "linear-gradient(135deg, transparent 30%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)"
    },
    { 
      rank: "11-50", 
      discount: "75%", 
      sub: "Elite Scholarship", 
      note: "Tuition Fee only",
      barcode: "*NST-TIER-02*",
      theme: "border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.04] via-indigo-900/[0.01] to-transparent shadow-indigo-500/5",
      laser: "rgba(99, 102, 241, 0.4)",
      shimmer: "linear-gradient(135deg, transparent 30%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)"
    },
    { 
      rank: "51-200", 
      discount: "50%", 
      sub: "Merit Support", 
      note: "Standard batches",
      barcode: "*NST-TIER-03*",
      theme: "border-purple-500/20 bg-gradient-to-br from-purple-500/[0.04] via-purple-900/[0.01] to-transparent shadow-purple-500/5",
      laser: "rgba(168, 85, 247, 0.4)",
      shimmer: "linear-gradient(135deg, transparent 30%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)"
    },
    { 
      rank: "201-500", 
      discount: "25%", 
      sub: "Incentive", 
      note: "Initial fee waiver",
      barcode: "*NST-TIER-04*",
      theme: "border-slate-200/60 bg-gradient-to-br from-slate-100/30 via-white/10 to-transparent",
      laser: "rgba(99, 102, 241, 0.25)",
      shimmer: "linear-gradient(135deg, transparent 30%, rgba(79, 70, 229, 0.05) 50%, transparent 70%)"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 bg-[#FAF9F6] text-primary relative overflow-hidden border-b border-indigo-50"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.04), rgba(245, 158, 11, 0.01) 40%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Grid Warp Background */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-6 shadow-sm"
          >
            <Sparkles size={11} className="text-indigo-500 animate-bounce" />
            <span>Reward Matrix</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none"
          >
            REWARD <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">STRUCTURE.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-sm mx-auto"
          >
            Bigger the rank, greater the academic reward vector.
          </motion.p>
        </div>

        {/* 3D Holographic Spatial Card Deck (White Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, i) => {
            const isSelfHovered = hoveredCard === i;
            const isDimmed = hoveredCard !== null && hoveredCard !== i;

            const tilt = cardTilt[i] || { x: 0, y: 0 };
            const m = cardMouse[i] || { x: 0, y: 0 };

            return (
              <div
                key={i}
                onMouseMove={(e) => handleCardMouseMove(e, i)}
                onMouseLeave={() => handleCardMouseLeave(i)}
                className={`p-10 rounded-[3.2rem] border text-center backdrop-blur-xl transition-all duration-500 relative group overflow-hidden flex flex-col justify-between aspect-[4/5.5] ${tier.theme} ${
                  isSelfHovered 
                    ? 'scale-[1.02] shadow-2xl bg-white border-indigo-500/25' 
                    : isDimmed
                      ? 'opacity-45 scale-[0.98] blur-[0.5px]'
                      : 'bg-white/40'
                }`}
                style={{
                  transform: `perspective(1200px) rotateX(${-tilt.y * 15}deg) rotateY(${tilt.x * 15}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Dynamic Holographic Foil Shimmer Diagonal Sheen */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-550 opacity-0 group-hover:opacity-100 z-10"
                  style={{
                    background: tier.shimmer,
                    transform: `translate(${tilt.x * 90}px, ${tilt.y * 90}px)`,
                  }}
                />

                {/* Dynamic Ember Spark Particles */}
                <EmberParticles isHovered={isSelfHovered} />

                {/* Rotating concentric vector HUD behind text on hover */}
                {isSelfHovered && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0 animate-spin" style={{ animationDuration: '10s' }}>
                    <svg className="w-48 h-48">
                      <circle cx="96" cy="96" r="60" className="stroke-indigo-600 fill-none" strokeWidth="1" strokeDasharray="6 6" />
                      <circle cx="96" cy="96" r="80" className="stroke-amber-500 fill-none" strokeWidth="1.5" strokeDasharray="4 8" />
                    </svg>
                  </div>
                )}

                {/* Razor Border Laser */}
                <div 
                  className="absolute inset-0 rounded-[3.2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                  style={{
                    background: `radial-gradient(120px circle at ${m.x}px ${m.y}px, ${tier.laser}, transparent 80%)`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />

                {/* Card Top: Rank Band with preserve-3d layers */}
                <div className="relative z-20 space-y-4" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                  <div 
                    className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {tier.rank} Ranks
                  </div>
                  <div 
                    className="text-7xl font-black text-primary italic tracking-tighter transition-all duration-300 drop-shadow-sm"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    {tier.discount}
                  </div>
                  <div 
                    className="text-xs font-black text-slate-500 uppercase tracking-widest leading-normal"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {tier.sub}
                  </div>
                </div>

                {/* Card Divider */}
                <div className="w-full h-[1px] bg-slate-100 my-4 z-10" />

                {/* Card Bottom: Note & Barcode */}
                <div className="space-y-6 relative z-20" style={{ transform: "translateZ(20px)" }}>
                  <div className="flex items-center justify-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-[0.15em] bg-slate-50 border border-slate-100 py-2 px-4 rounded-xl shadow-inner">
                     <Star size={11} fill="currentColor" className="animate-pulse text-amber-500" /> 
                     <span>{tier.note}</span>
                  </div>

                  {/* Tiny mock barcode */}
                  <div className="space-y-1 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                    <div className="w-full h-4 flex justify-between">
                      {[1, 2, 0.5, 3, 1, 1.5, 2, 0.5, 2.5, 1, 1.5, 2, 0.5, 3, 1, 1.5].map((w, idx) => (
                        <div key={idx} className="bg-slate-400 h-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <span className="text-[5.5px] font-mono text-slate-400 uppercase tracking-widest block">{tier.barcode}</span>
                  </div>
                </div>

                {/* Decorative corner brackets */}
                <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-slate-200 group-hover:border-slate-350 transition-colors" />
                <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-slate-200 group-hover:border-slate-350 transition-colors" />
                <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-slate-200 group-hover:border-slate-350 transition-colors" />
                <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-slate-200 group-hover:border-slate-350 transition-colors" />

              </div>
            );
          })}
        </div>

        {/* CEO Cyber Quotes Panel (White Theme) */}
        <div className="mt-24 p-12 md:p-14 rounded-[3.5rem] bg-white/70 border border-slate-200/60 text-left relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-8 backdrop-blur-xl shadow-xl group/quotes">
           
           {/* Quotation icon bezel */}
           <div className="w-16 h-16 rounded-[1.8rem] bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 shadow-inner relative">
              <span className="absolute inset-0 rounded-[1.8rem] border-2 border-amber-500/25 animate-ping pointer-events-none" />
              <Quote size={28} className="rotate-180" />
           </div>

           <div className="flex-1 space-y-4">
             <p className="text-slate-700 text-base md:text-xl font-bold italic leading-relaxed select-none">
               "Merit is the only currency here. We believe financial constraints should never stop a genius from reaching the IITs or Medical colleges."
             </p>
             <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.35em] text-slate-400">
               <span>AUTHOR_ID: CEO // FOUNDER MATRIX</span>
             </div>
           </div>

           {/* Corner quotes accents */}
           <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-slate-200" />
           <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-slate-200" />
           <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-slate-200" />
           <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-slate-200" />
        </div>
      </div>
    </section>
  );
};
