import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Clock, Target, ShieldCheck } from 'lucide-react';

export const AnalyticsFeatures = () => {
  const features = [
    {
      icon: <BrainCircuit />,
      title: "AI Gap Analysis",
      desc: "Our neural network identifies exactly which sub-topic (e.g., Ionic Equilibrium) is dragging your score down."
    },
    {
      icon: <Clock />,
      title: "Time Distribution",
      desc: "See how much time you spend on 'Easy' vs 'Hard' questions to optimize your paper-solving speed."
    },
    {
      icon: <Target />,
      title: "Negative Marking Shield",
      desc: "Pattern analysis to find if you're making 'Silly Mistakes' or 'Conceptual Errors' in wrong attempts."
    },
    {
      icon: <ShieldCheck />,
      title: "Batch Benchmark",
      desc: "Instant comparison with the batch average and top 1% to keep you competitively aligned."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black text-primary tracking-tighter mb-20 italic uppercase italic-small">Analytical <span className="text-secondary">Core.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
           {features.map((f, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all group"
             >
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                   {React.cloneElement(f.icon, { size: 28 })}
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 leading-tight">{f.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed italic-small">{f.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
