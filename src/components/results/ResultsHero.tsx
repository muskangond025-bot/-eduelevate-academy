import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, Award, Activity } from 'lucide-react';

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

const TrophyHUDBadge = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-3 bg-secondary/10 border border-secondary/20 px-6 py-3 rounded-full text-secondary font-black text-xs uppercase tracking-widest mb-12 relative overflow-hidden cursor-pointer select-none shadow-lg shadow-secondary/5 group/trophy"
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 10}deg) rotateY(${tilt.x * 10}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Sweep glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(80px circle at ${coords.x}px ${coords.y}px, rgba(251,146,60,0.18), transparent 80%)`
        }}
      />

      <style>{`
        @keyframes hud-orbit-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hud-orbit-ccw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-hud-orbit-cw {
          animation: hud-orbit-cw 6s linear infinite;
        }
        .animate-hud-orbit-ccw {
          animation: hud-orbit-ccw 8s linear infinite;
        }
      `}</style>

      {/* Orbiting dashboard rings surrounding icon */}
      <div className="w-5 h-5 rounded-full border border-secondary/30 relative flex items-center justify-center shrink-0">
        <div className="absolute -inset-1 border border-dashed border-secondary/40 rounded-full animate-hud-orbit-cw" />
        <div className="absolute -inset-2 border border-dashed border-secondary/20 rounded-full animate-hud-orbit-ccw" />
        <Trophy size={11} className={`text-secondary ${isHovered ? 'animate-bounce' : ''}`} />
      </div>

      <span className="relative z-10 font-black">The Hall of Fame</span>
    </motion.div>
  );
};

export const ResultsHero = () => {
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
            continue;
          }
        }
        pts[r].push({ x: bx, y: by });
      }
    }

    const paths: React.ReactNode[] = [];
    for (let r = 0; r < gridRows; r++) {
      let d = `M ${pts[r][0].x} ${pts[r][0].y}`;
      for (let c = 1; c < gridCols; c++) {
        d += ` L ${pts[r][c].x} ${pts[r][c].y}`;
      }
      paths.push(
        <path
          key={`h-${r}`}
          d={d}
          fill="none"
          stroke="rgba(99, 102, 241, 0.05)"
          strokeWidth="1"
        />
      );
    }
    for (let c = 0; c < gridCols; c++) {
      let d = `M ${pts[0][c].x} ${pts[0][c].y}`;
      for (let r = 1; r < gridRows; r++) {
        d += ` L ${pts[r][c].x} ${pts[r][c].y}`;
      }
      paths.push(
        <path
          key={`v-${c}`}
          d={d}
          fill="none"
          stroke="rgba(99, 102, 241, 0.05)"
          strokeWidth="1"
        />
      );
    }
    return paths;
  };

  // Drifting 3D floaters coordinates calculations
  const leftFloaterX = isSectionHovered ? (sectionCoords.x - 200) * 0.03 : 0;
  const leftFloaterY = isSectionHovered ? (sectionCoords.y - 250) * 0.03 : 0;
  const rightFloaterX = isSectionHovered ? (sectionCoords.x - 1000) * 0.03 : 0;
  const rightFloaterY = isSectionHovered ? (sectionCoords.y - 250) * 0.03 : 0;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-40 pb-32 bg-[#03050C] relative overflow-hidden border-b border-white/5"
    >
      {/* Dotted Grid Backdrop pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.6) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Iridescent Gravity Warp Canvas Grid Backdrop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {renderWarpGrid()}
      </svg>

      {/* Dynamic spot coordinates spotlight glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Sparks particles trail */}
      <SparkParticlesTrail coords={sectionCoords} colorClass="bg-amber-500" />

      {/* Left Margins Guideline */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      {/* Interactive 3D Parallax Telemetry Floaters */}
      <motion.div
        animate={{ x: leftFloaterX, y: leftFloaterY + 5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute left-[3%] top-[30%] hidden xl:flex flex-col bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md shadow-2xl pointer-events-none select-none z-20"
      >
        <div className="flex items-center gap-2 mb-1.5 font-mono text-[7px] text-slate-400">
          <Activity size={8} className="text-emerald-500 animate-pulse" />
          <span>[AIR_1_SYNC: ACTIVE]</span>
        </div>
        <div className="text-[11px] font-black text-white italic tracking-wide">
          ★ AIR 1 JEE MAIN & ADV
        </div>
      </motion.div>

      <motion.div
        animate={{ x: rightFloaterX, y: rightFloaterY - 5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute right-[3%] top-[30%] hidden xl:flex flex-col bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md shadow-2xl pointer-events-none select-none z-20"
      >
        <div className="flex items-center gap-2 mb-1.5 font-mono text-[7px] text-slate-400">
          <Award size={8} className="text-amber-500" />
          <span>[SCHOLARSHIP: ONLINE]</span>
        </div>
        <div className="text-[11px] font-black text-white italic tracking-wide">
          ★ 100% WAIVER SECURED
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Concentric Trophy HUD badge */}
        <TrophyHUDBadge />
        
        {/* Cinematic headline reveal */}
        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter select-none leading-none">
          Consistency is our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black">
            Legacy.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-semibold leading-relaxed italic-small">
          Year after year, we produce the brightest minds in the country. Explore the records that define academic excellence.
        </p>
      </div>
    </section>
  );
};
