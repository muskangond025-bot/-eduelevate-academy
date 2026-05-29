import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Bookmark, ExternalLink } from 'lucide-react';

const MATERIALS = [
  { title: "Organic Chemistry: Named Reactions", type: "PDF", size: "4.2 MB", date: "May 12, 2026", color: "text-rose-500", bg: "bg-rose-50" },
  { title: "Definite Integration: Solved Examples", type: "XLS", size: "1.8 MB", date: "May 08, 2026", color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Physics: 20-Year Previous Papers", type: "ZIP", size: "125 MB", date: "May 01, 2026", color: "text-amber-500", bg: "bg-amber-50" },
  { title: "Logical Reasoning Formula Sheet", type: "DOC", size: "0.5 MB", date: "Apr 28, 2026", color: "text-indigo-500", bg: "bg-indigo-50" },
];

export const PortalStudyMaterial = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">The <span className="text-secondary">Vault.</span></h2>
           <p className="text-slate-500 font-medium">Curated academic assets for deep conceptual clarity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MATERIALS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm flex items-center gap-8 hover:shadow-xl transition-all"
          >
            <div className={`w-20 h-20 rounded-3xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
               <FileText className={item.color} size={32} />
            </div>
            
            <div className="flex-grow min-w-0">
               <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${item.bg} ${item.color}`}>
                     {item.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.size}</span>
               </div>
               <h3 className="text-xl font-black text-primary tracking-tight truncate group-hover:text-secondary transition-colors italic-small">
                  {item.title}
               </h3>
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Added: {item.date}</div>
            </div>

            <div className="flex gap-4">
               <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Bookmark size={18} />
               </button>
               <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-lg active:scale-95">
                  <Download size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.1),transparent_50%)]" />
         <div className="max-w-2xl relative z-10">
            <h4 className="text-3xl font-black mb-6 tracking-tighter uppercase italic italic-small leading-tight">Can't Find Something? <br/><span className="text-secondary tracking-normal">Request Custom Material.</span></h4>
            <p className="text-slate-400 font-medium mb-10">Need specific practice problems or detailed notes on a topic? Our content cell will generate them for you in 48 hours.</p>
            <button className="px-10 py-5 bg-white text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-secondary transition-all flex items-center gap-2 text-xs">
               Submit Resource Request <ExternalLink size={14} />
            </button>
         </div>
      </div>
    </div>
  );
};
