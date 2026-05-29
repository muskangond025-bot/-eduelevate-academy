import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, ChevronRight } from 'lucide-react';

export const ResourceHero = ({ title, category }: { title: string, category: string }) => {
  return (
    <section className="pt-24 pb-16 bg-slate-900 overflow-hidden relative text-white">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
           className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter"
        >
          {title}
        </motion.h1>
        <div className="flex items-center gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
           <span className="flex items-center gap-2"><Download size={14} className="text-secondary" /> 12k+ Downloads</span>
           <span className="flex items-center gap-2"><ChevronRight size={14} className="text-secondary" /> Updated for 2026</span>
        </div>
      </div>
    </section>
  );
};
