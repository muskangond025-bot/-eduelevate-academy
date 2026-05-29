import React from 'react';
import { motion } from 'motion/react';
import { LogIn, Users } from 'lucide-react';

export const ParentLogin = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.1),transparent_50%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-12 relative z-10 shadow-3xl"
      >
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6">
              <Users className="text-white" size={32} />
           </div>
           <h2 className="text-3xl font-black text-primary tracking-tighter uppercase italic">Parent <span className="text-secondary">Access.</span></h2>
           <p className="text-slate-400 font-medium">Monitor your child's academic growth and milestones.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Parent Mobile / ID</label>
              <input 
                type="text" 
                placeholder="+91 98XXX XXXXX" 
                className="w-full px-8 py-5 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-primary" 
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-8 py-5 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-primary" 
              />
           </div>

           <button 
             type="submit"
             className="w-full py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
           >
              Access Dashboard <LogIn size={20} />
           </button>
        </form>

        <div className="mt-8 text-center text-xs font-bold text-slate-400">
           Forgot credentials? <a href="#" className="text-secondary uppercase cursor-pointer">Contact Support</a>
        </div>
      </motion.div>
    </div>
  );
};
