import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Zap, Clock } from 'lucide-react';

export const RefundPolicy = () => {
  const sections = [
    {
      id: 'refund-eligibility',
      title: 'Refund Eligibility',
      icon: <CheckCircle className="text-green-500" />,
      content: 'Refunds are applicable only for requests made within 7 days of enrollment or before the commencement of the first lecture, whichever is earlier. Specialized workshops are non-refundable.'
    },
    {
      id: 'refund-process',
      title: 'Refund Process',
      icon: <Zap className="text-amber-500" />,
      content: 'To initiate a refund, please submit a request through your PortalPro dashboard or email our finance desk with your transaction ID. We may require proof of purchase and identification.'
    },
    {
      id: 'refund-timeline',
      title: 'Refund Timeline',
      icon: <Clock className="text-secondary" />,
      content: 'Once approved, refunds are processed within 10-15 business days. The amount will be credited back to the original source of payment (Bank/UPI/Card) used during the transaction.'
    }
  ];

  return (
    <div id="refund-policy" className="space-y-16 py-20 border-t border-slate-100">
      <div className="border-l-4 border-amber-500 pl-8 py-2">
         <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Refund <span className="text-amber-500">Policy.</span></h2>
         <p className="text-slate-500 font-medium">Clear & Effortless Returns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-50 transition-colors">
               {section.icon}
            </div>
            <h3 className="text-2xl font-black text-primary mb-4 tracking-tight">{section.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
