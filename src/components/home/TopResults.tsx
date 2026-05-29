import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, TrendingUp, CheckCircle } from 'lucide-react';

const results = [
  { name: "Rohan Sharma", rank: "AIR 12", score: "342/360", exam: "JEE Advanced", img: "https://i.pravatar.cc/300?u=r1" },
  { name: "Ananya Gupta", rank: "AIR 08", score: "715/720", exam: "NEET UG", img: "https://i.pravatar.cc/300?u=a1" },
  { name: "Siddharth Roy", rank: "AIR 24", score: "99.98%tile", exam: "MHT-CET", img: "https://i.pravatar.cc/300?u=s1" },
];

export const TopResults = () => {
  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-6">Hall of <span className="text-secondary italic">Champions</span></h2>
          <p className="text-indigo-200 text-lg font-medium max-w-xl mx-auto opacity-80">Our legacy is built on the sweat and success of these exceptional minds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {results.map((topper, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 flex flex-col items-center text-center group hover:bg-white/10 transition-all shadow-2xl"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-40 h-40 rounded-full border-4 border-secondary/30 p-2">
                   <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img src={topper.img} alt={topper.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-accent text-primary font-black px-4 py-2 rounded-xl text-lg shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  {topper.rank}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{topper.name}</h3>
              <div className="text-xs font-black text-secondary tracking-[0.2em] uppercase mb-6">{topper.exam}</div>
              
              <div className="w-full bg-white/10 rounded-2xl p-4 border border-white/5 flex items-center justify-between group-hover:bg-secondary/20 transition-all">
                <span className="text-[10px] font-bold text-indigo-300 uppercase">Scorecard Verified</span>
                <span className="text-lg font-black text-white">{topper.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Verification Tick Banner */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest"><CheckCircle size={16}/> IIT-JEE 2025</div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest"><CheckCircle size={16}/> NEET 2025</div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest"><CheckCircle size={16}/> CET 2025</div>
        </div>
      </div>
    </section>
  );
};
