import React from 'react';
import { motion } from 'motion/react';
import { Activity, Target, Zap, Clock, ArrowUpRight } from 'lucide-react';

export const PortalDashboard = () => {
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
                 <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors">
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
              <button className="w-full py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-colors">Enter Virtual Class</button>
           </div>
        </div>
      </div>
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
