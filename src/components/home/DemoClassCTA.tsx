import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoClassCTA = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[4rem] p-16 lg:p-24 relative overflow-hidden text-center lg:text-left">
          {/* Background visuals */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-secondary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/5">
                Limited Slots Available
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
                Experience the Difference.<br/>
                <span className="text-secondary italic">Book a Demo Class.</span>
              </h2>
              <p className="text-indigo-100 text-lg opacity-80 mb-12 max-w-md mx-auto lg:mx-0">
                Witness our unique pedagogy first-hand. See how we simplify complex concepts and build problem-solving muscle.
              </p>
              <Link to="/book-demo" className="btn-accent px-10 py-5 text-xl font-black uppercase tracking-widest inline-flex items-center gap-3 group">
                Reserve Your Seat <CalendarCheck size={24} className="group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col justify-end group hover:bg-white/10 transition-all">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Subject {i}</div>
                    <div className="text-xl font-bold text-white">Live Session #{i}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
