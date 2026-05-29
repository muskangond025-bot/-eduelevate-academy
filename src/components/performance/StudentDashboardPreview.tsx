import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Bell, Search, User, Sparkles } from 'lucide-react';

const StatsCard = ({
  title,
  value,
  bgClass,
  textClass,
  laserColor,
  index,
  hoveredStat,
  setHoveredStat
}: {
  title: string;
  value: string;
  bgClass: string;
  textClass: string;
  laserColor: string;
  index: number;
  hoveredStat: number | null;
  setHoveredStat: (i: number | null) => void;
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
    setHoveredStat(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredStat(null);
  };

  const isSelfHovered = hoveredStat === index;
  const isDimmed = hoveredStat !== null && hoveredStat !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/stat ${bgClass} ${
        isSelfHovered
          ? 'scale-[1.015] shadow-xl border-indigo-500/20'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-100/50'
            : 'shadow-sm border-slate-150/80 bg-white/50'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.015 : 1}, ${isSelfHovered ? 1.015 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.04), transparent 80%)`,
        }}
      />

      {/* Border Laser */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${laserColor}, transparent 80%)`,
          padding: '1.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <div className="relative z-10">
        <div className={`text-[9px] font-black uppercase tracking-widest mb-1.5 ${textClass}`}>{title}</div>
        <div className="text-2xl font-black text-primary tracking-tight">{value}</div>
      </div>
    </motion.div>
  );
};

