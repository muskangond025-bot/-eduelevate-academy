import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, Target } from 'lucide-react';

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

  const cols = 12;
  const rows = 8;
  const paths = [];

  for (let i = 1; i < cols; i++) {
    const x = (dimensions.width / cols) * i;
    let d = `M ${x} 0`;
    
    if (isHovered) {
      const distanceY = dimensions.height / 2;
      const dx = mousePos.x - x;
      const dy = mousePos.y - distanceY;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 150 - dist) * 0.35;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;

    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 150 - dist) * 0.35;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(99, 102, 241, 0.06)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

export const TestSchedule = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  // local coordinates for border lasers
  const [slotCoords, setSlotCoords] = useState<{ [key: number]: { x: number; y: number } }>({});

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

  const handleSlotMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSlotCoords(prev => ({
      ...prev,
      [idx]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
    setHoveredSlot(idx);
  };

  const handleSlotMouseLeave = () => {
    setHoveredSlot(null);
  };

  const schedule = [
    { date: "May 15, 2026", time: "10:00 AM - 1:00 PM", mode: "Online (National)", event: "Slot 1: Foundation (8-10)", laser: "rgba(245, 158, 11, 0.35)" },
    { date: "May 16, 2026", time: "10:00 AM - 1:00 PM", mode: "Online (National)", event: "Slot 2: Grade 11th & 12th", laser: "rgba(99, 102, 241, 0.35)" },
    { date: "May 22, 2026", time: "02:00 PM - 5:00 PM", mode: "In-Person (Selected Hubs)", event: "Slot 3: Droppers Intensive", laser: "rgba(168, 85, 247, 0.35)" }
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 bg-[#03050C] overflow-hidden relative border-b border-white/5"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.01) 50%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Grid Warp Backdrop */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-6 shadow-2xl backdrop-blur-md"
          >
            <Sparkles size={11} className="text-indigo-400 animate-bounce" />
            <span>Time Blocks</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase leading-none select-none">
            TEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black">SCHEDULE.</span>
          </h2>
          <p className="text-white/70 font-medium max-w-sm mx-auto">
            Mark your calendars. Results declared within 48 hours of each slot.
          </p>
        </div>

        {/* Dynamic Holographic Schedule rows */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {schedule.map((item, i) => {
            const isSelfHovered = hoveredSlot === i;
            const isDimmed = hoveredSlot !== null && hoveredSlot !== i;
            
            const localCoords = slotCoords[i] || { x: 0, y: 0 };

            return (
              <div
                key={i}
                onMouseMove={(e) => handleSlotMouseMove(e, i)}
                onMouseLeave={handleSlotMouseLeave}
                className={`p-8 rounded-[2.5rem] border text-left flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300 relative overflow-hidden backdrop-blur-xl group/slot ${
                  isSelfHovered 
                    ? 'border-indigo-500/25 bg-white/[0.04] scale-[1.01] shadow-2xl shadow-indigo-500/5' 
                    : isDimmed
                      ? 'border-white/5 opacity-40 scale-[0.98] blur-[0.5px]'
                      : 'border-white/5 bg-white/[0.01]'
                }`}
              >
                {/* Razor border laser */}
                <div 
                  className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/slot:opacity-100 transition-opacity duration-500 z-30"
                  style={{
                    background: `radial-gradient(130px circle at ${localCoords.x}px ${localCoords.y}px, ${item.laser}, transparent 80%)`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />

                {/* Rotating HUD concentric target behind icon */}
                {isSelfHovered && (
                  <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none opacity-[0.06] z-0 animate-spin" style={{ animationDuration: '8s' }}>
                    <svg className="w-32 h-32">
                      <circle cx="64" cy="64" r="40" className="stroke-indigo-500 fill-none" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="64" cy="64" r="50" className="stroke-purple-500 fill-none" strokeWidth="1.5" strokeDasharray="3 6" />
                    </svg>
                  </div>
                )}

                <div className="flex items-center gap-8 relative z-10">
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-inner shrink-0 ${
                     isSelfHovered 
                       ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                       : 'bg-white/5 border-white/10 text-slate-400'
                   }`}>
                      <Calendar size={22} className={isSelfHovered ? 'animate-pulse' : ''} />
                   </div>
                   
                   <div>
                      <h3 className={`text-2xl font-black mb-3 tracking-tight uppercase transition-colors ${
                        isSelfHovered ? 'text-white' : 'text-slate-200'
                      }`}>{item.event}</h3>
                      <div className="flex flex-wrap gap-6 font-mono text-[9px] uppercase tracking-widest text-white/70 font-bold">
                         <span className="flex items-center gap-1.5">
                            <Clock size={12} className="text-indigo-400" /> 
                            <span>{item.time}</span>
                         </span>
                         <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-indigo-400" /> 
                            <span>{item.mode}</span>
                         </span>
                      </div>
                   </div>
                </div>
                
                {/* Date highlight */}
                <div className={`text-3xl font-black italic tracking-tighter shrink-0 relative z-10 transition-all duration-300 ${
                  isSelfHovered 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 scale-105' 
                    : 'text-slate-400'
                }`}>
                   {item.date}
                </div>

                {/* Corner quotes accents */}
                <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/10 group-hover/slot:border-white/20" />
                <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/10 group-hover/slot:border-white/20" />
                <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/10 group-hover/slot:border-white/20" />
                <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/10 group-hover/slot:border-white/20" />

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
