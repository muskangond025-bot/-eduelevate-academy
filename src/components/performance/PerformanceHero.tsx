import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import performanceHeroImg from '../../assets/performance_hero.png';


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
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [imgTilt, setImgTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleImgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setImgTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsImgHovered(true);
  };

  const handleImgMouseLeave = () => {
    setImgTilt({ x: 0, y: 0 });
    setIsImgHovered(false);
  };


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
      className="relative pt-12 pb-24 overflow-hidden bg-bg-dark text-white border-b border-white/5"
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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid for Title + 4K Image (No Overlay, Zero Text overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
          
          {/* Left Column: Clean text and typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter uppercase leading-tight select-none overflow-visible py-1">
              Precision{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black px-1">Analytics.</span>
            </h1>
            
            <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed mb-12 max-w-xl text-left">
              Stop guessing. Start measuring. Our proprietary performance engine tracks 50+ parameters to identify your exact learning gaps.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md relative z-20">
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
                 className="px-10 py-5 bg-secondary text-primary font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-secondary/15 transition-colors relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                 <Sparkles size={16} /> Request Audit
              </motion.button>
              
              <motion.button 
                 onClick={() => navigate('/book-demo')}
                 onMouseMove={handleButtonMove}
                 onMouseLeave={handleButtonLeave}
                 whileTap={{ scale: 0.95 }}
                 className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all flex items-center justify-center gap-2 shadow-2xl backdrop-blur-md cursor-pointer w-full sm:w-auto"
              >
                 <Zap size={18} className="text-secondary" /> See Live Demo
              </motion.button>
            </div>
          </div>

          {/* Right Column: 4K Real Stock Image framed elegantly (No dark overlays, No text overlap) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div 
              onMouseMove={handleImgMouseMove}
              onMouseLeave={handleImgMouseLeave}
              className="w-full max-w-md aspect-[4/3] rounded-[3rem] border-8 border-white/5 overflow-hidden shadow-2xl relative bg-slate-900 group/img cursor-pointer"
              style={{ 
                transform: `perspective(1000px) rotateX(${-imgTilt.y * 6}deg) rotateY(${imgTilt.x * 6}deg) scale3d(${isImgHovered ? 1.02 : 1}, ${isImgHovered ? 1.02 : 1}, 1)`,
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle at ${mousePos.x % 400}px ${mousePos.y % 300}px, rgba(251, 146, 60, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={performanceHeroImg} 
                alt="Student Performance Dashboard Analytics" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />

              {/* Corner tech badge indicating 4K authenticity */}
              <span className="absolute bottom-4 right-6 font-mono text-[5px] text-white bg-slate-950/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider z-20">
                [NODE_FOCAL: 4K_UHD // CALIBRATED]
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
