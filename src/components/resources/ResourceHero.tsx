import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, ChevronRight } from 'lucide-react';
import resourceHeroImg from '../../assets/resource_hero.png';

export const ResourceHero = ({ title, category }: { title: string, category: string }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="pt-24 pb-20 bg-slate-950 overflow-hidden relative text-white">
      {/* Blueprint grid backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.5) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid for Title + 4K Image (No Overlay, Zero Text overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
          
          {/* Left Column: Clean text and typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-secondary font-black text-[10px] uppercase tracking-widest mb-8"
            >
              <FileText size={12} /> {category} Premium Resource
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tighter uppercase"
            >
              {title}
            </motion.h1>
            
            <div className="flex items-center gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
               <span className="flex items-center gap-2"><Download size={14} className="text-secondary" /> 12k+ Downloads</span>
               <span className="flex items-center gap-2"><ChevronRight size={14} className="text-secondary" /> Updated for 2026</span>
            </div>
          </div>

          {/* Right Column: 4K Real Stock Image framed elegantly (No overlays, 100% readability) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-md aspect-[4/3] rounded-[3rem] border-8 border-white/5 overflow-hidden shadow-2xl relative bg-slate-900 group/img cursor-pointer"
              style={{ 
                transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={resourceHeroImg} 
                alt="Premium Resources Workspace" 
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
