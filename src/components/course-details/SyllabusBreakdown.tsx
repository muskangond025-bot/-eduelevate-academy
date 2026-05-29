import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronDown } from 'lucide-react';

interface SyllabusProps {
  syllabus: { title: string; topics: string[] }[];
}

export const SyllabusBreakdown = ({ syllabus }: SyllabusProps) => {
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-primary tracking-tighter mb-6 underline decoration-secondary decoration-8 underline-offset-8">Syllabus <span className="text-secondary italic">Breakdown</span></h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">A comprehensive roadmap of everything we cover in this program.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {syllabus.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="text-3xl font-black text-primary tracking-tighter">{item.title}</div>
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-secondary">
                  <BookOpen size={20} />
                </div>
              </div>
              <ul className="space-y-4">
                {item.topics.map((topic, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-500 font-medium group">
                    <div className="w-2 h-2 bg-secondary/30 rounded-full group-hover:bg-secondary transition-colors" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
