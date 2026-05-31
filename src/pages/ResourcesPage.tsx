import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Search, Filter, ArrowRight, Sparkles, Terminal, Shield, Award, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoBenefits } from '../components/demo/DemoBenefits';
import { DemoExperience } from '../components/demo/DemoExperience';
import { DemoBooking } from '../components/demo/DemoBooking';

const GridWarpCanvas = ({ mousePos, isHovered }: { mousePos: { x: number; y: number }; isHovered: boolean }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1400,
          height: containerRef.current.clientHeight || 600
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cols = 14;
  const rows = 8;
  const paths = [];

  for (let i = 1; i < cols; i++) {
    const x = (dimensions.width / cols) * i;
    let d = `M ${x} 0`;
    if (isHovered) {
      const distanceY = dimensions.height / 2;
      const dx = mousePos.x - x;
      const dy = mousePos.y - distanceY;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 160 - dist) * 0.35;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;
    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 160 - dist) * 0.35;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

const FloatingTelemetryCard = ({ 
  children, 
  delay = 0, 
  initialX = "", 
  initialY = "", 
  mousePos 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  initialX?: string; 
  initialY?: string; 
  mousePos: { x: number; y: number } 
}) => {
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const offsetX = (mousePos.x - windowSize.w / 2) * 0.035;
  const offsetY = (mousePos.y - windowSize.h / 2) * 0.035;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        x: offsetX, 
        y: offsetY,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay }}
      className="absolute hidden xl:block p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md font-mono text-[9px] uppercase tracking-widest text-indigo-400 select-none pointer-events-none z-20 shadow-2xl"
      style={{
        left: initialX,
        top: initialY
      }}
    >
      {children}
    </motion.div>
  );
};

