import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Timer, Share2, Award } from 'lucide-react';

const TESTS = [
  { id: 1, title: 'All India JEE Mock - IV', date: '24 May', duration: '3h', questions: 90, status: 'Active', color: 'bg-green-500' },
  { id: 2, title: 'Inorganic Chemistry Unit - 2', date: '26 May', duration: '1h', questions: 30, status: 'Upcoming', color: 'bg-amber-500' },
  { id: 3, title: 'Monthly Merit Assessment', date: '28 May', duration: '3h', questions: 90, status: 'Upcoming', color: 'bg-indigo-500' },
];

export const PortalTestSeries = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Exam <span className="text-secondary">Simulator.</span></h2>
           <p className="text-slate-500 font-medium">Standardized testing environments for real-world preparation.</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Test History</button>
           <button className="px-6 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">Schedule New</button>
        </div>
      </div>

      <div className="space-y-6">
        {TESTS.map((test, i) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-8 md:border-r border-slate-50 pr-12">
               <div className="text-center">
                  <div className="text-2xl font-black text-primary">{test.date.split(' ')[0]}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.date.split(' ')[1]}</div>
               </div>
               <div className={`w-12 h-12 rounded-2xl ${test.color} bg-opacity-10 flex items-center justify-center`}>
                  <ClipboardCheck className={test.color.replace('bg-', 'text-')} size={24} />
               </div>
            </div>

            <div className="flex-grow">
               <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${test.color} animate-pulse`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{test.status}</span>
               </div>
               <h3 className="text-2xl font-black text-primary tracking-tight">{test.title}</h3>
            </div>

            <div className="flex items-center gap-12 text-center md:border-l border-slate-50 pl-12">
               <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 justify-center"><Timer size={12}/> Time</div>
                  <div className="text-sm font-black text-primary italic">{test.duration}</div>
               </div>
               <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 justify-center"><Award size={12}/> Weight</div>
                  <div className="text-sm font-black text-primary italic">{test.questions} Q</div>
               </div>
            </div>

            <button className={`px-10 py-5 ${test.status === 'Active' ? 'bg-secondary text-primary' : 'bg-slate-50 text-slate-400'} rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform`}>
               {test.status === 'Active' ? 'Start Exam' : 'Registered'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
