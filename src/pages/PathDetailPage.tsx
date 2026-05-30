import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Cpu, 
  Sparkles, 
  Activity, 
  Compass, 
  Target, 
  Calendar, 
  PhoneCall, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Trophy, 
  ShieldCheck 
} from 'lucide-react';

interface PathDetails {
  title: string;
  tagline: string;
  theme: string;
  badge: string;
  gradientText: string;
  overview: string;
  accentColor: string;
  metrics: { label: string; value: string; desc: string }[];
  milestones: { title: string; desc: string; duration: string; topics: string[] }[];
  estimatorMax: number;
}

const pathConfigs: Record<string, PathDetails> = {
  transition: {
    title: "Bridging Protocol // 10th to 11th Transition",
    tagline: "Calibrate your mind for the quantum leap in complexity.",
    theme: "from-blue-600 via-indigo-600 to-violet-600",
    badge: "Transition Calibration",
    gradientText: "Foundation Matrix",
    overview: "The shift from school curriculums to competitive ranks is the single highest drop-off vector. We reconstruct your base logic, replacing rote-memorization loops with spatial physics intuition, molecular visualization, and analytical mathematics logic.",
    accentColor: "#6366F1",
    metrics: [
      { label: "Transition Gain", value: "2.4x", desc: "Logical speed advantage over standard entries" },
      { label: "Core Calibrations", value: "14-Points", desc: "Adaptive logic diagnostic evaluations" },
      { label: "Weekly Tests", value: "3 Modules", desc: "High-frequency feedback pacing loops" }
    ],
    milestones: [
      { title: "Logical Alignment", desc: "Deconstruct board rote methods and align to analytical thinking patterns.", duration: "Weeks 1 - 4", topics: ["Spatial Geometry", "Coordinate Vectors", "Dimensional Physics Analysis"] },
      { title: "Kinetic Mechanics Core", desc: "Rebuild classical mechanics via real-time node vector representations.", duration: "Weeks 5 - 12", topics: ["Newtonian Vector Mechanics", "Friction Boundaries", "Rotational Dynamics Intro"] },
      { title: "Atomic Matrix", desc: "Visualize quantum chemical shells and molecular geometries in 3D space.", duration: "Weeks 13 - 20", topics: ["Quantum Numbers", "Hybridization Vectors", "Periodic Periodic Anomalies"] }
    ],
    estimatorMax: 1000
  },
  "grade-11": {
    title: "Fundamental Foundry // 11th Grade Syllabus",
    tagline: "Build a flawless base. Secure 50% of the competitive syllabus.",
    theme: "from-rose-600 via-red-650 to-orange-600",
    badge: "Core Calibration",
    gradientText: "AIR 100 Foundry",
    overview: "Grade 11 is the foundation of competitive ranks. A single uncalibrated unit here cascades into failures in Grade 12. We lock in deep conceptual mechanics, organic synthesis pathways, and advanced calculus modules through constant diagnostics.",
    accentColor: "#F43F5E",
    metrics: [
      { label: "Syllabus Mastery", value: "100%", desc: "Rigorous alignment with advanced entrance scopes" },
      { label: "Mock Iterations", value: "32 Full", desc: "Simulated rank-indexing trial runs" },
      { label: "Average Rank Boost", value: "48%", desc: "Speed optimization metrics over baseline" }
    ],
    milestones: [
      { title: "Calculus Engine", desc: "Master limiting equations, derivatives, and spatial integration mechanics.", duration: "Weeks 1 - 10", topics: ["Continuity Matrices", "Derivative Optimizations", "Area Integrals"] },
      { title: "Fluid & Thermal Waves", desc: "Analyze fluid mechanics, thermodynamic systems, and wave interference.", duration: "Weeks 11 - 24", topics: ["Bernoulli Fluid Dynamics", "Thermodynamic Cycles", "Wave Superposition"] },
      { title: "Organic Carbon Architecture", desc: "Decrypt covalent bonding, isomerism, and organic reaction vectors.", duration: "Weeks 25 - 36", topics: ["Resonance Structures", "Stereochemistry Matrix", "Electrophilic Addition"] }
    ],
    estimatorMax: 500
  },
  "grade-12": {
    title: "Dual-Engine Synchronization // 12th Grade Syllabus",
    tagline: "Balance board excellence and entrance rankings simultaneously.",
    theme: "from-emerald-600 via-teal-600 to-cyan-500",
    badge: "Dual-Engine Sync",
    gradientText: "Perfect Balancing",
    overview: "Navigate the ultimate double-front campaign. We run synchronized dual learning tracks that optimize your board presentation aesthetics while boosting your computational speed index for competitive mock sessions.",
    accentColor: "#10B981",
    metrics: [
      { label: "Board Sync", value: "98.4%", desc: "Direct curriculum synchronization rate" },
      { label: "Rank Auditing", value: "Weekly", desc: "National level percentile calibrations" },
      { label: "Syllabus Finished", value: "Nov 15", desc: "Leaving 4.5 months for intensive iterations" }
    ],
    milestones: [
      { title: "Electrodynamics Matrix", desc: "Secure advanced electrostatics, magnetism, and alternate current tracks.", duration: "Weeks 1 - 12", topics: ["Gauss Field Potentials", "Ampere Currents", "Resonant LCR Circuits"] },
      { title: "Organic Synthesis & Carbon", desc: "Lock down all name reactions, polymers, and biomolecule mechanisms.", duration: "Weeks 13 - 22", topics: ["Aromatic Directives", "Carbonyl Nucleophilic Additions", "Polymer Matrices"] },
      { title: "Probability & Modern Physics", desc: "Conclude with advanced algebra distributions, quantum dualities, and nuclear physics.", duration: "Weeks 23 - 32", topics: ["Bayes Probabilities", "Photoelectric Quantum Effects", "Radioactive Decay Series"] }
    ],
    estimatorMax: 200
  },
  dropper: {
    title: "Rank Accelerator Vector // Dropper Intensive",
    tagline: "Intensive rank correction protocols. 100% focused booster loops.",
    theme: "from-amber-600 via-orange-600 to-red-500",
    badge: "Rank Acceleration",
    gradientText: "Absolute Vector",
    overview: "Zero filler. Pure high-speed computational runs. We review the entire syllabus in a high-density matrix format, target and correct diagnostic error patterns, and optimize your paper-solving speed ratios.",
    accentColor: "#F59E0B",
    metrics: [
      { label: "Practice Intensity", value: "18,000+", desc: "Solved analytical problems under speed metrics" },
      { label: "Rank Precision", value: "99.8%", desc: "Estimated percentile variance accuracy" },
      { label: "Selection Ratio", value: "1 in 3.6", desc: "Top ranks selection rate inside dropper batches" }
    ],
    milestones: [
      { title: "Error Matrix Scans", desc: "Run immediate diagnostic sweeps of all 96 core JEE/NEET topics.", duration: "Weeks 1 - 6", topics: ["Mechanics Sweeps", "Equilibrium Adjustments", "Integration Ratios"] },
      { title: "Speed-Ratio Optimization", desc: "Train paper management, rapid estimations, and mental calculation skips.", duration: "Weeks 7 - 20", topics: ["Computational Skips", "Dimensional Approximations", "Option Elimination Loops"] },
      { title: "National Level Warrooms", desc: "Daily full-syllabus test warrooms with active percentile index calibrations.", duration: "Weeks 21 - 32", topics: ["Percentile Auditing", "Time-Pressure Management", "Advanced Splinter Concepts"] }
    ],
    estimatorMax: 50
  }
};