const CategoryCard = ({
  cat,
  index,
  hoveredCategory,
  setHoveredCategory
}: {
  cat: any;
  index: number;
  hoveredCategory: number | null;
  setHoveredCategory: (i: number | null) => void;
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
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredCategory(null);
  };

  const isSelfHovered = hoveredCategory === index;
  const isDimmed = hoveredCategory !== null && hoveredCategory !== index;

  // Custom Animated HUD Vector Widgets
  const renderCategoryIcon = () => {
    switch (index) {
      case 0:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-indigo-500/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [0.85, 1.15, 0.85] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 border border-indigo-500/20"
            >
              <Cpu size={12} className={isSelfHovered ? "animate-pulse" : ""} />
            </motion.div>
          </div>
        );
      case 1:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-0 border-2 border-emerald-500/10 border-t-emerald-500/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20"
            >
              <Terminal size={12} />
            </motion.div>
          </div>
        );
      case 2:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
              className="absolute inset-0 border border-amber-500/10 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(245, 158, 11, 0.08) 0deg, transparent 90deg)',
              }}
            />
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20"
            >
              <Layers size={12} />
            </motion.div>
          </div>
        );
      default:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-rose-500/25 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-650 border border-rose-500/20"
            >
              <Award size={12} />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className={`p-8 rounded-[3rem] border transition-all duration-500 hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] flex flex-col items-center text-center relative overflow-hidden backdrop-blur-xl group ${
        isSelfHovered
          ? 'bg-white border-transparent'
          : isDimmed
            ? 'border-slate-100 opacity-45 scale-[0.985] blur-[0.5px]'
            : 'border-slate-200/50 bg-white/40 shadow-sm'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 8}deg) rotateY(${tilt.x * 8}deg) scale3d(${isSelfHovered ? 1.015 : 1}, ${isSelfHovered ? 1.015 : 1}, 1)`,
        transformStyle: "preserve-3d",
        boxShadow: isSelfHovered ? `0 25px 60px -15px ${cat.glowColor}` : 'none'
      }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, ${cat.glowColor}, transparent 80%)`,
        }}
      />

      {/* Razor-Thin border laser sweep */}
      <div
        className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${cat.laserColor}, transparent 80%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Technical monospaced identifier inside the card */}
        <span className="text-[6px] font-mono text-slate-400 group-hover:text-slate-500 mb-4 transition-colors select-none tracking-widest">
          [SYS_NODE: {cat.systemCode}]
        </span>

        <div className={`w-16 h-16 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-800 group-hover:shadow-lg transition-all duration-300 transform group-hover:rotate-6`}>
          {renderCategoryIcon()}
        </div>
        
        <h4 className="font-black text-primary text-base tracking-tight mb-4 group-hover:scale-[1.02] transition-transform select-none uppercase">
          {cat.title}
        </h4>
        
        <span className={`text-[9px] font-black uppercase tracking-widest border px-3 py-1 rounded-full transition-colors select-none shadow-sm ${cat.badgeClass}`}>
          {cat.count}
        </span>
      </div>

      {/* Decorative Corner Accents styled according to hover */}
      <div 
        className="absolute top-6 left-6 w-3 h-3 border-t border-l transition-colors duration-300" 
        style={{ borderColor: isSelfHovered ? cat.laserColor : 'rgba(226, 232, 240, 1)' }}
      />
      <div 
        className="absolute top-6 right-6 w-3 h-3 border-t border-r transition-colors duration-300" 
        style={{ borderColor: isSelfHovered ? cat.laserColor : 'rgba(226, 232, 240, 1)' }}
      />
      <div 
        className="absolute bottom-6 left-6 w-3 h-3 border-b border-l transition-colors duration-300" 
        style={{ borderColor: isSelfHovered ? cat.laserColor : 'rgba(226, 232, 240, 1)' }}
      />
      <div 
        className="absolute bottom-6 right-6 w-3 h-3 border-b border-r transition-colors duration-300" 
        style={{ borderColor: isSelfHovered ? cat.laserColor : 'rgba(226, 232, 240, 1)' }}
      />
    </motion.div>
  );
};

const ResourceCard = ({
  res,
  index,
  hoveredResource,
  setHoveredResource
}: {
  res: { id: string; title: string; category: string; desc: string };
  index: number;
  hoveredResource: number | null;
  setHoveredResource: (i: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredResource(index);
  };

  const isSelfHovered = hoveredResource === index;
  const isDimmed = hoveredResource !== null && hoveredResource !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredResource(null)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group h-full relative`}
    >
      <Link 
        to={`/resources/${res.id}`} 
        className={`block p-10 rounded-[3.5rem] border transition-all duration-500 h-full relative overflow-hidden backdrop-blur-xl ${
          isSelfHovered
            ? 'border-amber-500/35 bg-white shadow-[0_0_60px_rgba(245,158,11,0.06)] scale-[1.015]'
            : isDimmed
              ? 'border-slate-100 opacity-45 scale-[0.985] blur-[0.5px]'
              : 'border-slate-200/50 bg-white/40 shadow-sm'
        }`}
      >
        {/* Background Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            opacity: isSelfHovered ? 1 : 0,
            background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.04), transparent 80%)`,
          }}
        />

        {/* Razor Border Laser */}
        <div
          className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
          style={{
            background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.35), transparent 80%)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="w-14 h-14 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-center text-slate-400 mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/15 transition-all duration-300 transform group-hover:rotate-6">
              <Book size={28} />
            </div>

            {/* Cyber-Badge Metadata details */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                [CATALOG: 00{index + 1}]
              </span>
              <span className="text-[8px] font-black text-amber-600/80 uppercase tracking-widest bg-amber-50 border border-amber-100/50 px-2 py-0.5 rounded">
                [VERIFIED]
              </span>
            </div>

            <h3 className="text-2xl font-black text-primary mb-4 tracking-tight group-hover:text-amber-500 transition-colors italic-small">{res.title}</h3>
            <p className="text-slate-500 text-sm font-semibold mb-8 leading-relaxed italic-small">{res.desc}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary pt-4 border-t border-slate-100 group-hover:text-amber-500 transition-colors shrink-0">
            <span>Get Module</span> 
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>

        {/* Decorative corner quotes */}
        <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-slate-200 group-hover:border-amber-500/20" />
        <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-slate-200 group-hover:border-amber-500/20" />
        <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-slate-200 group-hover:border-amber-500/20" />
        <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-slate-200 group-hover:border-amber-500/20" />
      </Link>
    </motion.div>
  );
};

