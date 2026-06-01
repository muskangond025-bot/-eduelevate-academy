import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Medal, Crown, Star, Shield } from 'lucide-react';

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

const HonorCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: any;
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
    indigo: "group-hover/card:border-indigo-500/20 text-indigo-400",
    emerald: "group-hover/card:border-emerald-500/20 text-emerald-400",
    violet: "group-hover/card:border-violet-500/20 text-violet-400",
    amber: "group-hover/card:border-amber-500/20 text-amber-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 180, scale: 0.85 }}
      whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 55, 
        damping: 14, 
        delay: index * 0.15 
      }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col items-center text-center bg-white/5 border-white/10 h-full ${
          isSelfHovered
            ? 'scale-[1.02] shadow-[0_0_50px_rgba(99,102,241,0.15)] border-indigo-500/30 bg-white/10'
            : isDimmed
              ? 'opacity-45 scale-[0.985] blur-[0.5px] border-white/5'
              : 'shadow-2xl'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Border laser sweep trailing cursor */}
        <div
          className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
          style={{
            background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
            padding: '1.2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Sparks trail */}
        <SparkParticlesTrail coords={coords} colorClass={item.sparkClass} />

        {/* Rotating Concentric HUD Icon Orbits */}
        <div className="relative w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover/card:scale-110 transition-transform z-10 shrink-0" style={{ transform: "translateZ(25px)" }}>
          <div className="absolute inset-[-6px] border border-dashed border-white/10 rounded-full animate-spin pointer-events-none group-hover/card:border-white/30" style={{ animationDuration: '8s' }} />
          {React.cloneElement(item.icon as React.ReactElement, { size: 36, className: `relative z-10 ${colorMap[item.themeColor].split(' ')[1]}` })}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight" style={{ transform: "translateZ(20px)" }}>
          {item.title}
        </h3>
        
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2" style={{ transform: "translateZ(10px)" }}>
          {item.org}
        </div>


      </motion.div>
    </motion.div>
  );
};

export const AchievementsMilestones = () => {
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
      title: "Best Coaching Brand 2024", 
      org: "Education Excellence Awards", 
      icon: <Award />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "HON_01 // CO_BRAND"
    },
    { 
      title: "100% Scholarship Support", 
      org: "For Underprivileged Toppers", 
      icon: <Medal />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "HON_02 // SCHOL_SUPPORT"
    },
    { 
      title: "Highest Selection Ratio", 
      org: "State Level Records", 
      icon: <Crown />,
      themeColor: "violet",
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "HON_03 // SEL_RATIO"
    },
    { 
      title: "Digital Innovation Leader", 
      org: "EdTech Summit Mumbai", 
      icon: <Star />,
      themeColor: "amber",
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "HON_04 // TECH_INNOV"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Deep Space Coordinates Grid Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic spotlight nebulae */}
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
        <div className="text-center mb-24 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-md"
          >
            <Shield size={11} className="text-indigo-400 animate-pulse" />
            <span>Hall of Honours</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase leading-none">
            Our Hall of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
              Honours.
            </span>
          </h2>
          <p className="text-slate-400 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Awards are a secondary outcome; our primary reward is the success of our students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, i) => (
            <HonorCard
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