export const StudentDashboardPreview = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

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

  const chartData = [40, 60, 45, 80, 55, 90, 70];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden"
    >
      {/* Blueprint Dotted Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Atmospheric nebulae spotlights */}
      <div className="absolute top-[15%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-5 shadow-sm"
          >
            <Sparkles size={11} className="text-indigo-500 animate-bounce" />
            <span>Interactive Workspace</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none"
          >
            STUDENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">DASHBOARD.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-md mx-auto"
          >
            A simplified, powerful interface for focused learners. Experience high-end tracking calibrations.
          </motion.p>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.97 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="bg-white rounded-[4rem] shadow-2xl border border-slate-200/80 overflow-hidden relative backdrop-blur-xl"
        >
          {/* Mock Dashboard browser controls header */}
          <div className="flex gap-1.5 py-3 px-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/10" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/10" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/10" />
            </div>
            
            <div className="bg-white border border-slate-200/60 rounded-lg px-6 py-1.5 text-[8.5px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
              <span>STUDENT_HUD_INTERFACE // localhost:3000</span>
            </div>
            
            <div className="w-12" /> {/* spacer */}
          </div>

          <div className="flex h-[620px]">
            {/* Sidebar */}
            <div className="w-20 lg:w-24 bg-slate-955 flex flex-col items-center py-10 gap-8 relative select-none shrink-0 border-r border-white/5">
               <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary font-black shadow-lg shadow-secondary/15 transform hover:scale-105 transition-transform duration-300">A</div>
               <div className="flex flex-col gap-6 text-slate-550 relative z-10 w-full px-4 items-center">
                  
                  {/* Dashboard */}
                  <button 
                    onClick={() => setActiveTab("dashboard")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center ${
                      activeTab === "dashboard" ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <LayoutDashboard size={20} />
                  </button>
                  
                  {/* Notification */}
                  <button 
                    onClick={() => setActiveTab("notifications")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center ${
                      activeTab === "notifications" ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <Bell size={20} className={activeTab === "notifications" ? "animate-pulse" : ""} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-slate-955 animate-pulse" />
                  </button>
                  
                  {/* Search */}
                  <button 
                    onClick={() => setActiveTab("search")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center ${
                      activeTab === "search" ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <Search size={20} />
                  </button>
                  
                  {/* User profile */}
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center mt-32 ${
                      activeTab === "profile" ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <User size={20} />
                  </button>
               </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-8 lg:p-12 overflow-hidden flex flex-col gap-10 bg-white/30 backdrop-blur-xl">
               {/* Top Bar */}
               <div className="flex justify-between items-center select-none">
                  <div>
                     <h3 className="text-2xl font-black text-primary tracking-tight">Welcome Back, Rohan!</h3>
                     <div className="flex items-center gap-2 mt-1 font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400">
                       <span className="text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded">[TARGET: JEE ADV 2026]</span>
                       <span>// Mapped Node</span>
                     </div>
                  </div>
                  <div className="px-5 py-2 bg-slate-100 border border-slate-200/50 rounded-full text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">Batch: Elite-A</div>
               </div>

               {/* Stats Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                 <StatsCard
                   title="Time Spent"
                   value="124 Hours"
                   bgClass="bg-indigo-50/20 border-indigo-100"
                   textClass="text-indigo-500"
                   laserColor="rgba(99, 102, 241, 0.3)"
                   index={0}
                   hoveredStat={hoveredStat}
                   setHoveredStat={setHoveredStat}
                 />
                 <StatsCard
                   title="Concept Mastery"
                   value="78%"
                   bgClass="bg-blue-50/20 border-blue-100"
                   textClass="text-blue-500"
                   laserColor="rgba(59, 130, 246, 0.3)"
                   index={1}
                   hoveredStat={hoveredStat}
                   setHoveredStat={setHoveredStat}
                 />
                 <StatsCard
                   title="Leaderboard"
                   value="Rank #12"
                   bgClass="bg-emerald-50/20 border-emerald-100"
                   textClass="text-emerald-500"
                   laserColor="rgba(16, 185, 129, 0.3)"
                   index={2}
                   hoveredStat={hoveredStat}
                   setHoveredStat={setHoveredStat}
                 />
               </div>

               {/* Chart Viewport Console */}
               <div className="flex-1 bg-slate-50/50 backdrop-blur-md rounded-[3rem] border border-slate-200/60 p-8 flex flex-col justify-between relative overflow-hidden group/chart">
                  {/* Graphic grid back */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                      backgroundSize: '16px 16px'
                    }}
                  />
                  
                  <div className="flex justify-between items-end h-full gap-4 relative z-10 select-none">
                     {chartData.map((h, i) => {
                       const isSelfHovered = hoveredBar === i;
                       const isDimmed = hoveredBar !== null && hoveredBar !== i;

                       return (
                         <div
                           key={i}
                           onMouseEnter={() => setHoveredBar(i)}
                           onMouseLeave={() => setHoveredBar(null)}
                           className="h-full flex-1 flex flex-col justify-end relative group/bar"
                         >
                           {/* Hover tooltip readouts */}
                           <AnimatePresence>
                             {isSelfHovered && (
                               <motion.div
                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                 animate={{ opacity: 1, y: 0, scale: 1 }}
                                 exit={{ opacity: 0, y: 5 }}
                                 className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white font-mono text-[8px] tracking-widest px-3 py-1.5 rounded-xl shadow-2xl z-35 flex flex-col items-center select-none"
                               >
                                 <span className="text-[10px] font-black text-indigo-400 block mb-0.5">{h}%</span>
                                 <span className="text-slate-400 block text-[6.5px]">SYNC_METRIC</span>
                               </motion.div>
                             )}
                           </AnimatePresence>

                           {/* Bar Column Vector */}
                           <motion.div 
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             className={`w-full rounded-t-2xl relative transition-all duration-300 ${
                               isSelfHovered 
                                 ? 'bg-gradient-to-t from-indigo-500 to-indigo-400 shadow-lg shadow-indigo-500/20 scale-x-105' 
                                 : isDimmed
                                   ? 'bg-primary/[0.04] opacity-50'
                                   : 'bg-primary/10'
                             }`}
                           />
                         </div>
                       );
                     })}
                  </div>
                  <div className="flex justify-between pt-6 border-t border-slate-200 mt-4 h-8 select-none relative z-10">
                     {days.map((d, i) => (
                       <span key={i} className="text-[9px] font-mono font-black text-slate-400 w-full text-center">{d}</span>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Overlay Tag */}
          <div className="absolute top-16 right-8 z-20 select-none">
             <div className="px-5 py-2.5 bg-white border border-slate-200 shadow-xl rounded-2xl font-black text-[9px] uppercase tracking-widest text-primary flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>Live Preview</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
