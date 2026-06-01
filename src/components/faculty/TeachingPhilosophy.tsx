import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Target, TrendingUp, Users, Star, Quote } from 'lucide-react';

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

const PillarItemCard = ({
  pillar,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  pillar: { icon: React.ReactNode; title: string; desc: string; sparkColor: string; laserColor: string; themeColor: string; badgeCode: string };
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/40 border-slate-200/50 shadow-sm ${
        isSelfHovered
          ? 'scale-[1.02] shadow-2xl border-indigo-500/20 bg-white/70'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-100/50'
            : 'hover:shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      <style>{`
        @keyframes pil-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-pil-orbit {
          animation: pil-orbit 10s linear infinite;
        }
      `}</style>

      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${pillar.themeColor}, transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${pillar.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass={pillar.sparkColor} />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center" style={{ transform: "translateZ(25px)" }}>
        
        {/* HUD Icon Orbit Circle */}
        <div className="relative w-20 h-20 flex items-center justify-center shrink-0 select-none">
          <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-3xl pointer-events-none opacity-60 animate-pil-orbit group-hover/card:border-indigo-500/20" />
          <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-indigo-650 border border-slate-100/50 group-hover/card:bg-indigo-600 group-hover/card:text-white transition-colors duration-300">
            {React.cloneElement(pillar.icon as React.ReactElement, { 
              size: 28,
              className: `transition-transform duration-500 ${
                isSelfHovered 
                  ? index === 0
                    ? 'scale-110 rotate-12'
                    : index === 1
                      ? 'scale-110 animate-pulse'
                      : index === 2
                        ? 'translate-y-[-2px]'
                        : 'rotate-360 duration-1000'
                  : ''
              }`
            })}
          </div>
        </div>

        {/* Statistic Title & Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2 font-mono text-[7px] text-slate-400 select-none">
            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200/40 uppercase font-black">{pillar.badgeCode}</span>
            <span>★</span>
            <span className="text-indigo-650 font-bold">ETHOS_PILLAR</span>
          </div>
          <h4 className="text-2xl font-black text-slate-800 tracking-tight mb-3 group-hover/card:text-indigo-950 transition-colors uppercase leading-none">
            {pillar.title}
          </h4>
          <p className="text-slate-500 text-base leading-relaxed px-1 md:px-0">
            {pillar.desc}
          </p>
        </div>
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
    </motion.div>
  );
};

const CyberQuotesConsole = ({ ethosText }: { ethosText: string }) => {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
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
      ref={consoleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`mt-20 p-12 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl bg-white/40 border-slate-200/50 text-center group/console ${
        isHovered ? 'scale-[1.01] border-indigo-500/20 shadow-2xl bg-white/70' : 'shadow-sm'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 3}deg) rotateY(${tilt.x * 3}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Inner Spotlights Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
        }}
      />

      {/* Border Laser Mask Sweep */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/console:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

      {/* macOS Header Panel */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-6 select-none font-mono text-[8px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/70" />
          <div className="w-2 h-2 rounded-full bg-amber-500/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
        </div>
        <div className="tracking-widest">[CONSOLE_TARGET: EDUELEVATE_ETHOS // REQ_0x71]</div>
        <div className="w-10 text-right">[OK]</div>
      </div>

      {/* Quote display layout */}
      <div className="relative select-none max-w-4xl mx-auto py-4" style={{ transform: "translateZ(20px)" }}>
        <Quote className="absolute -top-6 -left-6 text-slate-100 w-24 h-24 pointer-events-none z-0" />
        <p className="text-slate-800 text-xl font-semibold italic mb-8 relative z-10 leading-relaxed">
          "{ethosText}"
        </p>
        <div className="font-black text-indigo-600 uppercase tracking-[0.3em] text-xs relative z-10">
          The EduElevate Ethos
        </div>
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-slate-200/60" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-slate-200/60" />
    </motion.div>
  );
};

export const TeachingPhilosophy = () => {
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

  const pillars = [
    {
      icon: <Lightbulb />,
      title: "Conceptual First",
      desc: "We don't teach shortcuts; we build concepts so strong that shortcuts become intuitive.",
      themeColor: "rgba(99, 102, 241, 0.12)", 
      laserColor: "rgba(99, 102, 241, 0.4)", 
      sparkColor: "bg-indigo-500",
      badgeCode: "[PIL_CONC]"
    },
    {
      icon: <Target />,
      title: "Active Learning",
      desc: "Our sessions are 30% lecture and 70% active problem solving and interaction.",
      themeColor: "rgba(16, 185, 129, 0.12)", 
      laserColor: "rgba(16, 185, 129, 0.4)", 
      sparkColor: "bg-emerald-500",
      badgeCode: "[PIL_ACTIVE]"
    },
    {
      icon: <TrendingUp />,
      title: "Data-Driven Feedback",
      desc: "Faculty analyzes every student's performance data to provide targeted improvement paths.",
      themeColor: "rgba(59, 130, 246, 0.12)", 
      laserColor: "rgba(59, 130, 246, 0.4)", 
      sparkColor: "bg-blue-500",
      badgeCode: "[PIL_DATA]"
    },
    {
      icon: <Users />,
      title: "Personal Mentorship",
      desc: "Beyond academic teaching, we provide psychological and emotional support for high-stakes exams.",
      themeColor: "rgba(245, 158, 11, 0.12)", 
      laserColor: "rgba(245, 158, 11, 0.4)", 
      sparkColor: "bg-amber-500",
      badgeCode: "[PIL_MENT]"
    }
  ];

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
      <svg className="absolute inset-0 w-full h-full stroke-slate-200/30 stroke-1 fill-none pointer-events-none">
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
      className="pt-12 pb-24 bg-[#FAF9F6] text-primary relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Gravity mesh coordinate canvas warp grid */}
      {renderWarpGrid()}

      {/* Dotted blueprint overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic spotlights nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Guidelines layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title with cinematic staggered clip-mask details */}
        <div className="text-center mb-12 relative select-none">
          <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none">
            Our Teaching{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
              Philosophy.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            The values that drive academic transformation.
          </p>
        </div>

        {/* Pillars cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {pillars.map((pillar, i) => (
            <PillarItemCard
              key={i}
              pillar={pillar}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Bottom Cyber Bezel Quote Console */}
        <CyberQuotesConsole 
          ethosText="Our goal is not just to get a student into an IIT or AIIMS, but to instill a lifelong passion for learning and scientific enquiry."
        />

      </div>
    </section>
  );
};
