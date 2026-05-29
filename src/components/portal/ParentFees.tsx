import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Download, ExternalLink, ShieldCheck } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TX-8821', date: 'Apr 10, 2026', amount: '₹45,000', method: 'UPI', desc: 'Instalment 3 (JEE Core)', status: 'Success' },
  { id: 'TX-7642', date: 'Feb 12, 2026', amount: '₹45,000', method: 'Card', desc: 'Instalment 2 (JEE Core)', status: 'Success' },
  { id: 'TX-5291', date: 'Dec 15, 2025', amount: '₹90,000', method: 'NEFT', desc: 'Admission & Instalment 1', status: 'Success' },
];

export const ParentFees = () => {
  return (
    <div className="space-y-12 pb-24">
       <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Fee <span className="text-secondary">Summary.</span></h2>
           <p className="text-slate-500 font-medium">Manage tuition payments and academic insurance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Summary Card */}
         <div className="bg-primary text-white p-12 rounded-[4rem] shadow-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><CreditCard size={150} /></div>
            <div className="relative z-10">
               <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4">Total Program Fee</div>
               <div className="text-5xl font-black mb-8 tracking-tighter">₹2,25,000</div>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-indigo-200">Paid Amount</span>
                     <span className="font-black">₹1,80,000</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="w-[80%] h-full bg-secondary" />
                  </div>
               </div>
            </div>
            
            <div className="pt-12 relative z-10">
               <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                  <div className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Scholarship Applied</div>
                  <div className="text-sm font-bold">25% (NST 2025 Tier II)</div>
               </div>
            </div>
         </div>

         {/* Transactions List */}
         <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Transaction History</h4>
            <div className="space-y-4">
               {TRANSACTIONS.map((tx, i) => (
                 <motion.div
                   key={tx.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 bg-white border border-slate-50 rounded-[2.5rem] flex items-center justify-between group hover:shadow-xl transition-all"
                 >
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary transition-colors"><ShieldCheck size={24} /></div>
                       <div>
                          <div className="text-sm font-black text-primary mb-1">{tx.desc}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.date} • {tx.method}</div>
                       </div>
                    </div>
                    <div className="text-right flex items-center gap-8">
                       <div>
                          <div className="text-xl font-black text-primary">{tx.amount}</div>
                          <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{tx.status}</div>
                       </div>
                       <button className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center hover:text-primary transition-colors"><Download size={18} /></button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
