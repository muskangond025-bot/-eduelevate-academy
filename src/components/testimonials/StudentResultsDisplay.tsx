import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Target, Trophy, Shield } from 'lucide-react';

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

const CountUpValue = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("");
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/(\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const prefix = value.substring(0, match.index);
    const suffix = value.substring(match.index! + match[1].length);
    const hasDecimal = match[1].includes('.');

    let start = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quadratic ease out
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * targetNumber;
      const formatted = hasDecimal ? current.toFixed(1) : Math.floor(current).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, hasStarted]);

  return <span ref={elementRef}>{displayValue}</span>;
};

const StatItemCard = ({
  stat,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  stat: { icon: React.ReactNode; title: string; desc: string; sparkClass: string; laserColor: string; themeColor: string; badgeCode: string };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
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

  const colorMap: Record<string, string> = {
    indigo: "group-hover/card:border-indigo-500/30 text-indigo-400",
    emerald: "group-hover/card:border-emerald-500/30 text-emerald-450",
    cyan: "group-hover/card:border-cyan-500/30 text-cyan-400"
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-10 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col items-center justify-center text-center bg-white/5 border-white/10 ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.15)] bg-white/10 ${colorMap[stat.themeColor].split(' ')[0]}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-white/5'
            : 'hover:shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${stat.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={stat.sparkClass} />

      {/* Rotating Concentric HUD Icon Orbits */}
      <div className="relative w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary mx-auto mb-8 shadow-sm group-hover/card:scale-110 transition-transform z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-6px] border border-dashed border-white/20 rounded-full animate-spin pointer-events-none group-hover/card:border-white/40" style={{ animationDuration: '8s' }} />
        {React.cloneElement(stat.icon as React.ReactElement, { size: 24, className: `relative z-10 ${colorMap[stat.themeColor].split(' ')[1]}` })}
      </div>

      {/* Stat value with scroll-triggered count-up */}
      <div className="text-5xl font-black text-white mb-3 tracking-tight select-none" style={{ transform: "translateZ(20px)" }}>
        <CountUpValue value={stat.title} />
      </div>

      <p className="text-indigo-200 text-xs font-semibold leading-relaxed max-w-[220px] mx-auto select-none" style={{ transform: "translateZ(10px)" }}>
        {stat.desc}
      </p>

      {/* Monospaced badge code */}
      <span className="absolute bottom-5 font-mono text-[7px] text-slate-500 opacity-60 select-none z-10">
        [{stat.badgeCode}]
      </span>
    </motion.div>
  );
};

export const StudentResultsDisplay = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const stats = [
    { 
      icon: <Award />, 
      title: "92%", 
      desc: "Average Score increase after 6 months of coaching",
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "STAT_01 // COGNITIVE_BOOST"
    },
    { 
      icon: <Trophy />, 
      title: "1200+", 
      desc: "Students qualified for premier colleges in 2024",
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "STAT_02 // ADMISSION_SELECTIONS"
    },
    { 
      icon: <Target />, 
      title: "99.9%", 
      desc: "Satisfaction rate reported in our annual student audit",
      themeColor: "cyan",
      sparkClass: "bg-cyan-500",
      laserColor: "rgba(6, 182, 212, 0.4)",
      badgeCode: "STAT_03 // SATISFACTION_INDEX"
    }
  ];

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
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Gravity mesh coordinate canvas warp grid backdrop */}
      {renderWarpGrid()}

      {/* Dotted blueprint overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* HSL spotlight gradient nebulae */}
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

      {/* Layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Validated Wins badge header */}
        <div className="text-center mb-24 relative select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-md"
          >
            <Shield size={11} className="text-indigo-400 animate-pulse" />
            <span>Audited Performance Records</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase leading-none">
            Validated{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
              Wins.
            </span>
          </h2>
        </div>

        {/* 3-column stats cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <StatItemCard
              key={i}
              stat={stat}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
