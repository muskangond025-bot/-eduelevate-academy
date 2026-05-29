import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Star, Cpu, Sparkles, Trophy } from 'lucide-react';
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

const MagneticActionButton = ({
  children,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)"
}: {
  children: React.ReactNode;
  className?: string;
  laserColor?: string;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setBtnCoords({ x, y });
    setPosition({
      x: (x - centerX) * 0.15,
      y: (y - centerY) * 0.15
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3" style={{ transform: "translateZ(10px)" }}>
        {children}
      </span>
    </motion.button>
  );
};

const LocalResultCard = ({
  result,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  result: any;
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
      className={`p-8 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between ${
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
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${result.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks Trail */}
      <SparkParticlesTrail coords={coords} colorClass={result.sparkClass} />

      {/* Floating trophy indicator badge */}
      <div className="absolute top-8 right-8 text-indigo-500/10 group-hover:text-indigo-500/35 transition-colors z-0" style={{ transform: "translateZ(10px)" }}>
        <Trophy size={48} />
      </div>

      <div className="flex flex-col relative z-10">
        
        {/* Avatar & Info details */}
        <div className="flex items-center gap-6 mb-8" style={{ transform: "translateZ(25px)" }}>
          {/* Avatar frame with spinning concentric orbits and monochrome transition */}
          <div className="relative w-20 h-20 shrink-0">
            <div className="absolute inset-[-4px] border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-[-8px] border border-dotted border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
            <img 
              src={result.img} 
              alt={result.name} 
              className="w-full h-full rounded-full border-4 border-white shadow-lg filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 object-cover" 
            />
          </div>

          <div>
            <h4 className="text-xl font-black text-slate-800 tracking-tight">{result.name}</h4>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{result.school}</span>
          </div>
        </div>

        {/* Scorecard Bezel Panel */}
        <div className="p-6 bg-slate-50/70 border border-slate-100 rounded-3xl relative overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          {/* Inner laser glow sweep inside scorecard block */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="text-3xl font-black text-slate-800 mb-1 leading-none">
            {result.rank}
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-650 font-mono mt-2">
            <span>{result.exam}</span>
            <div className="flex text-indigo-500 gap-0.5">
              <Star size={9} fill="currentColor" />
              <Star size={9} fill="currentColor" />
              <Star size={9} fill="currentColor" />
            </div>
          </div>
        </div>

      </div>

      {/* Monospaced technical indicators */}
      <span className="absolute bottom-4 right-6 font-mono text-[5px] text-slate-400 select-none pointer-events-none">
        [{result.badgeCode}]
      </span>
    </motion.div>
  );
};

export const LocalResults = () => {
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

  const localResults = [
    { 
      name: "Rahul Deshmukh", 
      rank: "AIR 142", 
      exam: "JEE ADV 2024", 
      school: "Loyola School", 
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "TOPPER_01 // JEE"
    },
    { 
      name: "Sneha Patil", 
      rank: "AIR 256", 
      exam: "NEET 2024", 
      school: "Fergusson College", 
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      sparkClass: "bg-rose-500",
      laserColor: "rgba(244, 63, 94, 0.4)",
      badgeCode: "TOPPER_02 // NEET"
    },
    { 
      name: "Amit Kulkarni", 
      rank: "AIR 88", 
      exam: "MHT-CET 2024", 
      school: "Abhinava Vidyalaya", 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "TOPPER_03 // CET"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/50"
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
        
        {/* Header entrance reveal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 select-none">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2.5 rounded-full text-indigo-650 font-black text-[10px] uppercase tracking-widest mb-6 shadow-sm animate-pulse"
            >
              <Cpu size={10} className="text-indigo-650" />
              <span>Diagnostic Victories</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-4">
              Kothrud <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic">Pride.</span>
            </h2>
            <p className="text-slate-500 font-semibold leading-relaxed text-sm max-w-md">
              Top rankers from our local branch who made it to the Top 1%.
            </p>
          </div>

          {/* Magnetic primary CTA Button */}
          <Link to="/results">
            <MagneticActionButton
              className="px-10 py-5 bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 text-white font-black hover:scale-[1.03] shadow-xl"
              laserColor="rgba(255, 255, 255, 0.45)"
            >
              <span>View All Results</span>
              <Sparkles size={12} className="text-white shrink-0" />
            </MagneticActionButton>
          </Link>
        </div>

        {/* 3-column Grid Cards with cooperative dimming */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {localResults.map((result, i) => (
            <LocalResultCard
              key={i}
              result={result}
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
