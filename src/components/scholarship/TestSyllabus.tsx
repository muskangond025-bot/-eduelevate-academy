import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookMarked, ChevronRight, Sparkles, Target, Award, Download, Compass, Smartphone } from 'lucide-react';

const GridWarpCanvas = ({ mousePos, isHovered }: { mousePos: { x: number; y: number }; isHovered: boolean }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1400,
          height: containerRef.current.clientHeight || 600
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cols = 14;
  const rows = 9;
  const paths = [];

  for (let i = 1; i < cols; i++) {
    const x = (dimensions.width / cols) * i;
    let d = `M ${x} 0`;
    
    if (isHovered) {
      const distanceY = dimensions.height / 2;
      const dx = mousePos.x - x;
      const dy = mousePos.y - distanceY;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 180 - dist) * 0.45;
      const controlX = x + (dx > 0 ? pull : -pull);
      d = `M ${x} 0 Q ${controlX} ${dimensions.height / 2} ${x} ${dimensions.height}`;
    } else {
      d = `M ${x} 0 L ${x} ${dimensions.height}`;
    }
    paths.push(<path key={`v-${i}`} d={d} stroke="rgba(79, 70, 229, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  for (let i = 1; i < rows; i++) {
    const y = (dimensions.height / rows) * i;
    let d = `M 0 ${y}`;

    if (isHovered) {
      const distanceX = dimensions.width / 2;
      const dx = mousePos.x - distanceX;
      const dy = mousePos.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 180 - dist) * 0.45;
      const controlY = y + (dy > 0 ? pull : -pull);
      d = `M 0 ${y} Q ${dimensions.width / 2} ${controlY} ${dimensions.width} ${y}`;
    } else {
      d = `M 0 ${y} L ${dimensions.width} ${y}`;
    }
    paths.push(<path key={`h-${i}`} d={d} stroke="rgba(79, 70, 229, 0.05)" strokeWidth="1" fill="none" className="transition-all duration-300 ease-out" />);
  }

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths}
    </svg>
  );
};

