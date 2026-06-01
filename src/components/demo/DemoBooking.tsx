import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, MessageCircle, Sparkles, Check } from 'lucide-react';

const FloatingInput = ({ 
  label, 
  type, 
  value, 
  onChange, 
  required = false, 
  placeholder = "",
  index
}: { 
  label: string; 
  type: string; 
  value: string; 
  onChange: (e: any) => void; 
  required?: boolean; 
  placeholder?: string;
  index: number;
}) => {
  const [focused, setFocused] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isFloating = focused || value !== "";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-[2.2rem] p-1 transition-all duration-500 border ${
        focused 
          ? 'border-indigo-500/40 bg-white shadow-[0_0_50px_rgba(99,102,241,0.06)]' 
          : 'border-slate-100 bg-white/40 hover:bg-white/80'
      }`}
    >
      {/* Spotlight tracking cursor */}
      <div
        className="absolute inset-0 rounded-[2.2rem] pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: focused ? 1 : 0,
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.04), transparent 80%)`,
        }}
      />

      {/* Border laser sweep */}
      <div 
        className="absolute inset-0 rounded-[2.2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.3), transparent 80%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <div className="relative z-10">
        <label 
          className={`absolute left-6 transition-all duration-300 pointer-events-none select-none ${
            isFloating 
              ? 'top-2.5 text-[8.5px] font-black text-indigo-500 uppercase tracking-widest' 
              : 'top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400'
          }`}
        >
          {label}
        </label>
        <input
          type={type}
          required={required}
          value={value}
          placeholder={focused ? placeholder : ""}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-6 pt-7 pb-3 bg-transparent outline-none font-bold text-primary text-sm"
        />
      </div>

      {/* Expanding bottom laser underline */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-500 ${
        focused ? 'w-4/5 opacity-100' : 'w-0 opacity-0'
      }`} />
    </div>
  );
};

const BookingSlotCard = ({
  slot,
  index,
  isSelected,
  onSelect,
  hoveredSlot,
  setHoveredSlot
}: {
  slot: { date: string; time: string; label: string; seats: string; status: string };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  hoveredSlot: number | null;
  setHoveredSlot: (i: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLButtonElement>(null);

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
    setHoveredSlot(index);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredSlot(null);
  };

  const isSelfHovered = hoveredSlot === index;
  const isDimmed = hoveredSlot !== null && hoveredSlot !== index && !isSelected;

  let statusBadge = "bg-indigo-50 border-indigo-100 text-indigo-600";
  if (slot.status === 'CRITICAL') statusBadge = "bg-rose-50 border-rose-100 text-rose-600";
  else if (slot.status === 'FILLING FAST') statusBadge = "bg-amber-50 border-amber-100 text-amber-600";

  return (
    <motion.button
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 rounded-[2.5rem] bg-white border-2 text-left flex items-center justify-between transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/slot ${
        isSelected 
          ? 'border-indigo-600 shadow-xl scale-[1.015]' 
          : isSelfHovered
            ? 'border-indigo-400 bg-white shadow-lg'
            : 'border-slate-100/85 bg-white/40'
      } ${isDimmed ? 'opacity-45 blur-[0.5px]' : 'opacity-100'}`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered || isSelected ? 1.015 : 1}, ${isSelfHovered || isSelected ? 1.015 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.04), transparent 80%)`,
        }}
      />

      {/* Border laser sweep */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/slot:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(110px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-inner shrink-0 ${
          isSelected || isSelfHovered
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
            : 'bg-slate-50 border-slate-100 text-slate-500'
        }`}>
          <Calendar size={22} className={isSelected ? 'animate-pulse' : ''} />
        </div>
        
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5 font-mono text-[9px] uppercase font-bold tracking-widest text-slate-400">
            <span className={isSelected || isSelfHovered ? 'text-indigo-600' : ''}>
              {slot.date} @ {slot.time}
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${statusBadge}`}>
              {slot.seats}
            </span>
          </div>
          <div className="font-black text-lg text-primary tracking-tight">{slot.label}</div>
        </div>
      </div>

      <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all ${
        isSelected 
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105' 
          : 'border-slate-200 text-transparent bg-slate-50 hover:bg-slate-100'
      }`}>
        <Check size={16} strokeWidth={3.5} />
      </div>

      {/* Decorative Corner Quotes Accents */}
      <div className="absolute top-5 left-5 w-2.5 h-2.5 border-t border-l border-slate-200/50 group-hover/slot:border-indigo-500/20 transition-colors" />
      <div className="absolute top-5 right-5 w-2.5 h-2.5 border-t border-r border-slate-200/50 group-hover/slot:border-indigo-500/20 transition-colors" />
      <div className="absolute bottom-5 left-5 w-2.5 h-2.5 border-b border-l border-slate-200/50 group-hover/slot:border-indigo-500/20 transition-colors" />
      <div className="absolute bottom-5 right-5 w-2.5 h-2.5 border-b border-r border-slate-200/50 group-hover/slot:border-indigo-500/20 transition-colors" />
    </motion.button>
  );
};

