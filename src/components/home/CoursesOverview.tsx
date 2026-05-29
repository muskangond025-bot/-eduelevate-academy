import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Target, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  { title: "11th Science", desc: "Building the core foundation for competitive success.", icon: <ShieldCheck size={24} />, category: "Academic" },
  { title: "12th Science", desc: "Mastering concepts and board excellence simultaneously.", icon: <ShieldCheck size={24} />, category: "Academic" },
  { title: "JEE Coaching", desc: "Strategic preparation for India's toughest engineering exam.", icon: <Target size={24} />, category: "Engineering" },
  { title: "NEET Coaching", desc: "Intensive focus on biological sciences and medical logic.", icon: <Zap size={24} />, category: "Medical" },
  { title: "MHT-CET Coaching", desc: "Speed and accuracy training for state-level dominance.", icon: <Target size={24} />, category: "State Exam" },
  { title: "NDA Coaching", desc: "Unified training for defense services and character building.", icon: <ShieldCheck size={24} />, category: "Defense" },
];

export const CoursesOverview = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-primary tracking-tighter mb-6">World-Class <span className="text-secondary">Programs</span></h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic-small">Designed for students who demand the best in pedagogy and results.</p>
          </div>
          <Link to="/courses" className="btn-secondary px-8 py-4 transition-all hover:px-10">Explore Full Catalog</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-secondary/20 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-slate-200">
                {React.cloneElement(course.icon as React.ReactElement, { className: "text-secondary" })}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{course.category}</div>
              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">{course.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-10">{course.desc}</p>
              
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Learn More <ChevronRight size={14} className="text-secondary" />
              </div>
              
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
