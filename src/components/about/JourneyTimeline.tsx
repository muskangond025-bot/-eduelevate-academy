import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Flag, Trophy, Rocket, Building2 } from 'lucide-react';


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

const TimelineCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: any;
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
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col bg-white/70 border-slate-200/50 ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] bg-white ${colorMap[item.themeColor].split(' ')[0]}`
          : isDimmed
            ? 'opacity-40 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={item.sparkClass} />

      <div className="text-5xl font-black text-slate-300 mb-4 select-none tracking-tighter" style={{ transform: "translateZ(20px)" }}>
        {item.year}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-3 uppercase tracking-tight" style={{ transform: "translateZ(15px)" }}>
        {item.title}
      </h3>
      
      <p className="text-sm text-slate-500 leading-relaxed font-semibold" style={{ transform: "translateZ(10px)" }}>
        {item.desc}
      </p>

    </motion.div>
  );
};

export const JourneyTimeline = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const pathProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 18 });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const milestones = [
    { 
      year: "2010", 
      title: "The Humble Start", 
      desc: "Started with a batch of 12 students in a small garage space.", 
      icon: <Flag />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "MILE_01 // GARAGE_START"
    },
    { 
      year: "2014", 
      title: "First AIR Top 100", 
      desc: "Produced our first AIR 84 in JEE Advanced, marking our arrival.", 
      icon: <Trophy />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "MILE_02 // AIR_84_ADV"
    },
    { 
      year: "2018", 
      title: "Expansion Phase", 
      desc: "Opened 5 regional tech-enabled hubs across the state.", 
      icon: <Building2 />,
      themeColor: "violet",
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "MILE_03 // HUB_EXPANSION"
    },
    { 
      year: "2023", 
      title: "Global Recognition", 
      desc: "Awarded as the 'Most Innovative Coaching Brand' in National Education Summit.", 
      icon: <Rocket />,
      themeColor: "amber",
      sparkClass: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeCode: "MILE_04 // INNOV_AWARD"
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
        <div className="text-center mb-24 select-none">
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-4 uppercase leading-none">
            Our Journey{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black">
              Timeline.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            A decade and a half of relentless academic pursuit.
          </p>
        </div>

        <div className="relative">
          {/* Glowing Winding Serpentine Timeline Path (Desktop Only) */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              fill="none"
              className="w-full h-full"
            >
              <defs>
                {/* 3D cylindrical specularity/glow gradients matching Milestone card themes */}
                <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />      {/* Indigo // 2010 */}
                  <stop offset="33%" stopColor="#10B981" />     {/* Emerald // 2014 */}
                  <stop offset="66%" stopColor="#8B5CF6" />     {/* Violet // 2018 */}
                  <stop offset="100%" stopColor="#F59E0B" />    {/* Amber // 2023 */}
                </linearGradient>
                <linearGradient id="timeline-glow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="33%" stopColor="#10B981" />
                  <stop offset="66%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                {/* Drop shadow filter to elevate the tube off the blueprint background */}
                <filter id="timeline-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="16" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Inactive background track with soft drop shadow */}
              <path
                d="M 250,125 C 375,125 450,125 500,125 C 500,200 500,300 500,375 C 500,375 625,375 750,375 C 750,500 500,500 500,625 C 500,625 375,625 250,625 C 250,750 500,750 500,875 C 500,875 625,875 750,875"
                stroke="rgba(203, 213, 225, 0.45)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
                filter="url(#timeline-shadow)"
              />

              {/* 3D Neon Active Tube Layer 1: Ambient Neon Glow Aura */}
              <motion.path
                d="M 250,125 C 375,125 450,125 500,125 C 500,200 500,300 500,375 C 500,375 625,375 750,375 C 750,500 500,500 500,625 C 500,625 375,625 250,625 C 250,750 500,750 500,875 C 500,875 625,875 750,875"
                stroke="url(#timeline-glow-gradient)"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.22"
                style={{ pathLength: pathProgress }}
              />

              {/* 3D Neon Active Tube Layer 2: Main Solid Color Core */}
              <motion.path
                d="M 250,125 C 375,125 450,125 500,125 C 500,200 500,300 500,375 C 500,375 625,375 750,375 C 750,500 500,500 500,625 C 500,625 375,625 250,625 C 250,750 500,750 500,875 C 500,875 625,875 750,875"
                stroke="url(#timeline-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: pathProgress }}
              />

              {/* 3D Neon Active Tube Layer 3: Glass specular cylinder core highlight */}
              <motion.path
                d="M 250,125 C 375,125 450,125 500,125 C 500,200 500,300 500,375 C 500,375 625,375 750,375 C 750,500 500,500 500,625 C 500,625 375,625 250,625 C 250,750 500,750 500,875 C 500,875 625,875 750,875"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.85"
                style={{ pathLength: pathProgress }}
              />
            </svg>
          </div>
          
          <div className="space-y-24">
            {milestones.map((item, i) => {
              const isSelfHovered = hoveredIndex === i;
              const colorClassMap: Record<string, string> = {
                indigo: "text-indigo-650 border-indigo-400/40",
                emerald: "text-emerald-650 border-emerald-400/40",
                violet: "text-violet-650 border-violet-400/40",
                amber: "text-amber-650 border-amber-400/40"
              };

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Left Column - Card Hull */}
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end text-center lg:text-right px-8 order-2 lg:order-none">
                    <div className={`w-full ${i % 2 !== 0 ? 'lg:text-left mr-auto' : 'ml-auto'} max-w-lg`}>
                      <TimelineCard
                        item={item}
                        index={i}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                      />
                    </div>
                  </div>

                  {/* Center Node - Concentric HUD Orbit Circle */}
                  <div 
                    className={`relative z-10 w-18 h-18 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-2xl order-1 lg:order-none shrink-0 group transition-transform ${
                      isSelfHovered ? 'scale-110 rotate-12' : 'scale-100'
                    }`}
                    style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    {/* Concentric rotating orbits */}
                    <div 
                      className={`absolute inset-[-8px] border border-dashed rounded-full pointer-events-none opacity-60 animate-spin ${
                        isSelfHovered ? colorClassMap[item.themeColor].split(' ')[1] : 'border-slate-300/40'
                      }`} 
                      style={{ animationDuration: '8s' }} 
                    />
                    
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}

                    <div className="absolute top-1/2 right-full h-[1px] w-24 bg-slate-200/40 -translate-y-1/2 hidden lg:block group-hover:bg-indigo-500/20 transition-colors" />
                    <div className="absolute top-1/2 left-full h-[1px] w-24 bg-slate-200/40 -translate-y-1/2 hidden lg:block group-hover:bg-indigo-500/20 transition-colors" />
                  </div>

                  {/* Right Column - Alignment Balance Spacer */}
                  <div className="w-full lg:w-1/2 order-3 lg:order-none hidden lg:block">
                    {/* Balanced empty spacer */}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
