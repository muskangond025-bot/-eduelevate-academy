import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Star, Cpu, Award, Sparkles, X } from 'lucide-react';

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

const SelectorTabButton = ({
  cat,
  activeCategory,
  setActiveCategory,
  index,
  hoveredTab,
  setHoveredTab
}: {
  cat: { id: string; title: string };
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  index: number;
  hoveredTab: number | null;
  setHoveredTab: (i: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tabRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tabRef.current) return;
    const rect = tabRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setHoveredTab(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredTab(null);
  };

  const isActive = activeCategory === cat.id;
  const isSelfHovered = hoveredTab === index;
  const isDimmed = hoveredTab !== null && hoveredTab !== index;

  return (
    <motion.button
      ref={tabRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActiveCategory(cat.id)}
      className={`group p-6 rounded-[2rem] text-left transition-all flex items-center justify-between relative overflow-hidden backdrop-blur-md ${
        isActive
          ? 'bg-primary text-white shadow-xl scale-[1.03] border-indigo-500'
          : isSelfHovered
            ? 'bg-white/80 text-primary border-slate-350 shadow-md scale-[1.005]'
            : isDimmed
              ? 'opacity-50 scale-[0.985] blur-[0.5px] border-slate-100/50 bg-white/20'
              : 'bg-white/40 text-slate-500 border border-slate-200/50 shadow-sm'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Target spotlight glow inside tab button */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(90px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
        }}
      />

      <span className="text-xl font-bold uppercase tracking-tight relative z-10" style={{ transform: 'translateZ(10px)' }}>{cat.id} Results</span>
      <ChevronRight
        size={20}
        className={`transition-transform relative z-10 shrink-0 ${
          isActive 
            ? 'rotate-90 text-white' 
            : 'text-slate-400 group-hover:translate-x-2'
        }`}
        style={{ transform: 'translateZ(10px)' }}
      />
    </motion.button>
  );
};

const TopAchieverCard = ({
  topper,
  activeTheme
}: {
  topper: { name: string; rank: string; score: string };
  activeTheme: { sparkColor: string; laserColor: string; bgGlow: string };
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
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-between p-5 bg-white/80 rounded-2xl border border-slate-150/60 shadow-sm relative overflow-hidden group/topper hover:shadow-md transition-shadow"
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Coordinate spotlights */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: 0.8,
          background: `radial-gradient(80px circle at ${coords.x}px ${coords.y}px, ${activeTheme.bgGlow}, transparent 80%)`
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/topper:opacity-100 transition-opacity duration-500 z-20"
        style={{
          background: `radial-gradient(70px circle at ${coords.x}px ${coords.y}px, ${activeTheme.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <SparkParticlesTrail coords={coords} colorClass={activeTheme.sparkColor} />

      <div className="relative z-10 font-bold text-primary tracking-tight" style={{ transform: 'translateZ(10px)' }}>{topper.name}</div>
      <div className="flex items-center gap-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>
        <span className="text-xs font-black text-secondary font-mono">{topper.rank}</span>
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-mono font-black border border-slate-200/50 shadow-inner text-primary">{topper.score}</span>
      </div>
    </motion.div>
  );
};

export const ExamWiseResults = () => {
  const [activeCategory, setActiveCategory] = useState('JEE');
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [isMeritModalOpen, setIsMeritModalOpen] = useState(false);

  const mockMeritLists: Record<string, { rank: string; name: string; score: string; center: string }[]> = {
    'JEE': [
      { rank: "AIR 12", name: "Rahul V.", score: "342/360", center: "Kothrud, Pune" },
      { rank: "AIR 84", name: "Sanya K.", score: "328/360", center: "Viman Nagar, Pune" },
      { rank: "AIR 105", name: "Amit Shah", score: "325/360", center: "Kothrud, Pune" },
      { rank: "AIR 234", name: "Neha Sharma", score: "318/360", center: "Chinchwad, Pune" },
      { rank: "AIR 345", name: "Vikram Malhotra", score: "312/360", center: "Viman Nagar, Pune" },
      { rank: "AIR 512", name: "Riya Patil", score: "305/360", center: "Hadapsar, Pune" },
      { rank: "AIR 789", name: "Aditya Joshi", score: "298/360", center: "Kothrud, Pune" },
      { rank: "AIR 942", name: "Ananya Deshmukh", score: "292/360", center: "Chinchwad, Pune" },
      { rank: "AIR 1024", name: "Rohan Sawant", score: "290/360", center: "Hadapsar, Pune" },
      { rank: "AIR 1250", name: "Sneha Gokhale", score: "285/360", center: "Kothrud, Pune" }
    ],
    'NEET': [
      { rank: "AIR 05", name: "Priya V.", score: "715/720", center: "Kothrud, Pune" },
      { rank: "AIR 24", name: "Karan L.", score: "705/720", center: "Viman Nagar, Pune" },
      { rank: "AIR 112", name: "Meera Nair", score: "695/720", center: "Hadapsar, Pune" },
      { rank: "AIR 189", name: "Siddhesh Kulkarni", score: "688/720", center: "Kothrud, Pune" },
      { rank: "AIR 254", name: "Kriti Sen", score: "680/720", center: "Chinchwad, Pune" },
      { rank: "AIR 312", name: "Rohit Shinde", score: "675/720", center: "Hadapsar, Pune" },
      { rank: "AIR 445", name: "Shruti Gadkari", score: "668/720", center: "Kothrud, Pune" },
      { rank: "AIR 520", name: "Alok Gupta", score: "662/720", center: "Viman Nagar, Pune" },
      { rank: "AIR 602", name: "Pooja Hegde", score: "658/720", center: "Chinchwad, Pune" },
      { rank: "AIR 710", name: "Pranav Kale", score: "652/720", center: "Kothrud, Pune" }
    ],
    'MHT CET': [
      { rank: "AIR 88", name: "Siddharth R.", score: "99.98%tile", center: "Kothrud, Pune" },
      { rank: "AIR 152", name: "Tanvi M.", score: "99.95%tile", center: "Viman Nagar, Pune" },
      { rank: "AIR 210", name: "Omkar Patil", score: "99.92%tile", center: "Chinchwad, Pune" },
      { rank: "AIR 305", name: "Tejaswini Rao", score: "99.88%tile", center: "Hadapsar, Pune" },
      { rank: "AIR 412", name: "Atharva Joshi", score: "99.85%tile", center: "Kothrud, Pune" },
      { rank: "AIR 518", name: "Gaurav More", score: "99.82%tile", center: "Chinchwad, Pune" },
      { rank: "AIR 642", name: "Ruchi Chawla", score: "99.78%tile", center: "Viman Nagar, Pune" },
      { rank: "AIR 720", name: "Prathamesh Kadam", score: "99.75%tile", center: "Hadapsar, Pune" },
      { rank: "AIR 805", name: "Minal Deshpande", score: "99.72%tile", center: "Kothrud, Pune" },
      { rank: "AIR 912", name: "Swarup Bhosale", score: "99.68%tile", center: "Chinchwad, Pune" }
    ],
    'Board': [
      { rank: "Class 10", name: "Aryan K.", score: "98.4%", center: "Kothrud, Pune" },
      { rank: "Class 12", name: "Isha P.", score: "97.8%", center: "Viman Nagar, Pune" },
      { rank: "Class 10", name: "Shreya Ghoshal", score: "97.2%", center: "Chinchwad, Pune" },
      { rank: "Class 12", name: "Kunal Kamra", score: "96.8%", center: "Hadapsar, Pune" },
      { rank: "Class 10", name: "Varun Dhawan", score: "96.5%", center: "Kothrud, Pune" },
      { rank: "Class 12", name: "Alia Bhatt", score: "96.2%", center: "Viman Nagar, Pune" },
      { rank: "Class 10", name: "Ranbir Kapoor", score: "95.8%", center: "Hadapsar, Pune" },
      { rank: "Class 12", name: "Deepika Padukone", score: "95.5%", center: "Chinchwad, Pune" },
      { rank: "Class 10", name: "Ranveer Singh", score: "95.2%", center: "Kothrud, Pune" },
      { rank: "Class 12", name: "Katrina Kaif", score: "95.0%", center: "Viman Nagar, Pune" }
    ]
  };
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [dashCoords, setDashCoords] = useState({ x: 0, y: 0 });
  const [dashTilt, setDashTilt] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleDashboardMouseMove = (e: React.MouseEvent) => {
    if (!dashboardRef.current) return;
    const rect = dashboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setDashCoords({ x, y });
    setDashTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
  };

  const handleDashboardMouseLeave = () => {
    setDashTilt({ x: 0, y: 0 });
  };

  const categories = [
    { 
      id: 'JEE', 
      title: 'JEE Advanced & Main', 
      highlight: '150+ Selections in IITs', 
      stats: ['4 Students in Top 100', '65 Students in Top 1000', '98% Qualification Rate'],
      toppers: [
        { name: "Rahul V.", rank: "AIR 12", score: "342/360" },
        { name: "Sanya K.", rank: "AIR 84", score: "328/360" }
      ],
      theme: {
        glow: 'rgba(99, 102, 241, 0.04)',
        laserColor: 'rgba(99, 102, 241, 0.45)',
        sparkColor: 'bg-indigo-500',
        bgGlow: 'rgba(99, 102, 241, 0.03)'
      }
    },
    { 
      id: 'NEET', 
      title: 'NEET (Medical)', 
      highlight: '200+ MBBS Admissions', 
      stats: ['12 Students in Top 500', '80% Scored 600+', 'Top Score: 715/720'],
      toppers: [
        { name: "Priya V.", rank: "AIR 05", score: "715/720" },
        { name: "Karan L.", rank: "AIR 24", score: "705/720" }
      ],
      theme: {
        glow: 'rgba(16, 185, 129, 0.04)',
        laserColor: 'rgba(16, 185, 129, 0.45)',
        sparkColor: 'bg-emerald-500',
        bgGlow: 'rgba(16, 185, 129, 0.03)'
      }
    },
    { 
      id: 'MHT CET', 
      title: 'MHT-CET (State Engg)', 
      highlight: 'Top State Colleges Selection', 
      stats: ['50+ Students in COEP/VJTI', '20+ Percentile above 99.9', 'Average Percentile: 98.4'],
      toppers: [
        { name: "Siddharth R.", rank: "AIR 88", score: "99.98%tile" },
        { name: "Tanvi M.", rank: "AIR 152", score: "99.95%tile" }
      ],
      theme: {
        glow: 'rgba(59, 130, 246, 0.04)',
        laserColor: 'rgba(59, 130, 246, 0.45)',
        sparkColor: 'bg-blue-500',
        bgGlow: 'rgba(59, 130, 246, 0.03)'
      }
    },
    { 
      id: 'Board', 
      title: 'Board Examinations', 
      highlight: '98% Distinction Rate', 
      stats: ['15 School Toppers', '100% Passing Ratio', 'Average Percentage: 94.2%'],
      toppers: [
        { name: "Aryan K.", rank: "Class 10", score: "98.4%" },
        { name: "Isha P.", rank: "Class 12", score: "97.8%" }
      ],
      theme: {
        glow: 'rgba(245, 158, 11, 0.04)',
        laserColor: 'rgba(245, 158, 11, 0.45)',
        sparkColor: 'bg-amber-500',
        bgGlow: 'rgba(245, 158, 11, 0.03)'
      }
    }
  ];

  // Trigger active hardware scanning laser sweep on active category change
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const activeCatData = categories.find(c => c.id === activeCategory) || categories[0];
  const activeTheme = activeCatData.theme;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-24 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Light Dotted Matrix Coordinates Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic spot coordinates HSL spotlights */}
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
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Navigation Side Panel */}
          <div className="lg:w-1/3 w-full">
            <h2 className="text-5xl font-black text-primary tracking-tighter mb-6 uppercase leading-none select-none">
              Exam Wise <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
                Excellence.
              </span>
            </h2>

            <div className="flex flex-col gap-4">
              {categories.map((cat, i) => (
                <SelectorTabButton
                  key={cat.id}
                  cat={cat}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  index={i}
                  hoveredTab={hoveredTab}
                  setHoveredTab={setHoveredTab}
                />
              ))}
            </div>
          </div>

          {/* Cyber Dashboard Preview Console */}
          <div className="lg:w-2/3 w-full">
            <AnimatePresence mode="wait">
              {categories.map((cat) => (
                cat.id === activeCategory && (
                  <motion.div
                    key={cat.id}
                    ref={dashboardRef}
                    onMouseMove={handleDashboardMouseMove}
                    onMouseLeave={handleDashboardMouseLeave}
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/60 border border-slate-200/50 rounded-[3.2rem] p-10 lg:p-12 relative overflow-hidden backdrop-blur-xl group/hull shadow-2xl flex flex-col justify-between min-h-[580px]"
                    style={{
                      transform: `perspective(1000px) rotateX(${-dashTilt.y * 3}deg) rotateY(${dashTilt.x * 3}deg)`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Concentric rotating radar backing or glowing spot */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
                      style={{
                        opacity: isSectionHovered ? 1 : 0,
                        background: `radial-gradient(150px circle at ${dashCoords.x}px ${dashCoords.y}px, ${activeTheme.glow}, transparent 80%)`
                      }}
                    />

                    {/* Razor-thin laser border sweep */}
                    <div
                      className="absolute inset-0 rounded-[3.2rem] pointer-events-none opacity-0 group-hover/hull:opacity-100 transition-opacity duration-500 z-30"
                      style={{
                        background: `radial-gradient(120px circle at ${dashCoords.x}px ${dashCoords.y}px, ${activeTheme.laserColor}, transparent 80%)`,
                        padding: '1.2px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                      }}
                    />

                    {/* Sparks particle trail */}
                    <SparkParticlesTrail coords={dashCoords} colorClass={activeTheme.sparkColor} />

                    {/* Active sweep hardware laser print line */}
                    <AnimatePresence>
                      {isScanning && (
                        <>
                          <motion.div
                            initial={{ top: '0%' }}
                            animate={{ top: '100%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.0, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] pointer-events-none z-30"
                          />
                          <motion.div
                            initial={{ height: 0, top: 0 }}
                            animate={{ height: '100%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.0, ease: "easeInOut" }}
                            className="absolute left-0 right-0 bg-gradient-to-b from-cyan-400/5 to-transparent pointer-events-none z-20"
                          />
                        </>
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
                      <div>
                        {/* Header Badging */}
                        <div className="flex items-center justify-between mb-8 select-none">
                          <div className="text-[10px] font-black text-secondary tracking-[0.3em] uppercase leading-none">
                            {cat.id} Category
                          </div>
                          <div className="font-mono text-[7px] text-slate-400 bg-slate-150/60 px-3 py-1.5 rounded-lg border border-slate-200/40 font-bold uppercase tracking-widest">
                            [STATUS: SYNCHRONIZED]
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-4xl font-black text-primary mb-8 tracking-tighter uppercase select-none leading-none">
                          {cat.title}
                        </h3>

                        {/* Highlight Quotes Box */}
                        <div className="p-7 rounded-[2rem] bg-indigo-50/50 border-l-4 border-indigo-500 mb-10 select-none shadow-sm">
                          <div className="text-2xl font-bold text-primary italic leading-tight">
                            "{cat.highlight}"
                          </div>
                        </div>

                        {/* Double grid statistics details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                          {/* Stats List with local hover sibling dimming */}
                          <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 select-none font-mono">
                              Key Statistics
                            </h4>
                            <ul className="space-y-4">
                              {cat.stats.map((s, idx) => {
                                const isSelfStatHovered = hoveredStat === idx;
                                const isStatDimmed = hoveredStat !== null && hoveredStat !== idx;
                                return (
                                  <motion.li
                                    key={idx}
                                    onMouseEnter={() => setHoveredStat(idx)}
                                    onMouseLeave={() => setHoveredStat(null)}
                                    className={`flex items-center gap-3.5 text-[15px] font-semibold transition-all duration-300 select-none ${
                                      isSelfStatHovered 
                                        ? 'text-indigo-950 translate-x-1.5' 
                                        : isStatDimmed 
                                          ? 'opacity-40 scale-[0.98] blur-[0.3px] text-slate-400' 
                                          : 'text-slate-600'
                                    }`}
                                  >
                                    <div className={`w-2 h-2 rounded-full shrink-0 shadow-inner transition-colors duration-300 ${
                                      isSelfStatHovered ? 'bg-indigo-500' : 'bg-slate-350'
                                    }`} />
                                    {s}
                                  </motion.li>
                                );
                              })}
                            </ul>
                          </div>

                          {/* Top Achievers Cards */}
                          <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 select-none font-mono">
                              Top Achievers
                            </h4>
                            <div className="space-y-4">
                              {cat.toppers.map((t, idx) => (
                                <TopAchieverCard
                                  key={idx}
                                  topper={t}
                                  activeTheme={activeTheme}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Merit Link */}
                      <button 
                        onClick={() => setIsMeritModalOpen(true)}
                        className="flex items-center gap-3 text-primary font-black uppercase tracking-widest group/link mt-6 hover:text-indigo-950 transition-colors w-max relative select-none cursor-pointer"
                      >
                        View Full Merit List{' '}
                        <ArrowRight
                          size={18}
                          className="group-hover/link:translate-x-2 transition-transform"
                        />
                      </button>
                    </div>

                    {/* Corner decorative tech brackets */}
                    <div className="absolute top-8 left-8 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200/60 group-hover/hull:border-indigo-400/30 transition-colors" />
                    <div className="absolute top-8 right-8 w-2.5 h-2.5 border-t-2 border-r-2 border-slate-200/60 group-hover/hull:border-indigo-400/30 transition-colors" />
                    <div className="absolute bottom-8 left-8 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200/60 group-hover/hull:border-indigo-400/30 transition-colors" />
                    <div className="absolute bottom-8 right-8 w-2.5 h-2.5 border-b-2 border-r-2 border-slate-200/60 group-hover/hull:border-indigo-400/30 transition-colors" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Merit List Modal overlay */}
      <AnimatePresence>
        {isMeritModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMeritModalOpen(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white/95 border border-slate-200/50 backdrop-blur-2xl rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 p-8 md:p-12 text-primary"
            >
              {/* Closing Button */}
              <button 
                onClick={() => setIsMeritModalOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-primary rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Award size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-black text-primary tracking-tight leading-none">
                    {activeCategory} Merit List
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 leading-none">
                    Academic Session 2023-2024
                  </p>
                </div>
              </div>

              {/* Scrollable Table Wrapper */}
              <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="pb-4 font-mono">Rank</th>
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Score/Rating</th>
                      <th className="pb-4">Center</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(mockMeritLists[activeCategory] || []).map((student, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="border-b border-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4 font-mono font-black text-indigo-600">{student.rank}</td>
                        <td className="py-4 font-bold text-primary">{student.name}</td>
                        <td className="py-4 font-mono font-bold">
                          <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs">{student.score}</span>
                        </td>
                        <td className="py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{student.center}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
