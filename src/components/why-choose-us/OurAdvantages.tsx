import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Users, GraduationCap, LineChart, UserCheck } from 'lucide-react';

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

const AdvantageCard = ({
  adv,
  index,
  hoveredIndex,
  setHoveredIndex,
  themeConfig
}: {
  adv: any;
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
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex items-start gap-8 group/card bg-white/70 border-slate-200/50 ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] bg-white ${themeConfig.cardBorderColor}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Laser border highlight trailing mouse */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${themeConfig.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={themeConfig.sparkClass} />

      {/* Rotating Concentric HUD Icon Orbits */}
      <div className="relative w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none group-hover/card:border-slate-350" style={{ animationDuration: '8s' }} />
        {React.cloneElement(adv.icon, { size: 24, className: `relative z-10 ${themeConfig.iconColor}` })}
      </div>

      <div className="relative z-10 flex-grow" style={{ transform: "translateZ(15px)" }}>
        {/* Monospaced badge code */}
        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[7px] text-slate-400 select-none">
          <span className="text-slate-500 font-bold uppercase">THE PREFERRED CHOICE</span>
          <span>[{themeConfig.badgeCode}]</span>
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight group-hover/card:text-indigo-650 transition-colors uppercase leading-none">
          {adv.title}
        </h3>
        
        <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base italic-small">
          {adv.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const OurAdvantages = () => {
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

  const advantages = [
    {
      icon: <Users />,
      title: "Small Batches",
      desc: "Limited student intake ensures every voice is heard and no doubt goes unaddressed."
    },
    {
      icon: <UserCheck />,
      title: "Personal Mentoring",
      desc: "One-on-one sessions with mentors to discuss individual growth maps and strategy."
    },
    {
      icon: <LineChart />,
      title: "Performance Tracking",
      desc: "AI-driven analytics to identify micro-weaknesses in periodic testing cycles."
    },
    {
      icon: <GraduationCap />,
      title: "Experienced Faculty",
      desc: "Mentorship from industry veterans and alumni of India's top design and tech institutes."
    }
  ];

  const themeMap: Record<number, { sparkClass: string; laserColor: string; badgeCode: string; iconColor: string; cardBorderColor: string }> = {
    0: {
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "ADV_01 // BATCH_INTAKE",
      iconColor: "text-indigo-600",
      cardBorderColor: "group-hover/card:border-indigo-500/20"
    },
    1: {
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "ADV_02 // MENTOR_SYNC",
      iconColor: "text-emerald-600",
      cardBorderColor: "group-hover/card:border-emerald-500/20"
    },
    2: {
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "ADV_03 // ANALYTICS",
      iconColor: "text-violet-650",
      cardBorderColor: "group-hover/card:border-violet-500/20"
    },
    3: {
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "ADV_04 // FACULTY_ALUMNI",
      iconColor: "text-amber-650",
      cardBorderColor: "group-hover/card:border-amber-500/20"
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pb-32 bg-[#FAF9F6] text-slate-800 relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae */}
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

      {/* Layout guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {advantages.map((adv, i) => (
            <AdvantageCard
              key={i}
              adv={adv}
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
