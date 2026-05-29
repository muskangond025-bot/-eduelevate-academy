import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, BookOpen, UserCheck, LayoutGrid, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: <Trophy />, title: "Exceptional Results", desc: "Highest selection ratio in competitive exams year after year." },
  { icon: <UserCheck />, title: "Top-Tier Faculty", desc: "Learn from Ph.Ds and ex-IITians with decades of combined experience." },
  { icon: <BookOpen />, title: "Premium Study Material", desc: "Scientific research-backed modules, DPPs, and comprehensive notes." },
  { icon: <LayoutGrid />, title: "Small Batch Sizes", desc: "Maintaining a limited student-teacher ratio for maximum attention." },
  { icon: <Users />, title: "Personal Mentoring", desc: "Assigned personal mentors for academic tracking and counseling." },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.3em] mb-6">
              The AcademyPro Edge
            </div>
            <h2 className="text-5xl font-black text-primary tracking-tight leading-[1.1] mb-8">
              Why We Are The <br/>
              <span className="text-secondary italic">Unrivaled Choice</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
              We don't just teach; we mentor. Our holistic ecosystem is built around the single goal of ensuring your success in the most competitive environments.
            </p>
            
            <div className="space-y-6">
              {features.slice(0, 2).map((item, i) => (
                <div key={i} className="flex gap-6 items-start p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-secondary/20 transition-all group">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
                     {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-primary mb-2 tracking-tight">{item.title}</h4>
                     <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {features.slice(2).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-center p-8 rounded-[2rem] bg-white border border-slate-200 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   {React.cloneElement(item.icon as React.ReactElement, { size: 30 })}
                </div>
                <div className="flex-grow">
                   <h4 className="text-xl font-bold text-primary mb-1 tracking-tight">{item.title}</h4>
                   <p className="text-sm text-slate-500 leading-relaxed max-w-md">{item.desc}</p>
                </div>
                <CheckCircle2 size={24} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
            
            <div className="mt-8 p-1 hero-gradient rounded-[3rem] shadow-xl overflow-hidden group cursor-pointer active:scale-95 transition-all">
                <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[2.85rem] flex items-center justify-between">
                   <div>
                     <h3 className="text-2xl font-black text-primary mb-1">Still Unsure?</h3>
                     <p className="text-sm font-medium text-slate-400">Ask us anything about our curriculum.</p>
                   </div>
                   <button className="btn-secondary px-6">Chat with Us</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
