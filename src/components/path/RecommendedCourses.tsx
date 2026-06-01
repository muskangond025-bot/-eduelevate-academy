import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Sparkles, Activity, ShieldCheck, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const recommendations = [
  { 
    id: 'jee', 
    title: "JEE Advanced 2-Year Program", 
    grade: "Grade 10 Moving to 11", 
    tag: "Most Popular", 
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    glow: "rgba(59, 130, 246, 0.15)",
    theme: "from-blue-500 to-indigo-600",
    badgeColor: "text-blue-500 bg-blue-500/5 border-blue-500/10",
    telemetry: ["★ IIT Bombay Placements", "★ 2-Year Rigorous Track", "★ Advanced Syllabus Matrix"]
  },
  { 
    id: 'neet', 
    title: "NEET Focus 1-Year Sync", 
    grade: "Grade 12 Students", 
    tag: "Intensive", 
    img: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800",
    glow: "rgba(244, 63, 94, 0.15)",
    theme: "from-rose-500 to-red-600",
    badgeColor: "text-rose-500 bg-rose-500/5 border-rose-500/10",
    telemetry: ["★ AIIMS Delhi Syllabus", "★ 1-Year Core Sync", "★ Rhythmic Heartbeat Scans"]
  },
  { 
    id: 'mht-cet', 
    title: "MHT-CET FastTrack", 
    grade: "Droppers & Grade 12", 
    tag: "Speed Oriented", 
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    glow: "rgba(16, 185, 129, 0.15)",
    theme: "from-emerald-500 to-teal-600",
    badgeColor: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10",
    telemetry: ["★ Speed Calibration", "★ FastTrack Revision Pack", "★ 1500+ Merit Rankings"]
  }
];

// Coordinate trailing sparks inside card
const SparkParticlesTrail = ({ mouseX, mouseY, active }: { mouseX: number; mouseY: number; active: boolean }) => {
  if (!active) return null;
  return (
    <>
      <div 
        className="absolute w-2 h-2 rounded-full bg-indigo-400/25 pointer-events-none blur-[1px] transition-all duration-300 ease-out"
        style={{ left: mouseX - 4, top: mouseY - 4 }}
      />
      <div 
        className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/20 pointer-events-none blur-[1px] transition-all duration-500 ease-out"
        style={{ left: mouseX - 3, top: mouseY - 3 }}
      />
      <div 
        className="absolute w-1 h-1 rounded-full bg-indigo-200/40 pointer-events-none transition-all duration-700 ease-out"
        style={{ left: mouseX - 2, top: mouseY - 2 }}
      />
    </>
  );
};

export const RecommendedCourses = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Row coordinate states for magnetic buttons
  const [btnTilts, setBtnTilts] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // Card specific local coordinates tracking
  const [cardMice, setCardMice] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom coordinates properties on element styles
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

    setCardMice(prev => {
      const next = [...prev];
      next[index] = { x, y };
      return next;
    });
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35; // 35% magnetic strength
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    
    setBtnTilts(prev => {
      const next = [...prev];
      next[index] = { x, y };
      return next;
    });
  };

  const handleButtonMouseLeave = (index: number) => {
    setBtnTilts(prev => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="pt-12 pb-24 bg-[#F8FAFC] text-slate-900 relative overflow-hidden"
    >
      {/* Light Slate Matrix Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Global Interactive Coordinates Spotlight */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 transition-opacity duration-300 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(165, 180, 252, 0.15) 0%, transparent 70%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-28 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-tight select-none uppercase overflow-visible py-1">
              Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 italic px-1">Programs</span>
            </h2>
            <p className="text-slate-500 text-lg lg:text-xl font-medium mt-4">
              Bestselling courses based on current student trends and enrollment data.
            </p>
          </div>
          
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-3 text-indigo-600 font-extrabold uppercase tracking-widest text-sm hover:text-indigo-700 transition-colors group select-none"
          >
            Explore All <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Dynamic Card Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {recommendations.map((course, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;
            const localMouse = cardMice[i] || { x: 0, y: 0 };
            const btnTilt = btnTilts[i] || { x: 0, y: 0 };

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={(e) => handleCardMouseMove(e, i)}
                className={`relative group rounded-[3.5rem] p-4 flex flex-col justify-between border transition-all duration-500 cursor-pointer backdrop-blur-xl ${
                  isHovered 
                    ? 'bg-white border-indigo-200 shadow-2xl scale-[1.015] z-10' 
                    : isAnyHovered 
                      ? 'bg-white/40 border-slate-100 opacity-45 blur-[0.5px] text-slate-800' 
                      : 'bg-white border-slate-200 text-slate-800'
                }`}
                style={{
                  boxShadow: isHovered ? '0 30px 60px -15px rgba(99, 102, 241, 0.15)' : 'none'
                }}
              >
                {/* Local Card Hover Spotlight Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${course.glow}, transparent 80%)`
                  }}
                />

                {/* Sparks trail following mouse cursor inside card */}
                <SparkParticlesTrail mouseX={localMouse.x} mouseY={localMouse.y} active={isHovered} />

                {/* Top Section */}
                <div>
                  {/* Badge */}
                  <div className="absolute top-8 left-8 z-20 select-none">
                    <div className="flex items-center gap-2 bg-[#0A0D1A] text-white px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10">
                      <Star size={12} className="text-amber-400 fill-amber-400 animate-pulse" /> 
                      {course.tag}
                    </div>
                  </div>

                  {/* Double Nested Picture Frame with coordinates brackets */}
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden relative mb-8 border border-slate-200/50 relative group-hover:border-indigo-500/20 transition-colors">
                    <img 
                      src={course.img} 
                      alt={course.title} 
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="px-6">
                    <div className="text-[10px] font-mono font-black text-indigo-500/70 tracking-widest uppercase mb-3">
                      {course.grade}
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter mb-6 group-hover:text-indigo-600 transition-colors leading-none">
                      {course.title}
                    </h3>

                    {/* Sliding Telemetry Drawer */}
                    <div className="h-20 overflow-hidden relative mb-6">
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -15, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-1.5 backdrop-blur-md"
                          >
                            {course.telemetry.map((tag, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-2 text-[10px] font-mono font-black text-indigo-500/70 uppercase tracking-wide">
                                <Activity size={10} className="text-indigo-500" />
                                <span>{tag}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="px-6 pb-6 w-full relative z-10">
                  <Link 
                    to={`/courses/${course.id}`} 
                    onMouseMove={(e) => handleButtonMouseMove(e, i)}
                    onMouseLeave={() => handleButtonMouseLeave(i)}
                    style={{
                      transform: `translate3d(${btnTilt.x}px, ${btnTilt.y}px, 0)`,
                      transition: btnTilt.x === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                    className={`w-full py-4.5 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-widest transition-all duration-300 gap-2 border select-none ${
                      isHovered 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white'
                    }`}
                  >
                    View Blueprint
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
