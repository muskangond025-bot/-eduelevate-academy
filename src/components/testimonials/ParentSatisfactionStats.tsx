import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, UserCheck, Star } from 'lucide-react';

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
      
      // Quadratic ease out
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

const StatBlockCard = ({
  title,
  subtext,
  index,
  hoveredIndex,
  setHoveredIndex,
  stars = false,
  themeColor = "indigo",
  sparkClass = "bg-indigo-500",
  laserColor = "rgba(99, 102, 241, 0.4)",
  badgeCode = "INDEX_01"
}: {
  title: string;
  subtext: string;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  stars?: boolean;
  themeColor?: string;
  sparkClass?: string;
  laserColor?: string;
  badgeCode?: string;
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
      className={`p-10 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col items-center justify-center text-center bg-white/5 border-white/10 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_0_50px_rgba(99,102,241,0.15)] border-indigo-500/30 bg-white/10'
          : isDimmed
            ? 'opacity-40 scale-[0.985] blur-[0.5px] border-white/5'
            : 'shadow-2xl'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={sparkClass} />

      {/* Concentric HUD Orbits */}
      <div className="absolute inset-[-10px] border border-dashed border-white/5 rounded-[4.5rem] pointer-events-none opacity-0 group-hover/card:opacity-40 animate-spin" style={{ animationDuration: '15s' }} />

      <div className="text-5xl md:text-6xl font-black mb-2 tracking-tight text-white" style={{ transform: "translateZ(25px)" }}>
        <CountUpValue value={title} />
      </div>

      {stars && (
        <div className="flex justify-center gap-1 text-amber-400 mb-4" style={{ transform: "translateZ(20px)" }}>
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
        </div>
      )}

      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2" style={{ transform: "translateZ(10px)" }}>
        {subtext}
      </div>

      {/* Monospaced indicator badge */}
      <span className="absolute bottom-5 font-mono text-[7px] text-slate-500 select-none z-10">
        [{badgeCode}]
      </span>
    </motion.div>
  );
};

export const ParentSatisfactionStats = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [leftHovered, setLeftHovered] = useState<number | null>(null);

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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-24 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Column Description and Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 select-none"
          >
            <h2 className="text-5xl font-black tracking-tighter mb-8 uppercase leading-none">
              Parent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">
                Trust Index.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
              Over a decade of academic excellence has built a foundation of trust that transcends scores. We focus on character, discipline, and long-term success.
            </p>
            
            <div className="space-y-6">
              {[
                { 
                  icon: <CheckCircle2 size={18} />, 
                  text: "NPS Score of 88+ (Excellent)", 
                  sub: "INDEX_NPS // HIGH_LOYALTY" 
                },
                { 
                  icon: <UserCheck size={18} />, 
                  text: "95% Parent Renewal Rate", 
                  sub: "INDEX_RENEWAL // ACADEMIC_STABILITY" 
                }
              ].map((point, idx) => {
                const isItemHovered = leftHovered === idx;
                const isAnyLeftHovered = leftHovered !== null;
                const isItemDimmed = isAnyLeftHovered && !isItemHovered;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setLeftHovered(idx)}
                    onMouseLeave={() => setLeftHovered(null)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      isItemHovered
                        ? 'bg-white/5 border-white/10 shadow-lg scale-[1.01]'
                        : isItemDimmed
                          ? 'opacity-40 blur-[0.5px] border-transparent'
                          : 'border-transparent'
                    }`}
                  >
                    <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <span className="text-xl font-bold italic block">{point.text}</span>
                      <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest mt-1 block">[{point.sub}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full"
          >
            <StatBlockCard
              title="4.9/5"
              subtext="Google Reviews"
              index={0}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              stars={true}
              themeColor="indigo"
              sparkClass="bg-indigo-500"
              laserColor="rgba(99, 102, 241, 0.4)"
              badgeCode="INDEX_01 // GOOGLE_FEEDBACK"
            />
            
            <StatBlockCard
              title="10k+"
              subtext="Families Served Successfully"
              index={1}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              stars={false}
              themeColor="cyan"
              sparkClass="bg-cyan-500"
              laserColor="rgba(6, 182, 212, 0.4)"
              badgeCode="INDEX_02 // COMPLETED_JOURNEYS"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
