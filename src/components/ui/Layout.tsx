import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, MessageCircle, Instagram, Youtube, Linkedin, Twitter, Facebook, Home, Info, FileText, MapPin, Shield, Phone, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import Lenis from 'lenis';
import { CustomCursor } from './CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

const RollingText = ({ text, hoverColorClass = "text-indigo-600" }: { text: string; hoverColorClass?: string }) => {
  return (
    <span className="relative inline-block overflow-hidden group/roll leading-none align-bottom pb-[1px]">
      <span className="inline-block transition-transform duration-500 ease-out group-hover/roll:-translate-y-full">
        {text}
      </span>
      <span className={cn("absolute left-0 top-0 inline-block transition-transform duration-500 ease-out translate-y-full group-hover/roll:translate-y-0", hoverColorClass)}>
        {text}
      </span>
    </span>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses & Classes", href: "/courses" },
    { name: "Hall of Fame", href: "/results" },
    { name: "Elite Faculty", href: "/faculty" },
    { name: "Scholarships", href: "/scholarship" },
    { name: "Locations & Hubs", href: "/locations" },
    { name: "Contact Support", href: "/contact" },
  ];

  useEffect(() => {
    // Initialize Lenis buttery smooth scroll
    const lenis = new Lenis({
      duration: 0.8, // Snappier scroll time for fast responsiveness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy decelerating ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Quick response to scrolling inputs
      touchMultiplier: 1.5,
    });

    // Custom animation frame loop for maximum responsiveness and pixel-perfect sync
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis globally for immediate scrollTo calls on route transition
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide header/footer in portal view
  const isPortal = pathname.includes('/portal');

  if (isPortal) {
    return <>{children}</>;
  }

  const mainNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Locations", href: "/locations" },
    { name: "Policies", href: "/policies" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary selection:text-white">
      <CustomCursor />
      {/* Centered Floating Glassmorphic Pill Header */}
      <header 
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out flex items-center justify-center",
          isScrolled 
            ? "top-3 w-[90%] max-w-6xl h-16 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(15,23,42,0.06)] px-8" 
            : "top-6 w-[95%] max-w-7xl h-20 rounded-[2.5rem] border border-slate-100/60 bg-white/55 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] px-10"
        )}
      >
        <nav className="w-full h-full flex items-center justify-between">
          <div className="flex items-center gap-4 shrink-0">
            {/* Morphing Burger menu on mobile (Extreme Left) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-slate-200/80 bg-white/50 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 cursor-pointer relative z-50 hover:scale-105 active:scale-95 transition-all"
            >
              <span className={cn("w-5 h-[2px] bg-slate-800 rounded transition-all duration-300", isMobileMenuOpen ? "rotate-45 translate-y-[5.5px]" : "")} />
              <span className={cn("w-5 h-[2px] bg-slate-800 rounded transition-all duration-300", isMobileMenuOpen ? "opacity-0 w-0" : "")} />
              <span className={cn("w-5 h-[2px] bg-slate-800 rounded transition-all duration-300", isMobileMenuOpen ? "-rotate-45 -translate-y-[5.5px]" : "")} />
            </button>

            {/* Logo Group */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20 shrink-0">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <span className="font-display font-black text-xl sm:text-2xl text-primary tracking-tighter uppercase transition-all duration-300 group-hover:tracking-normal leading-none">
                ACADEMY<span className="text-secondary">PRO</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {/* Programs mega dropdown */}
              <div className="relative group/nav px-3 py-1.5">
                <button className="flex items-center gap-1 font-bold text-xs text-slate-600 hover:text-primary transition-colors cursor-pointer uppercase tracking-tight">
                  Programs <ChevronDown size={13} className="group-hover/nav:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all translate-y-2 group-hover/nav:translate-y-0 z-50">
                  <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.1)] p-6 border border-white/50 w-[560px] grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Academic Paths</h5>
                      <div className="space-y-1">
                        <MegaLink to="/courses" title="Explore Courses" desc="All Programs" />
                        <MegaLink to="/path" title="Path Roadmap" desc="Choose your Grade" />
                        <MegaLink to="/scholarship" title="Scholarship Test" desc="Apply for NST 2026" />
                        <MegaLink to="/book-demo" title="Free Demo Class" desc="Live Session" />
                      </div>
                    </div>
                    <div className="space-y-4 border-l border-slate-100 pl-6">
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Knowledge Hub</h5>
                      <div className="space-y-1">
                        <MegaLink to="/resources" title="Academic Vault" desc="Free Notes & Papers" />
                        <MegaLink to="/performance" title="Analytics & Performance" desc="Track Student Growth" />
                        <MegaLink to="/results" title="Hall of Fame" desc="Topper Results" />
                        <MegaLink to="/faculty" title="Elite Faculty" desc="Learn from Masters" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {mainNavItems.map((item, index) => (
                <li
                  key={item.href}
                  className="relative list-none"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link 
                    to={item.href} 
                    className={cn(
                      "relative z-10 inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-bold transition-colors uppercase tracking-tight leading-none",
                      pathname === item.href ? "text-primary" : "text-slate-600 hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                  
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 z-0 rounded-full bg-primary/10 border border-primary/5 shadow-inner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          stiffness: 140,
                          damping: 18,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="relative group/portal shrink-0">
              <button 
                className="hidden lg:inline-flex items-center justify-center text-slate-500 font-bold hover:text-primary hover:border-primary transition-all text-xs border border-slate-200 px-4 py-2 rounded-full uppercase tracking-wider leading-none cursor-pointer gap-1"
              >
                Portals <ChevronDown size={11} className="group-hover/portal:rotate-180 transition-transform" />
              </button>
              {/* Portals Dropdown */}
              <div className="absolute top-full right-0 pt-3 opacity-0 pointer-events-none group-hover/portal:opacity-100 group-hover/portal:pointer-events-auto transition-all translate-y-2 group-hover/portal:translate-y-0 z-50">
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.08)] p-3 border border-slate-100 w-44 flex flex-col gap-1.5 select-none">
                  <Link 
                    to="/portal/student" 
                    className="flex items-center justify-between text-[10px] font-bold text-slate-600 hover:text-indigo-650 hover:bg-slate-50 px-3 py-2.5 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Student Portal <ChevronRight size={10} className="text-slate-400" />
                  </Link>
                  <Link 
                    to="/portal/parent" 
                    className="flex items-center justify-between text-[10px] font-bold text-slate-600 hover:text-indigo-650 hover:bg-slate-50 px-3 py-2.5 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Parent Portal <ChevronRight size={10} className="text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              to="/book-demo" 
              className="btn-primary inline-flex items-center justify-center py-2.5 px-6 text-xs uppercase tracking-widest font-black shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full bg-gradient-to-tr from-primary to-indigo-600 border-none leading-none" 
              data-cursor-text="BOOK"
            >
              Book Demo
            </Link>
          </div>
        </nav>
      </header>

      {/* Fullscreen Glass mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col justify-between p-8 pt-32 overflow-y-auto"
          >
            {/* Menu links in massive bold font */}
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigation</span>
              <ul className="space-y-4">
                {mobileNavItems.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl sm:text-5xl font-black text-slate-800 hover:text-primary transition-colors flex items-center gap-4"
                    >
                      <span className="text-primary/30 text-lg font-mono">0{idx + 1}</span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom section with Portals, Demo and Socials */}
            <div className="border-t border-slate-100 pt-8 mt-12 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/portal/student" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary py-3 px-2 text-[10px] sm:text-xs text-center rounded-full font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer truncate"
                >
                  Student Portal
                </Link>
                <Link 
                  to="/portal/parent" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary py-3 px-2 text-[10px] sm:text-xs text-center rounded-full font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer truncate"
                >
                  Parent Portal
                </Link>
              </div>
              <Link 
                to="/book-demo" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary py-3.5 px-6 text-xs text-center rounded-full font-black uppercase tracking-widest bg-gradient-to-tr from-primary to-indigo-650 border-none shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer w-full"
              >
                Book Demo
              </Link>
              
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center cursor-default">
                © 2026 AcademyPro Education System
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-grow relative z-10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.03)] pt-[104px]">
        {children}
      </main>



      <motion.footer 
        initial={{ opacity: 0.8, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FAF9F6] border-t border-slate-200/60 pt-24 pb-12 overflow-hidden sticky bottom-0 z-0 w-full"
      >
        {/* Grid Backdrop Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, #0f172a 1.5px, transparent 0),
              linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 120px 120px, 120px 120px',
          }}
        />

        {/* Dynamic Background Light Orb */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.06] pointer-events-none transition-all duration-1000 ease-out hidden md:block"
          style={{
            background: 'rgba(99, 102, 241, 0.4)',
            left: '80%',
            top: '80%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-8 group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
                  <span className="text-white font-black">A</span>
                </div>
                <span className="font-display font-black text-xl text-primary tracking-tighter uppercase">ACADEMYPRO</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-8">
                Empowering the next generation of engineers, doctors, and leaders through standardized academic excellence.
              </p>
              <div className="flex gap-4">
                 <SocialIcon icon={<Instagram size={18}/>} color="#E1306C" glowColor="rgba(225, 48, 108, 0.15)" />
                 <SocialIcon icon={<Youtube size={18}/>} color="#FF0000" glowColor="rgba(255, 0, 0, 0.15)" />
                 <SocialIcon icon={<Linkedin size={18}/>} color="#0077B5" glowColor="rgba(0, 119, 181, 0.15)" />
                 <SocialIcon icon={<Facebook size={18}/>} color="#1877F2" glowColor="rgba(24, 119, 242, 0.15)" />
              </div>
            </div>
            <FooterCol title="Primary Paths" links={[
              { label: 'JEE Coaching', to: '/courses/jee' },
              { label: 'NEET Coaching', to: '/courses/neet' },
              { label: 'Foundation (8-10)', to: '/courses/foundation' },
              { label: 'State Boards', to: '/courses/cet' }
            ]} />
            <FooterCol title="Resources" links={[
              { label: 'Study Material', to: '/resources' },
              { label: 'Practice Tests', to: '/scholarship' },
              { label: 'Academic Blog', to: '/blog' },
              { label: 'Institutional Policies', to: '/policies' },
              { label: 'Toppers List', to: '/results' }
            ]} />
            <FooterCol title="Contact Us" links={[
              { label: 'Regional Hubs', to: '/locations' },
              { label: 'Book Demo', to: '/book-demo' },
              { label: 'Career at Academy', to: '/careers' },
              { label: 'WhatsApp Support', to: '#' }
            ]} />
          </div>
          
          {/* Infinite Rolling Text Marquee Ticker */}
          <div className="w-full overflow-hidden py-3 border-t border-slate-100/60 mb-6 bg-slate-50/50 rounded-xl relative select-none">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex whitespace-nowrap gap-16 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400"
              animate={{ x: [0, -600] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[
                "★ 99.8% Topper Percentile Focus",
                "★ 1-on-1 Elite Mentorship Ecosystem",
                "★ 100% Adaptive Learning Blueprints",
                "★ 24/7 AI-Powered Doubt Resolution",
                "★ Nationwide NTSE & NST Scholars",
                "★ 99.8% Topper Percentile Focus",
                "★ 1-on-1 Elite Mentorship Ecosystem",
                "★ 100% Adaptive Learning Blueprints",
                "★ 24/7 AI-Powered Doubt Resolution",
                "★ Nationwide NTSE & NST Scholars"
              ].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="pt-8 border-t border-slate-200/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center md:text-left cursor-default">
              © 2026 <RollingText text="ACADEMYPRO EDUCATION" />. All Rights Reserved.
            </div>
            <div className="flex gap-8">
              <Link to="/policies" className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors tracking-widest">
                <RollingText text="PRIVACY POLICY" />
              </Link>
              <Link to="/policies" className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors tracking-widest">
                <RollingText text="TERMS OF SERVICE" />
              </Link>
              <Link to="/policies" className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors tracking-widest">
                <RollingText text="REFUND POLICY" />
              </Link>
            </div>
          </div>
        </div>

        {/* Big Outline Watermark */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] translate-y-1/3">
          <div className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-black text-center text-slate-900 tracking-tighter uppercase leading-none font-sans select-none">
            ACADEMYPRO
          </div>
        </div>
      </motion.footer>

      {/* Floating CTA */}
      <Link 
        to="/contact" 
        className="fixed bottom-[32px] right-[32px] w-[72px] h-[72px] rounded-full flex items-center justify-center z-[100] transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
        data-cursor-text="CHAT"
      >
        {/* Glow backdrop layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-650 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Hover ring border */}
        <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
        
        {/* Shadow glow layer */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-indigo-650 opacity-30 blur-md group-hover:opacity-50 transition-opacity" />

        <MessageCircle size={36} className="relative z-10 text-white group-hover:rotate-12 transition-transform duration-300" />
      </Link>
    </div>
  );
};

const SocialIcon = ({ icon, color, glowColor }: { icon: React.ReactNode; color: string; glowColor: string }) => (
  <motion.a 
    href="#" 
    whileHover={{ y: -4, scale: 1.05 }}
    className="w-10 h-10 bg-white border border-slate-200/80 rounded-xl flex items-center justify-center text-slate-400 transition-all cursor-pointer"
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = color;
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.boxShadow = `0 10px 25px ${glowColor}`;
      e.currentTarget.style.color = '#fff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '';
      e.currentTarget.style.borderColor = '';
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.color = '';
    }}
  >
    {icon}
  </motion.a>
);

const NavLink = ({ to, label, current }: { to: string; label: string; current: boolean }) => (
  <Link to={to} className={`relative font-bold text-sm transition-colors hover:text-primary ${current ? 'text-primary' : 'text-slate-600'}`}>
    {label}
    {current && (
      <motion.div 
        layoutId="nav-dot"
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full" 
      />
    )}
  </Link>
);

const MegaLink = ({ to, title, desc }: any) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Link 
      to={to} 
      className={cn(
        "block p-3 rounded-xl group/mega transition-all",
        isActive ? "bg-indigo-50/60 shadow-inner" : "hover:bg-slate-50"
      )}
    >
      <div 
        className={cn(
          "text-sm font-bold transition-colors",
          isActive ? "text-indigo-600 font-extrabold" : "text-primary group-hover/mega:text-secondary"
        )}
      >
        {title}
      </div>
      <div 
        className={cn(
          "text-[10px] font-bold uppercase tracking-wide transition-colors",
          isActive ? "text-indigo-400" : "text-slate-400"
        )}
      >
        {desc}
      </div>
    </Link>
  );
};

const FooterCol = ({ title, links }: any) => (
  <div>
    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8">{title}</h4>
    <ul className="flex flex-col gap-4">
      {links.map((link: any, i: number) => (
        <li key={i}>
          <Link to={link.to}>
            <motion.span 
              whileHover={{ x: 4 }}
              className="text-sm text-slate-500 font-semibold hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 group/link"
            >
              <span className="opacity-0 w-0 group-hover/link:opacity-100 group-hover/link:w-auto text-indigo-600 transition-all duration-300 flex items-center">
                <ChevronRight size={12} />
              </span>
              <span><RollingText text={link.label} /></span>
            </motion.span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


