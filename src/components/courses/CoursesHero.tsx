import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, Sparkles, Activity, Compass, Dna } from 'lucide-react';
import coursesHeroImg from '../../assets/courses_hero.png';

export const CoursesHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;
    
    setMousePos({ x, y });
    setTilt({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const titleWords = ["Architecting", "Global", "Ranks."];

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-24 pb-24 overflow-hidden bg-slate-950 text-white transition-all duration-300"
      style={{ perspective: 1000 }}
    >
      {/* Spotlight Cursor Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.08), transparent 80%)`
        }}
      />

      {/* Grid Mesh Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-indigo-500/20" />
        <div className="absolute right-[10%] top-0 bottom-0 w-px bg-indigo-500/20" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-indigo-500/20" />
        <div className="absolute bottom-[20%] left-0 right-0 h-px bg-indigo-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid for Title + 4K Image (No Overlay, Zero Text overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left mb-8">
          
          {/* Left Column: Clean text and typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Sparkly Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-2xl relative group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
              <div className="relative z-10 flex items-center gap-2">
                <Sparkles size={12} className="text-amber-500 animate-pulse" /> 
                <span>Advanced Academic Programs</span>
              </div>
            </motion.div>
            
            {/* Main Title Word Entrance */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase">
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-4 py-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block ${word === "Global" ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-500 italic select-none font-black" : "font-black"}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base lg:text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-xl text-left"
            >
              Our curriculum isn't just about finishing the syllabus. It's about <span className="text-white font-bold">engineering a mindset</span> that views complexity as a playground.
            </motion.p>

            {/* Interactive Bento Metrics Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-2">
               {/* Card 1: Streams selection */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
                 className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group flex items-center justify-between text-left hover:bg-white/[0.04]"
               >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">6 Specialized Streams</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Custom curriculum blueprints</p>
                    </div>
                  </div>
                  {/* Horizontal Expand chips */}
                  <div className="flex -space-x-2 overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    {['JEE', 'NEET', 'FND'].map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-slate-400 tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
               </motion.div>

               {/* Card 2: Metrics feedback */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.7 }}
                 className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group flex items-center justify-between text-left hover:bg-white/[0.04]"
               >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">Result-Driven Modules</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Top-tier scoring syllabus</p>
                    </div>
                  </div>
                  <div className="font-mono text-xs font-black text-indigo-400 group-hover:text-indigo-300">
                    99.8%★
                  </div>
               </motion.div>
            </div>
          </div>

          {/* Right Column: 4K Real Stock Image framed elegantly (No dark overlays, No text overlap) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div 
              className="w-full max-w-md aspect-[4/3] rounded-[3rem] border-8 border-white/5 overflow-hidden shadow-2xl relative bg-slate-900 group/img cursor-pointer"
              style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle at ${mousePos.x % 400}px ${mousePos.y % 300}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={coursesHeroImg} 
                alt="Modern Science Lab" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />

              {/* Corner tech badge indicating 4K authenticity */}
              <span className="absolute bottom-4 right-6 font-mono text-[5px] text-white bg-slate-950/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider z-20">
                [NODE_FOCAL: 4K_UHD // CALIBRATED]
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
