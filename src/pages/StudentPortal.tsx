import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardCheck, 
  BarChart3, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  User,
  ChevronRight,
  Search,
  Zap
} from 'lucide-react';

import { PortalLogin } from '../components/portal/PortalLogin';
import { PortalDashboard } from '../components/portal/PortalDashboard';
import { PortalCourses } from '../components/portal/PortalCourses';
import { PortalTestSeries } from '../components/portal/PortalTestSeries';
import { PortalAnalytics } from '../components/portal/PortalAnalytics';
import { PortalStudyMaterial } from '../components/portal/PortalStudyMaterial';
import { PortalAnnouncements } from '../components/portal/PortalAnnouncements';

type PortalSection = 'Dashboard' | 'Courses' | 'Test Series' | 'Analytics' | 'Study Material' | 'Announcements';

export const StudentPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<PortalSection>('Dashboard');

  if (!isLoggedIn) {
    return <PortalLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const navItems: { label: PortalSection; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Courses', icon: <BookOpen size={18} /> },
    { label: 'Test Series', icon: <ClipboardCheck size={18} /> },
    { label: 'Analytics', icon: <BarChart3 size={18} /> },
    { label: 'Study Material', icon: <FileText size={18} /> },
    { label: 'Announcements', icon: <Bell size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar - Desktop Only with refined UI */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col py-10 px-8 relative z-50">
        <div className="flex items-center gap-3 mb-16 px-2">
           <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white text-xl rotate-6">A</div>
           <div className="font-display font-black text-xl text-primary uppercase tracking-tighter">PORTAL<span className="text-secondary text-base">PRO</span></div>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                activeSection === item.label 
                  ? 'bg-primary text-white shadow-xl translate-x-2' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-4">
                 <div className={`${activeSection === item.label ? 'text-secondary' : 'group-hover:text-primary'}`}>{item.icon}</div>
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
           <button className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest cursor-pointer">
              <Settings size={18} /> Settings
           </button>
           <button 
             onClick={() => setIsLoggedIn(false)}
             className="w-full flex items-center gap-4 p-4 text-rose-400 hover:text-rose-500 transition-all font-black text-[11px] uppercase tracking-widest cursor-pointer"
           >
              <LogOut size={18} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow relative overflow-y-auto">
        {/* Top Floating Header */}
        <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md px-8 md:px-12 py-6 flex items-center justify-between">
           <div className="hidden md:flex items-center gap-6 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm w-96 relative group">
              <Search size={16} className="text-slate-300 group-focus-within:text-secondary" />
              <input type="text" placeholder="Search tests, notes, lessons..." className="bg-transparent outline-none text-xs font-bold text-primary w-full" />
              <div className="text-[10px] font-black text-slate-300 border border-slate-100 px-2 py-0.5 rounded uppercase tracking-widest">⌘ K</div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex flex-col text-right hidden sm:block">
                 <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">Elite Batch Tier</div>
                 <div className="text-sm font-black text-primary italic">Rohan Shrivastava</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-white shadow-xl overflow-hidden cursor-pointer hover:rotate-6 transition-transform">
                 <img src="https://i.pravatar.cc/150?u=r1" alt="Profile" className="w-full h-full object-cover" />
              </div>
           </div>
        </header>

        {/* Content Area */}
        <div className="px-8 md:px-12 py-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                  {activeSection === 'Dashboard' && <PortalDashboard />}
                  {activeSection === 'Courses' && <PortalCourses />}
                  {activeSection === 'Test Series' && <PortalTestSeries />}
                  {activeSection === 'Analytics' && <PortalAnalytics />}
                  {activeSection === 'Study Material' && <PortalStudyMaterial />}
                  {activeSection === 'Announcements' && <PortalAnnouncements />}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
