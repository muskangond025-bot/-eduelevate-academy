import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Stethoscope, Lightbulb, GraduationCap } from 'lucide-react';

const CATEGORIES = [
  { name: 'JEE Preparation', icon: BookOpen, count: 24, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'NEET Preparation', icon: Stethoscope, count: 18, color: 'text-rose-500', bg: 'bg-rose-50' },
  { name: 'Study Tips', icon: Lightbulb, count: 32, color: 'text-amber-500', bg: 'bg-amber-50' },
  { name: 'Board Exams', icon: GraduationCap, count: 15, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

export const BlogCategories = ({
  onCategoryClick
}: {
  onCategoryClick: (name: string) => void;
}) => {
  return (
    <section className="py-12 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onCategoryClick(cat.name)}
              className={`p-8 rounded-[2rem] ${cat.bg} border border-transparent hover:border-slate-200 cursor-pointer transition-all group`}
            >
              <cat.icon className={`${cat.color} mb-6 transition-transform group-hover:scale-110`} size={32} />
              <h3 className="text-xl font-black text-primary mb-1 tracking-tight">{cat.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.count} Articles</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
