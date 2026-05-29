import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, UserCheck } from 'lucide-react';

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

const FeedbackCard = ({
  rev,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  rev: any;
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
      className={`p-12 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-md flex flex-col items-center text-center bg-white/70 border-slate-200/50 ${
        isSelfHovered
          ? 'scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] bg-white border-indigo-500/20'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      <div
        className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
          padding: '1.2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

      {/* Avatar frame with rotating HUD orbit */}
      <div className="relative w-18 h-18 mb-8 select-none" style={{ transform: "translateZ(25px)" }}>
        <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none group-hover/card:border-indigo-400/40" style={{ animationDuration: '10s' }} />
        <div className="w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-md relative z-10 bg-slate-100">
          <img 
            src={rev.img} 
            alt={rev.name} 
            className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500 scale-100 group-hover/card:scale-105"
            style={{ filter: isSelfHovered ? 'grayscale(0)' : 'grayscale(1)' }}
          />
        </div>
      </div>

      <Quote size={24} className="text-indigo-500/20 mb-6" style={{ transform: "translateZ(15px)" }} />
      
      <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 italic-small" style={{ transform: "translateZ(20px)" }}>
        "{rev.text}"
      </p>

      <div className="font-bold text-slate-800 tracking-tight text-xl uppercase leading-none" style={{ transform: "translateZ(10px)" }}>
        {rev.name}
      </div>

      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 flex items-center gap-2" style={{ transform: "translateZ(5px)" }}>
        <UserCheck size={12} className="text-indigo-650" /> Verified Parent
      </div>
    </motion.div>
  );
};

export const ParentWrittenFeedback = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const reviews = [
    { name: "Dr. Sandeep Deshmukh", text: "As a doctor, I value precision. AcademyPro's teaching methodology is precise and results are visible in my daughter's performance.", img: "https://i.pravatar.cc/100?u=p1" },
    { name: "Mrs. Anjali Naik", text: "The security at the campus and the regular parent-teacher meetings ensure that my child is in safe hands academic-wise and otherwise.", img: "https://i.pravatar.cc/100?u=p2" },
    { name: "Mr. Vijay Rathod", text: "Their scholarship system is very merit-based. We were able to get a 50% waiver, which was a huge support for our family.", img: "https://i.pravatar.cc/100?u=p3" }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-24 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/50"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((rev, i) => (
            <FeedbackCard
              key={i}
              rev={rev}
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
