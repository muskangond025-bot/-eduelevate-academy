import React from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2 } from 'lucide-react';

interface CourseOverviewProps {
  description: string;
  whoIsItFor: string[];
}

export const CourseOverviewSection = ({ description, whoIsItFor }: CourseOverviewProps) => {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-primary tracking-tighter mb-10 leading-tight">
              Course <span className="text-secondary italic">Overview</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Target size={120} className="text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold text-primary mb-8 tracking-tight">Who This Course Is For</h3>
            <div className="space-y-6">
              {whoIsItFor.map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 transition-transform group-hover:scale-110">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-slate-600 font-bold leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
