import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Zap, Sparkles, Cpu, Layers } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const scoreData = [
  { month: 'Jan', score: 45, avg: 40 },
  { month: 'Feb', score: 52, avg: 42 },
  { month: 'Mar', score: 48, avg: 45 },
  { month: 'Apr', score: 61, avg: 48 },
  { month: 'May', score: 75, avg: 50 },
  { month: 'Jun', score: 88, avg: 52 },
];

const StatsCard = ({
  title,
  value,
  bgClass,
  textClass,
  laserColor,
  icon,
  index,
  hoveredStat,
  setHoveredStat
}: {
  title: string;
  value: string;
  bgClass: string;
  textClass: string;
  laserColor: string;
  icon: React.ReactNode;
  index: number;
  hoveredStat: number | null;
  setHoveredStat: (i: number | null) => void;
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
    setHoveredStat(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredStat(null);
  };

  const isSelfHovered = hoveredStat === index;
  const isDimmed = hoveredStat !== null && hoveredStat !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/stat ${bgClass} ${
        isSelfHovered
          ? 'scale-[1.015] shadow-xl border-indigo-500/20'
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-100/50'
            : 'shadow-sm border-slate-200/50 bg-white/40'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.015 : 1}, ${isSelfHovered ? 1.015 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.04), transparent 80%)`,
        }}
      />

      {/* Border Laser */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${laserColor}, transparent 80%)`,
          padding: '1.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <div className="relative z-10 flex items-center justify-between gap-6">
        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{title}</div>
          <h4 className="text-3xl font-black text-primary tracking-tight">{value}</h4>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 shadow-inner ${
          isSelfHovered 
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
            : 'bg-slate-50 border-slate-150/80 ' + textClass
        }`}>
          {React.cloneElement(icon as React.ReactElement, { size: 24, className: isSelfHovered ? 'animate-pulse' : '' })}
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-5 left-5 w-2.5 h-2.5 border-t border-l border-slate-200 group-hover:border-indigo-500/20 transition-colors" />
      <div className="absolute top-5 right-5 w-2.5 h-2.5 border-t border-r border-slate-200 group-hover:border-indigo-500/20 transition-colors" />
      <div className="absolute bottom-5 left-5 w-2.5 h-2.5 border-b border-l border-slate-200 group-hover:border-indigo-500/20 transition-colors" />
      <div className="absolute bottom-5 right-5 w-2.5 h-2.5 border-b border-r border-slate-200 group-hover:border-indigo-500/20 transition-colors" />
    </motion.div>
  );
};

export const DataVisualization = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Dotted Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Dynamic spotlights */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
            >
              <Sparkles size={11} className="text-indigo-500 animate-bounce" />
              <span>Growth Vectors</span>
            </motion.div>
            <h2 className="text-5xl font-black text-primary tracking-tighter mb-6 uppercase leading-none select-none">
              Progress <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">Trajectory.</span>
            </h2>
            <p className="text-slate-500 font-semibold mb-12 leading-relaxed text-sm md:text-base italic-small">
              Traditional coaching shows you a grade. We show you the velocity of your growth. Our system maps every mock test against your individual baseline to predict your rank with 94% accuracy.
            </p>
            
            <div className="space-y-5">
              <StatsCard
                title="Average Improvement"
                value="+42% Points"
                bgClass="bg-emerald-50/20 border-emerald-100"
                textClass="text-emerald-600"
                laserColor="rgba(16, 185, 129, 0.3)"
                icon={<Zap />}
                index={0}
                hoveredStat={hoveredStat}
                setHoveredStat={setHoveredStat}
              />
              <StatsCard
                title="Concept Mastery"
                value="82 Chapters"
                bgClass="bg-blue-50/20 border-blue-100"
                textClass="text-blue-600"
                laserColor="rgba(59, 130, 246, 0.3)"
                icon={<Layers />}
                index={1}
                hoveredStat={hoveredStat}
                setHoveredStat={setHoveredStat}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#060813] border border-white/10 rounded-[4rem] shadow-2xl h-[470px] relative overflow-hidden flex flex-col justify-between"
          >
            {/* macOS Chrome Header dots */}
            <div className="flex gap-1.5 py-3.5 px-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-600/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/10" />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg px-5 py-1 text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                <span className="w-1 h-1 bg-amber-400 rounded-full animate-ping" />
                <span>[ACCURACY: 94% // MATRIX_CALIB]</span>
              </div>
              
              <div className="w-12" /> {/* spacer */}
            </div>

            <div className="flex-1 flex flex-col justify-between p-6">
              <h4 className="text-white font-black text-[10px] font-mono uppercase tracking-[0.35em] mb-6 text-center select-none opacity-60">Mock Test Performance (2025-26)</h4>
              <div className="flex-1 pb-4 relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={scoreData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FB923C" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={9} fontClassName="font-mono" tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} fontClassName="font-mono" tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', color: '#fff', fontSize: '10px', fontFamily: 'monospace' }}
                        itemStyle={{ color: '#FB923C', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#FB923C" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                      <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
            </div>
            
            {/* Corners accents decorative */}
            <div className="absolute top-5 left-5 w-2 h-2 border-t border-l border-white/10" />
            <div className="absolute top-5 right-5 w-2 h-2 border-t border-r border-white/10" />
            <div className="absolute bottom-5 left-5 w-2 h-2 border-b border-l border-white/10" />
            <div className="absolute bottom-5 right-5 w-2 h-2 border-b border-r border-white/10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
