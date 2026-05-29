import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles } from 'lucide-react';

const paths = [
  { label: "I am in 10th", desc: "Foundation Excellence", accent: "bg-indigo-500" },
  { label: "I am in 11th", desc: "Two Year Power Batch", accent: "bg-secondary" },
  { label: "I am in 12th", desc: "One Year Target", accent: "bg-accent" },
  { label: "Dropper Student", desc: "Intensive Repeater", accent: "bg-primary" },
];

export const PathSelection = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.3em] mb-4">
             <Sparkles size={14} /> Personalized Learning
          </div>
          <h2 className="text-4xl font-black text-primary tracking-tight">Choose Your <span className="text-secondary underline decoration-secondary/10 underline-offset-8">Ideal Path</span></h2>
          <p className="text-slate-500 mt-4 font-medium italic-small">We have curated programs tailored to your current academic stage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((path, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-slate-200 text-left relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-1.5 h-full ${path.accent}`} />
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">{path.label}</h3>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">{path.desc}</p>
              
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase">
                  Select Path <div className="w-4 h-[2px] bg-secondary" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Visual interest */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
