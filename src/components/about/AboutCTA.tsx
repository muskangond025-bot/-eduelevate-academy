import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const MagneticLinkButton = ({
  children,
  to,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)"
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

    setPosition({
      x: (x - centerX) * 0.25,
      y: (y - centerY) * 0.25
    });
    setBtnCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className="inline-block"
    >
      <Link
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        to={to}
        className={`px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xl shadow-amber-500/20 ${className}`}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(50px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`
          }}
        />
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </Link>
    </motion.div>
  );
};

export const AboutCTA = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const [cardCoords, setCardCoords] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight cursor tracking */}
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

      {/* Layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Frosted Glassmorphic Card Banner */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="p-16 lg:p-24 rounded-[4rem] border transition-all duration-500 relative overflow-hidden bg-[#060813] border-white/10 shadow-2xl hover:border-indigo-500/20"
          style={{
            transform: `perspective(1000px) rotateX(${-cardTilt.y * 4}deg) rotateY(${cardTilt.x * 4}deg)`,
            transformStyle: "preserve-3d",
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Inner Coordinates Mesh Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Border laser sweep trailing cursor */}
          <div
            className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(120px circle at ${cardCoords.x}px ${cardCoords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
              padding: '1.2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Sparks trail */}
          <SparkParticlesTrail coords={cardCoords} colorClass="bg-indigo-500" />

          {/* Concentric HUD Orbits */}
          <div className="absolute inset-[-10px] border border-dashed border-white/5 rounded-[4.5rem] pointer-events-none opacity-40 animate-spin" style={{ animationDuration: '18s' }} />

          <div className="relative z-10 text-center select-none" style={{ transform: "translateZ(20px)" }}>
            {/* Calendar Icon with Orbit Reticle */}
            <div className="relative w-20 h-20 bg-white/5 border border-white/10 rounded-[1.8rem] flex items-center justify-center mx-auto mb-10 shadow-sm z-10 shrink-0" style={{ transform: "translateZ(25px)" }}>
              <div className="absolute inset-[-6px] border border-dashed border-white/10 rounded-[2.1rem] animate-spin pointer-events-none" style={{ animationDuration: '8s' }} />
              <Calendar size={32} className="text-amber-400 relative z-10" />
            </div>

            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] uppercase" style={{ transform: "translateZ(15px)" }}>
              Experience our <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 italic font-black mt-2 block">
                Legacy.
              </span>
            </h2>
            
            <p className="text-lg text-indigo-100 opacity-80 mb-12 max-w-lg mx-auto leading-relaxed font-semibold italic-small" style={{ transform: "translateZ(10px)" }}>
              Join a free demo session and explore our pedagogy, meet the faculty, and see our infrastructure first-hand.
            </p>

            {/* Magnetic Link CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ transform: "translateZ(5px)" }}>
              <MagneticLinkButton to="/book-demo" className="group shadow-2xl shadow-amber-500/20">
                Book Demo Class 
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </MagneticLinkButton>
            </div>
            
            <span className="font-mono text-[6px] text-slate-500 select-none mt-8 block">[CTA_SECURE // ROOT_LINK]</span>
          </div>
        </div>
      </div>
    </section>
  );
};
