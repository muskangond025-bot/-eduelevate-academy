import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Stethoscope, GraduationCap, ArrowRight, Activity, Cpu, Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const CourseMiniWidget = ({ stream }: { stream: string }) => {
  if (stream === "jee") {
    // Bohr Orbit model
    return (
      <div className="relative w-14 h-14 rounded-2xl bg-indigo-50/80 flex items-center justify-center shadow-sm shrink-0">
        <div className="absolute inset-[-4px] border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-8 h-8 rounded-full border border-indigo-500/20"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </motion.div>
        <BookOpen size={20} className="text-indigo-650 relative z-10" />
      </div>
    );
  } else if (stream === "neet") {
    // heartbeat monitor
    return (
      <div className="relative w-14 h-14 rounded-2xl bg-rose-50/80 flex items-center justify-center shadow-sm shrink-0">
        <div className="absolute inset-[-4px] border border-dotted border-rose-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
        <svg className="absolute inset-2 w-10 h-10 text-rose-300/40" viewBox="0 0 40 40">
          <motion.path
            d="M 5 20 L 15 20 L 18 10 L 22 30 L 25 17 L 27 23 L 30 20 L 35 20"
            fill="none"
            stroke="rgba(244, 63, 94, 0.4)"
            strokeWidth="1.5"
            animate={{
              pathLength: [0, 1],
              pathOffset: [0, 1]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          />
        </svg>
        <Stethoscope size={20} className="text-rose-650 relative z-10" />
      </div>
    );
  } else {
    // compass orbits
    return (
      <div className="relative w-14 h-14 rounded-2xl bg-amber-50/80 flex items-center justify-center shadow-sm shrink-0">
        <div className="absolute inset-[-4px] border border-dashed border-amber-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0.5 border border-dashed border-amber-500/10 rounded-xl" />
        <GraduationCap size={20} className="text-amber-650 relative z-10" />
      </div>
    );
  }
};

const LocalCourseCard = ({
  course,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  course: any;
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
      className={`p-12 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between ${
        isSelfHovered
          ? 'scale-[1.02] bg-white border-indigo-500/30 shadow-[0_20px_50px_rgba(99,102,241,0.06)]'
          : isDimmed
            ? 'opacity-45 scale-[0.98] blur-[0.5px] border-slate-200/20 bg-white/20'
            : 'bg-white/40 border-slate-200/50 shadow-md'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep highlight trailing cursor inside card */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${course.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks Trail */}
      <SparkParticlesTrail coords={coords} colorClass={course.sparkClass} />

      <div className="flex flex-col">
        {/* Animated Custom SVG visualizer mini widget */}
        <div className="mb-8" style={{ transform: "translateZ(25px)" }}>
          <CourseMiniWidget stream={course.stream} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight" style={{ transform: "translateZ(20px)" }}>
          {course.title}
        </h3>

        {/* Description paragraph */}
        <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-10" style={{ transform: "translateZ(10px)" }}>
          {course.desc}
        </p>
      </div>

      {/* Explore Batch Action link */}
      <Link 
        to={course.to} 
        className="flex items-center gap-3 text-[10px] font-black text-indigo-650 uppercase tracking-widest group-hover:translate-x-2 transition-transform w-fit"
        style={{ transform: "translateZ(15px)" }}
      >
        <span>Explore Batch</span>
        <ArrowRight size={14} className="text-indigo-600 shrink-0" />
      </Link>
    </motion.div>
  );
};

export const LocalCourses = () => {
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

  const localCourses = [
    { 
      title: "JEE Powerhouse", 
      desc: "Intensive 2-year program for JEE Advanced aspirants in Kothrud.",
      stream: "jee",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "BATCH_01 // JEE_ADV",
      to: "/courses"
    },
    { 
      title: "NEET Elite", 
      desc: "Specialized medical preparation with dedicated doubt-solving labs.",
      stream: "neet",
      sparkClass: "bg-rose-500",
      laserColor: "rgba(244, 63, 94, 0.4)",
      badgeCode: "BATCH_02 // NEET_PREP",
      to: "/courses"
    },
    { 
      title: "Foundation Hub", 
      desc: "Nurturing 8th-10th grade students for strong academic basics.",
      stream: "foundation",
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "BATCH_03 // FOUNDATION_ACAD",
      to: "/courses"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
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

      {/* Layout lines guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section reveal */}
        <div className="text-center mb-20 select-none">
          

          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none">
            Programs <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic">Available.</span>
          </h2>
        </div>

        {/* 3-column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localCourses.map((course, i) => (
            <LocalCourseCard
              key={i}
              course={course}
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
