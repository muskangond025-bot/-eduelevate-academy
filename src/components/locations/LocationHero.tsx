import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Sparkles } from 'lucide-react';

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

const GravityWarpMeshGrid = ({ mouseCoords, isActive }: { mouseCoords: { x: number; y: number }; isActive: boolean }) => {
  const gridRows = 8;
  const gridCols = 14;
  const [warpOffsets, setWarpOffsets] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    if (!isActive) return;
    const offsets: Record<string, { x: number; y: number }> = {};
    for (let r = 0; r <= gridRows; r++) {
      for (let c = 0; c <= gridCols; c++) {
        const nodeX = (c / gridCols) * window.innerWidth;
        const nodeY = (r / gridRows) * 550; // section height estimate
        const dx = mouseCoords.x - nodeX;
        const dy = mouseCoords.y - nodeY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 320;
        
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const pull = force * force * -32;
          offsets[`${r}-${c}`] = {
            x: (dx / distance) * pull,
            y: (dy / distance) * pull
          };
        } else {
          offsets[`${r}-${c}`] = { x: 0, y: 0 };
        }
      }
    }
    setWarpOffsets(offsets);
  }, [mouseCoords, isActive]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.09] z-0">
      {/* Horizontal grid lines */}
      {Array.from({ length: gridRows + 1 }).map((_, r) => {
        const yPercent = (r / gridRows) * 100;
        return (
          <path
            key={`h-${r}`}
            d={Array.from({ length: gridCols + 1 }).map((_, c) => {
              const xPercent = (c / gridCols) * 100;
              const offset = warpOffsets[`${r}-${c}`] || { x: 0, y: 0 };
              const action = c === 0 ? 'M' : 'L';
              return `${action} calc(${xPercent}% + ${offset.x}px) calc(${yPercent}% + ${offset.y}px)`;
            }).join(' ')}
            fill="none"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1"
            className="transition-all duration-300"
          />
        );
      })}

      {/* Vertical grid lines */}
      {Array.from({ length: gridCols + 1 }).map((_, c) => {
        const xPercent = (c / gridCols) * 100;
        return (
          <path
            key={`v-${c}`}
            d={Array.from({ length: gridRows + 1 }).map((_, r) => {
              const yPercent = (r / gridRows) * 100;
              const offset = warpOffsets[`${r}-${c}`] || { x: 0, y: 0 };
              const action = r === 0 ? 'M' : 'L';
              return `${action} calc(${xPercent}% + ${offset.x}px) calc(${yPercent}% + ${offset.y}px)`;
            }).join(' ')}
            fill="none"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1"
            className="transition-all duration-300"
          />
        );
      })}
    </svg>
  );
};

const MagneticNavigationButton = ({
  children,
  onClick,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  laserColor?: string;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setBtnCoords({ x, y });
    setPosition({
      x: (x - centerX) * 0.15,
      y: (y - centerY) * 0.15
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3" style={{ transform: "translateZ(10px)" }}>
        {children}
      </span>
    </motion.button>
  );
};

export const LocationHero = ({ city = "Pune", area = "Kothrud" }) => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-40 pb-28 bg-[#060813] relative overflow-hidden text-white border-b border-white/5"
    >
      {/* Dynamic shifting coordinates warp mesh grid */}
      <GravityWarpMeshGrid mouseCoords={sectionCoords} isActive={isSectionHovered} />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
      <div
        className="absolute pointer-events-none transition-opacity duration-75 blur-[120px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '550px',
          height: '550px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(6, 8, 19, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Spark Particle Trails */}
      <SparkParticlesTrail coords={sectionCoords} colorClass="bg-cyan-400" />

      {/* Layout lines guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 select-none">
        
        {/* Visual Badge Header with spin reticles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-8 relative overflow-hidden"
        >
          <div className="w-5 h-5 rounded-full border border-indigo-500/40 relative flex items-center justify-center shrink-0">
            <div className="absolute -inset-0.5 border border-dashed border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <MapPin size={10} className="text-indigo-400" />
          </div>
          <span>Premier Learning Hub</span>
        </motion.div>
        
        {/* Main Title with word reveal split stagger and gradient overlay */}
        <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.95] max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="block overflow-hidden"
          >
            Coaching Classes
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 100 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 font-extrabold italic mt-2"
          >
            In {area}, {city}.
          </motion.span>
        </h1>
        
        {/* Subtitle details */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 max-w-2xl mx-auto font-semibold leading-relaxed text-sm md:text-base px-4 mb-14"
        >
          Expert-led JEE, NEET & Foundation programs tailored for the academic excellence of students in {area}.
        </motion.p>

        {/* Holographic Magnetic Action Button */}
        <motion.div 
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="flex justify-center"
        >
            <MagneticNavigationButton 
              className="px-12 py-5.5 bg-white text-[#060813] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 hover:text-white cursor-pointer"
              laserColor="rgba(99, 102, 241, 0.4)"
              onClick={() => window.open('https://maps.google.com/?q=18.5089,73.8078', '_blank')}
            >
               <Navigation size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
               <span>Get Directions</span>
            </MagneticNavigationButton>
        </motion.div>
      </div>

      {/* Simulated cyber telemetry logs footer */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between font-mono text-[6px] text-slate-600 tracking-wider pointer-events-none select-none z-10">
        <span>[SYS_INTEGRITY: SECURE // LOCATION_SUITE: IN_USE]</span>
        <span>[CENTER_CODE: KTHRD_01 // COORDS: 18.5089° N, 73.8078° E]</span>
      </div>
    </section>
  );
};