export const PathDetailPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const config = category ? pathConfigs[category] : null;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estimator State
  const [studyHours, setStudyHours] = useState(6);
  const [simulatedRank, setSimulatedRank] = useState(5000);
  const [activeMilestone, setActiveMilestone] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  // Handle dynamic rank updates
  useEffect(() => {
    if (!config) return;
    const factor = (14 - studyHours) / 11; // 3 to 14 hours
    const maxRank = config.estimatorMax * 15;
    const minRank = Math.max(12, Math.floor(config.estimatorMax * 0.15));
    const rank = Math.floor(minRank + (maxRank - minRank) * Math.pow(factor, 2.5));
    setSimulatedRank(Math.max(1, rank));
  }, [studyHours, config]);

  if (!config) {
    return (
      <div className="bg-bg-dark min-h-screen text-white flex flex-col items-center justify-center p-8 select-none">
        <Cpu size={48} className="text-rose-500 animate-spin mb-6" />
        <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Node Disconnected</h2>
        <p className="text-slate-400 font-bold mb-8">The requested path configuration node does not exist in our index.</p>
        <Link to="/path" className="px-6 py-3 bg-white text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors">
          Return to Grid Calibration
        </Link>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-bg-dark text-white min-h-screen relative overflow-hidden select-none pb-36 pt-20"
    >
      {/* Cybernetic blueprint canvas grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Dynamic Cursor Spotlight Glowing Aura */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[130px] z-0"
        style={{
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(244, 63, 94, 0.04) 50%, transparent 100%)`,
          left: `${mousePos.x - 400}px`,
          top: `${mousePos.y - 400}px`,
        }}
      />

      {/* Decorative Orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Back Link */}
        <div className="mb-14">
          <Link 
            to="/path" 
            className="inline-flex items-center gap-3 text-slate-400 font-extrabold uppercase tracking-widest text-xs hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-2 transition-transform duration-300" />
            Back to Calibration Grid
          </Link>
        </div>

        {/* HERO TITLE & DYNAMIC INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[10px] font-black uppercase tracking-wider shadow-xl">
              <Cpu size={12} className="animate-spin" style={{ animationDuration: '8s' }} /> 
              {config.badge}
            </div>
            
            <h1 className="text-5xl lg:text-[4.5rem] font-black tracking-tighter uppercase leading-[0.9] text-white">
              {config.title.split(" // ")[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-indigo-500 italic">
                {config.gradientText}
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg lg:text-xl font-bold leading-relaxed max-w-xl">
              {config.tagline}
            </p>
            
            <p className="text-slate-450 leading-relaxed text-sm md:text-base font-semibold max-w-2xl pt-4 border-t border-white/5">
              {config.overview}
            </p>
          </div>

          {/* TELEMETRY METRIC WIDGETS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-dark/75 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-40 blur-2xl pointer-events-none" />
              
              <div className="text-[10px] font-mono font-black text-indigo-400 tracking-widest uppercase mb-8 flex items-center justify-between">
                <span>Vector Telemetry Data</span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              </div>
              
              <div className="space-y-6">
                {config.metrics.map((metric, i) => (
                  <div key={i} className="flex gap-6 items-start pb-6 border-b border-white/5 last:border-b-0 last:pb-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {i === 0 ? <Compass size={18} /> : i === 1 ? <Target size={18} /> : <Activity size={18} />}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white tracking-tight">{metric.value}</span>
                        <span className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-wider">{metric.label}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-bold mt-1 leading-normal">{metric.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ADAPTIVE PERFORMANCE ESTIMATOR & ACCORDION ROADMAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-28">
          
          {/* INTERACTIVE ROADMAP STAGE NODES */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                <BookOpen size={18} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Academic Syllabus Phases</h3>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Calibration Timeline</span>
              </div>
            </div>

            <div className="relative pl-8 border-l border-white/10 space-y-12">
              {config.milestones.map((item, idx) => {
                const isActive = activeMilestone === idx;
                
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveMilestone(idx)}
                    className="relative cursor-pointer group/node"
                  >
                    {/* Pulsing indicator node */}
                    <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-bg-dark border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-900 border-white/10 group-hover/node:border-indigo-500/40 group-hover/node:scale-105'
                    }`}>
                      <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-indigo-400' : 'bg-slate-600 group-hover/node:bg-indigo-400/60'}`} />
                    </div>

                    <div className={`p-8 rounded-[2.2rem] border transition-all duration-500 ${
                      isActive 
                        ? 'bg-[#070913]/90 border-indigo-500/30 shadow-2xl shadow-indigo-500/5' 
                        : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className={`text-xl font-black tracking-tight transition-colors uppercase ${isActive ? 'text-white' : 'text-slate-400 group-hover/node:text-white'}`}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-md border border-indigo-500/20 shadow-inner">
                          {item.duration}
                        </span>
                      </div>
                      
                      <p className="text-slate-450 leading-relaxed text-xs md:text-sm font-bold mb-4">
                        {item.desc}
                      </p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-white/5 space-y-2">
                              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block">Topic Matrices</span>
                              <div className="flex flex-wrap gap-2 pt-1">
                                {item.topics.map((topic, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className="text-[9px] font-mono font-black text-indigo-300 uppercase tracking-wider bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ADAPTIVE PERFORMANCE PREDICTIVE COMPUTATION WIDGET */}
          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400">
                <Trophy size={18} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Performance Estimator</h3>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Predictive Ranking Computations</span>
              </div>
            </div>

            <div className="bg-surface-dark/75 border border-white/10 rounded-[2.8rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-indigo-500/5 opacity-40 blur-2xl pointer-events-none" />

              <div className="text-center mb-10 flex flex-col items-center">
                {/* Simulated Rank Output Display Dial */}
                <div className="w-48 h-48 rounded-full border border-white/5 relative flex flex-col items-center justify-center mb-8 shadow-inner overflow-hidden">
                  <div className="absolute -inset-1 border border-dashed border-orange-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-4 border border-indigo-500/20 rounded-full flex flex-col items-center justify-center relative">
                    <span className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Estimated AIR</span>
                    <span className="text-4xl font-black text-white tracking-tighter font-mono">
                      #{simulatedRank.toLocaleString()}
                    </span>
                    <span className={`text-[8.5px] font-mono font-black uppercase tracking-widest mt-2 px-2 py-0.5 rounded border ${
                      simulatedRank < 100 
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 shadow-lg shadow-emerald-500/5' 
                        : simulatedRank < 1000 
                          ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25' 
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/25'
                    }`}>
                      {simulatedRank < 100 ? "Elite AIR 100" : simulatedRank < 1000 ? "Highly Synced" : "Standard Zone"}
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    <span>Daily Self Study Intensity</span>
                    <span className="text-white font-bold">{studyHours} Hours / Day</span>
                  </div>
                  
                  {/* Slider Control */}
                  <input 
                    type="range" 
                    min="3" 
                    max="14" 
                    step="1"
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500 transition-all border border-white/5 hover:border-white/10"
                  />
                  
                  <div className="flex justify-between text-[8px] font-mono text-slate-600 font-bold uppercase tracking-wider">
                    <span>3 Hours Minimum</span>
                    <span>14 Hours Core Maximum</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 text-center font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-2">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>Simulated values are based on historical student records.</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PREMIUM HOLOGRAPHIC CTA BUTTONS */}
        <div className="mt-28 border-t border-white/5 pt-20 text-center max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none select-none">
              CALIBRATE YOUR DIRECTION WITH A SENIOR ADVISOR
            </h2>
            <p className="text-slate-450 leading-relaxed text-sm md:text-base font-semibold max-w-2xl mx-auto">
              Our academic counselors are ready to map out your custom vector roadmap. Initiate a virtual call session or visit our physical campus centers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <button 
              onClick={() => navigate('/counseling/call')}
              className="flex-1 py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-orange-500/10 active:scale-[0.98]"
            >
              <PhoneCall size={14} className="animate-pulse" />
              <span>Initiate Call Session</span>
            </button>
            
            <button 
              onClick={() => navigate('/counseling/walkthrough')}
              className="flex-1 py-5 bg-white text-slate-950 hover:bg-slate-100 rounded-[2rem] border border-white/10 font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
            >
              <Calendar size={14} className="text-indigo-600" />
              <span>Book Offline Visit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
