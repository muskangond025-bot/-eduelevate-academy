import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ExternalLink, Download, Star, Cpu } from 'lucide-react';

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
  onClick,
  className,
  isSecondary = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isSecondary?: boolean;
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

    setPosition({
      x: (x - centerX) * 0.25,
      y: (y - centerY) * 0.25
    });
    setBtnCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className={`flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 ${className} ${
        isSecondary
          ? 'bg-indigo-600 text-white border border-indigo-500 shadow-md hover:bg-indigo-700 shadow-indigo-500/10'
          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {/* Laser cursor sweep inside button */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isSecondary
            ? `radial-gradient(60px circle at ${btnCoords.x}px ${btnCoords.y}px, rgba(255,255,255,0.25), transparent 80%)`
            : `radial-gradient(60px circle at ${btnCoords.x}px ${btnCoords.y}px, rgba(99,102,241,0.08), transparent 80%)`
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

const ScorecardItem = ({
  card,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  card: { name: string; id: string; student: string; sparkColor: string; laserColor: string; themeColor: string; tag: string };
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
      <style>{`
        @keyframes doc-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-doc-orbit {
          animation: doc-orbit 10s linear infinite;
        }
      `}</style>

      {/* Local Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${card.themeColor}, transparent 80%)`,
        }}
      />

      {/* Razor-Thin Neon Border Laser Sweep */}
      <div
        className="absolute inset-0 rounded-[3.2rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${card.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Coordinate Spark Particles */}
      <SparkParticlesTrail coords={coords} colorClass={card.sparkColor} />

      <div className="relative z-10 flex flex-col justify-between" style={{ transform: "translateZ(25px)" }}>
        
        {/* Document HUD Badge & Barcode Header */}
        <div className="flex items-start justify-between mb-8 select-none">
          <div className="relative">
            <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-2xl pointer-events-none opacity-60 animate-doc-orbit group-hover/card:border-indigo-500/20" />
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-100/50 group-hover/card:scale-105 group-hover/card:bg-indigo-600 group-hover/card:text-white transition-all duration-300 shrink-0">
              <FileText size={24} className={isSelfHovered ? 'animate-pulse' : ''} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-mono text-[7px] font-black text-slate-400 bg-slate-100/60 px-2 py-1 rounded border border-slate-200/40 mb-2">
              [DOC_ID: {card.id}]
            </div>
            {/* Custom Monospace Technical Barcode mockup */}
            <div className="font-mono text-[9px] text-slate-300 font-normal tracking-[1px] h-3">
              ||||||| | |||| |
            </div>
          </div>
        </div>

        {/* Scorecard Names & Metadata */}
        <div className="mb-8">
          <h3 className="text-xl font-black text-primary tracking-tight group-hover/card:text-indigo-950 transition-colors uppercase leading-none mb-2">
            {card.name}
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
            <span className="shrink-0">Verified Document:</span>
            <span className="text-indigo-950 font-black uppercase truncate">{card.student}</span>
          </div>
        </div>

        {/* Magnetic Action Buttons */}
        <div className="flex gap-4 relative z-20">
          <MagneticActionButton>
            <ExternalLink size={12} className="shrink-0" /> View
          </MagneticActionButton>
          <MagneticActionButton isSecondary>
            <Download size={12} className="shrink-0 animate-bounce" style={{ animationDuration: '2.5s' }} /> Download
          </MagneticActionButton>
        </div>
      </div>

      {/* Tech corner brackets */}
      <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/card:border-indigo-400/30 transition-colors" />
    </motion.div>
  );
};

export const Scorecards = () => {
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

  const cards = [
    { name: "JEE Adv 2024", id: "S-10023", student: "Rohan Sharma", tag: "JEE", themeColor: "rgba(99, 102, 241, 0.12)", laserColor: "rgba(99, 102, 241, 0.4)", sparkColor: "bg-indigo-500" },
    { name: "NEET UG 2024", id: "S-10045", student: "Ananya Gupta", tag: "NEET", themeColor: "rgba(16, 185, 129, 0.12)", laserColor: "rgba(16, 185, 129, 0.4)", sparkColor: "bg-emerald-500" },
    { name: "MHT-CET 2024", id: "S-10088", student: "Siddharth Roy", tag: "CET", themeColor: "rgba(59, 130, 246, 0.12)", laserColor: "rgba(59, 130, 246, 0.4)", sparkColor: "bg-blue-500" },
    { name: "Board Class 10", id: "S-10012", student: "Aryan K.", tag: "BOARD", themeColor: "rgba(245, 158, 11, 0.12)", laserColor: "rgba(245, 158, 11, 0.4)", sparkColor: "bg-amber-500" },
    { name: "KVPY Fellow", id: "S-10005", student: "Meera J.", tag: "KVPY", themeColor: "rgba(139, 92, 246, 0.12)", laserColor: "rgba(139, 92, 246, 0.4)", sparkColor: "bg-violet-500" },
    { name: "NDA Written", id: "S-10099", student: "Megha Singh", tag: "NDA", themeColor: "rgba(239, 68, 68, 0.12)", laserColor: "rgba(239, 68, 68, 0.4)", sparkColor: "bg-rose-500" }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
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
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
          >
            <Star size={11} className="text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Digital Verification</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none">
            Official{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
              Scorecards.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            Transparency is our core value. View verified results from the various boards.
          </p>
        </div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <ScorecardItem
              key={i}
              card={card}
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
