import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, ShieldCheck, Sparkles, Send, Activity, Terminal } from 'lucide-react';

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

const GravityWarpMeshGrid = ({ mouseCoords, isActive }: { mouseCoords: { x: number; y: number }; isActive: boolean }) => {
  const gridRows = 6;
  const gridCols = 12;
  const [warpOffsets, setWarpOffsets] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    if (!isActive) return;
    const offsets: Record<string, { x: number; y: number }> = {};
    for (let r = 0; r <= gridRows; r++) {
      for (let c = 0; c <= gridCols; c++) {
        const nodeX = (c / gridCols) * window.innerWidth;
        const nodeY = (r / gridRows) * 450; // section height estimate
        const dx = mouseCoords.x - nodeX;
        const dy = mouseCoords.y - nodeY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 280;
        
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const pull = force * force * -28;
          offsets[`${r}-${c}`] = {
            x: (dx / distance) * pull,
            y: (dy / distance) * pull
          };
        } else {
          offsets[`${r}-${c}`] = { x: 0, y: 0 };
        }
      }
    }
    setWarpOffsets(offsets);
  }, [mouseCoords, isActive]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.09] z-0">
      {/* Horizontal grid lines */}
      {Array.from({ length: gridRows + 1 }).map((_, r) => {
        const yPercent = (r / gridRows) * 100;
        return (
          <path
            key={`h-${r}`}
            d={Array.from({ length: gridCols + 1 }).map((_, c) => {
              const xPercent = (c / gridCols) * 100;
              const offset = warpOffsets[`${r}-${c}`] || { x: 0, y: 0 };
              const action = c === 0 ? 'M' : 'L';
              return `${action} calc(${xPercent}% + ${offset.x}px) calc(${yPercent}% + ${offset.y}px)`;
            }).join(' ')}
            fill="none"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1"
            className="transition-all duration-300"
          />
        );
      })}

      {/* Vertical grid lines */}
      {Array.from({ length: gridCols + 1 }).map((_, c) => {
        const xPercent = (c / gridCols) * 100;
        return (
          <path
            key={`v-${c}`}
            d={Array.from({ length: gridRows + 1 }).map((_, r) => {
              const yPercent = (r / gridRows) * 100;
              const offset = warpOffsets[`${r}-${c}`] || { x: 0, y: 0 };
              const action = r === 0 ? 'M' : 'L';
              return `${action} calc(${xPercent}% + ${offset.x}px) calc(${yPercent}% + ${offset.y}px)`;
            }).join(' ')}
            fill="none"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1"
            className="transition-all duration-300"
          />
        );
      })}
    </svg>
  );
};

