import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Award, Shield } from 'lucide-react';

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

const RankerCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: {
    name: string;
    rank: string;
    exam: string;
    score: string;
    img: string;
    badge: string;
    themeColor: string;
    laserColor: string;
    sparkColor: string;
    pillBg: string;
  };
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
      className={`p-8 rounded-[3.2rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/40 shadow-sm border-slate-200/50 ${
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
      {/* CSS local animations for orbital frames */}
      <style>{`
        @keyframes avatar-orbit-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes avatar-orbit-ccw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-avatar-orbit-cw {
          animation: avatar-orbit-cw 12s linear infinite;
        }
        .animate-avatar-orbit-ccw {
          animation: avatar-orbit-ccw 16s linear infinite;
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
        className="absolute inset-0 rounded-[3.2rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <SparkParticlesTrail coords={coords} colorClass={item.sparkColor} />

      <div className="relative z-10 flex flex-col items-center justify-between" style={{ transform: "translateZ(25px)" }}>
        
        {/* Concentric Rotating profile HUD frames */}
        <div className="relative mb-8 mt-2 inline-block">
          <div
            className="absolute inset-[-14px] border border-dashed border-slate-200/80 rounded-full pointer-events-none opacity-60 animate-avatar-orbit-cw group-hover/card:border-indigo-400/40 transition-colors"
          />
          <div
            className="absolute inset-[-8px] border border-dashed border-slate-200 rounded-full pointer-events-none opacity-60 animate-avatar-orbit-ccw group-hover/card:border-indigo-500/20 transition-colors"
          />
          
          {/* Glowing colorful avatar halo */}
          <div
            className="absolute inset-[-4px] rounded-full blur-xl opacity-0 group-hover/card:opacity-80 transition-opacity duration-500 z-0"
            style={{ background: item.themeColor }}
          />

          <img
            src={item.img}
            alt={item.name}
            className="relative z-10 w-28 h-28 rounded-full border-4 border-white shadow-md mx-auto filter grayscale group-hover/card:grayscale-0 transition-all duration-500 select-none"
          />
        </div>

        {/* Ranks & Exams */}
        <div className="text-center mb-5">
          <div className="text-4xl font-black text-primary tracking-tighter leading-none mb-1.5 uppercase select-none">
            {item.rank}
          </div>
          <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase select-none font-mono">
            {item.exam}
          </div>
        </div>

        {/* Topper Name */}
        <div className="text-lg font-black text-indigo-950 mb-6 uppercase tracking-tight select-none leading-none">
          {item.name}
        </div>

        {/* Custom HSL pill stats bottom badge */}
        <div className={`py-3 px-8 text-white rounded-2xl inline-block font-black text-[11px] tracking-[0.2em] uppercase shadow-lg group-hover/card:scale-105 transition-all duration-300 select-none border border-white/10 ${item.pillBg}`}>
          {item.score}
        </div>
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
    </motion.div>
  );
};

export const RankHolders = () => {
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

  const topRankers = [
    {
      name: "Rohan S.",
      rank: "AIR 12",
      exam: "JEE ADV",
      score: "342/360",
      img: "https://i.pravatar.cc/300?u=a1",
      badge: "[JEE_12]",
      themeColor: "rgba(99, 102, 241, 0.12)",
      laserColor: "rgba(99, 102, 241, 0.4)",
      sparkColor: "bg-indigo-500",
      pillBg: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10"
    },
    {
      name: "Ananya G.",
      rank: "AIR 45",
      exam: "NEET",
      score: "715/720",
      img: "https://i.pravatar.cc/300?u=a2",
      badge: "[NEET_45]",
      themeColor: "rgba(16, 185, 129, 0.12)",
      laserColor: "rgba(16, 185, 129, 0.4)",
      sparkColor: "bg-emerald-500",
      pillBg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10"
    },
    {
      name: "Siddharth R.",
      rank: "AIR 88",
      exam: "MHT-CET",
      score: "99.98%tile",
      img: "https://i.pravatar.cc/300?u=a3",
      badge: "[CET_88]",
      themeColor: "rgba(59, 130, 246, 0.12)",
      laserColor: "rgba(59, 130, 246, 0.4)",
      sparkColor: "bg-blue-500",
      pillBg: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
    },
    {
      name: "Megha S.",
      rank: "AIR 102",
      exam: "NDA",
      score: "SSB Rec.",
      img: "https://i.pravatar.cc/300?u=a4",
      badge: "[NDA_102]",
      themeColor: "rgba(245, 158, 11, 0.12)",
      laserColor: "rgba(245, 158, 11, 0.4)",
      sparkColor: "bg-amber-500",
      pillBg: "bg-amber-600 hover:bg-amber-700 shadow-amber-500/10"
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
        <div className="text-center mb-12 relative">

          <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none">
            Top Rank{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
              Holders.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Honoring the dedication, grit, and triumph of our national toppers. They set the bar, year after year.
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topRankers.map((item, i) => (
            <RankerCard
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
