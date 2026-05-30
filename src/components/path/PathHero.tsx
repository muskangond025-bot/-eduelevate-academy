import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';

export const PathHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax translation coordinates relative to center
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [compassTilt, setCompassTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    // Parallax translation (max 18px offset)
    setParallax({
      x: (x - cx) / 45,
      y: (y - cy) / 45,
    });

    // Compass token 3D tilt coordinates
    setCompassTilt({
      rotateX: (cy - y) / 18,
      rotateY: (x - cx) / 18,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallax({ x: 0, y: 0 });
    setCompassTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="pt-32 pb-24 bg-bg-dark text-white relative overflow-hidden min-h-[580px] flex items-center"
    >
      {/* Cybernetic Grid Blueprint Canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Global Interactive Coordinates Spotlight Nebula Glow */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%)',
          left: `${mousePos.x - 350}px`,
          top: `${mousePos.y - 350}px`,
        }}
      />

      {/* Ambient background nebulae */}
      <div className="absolute -top-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full flex flex-col items-center">
        
        {/* INTERACTIVE 3D PARALLAX COMPASS HUD RING TOKEN */}
        <div 
          style={{
            transform: `perspective(1000px) rotateX(${compassTilt.rotateX}deg) rotateY(${compassTilt.rotateY}deg)`,
            transition: !isHovered ? 'transform 0.5s ease-out' : 'none'
          }}
          className="relative w-28 h-28 mb-10 flex items-center justify-center cursor-pointer group/compass"
        >
          {/* Concentric rotating orbits */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-45 pointer-events-none" viewBox="0 0 100 100">
            {/* Outer ticks ring */}
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              className={`stroke-indigo-500/25 ${isHovered ? 'animate-[spin_7s_linear_infinite]' : 'animate-[spin_15s_linear_infinite]'}`} 
              strokeWidth="1.2" 
              strokeDasharray="4 6" 
            />
            {/* Inner dashed ring */}
            <circle 
              cx="50" 
              cy="50" 
              r="36" 
              fill="none" 
              className={`stroke-amber-500/20 ${isHovered ? 'animate-[spin_4s_linear_infinite_reverse]' : 'animate-[spin_9s_linear_infinite_reverse]'}`} 
              strokeWidth="1.5" 
              strokeDasharray="15 8" 
            />
            {/* Radial notches */}
            <path d="M 50 2 L 50 6 M 50 94 L 50 98 M 2 50 L 6 50 M 94 50 L 98 50" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
          </svg>

          {/* Compass Pulsing Aura */}
          <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-amber-500/20 opacity-30 group-hover/compass:opacity-80 blur-md transition-all duration-700" />
          
          {/* Icon Badge container */}
          <div className="relative z-10 w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-inner group-hover/compass:border-amber-500/30 transition-colors duration-500">
            <Compass size={28} className={`text-indigo-400 group-hover/compass:text-amber-400 ${isHovered ? 'animate-[spin_6s_linear_infinite]' : 'animate-[spin_20s_linear_infinite]'}`} />
          </div>
          
          {/* Spars */}
          <div className="absolute -top-1 -right-1 text-amber-400 animate-bounce">
            <Sparkles size={14} />
          </div>
        </div>

        {/* STAGGERED HEADLINE REVEALS USING CLIP-MASKS */}
        <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tighter mb-10 leading-none select-none uppercase">
          <div className="overflow-hidden h-[1.1em] flex items-center justify-center">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Choose Your
            </motion.div>
          </div>
          <div className="overflow-hidden h-[1.1em] flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 italic">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Perfect Path.
            </motion.div>
          </div>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg lg:text-xl text-indigo-100/60 max-w-3xl leading-relaxed font-medium mb-4 select-none"
        >
          Every student journey is unique. Select your current status to find the most optimized coaching strategy for your goals.
        </motion.p>
      </div>


    </section>
  );
};
