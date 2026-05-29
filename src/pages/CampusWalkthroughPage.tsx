import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Cpu, 
  Sparkles, 
  Compass, 
  Check, 
  Target, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

const campuses = [
  { 
    id: "kothrud",
    name: "Kothrud Tech Campus",
    desc: "Our flagship AIR 1 coaching node. Features quantum learning matrices & real-time response diagnostics.",
    location: "Kothrud, Pune",
    latLong: "18.5074° N, 73.8077° E",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    theme: "from-blue-500 to-indigo-600",
    badge: "AIR 1 Matrix Center"
  },
  { 
    id: "pcmc",
    name: "PCMC Calibration Hub",
    desc: "Focused foundation calibration center featuring interactive spatial testing visualizers & counseling bays.",
    location: "Chinchwad, Pune",
    latLong: "18.6441° N, 73.7974° E",
    img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&q=80&w=800",
    theme: "from-rose-500 to-red-600",
    badge: "Syllabus Calibration Hub"
  },
  { 
    id: "deccan",
    name: "Deccan Strategic Warrooms",
    desc: "Intensive revision and testing warroom node. Built exclusively for Rank Booster dropper batches.",
    location: "Deccan Gymkhana, Pune",
    latLong: "18.5186° N, 73.8415° E",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    theme: "from-amber-500 to-orange-600",
    badge: "Rank Acceleration Node"
  }
];

