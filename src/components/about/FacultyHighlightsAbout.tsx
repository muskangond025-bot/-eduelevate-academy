import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Shield, Zap, History } from 'lucide-react';

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

const HeaderStatCard = ({ label, value, index }: { label: string; value: string; index: number }) => {
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
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden backdrop-blur-md transition-all duration-300"
      style={{
        transform: `perspective(600px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(1, 1, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-350 z-30"
        style={{
          background: `radial-gradient(60px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.25), transparent 80%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />
      <div className="text-2xl font-black text-slate-800" style={{ transform: "translateZ(15px)" }}>
        <CountUpValue value={value} />
      </div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1" style={{ transform: "translateZ(10px)" }}>
        {label}
      </div>
    </motion.div>
  );
};

const FacultyMemberCard = ({
  member,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  member: any;
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
      className={`group rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col bg-white border-slate-200/50 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] border-indigo-500/20'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-xl'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${member.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={member.sparkClass} />

      {/* Viewport image frame */}
      <div className="relative aspect-[4/5] rounded-[3.2rem] overflow-hidden m-4 bg-slate-900 border border-slate-100 shadow-sm relative">
        <img 
          src={member.img} 
          alt={member.name} 
          className="w-full h-full object-cover grayscale transition-all duration-750 scale-100 group-hover:scale-105"
          style={{
            filter: isSelfHovered ? 'grayscale(0) scale(1.05)' : 'grayscale(1)',
            transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Experience Slide-Up Drawer Overlay */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-10 flex flex-col justify-end transition-all duration-500 ${
          isSelfHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* HUD orbits play */}
          <div className="relative w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-sm z-10 shrink-0 select-none">
            <div className="absolute inset-[-5px] border border-dashed border-white/10 rounded-2xl animate-spin pointer-events-none group-hover:border-white/30" style={{ animationDuration: '8s' }} />
            {React.cloneElement(member.icon as React.ReactElement, { size: 20, className: `relative z-10 ${colorMap[member.themeColor].split(' ')[0]}` })}
          </div>
          <div className="text-white font-black text-sm uppercase tracking-widest">[EXP: {member.exp.toUpperCase()}]</div>
        </div>
      </div>

      <div className="text-center pb-8 pt-4 select-none">
        <h3 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tight">{member.name}</h3>
        <p className="text-indigo-650 font-bold text-xs uppercase tracking-[0.25em]">{member.role}</p>
      </div>
    </motion.div>
  );
};

export const FacultyHighlightsAbout = () => {
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

  const coreTeam = [
    { 
      name: "Dr. Anjali Verma", 
      role: "Academic Director", 
      exp: "20+ Years", 
      img: "https://i.pravatar.cc/300?u=a2", 
      icon: <Shield />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "FAC_01 // ACAD_DIR"
    },
    { 
      name: "Prof. Kabir Khan", 
      role: "Head of Mathematics", 
      exp: "15+ Years", 
      img: "https://i.pravatar.cc/300?u=k1", 
      icon: <Zap />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "FAC_02 // MATH_HEAD"
    },
    { 
      name: "Dr. Smita Patil", 
      role: "Chief Counseling Head", 
      exp: "12+ Years", 
      img: "https://i.pravatar.cc/300?u=s2", 
      icon: <UserCheck />,
      themeColor: "violet",
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "FAC_03 // COUNSEL_HEAD"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl select-none">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-650 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
            >
              <History size={11} className="text-indigo-500 animate-pulse" />
              <span>Academic Leadership</span>
            </motion.div>

            <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-6 uppercase leading-none">
              The Brains{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black">
                Behind Us.
              </span>
            </h2>
            <p className="text-slate-500 font-semibold leading-relaxed italic-small text-sm md:text-base">
              Our leadership comprises veterans who have shaped the coaching industry in India for over two decades.
            </p>
          </div>
          
          <div className="flex gap-4">
            <HeaderStatCard label="PhD Tutors" value="120+" index={0} />
            <HeaderStatCard label="Ex-IITians" value="85+" index={1} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {coreTeam.map((member, i) => (
            <FacultyMemberCard
              key={i}
              member={member}
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
