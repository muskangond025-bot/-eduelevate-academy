import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Bell, Search, User, Sparkles, Star, Award } from 'lucide-react';

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
      className="pt-12 pb-24 bg-[#FAF9F6] relative overflow-hidden"
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

          <div className="flex h-[620px]">
            {/* Sidebar */}
            <div className="w-20 lg:w-24 bg-slate-50 flex flex-col items-center py-10 gap-8 relative select-none shrink-0 border-r border-slate-150">
               <div className="w-10 h-10 bg-indigo-650 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 transform hover:scale-105 transition-transform duration-300">A</div>
               <div className="flex flex-col gap-6 text-slate-400 relative z-10 w-full px-4 items-center">
                  
                  {/* Dashboard */}
                  <button 
                    onClick={() => setActiveTab("dashboard")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center cursor-pointer ${
                      activeTab === "dashboard" ? 'text-indigo-600 bg-indigo-50 border border-indigo-100/50 shadow-sm' : 'text-slate-400 hover:text-indigo-650 hover:bg-indigo-50/30'
                    }`}
                  >
                    <LayoutDashboard size={20} />
                  </button>
                  
                  {/* Notification */}
                  <button 
                    onClick={() => setActiveTab("notifications")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center cursor-pointer ${
                      activeTab === "notifications" ? 'text-indigo-600 bg-indigo-50 border border-indigo-100/50 shadow-sm' : 'text-slate-400 hover:text-indigo-650 hover:bg-indigo-50/30'
                    }`}
                  >
                    <Bell size={20} className={activeTab === "notifications" ? "animate-pulse" : ""} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-slate-50 animate-pulse" />
                  </button>
                  
                  {/* Search */}
                  <button 
                    onClick={() => setActiveTab("search")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center cursor-pointer ${
                      activeTab === "search" ? 'text-indigo-600 bg-indigo-50 border border-indigo-100/50 shadow-sm' : 'text-slate-400 hover:text-indigo-650 hover:bg-indigo-50/30'
                    }`}
                  >
                    <Search size={20} />
                  </button>
                  
                  {/* User profile */}
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`p-3 rounded-xl transition-all relative w-12 h-12 flex items-center justify-center mt-32 cursor-pointer ${
                      activeTab === "profile" ? 'text-indigo-600 bg-indigo-50 border border-indigo-100/50 shadow-sm' : 'text-slate-400 hover:text-indigo-650 hover:bg-indigo-50/30'
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
                       <span className="text-indigo-650 bg-indigo-5 border border-indigo-100/50 px-2 py-0.5 rounded">[TARGET: JEE ADV 2026]</span>
                       <span>// Mapped Node</span>
                     </div>
                  </div>
                  <div className="px-5 py-2 bg-slate-100 border border-slate-200/50 rounded-full text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">Batch: Elite-A</div>
               </div>

               <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
                 <AnimatePresence mode="wait">
                   {activeTab === "dashboard" && (
                     <motion.div
                       key="dashboard"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="flex flex-col gap-8 flex-1"
                     >
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
                     </motion.div>
                   )}

                   {activeTab === "notifications" && (
                     <motion.div
                       key="notifications"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="flex flex-col gap-6 flex-1 justify-center"
                     >
                       <h4 className="text-base font-black text-primary uppercase tracking-tight mb-2 pl-2">Recent Academic Alerts</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-3xl flex gap-4 items-start shadow-sm hover:bg-emerald-50 transition-colors">
                           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-black text-indigo-950 uppercase leading-none mb-1">Physics Mock Test Graded</div>
                             <div className="text-[11px] text-slate-550 font-semibold mb-2">Rigid Body Dynamics (Vol. II) // Score: 92/120</div>
                             <span className="font-mono text-[7px] text-emerald-650 bg-emerald-100/50 border border-emerald-200/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">[AIR 142 // CALIBRATED]</span>
                           </div>
                         </div>
                         
                         <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-3xl flex gap-4 items-start shadow-sm hover:bg-indigo-50 transition-colors">
                           <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-black text-indigo-950 uppercase leading-none mb-1">Weekly Report Generated</div>
                             <div className="text-[11px] text-slate-550 font-semibold mb-2">Weekly Roadmap sync complete. WhatsApp PDF is ready.</div>
                             <span className="font-mono text-[7px] text-indigo-650 bg-indigo-100/50 border border-indigo-200/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">[ROADMAP_SYNC // STABLE]</span>
                           </div>
                         </div>

                         <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-3xl flex gap-4 items-start shadow-sm hover:bg-amber-50 transition-colors">
                           <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-black text-indigo-950 uppercase leading-none mb-1">Mathematics Rank Analysis</div>
                             <div className="text-[11px] text-slate-550 font-semibold mb-2">Calculus diagnostic review complete. Weak concept sub-topic identified.</div>
                             <span className="font-mono text-[7px] text-amber-650 bg-amber-100/50 border border-amber-200/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">[CONCEPT_GAP // DIAGNOSED]</span>
                           </div>
                         </div>

                         <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-3xl flex gap-4 items-start shadow-sm hover:bg-slate-100 transition-colors">
                           <span className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-black text-indigo-950 uppercase leading-none mb-1">Daily Ingestion Task Uploaded</div>
                             <div className="text-[11px] text-slate-550 font-semibold mb-2">Organic Chemistry (Vol. I) flashcards added by Prof. Verma.</div>
                             <span className="font-mono text-[7px] text-slate-550 bg-slate-100 border border-slate-200/40 px-2 py-0.5 rounded font-bold uppercase tracking-widest">[INGEST_TASK // PENDING]</span>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   )}

                   {activeTab === "search" && (
                     <motion.div
                       key="search"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="flex flex-col gap-6 flex-1 justify-center"
                     >
                       <h4 className="text-base font-black text-primary uppercase tracking-tight pl-2">Search Academic Directory</h4>
                       <div className="relative mx-2">
                         <input 
                           type="text" 
                           placeholder="Search tests, topics, formulas, syllabus matrices..."
                           className="w-full px-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-primary focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                         />
                         <Search size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
                       </div>
                       <div className="mt-2 pl-2">
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Quick Filter Directories</div>
                         <div className="flex flex-wrap gap-2.5">
                           {["Mock Tests", "Weekly Diagnostics", "Physics Syllabus", "Chemistry Matrices", "Calculus Roadmaps"].map((filter) => (
                             <span key={filter} className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 cursor-pointer transition-colors shadow-sm">{filter}</span>
                           ))}
                         </div>
                       </div>
                     </motion.div>
                   )}

                   {activeTab === "profile" && (
                     <motion.div
                       key="profile"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="flex flex-col gap-6 flex-1 justify-center"
                     >
                       <h4 className="text-base font-black text-primary uppercase tracking-tight pl-2">Rohan's Academic Profile</h4>
                       <div className="mx-2 p-6.5 bg-slate-50/50 border border-slate-200 rounded-3xl shadow-md flex flex-col md:flex-row gap-6 items-center justify-between">
                         <div className="flex gap-5 items-center flex-col md:flex-row text-center md:text-left">
                           <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 select-none shrink-0">
                             R
                           </div>
                           <div>
                             <h5 className="text-xl font-black text-primary leading-tight">Rohan Sengupta</h5>
                             <div className="text-[11px] text-slate-400 font-semibold mb-1">Elite Batch JEE 2026 // Student HUD: Active</div>
                             <span className="font-mono text-[8px] text-indigo-650 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded font-bold uppercase tracking-widest">[TARGET: IIT BOMBAY // AIR_GOAL: &lt;100]</span>
                           </div>
                         </div>
                         
                         <div className="flex gap-4 md:border-l border-slate-150 md:pl-6 w-full md:w-auto justify-around">
                           <div className="text-center">
                             <div className="text-2xl font-black text-primary font-mono tracking-tight leading-none mb-1">A+</div>
                             <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest">Grade</div>
                           </div>
                           <div className="text-center">
                             <div className="text-2xl font-black text-primary font-mono tracking-tight leading-none mb-1">#12</div>
                             <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest">Rank</div>
                           </div>
                           <div className="text-center">
                             <div className="text-2xl font-black text-primary font-mono tracking-tight leading-none mb-1">98.2%</div>
                             <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest">Attendance</div>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
