import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Wifi, Book, Monitor, Coffee, Shield } from 'lucide-react';

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

const FacilityCard = ({
  fac,
  index,
  hoveredIndex,
  setHoveredIndex,
  themeConfig
}: {
  fac: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  themeConfig: { sparkClass: string; laserColor: string; badgeCode: string; iconColor: string; cardBorderColor: string };
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  const isSelfHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col gap-4 bg-white/5 border-white/10 ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_15px_30px_rgba(99,102,241,0.15)] bg-white/10 ${themeConfig.cardBorderColor}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-white/5'
            : 'hover:shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Laser Border Highlight */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(110px circle at ${coords.x}px ${coords.y}px, ${themeConfig.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={themeConfig.sparkClass} />

      {/* Rotating Concentric HUD Icon Orbits */}
      <div className="relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-4px] border border-dashed border-white/20 rounded-full animate-spin pointer-events-none group-hover/card:border-white/40" style={{ animationDuration: '8s' }} />
        {React.cloneElement(fac.icon, { size: 20, className: `relative z-10 ${themeConfig.iconColor}` })}
      </div>

      <div className="relative z-10 flex-grow" style={{ transform: "translateZ(15px)" }}>
        <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[7px] text-slate-500 select-none">
          <span className="font-bold uppercase">INFRA_TIER // STABLE</span>
          <span>[{themeConfig.badgeCode}]</span>
        </div>
        <h4 className="font-black text-white mb-2 uppercase text-sm tracking-tight group-hover/card:text-indigo-300 transition-colors">
          {fac.name}
        </h4>
        <p className="text-slate-400 text-xs font-semibold leading-relaxed">
          {fac.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const InfrastructureShowcase = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewportsTilt, setViewportsTilt] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSectionCoords({ x, y });
    setIsSectionHovered(true);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setViewportsTilt({
      x: (x - cx) / cx,
      y: (y - cy) / cy
    });
  };

  const facilities = [
    { name: "Digital Library", icon: <Book />, desc: "Access to 5000+ specialized reference titles." },
    { name: "Tech Labs", icon: <Monitor />, desc: "High-end stations for simulated CBT testing." },
    { name: "Hi-Speed Wi-Fi", icon: <Wifi />, desc: "Seamless access to our video lecture repositories." },
    { name: "Student Lounge", icon: <Coffee />, desc: "Ergonomic spaces for focused group discussions." }
  ];

  const themeMap: Record<number, { sparkClass: string; laserColor: string; badgeCode: string; iconColor: string; cardBorderColor: string }> = {
    0: {
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "FC_01 // REFERENCE",
      iconColor: "text-indigo-400",
      cardBorderColor: "group-hover/card:border-indigo-500/30"
    },
    1: {
      sparkClass: "bg-cyan-500",
      laserColor: "rgba(6, 182, 212, 0.4)",
      badgeCode: "FC_02 // CBT_STATIONS",
      iconColor: "text-cyan-400",
      cardBorderColor: "group-hover/card:border-cyan-500/30"
    },
    2: {
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "FC_03 // REPOSITORIES",
      iconColor: "text-emerald-450",
      cardBorderColor: "group-hover/card:border-emerald-500/30"
    },
    3: {
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "FC_04 // DISCUSSION",
      iconColor: "text-amber-450",
      cardBorderColor: "group-hover/card:border-amber-500/30"
    }
  };

  // Math variables for coordinates gravity grid warping
  const gridCols = 13;
  const gridRows = 7;
  const warpStrength = 20;
  const warpRadius = 150;

  const renderWarpGrid = () => {
    if (!sectionRef.current) return null;
    const rect = sectionRef.current.getBoundingClientRect();
    const w = rect.width || 1200;
    const h = rect.height || 500;

    const colStep = w / (gridCols - 1);
    const rowStep = h / (gridRows - 1);

    const pts: { x: number; y: number }[][] = [];
    for (let r = 0; r < gridRows; r++) {
      pts[r] = [];
      for (let c = 0; c < gridCols; c++) {
        const bx = c * colStep;
        const by = r * rowStep;

        if (isSectionHovered) {
          const dx = sectionCoords.x - bx;
          const dy = sectionCoords.y - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < warpRadius) {
            const factor = (1 - dist / warpRadius) * warpStrength;
            pts[r].push({
              x: bx - (dx / (dist || 1)) * factor,
              y: by - (dy / (dist || 1)) * factor
            });
          } else {
            pts[r].push({ x: bx, y: by });
          }
        } else {
          pts[r].push({ x: bx, y: by });
        }
      }
    }

    const paths: string[] = [];
    // Horizontal lines
    for (let r = 0; r < gridRows; r++) {
      let d = `M ${pts[r][0].x} ${pts[r][0].y}`;
      for (let c = 1; c < gridCols; c++) {
        d += ` L ${pts[r][c].x} ${pts[r][c].y}`;
      }
      paths.push(d);
    }
    // Vertical lines
    for (let c = 0; c < gridCols; c++) {
      let d = `M ${pts[0][c].x} ${pts[0][c].y}`;
      for (let r = 1; r < gridRows; r++) {
        d += ` L ${pts[r][c].x} ${pts[r][c].y}`;
      }
      paths.push(d);
    }

    return (
      <svg className="absolute inset-0 w-full h-full stroke-white/[0.04] stroke-1 fill-none pointer-events-none">
        {paths.map((d, i) => (
          <path key={i} d={d} className="transition-all duration-300 ease-out" />
        ))}
      </svg>
    );
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => {
        setIsSectionHovered(false);
        setViewportsTilt({ x: 0, y: 0 });
      }}
      className="py-32 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Gravity mesh warp grid */}
      {renderWarpGrid()}

      {/* Dotted blueprint overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(6, 8, 19, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Guidelines layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          
          {/* Right panel: Title and feature grid */}
          <div className="lg:w-1/2">
            <div className="mb-10 select-none">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-md"
              >
                <Shield size={11} className="text-indigo-400 animate-pulse" />
                <span>Verified Facilities Index</span>
              </motion.div>

              <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-6 uppercase leading-tight">
                World Class <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
                  Infrastructure.
                </span>
              </h3>
              <p className="text-slate-400 font-semibold leading-relaxed text-sm md:text-base italic-small">
                Environment shapes the mind. Our campuses are designed to be sanctuaries of focus, blending modern technology with ergonomic comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {facilities.map((fac, i) => (
                <FacilityCard
                  key={i}
                  fac={fac}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  themeConfig={themeMap[i]}
                />
              ))}
            </div>
          </div>
          
          {/* Left panel: Campus consoles viewports */}
          <div 
            className="lg:w-1/2 grid grid-cols-2 gap-6 w-full"
            style={{
              transform: `perspective(1000px) rotateX(${viewportsTilt.y * 4}deg) rotateY(${-viewportsTilt.x * 4}deg) scale3d(1, 1, 1)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.5s ease-out"
            }}
          >
            {/* Viewport L Console */}
            <div className="bg-[#0b0f1e]/95 border border-white/10 rounded-[3rem] p-4 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              <div className="flex items-center gap-1 absolute top-4 left-6 z-20 select-none">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="w-full text-center pb-2 border-b border-white/5 mb-3 select-none">
                <span className="font-mono text-[6.5px] tracking-widest text-slate-500 uppercase">
                  [VP_L // CAMPUS_01]
                </span>
              </div>
              <div className="relative rounded-[2.2rem] overflow-hidden aspect-[4/5] bg-slate-900 group">
                <div className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-20 pointer-events-none group-hover:top-[100%] transition-all duration-[3000ms] ease-linear" style={{ top: '0%' }} />
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
                  alt="Campus 1" 
                />
              </div>
            </div>

            {/* Viewport R Console (tilted / offset top) */}
            <div className="bg-[#0b0f1e]/95 border border-white/10 rounded-[3rem] p-4 shadow-2xl relative overflow-hidden backdrop-blur-2xl mt-12">
              <div className="flex items-center gap-1 absolute top-4 left-6 z-20 select-none">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="w-full text-center pb-2 border-b border-white/5 mb-3 select-none">
                <span className="font-mono text-[6.5px] tracking-widest text-slate-500 uppercase">
                  [VP_R // CAMPUS_02]
                </span>
              </div>
              <div className="relative rounded-[2.2rem] overflow-hidden aspect-[4/5] bg-slate-900 group">
                <div className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-20 pointer-events-none group-hover:top-[100%] transition-all duration-[3000ms] ease-linear" style={{ top: '0%' }} />
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
                  alt="Campus 2" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
