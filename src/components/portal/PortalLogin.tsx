import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Shield, ShieldCheck, Terminal, User, Lock, Activity, Cpu } from 'lucide-react';

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

const MagneticSubmitButton = ({
  children,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)",
  disabled = false
}: {
  children: React.ReactNode;
  className?: string;
  laserColor?: string;
  disabled?: boolean;
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
      type="submit"
      disabled={disabled}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-[0.15em] text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform cursor-pointer ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && !disabled && (
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

const KineticWord = ({ 
  word, 
  className, 
  delayOffset = 0, 
  mouseCoords 
}: { 
  word: string; 
  className: string; 
  delayOffset: number;
  mouseCoords: { x: number; y: number };
}) => {
  const letters = word.split('');
  return (
    <span className="flex flex-wrap gap-x-[0.02em] justify-center overflow-visible">
      {letters.map((char, charIdx) => {
        const letterRef = useRef<HTMLSpanElement>(null);
        const [letterOffset, setLetterOffset] = useState({ x: 0, y: 0, scale: 1, skew: 0 });
        const [isHovered, setIsHovered] = useState(false);

        useEffect(() => {
          if (!letterRef.current) return;
          const rect = letterRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const dx = mouseCoords.x - centerX;
          const dy = mouseCoords.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const pullFactor = (120 - distance) / 120;
            setLetterOffset({
              x: (dx / distance) * pullFactor * -15,
              y: (dy / distance) * pullFactor * -15,
              scale: 1 + pullFactor * 0.25,
              skew: pullFactor * -15
            });
            setIsHovered(true);
          } else {
            setLetterOffset({ x: 0, y: 0, scale: 1, skew: 0 });
            setIsHovered(false);
          }
        }, [mouseCoords]);

        return (
          <motion.span
            ref={letterRef}
            key={charIdx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: letterOffset.y,
              x: letterOffset.x,
              scale: letterOffset.scale,
              skewX: letterOffset.skew,
              color: 'inherit'
            }}
            transition={{
              type: "spring",
              stiffness: isHovered ? 250 : 120,
              damping: isHovered ? 12 : 25,
              delay: delayOffset + charIdx * 0.04
            }}
            className={`inline-block select-none origin-center cursor-pointer transition-colors duration-200 ${className}`}
            style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
};

export const PortalLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // View states
  const [view, setView] = useState<'login' | 'forgot' | 'register'>('login');
  const [copiedText, setCopiedText] = useState("");

  // Login states
  const [enrollmentId, setEnrollmentId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Recovery states
  const [recoveryPhone, setRecoveryPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isRecovered, setIsRecovered] = useState(false);
  const [recoveredEnrollment, setRecoveredEnrollment] = useState("");
  const [recoveredCode, setRecoveredCode] = useState("");

  // Registration states
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCourse, setRegCourse] = useState("JEE Preparation");
  const [regSuccess, setRegSuccess] = useState(false);
  const [generatedEnrollment, setGeneratedEnrollment] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // OTP Countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 1500);
  };

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryPhone) return;
    setSubmitting(true);
    setLogs(["BOOT: INITIATING RECOVERY THREAD..."]);

    const simLogs = [
      "DB: QUERYING SYSTEM NODE PHONE...",
      "MATCH: MOBILE SUBSCRIBER FOUND // NODE ACTIVE",
      "SECURE_SMS: GENERATING OTP GATEWAY HANDSHAKE",
      "SMS_GATEWAY: DISPATCHING SMS TOKEN [AES-256]"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < simLogs.length) {
        setLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${simLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(interval);
        setSubmitting(false);
        setOtpSent(true);
        setOtpTimer(60);
      }
    }, 280);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setSubmitting(true);
    setLogs(["BOOT: VALIDATING SMS ACCESS TOKEN..."]);

    const simLogs = [
      "HANDSHAKE: CHECKING MATCHING OTP",
      "VALIDATION: OTP CODE VERIFIED",
      "ACCESS: DECRYPTING STUDENT ACCESS KEY",
      "SECURE: PROFILE RECORD SYNCHRONIZED"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < simLogs.length) {
        setLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${simLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(interval);
        setSubmitting(false);
        setRecoveredEnrollment("PRO-2026-88");
        setRecoveredCode("SECURE-X9");
        setIsRecovered(true);
      }
    }, 280);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone) return;
    setSubmitting(true);
    setLogs(["BOOT: REGISTERING NEW ACADEMY HUB PROFILE..."]);

    const simLogs = [
      "DB: INITIALIZING STUDENT RECORD DATASTRUCTURE",
      "COMPILATION: GENERATING ENROLLMENT SERIAL",
      "VAULT: GENERATING CIPHER ACCESS ENCRYPTED CODE",
      "STATUS: RECORD SYNCED // COMPILATION STABLE"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < simLogs.length) {
        setLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${simLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(interval);
        setSubmitting(false);
        const randomNum = Math.floor(100 + Math.random() * 900);
        const randomCode = "ACC-" + Math.floor(1000 + Math.random() * 9000);
        setGeneratedEnrollment(`PRO-2026-${randomNum}`);
        setGeneratedCode(randomCode);
        setRegSuccess(true);
      }
    }, 280);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setGlobalMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId || !accessCode) {
      alert("Please enter both enrollment ID and access code.");
      return;
    }

    setSubmitting(true);
    setLogs(["BOOT: CONNECTING PORTAL_AUTHENTICATOR..."]);

    const simLogs = [
      "AUTH: VERIFYING NODE ENROLLMENT_ID",
      "HANDSHAKE: GENERATING 256_BIT SECURE KEY",
      "SECURITY: TESTING ACCESS CODE INTEGRITY",
      "ACCESS: DEPLOYING PERSONALIZED ROADMAP",
      "SUCCESS: REDIRECTING TO STUDENT_PORTAL"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < simLogs.length) {
        setLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${simLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(interval);
        setSubmitting(false);
        onLogin();
      }
    }, 280);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="min-h-screen bg-[#060813] flex items-center justify-center p-4 relative overflow-hidden select-none"
    >
      {/* Gravity Warp Coordinates Mesh Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none z-0">
        <defs>
          <radialGradient id="portalMeshSpotlight" r="30%" cx={`${(coords.x / (containerRef.current?.clientWidth || 1)) * 100}%`} cy={`${(coords.y / (containerRef.current?.clientHeight || 1)) * 100}%`}>
            <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Draw horizontal mesh curves */}
        {Array.from({ length: 7 }).map((_, r) => {
          let pathD = "";
          for (let c = 0; c <= 12; c++) {
            const px = (c / 12) * (containerRef.current?.clientWidth || 1200);
            const py = (r / 6) * (containerRef.current?.clientHeight || 800);
            
            const dx = coords.x - px;
            const dy = coords.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let ox = px;
            let oy = py;
            if (dist < 300) {
              const force = (300 - dist) / 300;
              ox -= dx * force * 0.12;
              oy -= dy * force * 0.12;
            }
            pathD += `${c === 0 ? 'M' : 'L'} ${ox} ${oy}`;
          }
          return (
            <path key={`ph-${r}`} d={pathD} fill="none" stroke="url(#portalMeshSpotlight)" strokeWidth="0.8" />
          );
        })}

        {/* Draw vertical mesh curves */}
        {Array.from({ length: 13 }).map((_, c) => {
          let pathD = "";
          for (let r = 0; r <= 6; r++) {
            const px = (c / 12) * (containerRef.current?.clientWidth || 1200);
            const py = (r / 6) * (containerRef.current?.clientHeight || 800);
            
            const dx = coords.x - px;
            const dy = coords.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let ox = px;
            let oy = py;
            if (dist < 300) {
              const force = (300 - dist) / 300;
              ox -= dx * force * 0.12;
              oy -= dy * force * 0.12;
            }
            pathD += `${r === 0 ? 'M' : 'L'} ${ox} ${oy}`;
          }
          return (
            <path key={`pv-${c}`} d={pathD} fill="none" stroke="url(#portalMeshSpotlight)" strokeWidth="0.8" />
          );
        })}
      </svg>

      {/* Spotlight HSL nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-150 blur-[130px] rounded-full z-0"
        style={{
          opacity: isHovered ? 0.35 : 0,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)'
        }}
      />

      {/* Spark Particle Trails */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-400" />

      {/* Technical grid line guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-10" />

      {/* 3D Glassmorphic Bezel Card Portal */}
      <motion.div 
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full rounded-[4rem] p-12 relative z-10 transition-all duration-500 overflow-hidden border ${
          isCardHovered
            ? 'scale-[1.015] bg-[#0d122b]/80 border-indigo-500/30 shadow-[0_30px_70px_rgba(99,102,241,0.18)]'
            : 'bg-white rounded-[3rem] shadow-3xl border-slate-200/50'
        }`}
        style={{
          transform: isCardHovered
            ? `perspective(1000px) rotateX(${-tilt.y * 3.5}deg) rotateY(${tilt.x * 3.5}deg)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformStyle: "preserve-3d",
          color: isCardHovered ? '#fff' : '#0f172a'
        }}
      >
        {/* Border laser sweep highlight trailing cursor inside card */}
        <div
          className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
            padding: '1.2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        <div className="text-center mb-10 overflow-visible" style={{ transform: "translateZ(20px)" }}>
          {/* Animated concentric HUD circles around active Shield icon */}
          <div 
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all relative ${
              isCardHovered ? 'bg-indigo-600 text-indigo-400 border border-indigo-500/30' : 'bg-primary text-white rotate-12'
            }`}
          >
            <div 
              className="absolute inset-[-4px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none transition-colors" 
              style={{ 
                animationDuration: '8s',
                borderColor: isCardHovered ? 'rgba(99, 102, 241, 0.4)' : ''
              }} 
            />
            {isCardHovered && (
              <div 
                className="absolute inset-[-8px] border border-dotted border-cyan-400 rounded-full animate-spin pointer-events-none" 
                style={{ 
                  animationDuration: '4s',
                  animationDirection: 'reverse'
                }} 
              />
            )}
            <Shield size={32} className="relative z-10" />
          </div>

          {/* Kinetic character wave reveal header */}
          <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-[0.85] mb-2 flex justify-center overflow-visible">
            <KineticWord 
              word="STUDENT" 
              className={`font-black uppercase tracking-tighter transition-colors ${isCardHovered ? 'text-white' : 'text-primary'}`}
              delayOffset={0.05}
              mouseCoords={globalMouse}
            />
            <span className="w-1.5" />
            <KineticWord 
              word="PORTAL." 
              className="text-secondary font-black tracking-tighter"
              delayOffset={0.2}
              mouseCoords={globalMouse}
            />
          </h2>
          <p className={`font-semibold text-xs transition-colors duration-300 ${isCardHovered ? 'text-slate-400' : 'text-slate-500'}`}>
            Enter your credentials to access your academic roadmap.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div
              key="login-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <form className="space-y-6 select-none" onSubmit={handleSubmit} style={{ transform: "translateZ(15px)" }}>
                
                {/* Enrollment ID with expanding bottom focus laser underline */}
                <div className="space-y-2 relative group/input">
                  <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                    isCardHovered ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <User size={10} />
                    <span>[Enrollment ID]</span>
                  </label>
                  <input 
                    type="text" 
                    value={enrollmentId}
                    onChange={(e) => setEnrollmentId(e.target.value)}
                    disabled={submitting}
                    required
                    placeholder="PRO-2026-88" 
                    className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border focus:bg-white focus:text-black ${
                      isCardHovered 
                        ? 'bg-slate-900/60 border-slate-700/50 text-white focus:border-indigo-400' 
                        : 'bg-slate-50 border-transparent text-primary focus:border-secondary'
                    }`} 
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-indigo-500 transition-all duration-300 group-focus-within/input:w-[90%]" />
                </div>

                {/* Access Code with expanding bottom focus laser underline */}
                <div className="space-y-2 relative group/input">
                  <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                    isCardHovered ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Lock size={10} />
                    <span>[Access Code]</span>
                  </label>
                  <input 
                    type="password" 
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    disabled={submitting}
                    required
                    placeholder="••••••••" 
                    className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border focus:bg-white focus:text-black ${
                      isCardHovered 
                        ? 'bg-slate-900/60 border-slate-700/50 text-white focus:border-indigo-400' 
                        : 'bg-slate-50 border-transparent text-primary focus:border-secondary'
                    }`} 
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-indigo-500 transition-all duration-300 group-focus-within/input:w-[90%]" />
                </div>

                <div className="flex items-center justify-between px-2 text-xs">
                  <label className={`flex items-center gap-2 cursor-pointer font-bold ${
                    isCardHovered ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <input 
                      type="checkbox" 
                      disabled={submitting}
                      className="w-4 h-4 rounded border-slate-200 text-secondary focus:ring-secondary cursor-pointer" 
                    />
                    <span>Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={(e) => { e.preventDefault(); setView('forgot'); }}
                    className="font-bold text-secondary uppercase tracking-widest hover:underline cursor-pointer bg-transparent border-none outline-none"
                  >
                    Forgot?
                  </button>
                </div>

                {/* Dynamic connection terminal logs during submit */}
                {submitting && (
                  <div className="w-full bg-slate-950 rounded-2xl border border-white/5 p-4 text-left font-mono text-[7px] text-emerald-400 leading-relaxed shadow-inner overflow-hidden h-24 flex flex-col justify-end">
                    <div className="space-y-1">
                      {logs.map((log, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Holographic Magnetic Action Button */}
                <MagneticSubmitButton 
                  disabled={submitting}
                  className={`w-full py-5 text-white shadow-xl ${
                    isCardHovered 
                      ? 'bg-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400' 
                      : 'bg-primary hover:bg-secondary hover:text-primary'
                  }`}
                  laserColor="rgba(99, 102, 241, 0.45)"
                >
                  <span>System Login</span> 
                  <LogIn size={14} className="group-hover/btn:translate-x-1.5 transition-transform text-orange-400 shrink-0" />
                </MagneticSubmitButton>

              </form>

              <div className="mt-10 pt-8 border-t border-slate-50/10 text-center select-none" style={{ transform: "translateZ(10px)" }}>
                <p className={`text-xs font-bold ${isCardHovered ? 'text-slate-500' : 'text-slate-400'}`}>
                  New Student? <button type="button" onClick={(e) => { e.preventDefault(); setView('register'); }} className="text-secondary uppercase tracking-widest hover:underline ml-1 cursor-pointer bg-transparent border-none outline-none">Register Here</button>
                </p>
              </div>
            </motion.div>
          )}

          {view === 'forgot' && (
            <motion.div
              key="forgot-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {!isRecovered ? (
                <form onSubmit={!otpSent ? handleRequestOTP : handleVerifyOTP} className="space-y-6" style={{ transform: "translateZ(15px)" }}>
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-black uppercase tracking-wider mb-1">
                      {!otpSent ? "[Credentials Recovery]" : "[OTP Verification]"}
                    </h3>
                    <p className={`text-[10px] font-semibold ${isCardHovered ? 'text-slate-400' : 'text-slate-500'}`}>
                      {!otpSent 
                        ? "Enter registered phone number to verify identity."
                        : "Enter 6-digit verification code sent to your phone."
                      }
                    </p>
                  </div>

                  {!otpSent ? (
                    <div className="space-y-2 relative group/input">
                      <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                        isCardHovered ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <User size={10} />
                        <span>[Registered Phone]</span>
                      </label>
                      <input 
                        type="tel" 
                        value={recoveryPhone}
                        onChange={(e) => setRecoveryPhone(e.target.value)}
                        disabled={submitting}
                        required
                        placeholder="+91 98765 43210" 
                        className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border focus:bg-white focus:text-black ${
                          isCardHovered 
                            ? 'bg-slate-900/60 border-slate-700/50 text-white focus:border-indigo-400' 
                            : 'bg-slate-50 border-transparent text-primary focus:border-secondary'
                        }`} 
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 relative group/input">
                      <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                        isCardHovered ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <Lock size={10} />
                        <span>[Verification Code]</span>
                      </label>
                      <input 
                        type="text" 
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        disabled={submitting}
                        required
                        maxLength={6}
                        placeholder="123456" 
                        className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border text-center tracking-[0.4em] focus:bg-white focus:text-black ${
                          isCardHovered 
                            ? 'bg-slate-900/60 border-slate-700/50 text-white focus:border-indigo-400' 
                            : 'bg-slate-50 border-transparent text-primary focus:border-secondary'
                        }`} 
                      />
                      {otpTimer > 0 ? (
                        <div className="text-right px-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Resend in {otpTimer}s
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode("");
                          }}
                          className="w-full text-right px-2 text-[9px] font-black text-secondary uppercase tracking-widest hover:underline cursor-pointer bg-transparent border-none outline-none"
                        >
                          Request New OTP
                        </button>
                      )}
                    </div>
                  )}

                  {submitting && (
                    <div className="w-full bg-slate-950 rounded-2xl border border-white/5 p-4 text-left font-mono text-[7px] text-emerald-400 leading-relaxed shadow-inner overflow-hidden h-24 flex flex-col justify-end">
                      <div className="space-y-1">
                        {logs.map((log, idx) => (
                          <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                            {log}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <MagneticSubmitButton 
                    disabled={submitting}
                    className={`w-full py-5 text-white shadow-xl ${
                      isCardHovered 
                        ? 'bg-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400' 
                        : 'bg-primary hover:bg-secondary hover:text-primary'
                    }`}
                  >
                    <span>{!otpSent ? "Request OTP" : "Verify Token"}</span>
                  </MagneticSubmitButton>
                </form>
              ) : (
                <div className="space-y-6 text-center select-none" style={{ transform: "translateZ(15px)" }}>
                  <div className="relative mb-6 w-16 h-16 flex items-center justify-center mx-auto">
                    <div className="absolute inset-[-4px] border border-dashed border-emerald-450 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 z-10">
                      <ShieldCheck size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-wider mb-2">[Access Restored]</h3>
                  <p className={`text-xs font-semibold max-w-xs mx-auto mb-6 ${isCardHovered ? 'text-slate-400' : 'text-slate-500'}`}>
                    Identity confirmed. Your secure credentials have been decrypted.
                  </p>

                  <div className="space-y-4 text-left">
                    <div className={`p-4 rounded-xl border flex justify-between items-center ${
                      isCardHovered ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Enrollment ID</div>
                        <div className="text-sm font-black tracking-tight">{recoveredEnrollment}</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleCopy(recoveredEnrollment, 'enrollment')}
                        className="btn-primary py-2 px-4 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                      >
                        {copiedText === 'enrollment' ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    <div className={`p-4 rounded-xl border flex justify-between items-center ${
                      isCardHovered ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Access Code</div>
                        <div className="text-sm font-black tracking-tight">{recoveredCode}</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleCopy(recoveredCode, 'code')}
                        className="btn-primary py-2 px-4 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                      >
                        {copiedText === 'code' ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      setEnrollmentId(recoveredEnrollment);
                      setAccessCode(recoveredCode);
                      setView('login');
                      setIsRecovered(false);
                      setOtpSent(false);
                      setOtpCode("");
                      setRecoveryPhone("");
                    }}
                    className="w-full py-5 text-white shadow-xl bg-slate-900 hover:bg-slate-800 rounded-2xl font-black uppercase tracking-wider text-xs cursor-pointer"
                  >
                    Load Credentials & Login
                  </button>
                </div>
              )}

              <div className="text-center pt-4 border-t border-slate-50/10 select-none">
                <button 
                  type="button" 
                  onClick={() => {
                    setView('login');
                    setIsRecovered(false);
                    setOtpSent(false);
                    setOtpCode("");
                    setRecoveryPhone("");
                  }}
                  className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline cursor-pointer bg-transparent border-none outline-none"
                >
                  Return to Login
                </button>
              </div>
            </motion.div>
          )}

          {view === 'register' && (
            <motion.div
              key="register-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {!regSuccess ? (
                <form onSubmit={handleRegister} className="space-y-6" style={{ transform: "translateZ(15px)" }}>
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-black uppercase tracking-wider mb-1">[Profile Registry]</h3>
                    <p className={`text-[10px] font-semibold ${isCardHovered ? 'text-slate-400' : 'text-slate-500'}`}>
                      Register below to compile and authorize portal access.
                    </p>
                  </div>

                  <div className="space-y-2 relative group/input">
                    <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                      isCardHovered ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <User size={10} />
                      <span>[Student Full Name]</span>
                    </label>
                    <input 
                      type="text" 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      disabled={submitting}
                      required
                      placeholder="John Doe" 
                      className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border focus:bg-white focus:text-black ${
                        isCardHovered 
                          ? 'bg-slate-900/60 border-slate-700/50 text-white focus:border-indigo-400' 
                          : 'bg-slate-50 border-transparent text-primary focus:border-secondary'
                      }`} 
                    />
                  </div>

                  <div className="space-y-2 relative group/input">
                    <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                      isCardHovered ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <User size={10} />
                      <span>[Mobile Number]</span>
                    </label>
                    <input 
                      type="tel" 
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      disabled={submitting}
                      required
                      placeholder="+91 98765 43210" 
                      className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border focus:bg-white focus:text-black ${
                        isCardHovered 
                          ? 'bg-slate-900/60 border-slate-700/50 text-white focus:border-indigo-400' 
                          : 'bg-slate-50 border-transparent text-primary focus:border-secondary'
                      }`} 
                    />
                  </div>

                  <div className="space-y-2 relative group/input">
                    <label className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ml-4 transition-colors duration-300 ${
                      isCardHovered ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <Cpu size={10} />
                      <span>[Academic Program]</span>
                    </label>
                    <select
                      value={regCourse}
                      onChange={(e) => setRegCourse(e.target.value)}
                      disabled={submitting}
                      className={`w-full px-8 py-5 rounded-2xl outline-none transition-all font-bold text-sm border appearance-none cursor-pointer ${
                        isCardHovered 
                          ? 'bg-slate-900/60 border-slate-700/50 text-white focus:bg-slate-900 focus:border-indigo-400' 
                          : 'bg-slate-50 border-transparent text-primary focus:bg-white focus:border-secondary'
                      }`}
                    >
                      <option className={isCardHovered ? "bg-slate-950 text-white" : ""}>JEE Preparation</option>
                      <option className={isCardHovered ? "bg-slate-950 text-white" : ""}>NEET Preparation</option>
                      <option className={isCardHovered ? "bg-slate-950 text-white" : ""}>Foundation (8th-10th)</option>
                    </select>
                  </div>

                  {submitting && (
                    <div className="w-full bg-slate-950 rounded-2xl border border-white/5 p-4 text-left font-mono text-[7px] text-emerald-400 leading-relaxed shadow-inner overflow-hidden h-24 flex flex-col justify-end">
                      <div className="space-y-1">
                        {logs.map((log, idx) => (
                          <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                            {log}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <MagneticSubmitButton 
                    disabled={submitting}
                    className={`w-full py-5 text-white shadow-xl ${
                      isCardHovered 
                        ? 'bg-indigo-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400' 
                        : 'bg-primary hover:bg-secondary hover:text-primary'
                    }`}
                  >
                    <span>Generate Credentials</span>
                  </MagneticSubmitButton>
                </form>
              ) : (
                <div className="space-y-6 text-center select-none" style={{ transform: "translateZ(15px)" }}>
                  <div className="relative mb-6 w-16 h-16 flex items-center justify-center mx-auto">
                    <div className="absolute inset-[-4px] border border-dashed border-emerald-450 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 z-10">
                      <ShieldCheck size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-wider mb-2">[Profile Registered]</h3>
                  <p className={`text-xs font-semibold max-w-xs mx-auto mb-6 ${isCardHovered ? 'text-slate-400' : 'text-slate-500'}`}>
                    Welcome, **{regName}**! Your access keys for **{regCourse}** are ready.
                  </p>

                  <div className="space-y-4 text-left">
                    <div className={`p-4 rounded-xl border flex justify-between items-center ${
                      isCardHovered ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Enrollment ID</div>
                        <div className="text-sm font-black tracking-tight">{generatedEnrollment}</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleCopy(generatedEnrollment, 'genEnrollment')}
                        className="btn-primary py-2 px-4 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                      >
                        {copiedText === 'genEnrollment' ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    <div className={`p-4 rounded-xl border flex justify-between items-center ${
                      isCardHovered ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Access Code</div>
                        <div className="text-sm font-black tracking-tight">{generatedCode}</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleCopy(generatedCode, 'genCode')}
                        className="btn-primary py-2 px-4 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                      >
                        {copiedText === 'genCode' ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      setEnrollmentId(generatedEnrollment);
                      setAccessCode(generatedCode);
                      setView('login');
                      setRegSuccess(false);
                      setRegName("");
                      setRegPhone("");
                    }}
                    className="w-full py-5 text-white shadow-xl bg-slate-900 hover:bg-slate-800 rounded-2xl font-black uppercase tracking-wider text-xs cursor-pointer"
                  >
                    Load Credentials & Login
                  </button>
                </div>
              )}

              <div className="text-center pt-4 border-t border-slate-50/10 select-none">
                <button 
                  type="button" 
                  onClick={() => {
                    setView('login');
                    setRegSuccess(false);
                    setRegName("");
                    setRegPhone("");
                  }}
                  className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline cursor-pointer bg-transparent border-none outline-none"
                >
                  Return to Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical monospaced card indicators */}
        <span className="absolute bottom-4 right-6 font-mono text-[5px] text-slate-500 select-none">
          [SECURE_NODE_LOGIN // AUTH: COMPLIANCE_OK]
        </span>
      </motion.div>
    </div>
  );
};
