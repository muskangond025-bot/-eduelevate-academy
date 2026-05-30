import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MessageSquare, FileText, PhoneCall, ArrowRight, Sparkles, Calendar, Clock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SCHEDULER_SLOTS = [
  { time: '4:00 PM Today', status: 'Live slot', isLive: true },
  { time: '6:30 PM Today', status: 'Available', isLive: false },
  { time: '11:00 AM Tomorrow', status: 'Available', isLive: false }
];

export const FinalCTA = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [progressVal, setProgressVal] = useState(80);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Client-side window size state to prevent SSR issues and run Framer Motion hooks unconditionally
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Viewport scroll tracking for fanning rotation cards
  const { scrollYProgress: rawScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Soft spring mapping with custom lag for butter-smooth momentum-based scroll reactions
  const scrollYProgress = useSpring(rawScrollY, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001
  });

  // Left Card fanning rotation scroll transforms
  const x0 = useTransform(scrollYProgress, [0.15, 0.80], [-180, 0]);
  const y0 = useTransform(scrollYProgress, [0.15, 0.80], [30, 0]);
  const r0 = useTransform(scrollYProgress, [0.15, 0.80], [-8, 0]);
  const ry0 = useTransform(scrollYProgress, [0.15, 0.80], [-35, 0]);

  // Right Card fanning rotation scroll transforms
  const x1 = useTransform(scrollYProgress, [0.15, 0.80], [180, 0]);
  const y1 = useTransform(scrollYProgress, [0.15, 0.80], [30, 0]);
  const r1 = useTransform(scrollYProgress, [0.15, 0.80], [8, 0]);
  const ry1 = useTransform(scrollYProgress, [0.15, 0.80], [35, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressVal(v => v === 80 ? 100 : 80);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-slate-50/40 overflow-hidden text-slate-800 border-t border-slate-100">
      {/* Grid Backdrop Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #0f172a 1.5px, transparent 0),
            linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
        }}
      />

      {/* Dynamic Background Light Orb */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.1] pointer-events-none transition-all duration-1000 ease-out hidden md:block"
        style={{
          background: hoveredCard === 0 ? '#6366F1' : hoveredCard === 1 ? '#F59E0B' : 'rgba(99, 102, 241, 0.4)',
          left: hoveredCard === 0 ? '30%' : hoveredCard === 1 ? '70%' : '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_10px_rgba(15,23,42,0.02)] backdrop-blur-md mb-6"
          >
            <Sparkles size={14} className="text-indigo-600 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">REDEFINE YOUR PATH</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-tight uppercase italic tracking-tighter mb-8 font-sans overflow-visible py-1"
          >
            Ready to Redefine{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 not-italic font-extrabold px-1">
              Your Future?
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Schedule a personalized counseling session with our academic experts or take our flagship diagnostic scholarship test.
          </motion.p>
        </div>

        {/* 2-Card Deck Grid */}
        <div 
          key={isDesktop ? 'desktop-grid' : 'mobile-grid'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          
          {/* Card 1: Book Demo */}
          <motion.div
            initial={isDesktop ? undefined : { opacity: 0, y: 50 }}
            whileInView={isDesktop ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isDesktop ? undefined : { duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/book-demo')}
            className={`relative p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-xl transition-colors duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[480px] text-left ${
              hoveredCard === 0 
                ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.06)]' 
                : hoveredCard !== null 
                  ? 'border-slate-100/50 bg-white/40' 
                  : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
            }`}
            style={{
              boxShadow: hoveredCard === 0 ? '0 30px 60px -10px rgba(99, 102, 241, 0.15)' : undefined,
              x: isDesktop ? x0 : 0,
              y: isDesktop ? y0 : (hoveredCard === 0 ? -10 : 0),
              rotate: isDesktop ? r0 : 0,
              rotateY: isDesktop ? ry0 : 0,
              opacity: hoveredCard !== null && hoveredCard !== 0 ? 0.65 : 1,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Background Accent glow */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-indigo-500/2 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{ opacity: hoveredCard === 0 ? 1 : 0 }}
            />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Interactive Scheduler</span>
                  <h3 className="text-2xl font-extrabold text-slate-800 leading-snug">1-on-1 Counseling Session</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
                  <Calendar size={22} className={hoveredCard === 0 ? 'animate-bounce' : ''} />
                </div>
              </div>

              <p className="text-slate-500 text-sm font-semibold mb-8 leading-relaxed">
                Connect directly with senior HODs and IIT/AIIMS academic advisors. We will map a custom curriculum strategy for your exam goals.
              </p>

              {/* Simulated Scheduler slots */}
              <div className="flex flex-col gap-3 mb-8">
                {SCHEDULER_SLOTS.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => setSelectedSlot(sIdx)}
                    className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                      selectedSlot === sIdx
                        ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900 shadow-sm'
                        : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className={selectedSlot === sIdx ? 'text-indigo-600' : 'text-slate-400'} />
                      <span className="text-xs font-bold">{slot.time}</span>
                    </div>
                    
                    {slot.isLive && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Live slot
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-100">
              <Link 
                to="/book-demo" 
                className="group relative px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all shadow-md inline-flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Free Demo <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Take Scholarship Test */}
          <motion.div
            initial={isDesktop ? undefined : { opacity: 0, y: 50 }}
            whileInView={isDesktop ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isDesktop ? undefined : { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/scholarship')}
            className={`relative p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-xl transition-colors duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[480px] text-left ${
              hoveredCard === 1 
                ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.06)]' 
                : hoveredCard !== null 
                  ? 'border-slate-100/50 bg-white/40' 
                  : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
            }`}
            style={{
              boxShadow: hoveredCard === 1 ? '0 30px 60px -10px rgba(245, 158, 11, 0.15)' : undefined,
              x: isDesktop ? x1 : 0,
              y: isDesktop ? y1 : (hoveredCard === 1 ? -10 : 0),
              rotate: isDesktop ? r1 : 0,
              rotateY: isDesktop ? ry1 : 0,
              opacity: hoveredCard !== null && hoveredCard !== 1 ? 0.65 : 1,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Background Accent glow */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-amber-500/2 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{ opacity: hoveredCard === 1 ? 1 : 0 }}
            />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Scholarship Assessment</span>
                  <h3 className="text-2xl font-extrabold text-slate-800 leading-snug">National Scholarship Test</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100 text-amber-600">
                  <FileText size={22} className={hoveredCard === 1 ? 'animate-bounce' : ''} />
                </div>
              </div>

              <p className="text-slate-500 text-sm font-semibold mb-8 leading-relaxed">
                Take our 45-minute adaptive diagnostic test. Identify specific competency gaps and unlock merit-based tuition waivers instantly.
              </p>

              {/* Simulated Diagnostic Test Progress */}
              <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DIAGNOSTIC TEST READINESS</span>
                  <span className="text-xs font-black text-amber-500">{progressVal}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden mb-5">
                  <motion.div 
                    className="h-full bg-amber-500 rounded-full"
                    animate={{ width: `${progressVal}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">Syllabus Mapping (Completed)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">Adaptive Core Configured (Completed)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-100">
              <Link 
                to="/scholarship" 
                className="group relative px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all shadow-md inline-flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Test <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* WhatsApp support bar */}
        <div className="mt-10 flex justify-center">
          <motion.a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            className="inline-flex items-center gap-4 px-6 py-3.5 bg-white border border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.02)] hover:border-emerald-300 hover:shadow-[0_10px_35px_rgba(16,185,129,0.08)] rounded-2xl backdrop-blur-md group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
              <MessageSquare size={20} />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Instant Support</div>
              <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">WhatsApp us: +91 98765 43210</div>
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
};
