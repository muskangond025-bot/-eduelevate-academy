import React from 'react';
import { motion } from 'motion/react';
import { Bell, Info, AlertTriangle, Calendar } from 'lucide-react';

const ANNOUNCEMENTS = [
  { id: 1, type: 'CRITICAL', title: 'Admit Card released for JEE Main Session 2', date: 'Just now', icon: <AlertTriangle className="text-rose-500" />, bg: 'bg-rose-50' },
  { id: 2, type: 'UPDATE', title: 'New Physics Module added to the Repository', date: '2 hours ago', icon: <Info className="text-blue-500" />, bg: 'bg-blue-50' },
  { id: 3, type: 'SCHEDULE', title: 'Special Sunday Workshop on Time Management', date: 'Yesterday', icon: <Calendar className="text-amber-500" />, bg: 'bg-amber-50' },
  { id: 4, type: 'NEWS', title: 'Institutional Toppers list updated for April', date: '2 days ago', icon: <Bell className="text-indigo-500" />, bg: 'bg-indigo-50' },
];

export const PortalAnnouncements = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Institutional <span className="text-secondary">Pulse.</span></h2>
           <p className="text-slate-500 font-medium">Verified updates from the central academic council.</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {ANNOUNCEMENTS.map((news, i) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-slate-50 rounded-[2.5rem] flex items-center gap-8 group hover:border-slate-200 transition-all cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-2xl ${news.bg} flex items-center justify-center shrink-0`}>
               {news.icon}
            </div>
            
            <div className="flex-grow">
               <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${news.type === 'CRITICAL' ? 'text-rose-500' : 'text-slate-400'}`}>
                     {news.type}
                  </span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.date}</span>
               </div>
               <h3 className="text-xl font-black text-primary group-hover:text-secondary transition-colors italic-small">
                  {news.title}
               </h3>
            </div>
            
            <button className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Details</button>
          </motion.div>
        ))}
      </div>
      
      <div className="p-12 border-2 border-dashed border-slate-200 rounded-[4rem] text-center max-w-4xl">
         <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">End of feed. All notifications verified.</p>
      </div>
    </div>
  );
};
