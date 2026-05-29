import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  Bell,
  Search,
  UserCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';

import { ParentLogin } from '../components/portal/ParentLogin';
import { ParentDashboard as DashboardContent } from '../components/portal/ParentDashboard';
import { ParentFees } from '../components/portal/ParentFees';

type ParentSection = 'Overview' | 'Fees & Billing' | 'Academic Progress' | 'Attendance' | 'Teacher Connect';

export const ParentPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<ParentSection>('Overview');

  if (!isLoggedIn) {
    return <ParentLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const navItems: { label: ParentSection; icon: React.ReactNode }[] = [
    { label: 'Overview', icon: <UserCheck size={18} /> },
    { label: 'Academic Progress', icon: <BarChart3 size={18} /> },
    { label: 'Attendance', icon: <Calendar size={18} /> },
    { label: 'Fees & Billing', icon: <CreditCard size={18} /> },
    { label: 'Teacher Connect', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col py-10 px-8 relative z-50">
        <div className="flex items-center gap-3 mb-16 px-2">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xl -rotate-6">P</div>
           <div className="font-display font-black text-xl text-primary uppercase tracking-tighter">PARENT<span className="text-secondary text-base">CARE</span></div>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                activeSection === item.label 
                  ? 'bg-indigo-600 text-white shadow-xl translate-x-2' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <div className="flex items-center gap-4">
                 <div className={`${activeSection === item.label ? 'text-secondary' : 'group-hover:text-indigo-600'}`}>{item.icon}</div>
                 <span className="text-[11px] font-black uppercase tracking-widest leading-none pt-0.5">{item.label}</span>
              </div>
              {activeSection === item.label && <ChevronRight size={14} className="text-secondary" />}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
           <Link to="/" className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest">
              <LogOut size={18} className="rotate-180" /> Back to Home
           </Link>
           <button className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest">
              <Settings size={18} /> Account Settings
           </button>
           <button 
             onClick={() => setIsLoggedIn(false)}
             className="w-full flex items-center gap-4 p-4 text-rose-400 hover:text-rose-500 transition-all font-black text-[11px] uppercase tracking-widest"
           >
              <LogOut size={18} /> Secure Logout
           </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow relative overflow-y-auto">
        <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md px-8 md:px-12 py-6 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Center: Pune Kothrud • Academic Year 2026</span>
           </div>

           <div className="flex items-center gap-6">
              <button className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 shadow-sm">
                 <Bell size={18} />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-xl cursor-pointer hover:scale-105 transition-transform">
                 <Users size={20} />
              </div>
           </div>
        </header>

        <div className="px-8 md:px-12 py-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                  {activeSection === 'Overview' && <DashboardContent />}
                  {activeSection === 'Fees & Billing' && <ParentFees />}
                  {(activeSection === 'Academic Progress' || activeSection === 'Attendance' || activeSection === 'Teacher Connect') && (
                     <div className="p-20 text-center border-4 border-dashed border-slate-200 rounded-[4rem]">
                        <h3 className="text-3xl font-black text-slate-300 uppercase tracking-tighter italic">Coming Soon <br/><span className="text-secondary text-xl">Module Integration in progress.</span></h3>
                     </div>
                  )}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
