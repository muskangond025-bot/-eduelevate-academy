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
  Zap,
  X
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
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Settings states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [settingsToast, setSettingsToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [settingsToastTimeoutId, setSettingsToastTimeoutId] = useState<number | null>(null);

  const showSettingsToast = (message: string) => {
    if (settingsToastTimeoutId) {
      clearTimeout(settingsToastTimeoutId);
    }
    setSettingsToast({ message, visible: true });
    const timerId = window.setTimeout(() => {
      setSettingsToast(prev => ({ ...prev, visible: false }));
    }, 3000);
    setSettingsToastTimeoutId(timerId);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
              onClick={() => {
                setActiveSection(item.label);
                setSearchQuery('');
              }}
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
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest cursor-pointer"
            >
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
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tests, notes, lessons..." 
                className="bg-transparent outline-none text-xs font-bold text-primary w-full" 
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-primary mr-1 cursor-pointer">
                  <X size={14} />
                </button>
              )}
              <div className="text-[10px] font-black text-slate-300 border border-slate-100 px-2 py-0.5 rounded uppercase tracking-widest select-none">⌘ K</div>
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
                  {activeSection === 'Dashboard' && <PortalDashboard setActiveSection={setActiveSection} />}
                  {activeSection === 'Courses' && <PortalCourses searchQuery={searchQuery} />}
                  {activeSection === 'Test Series' && <PortalTestSeries searchQuery={searchQuery} />}
                  {activeSection === 'Analytics' && <PortalAnalytics />}
                  {activeSection === 'Study Material' && <PortalStudyMaterial searchQuery={searchQuery} />}
                  {activeSection === 'Announcements' && <PortalAnnouncements />}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer animate-none"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="mb-8">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-2 flex items-center gap-1.5"><Settings size={12} /> Custom Preferences</span>
                <h3 className="text-3xl font-black text-primary tracking-tight italic-small leading-none">Portal Settings</h3>
              </div>

              {/* Options Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                showSettingsToast('Preferences updated successfully!');
                setIsSettingsOpen(false);
              }} className="space-y-6">
                
                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-xs font-black text-primary uppercase tracking-wide">Notifications</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Enable push alerts for new exams & notes</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-xs font-black text-primary uppercase tracking-wide">Sound Effects</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Audio cues on completing assignments</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={soundEnabled}
                        onChange={() => setSoundEnabled(!soundEnabled)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-xs font-black text-primary uppercase tracking-wide">Secure Login (2FA)</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Require 2FA verification code on login</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={twoFactorEnabled}
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 cursor-pointer mt-4"
                >
                   Save Preferences
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Toast Alert */}
      <AnimatePresence>
        {settingsToast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#0c0f1d] border border-indigo-500/30 text-white rounded-3xl p-5 shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <ClipboardCheck className="text-secondary" size={16} />
            </div>
            <p className="text-xs font-bold leading-tight">{settingsToast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