const MagneticSubscribeButton = ({
  children,
  onClick,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  laserColor?: string;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setBtnCoords({ x, y });
    setPosition({
      x: (x - centerX) * 0.15,
      y: (y - centerY) * 0.15
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onClick={onClick}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3" style={{ transform: "translateZ(10px)" }}>
        {children}
      </span>
    </motion.button>
  );
};

export const BlogNewsletter = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [cardCoords, setCardCoords] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCardCoords({ x, y });
    setCardTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#060813] relative z-10 overflow-hidden"
    >
      {/* Dynamic coordinates gravity warp mesh grid */}
      <GravityWarpMeshGrid mouseCoords={sectionCoords} isActive={isSectionHovered} />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
      <div
        className="absolute pointer-events-none transition-opacity duration-75 blur-[120px] rounded-full z-0"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(6, 8, 19, 0.05) 50%, transparent 100%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Frosted Glassmorphic Subscription Console Bezel */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="relative rounded-[4rem] border transition-all duration-500 overflow-hidden bg-[#0d1222]/30 backdrop-blur-xl border-white/10 shadow-2xl p-16 lg:p-24 flex flex-col items-center text-center select-none"
          style={{
            transform: `perspective(1000px) rotateX(${-cardTilt.y * 3.5}deg) rotateY(${cardTilt.x * 3.5}deg) scale3d(${isCardHovered ? 1.015 : 1}, ${isCardHovered ? 1.015 : 1}, 1)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Border laser sweep highlight trailing cursor inside card */}
          <div
            className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(150px circle at ${cardCoords.x}px ${cardCoords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
              padding: '1.2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Dynamic Holographic Foil Sheen Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 mix-blend-overlay"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(99,102,241,0.08) 50%, rgba(34,211,238,0.06) 60%, rgba(255,255,255,0) 100%)`,
              transform: `translate(${cardTilt.x * 25}px, ${cardTilt.y * 25}px)`
            }}
          />

          {/* Sparks Trail */}
          <SparkParticlesTrail coords={cardCoords} colorClass="bg-indigo-400" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                className="w-full flex flex-col items-center"
              >
                {/* Visual HUD Orbit Badge */}
                <div className="relative mb-8 w-20 h-20 flex items-center justify-center" style={{ transform: "translateZ(35px)" }}>
                  <div className="absolute inset-0 border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                  <div className="absolute inset-[-6px] border border-dotted border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '16s', animationDirection: 'reverse' }} />
                  <motion.div 
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/15 border border-indigo-400/45 flex items-center justify-center text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.35)] relative"
                  >
                    <Mail size={20} className="text-cyan-300 animate-pulse" />
                    
                    {/* Active status indicator led dot */}
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-ping" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_4px_#22d3ee]" />
                  </motion.div>
                </div>

                {/* Headline word clip stagger reveals */}
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-6 overflow-visible py-1" style={{ transform: "translateZ(30px)" }}>
                  Stay Ahead in the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 italic font-black px-1">
                    Competitive
                  </span> Race.
                </h3>
                
                {/* Description paragraph */}
                <p className="text-slate-300 font-semibold leading-relaxed max-w-xl mb-12 text-sm md:text-base" style={{ transform: "translateZ(15px)" }}>
                  Subscribe to our newsletter to receive the latest academic strategies and exam updates directly in your inbox every weekend.
                </p>

                {/* Form layout */}
                <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col sm:flex-row gap-5 items-stretch relative" style={{ transform: "translateZ(25px)" }}>
                  
                  {/* Floating-label text input field */}
                  <div className="relative flex-1 group/input">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="w-full px-8 py-5.5 bg-slate-950/40 border border-white/10 rounded-2xl outline-none text-white font-bold text-sm tracking-wide transition-all focus:bg-slate-950/70" 
                    />
                    
                    {/* Floating monospaced Technical badge label */}
                    <label 
                      className={`absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest transition-all pointer-events-none select-none ${
                        isFocused || email 
                          ? 'text-indigo-400 translate-y-[-235%] bg-[#080d19] px-2 scale-90 border border-indigo-500/30 rounded-md font-bold' 
                          : 'text-slate-500'
                      }`}
                    >
                      [Email_Address // Enter]
                    </label>

                    {/* Expanding bottom laser underline */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300" 
                      style={{ width: isFocused ? '100%' : '0%' }}
                    />
                  </div>

                  {/* Magnetic Submit Action Button */}
                  <MagneticSubscribeButton
                    onClick={() => {}}
                    className="px-10 py-5.5 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-black hover:scale-[1.03] shadow-2xl"
                    laserColor="rgba(255, 255, 255, 0.45)"
                  >
                    <span>{isSubmitting ? "Compiling..." : "Subscribe"}</span>
                    {!isSubmitting && <Send size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
                  </MagneticSubscribeButton>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }}
                className="w-full flex flex-col items-center"
              >
                {/* Circular secure target reticle */}
                <div className="relative mb-8 w-20 h-20 flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                  {/* Concentric rotating spinner HUD orbits */}
                  <div className="absolute inset-[-4px] border border-dashed border-emerald-400 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                  <div className="absolute inset-[-12px] border border-dotted border-emerald-400/40 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                    className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400"
                  >
                    <ShieldCheck size={26} />
                  </motion.div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none mb-4" style={{ transform: "translateZ(20px)" }}>
                  Security Verification Secure
                </h3>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-8">
                  [NEWSLETTER_STATUS: SUBSCRIBED // ENVELOPE: SECURE]
                </p>

                <p className="text-slate-300 leading-relaxed font-semibold max-w-md text-sm md:text-base mb-10" style={{ transform: "translateZ(10px)" }}>
                  Thank you! You have been successfully added to our weekend academic digests list. Expect strategic exam intelligence in your inbox.
                </p>

                {/* Monospace telemetry success logs */}
                <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl font-mono text-[8px] text-emerald-400/80 leading-relaxed max-w-xs text-left w-full select-none shadow-md">
                  <div>[0.00s] INITIALIZING NEWSLETTER_HANDSHAKE...</div>
                  <div>[0.32s] RECORD SYNCED: {email}</div>
                  <div>[0.68s] STATUS: SECURED // COMPILATION STABLE</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fixed corner technical coordinates tracker indicators */}
          <span className="absolute bottom-4 right-6 font-mono text-[7px] text-slate-500 select-none">
            [RADAR_COORD: SECURE // INDEX: NEWS_AXIS]
          </span>
        </motion.div>
      </div>
    </section>
  );
};