export const DemoBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [grade, setGrade] = useState("");

  const slots = [
    { date: "TOMORROW", time: "10:30 AM", label: "Mathematics - Calculus", seats: "2 seats left", status: "FILLING FAST" },
    { date: "WED, MAY 15", time: "04:00 PM", label: "Physics - Optics", seats: "4 seats left", status: "LIMITED" },
    { date: "THU, MAY 16", time: "11:00 AM", label: "Chemistry - Organic", seats: "5 seats left", status: "LIMITED" },
    { date: "SAT, MAY 18", time: "06:00 PM", label: "Strategy - JEE Adv", seats: "1 seat left", status: "CRITICAL" }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsBooked(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsBooked(false);
    setSelectedSlot(null);
    setName("");
    setMobile("");
    setGrade("");
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Magnetic Button Effect
  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.01)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="pt-12 pb-32 bg-[#FAF9F6] relative overflow-hidden" 
      id="booking-section"
    >
      {/* Background Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.04), transparent 80%)`
        }}
      />
      {/* Grid Mesh Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          {/* Slots Selector Panel */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
               <h2 className="text-5xl font-black text-primary tracking-tighter mb-10 uppercase leading-tight select-none overflow-visible py-1">
                 Available{" "}
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black px-1">Slots.</span>
               </h2>
               
               <div className="grid grid-cols-1 gap-5 mb-12">
                  {slots.map((slot, i) => (
                    <BookingSlotCard
                      key={i}
                      slot={slot}
                      index={i}
                      isSelected={selectedSlot === i}
                      onSelect={() => setSelectedSlot(i)}
                      hoveredSlot={hoveredSlot}
                      setHoveredSlot={setHoveredSlot}
                    />
                  ))}
               </div>
            </div>

            {/* WhatsApp Contact Glass Card */}
            <div className="p-8 rounded-[3rem] bg-white/60 backdrop-blur-xl border border-slate-200/50 flex items-start gap-6 shadow-sm hover:shadow-md transition-all group">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner relative">
                  <span className="absolute inset-0 rounded-2xl border-2 border-emerald-500/25 animate-ping pointer-events-none" />
                  <MessageCircle size={24} />
               </div>
               <div>
                  <h4 className="font-black text-primary mb-1 text-base uppercase">WhatsApp Counselor Desk</h4>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-4">Can't find a suitable slot? Dialogue with our academic coordinators directly and we'll arrange a dedicated custom session.</p>
                  <a href="#" className="inline-flex items-center gap-1 font-black text-[10px] uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors">
                    <span>Chat Now on WhatsApp</span> 
                    <ChevronRight size={13} className="animate-pulse" />
                  </a>
               </div>
            </div>
          </div>

          {/* Registration Form Panel */}
          <div className="lg:w-1/2">
             <motion.div
               layout
               className="bg-white/80 backdrop-blur-2xl rounded-[4rem] p-10 md:p-14 h-full border border-slate-200/50 shadow-2xl relative overflow-hidden flex flex-col justify-center"
             >
                {/* Decorative brackets */}
                <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-slate-200/50" />
                <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-slate-200/50" />
                <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-slate-200/50" />
                <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-slate-200/50" />

                <AnimatePresence mode="wait">
                  {isBooked ? (
                    <motion.div 
                       key="success"
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0 }}
                       className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                       <div className="w-28 h-28 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-2xl relative">
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                            className="absolute -top-1 -right-1 text-amber-500"
                          >
                            <Sparkles size={26} className="animate-bounce" />
                          </motion.div>
                          
                          {/* HUD target graphic */}
                          <svg className="w-16 h-16 text-indigo-600" viewBox="0 0 52 52">
                            <motion.circle 
                              cx="26" cy="26" r="24" 
                              className="stroke-indigo-600 fill-none" 
                              strokeWidth="3.5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.7, ease: "easeInOut" }}
                            />
                            <motion.path 
                              d="M14.1 27.2l7.1 7.2 16.7-16.8"
                              className="stroke-indigo-600 fill-none" 
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
                            />
                          </svg>
                       </div>
                       


                       <h3 className="text-4xl font-black text-primary mb-3 tracking-tighter uppercase leading-none select-none">Seat Secured!</h3>
                       <p className="text-slate-500 text-sm font-semibold mb-10 max-w-sm leading-relaxed italic-small">
                         We have reserved your live walkthrough demo class. Preparation materials and access tokens have been dispatched to your mobile.
                       </p>
                       <button onClick={handleReset} className="py-4 px-10 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20">Reset Booking</button>
                    </motion.div>
                  ) : (
                    <motion.form 
                       key="form"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       onSubmit={handleBooking} 
                       className="space-y-6 relative z-10"
                    >
                       <div>
                          <h3 className="text-3xl font-black text-primary tracking-tighter mb-2 uppercase leading-none">Seat Registration</h3>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Provide details below to deploy your seat reservation.</p>
                       </div>
                       
                       <div className="space-y-5">
                          <FloatingInput 
                            label="Student Name" 
                            type="text" 
                            required 
                            value={name} 
                            onChange={(e: any) => setName(e.target.value)} 
                            placeholder="Full Name"
                            index={0}
                          />
                          <FloatingInput 
                            label="Mobile Number" 
                            type="tel" 
                            required 
                            value={mobile} 
                            onChange={(e: any) => setMobile(e.target.value)} 
                            placeholder="+91 XXXX XXXX"
                            index={1}
                          />

                          {/* Grade chips with cooperative dimming physics */}
                          <div className="space-y-2.5 ml-1">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Academic Grade</label>
                            <div className="flex gap-3">
                              {[
                                { val: "11", label: "Grade 11" },
                                { val: "12", label: "Grade 12" },
                                { val: "dropper", label: "Dropper" }
                              ].map(g => {
                                const isSelected = grade === g.val;
                                const isDimmed = grade !== "" && grade !== g.val;
                                return (
                                  <button
                                    type="button"
                                    key={g.val}
                                    onClick={() => setGrade(g.val)}
                                    className={`flex-1 py-4.5 px-4 rounded-2xl border text-center font-black text-[11px] uppercase tracking-wider transition-all duration-300 relative overflow-hidden ${
                                      isSelected 
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20 scale-[1.03]' 
                                        : isDimmed
                                          ? 'bg-white border-slate-100 text-slate-400 opacity-55 scale-[0.98]'
                                          : 'bg-white border-slate-150 text-slate-500 hover:border-indigo-300 hover:scale-[1.01]'
                                    }`}
                                  >
                                    {g.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                       </div>

                       <div className="pt-4">
                          <button 
                            type="submit"
                            onMouseMove={handleButtonMove}
                            onMouseLeave={handleButtonLeave}
                            disabled={selectedSlot === null || grade === "" || isLoading}
                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-4 transition-all hover:bg-indigo-700 disabled:opacity-40 disabled:grayscale shadow-xl shadow-indigo-500/15"
                          >
                             {isLoading ? (
                               <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                             ) : selectedSlot === null ? (
                               'Select Available Slot First'
                             ) : grade === "" ? (
                               'Select Current Grade First'
                             ) : (
                               'Secure Live Demo Seat'
                             )}
                          </button>
                          <p className="text-center mt-4 text-[8px] font-black text-slate-500 uppercase tracking-widest opacity-60">Instant confirmation via SMS & WhatsApp desk.</p>
                       </div>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
