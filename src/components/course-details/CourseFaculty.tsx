import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CourseFaculty = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-6 underline decoration-secondary decoration-8 underline-offset-8">Lead <span className="text-secondary italic">Mentors</span></h2>
            <p className="text-xl text-indigo-200 opacity-80 max-w-xl">Every course is led by a specialized team of veterans with a proven track record of producing single-digit ranks.</p>
          </div>
          <button onClick={() => navigate('/faculty')} className="btn-secondary px-8 cursor-pointer">Full Faculty Board</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {[
            { name: "Dr. Arun Mehra", sub: "Physics HOD", exp: "22+ Years", qual: "PhD, ex-IIT Delhi", img: "https://i.pravatar.cc/300?u=a3" },
            { name: "Prof. S. Mukerji", sub: "Maths Specialist", exp: "18+ Years", qual: "MSc Mathematics (Silver Medalist)", img: "https://i.pravatar.cc/300?u=m1" },
            { name: "Dr. Rashmi Singh", sub: "Chem Director", exp: "15+ Years", qual: "PhD (Organic Chemistry)", img: "https://i.pravatar.cc/300?u=r3" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-10 inline-block">
                <div className="absolute inset-0 bg-secondary/20 rounded-[3.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="relative z-10 w-64 h-64 lg:w-72 lg:h-72 rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl">
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-1 tracking-tight">{item.name}</h4>
              <div className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-4">{item.sub}</div>
              <div className="flex items-center justify-center gap-3 text-indigo-300">
                 <GraduationCap size={16} className="text-secondary" />
                 <span className="text-sm font-bold uppercase tracking-widest">{item.qual}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
