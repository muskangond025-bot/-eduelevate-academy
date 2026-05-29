import React from 'react';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';

export const BlogHero = ({
  searchQuery,
  setSearchQuery
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => {
  return (
    <section className="pt-32 pb-16 bg-slate-50 sticky top-[80px] z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.05),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full text-secondary font-black text-[10px] uppercase tracking-widest mb-8"
        >
          Institutional Insights
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-8xl font-black text-primary mb-8 tracking-tighter italic uppercase"
        >
          The <span className="text-secondary italic">Academic</span> Journal.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 max-w-3xl mx-auto font-medium"
        >
          Deep dives into preparation strategies, mental conditioning, and institutional updates from the desk of our lead faculty.
        </motion.p>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="mt-12 max-w-xl mx-auto relative group"
        >
           <Search className="absolute left-24 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" size={20} />
           <input 
             type="text" 
             placeholder="Search articles, strategies or news..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-64 pr-64 py-5 bg-white border border-slate-100 rounded-full outline-none shadow-xl focus:ring-4 focus:ring-secondary/10 transition-all font-bold" 
           />
           {searchQuery && (
             <button
               onClick={() => setSearchQuery("")}
               className="absolute right-24 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
               aria-label="Clear search"
             >
               <X size={16} />
             </button>
           )}
        </motion.div>
      </div>
    </section>
  );
};
