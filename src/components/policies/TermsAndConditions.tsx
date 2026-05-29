import React from 'react';
import { motion } from 'motion/react';
import { Scale, UserCircle, CreditCard, AlertTriangle } from 'lucide-react';

export const TermsAndConditions = () => {
  const sections = [
    {
      id: 'rules',
      title: 'Rules',
      icon: <Scale className="text-primary" />,
      content: 'Users must comply with all local laws and our community guidelines. Any form of harassment, hate speech, or inappropriate behavior within our virtual classrooms will lead to immediate suspension.'
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: <UserCircle className="text-secondary" />,
      content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information and keep it updated throughout your enrollment period.'
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: <CreditCard className="text-blue-600" />,
      content: 'All course fees must be paid in accordance with the specified schedule. Delays in payment may result in temporary restricted access to the PortalPro system and learning materials.'
    },
    {
      id: 'liability',
      title: 'Liability',
      icon: <AlertTriangle className="text-rose-500" />,
      content: 'AcademyPro is not liable for indirect, incidental, or consequential damages arising out of your use of the platform. We do not guarantee specific academic results, as performance depends on individual effort.'
    }
  ];

  return (
    <div id="terms-conditions" className="space-y-16 py-20 border-t border-slate-100">
      <div className="border-l-4 border-primary pl-8 py-2 text-right md:text-left">
         <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Terms & <span className="text-primary/50">Conditions.</span></h2>
         <p className="text-slate-500 font-medium italic-small">General Service Agreement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-10 bg-slate-900 text-white rounded-[3rem] border border-white/5 hover:border-secondary/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
               {React.cloneElement(section.icon as React.ReactElement, { size: 100 })}
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
               {section.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 tracking-tight relative z-10">{section.title}</h3>
            <p className="text-slate-400 font-medium leading-relaxed relative z-10">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
