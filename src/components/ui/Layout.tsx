import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, MessageCircle, Instagram, Youtube, Linkedin, Twitter, Facebook } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <span className="font-display font-black text-2xl text-primary tracking-tighter uppercase">
              ACADEMY<span className="text-secondary">PRO</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-2">
              {/* Home Path handled by map now, but we need Programs which is a dropdown */}
              <div className="relative group/nav px-4 py-2">
                <button className="flex items-center gap-1 font-bold text-sm text-slate-600 hover:text-primary transition-colors cursor-pointer capitalize">
                  Programs <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all translate-y-2 group-hover/nav:translate-y-0 z-50">
                  <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 w-[600px] grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Academic Paths</h5>
                      <div className="space-y-1">
                        <MegaLink to="/courses" title="Explore Courses" desc="All Programs" />
                        <MegaLink to="/path" title="Path Roadmap" desc="Choose your Grade" />
                        <MegaLink to="/scholarship" title="Scholarship Test" desc="Apply for NST 2026" />
                        <MegaLink to="/book-demo" title="Free Demo Class" desc="Live Session" />
                      </div>
                    </div>
                    <div className="space-y-4 border-l border-slate-100 pl-6">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Knowledge Hub</h5>
                      <div className="space-y-1">
                        <MegaLink to="/resources" title="Academic Vault" desc="Free Notes & Papers" />
                        <MegaLink to="/performance" title="Analytics & Performance" desc="Track Student Growth" />
                        <MegaLink to="/results" title="Hall of Fame" desc="Topper Results" />
                        <MegaLink to="/faculty" title="Elite Faculty" desc="Learn from Masters" />
                        <MegaLink to="/testimonials" title="Success Stories" desc="Reviews" />
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
                      "relative z-10 block px-4 py-2 text-sm font-bold transition-colors uppercase tracking-tight",
                      pathname === item.href ? "text-primary" : "text-slate-600 hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                  
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 z-0 rounded-xl bg-slate-100/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          stiffness: 130,
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
            <Link to="/portal/student" className="hidden lg:block text-slate-600 font-bold hover:text-primary transition-colors text-sm">Portals</Link>
            <Link to="/book-demo" className="btn-primary py-3 px-6 text-sm shadow-lg shadow-primary/10">Book Demo</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow relative z-10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
        {children}
      </main>

      <footer className="bg-slate-50/40 border-t border-slate-100 pt-24 pb-12 overflow-hidden sticky bottom-0 z-0">
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
          
          <div className="pt-8 border-t border-slate-200/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
              © 2026 ACADEMYPRO EDUCATION. All Rights Reserved.
            </div>
            <div className="flex gap-8">
              <Link to="/policies" className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors tracking-widest">PRIVACY POLICY</Link>
              <Link to="/policies" className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors tracking-widest">TERMS OF SERVICE</Link>
              <Link to="/policies" className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors tracking-widest">REFUND POLICY</Link>
            </div>
          </div>
        </div>

        {/* Big Outline Watermark */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] translate-y-1/3">
          <div className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-black text-center text-slate-900 tracking-tighter uppercase leading-none font-sans select-none">
            ACADEMYPRO
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <Link 
        to="/contact" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center z-[100] transition-all hover:scale-110 active:scale-95 group"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
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

const MegaLink = ({ to, title, desc }: any) => (
  <Link to={to} className="block p-3 rounded-xl hover:bg-slate-50 group/mega transition-all">
    <div className="text-sm font-bold text-primary group-hover/mega:text-secondary transition-colors">{title}</div>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{desc}</div>
  </Link>
);

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
              <span>{link.label}</span>
            </motion.span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


