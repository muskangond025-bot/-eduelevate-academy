import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StreamSelectionGuidance = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const streams = [
    { label: "Engineering", tag: "JEE Mains & Adv", color: "rgba(59, 130, 246, 0.06)", border: "hover:border-blue-500/30", textGlow: "text-blue-400" },
    { label: "Medical", tag: "NEET Focus Track", color: "rgba(239, 68, 68, 0.06)", border: "hover:border-red-500/30", textGlow: "text-red-400" },
    { label: "Pure Science", tag: "IISER & Olympiad", color: "rgba(16, 185, 129, 0.06)", border: "hover:border-emerald-500/30", textGlow: "text-emerald-400" },
    { label: "Technical Services", tag: "NDA & SAT Path", color: "rgba(245, 158, 11, 0.06)", border: "hover:border-amber-500/30", textGlow: "text-amber-400" }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          onMouseMove={handleMouseMove}
          className="bg-slate-950 rounded-[4rem] p-12 lg:p-20 border border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl"
        >
          {/* Spotlight Cursor Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.06), transparent 80%)`
            }}
          />

          {/* Dotted Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Left panel */}
          <div className="w-full lg:w-1/2 relative z-20">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center text-indigo-400 mb-8 border border-white/10 shadow-inner"
            >
               <Compass size={28} className="animate-spin-slow" />
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-tight uppercase overflow-visible py-1">
              Confused about{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-500 italic px-1">Stream Choice?</span>
            </h2>
            
            <p className="text-slate-400 text-base font-medium mb-12 max-w-md leading-relaxed">
              Choosing the right stream is the most critical career decision. Take our scientific aptitude test or speak with an expert mentor today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
               <button 
                 onClick={() => navigate('/scholarship')}
                 className="py-4 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer"
               >
                 Aptitude Test <HelpCircle size={14} />
               </button>
               <button 
                 onClick={() => navigate('/counseling/call')}
                 className="group py-4 px-8 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
               >
                 Book Counselor <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full lg:w-1/2 relative z-20">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {streams.map((st, i) => {
                  const isHovered = hoveredIndex === i;
                  const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

                  return (
                    <motion.div 
                      key={i}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`p-8 rounded-[2.5rem] border-2 bg-white/[0.02] backdrop-blur-md flex flex-col justify-end min-h-[170px] transition-all duration-300 ${
                        isHovered 
                          ? st.border + ' shadow-2xl scale-[1.03] z-10 bg-white/[0.04]' 
                          : 'border-white/5 shadow-sm'
                      } ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
                      style={{
                        background: isHovered ? st.color : ''
                      }}
                    >
                      <div className="text-white font-black text-xl tracking-tight leading-none mb-1">{st.label}</div>
                      
                      {/* Sliding dynamic metrics drawer */}
                      <div className="h-8 overflow-hidden relative mt-2">
                        <AnimatePresence mode="wait">
                          {isHovered ? (
                            <motion.div
                              key="metric"
                              initial={{ y: 15, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -15, opacity: 0 }}
                              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"
                            >
                              <Sparkles size={10} className="text-amber-500 animate-pulse" />
                              <span className={st.textGlow}>{st.tag}</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="static"
                              initial={{ y: -15, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 15, opacity: 0 }}
                              className="text-[9px] font-bold text-slate-500 uppercase tracking-widest"
                            >
                              Guidance Path
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
