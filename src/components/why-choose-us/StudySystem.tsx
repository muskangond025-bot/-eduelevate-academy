import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Repeat, ClipboardCheck, Award, Shield } from 'lucide-react';
import studyIngestionVideo from '../../assets/study_ingestion.mp4';

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

const StepItemCard = ({
  step,
  index,
  hoveredIndex,
  setHoveredIndex,
  themeConfig
}: {
  step: any;
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
      className={`p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex gap-5 items-start bg-white/70 border-slate-200/50 ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_15px_30px_rgba(99,102,241,0.06)] bg-white ${themeConfig.cardBorderColor}`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-md'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Laser Border sweep */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(110px circle at ${coords.x}px ${coords.y}px, ${themeConfig.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={themeConfig.sparkClass} />

      {/* Rotating HUD concentric circle */}
      <div className="relative w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-4px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none group-hover/card:border-slate-350" style={{ animationDuration: '8s' }} />
        {React.cloneElement(step.icon, { size: 20, className: `relative z-10 ${themeConfig.iconColor}` })}
      </div>

      <div className="relative z-10 flex-grow" style={{ transform: "translateZ(15px)" }}>
        <div className="flex items-center justify-between gap-2 mb-1 font-mono text-[7px] text-slate-400 select-none">
          <span className="font-bold uppercase">SYSTEM COMPONENT</span>
          <span>[{themeConfig.badgeCode}]</span>
        </div>
        <h4 className="font-black text-slate-800 mb-2 uppercase text-sm tracking-tight group-hover/card:text-indigo-650 transition-colors">
          {step.title}
        </h4>
        <p className="text-slate-500 text-xs font-semibold leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const StudySystem = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [consoleTilt, setConsoleTilt] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSectionCoords({ x, y });
    setIsSectionHovered(true);

    // Subtle tilt for the right console viewport
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setConsoleTilt({
      x: (x - cx) / cx,
      y: (y - cy) / cy
    });
  };

  const steps = [
    { icon: <BookOpen />, title: "Concept Building", desc: "Foundational lectures with deep subject research." },
    { icon: <Repeat />, title: "Iterative Practice", desc: "Daily practice problems (DPPs) for immediate reinforcement." },
    { icon: <ClipboardCheck />, title: "Rigorous Testing", desc: "Periodic national-level mock tests to gauge competition." },
    { icon: <Award />, title: "Revision Mastery", desc: "Specialized flashcards and mind-maps for quick recall." }
  ];

  const themeMap: Record<number, { sparkClass: string; laserColor: string; badgeCode: string; iconColor: string; cardBorderColor: string }> = {
    0: {
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "SYS_01 // CONCEPT_BUILD",
      iconColor: "text-indigo-600",
      cardBorderColor: "group-hover/card:border-indigo-500/20"
    },
    1: {
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "SYS_02 // PRACTICE",
      iconColor: "text-emerald-600",
      cardBorderColor: "group-hover/card:border-emerald-500/20"
    },
    2: {
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "SYS_03 // TESTING",
      iconColor: "text-violet-650",
      cardBorderColor: "group-hover/card:border-violet-500/20"
    },
    3: {
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "SYS_04 // REVISION",
      iconColor: "text-amber-650",
      cardBorderColor: "group-hover/card:border-amber-500/20"
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => {
        setIsSectionHovered(false);
        setConsoleTilt({ x: 0, y: 0 });
      }}
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

      {/* Layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left panel: Title, description, step cards */}
          <div className="lg:w-1/2">
            <div className="mb-10 select-none">
              <h3 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter mb-6 uppercase leading-tight">
                Our Integrated <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black">
                  Study System.
                </span>
              </h3>
              <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base italic-small">
                We've replaced rote learning with a high-performance system designed for long-term retention and speed. Every student follows a structured path of gradual complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {steps.map((step, i) => (
                <StepItemCard
                  key={i}
                  step={step}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  themeConfig={themeMap[i]}
                />
              ))}
            </div>
          </div>

          {/* Right panel: Cyber Bezel Image Console */}
          <div 
            className="lg:w-1/2 relative select-none w-full"
            style={{
              transform: `perspective(1000px) rotateX(${-consoleTilt.y * 3}deg) rotateY(${consoleTilt.x * 3}deg) scale3d(1, 1, 1)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.5s ease-out"
            }}
          >
            {/* Console outer bezel wrap */}
            <div className="bg-[#0b0f1e]/95 border border-white/10 rounded-[3.8rem] p-6 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              
              {/* macOS browser control dots */}
              <div className="flex items-center gap-1.5 absolute top-5 left-8 z-20">
                <div className="w-2 h-2 rounded-full bg-rose-500/70" />
                <div className="w-2 h-2 rounded-full bg-amber-500/70" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
              </div>

              {/* Status Header */}
              <div className="w-full text-center border-b border-white/5 pb-4 mb-4 select-none">
                <span className="font-mono text-[8px] tracking-widest text-slate-550 uppercase">
                  [VIEWPORT: STUDY_ENGINE_INGESTION]
                </span>
              </div>

              {/* Console Screen frame */}
              <div className="relative rounded-[2.8rem] overflow-hidden border border-white/5 aspect-square bg-slate-900 group">
                
                {/* Active scanline sweep bar */}
                <div 
                  className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/35 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-20 pointer-events-none group-hover:top-[100%] transition-all duration-[3000ms] ease-linear"
                  style={{ top: '0%' }}
                />

                <video 
                  src={studyIngestionVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none" 
                />
                
                <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply pointer-events-none" />

                {/* Iridescent Holographic Sticker */}
                <div 
                  className="absolute bottom-6 left-6 p-6 border rounded-[2rem] max-w-xs shadow-2xl overflow-hidden group/sticker transition-all duration-500 border-white/10 bg-slate-900/85 backdrop-blur-md"
                  style={{
                    transform: `perspective(500px) rotateX(${consoleTilt.y * 5}deg) rotateY(${-consoleTilt.x * 5}deg)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Iridescent gloss overlay shifts light spectrum on cursor movements */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay transition-all duration-300 z-10"
                    style={{
                      background: `linear-gradient(${135 + consoleTilt.x * 45}deg, #ff007f 0%, #7f00ff 30%, #00ffff 60%, #00ff7f 100%)`
                    }}
                  />
                  <div className="relative z-10 font-mono">
                    <div className="text-cyan-400 font-black text-[9px] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>EXCLUSIVE INSIGHT</span>
                    </div>
                    <p className="text-slate-300 text-xs italic font-semibold leading-relaxed">
                      "Custom modules curated by IITians specifically for the evolving JEE pattern."
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
