import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, GraduationCap, MapPin, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

const FloatingInput = ({ 
  label, 
  type, 
  value, 
  onChange, 
  required = false, 
  placeholder = "", 
  icon 
}: { 
  label: string; 
  type: string; 
  value: string; 
  onChange: (e: any) => void; 
  required?: boolean; 
  placeholder?: string;
  icon: React.ReactNode;
}) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value !== "";

  return (
    <div className="relative group/input">
      <label 
        className={`absolute left-16 transition-all duration-300 pointer-events-none select-none z-10 ${
          isFloating 
            ? 'top-2 text-[9px] font-black text-indigo-600 uppercase tracking-widest' 
            : 'top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400'
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${
          focused ? 'text-indigo-600' : 'text-slate-300'
        }`}>
          {icon}
        </div>
        <input
          type={type}
          required={required}
          value={value}
          placeholder={focused ? placeholder : ""}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-16 pr-8 pt-7 pb-3 bg-white border border-slate-150 rounded-[1.8rem] outline-none transition-all font-bold text-primary text-sm shadow-sm focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 group-hover/input:border-indigo-200"
        />
      </div>
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-indigo-600 origin-center scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

const FloatingSelect = ({ 
  label, 
  value, 
  onChange, 
  required = false, 
  icon,
  children
}: { 
  label: string; 
  value: string; 
  onChange: (e: any) => void; 
  required?: boolean; 
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value !== "";

  return (
    <div className="relative group/input">
      <label 
        className={`absolute left-16 transition-all duration-300 pointer-events-none select-none z-10 ${
          isFloating 
            ? 'top-2 text-[9px] font-black text-indigo-600 uppercase tracking-widest' 
            : 'top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400'
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${
          focused ? 'text-indigo-600' : 'text-slate-300'
        }`}>
          {icon}
        </div>
        <select
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-16 pr-8 pt-7 pb-3 bg-white border border-slate-150 rounded-[1.8rem] outline-none transition-all font-bold text-primary text-sm shadow-sm focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 group-hover/input:border-indigo-200 appearance-none"
        >
          {children}
        </select>
      </div>
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-indigo-600 origin-center scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

export const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [hub, setHub] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setGrade("");
    setHub("");
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
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <section className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-indigo-50" id="registration-form">
      {/* Background Dot Blueprint Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-6 shadow-sm"
          >
            <Sparkles size={11} className="text-indigo-500 animate-bounce" />
            <span>Registry Active</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none"
          >
            SEAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic font-black">REGISTRATION.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-sm mx-auto"
          >
            Limited slots available per examination center. Reserve yours now.
          </motion.p>
        </div>

        {/* White Frosted Bezel Panel */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           onMouseMove={handleMouseMove}
           className="bg-white/80 border border-slate-200/50 backdrop-blur-2xl rounded-[4.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group/console"
        >
          {/* Razor Thin border laser */}
          <div 
            className="absolute inset-0 rounded-[4.5rem] pointer-events-none opacity-0 group-hover/console:opacity-100 transition-opacity duration-500 z-30"
            style={{
              background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Bezel header ticks */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-5 mb-8 select-none">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black flex items-center gap-1">
              <span>Registry_Bezel // Hub_Active</span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 flex flex-col items-center justify-center"
              >
                 <div className="w-24 h-24 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-2xl relative">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10 }}
                      className="absolute -top-1 -right-1 text-amber-500"
                    >
                      <Sparkles size={24} className="animate-bounce" />
                    </motion.div>
                    
                    {/* Concentric targets scanning on check mark */}
                    <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 52 52">
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
                 <h3 className="text-3xl font-black text-primary mb-4 tracking-tighter uppercase leading-none">Registration Recorded!</h3>
                 <p className="text-slate-500 font-semibold mb-10 leading-normal max-w-sm mx-auto">Check your email for the admit card, vector preparation sheets, and exam center instructions.</p>
                 <button onClick={handleReset} className="py-4 px-10 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20">
                    Register Another Student
                 </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
              >
                <div className="space-y-6">
                   <FloatingInput 
                     label="Full Name" 
                     type="text" 
                     required 
                     value={name} 
                     onChange={(e: any) => setName(e.target.value)} 
                     placeholder="John Doe" 
                     icon={<User size={18} />} 
                   />
                   <FloatingInput 
                     label="Email Identity" 
                     type="email" 
                     required 
                     value={email} 
                     onChange={(e: any) => setEmail(e.target.value)} 
                     placeholder="john@student.com" 
                     icon={<Mail size={18} />} 
                   />
                </div>

                <div className="space-y-6">
                   <FloatingSelect 
                     label="Current Grade" 
                     required 
                     value={grade} 
                     onChange={(e: any) => setGrade(e.target.value)} 
                     icon={<GraduationCap size={18} />}
                   >
                      <option value="">Select Grade</option>
                      <option value="8">Grade 8th</option>
                      <option value="9">Grade 9th</option>
                      <option value="10">Grade 10th</option>
                      <option value="11">Grade 11th</option>
                      <option value="12">Grade 12th</option>
                      <option value="dropper">Dropper</option>
                   </FloatingSelect>
                   <FloatingSelect 
                     label="Preferred Tech-Hub" 
                     required 
                     value={hub} 
                     onChange={(e: any) => setHub(e.target.value)} 
                     icon={<MapPin size={18} />}
                   >
                      <option value="">Online Only</option>
                      <option value="mumbai">Mumbai Main Campus</option>
                      <option value="pune">Pune Tech Hub</option>
                      <option value="bangalore">Bangalore South</option>
                   </FloatingSelect>
                </div>
                
                <div className="md:col-span-2 pt-6">
                   <button 
                     type="submit" 
                     onMouseMove={handleButtonMove}
                     onMouseLeave={handleButtonLeave}
                     disabled={isLoading}
                     className="w-full py-5.5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs hover:bg-indigo-700 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 group"
                   >
                      {isLoading ? (
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <span>Confirm Seat Reservation</span> 
                          <Send size={13} className="group-hover:translate-x-1.5 transition-transform" />
                        </>
                      )}
                   </button>
                   <p className="text-center mt-6 text-[9px] font-black text-slate-450 uppercase tracking-widest opacity-60">By registering, you agree to our Terms & Conditions of merit.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-slate-200" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-slate-200" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-slate-200" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-slate-200" />
        </motion.div>
      </div>
    </section>
  );
};
