import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Target, PenTool, BarChart2, MessageSquare, Clock, Sparkles, ChevronRight } from 'lucide-react';

const steps = [
  { 
    icon: <BookOpen />, 
    title: "Conceptual Onboarding", 
    desc: "Starting from first principles. We ensure zero gaps in basic understanding before moving to complexity.",
    achievement: "★ Concept Mapped",
    color: "rgba(59, 130, 246, 0.08)", // Blue
    glowLight: "bg-blue-50 text-blue-600 border-blue-100/50"
  },
  { 
    icon: <PenTool />, 
    title: "The Solver's Workshop", 
    desc: "Rigorous daily practice using our 'Reverse Engineering' problem solving method.",
    achievement: "★ Rigorous Practice",
    color: "rgba(168, 85, 247, 0.08)", // Purple
    glowLight: "bg-purple-50 text-purple-600 border-purple-100/50"
  },
  { 
    icon: <Target />, 
    title: "Micro-Assessment", 
    desc: "Daily 15-minute diagnostic checks to identify retention leaks immediately.",
    achievement: "★ Daily 15-Min Test",
    color: "rgba(245, 158, 11, 0.08)", // Amber
    glowLight: "bg-amber-50 text-amber-600 border-amber-100/50"
  },
  { 
    icon: <BarChart2 />, 
    title: "AI-Performance Audit", 
    desc: "Our platform maps your weak spots across topics, sub-topics, and question types.",
    achievement: "★ 1.2s Analytics",
    color: "rgba(16, 185, 129, 0.08)", // Emerald
    glowLight: "bg-emerald-50 text-emerald-600 border-emerald-100/50"
  },
  { 
    icon: <MessageSquare />, 
    title: "1-on-1 Mentoring", 
    desc: "Weekly sit-down with your academic mentor to recalibrate strategy and clear backlogs.",
    achievement: "★ Weekly recalibration",
    color: "rgba(99, 102, 241, 0.08)", // Indigo
    glowLight: "bg-indigo-50 text-indigo-600 border-indigo-100/50"
  },
  { 
    icon: <Clock />, 
    title: "The Marathon Test", 
    desc: "Simulated exam conditions twice a month to build mental stamina and speed.",
    achievement: "★ Bi-weekly Mock Tests",
    color: "rgba(236, 72, 153, 0.08)", // Pink
    glowLight: "bg-pink-50 text-pink-600 border-pink-100/50"
  },
];

export const StudyMethodology = () => {
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
      className="py-32 bg-white relative overflow-hidden"
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
              background: steps[hoveredCard].color,
              transition: 'background 0.5s ease'
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left Sticky Panel */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm">
              The Engine Room
            </div>
            <h2 className="text-5xl font-black text-primary tracking-tighter leading-tight mb-8 uppercase overflow-visible py-1">
              Study{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic px-1">Methodology</span>
            </h2>
            <p className="text-slate-500 text-base font-medium leading-relaxed mb-10 max-w-sm">
              Our 6-step methodology is designed to eliminate academic uncertainty and build peak performance muscle.
            </p>
            <div className="w-20 h-2 bg-gradient-to-r from-secondary to-indigo-600 rounded-full animate-pulse" />
          </div>

          {/* Right Cards Deck */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {steps.map((item, i) => {
              const isHovered = hoveredCard === i;
              const isDimmed = hoveredCard !== null && hoveredCard !== i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
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
                        ? item.glowLight + ' scale-110 shadow-inner animate-pulse' 
                        : 'bg-slate-50 border-slate-100 text-slate-500'
                    }`}>
                      {React.cloneElement(item.icon as React.ReactElement, { 
                        size: 26, 
                        className: isHovered 
                          ? i === 0 
                            ? 'scale-110 transition-transform' 
                            : i === 1 
                              ? 'animate-bounce text-purple-600' 
                              : i === 2 
                                ? 'scale-110 rotate-12 transition-transform'
                                : i === 3
                                  ? 'animate-pulse'
                                  : i === 4
                                    ? 'animate-bounce'
                                    : 'animate-spin-slow'
                          : '' 
                      })}
                    </div>
                    
                    <h4 className="text-2xl font-black text-primary mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{item.desc}</p>
                  </div>

                  {/* Sliding dynamic metrics drawer */}
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
                          <span>Step Details</span>
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
      </div>
    </section>
  );
};
