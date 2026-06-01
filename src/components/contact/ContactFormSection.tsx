import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, ShieldCheck, Terminal, ArrowRight, User, Phone, BookOpen, MessageSquare } from 'lucide-react';

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
  laserColor = "rgba(255, 255, 255, 0.45)",
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  laserColor?: string;
  disabled?: boolean;
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
      disabled={disabled}
      className={`relative overflow-hidden group/btn font-black uppercase tracking-[0.15em] text-xs rounded-2xl flex items-center justify-center gap-3 transition-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && !disabled && (
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

export const ContactFormSection = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [domain, setDomain] = useState("JEE");
  const [detail, setDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Card Parallax Tilt states
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const formCardRef = useRef<HTMLDivElement>(null);
  const [isFormHovered, setIsFormHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleFormMouseMove = (e: React.MouseEvent) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
    setIsFormHovered(true);
  };

  const handleFormMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsFormHovered(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !detail) {
      alert("Please fill in all inquiry parameters.");
      return;
    }

    setSubmitting(true);
    setLogs(["BOOT: CONNECTING INQUIRY_CELL..."]);

    const simLogs = [
      "AUTH: VALIDATING CREDENTIALS",
      "INTEGRITY CHECK: SECURE HANDSHAKE COMPLETED",
      "DB_UPDATE: COMMITTING ENQUIRY ROW",
      "SUCCESS: DISPATCHING SMS & EMAIL TRIGGERS"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < simLogs.length) {
        setLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${simLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(interval);
        setSubmitting(false);
        setSuccess(true);
      }
    }, 300);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="pt-0 pb-8 bg-[#FAF9F6] relative overflow-hidden select-none"
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
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(250, 249, 246, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Spark Particle Trails */}
      <SparkParticlesTrail coords={coords} colorClass="bg-orange-400" />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter uppercase italic leading-tight mb-8 overflow-visible py-1">
              Drop A <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-500 not-italic px-1">Message.</span>
            </h2>
            <p className="text-lg text-slate-500 font-semibold mb-12 max-w-xl leading-relaxed">
              Whether it's admissions consulting, counseling requests, or just clarifying a doubt, our academic cell is prepared to map out your success parameters.
            </p>
            
            <ul className="space-y-6 select-none">
              {[
                "Response within 4 business hours guaranteed",
                "Direct path mapping with Senior Counselors",
                "Personalized physical academic syllabus diagnostics"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-xs font-black text-slate-650 uppercase tracking-widest">
                  <div className="w-5 h-5 rounded-full border border-orange-300 relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-[-2px] border border-dashed border-orange-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                    <CheckCircle2 className="text-orange-500" size={10} />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Form Block with 3D tilts and border lasers */}
          <div className="relative overflow-visible">
            <motion.div
              ref={formCardRef}
              onMouseMove={handleFormMouseMove}
              onMouseLeave={handleFormMouseLeave}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-12 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl ${
                isFormHovered
                  ? 'scale-[1.01] bg-white border-orange-500/30 shadow-[0_30px_70px_rgba(251,146,60,0.08)] z-20'
                  : 'bg-white/80 border-slate-200/50 shadow-2xl'
              }`}
              style={{
                transform: isFormHovered
                  ? `perspective(1000px) rotateX(${-tilt.y * 3.5}deg) rotateY(${tilt.x * 3.5}deg)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transformStyle: "preserve-3d"
              }}
            >
              {/* Border laser sweep highlight trailing cursor inside card */}
              <div
                className="absolute inset-0 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(251, 146, 60, 0.35), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleFormSubmit} 
                    className="space-y-6 select-none"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input with expanding bottom center laser underline */}
                      <div className="space-y-2 relative group/input">
                        <label className="inline-flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          <User size={10} className="text-slate-400" />
                          <span>[Student Name]</span>
                        </label>
                        <input 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={submitting}
                          required
                          className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all font-bold text-slate-800 text-sm focus:bg-white" 
                          placeholder="e.g. John Wick" 
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-orange-500 transition-all duration-300 group-focus-within/input:w-[90%]" />
                      </div>

                      {/* Phone input with expanding bottom center laser underline */}
                      <div className="space-y-2 relative group/input">
                        <label className="inline-flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          <Phone size={10} className="text-slate-400" />
                          <span>[Phone Number]</span>
                        </label>
                        <input 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={submitting}
                          required
                          className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all font-bold text-slate-800 text-sm focus:bg-white" 
                          placeholder="e.g. +91 98765..." 
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-orange-500 transition-all duration-300 group-focus-within/input:w-[90%]" />
                      </div>

                    </div>
                    
                    {/* Select Domain button tab row */}
                    <div className="space-y-2">
                      <label className="inline-flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">
                        <BookOpen size={10} className="text-slate-400" />
                        <span>[Select Domain]</span>
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['JEE', 'NEET', 'CET'].map((opt) => {
                          const isActive = domain === opt;
                          return (
                            <button 
                              key={opt} 
                              type="button" 
                              disabled={submitting}
                              onClick={() => setDomain(opt)}
                              className={`py-3.5 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all relative overflow-hidden ${
                                isActive 
                                  ? 'bg-[#060813] border-[#060813] text-white shadow-md' 
                                  : 'bg-white/80 border-slate-200 text-slate-400 hover:border-orange-400 hover:text-orange-500'
                              }`}
                            >
                              {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-indigo-500 opacity-20 pointer-events-none" />
                              )}
                              <span className="relative z-10">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Textarea details with expand laser bottom */}
                    <div className="space-y-2 relative group/input">
                      <label className="inline-flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">
                        <MessageSquare size={10} className="text-slate-400" />
                        <span>[Inquiry Details]</span>
                      </label>
                      <textarea 
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        disabled={submitting}
                        required
                        rows={4} 
                        className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all font-bold text-slate-800 text-xs focus:bg-white resize-none" 
                        placeholder="I'm interested in the Elite Achievers Batch..." 
                      />
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-orange-500 transition-all duration-300 group-focus-within/input:w-[90%]" />
                    </div>

                    {/* Dynamic transaction terminal logs during submit */}
                    {submitting && (
                      <div className="w-full bg-slate-900 rounded-2xl border border-white/5 p-4 text-left font-mono text-[7px] text-emerald-400 leading-relaxed shadow-inner overflow-hidden h-24 flex flex-col justify-end">
                        <div className="space-y-1">
                          {logs.map((log, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                            >
                              {log}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Holographic Magnetic Action Button */}
                    <MagneticActionButton
                      disabled={submitting}
                      className="w-full py-5 bg-[#060813] text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-indigo-500 shadow-xl"
                      laserColor="rgba(251, 146, 60, 0.45)"
                    >
                      <span>Send Inquiry Command</span>
                      <Send size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform shrink-0 text-orange-400" />
                    </MagneticActionButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center select-none"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {/* Visual HUD Orbit Badge */}
                    <div className="relative mb-6 w-16 h-16 flex items-center justify-center shrink-0">
                      <div className="absolute inset-[-6px] border border-dashed border-orange-400/45 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="absolute inset-[-12px] border border-dotted border-indigo-400/35 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                      
                      {/* Active LED status dot */}
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] z-20">
                        <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
                      </span>

                      <motion.div 
                        animate={{ scale: [0.95, 1.05, 0.95] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-indigo-500/15 border border-orange-400/45 flex items-center justify-center text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.25)] relative z-10"
                      >
                        <ShieldCheck size={20} className="animate-pulse" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">
                      Transmission Locked!
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mb-8 font-medium leading-relaxed">
                      Your inquiry parameters have been successfully logged in our secure database cell. A counselor will sync with you within 4 hours.
                    </p>

                    <button 
                      onClick={() => {
                        setSuccess(false);
                        setFullName("");
                        setPhone("");
                        setDetail("");
                        setLogs([]);
                      }}
                      className="inline-flex items-center gap-2 text-[10px] font-black text-orange-500 hover:text-slate-800 uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <span>Submit Another Command</span>
                      <ArrowRight size={12} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Technical indicators inside card */}
              <span className="absolute bottom-4 right-6 font-mono text-[5px] text-slate-400 select-none">
                [SECURE_CHANNEL: 256_BIT // IP_V4: ACTIVE]
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
