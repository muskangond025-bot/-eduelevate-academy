import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

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

const WrittenReviewCard = ({
  rev,
  index,
  hoveredIndex,
  setHoveredIndex,
  themeConfig
}: {
  rev: any;
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
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md group/card bg-white/75 border-slate-200/50 ${
        isSelfHovered
          ? `scale-[1.02] -translate-y-1.5 shadow-[0_20px_50px_rgba(99,102,241,0.08)] ${themeConfig.cardBorderColor}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
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

      {/* Trailing sparks */}
      <SparkParticlesTrail coords={coords} colorClass={themeConfig.sparkClass} />

      {/* Decorative Quote mark in card background */}
      <Quote
        className={`absolute bottom-6 right-8 opacity-5 text-slate-350 w-24 h-24 pointer-events-none transition-all duration-700 select-none ${themeConfig.iconColor}`}
        style={{
          transform: isSelfHovered ? 'scale(1.15) rotate(15deg) translateZ(10px)' : 'scale(1) rotate(0deg)',
          opacity: isSelfHovered ? 0.08 : 0.03
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full" style={{ transform: "translateZ(20px)" }}>
        <div>
          {/* Top Star ratings with spring animation hover triggers */}
          <div className="flex gap-1 mb-6 text-amber-500">
            {[...Array(rev.rating)].map((_, j) => (
              <motion.div
                key={j}
                whileHover={{ scale: 1.25, rotate: 12 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Star size={12} fill="currentColor" className="cursor-pointer" />
              </motion.div>
            ))}
          </div>

          <p className="text-slate-600 font-semibold leading-relaxed mb-8 italic-small text-sm md:text-base">
            "{rev.text}"
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
          <div>
            <div className="font-black text-slate-700 uppercase tracking-tight text-sm leading-none mb-2">
              {rev.name}
            </div>
            <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-[8px] font-black text-slate-500 uppercase tracking-wider">
              {rev.course}
            </div>
          </div>

          {/* Monospaced Review ID */}
          <span className="font-mono text-[7px] text-slate-400 select-none hidden sm:inline">
            [{themeConfig.badgeCode}]
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const StudentWrittenReviews = () => {
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

  const reviews = [
    { name: "Sanya K.", course: "JEE Advanced", text: "The doubt-clearing sessions were a lifesaver. I never felt lost even when the concepts got intense.", rating: 5 },
    { name: "Meera J.", course: "Olympiad Prep", text: "Learning non-routine math was fun! It really helped me think outside the box for my school exams too.", rating: 5 },
    { name: "Karan L.", course: "NEET Elite", text: "The NCERT-sync modules are perfectly designed. No extra jargon, just high-yield points for NEET.", rating: 5 },
    { name: "Isha P.", course: "Foundation", text: "The mentors are so supportive. They really know how to balance boards and competitive prep.", rating: 5 },
    { name: "Vikram S.", course: "12th Boards", text: "Best decision for my boards. The focused test series improved my writing speed and accuracy significantly.", rating: 5 },
    { name: "Tanvi M.", course: "MHT-CET", text: "The shortcut techniques for CET Math were exactly what I needed to finish the paper on time.", rating: 5 }
  ];

  const themeMap: Record<string, { sparkClass: string; laserColor: string; badgeCode: string; iconColor: string; cardBorderColor: string }> = {
    "JEE Advanced": {
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "WR_01 // JEE_ADV",
      iconColor: "text-indigo-500",
      cardBorderColor: "group-hover/card:border-indigo-500/20"
    },
    "Olympiad Prep": {
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "WR_02 // OLYMPIAD",
      iconColor: "text-violet-500",
      cardBorderColor: "group-hover/card:border-violet-500/20"
    },
    "NEET Elite": {
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "WR_03 // NEET_ELITE",
      iconColor: "text-emerald-500",
      cardBorderColor: "group-hover/card:border-emerald-500/20"
    },
    "Foundation": {
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "WR_04 // FOUNDATION",
      iconColor: "text-amber-500",
      cardBorderColor: "group-hover/card:border-amber-500/20"
    },
    "12th Boards": {
      sparkClass: "bg-rose-500",
      laserColor: "rgba(244, 63, 94, 0.4)",
      badgeCode: "WR_05 // BOARDS",
      iconColor: "text-rose-500",
      cardBorderColor: "group-hover/card:border-rose-500/20"
    },
    "MHT-CET": {
      sparkClass: "bg-cyan-500",
      laserColor: "rgba(6, 182, 212, 0.4)",
      badgeCode: "WR_06 // MHT_CET",
      iconColor: "text-cyan-500",
      cardBorderColor: "group-hover/card:border-cyan-500/20"
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] text-slate-800 relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* HSL spotlight cursor glow */}
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

      {/* Guidelines layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((rev, i) => (
            <WrittenReviewCard
              key={i}
              rev={rev}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              themeConfig={themeMap[rev.course] || themeMap["JEE Advanced"]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
