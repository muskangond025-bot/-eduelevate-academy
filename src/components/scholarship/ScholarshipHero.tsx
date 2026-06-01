import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, ChevronRight, Target, ArrowRight, ShieldAlert } from 'lucide-react';
import scholarshipHeroImg from '../../assets/scholarship_hero.png';


const GridWarpCanvas = ({ mousePos, isHovered }: { mousePos: { x: number; y: number }; isHovered: boolean }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1400,
          height: containerRef.current.clientHeight || 600
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cols = 14;
  const rows = 9;
  const paths = [];

  for (let i = 1; i < cols; i++) {
    const x = (dimensions.width / cols) * i;
    let d = `M ${x} 0`;
    
    if (isHovered) {
      const distanceY = dimensions.height / 2;
      const dx = mousePos.x - x;
      const dy = mousePos.y - distanceY;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 180 - dist) * 0.45;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(245, 158, 11, 0.06)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;

    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 180 - dist) * 0.45;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(245, 158, 11, 0.06)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

export const ScholarshipHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt Ticket controls
  const [ticketTilt, setTicketTilt] = useState({ x: 0, y: 0 });
  const [ticketMouse, setTicketMouse] = useState({ x: 0, y: 0 });
  const [isTicketHovered, setIsTicketHovered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTicketMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setTicketMouse({ x, y });
    setTicketTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsTicketHovered(true);
  };

  const handleTicketMouseLeave = () => {
    setTicketTilt({ x: 0, y: 0 });
    setIsTicketHovered(false);
  };

  // Magnetic button physics
  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px) scale(1)';
  };

  const titleWords = ["Unlock", "Your", "Full", "Potential."];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pt-12 pb-24 bg-[#02040A] relative overflow-hidden border-b border-white/5"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glows */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.05), rgba(99, 102, 241, 0.02) 40%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Warp Grid Canvas */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      {/* Blueprint Grid Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2] z-0">
        <div className="absolute left-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/10 via-amber-500/30 to-amber-500/10" />
        <div className="absolute right-[12%] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/10 via-amber-500/30 to-amber-500/10" />
        <div className="absolute top-[24%] left-0 right-0 h-px bg-gradient-to-r from-amber-500/10 via-amber-500/30 to-amber-500/10" />
        <div className="absolute bottom-[24%] left-0 right-0 h-px bg-gradient-to-r from-amber-500/10 via-amber-500/30 to-amber-500/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Title & Actions */}
          <div className="lg:w-3/5 w-full text-left">
            
            {/* Staggered Word Reveal Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-none mb-8 select-none">
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-4 py-2">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.12,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block ${
                      word === "Potential." 
                        ? "italic font-black" 
                        : ""
                    }`}
                  >
                    {word === "Potential." ? (
                      <>
                        <span className="text-indigo-600 font-black">Potential</span>
                        <span className="text-indigo-600 font-black">.</span>
                      </>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-2xl"
            >
              Stand a chance to win up to <span className="text-white font-bold">100% full-ride scholarship</span> on our premium coaching programs. Bench your vector metrics against the nation's elite performers.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex flex-col sm:flex-row gap-5 items-stretch"
            >
                <button 
                  onMouseMove={handleButtonMove}
                  onMouseLeave={handleButtonLeave}
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-amber-500/10 transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                >
                   <span>Register Now</span>
                   <ArrowRight size={14} />
                </button>
                <button 
                  onMouseMove={handleButtonMove}
                  onMouseLeave={handleButtonLeave}
                  onClick={() => document.getElementById('syllabus-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
                >
                   <span>View Syllabus</span>
                   <ChevronRight size={14} />
                </button>
            </motion.div>
          </div>
          
          {/* Right Column: 4K Real Stock Image framed elegantly (No dark overlays, No text overlap) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="lg:w-2/5 w-full flex justify-center"
          >
            <div 
              onMouseMove={handleTicketMouseMove}
              onMouseLeave={handleTicketMouseLeave}
              className="w-full max-w-md aspect-[4/3] rounded-[3rem] border-8 border-white/5 overflow-hidden shadow-2xl relative bg-slate-900 group/img cursor-pointer"
              style={{ 
                transform: `perspective(1000px) rotateX(${-ticketTilt.y * 6}deg) rotateY(${ticketTilt.x * 6}deg) scale3d(${isTicketHovered ? 1.02 : 1}, ${isTicketHovered ? 1.02 : 1}, 1)`,
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle at ${ticketMouse.x}px ${ticketMouse.y}px, rgba(245, 158, 11, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={scholarshipHeroImg} 
                alt="Scholarship Winner Student" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />

              {/* Corner tech badge indicating 4K authenticity */}
              <span className="absolute bottom-4 right-6 font-mono text-[5px] text-white bg-slate-955/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider z-20">
                [NODE_FOCAL: 4K_UHD // CALIBRATED]
              </span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
