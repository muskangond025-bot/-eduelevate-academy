import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight } from 'lucide-react';

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
      className={`relative overflow-hidden group/btn font-black uppercase tracking-[0.15em] text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
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

export const ContactWhatsApp = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
    <section className="pt-0 pb-20 bg-[#FAF9F6] relative overflow-hidden select-none">
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-12 md:p-20 rounded-[3.5rem] bg-[#128c7e] border border-[#0e7065] text-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden transition-all duration-500 shadow-2xl ${
            isHovered ? 'scale-[1.01] shadow-[0_30px_70px_rgba(18,140,126,0.15)]' : ''
          }`}
          style={{
            transform: isHovered
              ? `perspective(1000px) rotateX(${-tilt.y * 2.5}deg) rotateY(${tilt.x * 2.5}deg)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            transformStyle: "preserve-3d"
          }}
        >
          {/* Gravity Warp Coordinates Mesh Grid Background inside green banner */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none z-0">
            <defs>
              <radialGradient id="greenMeshSpotlight" r="40%" cx={`${(coords.x / (containerRef.current?.clientWidth || 1)) * 100}%`} cy={`${(coords.y / (containerRef.current?.clientHeight || 1)) * 100}%`}>
                <stop offset="0%" stopColor="#25d366" stopOpacity="1" />
                <stop offset="100%" stopColor="#128c7e" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Horizontal mesh curves */}
            {Array.from({ length: 6 }).map((_, r) => {
              let pathD = "";
              for (let c = 0; c <= 10; c++) {
                const px = (c / 10) * (containerRef.current?.clientWidth || 1000);
                const py = (r / 5) * (containerRef.current?.clientHeight || 400);
                
                const dx = coords.x - px;
                const dy = coords.y - py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                let ox = px;
                let oy = py;
                if (dist < 200) {
                  const force = (200 - dist) / 200;
                  ox -= dx * force * 0.1;
                  oy -= dy * force * 0.1;
                }
                pathD += `${c === 0 ? 'M' : 'L'} ${ox} ${oy}`;
              }
              return (
                <path key={`gh-${r}`} d={pathD} fill="none" stroke="url(#greenMeshSpotlight)" strokeWidth="0.8" />
              );
            })}

            {/* Vertical mesh curves */}
            {Array.from({ length: 11 }).map((_, c) => {
              let pathD = "";
              for (let r = 0; r <= 5; r++) {
                const px = (c / 10) * (containerRef.current?.clientWidth || 1000);
                const py = (r / 5) * (containerRef.current?.clientHeight || 400);
                
                const dx = coords.x - px;
                const dy = coords.y - py;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                let ox = px;
                let oy = py;
                if (dist < 200) {
                  const force = (200 - dist) / 200;
                  ox -= dx * force * 0.1;
                  oy -= dy * force * 0.1;
                }
                pathD += `${r === 0 ? 'M' : 'L'} ${ox} ${oy}`;
              }
              return (
                <path key={`gv-${c}`} d={pathD} fill="none" stroke="url(#greenMeshSpotlight)" strokeWidth="0.8" />
              );
            })}
          </svg>

          {/* Border laser sweep highlight trailing cursor inside green panel */}
          <div
            className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(37, 211, 102, 0.45), transparent 80%)`,
              padding: '1.2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Spark Particle Trails */}
          <SparkParticlesTrail coords={coords} colorClass="bg-green-400" />

          {/* Left Text Block inside green panel */}
          <div className="lg:w-2/3 text-center lg:text-left relative z-10" style={{ transform: "translateZ(15px)" }}>

            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight italic uppercase overflow-visible py-1">
              Quick Support On <span className="text-slate-900 not-italic px-1">WhatsApp.</span>
            </h2>
            <p className="text-lg text-emerald-50 max-w-xl font-semibold leading-relaxed mb-6">
              Need answers in real-time? Chat with our admissions and student support cell directly for instant parameter diagnostics.
            </p>
          </div>
          
          {/* Right Action Block inside green panel */}
          <div className="lg:w-1/3 w-full relative z-10 flex justify-center lg:justify-end" style={{ transform: "translateZ(20px)" }}>
            <MagneticActionButton
              onClick={() => window.open('https://wa.me/9118001234567', '_blank')}
              className="w-full max-w-xs py-7 bg-white text-[#128c7e] hover:bg-[#060813] hover:text-white shadow-2xl"
              laserColor="rgba(37, 211, 102, 0.45)"
            >
              <MessageCircle size={22} className="fill-current shrink-0 text-emerald-500" />
              <span>Start Live Chat</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform shrink-0" />
            </MagneticActionButton>
          </div>

          {/* Technical indicators inside WhatsApp card */}
          <span className="absolute bottom-4 right-6 font-mono text-[5px] text-emerald-300/60 select-none">
            [WHATSAPP_NODE_STREAM: CONNECTED // SECURE]
          </span>
        </motion.div>
      </div>
    </section>
  );
};
