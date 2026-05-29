import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp } from 'lucide-react';
import { CourseResult } from '../../data/coursesData';
import { useNavigate } from 'react-router-dom';

interface CourseResultsProps {
  results?: CourseResult[];
}

const defaultResults = [
  { rankOrClass: "AIR 12", name: "Rohan S.", stat: "Score: 342/360" },
  { rankOrClass: "AIR 45", name: "Anish G.", stat: "Percentile: 99.98" },
  { rankOrClass: "AIR 120", name: "Priya V.", stat: "Score: 320/360" },
  { rankOrClass: "AIR 204", name: "Kabir M.", stat: "Score: 315/360" }
];

export const CourseResults = ({ results = defaultResults }: CourseResultsProps) => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-primary tracking-tighter mb-6 underline decoration-secondary decoration-8 underline-offset-8">Recent <span className="text-secondary italic">Milestones</span></h2>
          <p className="text-lg text-slate-500 font-medium">Specific achievements from the most recent academic cycle for this program.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Trophy size={40} />
              </div>
              <div className="text-3xl font-black text-primary mb-2 tracking-tighter leading-tight">{item.rankOrClass}</div>
              <div className="text-lg font-bold text-slate-400 mb-4">{item.name}</div>
              <div className="text-xs font-black text-secondary tracking-widest uppercase bg-secondary/5 px-4 py-2 rounded-full">{item.stat}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 p-12 bg-primary rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/4 h-full bg-secondary/10 skew-x-12 translate-x-1/4" />
           <div className="relative z-10 flex items-center gap-8">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                 <TrendingUp size={32} className="text-secondary" />
              </div>
              <div>
                 <h4 className="text-3xl font-black italic">85% Selection Rate</h4>
                 <p className="text-indigo-200">Across all batches in 2024</p>
              </div>
           </div>
           <button onClick={() => navigate('/results')} className="btn-accent px-8 relative z-10 cursor-pointer">Historical Data</button>
        </div>
      </div>
    </section>
  );
};
