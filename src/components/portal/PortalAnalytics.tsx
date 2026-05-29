import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Brain, Target, Zap, TrendingUp } from 'lucide-react';

const PERFORMANCE_DATA = [
  { name: 'Physics', value: 85, avg: 65 },
  { name: 'Chemistry', value: 72, avg: 68 },
  { name: 'Maths', value: 94, avg: 70 },
  { name: 'Logic', value: 78, avg: 60 },
  { name: 'Speed', value: 88, avg: 65 },
];

const STRENGTHS = [
  { subject: 'Physics', fullMark: 100, A: 85, B: 65 },
  { subject: 'Chem', fullMark: 100, A: 70, B: 75 },
  { subject: 'Math', fullMark: 100, A: 95, B: 60 },
  { subject: 'Bio', fullMark: 100, A: 40, B: 70 },
  { subject: 'Verbal', fullMark: 100, A: 90, B: 80 },
];

export const PortalAnalytics = () => {
  return (
    <div className="space-y-12 pb-24">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Predictive <span className="text-secondary">Analytics.</span></h2>
           <p className="text-slate-500 font-medium">Data-driven insights to eliminate preparation blindspots.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Radar Chart */}
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-8 right-12 flex items-center gap-2">
              <Brain className="text-secondary" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Subject Competency</span>
           </div>
           
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={STRENGTHS}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar name="You" dataKey="A" stroke="#FB923C" fill="#FB923C" fillOpacity={0.4} />
                    <Radar name="Topper Avg" dataKey="B" stroke="#0f172a" fill="#0f172a" fillOpacity={0.1} />
                 </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Growth Curve */}
        <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-3xl text-white relative">
           <div className="absolute top-8 right-12 flex items-center gap-2">
              <TrendingUp className="text-secondary" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Growth Velocity</span>
           </div>

           <div className="h-[400px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                       <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#FB923C" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <InsightCard icon={<Target className="text-secondary" />} title="Accuracy" value="94.2%" desc="Above your 90-day baseline" />
         <InsightCard icon={<Zap className="text-blue-500" />} title="Speed" value="1.8m/q" desc="Targeting 1.5m for Finals" />
         <InsightCard icon={<Brain className="text-indigo-500" />} title="Efficiency" value="88/100" desc="System calculated retention" />
      </div>
    </div>
  );
};

const InsightCard = ({ icon, title, value, desc }: any) => (
  <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">{icon}</div>
     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
     <div className="text-3xl font-black text-primary mb-2 tracking-tight">{value}</div>
     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{desc}</p>
  </div>
);
