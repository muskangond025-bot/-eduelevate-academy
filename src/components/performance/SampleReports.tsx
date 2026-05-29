import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileDown, MousePointer2, Star, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

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
            width: `${6 - idx * 1.5}px`,
            height: `${6 - idx * 1.5}px`,
            opacity: 0.7 - idx * 0.2,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        />
      ))}
    </>
  );
};

const ReportSelectorCard = ({
  report,
  index,
  selectedIdx,
  setSelectedIdx,
  hoveredIndex,
  setHoveredIndex
}: {
  report: { title: string; date: string; id: string; color: string; sparkColor: string; laserColor: string };
  index: number;
  selectedIdx: number;
  setSelectedIdx: (i: number) => void;
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

  const isSelected = selectedIdx === index;
  const isSelfHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelectedIdx(index)}
      className={`p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden cursor-pointer backdrop-blur-xl group/item ${
        isSelected
          ? 'bg-white/80 border-indigo-500/30 shadow-lg scale-[1.01]'
          : isSelfHovered
            ? 'bg-white/60 border-slate-300 shadow-md scale-[1.005]'
            : isDimmed
              ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-100/50 bg-white/20'
              : 'bg-white/40 border-slate-200/50 shadow-sm'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Laser highlight trailing pointer */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(90px circle at ${coords.x}px ${coords.y}px, ${report.laserColor}, transparent 80%)`,
          padding: '1.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <SparkParticlesTrail coords={coords} colorClass={report.sparkColor} />

      <div className="relative z-10 flex items-center justify-between gap-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 ${report.color} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner group-hover/item:scale-105 transition-transform duration-300`}>
            <FileDown size={22} className={isSelfHovered ? 'animate-bounce' : ''} />
          </div>
          <div>
            <div className="text-base font-black text-primary tracking-tight group-hover/item:text-indigo-950 transition-colors uppercase leading-none mb-1.5">{report.title}</div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{report.date}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="font-mono text-[8px] text-slate-400 font-bold">{report.id}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shrink-0 shadow-lg shadow-indigo-500/20" />
          )}
          <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
            isSelected 
              ? 'text-indigo-600 opacity-100' 
              : 'text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-[-4px]'
          }`}>
            {isSelected ? '[SYNCED]' : 'PREVIEW'} <MousePointer2 size={10} className="shrink-0" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const SampleReports = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const reports = [
    {
      title: "Weekly Diagnostic",
      date: "May 12, 2026",
      id: "DX-2026-W19",
      color: "bg-indigo-600",
      sparkColor: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      data: {
        id: "DX-2026-W19",
        rank: "AIR 142",
        accuracy: "94.2%",
        accLabel: "94% ACCURATE",
        matrix: [
          { name: "Physics", val: 92, color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
          { name: "Chemistry", val: 78, color: "bg-gradient-to-r from-amber-400 to-orange-500" },
          { name: "Mathematics", val: 40, color: "bg-gradient-to-r from-rose-400 to-red-500" }
        ]
      }
    },
    {
      title: "Monthly Roadmap",
      date: "April 2026",
      id: "RM-2026-M04",
      color: "bg-emerald-600",
      sparkColor: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      data: {
        id: "RM-2026-M04",
        rank: "AIR 118",
        accuracy: "95.8%",
        accLabel: "95% ACCURATE",
        matrix: [
          { name: "Physics", val: 95, color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
          { name: "Chemistry", val: 88, color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
          { name: "Mathematics", val: 65, color: "bg-gradient-to-r from-amber-400 to-orange-500" }
        ]
      }
    },
    {
      title: "Subject Master",
      date: "Physics - Vol 1",
      id: "SM-2026-P01",
      color: "bg-amber-600",
      sparkColor: "bg-amber-500",
      laserColor: "rgba(245, 158, 11, 0.4)",
      data: {
        id: "SM-2026-P01",
        rank: "AIR 96",
        accuracy: "97.4%",
        accLabel: "97% ACCURATE",
        matrix: [
          { name: "Physics", val: 98, color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
          { name: "Chemistry", val: 94, color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
          { name: "Mathematics", val: 90, color: "bg-gradient-to-r from-emerald-400 to-teal-500" }
        ]
      }
    }
  ];

  // Trigger scanning sweep whenever the selected index changes
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [selectedIdx]);

  const activeData = reports[selectedIdx].data;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/60"
    >
      {/* Light Blueprint Grid Canvas Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic Cursor spotlight Nebulae */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700 blur-[130px] rounded-full"
        style={{
          opacity: isSectionHovered ? 0.35 : 0,
          left: `${sectionCoords.x}px`,
          top: `${sectionCoords.y}px`,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
          zIndex: 1
        }}
      />

      {/* CSS Animation Keyframes for sub-mockup */}
      <style>{`
        @keyframes sub-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-sub-rotate {
          animation: sub-rotate 8s linear infinite;
        }
      `}</style>

      {/* Grid Guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Panel: Header and Selectors */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-sm"
            >
              <Cpu size={11} className="text-indigo-500 animate-pulse" />
              <span>Weekend Diagnostics</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-6 uppercase leading-none select-none">
              Sample <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">
                Reports.
              </span>
            </h2>
            <p className="text-slate-500 font-semibold mb-12 leading-relaxed text-sm md:text-base italic-small">
              Our reports are generated every weekend. They aren't just lists of marks; they are action plans. Every student gets a customized PDF highlighting exactly what to study on Monday.
            </p>

            <div className="space-y-4">
              {reports.map((report, i) => (
                <ReportSelectorCard
                  key={i}
                  report={report}
                  index={i}
                  selectedIdx={selectedIdx}
                  setSelectedIdx={setSelectedIdx}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>
          </div>

          {/* Right Panel: Cyber Bezel Scorecard Mockup */}
          <div className="lg:w-1/2 w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 lg:p-10 bg-[#060813] border border-white/10 rounded-[4.5rem] shadow-2xl relative overflow-hidden w-full max-w-[460px] aspect-[4/5] flex flex-col justify-between"
            >
              {/* macOS Bezel Chrome controls */}
              <div className="flex gap-1.5 py-1 px-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between select-none mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-600/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/10" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-md px-3 py-0.5 text-[7px] font-mono text-slate-400 uppercase tracking-widest shrink-0">
                  <span>[PREVIEW_ID: {activeData.id}]</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Dotted dashboard grids in bezel background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{
                  backgroundImage: `radial-gradient(white 1.5px, transparent 1.5px)`,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* The Scorecard Container */}
              <div className="flex-1 bg-white/95 rounded-[3rem] p-8 border border-indigo-50/50 relative overflow-hidden shadow-inner flex flex-col gap-6 z-10">
                
                {/* Active hardware scanning laser line */}
                <AnimatePresence>
                  {isScanning && (
                    <>
                      <motion.div
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] pointer-events-none z-30"
                      />
                      <motion.div
                        initial={{ height: 0, top: 0 }}
                        animate={{ height: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute left-0 right-0 bg-gradient-to-b from-cyan-400/5 to-transparent pointer-events-none z-20"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Scorecard Header */}
                <div className="flex justify-between items-start mb-2 select-none">
                  <div className="w-12 h-12 bg-indigo-950 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md border border-indigo-900">
                    A
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary uppercase tracking-tight leading-none mb-1">Scorecard</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NST-2026 Batch</div>
                  </div>
                </div>

                {/* Technical report serial placeholder stripes */}
                <div className="space-y-2.5">
                  <div className="h-3.5 bg-slate-100/80 rounded-lg w-[85%] border border-slate-200/20" />
                  <div className="h-3.5 bg-slate-100/80 rounded-lg w-[55%] border border-slate-200/20" />
                </div>

                {/* Double Bento Diagnostic Widgets */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Rank widget */}
                  <div className="bg-indigo-50/60 border border-indigo-100/60 rounded-2xl p-4 relative overflow-hidden group/subcard flex flex-col justify-between min-h-20 shadow-sm hover:bg-indigo-50/80 transition-colors">
                    {/* Concentric rotating orbits inside rank block */}
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 border border-dashed border-indigo-200 rounded-full pointer-events-none opacity-40 animate-sub-rotate" />
                    <div>
                      <div className="text-[7.5px] font-black text-indigo-500 uppercase tracking-widest mb-1.5 select-none">Rank Prediction</div>
                      <div className="text-xl font-black text-primary tracking-tight font-mono">{activeData.rank}</div>
                    </div>
                  </div>

                  {/* Accuracy widget */}
                  <div className="bg-blue-50/60 border border-blue-100/60 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-20 shadow-sm hover:bg-blue-50/80 transition-colors">
                    {/* Rotating crosshair inside accuracy block */}
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 border border-blue-200 rounded-full pointer-events-none opacity-40 animate-pulse" />
                    <div>
                      <div className="text-[7.5px] font-black text-blue-500 uppercase tracking-widest mb-1.5 select-none">Accuracy</div>
                      <div className="text-xl font-black text-primary tracking-tight font-mono">{activeData.accuracy}</div>
                    </div>
                  </div>
                </div>

                {/* Topic Matrix Grid */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-100 p-5 flex-1 flex flex-col justify-between min-h-32 shadow-inner">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest select-none mb-3">Topic Matrix</div>
                  <div className="space-y-4 flex-1 flex flex-col justify-around">
                    {activeData.matrix.map((row, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black font-mono">
                          <span className="text-slate-500 uppercase">{row.name}</span>
                          <span className="text-primary">★ {row.val}%</span>
                        </div>
                        <div className="h-2 bg-slate-200/80 rounded-full w-full overflow-hidden relative border border-slate-300/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isScanning ? 0 : `${row.val}%` }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: idx * 0.05 }}
                            className={`h-full rounded-full ${row.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Margin Holographic stickers (float continuously) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/4 -right-8 bg-gradient-to-r from-violet-500 via-pink-500 to-indigo-500 text-white font-black px-5 py-2.5 rounded-xl shadow-2xl rotate-12 uppercase text-[9px] tracking-widest select-none z-20 border border-white/20 backdrop-blur-md"
                style={{
                  boxShadow: '0 15px 30px rgba(167, 139, 250, 0.3)',
                  textShadow: '0 1px 1px rgba(0,0,0,0.15)'
                }}
              >
                {activeData.accLabel}
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute bottom-1/4 -left-8 bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 text-white font-black px-5 py-2.5 rounded-xl shadow-2xl -rotate-12 uppercase text-[9px] tracking-widest select-none z-20 border border-white/20 backdrop-blur-md"
                style={{
                  boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)',
                  textShadow: '0 1px 1px rgba(0,0,0,0.15)'
                }}
              >
                Verified Report
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
