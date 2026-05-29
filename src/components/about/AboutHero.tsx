import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { History, Star, Users, Award, Shield, Activity } from 'lucide-react';

const FloatingBackgroundShape = ({
  initialX,
  initialY,
  mouseCoords,
  parallaxFactor,
  isDesktop,
  children
}: {
  initialX: string;
  initialY: string;
  mouseCoords: { x: number; y: number };
  parallaxFactor: number;
  isDesktop: boolean;
  children: React.ReactNode;
}) => {
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDesktop) return;
    const w = window.innerWidth || 1200;
    const h = window.innerHeight || 800;
    const dx = (mouseCoords.x - w / 2) / (w / 2);
    const dy = (mouseCoords.y - h / 2) / (h / 2);
    setDrift({
      x: dx * -parallaxFactor,
      y: dy * -parallaxFactor
    });
  }, [mouseCoords, isDesktop, parallaxFactor]);

  return (
    <motion.div
      animate={{ x: drift.x, y: drift.y }}
      transition={{ type: "spring", stiffness: 45, damping: 24 }}
      style={{ left: initialX, top: initialY }}
      className="absolute pointer-events-none z-0 hidden lg:block select-none"
    >
      {children}
    </motion.div>
  );
};

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

const CountUpValue = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("");
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/(\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const prefix = value.substring(0, match.index);
    const suffix = value.substring(match.index! + match[1].length);
    const hasDecimal = match[1].includes('.');

    const duration = 1500; // ms
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * targetNumber;
      const formatted = hasDecimal ? current.toFixed(1) : Math.floor(current).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, hasStarted]);

  return <span ref={elementRef}>{displayValue}</span>;
};

const AboutStatItem = ({
  stat,
  index,
  hoveredIndex,
  setHoveredIndex,
  isDesktop
}: {
  stat: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  isDesktop: boolean;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
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
    indigo: "group-hover/card:border-indigo-500/20 text-indigo-650",
    emerald: "group-hover/card:border-emerald-500/20 text-emerald-650",
    violet: "group-hover/card:border-violet-500/20 text-violet-650",
    amber: "group-hover/card:border-amber-500/20 text-amber-650"
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-8 rounded-[3rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col bg-white/45 border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.03)] ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] bg-white/60 border-indigo-500/25`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: isDesktop
          ? `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`
          : 'none',
        transformStyle: "preserve-3d"
      }}
    >
      {/* Glowing neon aura backing card */}
      <div 
        className={`absolute inset-0 rounded-[3rem] blur-2xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-500 -z-10 ${
          stat.themeColor === 'indigo' ? 'bg-indigo-500' :
          stat.themeColor === 'emerald' ? 'bg-emerald-500' :
          stat.themeColor === 'violet' ? 'bg-violet-500' : 'bg-amber-500'
        }`}
      />

      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${stat.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={stat.sparkClass} />

      {/* Rotating Concentric HUD Icon Orbits */}
      <div className="relative w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover/card:scale-110 transition-transform z-10 shrink-0" style={{ transform: isDesktop ? "translateZ(60px)" : "none" }}>
        <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none group-hover/card:border-slate-350" style={{ animationDuration: '8s' }} />
        {React.cloneElement(stat.icon as React.ReactElement, { size: 24, className: `relative z-10 ${colorMap[stat.themeColor].split(' ')[1]}` })}
      </div>

      <div className="text-3xl lg:text-4xl font-black text-slate-800 mb-2 tracking-tighter" style={{ transform: isDesktop ? "translateZ(45px)" : "none" }}>
        <CountUpValue value={stat.value} />
      </div>

      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest" style={{ transform: isDesktop ? "translateZ(30px)" : "none" }}>
        {stat.label}
      </div>

      {/* SVG Sparkline growth curve */}
      <div className="w-full h-14 mt-4 opacity-40 group-hover/card:opacity-90 transition-opacity duration-500 z-10 select-none pointer-events-none" style={{ transform: isDesktop ? "translateZ(15px)" : "none" }}>
        <svg className="w-full h-full" viewBox="0 0 110 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`glowGrad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop 
                offset="0%" 
                stopColor={
                  stat.themeColor === 'indigo' ? '#6366f1' : 
                  stat.themeColor === 'emerald' ? '#10b981' : 
                  stat.themeColor === 'violet' ? '#8b5cf6' : '#f59e0b'
                } 
                stopOpacity="0.25" 
              />
              <stop 
                offset="100%" 
                stopColor={
                  stat.themeColor === 'indigo' ? '#6366f1' : 
                  stat.themeColor === 'emerald' ? '#10b981' : 
                  stat.themeColor === 'violet' ? '#8b5cf6' : '#f59e0b'
                } 
                stopOpacity="0.0" 
              />
            </linearGradient>
          </defs>
          {/* Shaded Area Under Sparkline */}
          <path
            d={`${stat.sparklinePath} L100,80 L10,80 Z`}
            fill={`url(#glowGrad-${index})`}
            className="transition-all duration-500"
          />
          {/* Stroke Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: index * 0.15 + 0.3, ease: "easeOut" }}
            d={stat.sparklinePath}
            fill="none"
            stroke={
              stat.themeColor === 'indigo' ? '#6366f1' : 
              stat.themeColor === 'emerald' ? '#10b981' : 
              stat.themeColor === 'violet' ? '#8b5cf6' : '#f59e0b'
            }
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Monospaced badge code */}
      <span className="absolute bottom-4 right-6 font-mono text-[6px] text-slate-400 select-none z-10" style={{ transform: isDesktop ? "translateZ(12px)" : "none" }}>
        [{stat.badgeCode}]
      </span>
    </motion.div>
  );
};

