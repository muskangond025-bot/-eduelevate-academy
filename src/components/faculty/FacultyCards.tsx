import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Star } from 'lucide-react';

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

const HolographicBadge = ({ exp, cardCoords }: { exp: string; cardCoords: { x: number; y: number } }) => {
  return (
    <div
      className="absolute top-8 right-8 z-20 px-4 py-2 text-primary font-black text-[9px] uppercase tracking-widest rounded-full shadow-lg overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        transform: "translateZ(30px)"
      }}
    >
      {/* Sheen Reflection */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          background: `radial-gradient(40px circle at ${cardCoords.x % 100}px ${cardCoords.y % 40}px, rgba(255,255,255,0.85), transparent 80%)`
        }}
      />
      <span className="relative z-10">{exp}</span>
    </div>
  );
};

const FacultyItemCard = ({
  faculty,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  faculty: { name: string; subject: string; qual: string; exp: string; img: string; philosophy: string };
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
      className={`p-3 pb-8 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card bg-white/40 shadow-sm border-slate-200/50 ${
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
      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

      {/* Holographic Experience Badge */}
      <HolographicBadge exp={faculty.exp} cardCoords={coords} />

      <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
        
        {/* Portrait Image Container */}
        <div className="aspect-[4/5] rounded-[3.2rem] overflow-hidden relative mb-8 border border-slate-100/50">
          <img 
            src={faculty.img} 
            alt={faculty.name} 
            className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700 group-hover/card:scale-105" 
          />
          
          {/* Philosophy Slide-up drawer */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/95 via-indigo-950/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 select-none">
            <span className="font-mono text-[7px] text-cyan-400 uppercase tracking-widest mb-2 block">[TEACHING_PHILOSOPHY]</span>
            <p className="text-white text-xs font-semibold italic leading-relaxed">
              "{faculty.philosophy}"
            </p>
          </div>
        </div>

        {/* Faculty Details */}
        <div className="px-8 select-none">
          <div className="text-[10px] font-black text-indigo-600 tracking-[0.2em] uppercase mb-2">
            {faculty.subject}
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4 group-hover/card:text-indigo-950 transition-colors uppercase leading-none">
            {faculty.name}
          </h3>

          <div className="flex flex-col gap-3 font-semibold text-slate-500 text-xs border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3">
              <GraduationCap size={16} className="text-indigo-600/50" />
              <span>{faculty.qual}</span>
            </div>
            <div className="flex items-center gap-3">
              <Award size={16} className="text-indigo-600/50" />
              <span>Former HOD of Top Institutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
    </motion.div>
  );
};

export const FacultyCards = () => {
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

  const facultyList = [
    {
      name: "Dr. Vikram Sethi",
      subject: "Advanced Physics",
      qual: "PhD Mechanical (ex-IIT)",
      exp: "15+ Years",
      img: "https://i.pravatar.cc/400?u=v1",
      philosophy: "Visualizing forces before solving equations is the key."
    },
    {
      name: "Prof. Sarah Ferguson",
      subject: "Biological Sciences",
      qual: "MSc. Biotech (Gold Medalist)",
      exp: "12+ Years",
      img: "https://i.pravatar.cc/400?u=v2",
      philosophy: "Biology is logic hidden in complexity."
    },
    {
      name: "Dr. Amit Deshpande",
      subject: "Physical Chemistry",
      qual: "PhD Chemistry (CSIR-NET)",
      exp: "18+ Years",
      img: "https://i.pravatar.cc/400?u=v3",
      philosophy: "Equations are just stories of atomic balance."
    },
    {
      name: "Prof. Neeraj Gupta",
      subject: "Mathematics",
      qual: "M.Tech (IIT Kanpur)",
      exp: "10+ Years",
      img: "https://i.pravatar.cc/400?u=v4",
      philosophy: "Calculus is the language of change."
    },
    {
      name: "Dr. Kavita Rao",
      subject: "Organic Chemistry",
      qual: "PhD Organic Chem",
      exp: "14+ Years",
      img: "https://i.pravatar.cc/400?u=v5",
      philosophy: "Mechanism is the map to product discovery."
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
            Elite Core{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
              Faculty.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Mentors who lead from the front.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {facultyList.map((faculty, i) => (
            <FacultyItemCard
              key={i}
              faculty={faculty}
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
