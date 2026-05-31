import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import courseDetailsHeroImg from '../../assets/course_details_hero.png';

interface CourseHeroProps {
  name: string;
  duration: string;
  eligibility: string;
}

export const CourseHero = ({ name, duration, eligibility }: CourseHeroProps) => {
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
    <section className="relative pt-24 pb-36 overflow-hidden bg-slate-950 text-white">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      {/* Dotted Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.5) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-8">
               <Star size={14} /> Comprehensive Coaching Path
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-8 uppercase">
              {name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-secondary italic font-black' : 'font-black'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10 group-hover:bg-secondary group-hover:text-primary transition-all">
                     <Calendar size={24} />
                  </div>
                  <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</div>
                     <div className="text-xl font-bold text-white">{duration}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10 group-hover:bg-secondary group-hover:text-primary transition-all">
                     <Users size={24} />
                  </div>
                  <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eligibility</div>
                     <div className="text-xl font-bold text-white">{eligibility}</div>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap gap-4">
               <Link to="/book-demo" className="btn-accent px-10 py-5 text-lg font-black uppercase tracking-widest flex items-center gap-3 shadow-lg hover:scale-102 transition-transform">
                  Book Free Demo <ArrowRight size={20} />
               </Link>
            </div>
          </motion.div>

          {/* Right Column: 4K Real Stock Image framed elegantly (No overlays, 100% contrast) */}
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
                  background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(251, 146, 60, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={courseDetailsHeroImg} 
                alt={name} 
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
