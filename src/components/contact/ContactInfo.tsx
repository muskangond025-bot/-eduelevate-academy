import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Clock, ShieldCheck } from 'lucide-react';

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

const FrostedInfoCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: { icon: React.ReactNode; title: string; value: string; desc: string; laserColor: string };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredIndex === index;
  const isSiblingHovered = hoveredIndex !== null && hoveredIndex !== index;

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
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl cursor-default ${
        isHovered
          ? 'scale-[1.03] bg-white border-indigo-500/30 shadow-[0_30px_70px_rgba(99,102,241,0.08)] z-20'
          : isSiblingHovered
          ? 'bg-white/30 border-slate-200/40 opacity-45 blur-[0.5px]'
          : 'bg-white/80 border-slate-200/50 shadow-md'
      }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) translateZ(10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep highlight trailing cursor inside card */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks Trail */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-400" />

      {/* Nested Rotating Concentric HUD loops around the Icon Container */}
      <div 
        className="w-16 h-16 rounded-2xl bg-slate-50 relative flex items-center justify-center mb-8 shadow-sm transition-transform"
        style={{ 
          transform: isHovered ? 'translateZ(25px) scale(1.1)' : 'translateZ(0px)',
          transition: 'transform 0.4s'
        }}
      >
        <div 
          className="absolute inset-[-4px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none" 
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
        <div className="relative z-10">
          {item.icon}
        </div>
      </div>

      <div style={{ transform: "translateZ(15px)" }}>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.title}</h4>
        <div className="text-xl font-black text-slate-800 mb-2 tracking-tight">{item.value}</div>
        <p className="text-xs font-bold text-slate-400">{item.desc}</p>
      </div>

      {/* Monospaced technical indicators */}
      <span className="absolute bottom-4 right-6 font-mono text-[5px] text-slate-350 select-none pointer-events-none">
        [SYS_HELPLINE_MODULE_0{index + 1}]
      </span>
    </motion.div>
  );
};

export const ContactInfo = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const info = [
    { 
      icon: <Phone className="text-orange-500 animate-pulse" size={24} />, 
      title: "Admissions Helpline", 
      value: "+91 1800 123 4567", 
      desc: "Available 9 AM - 8 PM",
      laserColor: "rgba(251, 146, 60, 0.4)"
    },
    { 
      icon: <Mail className="text-cyan-500" size={24} />, 
      title: "Email Counseling", 
      value: "hello@academypro.com", 
      desc: "Response within 24 hours",
      laserColor: "rgba(6, 182, 212, 0.4)"
    },
    { 
      icon: <Clock className="text-indigo-500" size={24} />, 
      title: "Support Hours", 
      value: "Monday - Saturday", 
      desc: "Sunday Closed for Prep",
      laserColor: "rgba(99, 102, 241, 0.4)"
    },
    { 
      icon: <ShieldCheck className="text-emerald-500" size={24} />, 
      title: "Verified Office", 
      value: "Reg. Hub HQ", 
      desc: "Visit for a free audit",
      laserColor: "rgba(16, 185, 129, 0.4)"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="py-28 bg-[#FAF9F6] relative overflow-hidden select-none border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
      <div
        className="absolute pointer-events-none transition-opacity duration-75 blur-[120px] rounded-full z-0"
        style={{
          opacity: isHovered ? 0.35 : 0,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(250, 249, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.map((item, i) => (
            <FrostedInfoCard
              key={i}
              item={item}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
