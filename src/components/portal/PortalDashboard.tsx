import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Target, Zap, Clock, ArrowUpRight, X, Send, User, Laptop } from 'lucide-react';
import teacherClassroomVideo from '../../assets/teacher_classroom.mp4';

export const PortalDashboard = ({ setActiveSection }: { setActiveSection: (section: any) => void }) => {
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Aman K.', message: 'Sir, what is the hybridization of Cl in ClO4-?', time: '4:32 PM' },
    { id: 2, user: 'Neha S.', message: 'sp3, right?', time: '4:33 PM' },
    { id: 3, user: 'Prof. Vikram', message: 'Correct, Neha. sp3 with tetrahedral geometry.', time: '4:33 PM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isClassOpen]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: chatMessages.length + 1,
      user: 'You',
      message: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate teacher response after 1.5 seconds
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          user: 'Prof. Vikram',
          message: 'Excellent point. Let us move to the transition metal complexes next.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Welcome Back, <span className="text-secondary">Rohan.</span></h2>
          <p className="text-slate-500 font-medium">Your current preparation velocity is <span className="text-primary font-black">4.2x faster</span> than the state average.</p>
        </div>
        <div className="px-6 py-3 bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-2">
           <Activity size={14} /> System Online
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Global Rank" value="#142" sub="Top 1%" icon={<Target className="text-blue-500" />} />
        <StatCard title="Accuracy" value="92%" sub="+2.4%" icon={<Zap className="text-amber-500" />} />
        <StatCard title="Time Spent" value="284h" sub="This Month" icon={<Clock className="text-indigo-500" />} />
        <StatCard title="Tests Taken" value="42" sub="3 Active" icon={<Activity className="text-green-500" />} />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black text-primary tracking-tight italic">Performance Curve</h3>
                 <button 
                   onClick={() => setActiveSection('Analytics')}
                   className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                 >
                    Detailed Analytics <ArrowUpRight size={14} />
                 </button>
              </div>
              {/* Mock Graph Layout */}
              <div className="h-64 flex items-end gap-2 px-4 shadow-inner bg-slate-50 rounded-2xl p-6">
                 {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t-lg relative group"
                   >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded">
                         {h}%
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-12">
           <div className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
              <h4 className="text-xl font-black mb-4 italic tracking-tight">Active Batch</h4>
              <div className="text-3xl font-black text-secondary mb-2 tracking-tighter">JEE ADV 2026</div>
              <p className="text-indigo-200 text-xs font-medium mb-8">Next Session: Inorganic Chemistry @ 4:30 PM Today</p>
              <button 
                onClick={() => setIsClassOpen(true)}
                className="w-full py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-primary transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Enter Virtual Class
              </button>
           </div>
        </div>
      </div>

      {/* Cyber Virtual Classroom Modal */}
      <AnimatePresence>
        {isClassOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsClassOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0b0f1e]/95 border border-white/10 rounded-[3rem] max-w-5xl w-full h-[85vh] relative overflow-hidden backdrop-blur-2xl z-10 shadow-2xl flex flex-col"
            >
              {/* Header bar */}
              <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-2">
                    <Laptop size={10} className="text-secondary" />
                    <span>[LIVE_SESSION // JEE_ADVANCED_INORGANIC]</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsClassOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Main Classroom splits */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left side: Live Video Feed */}
                <div className="flex-grow bg-slate-950/50 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-8 left-8 bg-rose-600/90 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 select-none z-10 shadow-md animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Live Stream</span>
                  </div>

                  <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/5 relative bg-slate-900">
                    <video 
                      src={teacherClassroomVideo} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right side: Chat Feed */}
                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/5 flex flex-col h-full bg-slate-950/20">
                  <div className="p-5 border-b border-white/5 select-none">
                    <h5 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Live Discussion Chat
                    </h5>
                  </div>

                  {/* Messages list */}
                  <div className="flex-grow p-5 overflow-y-auto space-y-4 font-sans text-slate-300">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="text-xs">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className={`font-black uppercase tracking-wider ${msg.user === 'You' ? 'text-secondary' : msg.user === 'Prof. Vikram' ? 'text-cyan-400' : 'text-slate-400'}`}>
                            {msg.user}
                          </span>
                          <span className="text-[9px] text-slate-500">{msg.time}</span>
                        </div>
                        <p className="bg-white/5 p-3 rounded-2xl border border-white/5 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Message Input box */}
                  <form onSubmit={sendMessage} className="p-4 border-t border-white/5 flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-grow bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-secondary transition-all"
                    />
                    <button 
                      type="submit"
                      className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ title, value, sub, icon }: any) => (
  <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
    <div className="flex justify-between items-start mb-6">
       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
          {icon}
       </div>
       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub}</span>
    </div>
    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
    <div className="text-3xl font-black text-primary tracking-tight">{value}</div>
  </div>
);
