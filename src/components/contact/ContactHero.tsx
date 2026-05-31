import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Cpu, Activity, Sparkles } from 'lucide-react';
import contactHeroImg from '../../assets/contact_hero.png';

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
            width: `${5 - idx * 1.2}px`,
            height: `${5 - idx * 1.2}px`,
            opacity: 0.6 - idx * 0.15,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        />
      ))}
    </>
  );
};

const DriftingTelemetryBadge = ({
  children,
  className,
  initialX,
  initialY,
  mouseCoords
}: {
  children: React.ReactNode;
  className?: string;
  initialX: string;
  initialY: string;
  mouseCoords: { x: number; y: number };
}) => {
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const w = window.innerWidth || 1200;
    const h = window.innerHeight || 800;
    const dx = (mouseCoords.x - w / 2) / (w / 2);
    const dy = (mouseCoords.y - h / 2) / (h / 2);

    setDrift({
      x: dx * -15,
      y: dy * -15
    });
  }, [mouseCoords]);

  return (
    <motion.div
      animate={{ x: drift.x, y: drift.y }}
      transition={{ type: "spring", stiffness: 60, damping: 25 }}
      style={{ left: initialX, top: initialY }}
      className={`absolute hidden xl:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 font-mono text-[9px] text-slate-400 select-none backdrop-blur-md shadow-md pointer-events-none z-20 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const KineticWord = ({ 
  word, 
  className, 
  delayOffset = 0, 
  mouseCoords 
}: { 
  word: string; 
  className: string; 
  delayOffset: number;
  mouseCoords: { x: number; y: number };
}) => {
  const letters = word.split('');
  return (
    <span className="flex flex-wrap gap-x-[0.02em] justify-center overflow-visible">
      {letters.map((char, charIdx) => {
        const letterRef = useRef<HTMLSpanElement>(null);
        const [letterOffset, setLetterOffset] = useState({ x: 0, y: 0, scale: 1, skew: 0 });
        const [isHovered, setIsHovered] = useState(false);

        useEffect(() => {
          if (!letterRef.current) return;
          const rect = letterRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const dx = mouseCoords.x - centerX;
          const dy = mouseCoords.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const pullFactor = (120 - distance) / 120;
            setLetterOffset({
              x: (dx / distance) * pullFactor * -15,
              y: (dy / distance) * pullFactor * -15,
              scale: 1 + pullFactor * 0.25,
              skew: pullFactor * -15
            });
            setIsHovered(true);
          } else {
            setLetterOffset({ x: 0, y: 0, scale: 1, skew: 0 });
            setIsHovered(false);
          }
        }, [mouseCoords]);

        return (
          <motion.span
            ref={letterRef}
            key={charIdx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: letterOffset.y,
              x: letterOffset.x,
              scale: letterOffset.scale,
              skewX: letterOffset.skew,
              color: 'inherit'
            }}
            transition={{
              type: "spring",
              stiffness: isHovered ? 250 : 120,
              damping: isHovered ? 12 : 25,
              delay: delayOffset + charIdx * 0.04
            }}
            className={`inline-block select-none origin-center cursor-pointer transition-colors duration-200 ${className}`}
            style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
};

export const ContactHero = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setGlobalMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  // Generate SVG Gravity Warp Mesh Grid Points
  const meshCols = 12;
  const meshRows = 6;
  const gridPoints: { originalX: number; originalY: number; id: string }[] = [];

  for (let r = 0; r <= meshRows; r++) {
    for (let c = 0; c <= meshCols; c++) {
      gridPoints.push({
        originalX: (c / meshCols) * 100,
        originalY: (r / meshRows) * 100,
        id: `${r}-${c}`
      });
    }
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-28 pb-28 min-h-[580px] bg-[#060813] overflow-hidden select-none flex items-center"
    >
      {/* Gravity Warp Coordinates Mesh Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none z-0">
        <defs>
          <radialGradient id="meshSpotlight" r="30%" cx={`${(coords.x / (containerRef.current?.clientWidth || 1)) * 100}%`} cy={`${(coords.y / (containerRef.current?.clientHeight || 1)) * 100}%`}>
            <stop offset="0%" stopColor="#fb923c" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Draw horizontal lines warping toward cursor */}
        {Array.from({ length: meshRows + 1 }).map((_, r) => {
          let pathD = "";
          for (let c = 0; c <= meshCols; c++) {
            const px = (c / meshCols) * (containerRef.current?.clientWidth || 1200);
            const py = (r / meshRows) * (containerRef.current?.clientHeight || 600);
            
            const dx = coords.x - px;
            const dy = coords.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let ox = px;
            let oy = py;
            if (dist < 300) {
              const force = (300 - dist) / 300;
              ox -= dx * force * 0.12;
              oy -= dy * force * 0.12;
            }
            
            pathD += `${c === 0 ? 'M' : 'L'} ${ox} ${oy}`;
          }
          return (
            <path
              key={`h-${r}`}
              d={pathD}
              fill="none"
              stroke="url(#meshSpotlight)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Draw vertical lines warping toward cursor */}
        {Array.from({ length: meshCols + 1 }).map((_, c) => {
          let pathD = "";
          for (let r = 0; r <= meshRows; r++) {
            const px = (c / meshCols) * (containerRef.current?.clientWidth || 1200);
            const py = (r / meshRows) * (containerRef.current?.clientHeight || 600);
            
            const dx = coords.x - px;
            const dy = coords.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let ox = px;
            let oy = py;
            if (dist < 300) {
              const force = (300 - dist) / 300;
              ox -= dx * force * 0.12;
              oy -= dy * force * 0.12;
            }
            
            pathD += `${r === 0 ? 'M' : 'L'} ${ox} ${oy}`;
          }
          return (
            <path
              key={`v-${c}`}
              d={pathD}
              fill="none"
              stroke="url(#meshSpotlight)"
              strokeWidth="0.8"
            />
          );
        })}
      </svg>

      {/* Spotlight neon glow trail */}
      <div
        className="absolute pointer-events-none transition-opacity duration-150 blur-[140px] rounded-full z-0"
        style={{
          opacity: isHovered ? 0.35 : 0,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 100%)'
        }}
      />

      {/* Spark Particle Trails */}
      <SparkParticlesTrail coords={coords} colorClass="bg-orange-400" />

      {/* Technical grid line guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Split Grid for Title + 4K Image (No Overlay, Zero Text overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
          
          {/* Left Column: Clean text and typography */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
            {/* Orbited badge with rotating dash reticle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-orange-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 relative overflow-hidden"
            >
              <div className="w-5 h-5 rounded-full border border-orange-500/30 relative flex items-center justify-center shrink-0">
                <div className="absolute -inset-0.5 border border-dashed border-orange-400/50 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                <MessageSquare size={10} className="text-orange-400" />
              </div>
              <span>Get In Touch</span>
            </motion.div>
            
            {/* Title Header with Staggered Kinetic Splintered Characters Wave */}
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.95] flex flex-col gap-3 justify-start items-start overflow-visible w-full">
              <div className="overflow-visible">
                <KineticWord 
                  word="LET'S START" 
                  className="text-white font-black tracking-tighter"
                  delayOffset={0.1}
                  mouseCoords={globalMouse}
                />
              </div>
              <div className="overflow-visible mt-2">
                <KineticWord 
                  word="YOUR JOURNEY." 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-indigo-500 font-black italic tracking-tighter"
                  delayOffset={0.35}
                  mouseCoords={globalMouse}
                />
              </div>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 font-semibold leading-relaxed text-sm md:text-base max-w-xl"
            >
              Have questions about our academic paths? Our counselors are ready to map out your personalized high-fidelity success roadmap.
            </motion.p>
          </div>

          {/* Right Column: 4K Real Stock Image framed elegantly (No dark overlays, No text overlap) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div 
              className="w-full max-w-md aspect-[4/3] rounded-[3rem] border-8 border-white/10 overflow-hidden shadow-2xl relative bg-slate-900/60 group/img cursor-pointer"
              style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle, rgba(251, 146, 60, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* Sparks Trail */}
              <div className="absolute inset-0 z-10 pointer-events-none" />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={contactHeroImg} 
                alt="Friendly Academic Counselor" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />

              {/* Corner tech badge indicating 4K authenticity */}
              <span className="absolute bottom-4 right-6 font-mono text-[5px] text-white bg-slate-900/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider z-20">
                [NODE_FOCAL: 4K_UHD // CALIBRATED]
              </span>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Bottom neon laser border grid segment */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
    </section>
  );
};
