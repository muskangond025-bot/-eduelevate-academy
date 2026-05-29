import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, ShieldCheck, Mail, BellRing, Star, Wifi, Battery, ArrowRight, MousePointer2 } from 'lucide-react';

const SparkParticlesTrail = ({ coords, colorClass }: { coords: { x: number; y: number }; colorClass: string }) => {
  const [sparks, setSparks] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (coords.x === 0 && coords.y === 0) return;
    setSparks((prev) => {
      const next = [{ x: coords.x, y: coords.y, id: Math.random() }, ...prev];
      return next.slice(0, 3);
    });
  }, [coords]);

  return (
    <>
      {sparks.map((spark, idx) => (
        <div
          key={spark.id}
          className={`absolute pointer-events-none rounded-full blur-[1px] transition-all duration-300 ${colorClass}`}
          style={{
            left: spark.x,
            top: spark.y,
            width: `${5 - idx * 1.2}px`,
            height: `${5 - idx * 1.2}px`,
            opacity: 0.6 - idx * 0.15,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        />
      ))}
    </>
  );
};

const FeatureCard = ({
  feature,
  index,
  activeFeature,
  setActiveFeature,
  hoveredFeature,
  setHoveredFeature
}: {
  feature: { title: string; desc: string; icon: React.ReactNode; badge: string; laserColor: string; sparkColor: string };
  index: number;
  activeFeature: number;
  setActiveFeature: (i: number) => void;
  hoveredFeature: number | null;
  setHoveredFeature: (i: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCoords({ x, y });
    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setHoveredFeature(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredFeature(null);
  };

  const isActive = activeFeature === index;
  const isSelfHovered = hoveredFeature === index;
  const isDimmed = hoveredFeature !== null && hoveredFeature !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActiveFeature(index)}
      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/card ${
        isActive
          ? 'bg-white/[0.08] border-indigo-500/40 shadow-2xl scale-[1.01]'
          : isSelfHovered
            ? 'bg-white/[0.05] border-white/10 shadow-lg scale-[1.005]'
            : isDimmed
              ? 'opacity-40 scale-[0.985] blur-[0.5px] border-white/5 bg-transparent'
              : 'bg-white/[0.02] border-white/5'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${feature.laserColor}, transparent 80%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <SparkParticlesTrail coords={coords} colorClass={feature.sparkColor} />

      <div className="relative z-10 flex gap-5 items-start" style={{ transform: 'translateZ(20px)' }}>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
          isActive
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
            : 'bg-white/5 border-white/10 text-indigo-400 group-hover/card:bg-white/10 group-hover/card:text-indigo-300'
        }`}>
          {React.cloneElement(feature.icon as React.ReactElement, { size: 20, className: isSelfHovered ? 'animate-pulse' : '' })}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h4 className="font-bold text-white group-hover/card:text-indigo-200 transition-colors uppercase leading-none tracking-tight">
              {feature.title}
            </h4>
            {isActive && (
              <span className="font-mono text-[7px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-widest">
                [MONITORED]
              </span>
            )}
          </div>
          <p className="text-slate-400 text-[12px] font-semibold leading-relaxed">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ParentMonitoring = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const features = [
    {
      title: "Instant Alerts",
      desc: "Get notified the moment a test ends or an attendance is missed.",
      icon: <BellRing />,
      badge: "ALERT_STREAM",
      laserColor: "rgba(99, 102, 241, 0.4)",
      sparkColor: "bg-indigo-500"
    },
    {
      title: "Weekly Digest",
      desc: "A detailed summary report delivered to your WhatsApp on Sundays.",
      icon: <Mail />,
      badge: "DIGEST_SYNC",
      laserColor: "rgba(16, 185, 129, 0.4)",
      sparkColor: "bg-emerald-500"
    },
    {
      title: "Dedicated App",
      desc: "Native iOS and Android app for tracking data on the move.",
      icon: <Smartphone />,
      badge: "APP_Companion",
      laserColor: "rgba(59, 130, 246, 0.4)",
      sparkColor: "bg-blue-500"
    },
    {
      title: "Counselor Chat",
      desc: "Direct line to child's academic counselor via the app portal.",
      icon: <ShieldCheck />,
      badge: "COUNSELOR_CHAT",
      laserColor: "rgba(245, 158, 11, 0.4)",
      sparkColor: "bg-amber-500"
    }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#060813] text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Deep Space Grid Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.6) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic spotlight trailing coordinates */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
          zIndex: 1
        }}
      />

      {/* CSS keyframe animations for inner sub-mockups */}
      <style>{`
        @keyframes notch-ping {
          0% { transform: scale(0.9); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.5; }
          100% { transform: scale(0.9); opacity: 0.2; }
        }
        @keyframes sound-wave {
          0%, 100% { height: 10px; }
          50% { height: 26px; }
        }
        .animate-notch-ping {
          animation: notch-ping 2s infinite ease-in-out;
        }
        .animate-sound-wave {
          animation: sound-wave 1.2s infinite ease-in-out;
        }
      `}</style>

      {/* Guidelines overlay */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Panel: Header and features list */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
            >
              <ShieldCheck size={11} className="text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Parental Peace of Mind</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase leading-none select-none">
              Zero{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-400 italic font-black">
                Blind
              </span>{' '}
              Spots.
            </h2>
            <p className="text-slate-400 font-semibold mb-12 leading-relaxed text-sm md:text-base">
              No need to ask "how's the study going?" every day. Our Parent App provides a real-time window into your child's discipline, scores, and attendance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <FeatureCard
                  key={i}
                  feature={feature}
                  index={i}
                  activeFeature={activeFeature}
                  setActiveFeature={setActiveFeature}
                  hoveredFeature={hoveredFeature}
                  setHoveredFeature={setHoveredFeature}
                />
              ))}
            </div>
          </div>

          {/* Right Panel: Smartphone Simulator mockup */}
          <div className="lg:w-1/2 w-full flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[310px] aspect-[9/19] bg-[#0c0f1e] border-[6px] border-[#1e293b] rounded-[3.8rem] shadow-2xl relative overflow-hidden p-3.5 flex flex-col justify-between z-10"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0c0f1e] rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] mr-2" />
                <div className="w-8 h-1 bg-[#1e293b] rounded-full" />
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center py-1 px-4 text-[8px] font-mono font-bold text-white/60 select-none z-30">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={9} />
                  <Battery size={11} className="text-white/80" />
                </div>
              </div>

              {/* Inner Screen Canvas */}
              <div className="flex-1 bg-white/95 rounded-[3rem] p-5 text-primary flex flex-col justify-between h-full min-h-[440px] shadow-inner relative overflow-hidden mt-1.5 z-10 border border-indigo-50/50 select-none">
                
                {/* Header controls inside phone */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-[10px] text-primary shadow-sm border border-slate-200/50">
                    AR
                  </div>
                  <BellRing size={14} className="text-indigo-600 animate-bounce" />
                </div>

                {/* Student Info */}
                <div className="mb-4">
                  <h5 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Student Performance</h5>
                  <h4 className="text-xl font-black tracking-tight leading-none">Aditya Roy</h4>
                </div>

                {/* Animated Screens based on active feature selector */}
                <div className="flex-1 flex flex-col justify-between relative">
                  <AnimatePresence mode="wait">
                    {activeFeature === 0 && (
                      <motion.div
                        key="alert"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 flex-1 flex flex-col justify-between"
                      >
                        {/* Slide-down alert banner popup */}
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl relative overflow-hidden shadow-sm flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                          <div className="flex-1">
                            <div className="text-[7px] font-black text-rose-500 uppercase tracking-widest leading-none mb-1">Test Completed</div>
                            <div className="text-[10px] font-black text-indigo-950 leading-none">Physics: Mechanics // AIR 142</div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Achievement</div>
                            <div className="text-[10px] font-black text-emerald-600 leading-none">+15% Score</div>
                          </div>
                          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Attendance</div>
                            <div className="text-[10px] font-black text-indigo-650 leading-none">98.2% Reg</div>
                          </div>
                        </div>

                        {/* Spline Bar Columns */}
                        <div className="h-16 flex items-end gap-1.5 pt-4">
                          {[30, 50, 40, 80, 60, 40, 90].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.6, delay: i * 0.05 }}
                              className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-600 rounded-t-sm"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 1 && (
                      <motion.div
                        key="digest"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 flex-1 flex flex-col justify-between"
                      >
                        {/* Weekly progress radar mockup graphic */}
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center flex-1 shadow-sm relative overflow-hidden">
                          <div className="absolute -right-4 -bottom-4 w-12 h-12 border border-dashed border-indigo-200 rounded-full pointer-events-none opacity-30 animate-sub-rotate" />
                          <svg width="80" height="80" viewBox="0 0 80 80" className="w-[80px] h-[80px]">
                            <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1.5" />
                            <circle cx="40" cy="40" r="20" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1.5" />
                            <circle cx="40" cy="40" r="10" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1.5" />
                            {/* Competency arcs */}
                            <path d="M 40 10 A 30 30 0 0 1 70 40" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 40 20 A 20 20 0 0 1 60 40" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 40 30 A 10 10 0 0 1 50 40" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="40" cy="40" r="3" fill="#6366f1" />
                          </svg>
                          <div className="text-[7px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-2">[METRIC: SYNC_94%]</div>
                        </div>

                        {/* WhatsApp digest alert */}
                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                          <div className="text-[8px] font-black text-indigo-950 uppercase leading-none">
                            💬 WhatsApp Digest Sent (Sun 09:00)
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 2 && (
                      <motion.div
                        key="app"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 flex-1 flex flex-col justify-between"
                      >
                        {/* Live calibration terminal logs */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col justify-between shadow-sm relative overflow-hidden">
                          <div className="flex justify-between items-center select-none border-b border-white/5 pb-2 mb-2">
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="text-[6px] font-mono text-slate-400 uppercase tracking-widest">[SYSTEM_ACTIVE]</span>
                          </div>
                          
                          <div className="font-mono text-[7px] text-indigo-300 space-y-1.5 leading-normal">
                            <div>&gt; _ DEVICE CONNECTED</div>
                            <div>&gt; _ INVENTORY SYNC: OK</div>
                            <div>&gt; _ TRACKING: REAL_TIME</div>
                            <div>&gt; _ ATTENDANCE: 98.2%</div>
                            <div>&gt; _ STATUS: SYNCHRONIZED</div>
                          </div>
                          <div className="h-1" />
                        </div>

                        {/* Status chip */}
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl shadow-sm flex items-center justify-between">
                          <span className="text-[8px] font-black text-indigo-950 uppercase tracking-widest">App Version</span>
                          <span className="text-[8px] font-mono font-bold text-blue-600">v4.0.8 [SECURE]</span>
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 3 && (
                      <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 flex-1 flex flex-col justify-between overflow-hidden"
                      >
                        {/* Simulated live chat feed */}
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 flex-1 flex flex-col justify-end shadow-sm relative overflow-hidden select-none">
                          {/* Chat bubble parent */}
                          <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none px-3 py-1.5 text-[8.5px] font-semibold self-end max-w-[85%] mb-2 shadow-sm text-right">
                            How is Aditya's calculus?
                          </div>
                          
                          {/* Chat bubble counselor */}
                          <div className="bg-slate-200/80 text-primary border border-slate-300/20 rounded-2xl rounded-tl-none px-3 py-1.5 text-[8.5px] font-semibold self-start max-w-[85%] mb-2 shadow-sm">
                            He improved +15% in physics!
                          </div>

                          <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none px-3 py-1.5 text-[8.5px] font-semibold self-end max-w-[85%] shadow-sm text-right">
                            Amazing, thank you!
                          </div>
                        </div>

                        {/* Input bar */}
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                          <span className="text-[8px] font-semibold text-slate-400">Type message...</span>
                          <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-inner">
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="w-24 h-1 bg-[#1e293b] rounded-full mx-auto mt-2.5 z-30" />
            </motion.div>

            {/* Rotated Holographic Foil Sticker */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 bg-gradient-to-r from-violet-500 via-pink-500 to-indigo-500 text-white font-black px-6 py-3 rounded-2xl shadow-2xl rotate-6 uppercase text-[10px] tracking-widest select-none z-20 border border-white/20 backdrop-blur-md"
              style={{
                boxShadow: '0 20px 40px rgba(167, 139, 250, 0.35)',
                textShadow: '0 1px 1px rgba(0,0,0,0.15)'
              }}
            >
              Locked to your Phone
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
