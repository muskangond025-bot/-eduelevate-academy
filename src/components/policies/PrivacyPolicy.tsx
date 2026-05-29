import React from 'react';
import { motion } from 'motion/react';
import { Database, Eye, Cookie, Shield } from 'lucide-react';

export const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      icon: <Database className="text-secondary" />,
      content: 'We collect information that you provide directly to us, such as when you create an account, enroll in a course, or contact our support team. This include names, email addresses, phone numbers, and academic backgrounds necessary for providing our educational services.'
    },
    {
      id: 'data-usage',
      title: 'Data Usage',
      icon: <Eye className="text-blue-500" />,
      content: 'Your data is used to personalize your learning experience, process transactions, and send you important updates regarding your courses. We also use aggregated, non-identifying data to improve our curriculum and platform algorithms.'
    },
    {
      id: 'cookies',
      title: 'Cookies',
      icon: <Cookie className="text-amber-500" />,
      content: 'Our platform uses cookies and similar tracking technologies to analyze trends, administer the website, and track users’ movements around the site. You can control the use of cookies at the individual browser level.'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="text-green-500" />,
      content: 'We implement robust security measures, including SSL encryption and multi-factor authentication, to protect your personal information. However, no method of transmission over the internet is 100% secure, and we strive to use commercially acceptable means to protect it.'
    }
  ];

  return (
    <div id="privacy-policy" className="space-y-16">
      <div className="border-l-4 border-secondary pl-8 py-2">
         <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Privacy <span className="text-secondary">Policy.</span></h2>
         <p className="text-slate-500 font-medium">Last Updated: April 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group"
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
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
