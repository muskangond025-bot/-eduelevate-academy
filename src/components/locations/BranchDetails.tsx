import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Send, ShieldCheck, Sparkles, Terminal, Activity } from 'lucide-react';

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

const BranchInfoItem = ({
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
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        type: "spring", 
        stiffness: 60, 
        damping: 15, 
        delay: index * 0.12 
      }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex gap-6 items-start ${
          isSelfHovered
            ? 'scale-[1.02] bg-white border-indigo-500/30 shadow-[0_15px_30px_rgba(99,102,241,0.05)]'
            : isDimmed
              ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20 bg-white/20'
              : 'bg-white/40 border-slate-200/50 shadow-sm'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${-tilt.y * 5}deg) rotateY(${tilt.x * 5}deg)`,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Border laser sweep highlight trailing cursor inside card */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
          style={{
            background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
            padding: '1.2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Sparks Trail */}
        <SparkParticlesTrail coords={coords} colorClass="bg-indigo-500" />

        {/* Concentric spin HUD circles around branch icon */}
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-650 shadow-sm shrink-0 relative" style={{ transform: "translateZ(20px)" }}>
          <div className="absolute inset-[-4px] border border-dashed border-indigo-300/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: "relative z-10" })}
        </div>

        <div style={{ transform: "translateZ(10px)" }}>
          <h4 className="text-lg font-black text-slate-800 mb-1 tracking-tight">{item.title}</h4>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MagneticSubmitButton = ({
  children,
  onClick,
  className,
  laserColor = "rgba(255, 255, 255, 0.45)"
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

    setBtnCoords({ x, y });
    setPosition({
      x: (x - centerX) * 0.15,
      y: (y - centerY) * 0.15
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onClick={onClick}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(40px circle at ${btnCoords.x}px ${btnCoords.y}px, ${laserColor}, transparent 80%)`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3" style={{ transform: "translateZ(10px)" }}>
        {children}
      </span>
    </motion.button>
  );
};

