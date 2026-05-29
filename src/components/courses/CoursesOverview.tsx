import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Zap, Shield, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

const streams = [
  { 
    title: "Integrated Foundation", 
    desc: "Seamless bridge between school boards and competitive logic.", 
    icon: <Shield />,
    tag: "Grade 11 & 12",
    achievement: "★ CBSE + JEE Mapped",
    color: "rgba(245, 158, 11, 0.08)", // Amber
    glow: "shadow-amber-500/10 border-amber-200/60 text-amber-500",
    glowLight: "bg-amber-50 text-amber-600 border-amber-100/50"
  },
  { 
    title: "Competitive Elite", 
    desc: "Rigorous training for JEE, NEET, and National Olympiads.", 
    icon: <Zap />,
    tag: "Mains & Adv",
    achievement: "★ 99.9% Perfect Ranks",
    color: "rgba(79, 70, 229, 0.08)", // Indigo
    glow: "shadow-indigo-500/10 border-indigo-200/60 text-indigo-500",
    glowLight: "bg-indigo-50 text-indigo-600 border-indigo-100/50"
  },
  { 
    title: "State Excellence", 
    desc: "Speed-focused preparation for MHT-CET and state boards.", 
    icon: <Target />,
    tag: "State Level",
    achievement: "★ MHT-CET Specialty",
    color: "rgba(168, 85, 247, 0.08)", // Purple
    glow: "shadow-purple-500/10 border-purple-200/60 text-purple-500",
    glowLight: "bg-purple-50 text-purple-600 border-purple-100/50"
  },
  { 
    title: "Defense Warriors", 
    desc: "Character and knowledge building for NDA aspirants.", 
    icon: <ShieldAlert />,
    tag: "UPSC Standard",
    achievement: "★ SSB Prep Modules",
    color: "rgba(16, 185, 129, 0.08)", // Emerald
    glow: "shadow-emerald-500/10 border-emerald-200/60 text-emerald-500",
    glowLight: "bg-emerald-50 text-emerald-600 border-emerald-100/50"
  }
];

export const CoursesOverview = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

      {/* Dynamic Ambient backglow */}
      <AnimatePresence>
        {hoveredCard !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none rounded-full blur-[140px] -z-10"
            style={{
              left: `${mousePos.x - 200}px`,
              top: `${mousePos.y - 200}px`,
              width: '400px',
              height: '400px',
              background: streams[hoveredCard].color,
              transition: 'background 0.5s ease'
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm"
          >
            Academic Scope
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-primary tracking-tighter mb-4 uppercase leading-none"
          >
            Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto font-medium text-sm leading-relaxed"
          >
            We offer a holistic range of programs designed to cater to every ambitious student's needs and build rigorous foundations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {streams.map((item, i) => {
            const isHovered = hoveredCard === i;
            const isDimmed = hoveredCard !== null && hoveredCard !== i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group p-10 rounded-[3rem] bg-white border-2 text-left flex flex-col justify-between transition-all duration-500 relative ${
                  isHovered 
                    ? 'border-indigo-600/30 shadow-2xl scale-[1.03] -translate-y-3 z-25 bg-white/95 backdrop-blur-md' 
                    : 'border-slate-100 hover:border-indigo-200 bg-white/90 shadow-sm'
                } ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
              >
                <div>
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 border shadow-sm transition-all duration-500 ${
                    isHovered 
                      ? item.glowLight + ' scale-110 shadow-inner' 
                      : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}>
                    {React.cloneElement(item.icon as React.ReactElement, { 
                      size: 26, 
                      className: isHovered 
                        ? i === 0 
                          ? 'animate-bounce' 
                          : i === 1 
                            ? 'animate-pulse text-indigo-600' 
                            : i === 2 
                              ? 'scale-110 rotate-12 transition-transform'
                              : 'animate-pulse' 
                        : '' 
                    })}
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{item.tag}</div>
                  <h3 className="text-2xl font-black text-primary mb-4 leading-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{item.desc}</p>
                </div>

                {/* Sliding metrics drawer on hover */}
                <div className="h-10 overflow-hidden relative mt-4">
                  <AnimatePresence mode="wait">
                    {isHovered ? (
                      <motion.div
                        key="ach"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1.5"
                      >
                        <Sparkles size={11} className="text-amber-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                          {item.achievement}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1 text-[9px] font-bold text-slate-400"
                      >
                        <span>Learn More</span>
                        <ChevronRight size={10} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
