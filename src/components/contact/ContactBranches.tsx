import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight, Navigation } from 'lucide-react';

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

const MagneticExplorerArrow = ({
  globalMouse,
  isParentHovered
}: {
  globalMouse: { x: number; y: number };
  isParentHovered: boolean;
}) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!arrowRef.current) return;
    const rect = arrowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = globalMouse.x - centerX;
    const dy = globalMouse.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100 && isParentHovered) {
      const pullFactor = (100 - distance) / 100;
      setPosition({
        x: dx * pullFactor * 0.45,
        y: dy * pullFactor * 0.45
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [globalMouse, isParentHovered]);

  return (
    <motion.div
      ref={arrowRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 12 }}
      className={`p-2.5 border border-slate-200 rounded-full flex items-center justify-center bg-white shadow-sm transition-all ${
        isParentHovered ? 'border-orange-400 bg-orange-50 text-orange-500 scale-105' : 'text-slate-400'
      }`}
    >
      <ArrowUpRight size={16} className={`transition-transform duration-300 ${isParentHovered ? 'rotate-45' : ''}`} />
    </motion.div>
  );
};

const FrostedBranchCard = ({
  branch,
  index,
  hoveredIndex,
  setHoveredIndex,
  globalMouse
}: {
  branch: { city: string; area: string; address: string; phone: string };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  globalMouse: { x: number; y: number };
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
    <a 
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.area + ", " + branch.address + ", " + branch.city)}`}
      target="_blank"
      rel="noreferrer"
      className="block w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl cursor-pointer ${
          isHovered
            ? 'scale-[1.03] bg-white border-orange-500/30 shadow-[0_30px_70px_rgba(251,146,60,0.08)] z-20'
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
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(251, 146, 60, 0.4), transparent 80%)`,
            padding: '1.2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Sparks Trail */}
        <SparkParticlesTrail coords={coords} colorClass="bg-orange-400" />

        <div className="flex justify-between items-start mb-8">
          {/* Animated concentric HUD circles around MapPin */}
          <div 
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all relative ${
              isHovered ? 'bg-orange-500 text-white scale-110 shadow-md' : 'bg-slate-50 text-slate-700'
            }`}
            style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)' }}
          >
            <div 
              className="absolute inset-[-4px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none transition-colors" 
              style={{ 
                animationDuration: '8s',
                borderColor: isHovered ? 'rgba(251, 146, 60, 0.4)' : ''
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
            <MapPin size={24} className="relative z-10" />
          </div>

          {/* Magnetic explorer arrow */}
          <div style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)' }}>
            <MagneticExplorerArrow globalMouse={globalMouse} isParentHovered={isHovered} />
          </div>
        </div>
        
        <div style={{ transform: "translateZ(10px)" }}>
          <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">{branch.city}</div>
          <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">{branch.area}</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 h-12">{branch.address}</p>
          
          <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
            <div>
              <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Helpline Phone</div>
              <div className="text-sm font-black text-slate-700">{branch.phone}</div>
            </div>

          </div>
        </div>
      </motion.div>
    </a>
  );
};

export const ContactBranches = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setGlobalMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const BRANCHES = [
    { city: "Pune", area: "Kothrud Center", address: "102, Platinum Square, DP Road", phone: "+91 20 4567 8901" },
    { city: "Mumbai", area: "Andheri West", address: "502, Education Plaza, Link Road", phone: "+91 22 1234 5678" },
    { city: "Delhi", area: "South Ex II", address: "Academic Tower, Block-C, South Ex", phone: "+91 11 9876 5432" },
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="pt-12 pb-8 bg-[#FAF9F6] relative overflow-hidden select-none"
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
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, rgba(250, 249, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Interactive crosshair scanning guidelines */}
      {isHovered && (
        <>
          <div 
            className="absolute left-0 right-0 border-t border-dashed border-indigo-500/10 pointer-events-none z-10" 
            style={{ top: coords.y, transition: 'top 0.08s cubic-bezier(0.16, 1, 0.3, 1)' }} 
          />
          <div 
            className="absolute top-0 bottom-0 border-l border-dashed border-indigo-500/10 pointer-events-none z-10" 
            style={{ left: coords.x, transition: 'left 0.08s cubic-bezier(0.16, 1, 0.3, 1)' }} 
          />
        </>
      )}

      {/* Layout lines guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        
        {/* Editorial Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200/40 pb-8">
          <div>

            <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">
              Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-500 not-italic">Hubs.</span>
            </h2>
            <p className="text-slate-500 font-semibold mt-4 text-sm max-w-lg leading-relaxed">
              Visit any of our state-of-the-art regional learning hubs to speak directly with an academic advisor.
            </p>
          </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRANCHES.map((branch, i) => (
            <FrostedBranchCard
              key={i}
              branch={branch}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              globalMouse={globalMouse}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