export const AboutHero = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      label: "Students Coached", 
      value: "25,000+", 
      icon: <Users />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "LEG_01 // STU_COACHED",
      sparklinePath: "M10,70 L25,65 L40,55 L55,45 L70,30 L85,25 L100,10"
    },
    { 
      label: "Years of Excellence", 
      value: "15+", 
      icon: <History />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "LEG_02 // YEARS_OP",
      sparklinePath: "M10,65 L25,60 L40,50 L55,40 L70,35 L85,20 L100,15"
    },
    { 
      label: "Top 100 Ranks", 
      value: "340+", 
      icon: <Award />,
      themeColor: "violet",
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "LEG_03 // TOP_RANK_HOLDERS",
      sparklinePath: "M10,75 L25,70 L40,65 L55,50 L70,40 L85,25 L100,5"
    },
    { 
      label: "Expert Mentors", 
      value: "120+", 
      icon: <Star />,
      themeColor: "amber",
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "LEG_04 // FACULTY_ROOT",
      sparklinePath: "M10,60 L25,55 L40,45 L55,40 L70,30 L85,25 L100,18"
    }
  ];

  // 3D Words flip animation variables
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotateX: -90 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 90, 
        damping: 18, 
        mass: 1.1 
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="relative pt-32 pb-24 overflow-hidden bg-[#FAF9F6] text-slate-800 border-b border-slate-200/50"
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

      {/* Interactive Floating 3D Geometries in Background */}
      <FloatingBackgroundShape initialX="4%" initialY="24%" mouseCoords={sectionCoords} parallaxFactor={20} isDesktop={isDesktop}>
        <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-[0.16] text-indigo-400 select-none">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" className="animate-spin" style={{ animationDuration: '40s' }} />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="12 4" className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
          <text x="105" y="15" className="fill-indigo-500 font-mono text-[6px] opacity-75">RADIAN // 0.85</text>
          <text x="105" y="192" className="fill-indigo-500 font-mono text-[6px] opacity-75">LIMIT // SEC_01</text>
        </svg>
      </FloatingBackgroundShape>

      <FloatingBackgroundShape initialX="74%" initialY="48%" mouseCoords={sectionCoords} parallaxFactor={28} isDesktop={isDesktop}>
        <div className="w-36 h-36 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-white/40 border border-white/30 backdrop-blur-xl shadow-lg relative flex items-center justify-center overflow-hidden opacity-[0.25]">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 mix-blend-overlay" />
          <svg width="64" height="64" viewBox="0 0 100 100" className="opacity-35 text-cyan-500 animate-pulse">
            <polygon points="50,15 90,40 90,80 50,95 10,80 10,40" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="50" cy="53" r="22" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          </svg>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[5px] text-slate-400 select-none uppercase tracking-widest">[CORE: SYS]</span>
        </div>
      </FloatingBackgroundShape>

      <FloatingBackgroundShape initialX="78%" initialY="12%" mouseCoords={sectionCoords} parallaxFactor={15} isDesktop={isDesktop}>
        <div className="w-48 h-36 rounded-3xl bg-slate-900/5 border border-slate-200/50 backdrop-blur-[2px] shadow-sm relative overflow-hidden p-4 font-mono text-[6px] text-indigo-400/55 flex flex-col justify-between opacity-35" style={{ transform: "perspective(800px) rotateX(15deg) rotateY(-20deg)" }}>
          <div className="flex justify-between border-b border-indigo-200/30 pb-2 mb-2">
            <span>MATRIX_VECTOR</span>
            <span className="animate-pulse">● SYNC</span>
          </div>
          <svg className="w-full h-16 opacity-45" viewBox="0 0 160 80">
            <path d="M 0 40 Q 20 10, 40 40 T 80 40 T 120 40 T 160 40" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 0 50 Q 30 20, 60 50 T 120 50 T 160 50" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="0" y1="40" x2="160" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div className="flex justify-between border-t border-indigo-200/30 pt-2 mt-2">
            <span>GROWTH: +24.8%</span>
            <span>[X: 18.2]</span>
          </div>
        </div>
      </FloatingBackgroundShape>

      {/* Spark Particle Trails */}
      <SparkParticlesTrail coords={sectionCoords} colorClass="bg-indigo-500" />

      {/* Layout guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none text-center">
        {/* Visual Badge Header with spin */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2.5 rounded-full text-indigo-650 font-black text-[10px] uppercase tracking-widest mb-10 shadow-sm relative overflow-hidden"
        >
          <div className="w-5 h-5 rounded-full border border-indigo-300 relative flex items-center justify-center shrink-0">
            <div className="absolute -inset-0.5 border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <History size={10} className="text-indigo-600" />
          </div>
          <span>Our Institute Story</span>
        </motion.div>
        
        {/* Main Title with Awwwards-tier 3D flip-down typography reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          className="text-5xl lg:text-7xl font-black text-slate-800 tracking-tighter mb-8 uppercase leading-none max-w-4xl mx-auto flex flex-col items-center justify-center gap-1.5"
        >
          <div className="overflow-hidden block" style={{ transformStyle: "preserve-3d" }}>
            <motion.span variants={wordVariants} className="block origin-top">
              Legacy of
            </motion.span>
          </div>
          <div className="overflow-hidden flex flex-wrap justify-center gap-x-4 mt-2" style={{ transformStyle: "preserve-3d" }}>
            <motion.span
              variants={wordVariants}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-500 italic font-black origin-top"
            >
              Academic
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-400 italic font-black origin-top"
            >
              Brilliance.
            </motion.span>
          </div>
        </motion.h1>
        
        {/* Subtitle details */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed text-sm md:text-base italic-small px-4 mb-16"
        >
          From a small classroom to India's most trusted coaching brand. We don't just teach students; we nurture the leaders of tomorrow.
        </motion.p>

        {/* 4-column stats cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AboutStatItem
              key={i}
              stat={stat}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
