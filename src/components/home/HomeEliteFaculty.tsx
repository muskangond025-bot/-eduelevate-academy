import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, GraduationCap } from 'lucide-react';

const FACULTY = [
  { 
    name: 'Dr. Rahul Verma', 
    subject: 'Physics Maestro', 
    exp: '20+ Yrs', 
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    color: 'blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    alumnus: 'IIT Kanpur Alumnus',
    bullets: ['Coached AIR 1 & 4', 'Ex-HOD of Elite Institute', 'Author of Core Physics Concepts']
  },
  { 
    name: 'Amrita Khanna', 
    subject: 'Inorganic Queen', 
    exp: '15+ Yrs', 
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    color: 'rose',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    alumnus: 'Delhi University Gold Medalist',
    bullets: ['Author of Chemistry Core', 'NCERT Line-by-Line Creator', '99.9+ Percentiler Coach']
  },
  { 
    name: 'Vivek Shrivastava', 
    subject: 'Math Specialist', 
    exp: '18+ Yrs', 
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    color: 'amber',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    alumnus: 'BITS Pilani Alumnus',
    bullets: ['Olympiad Chief Trainer', '80+ 100-Percentilers', 'Algebra & Calculus Expert']
  },
  { 
    name: 'Dr. Sneha Roy', 
    subject: 'Biology Expert', 
    exp: '12+ Yrs', 
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    color: 'indigo',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    alumnus: 'AIIMS New Delhi Alumnus',
    bullets: ['NEET Paper Expert', '150+ AIIMS Placements', '3D Anatomy teaching pioneer']
  },
];

export const HomeEliteFaculty = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activePath = hoveredIndex !== null ? FACULTY[hoveredIndex] : null;

  return (
    <section className="py-32 bg-white relative overflow-hidden border-b border-slate-100">
      {/* Subtle grid pattern */}
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

      {/* Interactive Ambient Backdrop Light */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.12] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: activePath ? activePath.accentColor : 'rgba(99, 102, 241, 0.4)',
          left: activePath ? `${(hoveredIndex ?? 0) * 25 + 10}%` : '40%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-6 font-sans overflow-visible py-1">
            The Elite{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 font-extrabold italic px-1">
              Faculty.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto">
            Taught by the masters who have produced AIR 1's consistently and engineered top-tier rank holders.
          </p>
        </div>

        {/* Faculty Cards Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FACULTY.map((f, i) => {
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
                className={`relative p-6 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[490px] ${
                  isHovered 
                    ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.06)]' 
                    : isAnyHovered 
                      ? 'border-slate-100/50 bg-white/40' 
                      : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
                }`}
                style={{
                  boxShadow: isHovered ? `0 30px 60px -10px ${f.glowColor}` : undefined,
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
                  opacity: isAnyHovered && !isHovered ? 0.65 : 1
                }}
              >
                <div className="flex flex-col items-center text-center">
                  
                  {/* Portrait with monochrome filter & dynamic active borders */}
                  <div 
                    className="relative aspect-square w-full max-w-[190px] rounded-[2rem] overflow-hidden mb-6 border-4 shadow-md transition-all duration-500"
                    style={{
                      borderColor: isHovered ? f.accentColor : '#f8fafc'
                    }}
                  >
                    <img 
                      src={f.img} 
                      alt={f.name} 
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'grayscale-0 scale-105' : 'grayscale contrast-[0.95]'
                      }`} 
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ backgroundColor: f.accentColor }}
                    />
                  </div>

                  {/* Name & Credentials */}
                  <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">
                    {f.name}
                  </h3>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: f.accentColor }}>
                    {f.subject}
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mb-6">
                    <GraduationCap size={12} style={{ color: f.accentColor }} />
                    <span>{f.alumnus}</span>
                  </div>

                  {/* Bullet accomplishments (reveal on hover) */}
                  <div className="w-full text-left border-t border-slate-100 pt-4 space-y-2">
                    <AnimatePresence>
                      {isHovered ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="space-y-2.5"
                        >
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                            Key Accomplishments
                          </span>
                          {f.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: f.accentColor }} />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-center"
                        >
                          <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-wider">
                            <Award size={12} style={{ color: f.accentColor }} />
                            <span>{f.exp} Experience</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