export const BranchDetails = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [formCoords, setFormCoords] = useState({ x: 0, y: 0 });
  const [formTilt, setFormTilt] = useState({ x: 0, y: 0 });
  const [isFormHovered, setIsFormHovered] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [studentName, setStudentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [program, setProgram] = useState('JEE Preparation');
  const [query, setQuery] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapTilt, setMapTilt] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleFormMouseMove = (e: React.MouseEvent) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setFormCoords({ x, y });
    setFormTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsFormHovered(true);
  };

  const handleFormMouseLeave = () => {
    setFormTilt({ x: 0, y: 0 });
    setIsFormHovered(false);
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setMapTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
  };

  const handleMapMouseLeave = () => {
    setMapTilt({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !phoneNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const branchDetailsList = [
    { title: "Kothrud Hub", desc: "102, Platinum Square, Near DP Road, Kothrud, Pune - 411038", icon: <MapPin /> },
    { title: "Contact", desc: "+91 98765 43210 / 020-456789", icon: <Phone /> },
    { title: "Working Hours", desc: "Mon - Sat: 9:00 AM - 8:30 PM (Sunday: Open for Mock Tests)", icon: <Clock /> }
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="pt-12 pb-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight nebulae cursor tracking */}
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

      {/* Layout lines guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column - Branch Info & Mock Interactive Map Viewport Console */}
          <div className="space-y-12">
            <div>
              {/* Header reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="mb-8 select-none"
              >
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
                  Branch <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic">Info.</span>
                </h2>
                <div className="h-[2px] w-12 bg-indigo-500 mt-3" />
              </motion.div>

              {/* Cards details block with cooperative dimming */}
              <div className="space-y-6">
                {branchDetailsList.map((item, idx) => (
                  <BranchInfoItem
                    key={idx}
                    item={item}
                    index={idx}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                  />
                ))}
              </div>
            </div>

            {/* Premium Cyber Bezel Google Map Viewport Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.35 }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              className="w-full"
            >
              <div 
                ref={mapRef}
                onMouseMove={handleMapMouseMove}
                onMouseLeave={handleMapMouseLeave}
                className="relative select-none"
                style={{
                  transform: `perspective(1000px) rotateX(${-mapTilt.y * 3.5}deg) rotateY(${mapTilt.x * 3.5}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="bg-slate-900 rounded-[3.5rem] border-8 border-slate-200/80 overflow-hidden shadow-2xl relative" style={{ transform: "translateZ(10px)" }}>


                  <div className="aspect-video bg-[#060813] flex items-center justify-center relative overflow-hidden">
                    {/* Dotted target lines backdrop */}
                    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    <div className="absolute inset-8 border border-white/5 rounded-full pointer-events-none" />
                    <div className="absolute inset-16 border border-white/5 rounded-full pointer-events-none animate-pulse" />

                    {/* Active horizontal map scanning laser sweep */}
                    <motion.div
                      animate={{ y: ["0%", "100%", "0%"] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent pointer-events-none z-10"
                    />

                    {/* Center MapPin and reticle orbits */}
                    <div className="relative text-center z-10 shrink-0">
                      <div className="absolute inset-[-14px] border border-dashed border-indigo-500/30 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                      <div className="absolute inset-[-24px] border border-dotted border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                      <MapPin size={42} className="text-indigo-400 mx-auto animate-bounce relative z-10" />
                    </div>


                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Premium Frosted Form Registration Bezel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 55, damping: 15, delay: 0.15 }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="w-full h-full"
          >
            <motion.div
              ref={formCardRef}
              onMouseMove={handleFormMouseMove}
              onMouseLeave={handleFormMouseLeave}
              className="p-12 rounded-[4rem] border transition-all duration-500 overflow-hidden bg-white/40 border-slate-200/50 backdrop-blur-xl shadow-3xl flex flex-col relative h-full"
              style={{
                transform: `perspective(1000px) rotateX(${-formTilt.y * 3.5}deg) rotateY(${formTilt.x * 3.5}deg) scale3d(${isFormHovered ? 1.015 : 1}, ${isFormHovered ? 1.015 : 1}, 1)`,
                transformStyle: "preserve-3d"
              }}
            >
            {/* Border laser sweep highlight trailing cursor inside card */}
            <div
              className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
              style={{
                background: `radial-gradient(150px circle at ${formCoords.x}px ${formCoords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
                padding: '1.2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            {/* Sparks Trail */}
            <SparkParticlesTrail coords={formCoords} colorClass="bg-indigo-500" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                  className="w-full flex flex-col"
                >
                  <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight select-none" style={{ transform: "translateZ(25px)" }}>
                    Visit the Center.
                  </h3>
                  <p className="text-slate-500 font-medium mb-10 text-sm select-none" style={{ transform: "translateZ(15px)" }}>
                    Fill out the form to schedule a free counseling session at this branch.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6" style={{ transform: "translateZ(20px)" }}>
                    
                    {/* Double row fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="relative group/input flex-1">
                        <input 
                          type="text" 
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          onFocus={() => setFocusedField('studentName')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-800 font-bold text-sm transition-all focus:bg-white" 
                        />
                        <label 
                          className={`absolute left-8 top-1/2 -translate-y-1/2 font-sans text-xs font-semibold tracking-wide transition-all pointer-events-none select-none ${
                            focusedField === 'studentName' || studentName 
                              ? 'text-indigo-650 translate-y-[-235%] bg-[#FAF9F6] px-2 scale-90 border border-indigo-500/10 rounded-md font-bold' 
                              : 'text-slate-400'
                          }`}
                        >
                          Student Name
                        </label>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-indigo-500 transition-all duration-300" 
                          style={{ width: focusedField === 'studentName' ? '100%' : '0%' }}
                        />
                      </div>

                      {/* Phone input */}
                      <div className="relative group/input flex-1">
                        <input 
                          type="tel" 
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          onFocus={() => setFocusedField('phoneNumber')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-800 font-bold text-sm transition-all focus:bg-white" 
                        />
                        <label 
                          className={`absolute left-8 top-1/2 -translate-y-1/2 font-sans text-xs font-semibold tracking-wide transition-all pointer-events-none select-none ${
                            focusedField === 'phoneNumber' || phoneNumber 
                              ? 'text-indigo-650 translate-y-[-235%] bg-[#FAF9F6] px-2 scale-90 border border-indigo-500/10 rounded-md font-bold' 
                              : 'text-slate-400'
                          }`}
                        >
                          Phone Number
                        </label>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-indigo-500 transition-all duration-300" 
                          style={{ width: focusedField === 'phoneNumber' ? '100%' : '0%' }}
                        />
                      </div>

                    </div>

                    {/* Program dropdown */}
                    <div className="relative group/input">
                      <select 
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        onFocus={() => setFocusedField('program')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-8 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-800 font-bold text-sm transition-all focus:bg-white appearance-none cursor-pointer"
                      >
                        <option>JEE Preparation</option>
                        <option>NEET Preparation</option>
                        <option>Foundation (8th-10th)</option>
                        <option>Scholarship Inquiry</option>
                      </select>
                      <label className="absolute left-8 top-[-9px] font-sans text-[11px] tracking-wide text-indigo-650 bg-[#FAF9F6] px-2 scale-90 border border-indigo-500/10 rounded-md font-bold select-none">
                        Interested Program
                      </label>
                    </div>

                    {/* Query textarea */}
                    <div className="relative group/input">
                      <textarea 
                        rows={4} 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocusedField('query')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-800 font-bold text-sm transition-all focus:bg-white resize-none" 
                        placeholder="Ask about batches, fees or faculty..."
                      />
                      <label className="absolute left-8 top-[-9px] font-sans text-[11px] tracking-wide text-indigo-650 bg-[#FAF9F6] px-2 scale-90 border border-indigo-500/10 rounded-md font-bold select-none">
                        Your Query
                      </label>
                    </div>

                    {/* Holographic Magnetic Action button */}
                    <MagneticSubmitButton
                      onClick={() => {}}
                      className="w-full py-5.5 bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 text-white font-black hover:scale-[1.02] shadow-xl"
                      laserColor="rgba(255, 255, 255, 0.45)"
                    >
                      <span>{isSubmitting ? "Sending Inquiry..." : "Send Inquiry"}</span>
                      {!isSubmitting && <Send size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform text-white shrink-0" />}
                    </MagneticSubmitButton>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }}
                  className="w-full flex flex-col items-center text-center select-none"
                >
                  {/* Verified check orbits */}
                  <div className="relative mb-8 w-20 h-20 flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                    <div className="absolute inset-[-4px] border border-dashed border-emerald-400 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                    <div className="absolute inset-[-12px] border border-dotted border-emerald-400/40 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                      className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 z-10"
                    >
                      <ShieldCheck size={26} />
                    </motion.div>
                  </div>

                  <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight uppercase" style={{ transform: "translateZ(20px)" }}>
                    Inquiry Submitted
                  </h3>
                  <p className="text-xs font-semibold text-emerald-500 tracking-wide mb-8">
                    Your inquiry has been successfully recorded.
                  </p>

                  <p className="text-slate-500 leading-relaxed font-semibold max-w-sm text-sm mb-10" style={{ transform: "translateZ(10px)" }}>
                    Thank you, **{studentName}**! Your inquiry regarding **{program}** has been received. A branch coordinator will reach out to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>


          </motion.div>
        </motion.div>

        </div>
      </div>
    </section>
  );
};
