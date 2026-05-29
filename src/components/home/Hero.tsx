import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 badge-vibrant mb-6 shadow-sm bg-accent/10 border-accent/20 text-primary">
              <Star size={16} className="text-secondary fill-secondary" />
              <span className="font-bold tracking-tight text-xs">Rank #1 Produced for JEE / NEET / MHT-CET</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[0.95] mb-6 text-primary tracking-tighter">
              The Gold Standard of <span className="text-secondary italic">Academic</span> Excellence.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Join the league of elite achievers. We transform potential into performance with India's most rigorous coaching methodology.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/book-demo" className="btn-accent px-10 py-5 text-lg flex items-center gap-2 shadow-2xl shadow-accent/20">
                Book Demo Class <ArrowRight size={20} />
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 px-6 py-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 w-fit">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">99.2%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Success Rate</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="text-3xl font-black text-primary">500+</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">IITians Produced</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,58,138,0.25)] border-[12px] border-white ring-1 ring-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                alt="Elite Students" 
                className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Achievement Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 z-20 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 max-w-[280px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Trophy className="text-white" size={32} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">JEE ADV 2025</div>
                  <div className="text-3xl font-black text-primary leading-none">AIR 01</div>
                  <div className="text-sm font-bold text-slate-400 mt-1">Coached by Us</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    
    {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};
