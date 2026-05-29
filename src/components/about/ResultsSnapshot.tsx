import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Trophy, Shield, ArrowRight } from 'lucide-react';

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
  laserColor = "rgba(255, 255, 255, 0.45)"
}: {
  children: React.ReactNode;
  onClick?: () => void;
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
      className={`px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-3 bg-indigo-650 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(50px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`
        }}
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
};

const StatRowItem = ({
  stat,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  stat: any;
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
    indigo: "text-indigo-400 border-indigo-500/20",
    emerald: "text-emerald-400 border-emerald-500/20",
    violet: "text-violet-400 border-violet-500/20"
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex items-center justify-between bg-white/5 border-white/10 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_0_50px_rgba(99,102,241,0.12)] border-indigo-500/30 bg-white/10'
          : isDimmed
            ? 'opacity-40 scale-[0.985] blur-[0.5px] border-white/5'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${stat.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={stat.sparkClass} />

      <div className="flex items-center gap-6" style={{ transform: "translateZ(20px)" }}>
        {/* Rotating Concentric HUD Icon Orbits */}
        <div className="relative w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform shrink-0" style={{ transform: "translateZ(25px)" }}>
          <div className="absolute inset-[-5px] border border-dashed border-white/10 rounded-2xl animate-spin pointer-events-none group-hover/card:border-white/30" style={{ animationDuration: '8s' }} />
          {React.cloneElement(stat.icon as React.ReactElement, { size: 24, className: `relative z-10 ${colorMap[stat.themeColor].split(' ')[0]}` })}
        </div>
        <div>
          <div className="text-lg font-bold text-slate-300">{stat.label}</div>
          <span className="font-mono text-[6px] text-slate-500 select-none mt-1 block">[{stat.badgeCode}]</span>
        </div>
      </div>

      <div className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter" style={{ transform: "translateZ(10px)" }}>
        {stat.value}
      </div>
    </motion.div>
  );
};

export const ResultsSnapshot = () => {
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

  const stats = [
    { 
      label: "JEE Selection Ratio", 
      value: "1 in 4", 
      icon: <TrendingUp />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "STAT_01 // JEE_SELECTION"
    },
    { 
      label: "NEET Top Scores", 
      value: "710+", 
      icon: <Users />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "STAT_02 // NEET_PERF"
    },
    { 
      label: "MHT-CET Toppers", 
      value: "1500+", 
      icon: <Trophy />,
      themeColor: "violet",
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "STAT_03 // CET_MERIT"
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

      {/* Subtle HSL spotlight cursor tracking */}
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

      {/* Layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        {/* Premium Dark-Mode Console Viewport */}
        <div className="bg-[#060813] border border-white/10 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Inner Coordinates Mesh Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left side text reveals */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-md"
              >
                <Shield size={11} className="text-indigo-400 animate-pulse" />
                <span>Audited Outcomming Records</span>
              </motion.div>

              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.95] uppercase">
                Results that <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
                  Speak.
                </span>
              </h2>
              <p className="text-slate-400 font-semibold mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed text-sm md:text-base italic-small">
                We maintain a snapshot of our consistent performance across all major competitive streams.
              </p>
              
              <MagneticActionButton className="group">
                Verify All Results 
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </MagneticActionButton>
            </div>

            {/* Right side stats list */}
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, i) => (
                <StatRowItem
                  key={i}
                  stat={stat}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
