import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useSpring } from 'motion/react';
import { Globe, Smartphone, Users, Gift, ArrowRight, Sparkles, Award, Activity, Briefcase, GraduationCap, ChevronRight, Flame, Check, Lock, Pause, Play, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALUMNI_DATA = [
  {
    category: 'Engineering Elite',
    institutions: 'IIT Bombay, Delhi & Madras',
    metric: '240+ Selections',
    submetric: 'Highest Package: ₹2.1 Cr',
    icon: Award,
    color: 'blue',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.2)',
    gradient: 'from-blue-500/10 via-blue-500/2 to-transparent',
    iconBg: 'bg-blue-50/80',
    iconColor: 'text-blue-600',
    alumni: [
      { name: 'Aarav S.', detail: 'IIT Bombay CS', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Priya P.', detail: 'IIT Delhi Electrical', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Rohan V.', detail: 'IIT Madras Aero', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Siddharth M.', detail: 'IIT Kharagpur CS', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    category: 'Medical Pioneers',
    institutions: 'AIIMS New Delhi & MAMC',
    metric: '120+ Selections',
    submetric: 'AIR 3, 7, 12 in NEET',
    icon: Activity,
    color: 'emerald',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    gradient: 'from-emerald-500/10 via-emerald-500/2 to-transparent',
    iconBg: 'bg-emerald-50/80',
    iconColor: 'text-emerald-600',
    alumni: [
      { name: 'Aditi K.', detail: 'AIIMS New Delhi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Kabir B.', detail: 'MAMC New Delhi', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Ananya D.', detail: 'AIIMS Rishikesh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Vikram S.', detail: 'VMMC New Delhi', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    category: 'Global Tech Leaders',
    institutions: 'Google, Tesla & Apple',
    metric: '85+ Placements',
    submetric: 'Average Package: ₹54 LPA',
    icon: Briefcase,
    color: 'indigo',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.2)',
    gradient: 'from-indigo-500/10 via-indigo-500/2 to-transparent',
    iconBg: 'bg-indigo-50/80',
    iconColor: 'text-indigo-600',
    alumni: [
      { name: 'Neha G.', detail: 'Google Mountain View', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Sameer K.', detail: 'Tesla Palo Alto', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Ishita L.', detail: 'Apple Cupertino', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Kunal R.', detail: 'Meta London', avatar: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  },
  {
    category: 'Ivy Academia',
    institutions: 'MIT, Stanford & Harvard',
    metric: '45+ Selections',
    submetric: '100% Scholarship Admits',
    icon: GraduationCap,
    color: 'purple',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.2)',
    gradient: 'from-purple-500/10 via-purple-500/2 to-transparent',
    iconBg: 'bg-purple-50/80',
    iconColor: 'text-purple-600',
    alumni: [
      { name: 'Divya M.', detail: 'Stanford Ph.D. CS', avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Rahul K.', detail: 'MIT Physics', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Sanya T.', detail: 'Harvard Medical', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80' },
      { name: 'Arjun N.', detail: 'Oxford Mathematics', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80' }
    ]
  }
];

const RECENT_LIVE_PLACEMENTS = [
  'Pranav G. accepted at UC Berkeley (Full Scholarship)',
  'Shreya N. selected for AIIMS New Delhi (AIR 4)',
  'Rishit S. cleared JEE Advanced with AIR 11 (IIT Bombay)',
  'Anushka M. placed at Microsoft Redmond (₹1.2 Cr CTC)',
  'Tanmay R. accepted at Harvard CS Undergraduate',
  'Meera J. cleared NEET with 715/720 (AIIMS New Delhi)'
];

export const HomeGlobalAlumni = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll tracking target for the Global Alumni success cards section
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Client-side window size state to prevent SSR issues and run Framer Motion hooks unconditionally
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // 3D playing-card fanning scroll transforms (deck of cards / taash)
  const x0 = useTransform(scrollYProgress, [0.15, 0.80], [450, 0]);
  const y0 = useTransform(scrollYProgress, [0.15, 0.80], [25, 0]);
  const r0 = useTransform(scrollYProgress, [0.15, 0.80], [-12, 0]);
  const ry0 = useTransform(scrollYProgress, [0.15, 0.80], [-45, 0]);

  const x1 = useTransform(scrollYProgress, [0.15, 0.80], [150, 0]);
  const y1 = useTransform(scrollYProgress, [0.15, 0.80], [12, 0]);
  const r1 = useTransform(scrollYProgress, [0.15, 0.80], [-4, 0]);
  const ry1 = useTransform(scrollYProgress, [0.15, 0.80], [-15, 0]);

  const x2 = useTransform(scrollYProgress, [0.15, 0.80], [-150, 0]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.80], [12, 0]);
  const r2 = useTransform(scrollYProgress, [0.15, 0.80], [4, 0]);
  const ry2 = useTransform(scrollYProgress, [0.15, 0.80], [15, 0]);

  const x3 = useTransform(scrollYProgress, [0.15, 0.80], [-450, 0]);
  const y3 = useTransform(scrollYProgress, [0.15, 0.80], [25, 0]);
  const r3 = useTransform(scrollYProgress, [0.15, 0.80], [12, 0]);
  const ry3 = useTransform(scrollYProgress, [0.15, 0.80], [45, 0]);

  const xTransforms = [x0, x1, x2, x3];
  const yTransforms = [y0, y1, y2, y3];
  const rTransforms = [r0, r1, r2, r3];
  const ryTransforms = [ry0, ry1, ry2, ry3];

  return (
    <section ref={sectionRef} className="relative pt-12 pb-32 bg-slate-50/40 overflow-hidden text-slate-800 border-b border-slate-100">
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

      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.12] pointer-events-none transition-all duration-1000 ease-out hidden md:block"
        style={{
          background: hoveredIndex !== null ? ALUMNI_DATA[hoveredIndex].accentColor : 'rgba(99, 102, 241, 0.4)',
          left: hoveredIndex !== null ? `${(hoveredIndex) * 25 + 12.5}%` : '50%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">


          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-tight uppercase italic tracking-tighter mb-8 font-sans overflow-visible py-1"
          >
            Global Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 not-italic font-extrabold px-1">
              Network.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Our alumni are now innovating at Google, Tesla, Harvard, and MIT. When you join AcademyPro, you join a lifelong fraternity of achievers.
          </motion.p>
        </div>

        <div key={isDesktop ? 'desktop-grid' : 'mobile-grid'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px]" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
          {ALUMNI_DATA.map((path, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.div
                key={i}
                initial={isDesktop ? undefined : { opacity: 0, y: 50 }}
                whileInView={isDesktop ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={isDesktop ? undefined : { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-[32px] rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[440px] ${
                  isHovered 
                    ? 'border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.08)] scale-[1.02]' 
                    : isAnyHovered 
                      ? 'border-slate-100/50 bg-white/40' 
                      : 'border-slate-100/80 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.015)]'
                }`}
                style={{
                  boxShadow: isHovered ? `0 30px 60px -10px ${path.glowColor}, inset 0 0 20px rgba(255,255,255,0.6)` : undefined,
                  x: isDesktop ? xTransforms[i] : 0,
                  y: isDesktop ? yTransforms[i] : (isHovered ? -8 : 0),
                  rotate: isDesktop ? rTransforms[i] : 0,
                  rotateY: isDesktop ? ryTransforms[i] : 0,
                  opacity: isAnyHovered && !isHovered ? 0.65 : 1,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-b ${path.gradient} opacity-0 transition-opacity duration-500 pointer-events-none`}
                  style={{ opacity: isHovered ? 1 : 0 }}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-[24px]">
                      <div className="flex-1 pr-2">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-[8px] font-sans">{path.category}</span>
                        <h3 className="text-[26px] font-bold text-slate-900 leading-[1.2] font-sans tracking-tight">{path.institutions}</h3>
                      </div>
                      <div 
                        className={`w-[52px] h-[52px] rounded-[16px] flex items-center justify-center transition-all duration-500 shrink-0 ${
                          isHovered ? 'bg-slate-900 text-white shadow-lg scale-110' : `${path.iconBg} ${path.iconColor}`
                        }`}
                        style={{
                          backgroundColor: isHovered ? path.accentColor : undefined,
                          boxShadow: isHovered ? `0 10px 25px -5px ${path.accentColor}` : undefined
                        }}
                      >
                        <path.icon size={22} className={isHovered ? 'animate-bounce' : ''} />
                      </div>
                    </div>

                    <div className="my-[18px]">
                      <div 
                        className="text-[40px] font-black tracking-tighter text-slate-950 font-sans leading-none transition-colors duration-300"
                        style={{
                          color: isHovered ? path.accentColor : '#0f172a'
                        }}
                      >
                        {path.metric}
                      </div>
                      <div className="text-[13px] font-semibold text-slate-500 mt-[8px]">
                        {path.submetric}
                      </div>
                    </div>
                  </div>

                  <div className="mt-[24px] pt-[16px] border-t border-slate-100/80">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-[12px] block font-sans">Distinguished Alumni</span>
                    <div className="flex items-center gap-0 relative h-10">
                      {path.alumni.map((alum, alumIdx) => (
                        <motion.div
                          key={alumIdx}
                          className="relative"
                          animate={{
                            x: isHovered ? alumIdx * 12 : 0
                          }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                          style={{
                            zIndex: 10 + alumIdx,
                            marginLeft: alumIdx === 0 ? 0 : -12
                          }}
                        >
                          <div className="group/avatar relative cursor-pointer">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 pointer-events-none group-hover/avatar:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl z-50">
                              <span className="block font-black">{alum.name}</span>
                              <span className="block text-slate-300 font-medium">{alum.detail}</span>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                            </div>

                            <div className="w-[40px] h-[40px] rounded-full border-2 border-white overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.08)] group-hover/avatar:scale-115 group-hover/avatar:border-slate-900 transition-all duration-300">
                              <img src={alum.avatar} alt={alum.name} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      <motion.div 
                        className="absolute right-0 flex items-center gap-1 text-[11px] font-black text-indigo-600 cursor-pointer"
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>Explore</span>
                        <ChevronRight size={12} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 pt-8 border-t border-slate-200/40 w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          


          <div className="w-full relative py-3 overflow-hidden select-none">
            <motion.div 
              className="flex whitespace-nowrap gap-16 text-xs font-bold text-slate-500 uppercase tracking-wider"
              animate={{ x: [0, -1920] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
            >
              {[...RECENT_LIVE_PLACEMENTS, ...RECENT_LIVE_PLACEMENTS, ...RECENT_LIVE_PLACEMENTS].map((item, index) => (
                <span key={index} className="flex items-center gap-3">
                  <Flame className="text-amber-500 w-3.5 h-3.5 fill-amber-500/10" />
                  <span>{item}</span>
                  <span className="text-slate-200 ml-16">/</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SCHOLARSHIP_TIERS = [
  {
    percentile: '90% - 93%',
    waiver: '25% Tuition Waiver',
    savings: '₹75,000',
    badge: 'Merit Scholar',
    levelColor: 'text-blue-600 border-blue-200 bg-blue-50/50',
    cardBg: 'from-blue-500/10 via-blue-500/2 to-transparent',
    accentColor: '#3B82F6',
    passGradient: 'from-slate-900 to-slate-950 text-white',
    serial: 'NST-2026-M25X',
    glowColor: 'rgba(59, 130, 246, 0.15)'
  },
  {
    percentile: '93.1% - 96%',
    waiver: '50% Tuition Waiver',
    savings: '₹1,50,000',
    badge: 'Elite Scholar',
    levelColor: 'text-emerald-600 border-emerald-200 bg-emerald-50/50',
    cardBg: 'from-emerald-500/10 via-emerald-500/2 to-transparent',
    accentColor: '#10B981',
    passGradient: 'from-emerald-950 via-slate-900 to-slate-950 text-white',
    serial: 'NST-2026-E50V',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  {
    percentile: '96.1% - 98.5%',
    waiver: '75% Tuition Waiver',
    savings: '₹2,25,000',
    badge: "Dean's Fellow",
    levelColor: 'text-indigo-600 border-indigo-200 bg-indigo-50/50',
    cardBg: 'from-indigo-500/10 via-indigo-500/2 to-transparent',
    accentColor: '#6366F1',
    passGradient: 'from-indigo-950 via-slate-900 to-slate-950 text-white',
    serial: 'NST-2026-D75K',
    glowColor: 'rgba(99, 102, 241, 0.15)'
  },
  {
    percentile: '98.6% - 99.4%',
    waiver: '90% Tuition Waiver',
    savings: '₹2,70,000',
    badge: "Chancellor's Fellow",
    levelColor: 'text-purple-600 border-purple-200 bg-purple-50/50',
    cardBg: 'from-purple-500/10 via-purple-500/2 to-transparent',
    accentColor: '#8B5CF6',
    passGradient: 'from-purple-950 via-slate-900 to-slate-950 text-white',
    serial: 'NST-2026-C90R',
    glowColor: 'rgba(139, 92, 246, 0.15)'
  },
  {
    percentile: '99.5%+',
    waiver: '100% Free Ride',
    savings: '₹3,00,000 (Full Waiver)',
    badge: 'Presidential Fellow',
    levelColor: 'text-amber-600 border-amber-200 bg-amber-50/50',
    cardBg: 'from-amber-500/10 via-amber-500/2 to-transparent',
    accentColor: '#F59E0B',
    passGradient: 'from-slate-900 via-amber-950/20 to-slate-950 text-white border-amber-400/30',
    serial: 'NST-2026-P100',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    isSpecial: true
  }
];

// Digital rolling displays for countdown values
const RollingDigit = ({ digit, isAccent }: { digit: string; isAccent?: boolean }) => {
  return (
    <div className="relative h-[3.2rem] w-[1.85rem] overflow-hidden bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-center font-black text-2xl tabular-nums shadow-[inset_0_2px_4px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.02)]">
      {/* Mechanical shadow partition line across center */}
      <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-slate-200/60 z-10 pointer-events-none" />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: 26, opacity: 0, filter: 'blur(2px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -26, opacity: 0, filter: 'blur(2px)' }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`absolute inset-0 flex items-center justify-center ${isAccent ? 'text-indigo-600' : 'text-slate-800'}`}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const RollingNumber = ({ value, isAccent }: { value: number; isAccent?: boolean }) => {
  const digits = String(value).padStart(2, '0').split('');
  return (
    <div className="flex gap-1">
      {digits.map((digit, idx) => (
        <RollingDigit key={idx} digit={digit} isAccent={isAccent} />
      ))}
    </div>
  );
};

interface SliderParticle {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
}

export const HomeScholarshipDrive = () => {
  const navigate = useNavigate();
  const [scoreIndex, setScoreIndex] = useState(2);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 45, seconds: 30 });
  const [tilt, setTilt] = useState({ x: 0, y: 0, glossX: 50, glossY: 50, isHovered: false });
  const [particles, setParticles] = useState<SliderParticle[]>([]);
  const [sweepTrigger, setSweepTrigger] = useState(0);

  // Client-side window size state to prevent SSR issues and run Framer Motion hooks unconditionally
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Spawn bubble particles and holographic sweep on scoreIndex changes
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Math.random() + i,
      x: scoreIndex * 25 + (Math.random() * 8 - 4),
      size: Math.random() * 8 + 4,
      color: SCHOLARSHIP_TIERS[scoreIndex].accentColor,
      delay: Math.random() * 0.2
    }));
    setParticles(prev => [...prev.slice(-15), ...newParticles]);
    setSweepTrigger(prev => prev + 1);
  }, [scoreIndex]);

  // Sweep on card hover
  useEffect(() => {
    if (tilt.isHovered) {
      setSweepTrigger(prev => prev + 1);
    }
  }, [tilt.isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return; // Disable tilt entirely on mobile for touch performance
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -15; // Max 15 degree tilt
    const rotateY = ((x / rect.width) - 0.5) * 15;
    setTilt({
      x: rotateX,
      y: rotateY,
      glossX: (x / rect.width) * 100,
      glossY: (y / rect.height) * 100,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glossX: 50, glossY: 50, isHovered: false });
  };

  return (
    <section className="relative pt-12 pb-32 bg-slate-50/40 overflow-hidden text-slate-800 border-b border-slate-100">
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

      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.12] pointer-events-none transition-all duration-1000 ease-out hidden md:block"
        style={{
          background: SCHOLARSHIP_TIERS[scoreIndex].accentColor,
          left: '65%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-7/12">


            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight uppercase italic tracking-tighter mb-6 font-sans overflow-visible py-1"
            >
              National Scholarship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 not-italic font-extrabold px-1">
                Test 2026.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-xl"
            >
              Unlock up to 100% scholarship on tuition fees and secure admission to our Elite residential programs. Over ₹5 Cr in student rewards pool.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 mb-10 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.03)] max-w-md relative overflow-hidden group"
            >
              {/* Subtle tech background line grid inside timer */}
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  NST Registration Closes In:
                </span>
                <span className="text-[10px] font-bold text-rose-500 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 uppercase tracking-wide">
                  Limited Seats
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-800 z-10">
                <div className="flex flex-col items-center">
                  <RollingNumber value={timeLeft.days} />
                  <span className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-widest font-sans">Days</span>
                </div>
                <span className="text-xl font-black text-slate-300 animate-pulse mb-6">:</span>
                <div className="flex flex-col items-center">
                  <RollingNumber value={timeLeft.hours} />
                  <span className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-widest font-sans">Hours</span>
                </div>
                <span className="text-xl font-black text-slate-300 animate-pulse mb-6">:</span>
                <div className="flex flex-col items-center">
                  <RollingNumber value={timeLeft.minutes} />
                  <span className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-widest font-sans">Mins</span>
                </div>
                <span className="text-xl font-black text-slate-300 animate-pulse mb-6">:</span>
                <div className="flex flex-col items-center">
                  <RollingNumber value={timeLeft.seconds} isAccent={true} />
                  <span className="text-[9px] font-black text-slate-400 mt-2.5 uppercase tracking-widest font-sans">Secs</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.03)] mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Interactive Calculator</span>
                  <h4 className="text-lg font-bold text-slate-800">Estimate Your Scholarship</h4>
                </div>
                <div className="relative">
                  {/* Pulse active color ring */}
                  <span 
                    className="absolute -inset-1.5 rounded-full blur-md opacity-35 transition-all duration-300"
                    style={{ background: SCHOLARSHIP_TIERS[scoreIndex].accentColor }}
                  />
                  <div className={`relative px-3 py-1.5 rounded-full border text-xs font-bold ${SCHOLARSHIP_TIERS[scoreIndex].levelColor} transition-all duration-300`}>
                    {SCHOLARSHIP_TIERS[scoreIndex].badge}
                  </div>
                </div>
              </div>

              <div className="relative mb-8 pt-4">
                {/* Bubble Emitter viewport */}
                <div className="absolute inset-x-0 bottom-full h-20 overflow-hidden pointer-events-none z-10">
                  <AnimatePresence>
                    {particles.map(p => (
                      <motion.div
                        key={p.id}
                        initial={{ 
                          left: `${p.x}%`, 
                          bottom: '0px', 
                          opacity: 0.8, 
                          scale: 0.2,
                          x: '-50%'
                        }}
                        animate={{ 
                          bottom: `${Math.random() * 50 + 20}px`,
                          x: `calc(-50% + ${Math.random() * 30 - 15}px)`,
                          opacity: 0,
                          scale: [0.2, 1.2, 0.5]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 1, 
                          delay: p.delay,
                          ease: "easeOut" 
                        }}
                        style={{
                          position: 'absolute',
                          width: `${p.size}px`,
                          height: `${p.size}px`,
                          borderRadius: '50%',
                          background: p.color,
                          boxShadow: `0 0 12px ${p.color}`,
                          filter: 'blur(0.5px)'
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Glowing track background matching active accent */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-slate-100 border border-slate-200/40 pointer-events-none" />
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full transition-all duration-300 pointer-events-none" 
                  style={{ 
                    width: `${scoreIndex * 25}%`,
                    background: `linear-gradient(to right, ${SCHOLARSHIP_TIERS[0].accentColor}, ${SCHOLARSHIP_TIERS[scoreIndex].accentColor})`,
                    boxShadow: `0 0 15px -2px ${SCHOLARSHIP_TIERS[scoreIndex].accentColor}`
                  }}
                />

                {/* Active thumb pulse ring indicator */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white pointer-events-none transition-all duration-300 shadow-md flex items-center justify-center"
                  style={{ 
                    left: `calc(${scoreIndex * 25}% - 12px)`,
                    backgroundColor: SCHOLARSHIP_TIERS[scoreIndex].accentColor,
                    boxShadow: `0 0 15px ${SCHOLARSHIP_TIERS[scoreIndex].accentColor}`
                  }}
                  animate={{
                    scale: [1, 1.12, 1],
                    boxShadow: [`0 0 8px ${SCHOLARSHIP_TIERS[scoreIndex].accentColor}`, `0 0 20px ${SCHOLARSHIP_TIERS[scoreIndex].accentColor}`, `0 0 8px ${SCHOLARSHIP_TIERS[scoreIndex].accentColor}`]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </motion.div>

                <input 
                  type="range" 
                  min="0" 
                  max="4" 
                  step="1"
                  value={scoreIndex} 
                  onChange={(e) => setScoreIndex(parseInt(e.target.value))}
                  className="w-full h-8 opacity-0 relative z-20 cursor-pointer focus:outline-none"
                />
              </div>

              <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-wider mb-8">
                {SCHOLARSHIP_TIERS.map((tier, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setScoreIndex(idx)} 
                    className={`transition-colors py-1 px-2 rounded-md ${scoreIndex === idx ? 'text-indigo-600 bg-indigo-50 font-extrabold' : 'hover:text-slate-700'}`}
                  >
                    {tier.percentile}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Scholarship Award</span>
                  <span className="text-2xl font-black transition-all duration-300 block" style={{ color: SCHOLARSHIP_TIERS[scoreIndex].accentColor }}>
                    {SCHOLARSHIP_TIERS[scoreIndex].waiver}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Est. Tuition Saved</span>
                  <span className="text-2xl font-black text-slate-800 transition-all duration-300 block">
                    {SCHOLARSHIP_TIERS[scoreIndex].savings}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/scholarship')}
              className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs overflow-hidden transition-all shadow-md w-full sm:w-auto cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Apply For NST Now <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </div>

          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-[360px] h-[500px]" style={{ perspective: '1000px' }}>
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: isDesktop ? tilt.x : 0,
                  rotateY: isDesktop ? tilt.y : 0,
                  scale: isDesktop && tilt.isHovered ? 1.03 : 1
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
                style={{ transformStyle: isDesktop ? 'preserve-3d' : 'flat' }}
                className={`relative w-full h-full rounded-[2.5rem] bg-gradient-to-b border transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 shadow-2xl ${
                  SCHOLARSHIP_TIERS[scoreIndex].passGradient
                }`}
              >
                {/* Radial Glass Reflection Sweep (Mouse tracking) */}
                {isDesktop && (
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                    style={{
                      background: `radial-gradient(circle at ${tilt.glossX}% ${tilt.glossY}%, rgba(255, 255, 255, ${tilt.isHovered ? '0.15' : '0.04'}) 0%, transparent 50%)`,
                      mixBlendMode: 'overlay'
                    }}
                  />
                )}

                {/* Glass Holographic Glint Sweep */}
                <motion.div
                  key={`sweep-${sweepTrigger}`}
                  initial={{ x: '-150%', y: '-150%' }}
                  animate={{ x: '150%', y: '150%' }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.25) 55%, transparent 70%)',
                    mixBlendMode: 'overlay'
                  }}
                />

                {SCHOLARSHIP_TIERS[scoreIndex].isSpecial && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 z-0">
                    <div className="absolute w-2 h-2 bg-amber-400 rounded-full top-[10%] left-[20%] animate-ping" style={{ animationDelay: '0.2s' }} />
                    <div className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full top-[30%] right-[15%] animate-pulse" />
                    <div className="absolute w-2.5 h-2.5 bg-amber-400 rounded-full bottom-[20%] left-[40%] animate-ping" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full bottom-[40%] right-[30%] animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                )}

                {/* Layer 1: Top Admission Pass Brand Block */}
                <div 
                  className="relative z-10 flex justify-between items-start"
                  style={isDesktop ? { transform: 'translateZ(25px)', transformStyle: 'preserve-3d' } : undefined}
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Official Admission Pass</span>
                    <div className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                      ACADEMYPRO.
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
                    <Gift size={18} className="text-white animate-pulse" />
                  </div>
                </div>

                {/* Layer 2: Middle Estimated Status (Floating High) */}
                <div 
                  className="relative z-10 my-auto text-center py-8"
                  style={isDesktop ? { transform: 'translateZ(55px)', transformStyle: 'preserve-3d' } : undefined}
                >
                  <div className="relative inline-block">
                    <div 
                      className={`absolute -inset-6 border border-dashed rounded-full pointer-events-none transition-all duration-1000 ${
                        SCHOLARSHIP_TIERS[scoreIndex].isSpecial ? 'border-amber-400/40 animate-spin-slow' : 'border-white/10 animate-spin-slow'
                      }`} 
                      style={isDesktop ? { transform: 'translateZ(40px)' } : undefined}
                    />
                    
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">NST ESTIMATED STATUS</span>
                    <motion.div 
                      key={scoreIndex}
                      initial={{ scale: 0.9, opacity: 0, filter: 'blur(3px)' }}
                      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3.5xl font-black tracking-tight uppercase leading-none font-sans drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
                    >
                      {SCHOLARSHIP_TIERS[scoreIndex].waiver.split(' ').map((word, wIdx) => (
                        <span key={wIdx} className={wIdx === 0 && SCHOLARSHIP_TIERS[scoreIndex].isSpecial ? 'text-amber-400 block' : 'block'}>
                          {word}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Layer 3: Bottom Serial/Barcode Section */}
                <div 
                  className="relative z-10 pt-6 border-t border-white/10"
                  style={isDesktop ? { transform: 'translateZ(20px)', transformStyle: 'preserve-3d' } : undefined}
                >
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">PASS NO</span>
                      <span className="text-xs font-mono font-bold tracking-wider">{SCHOLARSHIP_TIERS[scoreIndex].serial}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">VALID UNTIL</span>
                      <span className="text-xs font-bold text-white">JUNE 2026</span>
                    </div>
                  </div>
                  
                  <div className="h-8 w-full flex items-center justify-between opacity-40 hover:opacity-75 transition-opacity bg-white/5 p-1 rounded-md border border-white/5">
                    {[1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 1, 4, 2, 1, 3, 2, 1, 3, 2, 4, 1, 2, 3].map((width, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="bg-white h-full" 
                        style={{ 
                          width: `${width * 2}px`,
                          opacity: bIdx % 3 === 0 ? 0.3 : 0.8
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const MOBILE_FEATURES = [
  {
    title: 'Real-Time Ranking',
    desc: 'Track your percentile rank instantly across national mock exams. See your position update live as answers are submitted.',
    icon: Award,
    color: 'text-blue-500 border-blue-100 bg-blue-50/50',
    accentColor: '#3B82F6'
  },
  {
    title: 'Daily Challenges',
    desc: 'Maintain your streak by solving 5 customized high-yield problems daily. Unlock performance badges and climb tiers.',
    icon: Flame,
    color: 'text-amber-500 border-amber-100 bg-amber-50/50',
    accentColor: '#F59E0B'
  },
  {
    title: 'Personalized Roadmap',
    desc: 'An AI-curated roadmap that dynamically bridges your individual skill gaps in physics, chemistry, and mathematics.',
    icon: Sparkles,
    color: 'text-indigo-500 border-indigo-100 bg-indigo-50/50',
    accentColor: '#6366F1'
  }
];

export const HomeMobileApp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glossX: 50, glossY: 50, isHovered: false });

  const [percentile, setPercentile] = useState(99.4);
  const [solvedCount, setSolvedCount] = useState(4);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Viewport scroll tracking for the mobile app section
  const { scrollYProgress: rawScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Soft spring mapping for extremely responsive and smooth scroll sync
  const scrollYProgress = useSpring(rawScrollY, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001
  });

  // Client-side window size state to prevent SSR issues and run Framer Motion hooks unconditionally
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);



  // Scroll-linked animation transformations (fully complete by progress 0.50 when section is centered)
  const envelopeX = useTransform(scrollYProgress, [0.05, 0.20], [450, 0]);
  const envelopeScale = useTransform(scrollYProgress, [0.05, 0.20, 0.42, 0.50], [0.85, 1, 0.95, 0.8]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.42, 0.50], [0, 1, 1, 0]);
  const flapRotateX = useTransform(scrollYProgress, [0.20, 0.30], [0, -180]);

  const phoneX = useTransform(scrollYProgress, [0.05, 0.20], [450, 0]);
  const phoneY = useTransform(scrollYProgress, [0.05, 0.30, 0.42, 0.50], [180, 180, -140, 0]);
  const phoneScale = useTransform(scrollYProgress, [0.05, 0.30, 0.42, 0.50], [0.38, 0.38, 0.58, 1.0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.05, 0.20, 0.26], [0, 0, 1]);
  const phoneClipPath = useTransform(
    scrollYProgress,
    [0.05, 0.30, 0.42],
    [
      "inset(0px 0px 370px 0px)",
      "inset(0px 0px 370px 0px)",
      "inset(0px 0px 0px 0px)"
    ]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentile(p => p === 99.4 ? 99.5 : 99.4);
      setSolvedCount(c => c === 4 ? 5 : 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    setTilt({
      x: rotateX,
      y: rotateY,
      glossX: (x / rect.width) * 100,
      glossY: (y / rect.height) * 100,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glossX: 50, glossY: 50, isHovered: false });
  };

  return (
    <section className="relative pt-12 pb-32 bg-slate-50/40 overflow-hidden text-slate-800 border-b border-slate-100">
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

      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.1] pointer-events-none transition-all duration-1000 ease-out hidden md:block"
        style={{
          background: MOBILE_FEATURES[activeTab].accentColor,
          left: '30%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Side: Mock 3D Smartphone with Scroll-Linked Envelope Parallax Reveal */}
          <div ref={sectionRef} className="w-full lg:w-1/2 flex justify-center items-center min-h-[640px] relative">
            
            {/* The Envelope Layer (Visible during progress 0 to 0.65, zIndex 10) */}

            {isDesktop && (
              <motion.div
                style={{
                  x: envelopeX,
                  scale: envelopeScale,
                  opacity: envelopeOpacity,
                  zIndex: 10, // physically behind Mock Smartphone
                }}
                className="absolute pointer-events-none"
              >
                <div className="relative w-[340px] h-[240px]" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
                  {/* Envelope Back Interior */}
                  <div className="absolute inset-0 bg-indigo-950 rounded-2xl border border-indigo-500/20 backdrop-blur-sm shadow-inner overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900 to-slate-900" />
                  </div>
                  
                  {/* Folding Top Flap (Animate with scroll-linked rotateX) */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: '120px',
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d',
                      rotateX: flapRotateX,
                      zIndex: 25,
                    }}
                  >
                    {/* Outer Flap Face */}
                    <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                      <svg className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]" viewBox="0 0 340 120" fill="none">
                        <path d="M0 0 L170 115 L340 0 Z" fill={MOBILE_FEATURES[activeTab].accentColor} />
                        <path d="M0 0 L170 115 L340 0" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    {/* Inner Flap Face */}
                    <div className="absolute inset-0" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                      <svg className="w-full h-full" viewBox="0 0 340 120" fill="none">
                        <path d="M0 0 L170 115 L340 0 Z" fill="#312e81" />
                        <path d="M0 0 L170 115 L340 0" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* The Phone Container (zIndex: 20, physically in front of Envelope Sibling) */}
            <div className="relative w-[320px] h-[620px]" style={{ perspective: '1000px', zIndex: 20 }}>
              <motion.div
                onMouseMove={isDesktop ? handleMouseMove : undefined}
                onMouseLeave={handleMouseLeave}
                style={isDesktop ? {
                  x: tilt.isHovered ? 0 : phoneX,
                  y: tilt.isHovered ? -8 : phoneY,
                  scale: tilt.isHovered ? 1.02 : phoneScale,
                  opacity: tilt.isHovered ? 1 : phoneOpacity,
                  rotateX: tilt.isHovered ? tilt.x : 0,
                  rotateY: tilt.isHovered ? tilt.y : 0,
                  transformStyle: 'preserve-3d',
                  clipPath: tilt.isHovered ? "inset(0px 0px 0px 0px)" : phoneClipPath,
                } : {
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: tilt.isHovered ? 200 : 90,
                  damping: tilt.isHovered ? 20 : 15,
                  mass: tilt.isHovered ? 0.5 : 1
                }}
                className="relative w-full h-full bg-slate-950 border-[10px] border-slate-900 rounded-[3.5rem] shadow-[0_30px_70px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col"
              >
                {/* Gloss Sheen */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glossX}% ${tilt.glossY}%, rgba(255, 255, 255, ${tilt.isHovered ? '0.12' : '0.03'}) 0%, transparent 60%)`,
                    mixBlendMode: 'overlay'
                  }}
                />

                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Internal App Content Screen */}
                <div className="w-full h-full bg-slate-950 text-white p-5 pt-8 font-sans flex flex-col justify-between select-none relative z-10">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-4 pb-2 border-b border-slate-900">
                    <span>9:41 AM</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-2 bg-slate-500 rounded-sm" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Dynamic Screen Toggles */}
                  <div className="flex-1 flex flex-col justify-between">
                    {activeTab === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex flex-col h-full justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Award className="text-blue-400 w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Mock Leaderboard</span>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-xl border border-slate-900">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-black text-amber-500 bg-amber-500/10 w-5 h-5 rounded-full flex items-center justify-center">1</span>
                                <span className="text-xs font-semibold text-slate-200">Aarav Sharma</span>
                              </div>
                              <span className="text-xs font-black text-slate-400">99.8%</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-xl border border-slate-900">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-black text-slate-400 bg-slate-400/10 w-5 h-5 rounded-full flex items-center justify-center">2</span>
                                <span className="text-xs font-semibold text-slate-200">Priya Patel</span>
                              </div>
                              <span className="text-xs font-black text-slate-400">99.6%</span>
                            </div>
                            
                            <motion.div 
                              animate={{ scale: percentile === 99.5 ? [1, 1.03, 1] : 1 }}
                              className="flex justify-between items-center bg-blue-950/40 p-3.5 rounded-xl border border-blue-500/30"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs font-black text-blue-400 bg-blue-500/10 w-5 h-5 rounded-full flex items-center justify-center">3</span>
                                <span className="text-xs font-black text-blue-400">You (NST Scholar)</span>
                              </div>
                              <span className="text-xs font-black text-blue-400 transition-all duration-300">
                                {percentile}%
                              </span>
                            </motion.div>
                          </div>
                        </div>

                        <div className="bg-slate-900 p-4 rounded-2xl text-center border border-slate-800">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">YOUR NATIONAL PERCENTILE</span>
                          <span className="text-3xl font-black text-white tracking-tighter italic">Top 0.5%</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex flex-col h-full justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Flame className="text-amber-500 w-5 h-5 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Daily Challenge</span>
                          </div>

                          <div className="flex flex-col items-center my-6">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="50" className="stroke-slate-900" strokeWidth="8" fill="transparent" />
                                <motion.circle 
                                  cx="64" 
                                  cy="64" 
                                  r="50" 
                                  className="stroke-amber-500" 
                                  strokeWidth="8" 
                                  fill="transparent" 
                                  strokeDasharray="314"
                                  animate={{ strokeDashoffset: 314 - (314 * (solvedCount / 5)) }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                <span className="text-3xl font-black">{solvedCount}/5</span>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Solved</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                              <Flame size={16} className="text-amber-500 fill-amber-500/20" />
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">DAILY STREAK</span>
                              <span className="text-xs font-black text-slate-200">7-Days Completed!</span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-amber-500">+150 XP</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex flex-col h-full justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-indigo-400 w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Personalized Roadmap</span>
                          </div>

                          <div className="flex flex-col gap-4 relative pl-6 border-l-2 border-slate-900 py-2">
                            <div className="absolute top-[20px] -left-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                              <Check size={8} className="text-white" />
                            </div>
                            <div className="absolute top-[82px] -left-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-slate-950 animate-pulse" />
                            <div className="absolute top-[144px] -left-1.5 w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center">
                              <Lock size={8} className="text-slate-500" />
                            </div>

                            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900 opacity-60">
                              <span className="text-[9px] font-black text-slate-500 uppercase block">MODULE 1</span>
                              <span className="text-xs font-bold text-slate-200">Kinematics Basics</span>
                            </div>
                            <div className="bg-indigo-950/20 p-3 rounded-xl border border-indigo-500/20">
                              <span className="text-[9px] font-black text-indigo-400 uppercase block">RECOMMENDED NOW</span>
                              <span className="text-xs font-bold text-white">Thermodynamics Gaps</span>
                            </div>
                            <div className="bg-slate-900/20 p-3 rounded-xl border border-slate-950 opacity-40">
                              <span className="text-[9px] font-black text-slate-600 uppercase block">LOCKED</span>
                              <span className="text-xs font-bold text-slate-400">Electromagnetism</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block">EST. READINESS GOAL</span>
                            <span className="text-xs font-bold text-slate-200">JEE Advanced Prep</span>
                          </div>
                          <span className="text-xs font-black text-indigo-400">92%</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Phone bottom indicator */}
                  <div className="w-24 h-1 bg-slate-800 mx-auto rounded-full mt-4" />
                </div>
              </motion.div>
            </div>

            {/* Sibling 3: The Front Envelope Pocket Layer (physically in front of the Phone Container) */}
            {isDesktop && (
              <motion.div
                style={{
                  x: envelopeX,
                  scale: envelopeScale,
                  opacity: envelopeOpacity,
                  zIndex: 30, // physically in front of Mock Smartphone
                }}
                className="absolute pointer-events-none"
              >
                <div className="relative w-[340px] h-[240px]">
                  {/* Front Pocket Flaps */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.15)]" viewBox="0 0 340 240" fill="none">
                      <path d="M0 0 L170 120 L0 240 Z" fill="#1e1b4b" className="opacity-95" />
                      <path d="M340 0 L170 120 L340 240 Z" fill="#1e1b4b" className="opacity-95" />
                      <path d="M0 240 L170 100 L340 240 Z" fill="#0f0e26" />
                      <path d="M0 0 L170 120 L340 0" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                      <path d="M0 240 L170 100 L340 240" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Side: Features Selector Accordion */}
          <div className="w-full lg:w-1/2">


            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight mb-8 font-sans overflow-visible py-1"
            >
              Learning In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 not-italic font-extrabold px-1">
                Your Pocket.
              </span>
            </motion.h2>

            {/* Feature Selectors */}
            <div className="flex flex-col gap-4 mb-12">
              {MOBILE_FEATURES.map((feature, idx) => {
                const isActive = activeTab === idx;
                const Icon = feature.icon;

                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                      isActive 
                        ? 'bg-white border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.03)]' 
                        : 'bg-transparent border-transparent hover:bg-slate-100/40'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${feature.color}`}>
                      <Icon size={18} className={isActive ? 'animate-bounce' : ''} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-base font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                        {feature.title}
                      </h4>
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-sm text-slate-500 font-medium mt-2 leading-relaxed"
                        >
                          {feature.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download Buttons */}
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsPaused(false);
                  setToastMessage('📲 Connecting to App Store... Downloading quantum-encrypted student portal client...');
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 4000);
                }}
                className="px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              >
                <Smartphone size={18}/> App Store
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsPaused(false);
                  setToastMessage('📲 Connecting to Google Play Store... Downloading quantum-encrypted parent portal client...');
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 4000);
                }}
                className="px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              >
                <Smartphone size={18}/> Play Store
              </motion.button>
            </div>

          </div>

        </div>
      </div>

      {/* Premium Floating Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-6 bg-slate-950/95 border border-indigo-500/30 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.5)] max-w-sm flex items-start gap-4 text-white"
            style={{
              boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Smartphone size={20} className={isPaused ? "animate-none" : "animate-pulse"} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                {isPaused ? "Download Paused" : "Download Initialized"} <Sparkles size={12} className="text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isPaused ? "Download task suspended. Connection pool held." : toastMessage}
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isPaused ? { width: "35%" } : { width: '100%' }}
                  transition={isPaused ? { duration: 0 } : { duration: 3.5, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                />
              </div>

              {/* Pause & Folder controls */}
              <div className="flex items-center gap-3 mt-3.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPaused(!isPaused);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[9px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer select-none text-indigo-200"
                >
                  {isPaused ? <Play size={10} /> : <Pause size={10} />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[9px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer select-none text-indigo-200"
                >
                  <Folder size={10} /> Folder
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
