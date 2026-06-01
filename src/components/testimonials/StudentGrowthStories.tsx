import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Shield } from 'lucide-react';

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

const GrowthStoryCard = ({
  story,
  index,
  hoveredIndex,
  setHoveredIndex,
  themeConfig
}: {
  story: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  themeConfig: {
    sparkClass: string;
    laserColor: string;
    badgeCode: string;
    cardBorderColor: string;
    iconBg: string;
    iconText: string;
    afterTextColor: string;
  };
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
      className={`p-12 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col md:flex-row gap-10 items-center bg-white/70 border-slate-200/50 ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_25px_50px_rgba(99,102,241,0.08)] ${themeConfig.cardBorderColor}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Laser Border Highlight */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${themeConfig.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={themeConfig.sparkClass} />

      {/* Left side: Avatar inside Concentric Orbits */}
      <div className="relative shrink-0 select-none" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-10px] border border-dashed border-slate-200 rounded-[4rem] pointer-events-none opacity-60 animate-spin group-hover/card:border-indigo-500/30" style={{ animationDuration: '12s' }} />
        <div className="w-44 h-44 rounded-[3.5rem] overflow-hidden border border-slate-200/50 shadow-xl relative z-10 bg-slate-100">
          <img
            src={story.img}
            alt={story.name}
            className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 scale-100 group-hover/card:scale-105 transition-all duration-700 pointer-events-none"
          />
        </div>
        <div className={`absolute -bottom-2 -right-2 w-11 h-11 rounded-full flex items-center justify-center shadow-md z-20 ${themeConfig.iconBg} ${themeConfig.iconText}`}>
          <TrendingUp size={16} className="animate-pulse" />
        </div>
      </div>

      {/* Right side: Transformation details */}
      <div className="flex-grow w-full" style={{ transform: "translateZ(15px)" }}>
        {/* Path tag */}
        <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[8px] text-slate-400">
          <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-black text-slate-500 uppercase tracking-widest leading-none">
            {story.path}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {/* Point A console */}
          <div className="p-5 bg-slate-100/50 rounded-2xl border border-slate-200/30 relative overflow-hidden select-none">
            <div className="text-base font-black text-slate-500 line-through decoration-rose-500/60 decoration-2">
              {story.before}
            </div>
          </div>

          {/* Flow Direction Indicator */}
          <div className="flex justify-center md:justify-start items-center pl-6 select-none">
            <motion.div
              animate={isSelfHovered ? { x: [0, 6, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <ArrowRight className="text-slate-400 rotate-90 md:rotate-0 opacity-40" size={18} />
            </motion.div>
          </div>

          {/* Point B Cyber Bezel Dashboard */}
          <div className="p-6 bg-[#0c0f1d] border border-white/5 rounded-3xl text-white shadow-xl relative overflow-hidden">
            {/* Scanline laser */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.4)] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />

            <div className={`text-2xl font-black tracking-tight ${themeConfig.afterTextColor}`}>
              {story.after}
            </div>
          </div>
        </div>

        <h4 className="mt-6 text-xl font-black text-slate-700 tracking-tight uppercase leading-none">
          Meet {story.name}
        </h4>
      </div>
    </motion.div>
  );
};

export const StudentGrowthStories = () => {
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

  const stories = [
    {
      name: "Siddharth R.",
      before: "Academic Avg: 72%",
      after: "MHT-CET: 99.98 %tile",
      path: "Standard to State Merit",
      img: "https://i.pravatar.cc/300?u=s1"
    },
    {
      name: "Kabir M.",
      before: "Physics Fear: High",
      after: "JEE Physics: 110/120",
      path: "Concept Clarity Boost",
      img: "https://i.pravatar.cc/300?u=k1"
    }
  ];

  const themeMap: Record<number, { sparkClass: string; laserColor: string; badgeCode: string; cardBorderColor: string; iconBg: string; iconText: string; afterTextColor: string }> = {
    0: {
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "TR_01 // SECURE",
      cardBorderColor: "group-hover/card:border-indigo-500/20",
      iconBg: "bg-indigo-600",
      iconText: "text-white",
      afterTextColor: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300"
    },
    1: {
      sparkClass: "bg-rose-500",
      laserColor: "rgba(244, 63, 94, 0.4)",
      badgeCode: "TR_02 // SECURE",
      cardBorderColor: "group-hover/card:border-rose-500/20",
      iconBg: "bg-rose-600",
      iconText: "text-white",
      afterTextColor: "text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300"
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-24 bg-[#FAF9F6] text-slate-800 relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL cursor tracking spotlights */}
      <div
        className="absolute pointer-events-none transition-opacity duration-75 blur-[120px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(250, 249, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Layout anchor lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title with premium badging console */}
        <div className="text-center mb-12 relative select-none">

          <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4 uppercase leading-none">
            Before &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black">
              After
            </span>{' '}
            Stories.
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Real evidence of conceptual and strategic transformation.
          </p>
        </div>

        {/* Two-column transformation cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {stories.map((story, i) => (
            <GrowthStoryCard
              key={i}
              story={story}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              themeConfig={themeMap[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
