import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book } from 'lucide-react';

export const RelatedResources = ({ currentId }: { currentId: string }) => {
  const allResources = [
    { id: 'physics-notes', title: "Mechanics Vol. 1", category: "Physics Notes" },
    { id: 'chemistry-notes', title: "Organic Mechanisms", category: "Chemistry Notes" },
    { id: 'prev-papers', title: "JEE Adv 2024 Solved", category: "Previous Papers" },
    { id: 'study-planner', title: "Master 90-Day Plan", category: "Study Planner" }
  ];

  const filtered = allResources.filter(r => r.id !== currentId);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-black text-primary tracking-tighter mb-12 italic-small">Explore Other <span className="text-secondary italic">Modules.</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {filtered.map((resource, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group"
             >
                <Link to={`/resources/${resource.id}`} className="block p-8 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all relative overflow-hidden h-full">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-secondary/10 transition-colors" />
                   <Book className="text-slate-300 mb-6 group-hover:text-secondary transition-colors" size={32} />
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{resource.category}</div>
                   <h4 className="text-xl font-bold text-primary mb-8 tracking-tight transition-colors group-hover:text-secondary">{resource.title}</h4>
                   <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary border-t border-slate-50 pt-4">
                      View Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                   </div>
                </Link>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
