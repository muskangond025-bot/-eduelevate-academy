import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Info, AlertTriangle, Calendar, X, CheckCircle2 } from 'lucide-react';

const ANNOUNCEMENTS = [
  { 
    id: 1, 
    type: 'CRITICAL', 
    title: 'Admit Card released for JEE Main Session 2', 
    date: 'Just now', 
    icon: <AlertTriangle className="text-rose-500" />, 
    bg: 'bg-rose-50',
    details: 'The National Testing Agency (NTA) has officially released the Admit Cards for the JEE Main 2026 Session 2 exam. Students are advised to download their admit cards immediately from the official portal and verify their exam center, date, and slot timing. Please contact the administrative department in case of any discrepancy.'
  },
  { 
    id: 2, 
    type: 'UPDATE', 
    title: 'New Physics Module added to the Repository', 
    date: '2 hours ago', 
    icon: <Info className="text-blue-500" />, 
    bg: 'bg-blue-50',
    details: "A comprehensive new preparation module focusing on Modern Physics and Semiconductor Devices has been uploaded to 'The Vault'. It contains 150+ solved problems, JEE Advanced level subjective exercises, and quick summary formula cards. Access it from the Study Material section."
  },
  { 
    id: 3, 
    type: 'SCHEDULE', 
    title: 'Special Sunday Workshop on Time Management', 
    date: 'Yesterday', 
    icon: <Calendar className="text-amber-500" />, 
    bg: 'bg-amber-50',
    details: "Join us this Sunday at 10:00 AM in the Main Auditorium for an interactive seminar with senior counselors on 'Cracking JEE/NEET with Effective Time Management'. Learn how to split your revision cycles, handle negative markings, and build high-scoring test strategies."
  },
  { 
    id: 4, 
    type: 'NEWS', 
    title: 'Institutional Toppers list updated for April', 
    date: '2 days ago', 
    icon: <Bell className="text-indigo-500" />, 
    bg: 'bg-indigo-50',
    details: "The monthly ranking boards and honors list have been updated after the Monthly Merit Assessment. Rohan Shrivastava has secured AIR 1 in the Elite Batch category. The full merit list has been displayed on the notice board and inside the detailed reports. Keep striving for excellence!"
  },
];

export const PortalAnnouncements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof ANNOUNCEMENTS[0] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

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
            onClick={() => setSelectedAnnouncement(news)}
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
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAnnouncement(news);
              }}
              className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all cursor-pointer border border-transparent"
            >
              Details
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="p-12 border-2 border-dashed border-slate-200 rounded-[4rem] text-center max-w-4xl">
         <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">End of feed. All notifications verified.</p>
      </div>

      {/* Details Viewport Modal */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Icon Type Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${selectedAnnouncement.bg} flex items-center justify-center shrink-0`}>
                   {selectedAnnouncement.icon}
                </div>
                <div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${selectedAnnouncement.type === 'CRITICAL' ? 'text-rose-500' : 'text-slate-400'}`}>
                     {selectedAnnouncement.type}
                  </span>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{selectedAnnouncement.date}</div>
                </div>
              </div>

              {/* Title & Details */}
              <h3 className="text-2xl font-black text-primary tracking-tight italic-small mb-4 leading-snug">
                {selectedAnnouncement.title}
              </h3>
              
              <p className="text-slate-500 font-medium text-xs leading-relaxed mb-8">
                {selectedAnnouncement.details}
              </p>

              {/* CTA button */}
              <button 
                onClick={() => {
                  triggerToast(`Acknowledged: "${selectedAnnouncement.title}"`);
                  setSelectedAnnouncement(null);
                }}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                 Acknowledge & Dismiss
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#0c0f1d] border border-indigo-500/30 text-white rounded-3xl p-5 shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-secondary" size={16} />
            </div>
            <p className="text-xs font-bold leading-tight">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

