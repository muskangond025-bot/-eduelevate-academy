import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  FileText, 
  Bookmark, 
  ExternalLink, 
  X, 
  Sparkles, 
  UploadCloud, 
  CheckCircle,
  HelpCircle,
  Pause,
  Play,
  Folder
} from 'lucide-react';

const MATERIALS = [
  { id: 1, title: "Organic Chemistry: Named Reactions", type: "PDF", size: "4.2 MB", date: "May 12, 2026", color: "text-rose-500", bg: "bg-rose-50" },
  { id: 2, title: "Definite Integration: Solved Examples", type: "XLS", size: "1.8 MB", date: "May 08, 2026", color: "text-blue-500", bg: "bg-blue-50" },
  { id: 3, title: "Physics: 20-Year Previous Papers", type: "ZIP", size: "125 MB", date: "May 01, 2026", color: "text-amber-500", bg: "bg-amber-50" },
  { id: 4, title: "Logical Reasoning Formula Sheet", type: "DOC", size: "0.5 MB", date: "Apr 28, 2026", color: "text-indigo-500", bg: "bg-indigo-50" },
];

export const PortalStudyMaterial = ({ searchQuery }: { searchQuery: string }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [toastTimeoutId, setToastTimeoutId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Request Modal states
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestFormat, setRequestFormat] = useState('PDF');
  const [requestExam, setRequestExam] = useState('JEE Main');
  const [requestUrgency, setRequestUrgency] = useState('Standard');

  const showToast = (message: string) => {
    setIsPaused(false);
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToast({ message, visible: true });
    const timerId = window.setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
    setToastTimeoutId(timerId);
  };

  const toggleBookmark = (id: number, title: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
      showToast(`Removed "${title}" from your bookmarks.`);
    } else {
      setBookmarkedIds(prev => [...prev, id]);
      showToast(`Added "${title}" to your bookmarks!`);
    }
  };

  const handleDownload = (title: string, size: string) => {
    showToast(`Downloading ${title} (${size})...`);
    setTimeout(() => {
      showToast(`Successfully downloaded ${title}!`);
    }, 1500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTitle.trim()) {
      showToast('Please specify a resource topic.');
      return;
    }

    showToast(`Request submitted for "${requestTitle.trim()}"!`);
    
    // Reset fields & Close
    setRequestTitle('');
    setRequestFormat('PDF');
    setRequestExam('JEE Main');
    setRequestUrgency('Standard');
    setIsRequestModalOpen(false);
  };

  const filteredMaterials = MATERIALS.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">The <span className="text-secondary">Vault.</span></h2>
           <p className="text-slate-500 font-medium">Curated academic assets for deep conceptual clarity.</p>
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center max-w-xl mx-auto space-y-6 shadow-sm"
        >
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
             <FileText size={36} />
          </div>
          <h3 className="text-2xl font-black text-primary tracking-tight italic-small">No Materials Found</h3>
          <p className="text-slate-500 font-medium text-sm">We couldn't find any documents matching "{searchQuery}". Check the spelling or browse other study categories.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMaterials.map((item, i) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
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
                   <button 
                     onClick={() => toggleBookmark(item.id, item.title)}
                     className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
                       isBookmarked 
                         ? 'bg-amber-500 border-amber-500 text-white shadow-md' 
                         : 'bg-slate-50 border-transparent text-slate-400 hover:bg-secondary hover:text-primary'
                     }`}
                   >
                      <Bookmark size={18} className={isBookmarked ? 'fill-white' : ''} />
                   </button>
                   <button 
                     onClick={() => handleDownload(item.title, item.size)}
                     className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-lg active:scale-95 cursor-pointer border border-transparent"
                   >
                      <Download size={18} />
                   </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.1),transparent_50%)]" />
         <div className="max-w-2xl relative z-10">
            <h4 className="text-3xl font-black mb-6 tracking-tighter uppercase italic italic-small leading-tight">Can't Find Something? <br/><span className="text-secondary tracking-normal">Request Custom Material.</span></h4>
            <p className="text-slate-400 font-medium mb-10">Need specific practice problems or detailed notes on a topic? Our content cell will generate them for you in 48 hours.</p>
            <button 
              onClick={() => setIsRequestModalOpen(true)}
              className="px-10 py-5 bg-white text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-secondary transition-all flex items-center gap-2 text-xs cursor-pointer border border-transparent hover:scale-105 active:scale-95"
            >
               Submit Resource Request <ExternalLink size={14} />
            </button>
         </div>
      </div>

      {/* Resource Request Modal */}
      <AnimatePresence>
        {isRequestModalOpen && (
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
                onClick={() => setIsRequestModalOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer animate-none"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="mb-8">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-2 flex items-center gap-1.5"><Sparkles size={12} /> Resource Request</span>
                <h3 className="text-3xl font-black text-primary tracking-tight italic-small leading-none">Request Custom Material</h3>
              </div>

              {/* Form */}
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Topic / Subject Title</label>
                  <input 
                    type="text" 
                    value={requestTitle}
                    onChange={(e) => setRequestTitle(e.target.value)}
                    placeholder="e.g. Rotational Mechanics Solved Problems"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-1"><FileText size={10} /> Format</label>
                    <select
                      value={requestFormat}
                      onChange={(e) => setRequestFormat(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary cursor-pointer appearance-none"
                    >
                      <option value="PDF">PDF Notes</option>
                      <option value="XLS">XLS Practice</option>
                      <option value="ZIP">ZIP Papers</option>
                      <option value="DOC">DOC Sheets</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-1"><HelpCircle size={10} /> Target Level</label>
                    <select
                      value={requestExam}
                      onChange={(e) => setRequestExam(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary cursor-pointer appearance-none"
                    >
                      <option value="JEE Main">JEE Main</option>
                      <option value="JEE Advanced">JEE Advanced</option>
                      <option value="NEET">NEET</option>
                      <option value="Boards">Boards</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-1"><UploadCloud size={10} /> Urgency</label>
                  <select
                    value={requestUrgency}
                    onChange={(e) => setRequestUrgency(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary cursor-pointer appearance-none"
                  >
                    <option value="Standard">Standard (48 hours)</option>
                    <option value="Express">Express (24 hours)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 cursor-pointer mt-4"
                >
                   Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Alert */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-6 bg-[#0c0f1d]/95 border border-indigo-500/30 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.5)] max-w-sm flex items-start gap-4 text-white"
            style={{
              boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Download size={20} className={isPaused ? "animate-none" : "animate-bounce"} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                {isPaused ? "Download Paused" : "Download Active"} <Sparkles size={12} className="text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isPaused ? "Download task suspended. Thread state preserved." : toast.message}
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isPaused ? { width: "40%" } : { width: '100%' }}
                  transition={isPaused ? { duration: 0 } : { duration: 3.5, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                />
              </div>

              {/* Pause & Folder controls */}
              <div className="flex items-center gap-3 mt-3.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPaused(!isPaused);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[9px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer select-none text-indigo-200"
                >
                  {isPaused ? <Play size={10} /> : <Pause size={10} />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[9px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer select-none text-indigo-200"
                >
                  <Folder size={10} /> Folder
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

