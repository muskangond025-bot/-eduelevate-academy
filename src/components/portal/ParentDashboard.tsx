import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, CreditCard, MessageSquare, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';

const ATTENDANCE_DATA = [
  { month: 'Jan', val: 95 },
  { month: 'Feb', val: 88 },
  { month: 'Mar', val: 92 },
  { month: 'Apr', val: 96 },
];

export const ParentDashboard = () => {
  return (
    <div className="space-y-12">
      {/* Child Profile Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">
         <div className="absolute top-0 right-0 p-12 opacity-5"><UserCheck size={120} /></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=r1" alt="Student" className="w-full h-full object-cover" />
            </div>
            <div>
               <div className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Student Profile</div>
               <h2 className="text-3xl font-black text-primary tracking-tight">Rohan Shrivastava</h2>
               <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs font-bold text-slate-400">JEE 2026 Batch</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-xs font-bold text-green-500">Active Status</span>
               </div>
            </div>
         </div>
         <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">Download Report</button>
            <button className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all"><MessageSquare size={20}/></button>
         </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Attendance</div>
            <div className="text-4xl font-black text-primary">94.2%</div>
            <div className="text-[10px] font-bold text-green-500 mt-2 flex items-center gap-1"><TrendingUp size={12}/> Exemplary performance</div>
         </div>
         <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent Test Rank</div>
            <div className="text-4xl font-black text-secondary">#14</div>
            <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Out of 250 Students</div>
         </div>
         <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pending Dues</div>
            <div className="text-4xl font-black text-rose-500">Nil</div>
            <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Next Payment: June 15</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Monthly Progress Chart */}
         <div className="lg:col-span-2 bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-black italic tracking-tight">Attendance & Engagement</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 bg-secondary rounded-full" /> Growth</div>
               </div>
            </div>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ATTENDANCE_DATA}>
                     <defs>
                        <linearGradient id="parentCurve" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="month" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                     <Area type="monotone" dataKey="val" stroke="#FB923C" strokeWidth={4} fill="url(#parentCurve)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Teacher Remarks & Notices */}
         <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
               <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Faculty Feedback</h4>
               <div className="space-y-6">
                  {[
                    { teacher: 'Prof. Verma', text: 'Exceptional focus in Mechanics tests.', type: 'positive' },
                    { teacher: 'Dr. Khanna', text: 'Needs to review Organic reaction mechanism.', type: 'warning' }
                  ].map((rem, i) => (
                    <div key={i} className="flex gap-4 items-start pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                       <div className={`mt-1 ${rem.type === 'positive' ? 'text-green-500' : 'text-amber-500'}`}><AlertCircle size={16} /></div>
                       <div>
                          <div className="text-[10px] font-black text-primary uppercase mb-1">{rem.teacher}</div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">{rem.text}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
