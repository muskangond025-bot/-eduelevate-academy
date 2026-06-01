import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, Search, ShieldCheck, Sparkles, Activity, Target, Award, Disc } from 'lucide-react';

const SpotlightCard = ({ 
  children, 
  className = "", 
  delay = 0,
  hoveredCard,
  setHoveredCard,
  index
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  hoveredCard: number | null;
  setHoveredCard: (i: number | null) => void;
  index: number;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  const isDimmed = hoveredCard !== null && hoveredCard !== index;
  const isSelfHovered = hoveredCard === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[3rem] bg-white/40 border backdrop-blur-xl p-10 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between group ${
        isSelfHovered 
          ? 'border-amber-500/35 bg-white shadow-[0_0_50px_rgba(245,158,11,0.06)]' 
          : isDimmed
            ? 'border-slate-100 opacity-45 scale-[0.98] blur-[0.5px]'
            : 'border-slate-200/50 shadow-sm'
      } ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 10}deg) rotateY(${tilt.x * 10}deg) scale3d(${isSelfHovered ? 1.015 : 1}, ${isSelfHovered ? 1.015 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.05), transparent 80%)`,
        }}
      />
      
      {/* Razor-Thin Cursor-Tracking Border Laser */}
      <div 
        className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(110px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.4), transparent 80%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Decorative Corner Brackets */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-slate-200 group-hover:border-amber-500/30 transition-colors" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-slate-200 group-hover:border-amber-500/30 transition-colors" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-slate-200 group-hover:border-amber-500/30 transition-colors" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-slate-200 group-hover:border-amber-500/30 transition-colors" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

// 1. Fee Waiver Custom Widget: Golden waiver multiplier pass
const FeeWaiverWidget = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="h-32 w-full bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center relative overflow-hidden mt-8 transition-colors group-hover:bg-amber-50/20 group-hover:border-amber-500/10">
      <style>{`
        @keyframes scale-pulse-concentric {
          0%, 100% { transform: scale(0.95); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        .concentric-pulse {
          animation: scale-pulse-concentric 3s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute w-24 h-24 rounded-full border border-dashed border-amber-500/10 concentric-pulse" />
      <div className="absolute w-16 h-16 rounded-full border border-dashed border-amber-500/20" />
      
      <div className="text-center z-10 font-mono">
        <span className="text-[8px] font-black text-amber-600/70 uppercase tracking-widest block mb-1">Max Waiver</span>
        <span className="text-3xl font-black text-slate-800 block tracking-tighter">100%</span>
        <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-wider block">Full-Ride Tuition</span>
      </div>
    </div>
  );
};

// 2. Performance Report Custom Widget: Telemetry analytical chart bars
const PerformanceReportWidget = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="h-32 w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-5 flex flex-col justify-between relative overflow-hidden mt-8 group-hover:bg-indigo-50/20 group-hover:border-indigo-500/10 transition-colors">
      <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
        <span>Diag_Report_N4</span>
        <span>Accuracy</span>
      </div>
      
      <div className="space-y-2.5 my-1">
        {[
          { label: "Physics", val: isHovered ? "88%" : "38%", w: isHovered ? "88%" : "38%", color: "bg-indigo-500" },
          { label: "Chemistry", val: isHovered ? "92%" : "45%", w: isHovered ? "92%" : "45%", color: "bg-amber-500" },
          { label: "Maths", val: isHovered ? "85%" : "52%", w: isHovered ? "85%" : "52%", color: "bg-purple-500" }
        ].map(bar => (
          <div key={bar.label} className="space-y-0.5">
            <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-500">
              <span>{bar.label}</span>
              <span className="font-bold">{bar.val}</span>
            </div>
            <div className="w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
              <div className={`h-full ${bar.color} transition-all duration-1000 ease-out`} style={{ width: bar.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. AIR Prediction: Military concentric radar sweep predicting rank
const AIRPredictionWidget = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="h-32 w-full bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center overflow-hidden relative mt-8 group-hover:bg-purple-50/20 group-hover:border-purple-500/10 transition-colors">
      <style>{`
        @keyframes radar-sweep-benefits {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .radar-sweep-benefits-hand {
          animation: radar-sweep-benefits 4s linear infinite;
        }
      `}</style>
      <div className="absolute w-20 h-20 rounded-full border border-purple-500/10" />
      <div className="absolute w-28 h-28 rounded-full border border-purple-500/5" />
      
      {/* Sweep hand */}
      <div className="absolute w-32 h-32 radar-sweep-benefits-hand pointer-events-none">
        <div 
          className="w-1/2 h-full absolute right-0 top-0 origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)',
            transform: 'rotate(-90deg)',
          }}
        />
      </div>

      <div className="text-center z-10 font-mono">
        <span className="text-[7.5px] font-black text-purple-600/70 uppercase tracking-widest block mb-0.5">Target Vector</span>
        <span className="text-2xl font-black text-slate-800 block tracking-tighter">AIR &lt; 50</span>
        <span className="text-[6.5px] font-black text-slate-400 uppercase tracking-wider block">Diagnostics Sync</span>
      </div>
    </div>
  );
};

// 4. Certified Success: Glowing merit badge outline
const CertifiedSuccessWidget = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="h-32 w-full bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col justify-between p-4 relative overflow-hidden mt-8 group-hover:bg-emerald-50/20 group-hover:border-emerald-500/10 transition-colors">
      <div className="w-full flex justify-between items-center text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200/50 pb-1.5">
        <span>Merit_Pass_Sync</span>
        <span>Secure</span>
      </div>
      
      <div className="my-auto flex items-center justify-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
          <Award size={18} />
        </div>
        <div className="font-mono text-left">
          <span className="text-[9px] font-black text-slate-800 block leading-tight">Certificate of Merit</span>
          <span className="text-[7px] text-slate-400 uppercase tracking-wider block mt-0.5">ID: NST-CERT-SECURE</span>
        </div>
      </div>
    </div>
  );
};

