import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Library, Laptop, FlaskConical, Wifi, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  laserColor = "rgba(99, 102, 241, 0.25)"
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
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className={`px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 bg-slate-900 border border-white/10 text-white hover:bg-slate-800 ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

const FacilityCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
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
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  const isSelfHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col bg-white border-slate-200/50 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] border-indigo-500/20'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-xl'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={item.sparkClass} />

      {/* Cyber Bezel Image Viewport Frame */}
      <div className="relative aspect-video rounded-[2.8rem] overflow-hidden mb-8 border border-slate-100 shadow-sm relative">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

        {/* Floating Concentric HUD Icon Orbit */}
        <div className={`absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-800 shadow-lg transition-all duration-500 ${
          isSelfHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="absolute inset-[-5px] border border-dashed border-slate-400 rounded-2xl animate-spin pointer-events-none group-hover:border-slate-500" style={{ animationDuration: '8s' }} />
          {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-3 px-4 uppercase tracking-tight" style={{ transform: "translateZ(20px)" }}>
        {item.title}
      </h3>
      
      <p className="text-slate-500 text-sm leading-relaxed px-4 font-semibold" style={{ transform: "translateZ(10px)" }}>
        {item.desc}
      </p>

      {/* Monospaced indicator badge */}
      <span className="absolute bottom-4 right-6 font-mono text-[7px] text-slate-400 select-none z-10">
        [{item.badgeCode}]
      </span>
    </motion.div>
  );
};

export const Infrastructure = () => {
  const navigate = useNavigate();
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [wifiCoords, setWifiCoords] = useState({ x: 0, y: 0 });
  const [wifiTilt, setWifiTilt] = useState({ x: 0, y: 0 });
  const wifiRef = useRef<HTMLDivElement>(null);

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

  const handleWifiMouseMove = (e: React.MouseEvent) => {
    if (!wifiRef.current) return;
    const rect = wifiRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setWifiCoords({ x, y });
    setWifiTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
  };

  const facilities = [
    { 
      title: "Smart Classrooms", 
      desc: "Equipped with interactive OLED displays and digital writing pads.", 
      img: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=600", 
      icon: <Laptop />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "INFRA_01 // SMART_CLASS"
    },
    { 
      title: "Advanced Labs", 
      desc: "Fully-functional Physics & Chemistry labs for practical conceptualization.", 
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", 
      icon: <FlaskConical />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "INFRA_02 // AD_LABS"
    },
    { 
      title: "Quiet Library", 
      desc: "Digital & Physical resource library with over 10,000+ academic titles.", 
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600", 
      icon: <Library />,
      themeColor: "violet",
      sparkClass: "bg-violet-500",
      laserColor: "rgba(139, 92, 246, 0.4)",
      badgeCode: "INFRA_03 // QUIET_LIB"
    }
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-650 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
          >
            <Shield size={11} className="text-indigo-500 animate-pulse" />
            <span>Infrastructure Facilities</span>
          </motion.div>

          <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-4 uppercase leading-none">
            World-Class{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black">
              Infrastructure.
            </span>
          </h2>
          <p className="text-slate-500 font-semibold max-w-xl mx-auto italic-small leading-relaxed text-sm md:text-base">
            The environment that fosters genius minds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {facilities.map((item, i) => (
            <FacilityCard
              key={i}
              item={item}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* WiFi Cyber Bezel Dashboard Console Banner */}
        <div
          ref={wifiRef}
          onMouseMove={handleWifiMouseMove}
          onMouseLeave={() => setWifiTilt({ x: 0, y: 0 })}
          className="relative select-none"
          style={{
            transform: `perspective(1000px) rotateX(${-wifiTilt.y * 3}deg) rotateY(${wifiTilt.x * 3}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: "preserve-3d"
          }}
        >
          <div className="p-12 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl bg-white/40 border-slate-200/50 shadow-lg hover:bg-white hover:border-indigo-500/20" style={{ transform: "translateZ(15px)" }}>
            {/* Concentric HUD Orbits */}
            <div className="absolute inset-[-10px] border border-dashed border-slate-200 rounded-[4.5rem] pointer-events-none opacity-40 animate-spin" style={{ animationDuration: '18s' }} />

            {/* Border laser sweep trailing cursor */}
            <div
              className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(120px circle at ${wifiCoords.x}px ${wifiCoords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
                padding: '1.2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Sparks trail */}
            <SparkParticlesTrail coords={wifiCoords} colorClass="bg-indigo-500" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '8s' }} />
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-650 border border-slate-100 shadow-sm relative z-10">
                    <Wifi size={32} className="animate-pulse" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 uppercase tracking-tight">High-Speed Campus WiFi</h4>
                  <p className="text-sm font-semibold text-slate-500 mt-1">Seamlessly connected digital portal access for all students.</p>
                  <span className="font-mono text-[6px] text-slate-400 select-none mt-1 block">[SYSTEM: WIFI_SECURE // RET_OK]</span>
                </div>
              </div>
              
              <MagneticActionButton className="group" onClick={() => navigate('/counseling/walkthrough')}>
                Tour the Campus
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </MagneticActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
