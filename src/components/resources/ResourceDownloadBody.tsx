import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileDown, CheckCircle, Mail, User, BookOpen } from 'lucide-react';

export const ResourceDownloadBody = ({ description, previewImg }: { description: string, previewImg: string }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloaded(true);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Description & Preview */}
          <div className="lg:w-3/5">
             <div className="mb-16">
                <h3 className="text-3xl font-black text-primary tracking-tighter mb-6 underline decoration-secondary decoration-8 underline-offset-4">Module Overview</h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed italic-small">{description}</p>
             </div>

             <div>
                <h3 className="text-3xl font-black text-primary tracking-tighter mb-8 italic uppercase">Visual <span className="text-secondary italic">Snapshot</span></h3>
                <div className="aspect-[4/3] bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl group cursor-zoom-in">
                   <img 
                     src={previewImg} 
                     alt="Resource Preview" 
                     className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-110" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-primary shadow-xl">Click to expand preview</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/5">
             <div className="sticky top-24">
                <motion.div
                  className="bg-slate-900 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden text-white"
                >
                   {isDownloaded ? (
                     <div className="text-center py-12">
                        <div className="w-20 h-20 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                           <CheckCircle size={32} />
                        </div>
                        <h4 className="text-2xl font-black mb-4">Link Sent!</h4>
                        <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase tracking-widest">The PDF has been dispatched to your mailbox. Check your spam if not found.</p>
                        <button onClick={() => setIsDownloaded(false)} className="text-secondary font-black text-xs uppercase tracking-widest hover:underline">Download Again?</button>
                     </div>
                   ) : (
                     <form onSubmit={handleDownload} className="relative z-10 space-y-8">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary">
                              <FileDown size={24} />
                           </div>
                           <h4 className="text-2xl font-black tracking-tighter italic">Free Download</h4>
                        </div>

                        <div className="space-y-6">
                           <div>
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Your Name</label>
                              <div className="relative">
                                 <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                 <input type="text" required className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-secondary transition-all font-bold" placeholder="E.g. Akash Roy" />
                              </div>
                           </div>
                           <div>
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Email Identity</label>
                              <div className="relative">
                                 <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                 <input type="email" required className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-secondary transition-all font-bold" placeholder="your@email.com" />
                              </div>
                           </div>
                           <div>
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Interest</label>
                              <div className="relative">
                                 <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                 <select required className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-secondary transition-all font-bold appearance-none">
                                    <option value="">Select Target</option>
                                    <option value="jee">IIT-JEE Focus</option>
                                    <option value="neet">NEET Specialized</option>
                                    <option value="board">Grade 10/12 Boards</option>
                                 </select>
                              </div>
                           </div>
                        </div>

                        <button type="submit" className="w-full py-5 bg-secondary text-primary rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-transform active:scale-95 shadow-xl">
                           Send PDF to Mail
                        </button>
                        <p className="text-center text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] leading-relaxed">By downloading, you join our academic newsletter list. Unsubscribe anytime.</p>
                     </form>
                   )}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                </motion.div>
                
                <div className="mt-12 p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50 flex items-start gap-4">
                   <div className="w-4 h-4 bg-secondary rounded-full mt-1 shrink-0" />
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Verified by Faculty: <br/><span className="text-primary">All notes are reviewed by IITian mentors for 100% accuracy.</span></p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
