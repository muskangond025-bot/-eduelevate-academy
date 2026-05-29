import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Shield, Lock } from 'lucide-react';

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

const DriftingTelemetryBadge = ({
  children,
  className,
  initialX,
  initialY,
  mouseCoords
}: {
  children: React.ReactNode;
  className?: string;
  initialX: string;
  initialY: string;
  mouseCoords: { x: number; y: number };
}) => {
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const w = window.innerWidth || 1200;
    const h = window.innerHeight || 800;
    const dx = (mouseCoords.x - w / 2) / (w / 2);
    const dy = (mouseCoords.y - h / 2) / (h / 2);

    setDrift({
      x: dx * -15,
      y: dy * -15
    });
  }, [mouseCoords]);

  return (
    <motion.div
      animate={{ x: drift.x, y: drift.y }}
      transition={{ type: "spring", stiffness: 60, damping: 25 }}
      style={{ left: initialX, top: initialY }}
      className={`absolute hidden xl:flex items-center gap-3 bg-white/70 border border-slate-200/50 rounded-2xl px-5 py-3 font-mono text-[9px] text-slate-555 select-none backdrop-blur-md shadow-md pointer-events-none z-20 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const ParentHero = () => {
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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-32 pb-20 bg-[#FAF9F6] text-slate-800 relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae */}
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

      {/* Layout guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      {/* Drifting Telemetry Badges */}
      <DriftingTelemetryBadge initialX="10%" initialY="45%" mouseCoords={sectionCoords}>
        <Shield size={10} className="text-indigo-650 animate-pulse" />
        <span className="font-bold text-indigo-650">[GUARDIAN_SECURITY: HIGH]</span>
        <span className="text-slate-300">//</span>
        <span>[ACTIVE_ROOT]</span>
      </DriftingTelemetryBadge>

      <DriftingTelemetryBadge initialX="72%" initialY="65%" mouseCoords={sectionCoords}>
        <Lock size={10} className="text-cyan-600 animate-bounce" style={{ animationDuration: '2.5s' }} />
        <span className="font-bold text-cyan-600">[METRIC: PARENT_SATISFACTION]</span>
        <span className="text-slate-300">//</span>
        <span>[STABLE]</span>
      </DriftingTelemetryBadge>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 select-none">
        {/* Validated Parent's Choice Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2.5 rounded-full text-indigo-650 font-black text-[10px] uppercase tracking-widest mb-10 shadow-sm relative overflow-hidden"
        >
          <style>{`
            @keyframes shield-glow {
              0%, 100% { filter: drop-shadow(0 0 2px rgba(99, 102, 241, 0.4)); }
              50% { filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.8)); }
            }
            .animate-shield-glow {
              animation: shield-glow 3s ease-in-out infinite;
            }
          `}</style>
          <div className="w-6 h-6 rounded-full border border-indigo-300 relative flex items-center justify-center shrink-0">
            <div className="absolute -inset-0.5 border border-dashed border-indigo-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <ShieldCheck size={13} className="text-indigo-600 animate-shield-glow" strokeWidth={2} />
          </div>
          <span>The Parent's Choice</span>
        </motion.div>
        
        {/* Main Title with word reveal split stagger */}
        <h2 className="text-5xl lg:text-7xl font-black text-slate-800 tracking-tighter mb-8 uppercase leading-none">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="block overflow-hidden"
          >
            A Foundation of
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, type: "spring", stiffness: 100 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black mt-2"
          >
            Safety & Trust.
          </motion.span>
        </h2>
        
        {/* Subtitle details */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed text-sm md:text-base italic-small px-4"
        >
          We understand that education is an emotional and financial investment. Hear from the families who have walked this path with us.
        </motion.p>
      </div>
    </section>
  );
};
