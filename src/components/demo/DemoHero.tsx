import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, MonitorPlay, Users2, CheckCircle2, Activity, Compass, Cpu } from 'lucide-react';

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
      const pull = Math.max(0, 180 - dist) * 0.35;
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
      const pull = Math.max(0, 180 - dist) * 0.35;
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

export const DemoHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;
    
    setMousePos({ x, y });
    setTilt({ x: normX, y: normY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const titleWords = ["See", "Before", "You", "Commit."];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pt-40 pb-28 bg-[#FAF9F6] relative overflow-hidden transition-all duration-300 border-b border-indigo-50"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glows */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.04), rgba(245, 158, 11, 0.015) 50%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Warp Canvas */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] z-0">
        <div className="absolute left-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-100/50 via-indigo-100 to-indigo-100/50" />
        <div className="absolute right-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-100/50 via-indigo-100 to-indigo-100/50" />
        <div className="absolute top-[22%] left-0 right-0 h-px bg-gradient-to-r from-indigo-100/50 via-indigo-100 to-indigo-100/50" />
        <div className="absolute bottom-[22%] left-0 right-0 h-px bg-gradient-to-r from-indigo-100/50 via-indigo-100 to-indigo-100/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Glassmorphic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-indigo-100 px-6 py-3 rounded-full text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-10 shadow-lg shadow-indigo-100/20 relative group cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
          <div className="relative z-10 flex items-center gap-2">
            <Play size={10} fill="currentColor" className="text-indigo-600 animate-pulse" />
            <span>Experience Academic Supremacy</span>
            <Sparkles size={11} className="text-amber-500 animate-bounce" />
          </div>
        </motion.div>
        
        {/* Main Title with Staggered Word Reveal */}
        <div className="mb-10 max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-primary tracking-tighter leading-none select-none">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-4 py-3">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`inline-block ${
                    word === "Commit." 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black" 
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
        
        {/* Description Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-14"
        >
          Book a <span className="text-indigo-600 font-bold">1-hour live session</span> with our top HOD faculty. Experience real-time diagnostic testing, smart doubt counters, and absolute clarity.
        </motion.p>

        {/* Scroll Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => {
            const el = document.getElementById('booking-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Select Live Slot Below</span>
          <div className="w-6 h-10 rounded-full border border-slate-350 p-1 flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-2 rounded-full bg-indigo-500" 
            />
          </div>
        </motion.div>
      </div>

      {/* Floating 3D Telemetry Cards */}
      
      {/* Top Left Card */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="hidden xl:flex absolute left-[6%] top-[26%] p-6 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-indigo-50/50 shadow-2xl items-center gap-4 pointer-events-none select-none max-w-[290px] group transition-all duration-300 hover:border-indigo-400/30"
        style={{
          transform: `translate3d(${tilt.x * 30}px, ${tilt.y * 30}px, 0) rotateX(${-tilt.y * 10}deg) rotateY(${tilt.x * 10}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.08)'
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 shadow-inner relative">
          <span className="absolute inset-0 rounded-2xl border border-indigo-500/20 animate-ping" />
          <MonitorPlay size={24} className="animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Live Broadcast</span>
          </div>
          <p className="text-xs font-bold text-primary">Sub-Second Latency Stream</p>
        </div>
      </motion.div>

      {/* Bottom Right Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hidden xl:flex absolute right-[6%] bottom-[22%] p-6 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-indigo-50/50 shadow-2xl items-center gap-4 pointer-events-none select-none max-w-[290px]"
        style={{
          transform: `translate3d(${tilt.x * -25}px, ${tilt.y * -25}px, 0) rotateX(${-tilt.y * 8}deg) rotateY(${tilt.x * 8}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.08)'
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-600 shadow-inner">
          <Users2 size={24} />
        </div>
        <div>
          <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase block mb-1">Active Doubt Desk</span>
          <p className="text-xs font-bold text-primary">1-on-1 Dedicated Support</p>
        </div>
      </motion.div>

      {/* Top Right Card */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="hidden xl:flex absolute right-[9%] top-[22%] p-6 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-indigo-50/50 shadow-2xl items-center gap-4 pointer-events-none select-none max-w-[290px]"
        style={{
          transform: `translate3d(${tilt.x * 20}px, ${tilt.y * -20}px, 0) rotateX(${-tilt.y * 7}deg) rotateY(${tilt.x * 7}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.08)'
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100/50 flex items-center justify-center text-purple-600 shadow-inner">
          <CheckCircle2 size={24} className="text-purple-600" />
        </div>
        <div>
          <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase block mb-1">Absorption Tracker</span>
          <p className="text-xs font-bold text-primary">15-Min Session Analytics</p>
        </div>
      </motion.div>
    </section>
  );
};
