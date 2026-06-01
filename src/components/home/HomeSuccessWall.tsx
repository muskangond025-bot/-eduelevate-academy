import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TOPPERS = [
  { 
    name: 'Rohan Deshmukh', 
    rank: 'AIR 14', 
    exam: 'JEE ADV 2024', 
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop',
    color: 'blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    score: '342 / 360',
    percentile: '99.99%',
    destination: 'IIT Bombay (CSE)',
    quote: '"The diagnostic assessments and instant doubt resolution helped me pinpoint and correct my conceptual gaps in Chemistry."'
  },
  { 
    name: 'Ananya Gupta', 
    rank: 'AIR 42', 
    exam: 'NEET 2024', 
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    color: 'rose',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    score: '710 / 720',
    percentile: '99.98%',
    destination: 'AIIMS New Delhi',
    quote: '"Having adaptive tests customized for my skill levels meant I never wasted time re-practicing topics I had already mastered."'
  },
  { 
    name: 'Siddharth Roy', 
    rank: 'AIR 88', 
    exam: 'MHT-CET 2024', 
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    color: 'amber',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    score: '198 / 200',
    percentile: '99.97%',
    destination: 'COEP Pune (CS)',
    quote: '"The peer leaderboards and micro-rank projections kept me constantly motivated to improve my accuracy day by day."'
  },
];

export const HomeSuccessWall = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activePath = hoveredIndex !== null ? TOPPERS[hoveredIndex] : null;

  return (
    <section className="pt-12 pb-32 bg-slate-50/40 relative overflow-hidden border-b border-slate-100">
      {/* 1. Subtle rotating award watermark */}
      <div className="absolute -top-12 -right-12 p-24 opacity-[0.03] rotate-12 text-slate-900 pointer-events-none animate-spin-slow">
        <Award size={360} />
      </div>

      {/* 2. Futuristic subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #0f172a 1.5px, transparent 0),
            linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
        }}
      />

      {/* 3. Interactive Ambient Glowing Background Ball */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.12] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: activePath ? activePath.accentColor : 'rgba(99, 102, 241, 0.4)',
          left: activePath ? `${(hoveredIndex ?? 0) * 33 + 15}%` : '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[48px] gap-8">
           <div>

              <h2 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 uppercase tracking-tighter mb-8 font-sans overflow-visible py-1">
                Hall Of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold italic px-1">
                  Victory.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl">
                Our students don't just clear exams; they redefine excellence on the national stage.
              </p>
           </div>

           {/* View Results Button */}
           <motion.button 
             whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' }}
             whileTap={{ scale: 0.98 }}
             onClick={() => navigate('/results')}
             className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all shadow-md"
           >
             <span className="relative z-10 flex items-center gap-2">
               View 2024 Results <Award size={16} className="group-hover:translate-x-1 transition-transform" />
             </span>
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           </motion.button>
        </div>

        {/* Toppers Cards Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOPPERS.map((t, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-[32px] rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[460px] ${
                  isHovered 
                    ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.06)]' 
                    : isAnyHovered 
                      ? 'border-slate-100/50 bg-white/40' 
                      : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
                }`}
                style={{
                  boxShadow: isHovered ? `0 30px 60px -10px ${t.glowColor}` : undefined,
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
                  opacity: isAnyHovered && !isHovered ? 0.65 : 1
                }}
              >
                <AnimatePresence mode="wait">
                  {!isHovered ? (
                    <motion.div
                      key="normal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center text-center h-full justify-between"
                    >
                      {/* Portrait image container */}
                      <div className="w-[88px] h-[88px] rounded-full border-4 border-slate-100 overflow-hidden shadow-md mb-6">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div>
                        <div className="text-6xl font-black tracking-tighter mb-1 text-slate-900 font-sans italic uppercase">
                          {t.rank}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: t.accentColor }}>
                          {t.exam}
                        </div>
                        
                        <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-2">
                          {t.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                          Score: {t.score} ({t.percentile})
                        </p>
                      </div>

                      <div className="flex gap-1" style={{ color: t.accentColor }}>
                        {[...Array(5)].map((_, starIdx) => (
                          <Star key={starIdx} size={14} fill="currentColor" className="animate-pulse" style={{ animationDelay: `${starIdx * 0.1}s` }} />
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="quote"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col justify-between h-full text-center py-4"
                    >
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-4">
                          Student Testimonial
                        </span>
                        <p className="text-sm md:text-base text-slate-600 font-semibold italic leading-relaxed px-2 mb-6">
                          {t.quote}
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-6">
                        <h4 className="text-xl font-black text-slate-900 mb-1">
                          {t.name}
                        </h4>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider" style={{ backgroundColor: t.accentColor }}>
                          Destination: {t.destination}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