export const TestBenefits = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const benefits = [
    {
      icon: <Trophy />,
      title: "Fee Waivers",
      desc: "Up to 100% scholarship on tuition fees for top performers.",
      widget: (h: boolean) => <FeeWaiverWidget isHovered={h} />
    },
    {
      icon: <TrendingUp />,
      title: "Performance Report",
      desc: "Get a detailed 10-page analysis of your strengths and weaknesses.",
      widget: (h: boolean) => <PerformanceReportWidget isHovered={h} />
    },
    {
      icon: <Search />,
      title: "AIR Prediction",
      desc: "Receive an estimated All India Rank based on your test score.",
      widget: (h: boolean) => <AIRPredictionWidget isHovered={h} />
    },
    {
      icon: <ShieldCheck />,
      title: "Certified Success",
      desc: "Every participant receives a Certificate of Merit to boost their profile.",
      widget: (h: boolean) => <CertifiedSuccessWidget isHovered={h} />
    }
  ];

  return (
    <section className="pt-12 pb-24 bg-[#FAF9F6] relative overflow-hidden">
      {/* Dotted Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Accent nebulae tracking behind */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none"
          >
            TEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">BENEFITS.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-md mx-auto"
          >
            Why thousands of ambitious students benchmark their vector scores inside the national assessment matrices.
          </motion.p>
        </div>

        {/* Breathtaking cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => {
            const isHovered = hoveredCard === i;
            return (
              <SpotlightCard
                key={i}
                index={i}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                delay={i * 0.08}
              >
                <div>
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300 transform group-hover:rotate-6">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <h3 className="text-2xl font-black text-primary mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-semibold leading-relaxed">{item.desc}</p>
                </div>
                
                {/* Embedded dynamic custom widget */}
                {item.widget(isHovered)}
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
