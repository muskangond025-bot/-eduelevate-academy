import React from 'react';
import { motion } from 'motion/react';
import { Home, Globe, Calendar, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BatchFeesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-primary tracking-tighter mb-6">Batch & <span className="text-secondary italic">Fee Structure</span></h2>
          <p className="text-lg text-slate-500 font-medium">Transparent details to help you plan your academic investment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Offline Batch */}
          <BatchCard 
            icon={<Home />} 
            title="Standard Offline" 
            mode="In-Campus"
            features={["Library Access", "Face-to-Face Mentoring", "Physical Study Material", "Biometric Attendance"]}
            price="₹1,20,000 /yr"
            cta="Inquire Hub"
            onClick={() => navigate('/contact')}
          />
          {/* Online Batch */}
          <BatchCard 
            icon={<Globe />} 
            title="Elite Online" 
            mode="Live Interactive"
            features={["Recorded Sessions", "Digital Portal Access", "PDF Modules", "Live Chat Support"]}
            price="₹75,000 /yr"
            cta="Enroll Online"
            featured
            onClick={() => navigate('/scholarship')}
          />
          {/* Weekend Batch */}
          <BatchCard 
            icon={<Calendar />} 
            title="Weekend Target" 
            mode="Hybrid Mode"
            features={["Sat & Sun Sessions", "Tailored for Schoolers", "Doubt Apps Access", "Weekly Planner"]}
            price="₹95,000 /yr"
            cta="Limited Slots"
            onClick={() => navigate('/book-demo')}
          />
        </div>
        
        <div className="mt-16 text-center">
           <div className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <CreditCard size={14} className="text-secondary" /> Flexible EMI options and Scholarship waivers up to 100% available.
           </div>
        </div>
      </div>
    </section>
  );
};

const BatchCard = ({ icon, title, mode, features, price, cta, onClick, featured = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-10 rounded-[3.5rem] flex flex-col ${featured ? 'bg-primary text-white ring-8 ring-secondary/10 shadow-2xl scale-105 relative z-10' : 'bg-white text-primary border border-slate-100 shadow-xl'}`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${featured ? 'bg-white/10 text-secondary' : 'bg-slate-50 text-secondary border border-slate-100'}`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{mode}</div>
    <h3 className="text-3xl font-bold mb-8 leading-tight tracking-tight">{title}</h3>
    
    <div className="space-y-4 mb-12 flex-grow">
       {features.map((f: any, i: any) => (
         <div key={i} className={`flex items-center gap-3 text-sm font-medium ${featured ? 'text-indigo-200' : 'text-slate-500'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${featured ? 'bg-secondary' : 'bg-slate-200'}`} />
            {f}
         </div>
       ))}
    </div>

    <div className={`pt-8 border-t ${featured ? 'border-white/10' : 'border-slate-50'}`}>
       <div className={`text-3xl font-black mb-6 ${featured ? 'text-secondary' : 'text-primary'}`}>{price}</div>
       <button onClick={onClick} className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all cursor-pointer ${featured ? 'bg-secondary text-primary hover:shadow-2xl shadow-secondary/20' : 'bg-slate-100 text-primary hover:bg-primary hover:text-white'}`}>
         {cta}
       </button>
    </div>
  </motion.div>
);
