import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Cpu, MapPin, Grid, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const gridRows = 6;
  const gridCols = 12;
  const [warpOffsets, setWarpOffsets] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    if (!isActive) return;
    const offsets: Record<string, { x: number; y: number }> = {};
    for (let r = 0; r <= gridRows; r++) {
      for (let c = 0; c <= gridCols; c++) {
        const nodeX = (c / gridCols) * window.innerWidth;
        const nodeY = (r / gridRows) * 450; // section height estimate
        const dx = mouseCoords.x - nodeX;
        const dy = mouseCoords.y - nodeY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 280;
        
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const pull = force * force * -28;
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

const MagneticActionButton = ({
  children,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)"
}: {
  children: React.ReactNode;
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

export const LocationOutreachCTA = ({ city = "Pune", area = "Kothrud" }) => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [cardCoords, setCardCoords] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCardCoords({ x, y });
    setCardTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#060813] relative overflow-hidden"
    >
      {/* Dynamic coordinates gravity warp mesh grid */}
      <GravityWarpMeshGrid mouseCoords={sectionCoords} isActive={isSectionHovered} />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
      <div
        className="absolute pointer-events-none transition-opacity duration-75 blur-[120px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(6, 8, 19, 0.05) 50%, transparent 100%)'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Frosted Glassmorphic Outreach Console Bezel */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="relative rounded-[4rem] border transition-all duration-500 overflow-hidden bg-[#0d1222]/30 backdrop-blur-xl border-white/10 shadow-2xl p-16 lg:p-24 flex flex-col items-center text-center select-none animate-pulse-slow"
          style={{
            transform: `perspective(1000px) rotateX(${-cardTilt.y * 3.5}deg) rotateY(${cardTilt.x * 3.5}deg) scale3d(${isCardHovered ? 1.015 : 1}, ${isCardHovered ? 1.015 : 1}, 1)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Border laser sweep highlight trailing cursor inside card */}
          <div
            className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(150px circle at ${cardCoords.x}px ${cardCoords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
              padding: '1.2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Dynamic Holographic Foil Sheen Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 mix-blend-overlay"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(99,102,241,0.08) 50%, rgba(34,211,238,0.06) 60%, rgba(255,255,255,0) 100%)`,
              transform: `translate(${cardTilt.x * 25}px, ${cardTilt.y * 25}px)`
            }}
          />

          {/* Sparks Trail */}
          <SparkParticlesTrail coords={cardCoords} colorClass="bg-indigo-400" />

          {/* Visual HUD Orbit Badge */}
          <div className="relative mb-8 w-20 h-20 flex items-center justify-center" style={{ transform: "translateZ(35px)" }}>
            <div className="absolute inset-0 border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute inset-[-6px] border border-dotted border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '16s', animationDirection: 'reverse' }} />
            <motion.div 
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/15 border border-indigo-400/45 flex items-center justify-center text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.35)] relative"
            >
              <Compass size={20} className="text-cyan-300 animate-pulse" />
              
              {/* Active status indicator led dot */}
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-ping" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_4px_#22d3ee]" />
            </motion.div>
          </div>

          {/* Headline word clip stagger reveals */}
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-6 overflow-visible py-1" style={{ transform: "translateZ(30px)" }}>
            Not In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 italic font-black px-1">
              {area}?
            </span>
          </h3>
          
          {/* Description paragraph */}
          <p className="text-slate-300 font-semibold leading-relaxed max-w-xl mb-12 text-sm md:text-base" style={{ transform: "translateZ(15px)" }}>
            We have 12+ centers across {city}. Find the one nearest to you and start your journey to excellence.
          </p>

          {/* Holographic Magnetic Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md relative" style={{ transform: "translateZ(25px)" }}>
            <Link to="/contact" className="flex-1">
              <MagneticActionButton
                className="w-full py-5.5 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-black hover:scale-[1.03] shadow-2xl"
                laserColor="rgba(255, 255, 255, 0.45)"
              >
                <span>Find Nearest Center</span>
                <MapPin size={12} className="group-hover/btn:translate-y-[-1px] transition-transform text-white" />
              </MagneticActionButton>
            </Link>

            <Link to="/contact" className="flex-1">
              <MagneticActionButton
                className="w-full py-5.5 bg-white/5 border border-white/10 text-white font-black hover:bg-white/10"
                laserColor="rgba(99, 102, 241, 0.4)"
              >
                <span>All Centers List</span>
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform text-white" />
              </MagneticActionButton>
            </Link>
          </div>

          {/* Fixed corner technical coordinates tracker indicators */}
          <span className="absolute bottom-4 right-6 font-mono text-[7px] text-slate-500 select-none">
            <span className="mr-4">[OUTREACH_STATUS: PUNE_WIDE]</span>
            <span>[TOTAL_HUBS: 12+]</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
