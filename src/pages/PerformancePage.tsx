import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PerformanceHero } from '../components/performance/PerformanceHero';
import { StudentDashboardPreview } from '../components/performance/StudentDashboardPreview';
import { DataVisualization } from '../components/performance/DataVisualization';
import { AnalyticsFeaturesExtended } from '../components/performance/AnalyticsFeaturesExtended';
import { SampleReports } from '../components/performance/SampleReports';
import { ParentMonitoring } from '../components/performance/ParentMonitoring';

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

const MagneticButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Magnetic pull coordinates calculation
    setPosition({
      x: (x - centerX) * 0.35,
      y: (y - centerY) * 0.35
    });
    setBtnCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block select-none group/btn">
      {/* Target dashboard radar rings surrounding button */}
      <div className="absolute -inset-10 border border-dashed border-indigo-500/10 rounded-full pointer-events-none opacity-0 group-hover/btn:opacity-100 group-hover/btn:scale-105 transition-all duration-500 animate-spin" style={{ animationDuration: '10s' }} />
      <div className="absolute -inset-6 border border-dashed border-indigo-500/20 rounded-full pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-all duration-500" />
      
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="px-14 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.3em] rounded-2xl relative overflow-hidden shadow-xl shadow-indigo-500/10 border border-indigo-500 cursor-pointer"
      >
        {/* Glow cursor sweep light */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(100px circle at ${btnCoords.x}px ${btnCoords.y}px, rgba(255,255,255,0.25), transparent 80%)`
          }}
        />
        
        <span className="relative z-10 flex items-center gap-2 justify-center">
          {children} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </span>
      </motion.button>
    </div>
  );
};

export const PerformancePage = () => {
  const navigate = useNavigate();
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [consoleCoords, setConsoleCoords] = useState({ x: 0, y: 0 });
  const [consoleTilt, setConsoleTilt] = useState({ x: 0, y: 0 });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleConsoleMouseMove = (e: React.MouseEvent) => {
    if (!consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setConsoleCoords({ x, y });
    setConsoleTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
  };

  const handleConsoleMouseLeave = () => {
    setConsoleTilt({ x: 0, y: 0 });
  };

  // Grid coordinates warp mathematical parameters
  const gridCols = 13;
  const gridRows = 7;
  const warpStrength = 18;
  const warpRadius = 140;

  // Render gravity warp coordinates grid vertices path elements
  const renderWarpGrid = () => {
    if (!sectionRef.current) return null;
    const rect = sectionRef.current.getBoundingClientRect();
    const w = rect.width || 1200;
    const h = rect.height || 500;

    const colStep = w / (gridCols - 1);
    const rowStep = h / (gridRows - 1);

    // Compute warped positions for all intersections
    const pts: { x: number; y: number }[][] = [];
    for (let r = 0; r < gridRows; r++) {
      pts[r] = [];
      for (let c = 0; c < gridCols; c++) {
        const bx = c * colStep;
        const by = r * rowStep;

        if (isSectionHovered) {
          const dx = sectionCoords.x - bx;
          const dy = sectionCoords.y - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < warpRadius) {
            const factor = (1 - dist / warpRadius) * warpStrength;
            pts[r].push({
              x: bx - (dx / (dist || 1)) * factor,
              y: by - (dy / (dist || 1)) * factor
            });
            continue;
          }
        }
        pts[r].push({ x: bx, y: by });
      }
    }

    // Generate path lines
    const paths: React.ReactNode[] = [];

    // Horizontal lines
    for (let r = 0; r < gridRows; r++) {
      let d = `M ${pts[r][0].x} ${pts[r][0].y}`;
      for (let c = 1; c < gridCols; c++) {
        d += ` L ${pts[r][c].x} ${pts[r][c].y}`;
      }
      paths.push(
        <path
          key={`h-${r}`}
          d={d}
          fill="none"
          stroke="rgba(79, 70, 229, 0.08)"
          strokeWidth="1"
        />
      );
    }

    // Vertical lines
    for (let c = 0; c < gridCols; c++) {
      let d = `M ${pts[0][c].x} ${pts[0][c].y}`;
      for (let r = 1; r < gridRows; r++) {
        d += ` L ${pts[r][c].x} ${pts[r][c].y}`;
      }
      paths.push(
        <path
          key={`v-${c}`}
          d={d}
          fill="none"
          stroke="rgba(79, 70, 229, 0.08)"
          strokeWidth="1"
        />
      );
    }

    return paths;
  };

  return (
    <div className="bg-white min-h-screen">
      <PerformanceHero />
      <StudentDashboardPreview />
      <DataVisualization />
      <AnalyticsFeaturesExtended />
      <SampleReports />
      <ParentMonitoring />
      
      {/* Re-engineered Performance Audit CTA Section in Light Theme */}
      <section
        id="audit-section"
        ref={sectionRef}
        onMouseMove={handleSectionMouseMove}
        onMouseLeave={() => setIsSectionHovered(false)}
        className="pt-12 pb-24 bg-[#FAF9F6] overflow-hidden relative text-primary border-t border-slate-200/60"
      >
        {/* Light Dotted Matrix Grid Backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Iridescent Gravity Warp Canvas Grid Backdrop */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          {renderWarpGrid()}
        </svg>

        {/* Dynamic spot coordinates highlight */}
        <div
          className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full"
          style={{
            opacity: isSectionHovered ? 0.35 : 0,
            left: `${sectionCoords.x}px`,
            top: `${sectionCoords.y}px`,
            width: '500px',
            height: '500px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)',
            zIndex: 1
          }}
        />

        {/* Guidelines overlay */}
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={consoleRef}
            onMouseMove={handleConsoleMouseMove}
            onMouseLeave={handleConsoleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 border border-slate-200/50 rounded-[3.5rem] p-12 max-w-4xl mx-auto text-center relative overflow-hidden backdrop-blur-xl group/hull shadow-lg shadow-indigo-950/5"
            style={{
              transform: `perspective(1000px) rotateX(${-consoleTilt.y * 4}deg) rotateY(${consoleTilt.x * 4}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Custom spotlight glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
              style={{
                opacity: isSectionHovered ? 1 : 0,
                background: `radial-gradient(150px circle at ${consoleCoords.x}px ${consoleCoords.y}px, rgba(99, 102, 241, 0.03), transparent 80%)`,
              }}
            />

            {/* Razor-thin laser sweep */}
            <div
              className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover/hull:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(130px circle at ${consoleCoords.x}px ${consoleCoords.y}px, rgba(99, 102, 241, 0.45), transparent 80%)`,
                padding: '1px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Sparks Trail */}
            <SparkParticlesTrail coords={consoleCoords} colorClass="bg-indigo-500" />

            <div className="relative z-10 flex flex-col items-center justify-between" style={{ transform: 'translateZ(25px)' }}>

              {/* Title & Subtitle reveals */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6 uppercase tracking-tighter leading-none select-none">
                Ready for a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-650 italic font-black">
                  Performance
                </span>{' '}
                Audit?
              </h2>
              
              <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-semibold leading-relaxed mb-12 italic-small">
                Visit any of our centers for a free diagnostic test and get your first personalized performance roadmap.
              </p>

              {/* Magnetic Spring CTA Action Button */}
              <MagneticButton onClick={() => navigate('/counseling/call')}>
                Book My Audit Now
              </MagneticButton>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-3 h-3 border-t-2 border-l-2 border-slate-200/60 group-hover/hull:border-indigo-500/30 transition-colors" />
            <div className="absolute top-8 right-8 w-3 h-3 border-t-2 border-r-2 border-slate-200/60 group-hover/hull:border-indigo-500/30 transition-colors" />
            <div className="absolute bottom-8 left-8 w-3 h-3 border-b-2 border-l-2 border-slate-200/60 group-hover/hull:border-indigo-500/30 transition-colors" />
            <div className="absolute bottom-8 right-8 w-3 h-3 border-b-2 border-r-2 border-slate-200/60 group-hover/hull:border-indigo-500/30 transition-colors" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
