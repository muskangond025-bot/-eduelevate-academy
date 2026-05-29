import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldCheck, Sparkles, Activity } from 'lucide-react';

const features = [
  { name: "Batch Intensity", trad: "60-100 Students", pro: "Max 30 Students", speed: "3x Focus" },
  { name: "Personal Mentoring", trad: "Shared Query Counters", pro: "1-on-1 Assigned Dedicated Mentor", speed: "1-on-1" },
  { name: "Testing Rhythm", trad: "Bi-weekly / Monthly", pro: "Daily Micro-Tests & Assessment", speed: "Daily" },
  { name: "Smart Analytics", trad: "Manual Scorecards", pro: "AI-Powered Weak Spot Analysis", speed: "1.2s Feed" },
  { name: "Study Modules", trad: "Market-bought Publications", pro: "In-house R&D Content + Portal", speed: "R&D built" },
  { name: "Parent Connectivity", trad: "Intermittent Reports", pro: "Real-time Attendance & Performance App", speed: "Real-time" },
];

export const CourseComparison = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-32 bg-slate-50/50 relative overflow-hidden"
    >
      {/* Background blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic ambient spotlight */}
      <AnimatePresence>
        {hoveredRow !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none rounded-full blur-[140px] -z-10 bg-indigo-500/5"
            style={{
              left: `${mousePos.x - 200}px`,
              top: `${mousePos.y - 200}px`,
              width: '400px',
              height: '400px',
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm"
          >
            System Metrics Comparison
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-primary tracking-tighter mb-4 uppercase leading-none"
          >
            Methodology <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">Battle</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto font-medium text-sm leading-relaxed"
          >
            Discover how our specialized digital and physical ecosystem completely redefines the coaching experience.
          </motion.p>
        </div>

        {/* Comparison Console Board */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100/80">
           {/* Header Row */}
           <div className="grid grid-cols-1 lg:grid-cols-3 bg-slate-955 text-white border-b border-white/5">
              <div className="p-8 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/5">
                 <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Feature Metric</div>
              </div>
              <div className="p-8 text-center border-b lg:border-b-0 lg:border-r border-white/5">
                 <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Traditional Coaching</div>
              </div>
              <div className="p-8 text-center bg-gradient-to-r from-secondary to-indigo-600">
                 <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white flex items-center justify-center gap-1.5">
                   <Sparkles size={12} className="text-amber-300 animate-pulse" />
                   <span>AcademyPro Elite</span>
                 </div>
              </div>
           </div>

           {/* Features rows */}
           <div className="divide-y divide-slate-100/60">
              {features.map((item, i) => {
                const isHovered = hoveredRow === i;
                const isDimmed = hoveredRow !== null && hoveredRow !== i;

                return (
                  <div 
                    key={i} 
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`grid grid-cols-1 lg:grid-cols-3 transition-all duration-300 group cursor-pointer ${
                      isHovered 
                        ? 'bg-indigo-50/10 scale-[1.005] z-10 shadow-lg' 
                        : 'hover:bg-slate-50'
                    } ${isDimmed ? 'opacity-55' : 'opacity-100'}`}
                  >
                      {/* Metric Name */}
                      <div className="p-8 flex items-center justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-slate-100/60">
                         <span className={`text-base font-black tracking-tight transition-colors ${isHovered ? 'text-indigo-600 font-bold' : 'text-primary'}`}>{item.name}</span>
                      </div>
                      
                      {/* Traditional Column */}
                      <div className="p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100/60 bg-slate-50/30">
                         <div className="flex items-center gap-2.5 text-slate-400 font-bold text-xs">
                            <X size={15} className="text-rose-400/80 shrink-0" /> 
                            <span>{item.trad}</span>
                         </div>
                      </div>
                      
                      {/* AcademyPro Elite Column */}
                      <div className="p-8 flex items-center justify-between bg-indigo-50/5 px-8">
                         <div className="flex items-center gap-3 text-indigo-600 font-black text-xs">
                            <ShieldCheck size={18} className="text-indigo-600 shrink-0 animate-pulse" /> 
                            <span className="tracking-tight">{item.pro}</span>
                         </div>
                         
                         {/* Live Speed telemetry tag drawer */}
                         <div className="h-6 overflow-hidden relative min-w-[70px] text-right hidden sm:block">
                           <AnimatePresence mode="wait">
                             {isHovered ? (
                               <motion.div
                                 key="speed"
                                 initial={{ y: 15, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: -15, opacity: 0 }}
                                 className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md"
                               >
                                 <Activity size={10} className="animate-pulse" />
                                 <span>{item.speed}</span>
                               </motion.div>
                             ) : (
                               <motion.span
                                 key="verified"
                                 initial={{ y: -15, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: 15, opacity: 0 }}
                                 className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50/50 border border-indigo-100 px-2 py-0.5 rounded-md"
                               >
                                 VERIFIED
                               </motion.span>
                             )}
                           </AnimatePresence>
                         </div>
                      </div>
                  </div>
                );
              })}
           </div>
           
           <div className="p-8 bg-slate-50/40 text-center border-t border-slate-100/60">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Calculated based on 2024 Institute Performance Audits</p>
           </div>
        </div>
      </div>
    </section>
  );
};
