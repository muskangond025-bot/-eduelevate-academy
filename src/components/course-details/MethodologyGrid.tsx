import React from 'react';
import { motion } from 'motion/react';
import { PenTool, Library, Monitor, BarChart2 } from 'lucide-react';

export const MethodologyGrid = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-primary tracking-tighter mb-6">Our Teaching <span className="text-secondary italic">Core</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MethodItem 
            icon={<PenTool />} 
            title="Teaching Methodology" 
            desc="Conceptual clarity through 'First Principles' thinking. We focus on 'Why' before 'How'."
          />
          <MethodItem 
            icon={<Library />} 
            title="Study Material" 
            desc="Comprehensive 12-module in-house R&D modules with solved examples and multi-level practice sets."
          />
          <MethodItem 
            icon={<Monitor />} 
            title="Mock Test System" 
            desc="CBT-based pattern exactly matching national exam standards with full video solutions."
          />
          <MethodItem 
            icon={<BarChart2 />} 
            title="Performance Tracking" 
            desc="Weekly AI audits to track accuracy, speed, and topic-wise weak spots sent directly to parents."
          />
        </div>
      </div>
    </section>
  );
};

const MethodItem = ({ icon, title, desc }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group overflow-hidden relative"
  >
    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-secondary mb-10 shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-3xl font-bold text-primary mb-6 tracking-tight">{title}</h3>
    <p className="text-lg text-slate-500 font-medium leading-relaxed italic-small">{desc}</p>
    
    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);
