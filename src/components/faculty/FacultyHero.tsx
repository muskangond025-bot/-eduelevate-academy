import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

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

export const FacultyHero = () => {
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

  const handleSectionMouseLeave = () => {
    setIsSectionHovered(false);
  };

  // Math variables for coordinates gravity grid warping
  const gridCols = 13;
  const gridRows = 7;
  const warpStrength = 18;
  const warpRadius = 140;

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
      onMouseLeave={handleSectionMouseLeave}
      className="pt-40 pb-28 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Gravity mesh coordinate canvas warp grid */}
      {renderWarpGrid()}

      {/* Dotted blueprint overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Spotlight neon glowing nebulae */}
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

      {/* Spark Particle Trails */}
      <SparkParticlesTrail coords={sectionCoords} colorClass="bg-indigo-500" />

      {/* Layout anchor guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 select-none">
        
        {/* Academic Titans Badge with rotating orbit indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-indigo-950/50 border border-indigo-500/20 px-5 py-2.5 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-10 shadow-md relative overflow-hidden"
        >
          <style>{`
            @keyframes cap-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .animate-cap-spin {
              animation: cap-spin 6s linear infinite;
            }
          `}</style>
          <div className="w-5 h-5 rounded-full border border-indigo-500/30 relative flex items-center justify-center shrink-0">
            <div className="absolute -inset-0.5 border border-dashed border-indigo-400/40 rounded-full animate-cap-spin" />
            <GraduationCap size={10} />
          </div>
          <span>The Academic Titans</span>
        </motion.div>
        
        {/* Main Title with word reveal split stagger reveals */}
        <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-none">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="block overflow-hidden"
          >
            Learn from the
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 100 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black mt-2"
          >
            Masters.
          </motion.span>
        </h1>
        
        {/* Faculty Subheading info panel */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 max-w-3xl mx-auto font-semibold leading-relaxed text-sm md:text-base italic-small px-4"
        >
          Behind every top rank is a mentor who pushed the boundaries of conceptual logic. Our faculty team consists of the finest academic minds, alumni from India's premier institutes.
        </motion.p>
      </div>
    </section>
  );
};
