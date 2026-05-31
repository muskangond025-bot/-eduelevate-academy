import React from 'react';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import blogHeroImg from '../../assets/blog_hero.png';

export const BlogHero = ({
  searchQuery,
  setSearchQuery
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => {
  return (
    <section className="pt-24 pb-16 bg-slate-50 sticky top-[80px] z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.05),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid for Title + 4K Image (No Overlay, Zero Text overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
          
          {/* Left Column: Clean text and typography */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
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
              className="text-5xl lg:text-7xl font-black text-primary mb-6 tracking-tighter italic uppercase leading-none"
            >
              The <span className="text-secondary italic">Academic</span> Journal.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 font-semibold leading-relaxed max-w-xl"
            >
              Deep dives into preparation strategies, mental conditioning, and institutional updates from the desk of our lead faculty.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="mt-10 w-full max-w-xl relative group"
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

          {/* Right Column: 4K Real Stock Image framed elegantly (No dark overlays, No text overlap) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div 
              className="w-full max-w-md aspect-[4/3] rounded-[3rem] border-8 border-slate-200/80 overflow-hidden shadow-2xl relative bg-slate-100 group/img cursor-pointer"
              style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle, rgba(251, 146, 60, 0.45), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* Sparks Trail */}
              <div className="absolute inset-0 z-10 pointer-events-none" />

              {/* The clean, ultra HD 4K image without overlays */}
              <img 
                src={blogHeroImg} 
                alt="Student Study Workspace" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />

              {/* Corner tech badge indicating 4K authenticity */}
              <span className="absolute bottom-4 right-6 font-mono text-[5px] text-white bg-slate-900/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider z-20">
                [NODE_FOCAL: 4K_UHD // CALIBRATED]
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
