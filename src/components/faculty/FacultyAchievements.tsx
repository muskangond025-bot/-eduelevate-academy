import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Star, Trophy } from 'lucide-react';

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

const AchievementCardItem = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: { icon: React.ReactNode; title: string; desc: string; sparkColor: string; laserColor: string; themeColor: string; badgeCode: string };
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
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/40 shadow-sm border-slate-200/50 ${
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
        @keyframes ach-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-ach-orbit {
          animation: ach-orbit 10s linear infinite;
        }
      `}</style>

      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${item.themeColor}, transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass={item.sparkColor} />

      <div className="relative z-10 text-center flex flex-col justify-between h-full" style={{ transform: "translateZ(25px)" }}>
        
        {/* HUD Icon Orbit Circle */}
        <div className="relative w-16 h-16 mx-auto mb-8 flex items-center justify-center select-none">
          <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-2xl pointer-events-none opacity-60 animate-ach-orbit group-hover/card:border-indigo-500/20" />
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-650 shadow-sm border border-slate-100/50 group-hover/card:scale-105 group-hover/card:bg-indigo-600 group-hover/card:text-white transition-all duration-300 shrink-0">
            {React.cloneElement(item.icon as React.ReactElement, { 
              size: 24,
              className: `transition-transform duration-500 ${
                isSelfHovered 
                  ? index === 0
                    ? 'scale-110 rotate-12 animate-pulse'
                    : index === 1
                      ? 'translate-y-[-2px] scale-105'
                      : index === 2
                        ? 'rotate-180 duration-1000'
                        : 'scale-110 animate-bounce'
                  : ''
              }`
            })}
          </div>
        </div>

        {/* Statistic Title & Details */}
        <div className="mb-2">
          <div className="flex items-center justify-center gap-2 mb-3 font-mono text-[7px] text-slate-400 select-none">
            <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200/40 uppercase font-black">{item.badgeCode}</span>
            <span>★</span>
            <span className="text-indigo-650 font-bold">SECURE_RECORD</span>
          </div>
          <h4 className="text-xl font-black text-slate-800 tracking-tight mb-4 group-hover/card:text-indigo-950 transition-colors uppercase leading-tight select-none">
            {item.title}
          </h4>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed px-1">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
    </motion.div>
  );
};

export const FacultyAchievements = () => {
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

  const achievements = [
    { 
      icon: <Award />, 
      title: "Best Teacher Award 2023", 
      desc: "Awarded by the National Education Society for innovative teaching in Physics.",
      themeColor: "rgba(99, 102, 241, 0.12)", 
      laserColor: "rgba(99, 102, 241, 0.4)", 
      sparkColor: "bg-indigo-500",
      badgeCode: "[AWARD_2023]"
    },
    { 
      icon: <BookOpen />, 
      title: "Published Research", 
      desc: "Our faculty has published over 50+ research papers in International Science Journals.",
      themeColor: "rgba(16, 185, 129, 0.12)", 
      laserColor: "rgba(16, 185, 129, 0.4)", 
      sparkColor: "bg-emerald-500",
      badgeCode: "[RES_PAPERS]"
    },
    { 
      icon: <Star />, 
      title: "Author of Bestsellers", 
      desc: "3 of our lead mentors are authors of widely used national level preparation books.",
      themeColor: "rgba(245, 158, 11, 0.12)", 
      laserColor: "rgba(245, 158, 11, 0.4)", 
      sparkColor: "bg-amber-500",
      badgeCode: "[BOOKS_AUTH]"
    },
    { 
      icon: <Trophy />, 
      title: "AIR 1 Production", 
      desc: "Our mentors have collectively produced more than 10 AIR 1 rankers in JEE & NEET.",
      themeColor: "rgba(239, 68, 68, 0.12)", 
      laserColor: "rgba(239, 68, 68, 0.4)", 
      sparkColor: "bg-rose-500",
      badgeCode: "[AIR_1_PROD]"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-24 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Light Dotted Matrix coordinates Canvas Backdrop */}
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
            Faculty{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
              Achievements.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Honored with prestigious awards, research publications, and rank-producing credentials.
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, i) => (
            <AchievementCardItem
              key={i}
              item={item}
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
