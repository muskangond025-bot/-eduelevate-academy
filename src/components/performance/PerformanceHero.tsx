import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Zap, Sparkles } from 'lucide-react';
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
      const pull = Math.max(0, 160 - dist) * 0.35;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;
    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 160 - dist) * 0.35;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

const FloatingTelemetryCard = ({ 
  children, 
  delay = 0, 
  initialX = "", 
  initialY = "", 
  mousePos 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  initialX?: string; 
  initialY?: string; 
  mousePos: { x: number; y: number } 
}) => {
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const offsetX = (mousePos.x - windowSize.w / 2) * 0.035;
  const offsetY = (mousePos.y - windowSize.h / 2) * 0.035;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        x: offsetX, 
        y: offsetY,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay }}
      className="absolute hidden xl:block p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md font-mono text-[9px] uppercase tracking-widest text-indigo-400 select-none pointer-events-none z-20 shadow-2xl animate-none"
      style={{
        left: initialX,
        top: initialY
      }}
    >
      {children}
    </motion.div>
  );
};

export const PerformanceHero = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="pt-32 pb-24 bg-[#060813] relative overflow-hidden text-white border-b border-white/5"
    >
      {/* Spotlight dynamic glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.07), rgba(245, 158, 11, 0.02) 50%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Warp background mesh lines */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      {/* 3D Telemetry cards drifting */}
      <FloatingTelemetryCard delay={0.1} initialX="12%" initialY="25%" mousePos={mousePos}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span>[ENGINE_STATUS: SYNCHRONIZED]</span>
        </div>
      </FloatingTelemetryCard>
      
      <FloatingTelemetryCard delay={0.2} initialX="78%" initialY="55%" mousePos={mousePos}>
        <div className="flex items-center gap-2 text-indigo-400">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          <span>[TRACKED_GAPS: 04 // GAP_METRIC]</span>
        </div>
      </FloatingTelemetryCard>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-widest mb-8 shadow-2xl backdrop-blur-md"
        >
          <BarChart3 size={14} className="animate-pulse text-indigo-400" /> Data-Driven Achievement
        </motion.div>
        
        <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter uppercase leading-none select-none">
          Precision <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black">Analytics.</span>
        </h1>
        
        <p className="text-slate-400 max-w-2xl mx-auto font-medium text-sm md:text-base leading-relaxed mb-12">
          Stop guessing. Start measuring. Our proprietary performance engine tracks 50+ parameters to identify your exact learning gaps.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto relative z-20">
          <motion.button 
             onClick={() => {
               const el = document.getElementById('audit-section');
               if (el) {
                 el.scrollIntoView({ behavior: 'smooth' });
               }
             }}
             onMouseMove={handleButtonMove}
             onMouseLeave={handleButtonLeave}
             whileTap={{ scale: 0.95 }}
             className="px-10 py-5 bg-secondary text-primary font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-secondary/15 transition-colors relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer"
          >
             <Sparkles size={16} /> Request Audit
          </motion.button>
          
          <motion.button 
             onClick={() => navigate('/book-demo')}
             onMouseMove={handleButtonMove}
             onMouseLeave={handleButtonLeave}
             whileTap={{ scale: 0.95 }}
             className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all flex items-center justify-center gap-2 shadow-2xl backdrop-blur-md cursor-pointer"
          >
             <Zap size={18} className="text-secondary" /> See Live Demo
          </motion.button>
        </div>
      </div>
    </section>
  );
};
