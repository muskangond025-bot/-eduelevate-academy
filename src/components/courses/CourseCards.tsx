import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Zap, Shield, BookOpen, Microscope, Award, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const allCourses = [
  { 
    id: "11th-science", 
    title: "11th Science", 
    sub: "Junior College Integrated", 
    desc: "Foundation for conceptual clarity in Physics, Chemistry, and Biology/Maths.", 
    icon: <Shield />, 
    type: "Academic",
    color: "rgba(59, 130, 246, 0.08)", // Blue
    glow: "shadow-blue-500/10 border-blue-200/50 text-blue-500",
    glowLight: "bg-blue-50 text-blue-600 border-blue-100/50"
  },
  { 
    id: "12th-science", 
    title: "12th Science", 
    sub: "Board & Entrance Sync", 
    desc: "Mastering the syllabus while preparing for competitive speed and accuracy.", 
    icon: <BookOpen />, 
    type: "Academic",
    color: "rgba(99, 102, 241, 0.08)", // Indigo
    glow: "shadow-indigo-500/10 border-indigo-200/50 text-indigo-500",
    glowLight: "bg-indigo-50 text-indigo-600 border-indigo-100/50"
  },
  { 
    id: "jee", 
    title: "JEE Advanced", 
    sub: "Engineering Mastery", 
    desc: "India's most rigorous program for IIT entrance. High-intensity problem solving.", 
    icon: <Zap />, 
    type: "Competitive",
    color: "rgba(168, 85, 247, 0.08)", // Purple
    glow: "shadow-purple-500/10 border-purple-200/50 text-purple-500",
    glowLight: "bg-purple-50 text-purple-600 border-purple-100/50"
  },
  { 
    id: "neet", 
    title: "NEET UG", 
    sub: "Medical Excellence", 
    desc: "Complete focus on AIIMS/NEET patterns with specialized biological diagrams training.", 
    icon: <Microscope />, 
    type: "Competitive",
    color: "rgba(236, 72, 153, 0.08)", // Pink
    glow: "shadow-pink-500/10 border-pink-200/50 text-pink-500",
    glowLight: "bg-pink-50 text-pink-600 border-pink-100/50"
  },
  { 
    id: "mht-cet", 
    title: "MHT-CET", 
    sub: "State Entrance", 
    desc: "Optimized for speed. Mastery over MCQ patterns and state-level competition.", 
    icon: <Target />, 
    type: "Entrance",
    color: "rgba(245, 158, 11, 0.08)", // Amber
    glow: "shadow-amber-500/10 border-amber-200/50 text-amber-500",
    glowLight: "bg-amber-50 text-amber-600 border-amber-100/50"
  },
  { 
    id: "nda", 
    title: "NDA Warriors", 
    sub: "Defense Prep", 
    desc: "General Ability and Mathematics focused preparation as per UPSC notification.", 
    icon: <Award />, 
    type: "Defense",
    color: "rgba(16, 185, 129, 0.08)", // Emerald
    glow: "shadow-emerald-500/10 border-emerald-200/50 text-emerald-500",
    glowLight: "bg-emerald-50 text-emerald-600 border-emerald-100/50"
  },
];

export const CourseCards = () => {
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
      className="pt-12 pb-12 bg-slate-50/50 relative overflow-hidden"
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
              background: allCourses[hoveredCard].color,
              transition: 'background 0.5s ease'
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-primary tracking-tighter mb-4 uppercase leading-none"
          >
            Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">Programs</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCourses.map((course, i) => {
            const isHovered = hoveredCard === i;
            const isDimmed = hoveredCard !== null && hoveredCard !== i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group p-10 rounded-[3rem] bg-white border-2 text-left flex flex-col justify-between transition-all duration-500 relative ${
                  isHovered 
                    ? 'border-indigo-600/30 shadow-2xl scale-[1.02] -translate-y-3 z-25 bg-white/95 backdrop-blur-md' 
                    : 'border-slate-100 hover:border-indigo-200 bg-white/90 shadow-sm'
                } ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
              >
                <div>
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 border shadow-sm transition-all duration-500 ${
                    isHovered 
                      ? course.glowLight + ' scale-110 shadow-inner' 
                      : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}>
                    {React.cloneElement(course.icon as React.ReactElement, { 
                      size: 26, 
                      className: isHovered 
                        ? i === 0 
                          ? 'animate-bounce' 
                          : i === 1 
                            ? 'scale-110 transition-transform' 
                            : i === 2 
                              ? 'animate-pulse text-purple-600'
                              : i === 3
                                ? 'scale-110 rotate-12 transition-transform'
                                : i === 4
                                  ? 'animate-ping'
                                  : 'animate-bounce'
                        : '' 
                    })}
                  </div>
                  
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{course.type}</div>
                  <h3 className="text-3xl font-black text-primary mb-1 leading-tight tracking-tight">{course.title}</h3>
                  <div className="text-xs font-black text-indigo-500 tracking-wider mb-6 uppercase">{course.sub}</div>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-medium mb-8">{course.desc}</p>
                  
                  {/* Interactive slide checks */}
                  <div className="space-y-3 mb-10">
                     {[
                       { label: "Complete Study Planner" },
                       { label: "Daily Chapter Micro Tests" }
                     ].map((item, idx) => (
                       <div key={idx} className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                           isHovered 
                             ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-sm' 
                             : 'border-slate-200 text-transparent'
                         }`}>
                           <Check size={10} strokeWidth={3} />
                         </div>
                         <span className="text-xs font-bold text-slate-600 tracking-wide">{item.label}</span>
                       </div>
                     ))}
                  </div>
                </div>

                <Link to={`/courses/${course.id}`} className="inline-flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest transition-all hover:gap-4 mt-auto">
                  Syllabus & Details <ChevronRight size={14} className="text-indigo-600" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
