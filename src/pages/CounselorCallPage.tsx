import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  PhoneCall, 
  Cpu, 
  Sparkles, 
  Activity, 
  Radio, 
  ShieldCheck, 
  PhoneOff, 
  Volume2, 
  Check,
  Disc
} from 'lucide-react';

export const CounselorCallPage = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calling States
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [voipLogs, setVoipLogs] = useState<string[]>([
    "INITIALIZING VOIP TRANSCEIVER NODE...",
    "PORT DECRYPTED // SECURE CORE SYNCHRONIZED",
    "VOICE ENCRYPTION COMPLETED // QUANTUM 1024-BIT"
  ]);

  // Form Booking States
  const [formData, setFormData] = useState({ name: '', phone: '', grade: '11th Student', slot: '10:00 AM - 12:00 PM' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Call duration counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  // Simulated ringing and status log transitions
  useEffect(() => {
    if (callState !== 'calling') return;
    
    const logs = [
      "DIALING GATEWAY NODE [443_SECURE]...",
      "SIGNAL ROUTING IN PROGRESS [STRENGTH: 99.8%]...",
      "LOCATING ACTIVE HOD PATH ADVISOR...",
      "CONNECTED // ROUTED TO HOD PHYSICS COUNSELOR CELL"
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setVoipLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setCallState('connected');
      }
    }, 1500);

    return () => clearInterval(logInterval);
  }, [callState]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const startVoipCall = () => {
    setCallState('calling');
    setVoipLogs(["INITIALIZING VOIP TRANSCEIVER NODE...", "PORT DECRYPTED // SECURE CORE SYNCHRONIZED"]);
  };

  const endVoipCall = () => {
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  const formatCallTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
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
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 100%)`,
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
            <Radio size={12} className="animate-pulse" /> 
            Voice Calibration Terminal
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-white select-none">
            Direct Counselor <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-indigo-500 italic">
              VoIP Matrix Terminal
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-bold leading-relaxed mt-6">
            Initiate a simulated live call to check your alignment immediately or schedule a calendar call-back.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* COLUMN 1: INTERACTIVE SIMULATOR CARD */}
          <div className="lg:col-span-6">
            <div className="bg-[#090b16]/75 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group/card flex flex-col justify-between min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-rose-500/5 opacity-40 blur-2xl pointer-events-none" />

              {/* Bezel Terminal Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 select-none">
                <span className="text-[10px] font-mono font-black text-indigo-400 tracking-widest uppercase flex items-center gap-2">
                  <Cpu size={12} className="animate-spin" style={{ animationDuration: '6s' }} /> 
                  Terminal VOIP System
                </span>
                <span className={`text-[8.5px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded border shadow-inner ${
                  callState === 'connected' 
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 animate-pulse' 
                    : callState === 'calling'
                      ? 'text-amber-400 bg-amber-500/10 border-amber-500/25 animate-bounce'
                      : 'text-slate-400 bg-white/5 border-white/10'
                }`}>
                  {callState === 'idle' ? "Ready" : callState === 'calling' ? "Dialing" : callState === 'connected' ? "Connected" : "Disconnected"}
                </span>
              </div>

              {/* Display Core Screen */}
              <div className="flex-1 flex flex-col justify-center items-center py-6">
                <AnimatePresence mode="wait">
                  {callState === 'idle' && (
                    <motion.div 
                      key="idle"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="text-center flex flex-col items-center space-y-8"
                    >
                      {/* Pulse Dial Trigger */}
                      <button 
                        onClick={startVoipCall}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white border-4 border-[#03050B] shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:scale-105 transition-all duration-300 relative group/btn"
                      >
                        <div className="absolute -inset-2 border-2 border-dashed border-orange-500/30 rounded-full animate-spin group-hover/btn:animate-[spin_4s_linear_infinite]" />
                        <PhoneCall size={32} className="animate-pulse" />
                      </button>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight">Initiate Calling Protocol</h4>
                        <p className="text-xs text-slate-500 font-bold mt-2">Dials HOD Academic counselor directly inside the active route.</p>
                      </div>
                    </motion.div>
                  )}

                  {(callState === 'calling' || callState === 'connected') && (
                    <motion.div 
                      key="active"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="text-center flex flex-col items-center w-full space-y-6"
                    >
                      {/* Soundwave/Aura Dial representation */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-600 to-red-500 flex items-center justify-center text-white border-4 border-[#03050B] shadow-[0_0_40px_rgba(239,68,68,0.3)] relative">
                        {callState === 'connected' && (
                          <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
                        )}
                        <Volume2 size={32} className="animate-bounce" />
                      </div>
                      
                      <div>
                        {callState === 'calling' ? (
                          <h4 className="text-xl font-black uppercase tracking-widest text-amber-400 animate-pulse">DIALING GATEWAY...</h4>
                        ) : (
                          <div className="space-y-1">
                            <h4 className="text-xl font-black uppercase tracking-tight text-white">HOD PHYSICS COUNSELOR</h4>
                            <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider block">Percentile: 99.98% Synced</span>
                          </div>
                        )}
                        <span className="text-3xl font-mono font-black text-white block mt-4 select-none">
                          {formatCallTime(callDuration)}
                        </span>
                      </div>

                      {/* Real-time scrolling VoIP logger */}
                      <div className="w-full h-24 bg-[#03050B]/80 rounded-2xl border border-white/5 p-4 overflow-y-auto text-left font-mono text-[8px] uppercase tracking-wider text-slate-500 space-y-1 select-none">
                        {voipLogs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-indigo-400 font-bold">&gt;&gt;</span>
                            <span className={idx === voipLogs.length - 1 ? "text-slate-350 font-extrabold" : ""}>{log}</span>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={endVoipCall}
                        className="py-4.5 px-8 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-97 select-none w-full"
                      >
                        <PhoneOff size={14} />
                        <span>Disconnect Call</span>
                      </button>
                    </motion.div>
                  )}

                  {callState === 'ended' && (
                    <motion.div 
                      key="ended"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="text-center flex flex-col items-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-red-500">
                        <PhoneOff size={28} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight text-red-500">Call Disconnected</h4>
                        <p className="text-xs text-slate-500 font-bold mt-2">Vector session ended cleanly. Node status returned to baseline.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CALENDAR CALL-BACK BOOKING FORM */}
          <div className="lg:col-span-6">
            <div className="bg-[#090b16]/75 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group/form min-h-[500px] flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-40 blur-2xl pointer-events-none" />

              <div className="text-[10px] font-mono font-black text-indigo-400 tracking-widest uppercase mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                <span>Book Priority Call Back</span>
                <Sparkles size={12} className="text-amber-400 fill-amber-400 animate-pulse" />
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6 flex-1 flex flex-col justify-center"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Type your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#03050B] border border-white/10 rounded-2xl py-4.5 px-6 font-mono text-sm placeholder:text-slate-650 focus:border-indigo-500/40 focus:bg-[#03050B]/90 transition-all leading-normal text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Type phone vector"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-[#03050B] border border-white/10 rounded-2xl py-4.5 px-6 font-mono text-sm placeholder:text-slate-650 focus:border-indigo-500/40 focus:bg-[#03050B]/90 transition-all leading-normal text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Active Grade</label>
                        <select 
                          value={formData.grade}
                          onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                          className="w-full bg-[#03050B] border border-white/10 rounded-2xl py-4.5 px-5 font-mono text-xs focus:border-indigo-500/40 focus:bg-[#03050B]/90 transition-all text-white"
                        >
                          <option>10th → 11th</option>
                          <option>11th Student</option>
                          <option>12th Student</option>
                          <option>Dropper</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Best Slot</label>
                        <select 
                          value={formData.slot}
                          onChange={(e) => setFormData(prev => ({ ...prev, slot: e.target.value }))}
                          className="w-full bg-[#03050B] border border-white/10 rounded-2xl py-4.5 px-5 font-mono text-xs focus:border-indigo-500/40 focus:bg-[#03050B]/90 transition-all text-white"
                        >
                          <option>10:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 02:00 PM</option>
                          <option>02:00 PM - 05:00 PM</option>
                          <option>05:00 PM - 08:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-slate-100 flex items-center justify-center gap-2 active:scale-97 select-none mt-4 shadow-xl"
                    >
                      <span>Reserve Call-Back Slot</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-10"
                  >
                    {/* Orange holographic success checked circle orbit */}
                    <div className="w-24 h-24 rounded-full border border-orange-500/20 relative flex items-center justify-center shrink-0">
                      <div className="absolute -inset-1 border-2 border-dashed border-orange-400/50 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                      <div className="absolute -inset-2.5 border border-dotted border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-indigo-500/15 border border-orange-400/45 rounded-[1.4rem] flex items-center justify-center text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.25)] relative">
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                        <Check size={28} strokeWidth={3} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-black uppercase tracking-tight text-white">Call-Back Confirmed</h4>
                      <p className="text-slate-450 leading-relaxed text-sm font-semibold max-w-sm">
                        Node synchronized successfully. Senior HOD advisor will contact you at your chosen slot: <br />
                        <span className="text-orange-400 font-bold block mt-2 font-mono">{formData.slot}</span>
                      </p>
                    </div>

                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                      Book Another Slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
