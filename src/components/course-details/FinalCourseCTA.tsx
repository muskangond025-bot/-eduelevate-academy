import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, FileText, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalCourseCTA = () => {
  return (
    <section className="py-32 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 rounded-[4rem] bg-slate-900 border border-white/5 text-white text-left relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 translate-x-1/4 pointer-events-none" />
             <div className="relative z-10">
                <CalendarCheck size={40} className="text-secondary mb-8" />
                <h3 className="text-4xl font-black text-white tracking-tighter mb-6 leading-tight">Book Your <br/><span className="text-secondary italic">Demo Session</span></h3>
                <p className="text-slate-400 mb-10 leading-relaxed font-medium">Experience our unique pedagogy first-hand and see how we build conceptual muscle.</p>
                <Link to="/book-demo" className="btn-accent px-10 py-5 text-xl font-black uppercase tracking-widest inline-flex items-center gap-3">
                   Book Demo <ArrowRight size={20} />
                </Link>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-16 rounded-[4rem] bg-slate-100 border border-slate-200 text-primary text-left relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
             <div className="relative z-10">
                <FileText size={40} className="text-primary mb-8" />
                <h3 className="text-4xl font-black text-primary tracking-tighter mb-6 leading-tight">Scholarship <br/><span className="text-secondary italic">Diagnostic</span></h3>
                <p className="text-slate-500 mb-10 leading-relaxed font-medium">Take our national-level aptitude test and win up to 100% scholarship fee waivers.</p>
                <Link to="/scholarship" className="btn-primary px-10 py-5 text-xl font-black uppercase tracking-widest inline-flex items-center gap-3">
                   Free Test <ArrowRight size={20} />
                </Link>
             </div>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col lg:flex-row items-center justify-center gap-12 pt-16 border-t border-slate-100">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl">
                 <MessageSquare size={24} />
              </div>
              <div className="text-left">
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Immediate Support</div>
                 <div className="text-xl font-bold text-primary">+91 98765 43210</div>
              </div>
           </div>
           <div className="hidden lg:block w-px h-12 bg-slate-100" />
           <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
              Standardized Quality. Unrivaled Results.
           </div>
        </div>
      </div>
    </section>
  );
};
