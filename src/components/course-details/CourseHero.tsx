import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseHeroProps {
  name: string;
  duration: string;
  eligibility: string;
}

export const CourseHero = ({ name, duration, eligibility }: CourseHeroProps) => {
  return (
    <section className="relative pt-24 pb-40 overflow-hidden bg-slate-900 text-white">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-12">
               <Star size={14} /> Comprehensive Coaching Path
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-12">
              {name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-secondary italic' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
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
               <Link to="/book-demo" className="btn-accent px-10 py-5 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                  Book Free Demo <ArrowRight size={20} />
               </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden border-[12px] border-white/5 shadow-2xl skew-y-2">
               <img 
                 src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200" 
                 alt={name} 
                 className="w-full h-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent" />
            </div>
            {/* Achievement Badge */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full flex flex-col items-center justify-center text-primary rotate-12 shadow-2xl border-8 border-slate-900">
               <div className="text-4xl font-black leading-none">#1</div>
               <div className="text-[10px] font-black uppercase">Standard</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