export const TestSyllabus = () => {
  const [activeTab, setActiveTab] = useState('8-10');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // local coordinates for card tab border lasers
  const [tabCoords, setTabCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

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

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTabMouseMove = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTabCoords(prev => ({
      ...prev,
      [tabId]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  // Magnetic button physics
  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px) scale(1)';
  };

  const syllabus = [
    { 
      id: '8-10', 
      title: 'Foundation (8-10)', 
      topics: [
        { subject: "Mathematics", key: ["Number Systems", "Algebra", "Geometry", "Data Handling"] },
        { subject: "Science", key: ["Motion & Force", "Structure of Atom", "Life Processes", "Electricity"] },
        { subject: "Mental Ability", key: ["Number Series", "Logical Deduction", "Spatial Visualization"] }
      ]
    },
    { 
      id: '11-12', 
      title: 'Senior Secondary (11-12)', 
      topics: [
        { subject: "Physics", key: ["Kinematics", "Thermodynamics", "Optics", "Electromagnetism"] },
        { subject: "Chemistry", key: ["Chemical Equilibrium", "Organic Mechanisms", "Stoichiometry"] },
        { subject: "Math / Biology", key: ["Calculus", "Probability", "Human Physiology", "Genetics"] }
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="syllabus-section"
      className="py-32 bg-[#FAF9F6] text-primary relative overflow-hidden border-b border-indigo-50"
      style={{ perspective: 1200 }}
    >
      {/* Background Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
        style={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.04), rgba(245, 158, 11, 0.01) 40%, transparent 80%)`
            : 'none'
        }}
      />

      {/* Grid Warp Background */}
      <GridWarpCanvas mousePos={mousePos} isHovered={isHovered} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-6 shadow-sm"
          >
            <Sparkles size={11} className="text-indigo-500 animate-bounce" />
            <span>Syllabus Matrix</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none"
          >
            TEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">SYLLABUS.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-sm mx-auto"
          >
            Download relevant subject lists for specialized academic preparation.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Column: Frosted Glass Accordion Tabs */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {syllabus.map((item) => {
              const isSelected = activeTab === item.id;
              const localTabCoords = tabCoords[item.id] || { x: 0, y: 0 };
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onMouseMove={(e) => handleTabMouseMove(e, item.id)}
                  className={`p-10 rounded-[3.2rem] text-left transition-all duration-500 relative overflow-hidden flex flex-col justify-between group aspect-[4/2.5] ${
                    isSelected 
                      ? 'bg-white border-indigo-500/25 shadow-2xl scale-[1.01]' 
                      : 'bg-white/40 border-slate-200/50 shadow-sm opacity-60 hover:opacity-100 hover:border-indigo-500/20'
                  }`}
                >
                  {/* Razor border laser for selected tab */}
                  <div 
                    className="absolute inset-0 rounded-[3.2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                    style={{
                      background: `radial-gradient(120px circle at ${localTabCoords.x}px ${localTabCoords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude'
                    }}
                  />

                  {/* Concentric rotating orbits inside background */}
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-end pointer-events-none opacity-[0.06] z-0 animate-spin" style={{ animationDuration: '12s' }}>
                      <svg className="w-40 h-40">
                        <circle cx="80" cy="80" r="50" className="stroke-indigo-650 fill-none" strokeWidth="1" strokeDasharray="6 6" />
                        <circle cx="80" cy="80" r="70" className="stroke-amber-500 fill-none" strokeWidth="1.5" strokeDasharray="4 8" />
                      </svg>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}>
                    <BookMarked size={20} className={isSelected ? 'animate-pulse' : ''} />
                  </div>

                  <div>
                    <h4 className="text-2xl font-black tracking-tight text-primary uppercase">{item.title}</h4>
                    <div className={`mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                      isSelected ? 'text-indigo-600' : 'text-slate-400'
                    }`}>
                      <span>View Details</span>
                      <ChevronRight size={13} className={isSelected ? 'translate-x-1 transition-transform' : ''} />
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-slate-200 group-hover:border-slate-350 transition-colors" />
                  <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-slate-200 group-hover:border-slate-350 transition-colors" />
                  <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-slate-200 group-hover:border-slate-350 transition-colors" />
                  <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-slate-200 group-hover:border-slate-350 transition-colors" />

                </button>
              );
            })}
          </div>

          {/* Right Column: Cyber-Slate Viewport (Holographic Syllabus Details) */}
          <div className="lg:w-2/3 w-full">
             <AnimatePresence mode="wait">
                {syllabus.map((item) => (
                  item.id === activeTab && (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white/80 border border-slate-200/60 rounded-[4rem] p-12 shadow-2xl backdrop-blur-xl flex flex-col justify-between gap-10 group/console relative overflow-hidden h-full"
                    >
                       {/* Chrome indicator dots bezel */}
                       <div className="flex justify-between items-center border-b border-slate-200 pb-5 mb-4 select-none">
                         <div className="flex gap-2">
                           <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-md shadow-rose-500/10" />
                           <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-md shadow-amber-500/10" />
                           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-md shadow-emerald-500/10" />
                         </div>
                         <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                           <Compass size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
                           <span>Diagnostic_Matrix // Subject_Lock_V3</span>
                         </span>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                          {item.topics.map((topic, i) => (
                             <div key={i} className="space-y-6">
                                <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em] inline-block border-b-4 border-amber-500/15 pb-1 select-none">{topic.subject}</h5>
                                <ul className="space-y-4">
                                   {topic.key.map((point, j) => {
                                     const pId = `${topic.subject}-${point}`;
                                     const isSelfHovered = hoveredTopic === pId;
                                     const isDimmed = hoveredTopic !== null && hoveredTopic !== pId;
                                     
                                     return (
                                       <li 
                                         key={j} 
                                         onMouseEnter={() => setHoveredTopic(pId)}
                                         onMouseLeave={() => setHoveredTopic(null)}
                                         className={`flex items-center gap-3 text-sm font-bold transition-all duration-300 ${
                                           isSelfHovered 
                                             ? 'text-indigo-600 scale-[1.01] translate-x-1' 
                                             : isDimmed
                                               ? 'text-slate-400 opacity-45'
                                               : 'text-slate-650'
                                         }`}
                                       >
                                          {/* Mini target reticle checks */}
                                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                            isSelfHovered ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' : 'border-slate-200 text-transparent bg-white shadow-inner'
                                          }`}>
                                            <Target size={11} className={isSelfHovered ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
                                          </div>
                                          <span>{point}</span>
                                       </li>
                                     );
                                   })}
                                </ul>
                             </div>
                          ))}
                       </div>
                       
                       <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">NST syllabus aligned // BATCH 2026</p>
                          <button 
                             onMouseMove={handleButtonMove}
                             onMouseLeave={handleButtonLeave}
                             onClick={() => {
                               setToastMessage('📲 NST 2026 examination syllabus packet compiling... Commencing secured PDF package download!');
                               setShowToast(true);
                               setTimeout(() => setShowToast(false), 4000);
                             }}
                             className="py-4.5 px-10 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-indigo-500/15"
                           >
                              <Download size={14} className="animate-bounce" />
                              <span>Download Full PDF Syllabus</span>
                           </button>
                       </div>

                       {/* Corner quotes accents */}
                       <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-slate-200" />
                       <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-slate-200" />
                       <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-slate-200" />
                       <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-slate-200" />

                    </motion.div>
                  )
                ))}
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Premium Floating Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-6 bg-slate-950/95 border border-indigo-500/30 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.5)] max-w-sm flex items-start gap-4 text-white"
            style={{
              boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Smartphone size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                Download Initialized <Sparkles size={12} className="text-indigo-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {toastMessage}
              </p>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