export const CampusWalkthroughPage = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Selector States
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Parallax Tilts per Card
  const [tilts, setTilts] = useState<Array<{ rotateX: number; rotateY: number }>>([
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 }
  ]);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate next 5 dates (excluding Sundays)
  const [availableDates, setAvailableDates] = useState<{ day: string; dateStr: string; label: string }[]>([]);
  useEffect(() => {
    const list = [];
    let d = new Date();
    while (list.length < 5) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) { // skip Sunday
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const fullDateStr = d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        list.push({
          day: dayName,
          dateStr: dateStr,
          label: fullDateStr
        });
      }
    }
    setAvailableDates(list);
    setSelectedDate(list[0].label);
  }, []);

  const timeSlots = ["10:30 AM", "12:00 PM", "02:30 PM", "04:30 PM", "06:00 PM"];
  useEffect(() => {
    setSelectedSlot(timeSlots[0]);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    setTilts(prev => {
      const next = [...prev];
      next[idx] = {
        rotateX: (yc - y) / 10,
        rotateY: (x - xc) / 10
      };
      return next;
    });
  };

  const handleCardMouseLeave = (idx: number) => {
    setTilts(prev => {
      const next = [...prev];
      next[idx] = { rotateX: 0, rotateY: 0 };
      return next;
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitted(true);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#03050B] text-white min-h-screen relative overflow-hidden select-none pb-36 pt-28"
    >
      {/* Cybernetic Grid Canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Dynamic Cursor Spotlight Glowing Aura */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[130px] z-0"
        style={{
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(244, 63, 94, 0.04) 50%, transparent 100%)`,
          left: `${mousePos.x - 400}px`,
          top: `${mousePos.y - 400}px`,
        }}
      />

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

        {/* HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-wider shadow-xl mb-6">
            <Compass size={12} className="animate-spin-slow" /> 
            Campus Offline Walkthrough Scheduler
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-white select-none">
            Book Offline Campus <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-indigo-500 italic">
              Walkthrough Session
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-bold leading-relaxed mt-6">
            Select your target campus node, reserve your specific slot calendar date, and synchronize your in-person diagnostic sweep.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="booking-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {/* STEP 1: CAMPUS SELECTOR */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 justify-center mb-6">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                    <MapPin size={14} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest">Select Target Campus Node</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {campuses.map((item, idx) => {
                    const isSelected = selectedCampus === idx;
                    const isHovered = hoveredCard === idx;
                    const tilt = tilts[idx] || { rotateX: 0, rotateY: 0 };
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedCampus(idx)}
                        onMouseMove={(e) => handleCardMouseMove(e, idx)}
                        onMouseLeave={() => {
                          setHoveredCard(null);
                          handleCardMouseLeave(idx);
                        }}
                        onMouseEnter={() => setHoveredCard(idx)}
                        style={{
                          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isSelected ? 1.02 : 1})`,
                          boxShadow: isSelected ? '0 25px 50px -12px rgba(99, 102, 241, 0.15)' : 'none',
                          transformStyle: 'preserve-3d'
                        }}
                        className={`p-6 rounded-[2.8rem] border transition-all duration-500 flex flex-col justify-between min-h-[380px] cursor-pointer relative overflow-hidden backdrop-blur-xl ${
                          isSelected 
                            ? 'bg-[#0A0D1A] border-indigo-500/40 text-white z-10' 
                            : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                        }`}
                      >
                        {/* Image banner frame with blueprint brackets */}
                        <div className="aspect-[16/10] rounded-[2rem] overflow-hidden relative mb-6 border border-white/5 relative">
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                              isSelected ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                            }`} 
                          />
                          <div className="absolute top-4 left-4 z-20">
                            <span className="text-[8px] font-mono font-black text-white bg-[#03050B]/85 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-black tracking-tight uppercase mb-2 select-none">{item.name}</h4>
                          <p className={`text-xs font-bold leading-relaxed mb-6 select-none transition-colors ${
                            isSelected ? 'text-indigo-200/70' : 'text-slate-500 group-hover:text-slate-400'
                          }`}>
                            {item.desc}
                          </p>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/5 pt-4 text-[9px] font-mono font-black uppercase tracking-widest text-slate-500">
                          <span>{item.location}</span>
                          <span className={isSelected ? 'text-indigo-400' : 'text-slate-650'}>{item.latLong}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: SCHEDULER MATRIX & INFO */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-white/5 pt-20">
                
                {/* CALENDAR & TIME MATRIX */}
                <div className="lg:col-span-7 space-y-10">
                  {/* Date Selector */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest mb-2">
                      <Calendar size={14} className="text-indigo-400" />
                      <span>Select Target Date</span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-3">
                      {availableDates.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(item.label)}
                          className={`py-4 rounded-2xl flex flex-col items-center justify-center font-mono transition-all duration-300 border ${
                            selectedDate === item.label
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/10 scale-103'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.03] text-slate-400'
                          }`}
                        >
                          <span className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">{item.day}</span>
                          <span className="text-sm font-black">{item.dateStr.split(' ')[0]}</span>
                          <span className="text-[7.5px] font-black uppercase tracking-widest opacity-60 mt-1">{item.dateStr.split(' ')[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slot Selector */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest mb-2">
                      <Clock size={14} className="text-indigo-400" />
                      <span>Select Time Slot</span>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {timeSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-4 rounded-2xl font-mono text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${
                            selectedSlot === slot
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/10 scale-103'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.03] text-slate-400'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* VISITOR DETAILS FORM */}
                <div className="lg:col-span-5">
                  <div className="bg-[#090b16]/75 border border-white/10 rounded-[2.8rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-40 blur-2xl pointer-events-none" />

                    <div className="text-[10px] font-mono font-black text-indigo-400 tracking-widest uppercase mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                      <span>Visitor Details</span>
                      <Sparkles size={12} className="text-amber-400 fill-amber-400 animate-pulse" />
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Type visitor name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#03050B] border border-white/10 rounded-2xl py-4.5 px-6 font-mono text-xs placeholder:text-slate-650 focus:border-indigo-500/40 focus:bg-[#03050B]/90 transition-all leading-normal text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="Type phone vector"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#03050B] border border-white/10 rounded-2xl py-4.5 px-6 font-mono text-xs placeholder:text-slate-650 focus:border-indigo-500/40 focus:bg-[#03050B]/90 transition-all leading-normal text-white"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-97 select-none mt-4 shadow-xl"
                      >
                        <span>Confirm Walkthrough</span>
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto bg-[#090b16]/75 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-40 blur-2xl pointer-events-none" />

              {/* Concentric rotating orbits checking badge */}
              <div className="w-24 h-24 rounded-full border border-orange-500/20 relative flex items-center justify-center shrink-0">
                <div className="absolute -inset-1 border-2 border-dashed border-orange-400/50 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                <div className="absolute -inset-2.5 border border-dotted border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-indigo-500/15 border border-orange-400/45 rounded-[1.4rem] flex items-center justify-center text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.25)] relative">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                  <Check size={28} strokeWidth={3} />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-3xl font-black uppercase tracking-tight text-white">Visit Confirmed</h4>
                <p className="text-slate-400 leading-relaxed text-sm font-semibold max-w-sm px-4">
                  Offline campus diagnostics scheduled successfully! Your visitor pass has been synced at:
                </p>
              </div>

              {/* Digital Holographic Pass Summary */}
              <div className="bg-[#03050B] border border-white/5 rounded-[2rem] p-6 w-full text-left font-mono text-[9px] uppercase tracking-widest text-slate-500 space-y-3 shadow-inner relative">
                <div className="absolute top-4 right-4 text-emerald-400 font-extrabold text-[7.5px] border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded shadow-sm">ACTIVE PASS</div>
                <div className="space-y-1.5">
                  <span className="text-[7.5px] text-slate-600 font-bold block">TARGET NODE</span>
                  <span className="text-white font-bold block">{campuses[selectedCampus].name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                  <div className="space-y-1.5">
                    <span className="text-[7.5px] text-slate-600 font-bold block">DATE</span>
                    <span className="text-white font-bold block">{selectedDate}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[7.5px] text-slate-600 font-bold block">TIME SLOT</span>
                    <span className="text-white font-bold block">{selectedSlot}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                Schedule Another Visit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
