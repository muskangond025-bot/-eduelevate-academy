import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Star } from 'lucide-react';

const staff = [
  { name: "Dr. Vikram Sethi", sub: "Physics Master", exp: "18+ Years", qual: "PhD (ex-IIT)", img: "https://i.pravatar.cc/400?u=v1" },
  { name: "Prof. Sarah Ferguson", sub: "Biology Expert", exp: "12+ Years", qual: "MSc (Gold Medalist)", img: "https://i.pravatar.cc/400?u=v2" },
  { name: "Prof. Amit Deshpande", sub: "Chem Specialist", exp: "15+ Years", qual: "CSIR-NET Qualified", img: "https://i.pravatar.cc/400?u=v3" },
];

export const FacultyHighlight = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-primary tracking-tighter mb-6">Learn from the <span className="text-secondary">Legends</span></h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto italic-small">Behind every top rank is a mentor who pushed the boundaries. Meet our award-winning academic team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {staff.map((teacher, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-10 mx-auto w-64 h-64 lg:w-72 lg:h-72">
                <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl">
                  <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                     <span className="text-white text-[10px] font-black uppercase tracking-widest">{teacher.exp} EXPERIENCE</span>
                  </div>
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-primary mb-1">{teacher.name}</h4>
              <div className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-4">{teacher.sub}</div>
              
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <GraduationCap size={16} className="text-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest">{teacher.qual}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