export const ResourcesPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredResource, setHoveredResource] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const CATEGORIES = [
    { 
      title: "Physics Notes", 
      count: "140+ Modules", 
      themeColor: "indigo",
      systemCode: "PHY_01",
      glowColor: "rgba(99, 102, 241, 0.15)",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeClass: "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100",
      accentText: "text-indigo-650"
    },
    { 
      title: "Chemistry Notes", 
      count: "120+ Modules", 
      themeColor: "emerald",
      systemCode: "CHM_02",
      glowColor: "rgba(16, 185, 129, 0.15)",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeClass: "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100",
      accentText: "text-emerald-650"
    },
    { 
      title: "Previous Papers", 
      count: "50+ Exams", 
      themeColor: "amber",
      systemCode: "PPR_03",
      glowColor: "rgba(245, 158, 11, 0.15)",
      laserColor: "rgba(245, 158, 11, 0.4)",
      badgeClass: "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100",
      accentText: "text-amber-650"
    },
    { 
      title: "Study Planner", 
      count: "10+ Blueprints", 
      themeColor: "rose",
      systemCode: "PLN_04",
      glowColor: "rgba(244, 63, 94, 0.15)",
      laserColor: "rgba(244, 63, 94, 0.4)",
      badgeClass: "bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100",
      accentText: "text-rose-650"
    }
  ];

  const ALL_RESOURCES = [
    { id: 'physics-notes', title: "Mechanics Vol. 1", category: "Physics Notes", desc: "Laws of motion and rotational dynamics." },
    { id: 'chemistry-notes', title: "Organic Mechanisms", category: "Chemistry Notes", desc: "Detailed reaction pathways and states." },
    { id: 'prev-papers', title: "JEE Adv 2024 Solved", category: "Previous Papers", desc: "Full paper with official solutions." },
    { id: 'study-planner', title: "Master 90-Day Plan", category: "Study Planner", desc: "Board + Competitive balancing act." }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* 1. Resource Hero */}
      <section 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
        className="pt-32 pb-24 bg-[#060813] relative overflow-hidden text-white border-b border-white/5"
      >
        {/* Spotlight dynamic glow */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: isHovered 
              ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.07), rgba(245, 158, 11, 0.02) 50%, transparent 80%)`
              : 'none'
          }}
        />

        {/* Warp background mesh lines */}
        <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

        {/* 3D Telemetry cards drifting */}
        <FloatingTelemetryCard delay={0.1} initialX="10%" initialY="20%" mousePos={mousePos}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span>[CATALOG_SYNC: ACTIVE]</span>
          </div>
        </FloatingTelemetryCard>
        
        <FloatingTelemetryCard delay={0.2} initialX="80%" initialY="60%" mousePos={mousePos}>
          <div className="flex items-center gap-2 text-amber-500">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            <span>[TOTAL_DRIVES: 320 GB]</span>
          </div>
        </FloatingTelemetryCard>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-8 shadow-2xl backdrop-blur-md"
          >
            <Sparkles size={11} className="text-indigo-400 animate-bounce" />
            <span>Digital Learning Library</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter uppercase leading-none select-none">
            Academic <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black">Vault.</span>
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto font-medium text-sm md:text-base leading-relaxed">
            Free, premium resources curated by the best academic minds in India. Download modules, planners, and previous year papers instantly.
          </p>
          
          {/* Cyber-Search Console Bezel */}
          <div className={`mt-12 max-w-xl mx-auto relative group rounded-[2.5rem] p-1.5 transition-all duration-500 border ${
            searchFocus 
              ? 'border-indigo-500/40 bg-white/[0.08] shadow-[0_0_50px_rgba(99,102,241,0.12)] scale-[1.02]' 
              : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
          }`}>
            <div className="flex items-center gap-4 px-5 py-3 relative z-10">
              <Search className={`text-slate-500 transition-colors duration-300 ${searchFocus ? 'text-indigo-400' : ''}`} size={20} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                className="w-full bg-transparent outline-none font-bold text-white placeholder:text-slate-600 py-2.5"
              />
              <div className="flex items-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center hover:scale-105 shadow-xl shadow-secondary/10"
                >
                  <Filter size={18} />
                </motion.button>
              </div>
            </div>

            {/* Neon laser expand underline */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-500 ${
              searchFocus ? 'w-4/5 opacity-100' : 'w-0 opacity-0'
            }`} />
          </div>

        </div>
      </section>

      {/* 2. Quick Categories (Examples) */}
      <section className="py-16 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {CATEGORIES.map((cat, i) => (
                 <CategoryCard
                   key={i}
                   cat={cat}
                   index={i}
                   hoveredCategory={hoveredCategory}
                   setHoveredCategory={setHoveredCategory}
                 />
               ))}
            </div>
         </div>
      </section>

      {/* 3. Lead Magnets (Notes/Papers List) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-end justify-between mb-16">
              <div>
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm"
                 >
                   <Sparkles size={10} className="text-amber-500" />
                   <span>Weekly Catalog Sync</span>
                 </motion.div>
                 <h2 className="text-4xl font-black text-primary tracking-tighter mb-2 uppercase leading-none select-none">
                   LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">UPLOADS.</span>
                 </h2>
                 <p className="text-slate-500 font-semibold text-sm">Bestselling modules synced this week.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ALL_RESOURCES.map((res, i) => (
                <ResourceCard
                  key={i}
                  res={res}
                  index={i}
                  hoveredResource={hoveredResource}
                  setHoveredResource={setHoveredResource}
                />
              ))}
           </div>
        </div>
      </section>

      {/* 4. Demo Class Integration - The "Next Step" Call to Action */}
      <div className="pt-32 border-t border-slate-200/60 mt-16 bg-[#FAF9F6]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-5 shadow-sm">
              <Sparkles size={11} className="text-indigo-500 animate-pulse" />
              <span>Level Up Your Preparation</span>
            </div>
            <h2 className="text-5xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none">
              FINISHED READING? <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">EXPERIENCE IT LIVE.</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto font-semibold text-sm">
              Downloading notes is just the beginning. Book a free demo class to see how these concepts are applied by our master faculty.
            </p>
         </div>

         <DemoBenefits />
         <DemoExperience />
         <DemoBooking />
      </div>
    </div>
  );
};
