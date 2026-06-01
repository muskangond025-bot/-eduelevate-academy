import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, ArrowLeft, Cpu, Activity, Sparkles, Navigation, Terminal } from 'lucide-react';
import { PrivacyPolicy } from '../components/policies/PrivacyPolicy';
import { TermsAndConditions } from '../components/policies/TermsAndConditions';
import { RefundPolicy } from '../components/policies/RefundPolicy';
import legalHeroImage from '../assets/legal_hero.png';

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
const MagneticBackButton = ({
  children,
  to,
  className,
  laserColor = "rgba(99, 102, 241, 0.4)"
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
  laserColor?: string;
}) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
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
    <Link
      ref={btnRef}
      to={to}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transform: "translate3d(" + position.x + "px, " + position.y + "px, 0)", transformStyle: "preserve-3d" }}
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
    </Link>
  );
};

const MagneticActionButton = ({
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

const FrostedPolicyWrapper = ({
  children,
  id,
  index
}: {
  children: React.ReactNode;
  id: string;
  index: number;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-12 md:p-16 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl ${
        isHovered
          ? 'scale-[1.01] bg-white border-indigo-500/30 shadow-[0_20px_50px_rgba(99,102,241,0.06)]'
          : 'bg-white/40 border-slate-200/50 shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 3.5}deg) rotateY(${tilt.x * 3.5}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep highlight trailing cursor inside card */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks Trail */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

      <div style={{ transform: "translateZ(15px)" }}>
        {children}
      </div>


    </motion.div>
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
    <span className="flex flex-wrap gap-x-[0.02em] overflow-visible">
      {letters.map((char, charIdx) => {
        const letterRef = useRef<HTMLSpanElement>(null);
        const [letterOffset, setLetterOffset] = useState({ x: 0, y: 0, scale: 1, skew: 0, rotate: 0 });
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
              skew: pullFactor * -15,
              rotate: (dx / distance) * pullFactor * 15
            });
            setIsHovered(true);
          } else {
            setLetterOffset({ x: 0, y: 0, scale: 1, skew: 0, rotate: 0 });
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
              rotateZ: letterOffset.rotate,
              color: 'inherit',
              textShadow: 'none'
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

const CoordinatesCompassWidget = ({ mouseCoords }: { mouseCoords: { x: number; y: number } }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: (x - centerX) / centerX * 15,
      y: (y - centerY) / centerY * 15
    });
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className="relative w-72 h-72 hidden lg:flex items-center justify-center shrink-0"
      style={{
        transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div 
        className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl transition-opacity duration-500" 
        style={{ opacity: isHovered ? 1 : 0.4 }} 
      />

      <svg width="240" height="240" viewBox="0 0 240 240" className="relative z-10 select-none pointer-events-none">
        <defs>
          <radialGradient id="sweep-gradient" cx="120" cy="120" r="100" fx="120" fy="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
            <stop offset="90%" stopColor="rgba(6, 182, 212, 0.12)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.35)" />
          </radialGradient>
        </defs>

        {/* Rotating sweep sector */}
        <motion.path
          d="M 120,120 L 120,20 A 100,100 0 0,1 190,48 Z"
          fill="url(#sweep-gradient)"
          style={{ transformOrigin: '120px 120px' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />

        {/* Expanding pulse rings */}
        <motion.circle
          cx="120"
          cy="120"
          r="20"
          fill="none"
          stroke="rgba(6, 182, 212, 0.3)"
          strokeWidth="1"
          animate={{ r: [20, 100], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
        />
        <motion.circle
          cx="120"
          cy="120"
          r="20"
          fill="none"
          stroke="rgba(99, 102, 241, 0.3)"
          strokeWidth="1"
          animate={{ r: [20, 100], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 1.5 }}
        />

        <motion.circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="rgba(99, 102, 241, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />

        <motion.circle
          cx="120"
          cy="120"
          r="80"
          fill="none"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        />

        <line x1="20" y1="120" x2="220" y2="120" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="120" y1="20" x2="120" y2="220" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1" strokeDasharray="2 2" />

        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" />
        <circle cx="120" cy="120" r="20" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="0.5" />

        <motion.circle
          cx="120"
          cy="40"
          r="4"
          fill="#6366f1"
          style={{ transformOrigin: '120px 120px' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        <motion.circle
          cx="120"
          cy="70"
          r="3"
          fill="#06b6d4"
          style={{ transformOrigin: '120px 120px' }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />

        <circle cx="120" cy="120" r="6" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2" />

        <text x="120" y="32" fontSize="6" fontFamily="monospace" fill="rgba(99, 102, 241, 0.5)" textAnchor="middle">00°N</text>
        <text x="210" y="122" fontSize="6" fontFamily="monospace" fill="rgba(99, 102, 241, 0.5)" textAnchor="start">90°E</text>
        <text x="120" y="215" fontSize="6" fontFamily="monospace" fill="rgba(99, 102, 241, 0.5)" textAnchor="middle">180°S</text>
        <text x="30" y="122" fontSize="6" fontFamily="monospace" fill="rgba(99, 102, 241, 0.5)" textAnchor="end">270°W</text>
      </svg>


    </div>
  );
};

const MagneticBadge = ({ 
  children, 
  className,
  globalMouse,
  onHoverStateChange
}: { 
  children: React.ReactNode; 
  className?: string;
  globalMouse: { x: number; y: number };
  onHoverStateChange?: (hovered: boolean) => void;
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = globalMouse.x - centerX;
    const dy = globalMouse.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      const pullFactor = (100 - distance) / 100;
      setPosition({
        x: dx * pullFactor * 0.25,
        y: dy * pullFactor * 0.25
      });
      if (!isHovered) {
        setIsHovered(true);
        onHoverStateChange?.(true);
      }
    } else {
      setPosition({ x: 0, y: 0 });
      if (isHovered) {
        setIsHovered(false);
        onHoverStateChange?.(false);
      }
    }
  }, [globalMouse]);

  return (
    <motion.div
      ref={badgeRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStateChange?.(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverStateChange?.(false);
      }}
      className={`relative inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-500/40 px-5 py-2.5 rounded-full text-white font-black text-[9px] uppercase tracking-widest cursor-pointer shadow-[0_4px_20px_rgba(99, 102, 241, 0.15)] select-none hover:shadow-[0_0_25px_rgba(99, 102, 241, 0.35)] hover:border-indigo-400/60 transition-all duration-300 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-indigo-400/30 pointer-events-none scale-105 animate-spin" style={{ animationDuration: '12s' }} />

      <div className="w-6 h-6 rounded-full border border-indigo-450/45 bg-indigo-500/10 relative flex items-center justify-center shrink-0">
        <div className="absolute -inset-0.5 border border-dashed border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
        <ShieldCheck size={13} className="text-cyan-400 animate-pulse" strokeWidth={2} />
      </div>
      <span className="relative z-10 flex items-center gap-2" style={{ transform: "translateZ(8px)" }}>
        {children}
      </span>
    </motion.div>
  );
};

const MagneticBackButtonExtended = ({
  to,
  className,
  globalMouse,
  onHoverStateChange
}: {
  to: string;
  className?: string;
  globalMouse: { x: number; y: number };
  onHoverStateChange?: (hovered: boolean) => void;
}) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = globalMouse.x - centerX;
    const dy = globalMouse.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
      const pullFactor = (120 - distance) / 120;
      setPosition({
        x: dx * pullFactor * 0.3,
        y: dy * pullFactor * 0.3
      });
      if (!isHovered) {
        setIsHovered(true);
        onHoverStateChange?.(true);
      }
    } else {
      setPosition({ x: 0, y: 0 });
      if (isHovered) {
        setIsHovered(false);
        onHoverStateChange?.(false);
      }
    }
  }, [globalMouse]);

  return (
    <Link
      ref={btnRef}
      to={to}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStateChange?.(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverStateChange?.(false);
      }}
      className={`relative inline-flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-indigo-650 uppercase tracking-widest select-none ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transformStyle: 'preserve-3d',
        transition: 'color 0.25s'
      }}
    >
      <div className="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm relative shrink-0">
        <div 
          className="absolute inset-[-4px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none transition-colors" 
          style={{ 
            animationDuration: '8s',
            borderColor: isHovered ? 'rgba(99, 102, 241, 0.4)' : ''
          }} 
        />
        {isHovered && (
          <div 
            className="absolute inset-[-8px] border border-dotted border-cyan-400 rounded-full animate-spin pointer-events-none" 
            style={{ 
              animationDuration: '4s',
              animationDirection: 'reverse'
            }} 
          />
        )}
        <ArrowLeft size={16} className={`transition-transform relative z-10 ${isHovered ? '-translate-x-1' : ''}`} />
      </div>
      <span className="relative z-10" style={{ transform: 'translateZ(5px)' }}>
        Back to Home
      </span>
    </Link>
  );
};

export const PoliciesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [ctaCoords, setCtaCoords] = useState({ x: 0, y: 0 });
  const [ctaTilt, setCtaTilt] = useState({ x: 0, y: 0 });
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });
  const [activeHoverComponent, setActiveHoverComponent] = useState<'title' | 'badge' | 'back' | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  const [artworkCoords, setArtworkCoords] = useState({ x: 0, y: 0 });
  const [artworkTilt, setArtworkTilt] = useState({ x: 0, y: 0 });
  const [isArtworkHovered, setIsArtworkHovered] = useState(false);
  const artworkCardRef = useRef<HTMLDivElement>(null);

  const handleArtworkMouseMove = (e: React.MouseEvent) => {
    if (!artworkCardRef.current) return;
    const rect = artworkCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setArtworkCoords({ x, y });
    setArtworkTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsArtworkHovered(true);
  };

  const handleArtworkMouseLeave = () => {
    setArtworkTilt({ x: 0, y: 0 });
    setIsArtworkHovered(false);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setGlobalMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, []);

  // Pre-load simulator
  useEffect(() => {
    const logs = [
      "BOOTSTRAP: INITIALIZING POLICY_SUITE...",
      "INTEGRITY CHECK: PRIVACY, TERMS & REFUND MODULES LOADED",
      "CALIBRATION: LEGAL DATA MASK SECURE",
      "spring COMPOSERS: CONNECTING KINETIC SCROLL_DOCK...",
      "LAUNCH: RENDERING COMPLIANCE CONSOLE"
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setLoadingLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${logs[logIndex]}`]);
        logIndex++;
      }
    }, 200);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(logInterval);
      clearInterval(progressInterval);
    }, 1400);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleCtaMouseMove = (e: React.MouseEvent) => {
    if (!ctaCardRef.current) return;
    const rect = ctaCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setCtaCoords({ x, y });
    setCtaTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsCtaHovered(true);
  };

  const handleCtaMouseLeave = () => {
    setCtaTilt({ x: 0, y: 0 });
    setIsCtaHovered(false);
  };

  const policiesList = [
    { label: 'Privacy Policy', targetId: 'privacy-policy' },
    { label: 'Terms & Conditions', targetId: 'terms-and-conditions' },
    { label: 'Refund Policy', targetId: 'refund-policy' }
  ];

  return (
    <div className="bg-[#FAF9F6] relative overflow-hidden select-none min-h-screen">
      
      {/* Entrance Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%",
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[120] bg-[#FAF9F6] flex flex-col items-center justify-center p-8 overflow-hidden select-none"
          >
            {/* Dotted grid backdrop */}
            <div
              className="absolute inset-0 opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative max-w-2xl w-full flex flex-col items-center text-center z-10">
              {/* Spinning target loader HUD */}
              <div className="relative w-28 h-28 flex items-center justify-center mb-12 shrink-0">
                <div className="absolute inset-[-6px] border border-dashed border-indigo-400/45 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                <div className="absolute inset-[-14px] border border-dotted border-cyan-400/35 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                
                {/* Active LED status dot */}
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-20">
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                </span>

                <motion.div
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/15 border border-indigo-400/45 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(99,102,241,0.25)] relative z-10 backdrop-blur-md"
                >
                  <ShieldCheck size={28} className="animate-pulse" />
                </motion.div>
              </div>

              {/* Title Header */}
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase mb-2">
                Legal Console
              </h2>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-10">
                [SYSTEM_BOOT: DEPLOYING POLICIES_SUITE]
              </p>

              {/* Progress Count Ticker */}
              <div className="font-mono text-3xl font-black text-indigo-600 mb-6">
                {Math.min(loadingProgress, 100)}%
              </div>

              {/* Progress Bar Track */}
              <div className="w-64 h-1.5 bg-slate-200/60 rounded-full overflow-hidden mb-8 border border-slate-300/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Terminal Logs Disclosures */}
              <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-white/5 p-5 text-left font-mono text-[8px] text-emerald-400/90 leading-relaxed shadow-lg overflow-hidden h-28 flex flex-col justify-end">
                <div className="space-y-1 overflow-y-auto">
                  {loadingLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="truncate"
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span>STATUS: {loadingProgress >= 100 ? "LOCKED // SUCCESS" : "COMPILING..."}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button with Magnetic springs orbits */}
      <div className={`absolute top-8 left-8 z-50 transition-all duration-300 ${
        activeHoverComponent && activeHoverComponent !== 'back' ? 'opacity-40 blur-[1px]' : 'opacity-100'
      }`}>
        <MagneticBackButtonExtended 
          to="/" 
          globalMouse={globalMouse} 
          onHoverStateChange={(hovered) => setActiveHoverComponent(hovered ? 'back' : null)} 
        />
      </div>

      {/* Editorial Header */}
      <section
        ref={sectionRef}
        onMouseMove={handleSectionMouseMove}
        onMouseLeave={() => setIsSectionHovered(false)}
        className="pt-28 pb-24 bg-[#FAF9F6] border-b border-slate-200/50 relative overflow-hidden"
      >
        {/* Light blueprint coordinates canvas backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

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
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(250, 249, 246, 0.05) 50%, transparent 100%)'
          }}
        />

        {/* Spark Particle Trails */}
        <SparkParticlesTrail coords={sectionCoords} colorClass="bg-indigo-500" />

        {/* Layout lines guidelines */}
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            
            <div className="flex-1 max-w-3xl overflow-visible">
              {/* Title Header with staggered kinetic character wave skew hover */}
              <div className="transition-all duration-300 overflow-visible relative">
                {/* Background ambient text glow orb */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />

                <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.85] mb-12 flex flex-col gap-2 overflow-visible relative z-10">
                  <div 
                    onMouseEnter={() => setActiveHoverComponent('title')}
                    onMouseLeave={() => setActiveHoverComponent(null)}
                    className="overflow-visible"
                  >
                    <KineticWord 
                      word="TRUST" 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f2c73] via-indigo-800 to-indigo-950 font-black italic tracking-tighter"
                      delayOffset={0.1}
                      mouseCoords={globalMouse}
                    />
                  </div>
                  <div 
                    onMouseEnter={() => setActiveHoverComponent('title')}
                    onMouseLeave={() => setActiveHoverComponent(null)}
                    className="overflow-visible mt-2"
                  >
                    <KineticWord 
                      word="ARCHITECTURE." 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 font-black tracking-tighter"
                      delayOffset={0.25}
                      mouseCoords={globalMouse}
                    />
                  </div>
                </h1>
              </div>

              {/* Subtitle details */}
              <p className={`max-w-2xl text-slate-500 font-semibold leading-relaxed text-sm md:text-base px-4 mb-14 transition-all duration-300 ${
                activeHoverComponent && activeHoverComponent !== 'title' ? 'opacity-40 blur-[1px]' : 'opacity-100'
              }`}>
                We believe in absolute transparency. Explore our standardized legal frameworks designed to protect your data, define our service boundaries, and ensure fair treatment.
              </p>

              {/* Interactive Index Navigation HUD Dock */}
              <div className={`flex flex-wrap gap-8 select-none transition-all duration-300 ${
                activeHoverComponent && activeHoverComponent !== 'title' ? 'opacity-40 blur-[1px]' : 'opacity-100'
              }`}>
                {policiesList.map((item, idx) => (
                  <button 
                    key={item.label} 
                    onClick={() => {
                      const target = document.getElementById(item.targetId);
                      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-indigo-650 uppercase tracking-widest transition-colors group z-20 focus:outline-none"
                  >
                    <span>{item.label}</span> 
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform text-indigo-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Premium 3D Glass Cyber Bezel Artwork */}
            <div className="flex-1 w-full max-w-lg hidden lg:block overflow-visible">
              <motion.div
                ref={artworkCardRef}
                onMouseMove={handleArtworkMouseMove}
                onMouseLeave={handleArtworkMouseLeave}
                className="relative rounded-[3.5rem] border border-slate-200/50 p-6 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden group select-none cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateX(${-artworkTilt.y * 3}deg) rotateY(${artworkTilt.x * 3}deg) scale3d(${isArtworkHovered ? 1.015 : 1}, ${isArtworkHovered ? 1.015 : 1}, 1)`,
                  transformStyle: "preserve-3d",
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Border laser sweep highlight trailing cursor */}
                <div
                  className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                  style={{
                    background: `radial-gradient(150px circle at ${artworkCoords.x}px ${artworkCoords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
                    padding: '1.2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />

                {/* Cyber bezel inner frame */}
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-900/90 bg-slate-950 aspect-[4/3] shadow-inner" style={{ transform: "translateZ(15px)" }}>
                  
                  {/* Neon laser scan sweep */}
                  <motion.div
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none z-10"
                  />

                  {/* Diagonal shimmering glass sweep */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />

                  {/* The generated high-tech artwork */}
                  <img 
                    src={legalHeroImage} 
                    alt="Trust Architecture Core" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />

                  {/* Faint coordinates grid overlays */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                </div>

                {/* Technical monospaced card descriptor */}
                <div className="mt-5 flex items-center justify-between px-3 select-none" style={{ transform: "translateZ(10px)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse relative">
                      <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    </span>
                    <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest">[NODE: SECURE_CORE]</span>
                  </div>
                  <span className="font-mono text-[7px] text-indigo-650 font-bold uppercase tracking-widest">[SYNC_OK // REF: LEG_01]</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Modular Policy Sections wrapped in Frosted Glassmorphic Cards */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            <FrostedPolicyWrapper id="privacy-policy" index={0}>
              <PrivacyPolicy />
            </FrostedPolicyWrapper>

            <FrostedPolicyWrapper id="terms-and-conditions" index={1}>
              <TermsAndConditions />
            </FrostedPolicyWrapper>

            <FrostedPolicyWrapper id="refund-policy" index={2}>
              <RefundPolicy />
            </FrostedPolicyWrapper>
          </div>
        </div>
      </section>

      {/* Premium Bezel Support Banner (Footer Support CTA) */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            ref={ctaCardRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="p-16 md:p-24 rounded-[4rem] border transition-all duration-500 overflow-hidden bg-[#060813] border-white/10 shadow-2xl flex flex-col items-center text-center select-none"
            style={{
              transform: `perspective(1000px) rotateX(${-ctaTilt.y * 3.5}deg) rotateY(${ctaTilt.x * 3.5}deg) scale3d(${isCtaHovered ? 1.015 : 1}, ${isCtaHovered ? 1.015 : 1}, 1)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Border laser sweep highlight trailing cursor inside card */}
            <div
              className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(150px circle at ${ctaCoords.x}px ${ctaCoords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
                padding: '1.2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Sparks Trail */}
            <SparkParticlesTrail coords={ctaCoords} colorClass="bg-indigo-400" />

            <div className="relative z-10 max-w-xl w-full flex flex-col items-center">
                         {/* Visual HUD Orbit Badge */}
              <div className="relative mb-8 w-16 h-16 flex items-center justify-center shrink-0" style={{ transform: "translateZ(20px)" }}>
                <div className="absolute inset-[-6px] border border-dashed border-indigo-400/45 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-[-12px] border border-dotted border-cyan-400/35 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                
                {/* Active LED status dot */}
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-20">
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                </span>

                <motion.div 
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/15 border border-indigo-400/45 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.35)] relative z-10"
                >
                  <ShieldCheck size={22} className="animate-pulse" />
                </motion.div>
              </div>

              {/* Title Header with word reveals */}
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-6" style={{ transform: "translateZ(30px)" }}>
                Need Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 italic font-black">Assistance?</span>
              </h3>
              
              {/* Subtext description paragraph */}
              <p className="text-slate-300 font-semibold leading-relaxed mb-12 text-sm md:text-base" style={{ transform: "translateZ(15px)" }}>
                Our dedicated compliance officers are available to clarify any clause or manage data-related queries.
              </p>

              {/* Magnetic Action CTA button */}
              <MagneticActionButton
                onClick={() => navigate('/counseling/call')}
                className="px-12 py-6 bg-white text-[#060813] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 hover:text-white cursor-pointer"
                laserColor="rgba(99, 102, 241, 0.4)"
              >
                <span>Speak to Compliance Officer</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform shrink-0" />
              </MagneticActionButton>

            </div>

            {/* Technical indicators inside card */}
            <span className="absolute bottom-4 right-6 font-mono text-[7px] text-slate-500 select-none">
              [COMPLIANCE_CELL_SYNC: CONNECTED // REF: LEG_TRUST_01]
            </span>
          </motion.div>

        </div>
      </section>

    </div>
  );
};
