import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Shield, Award, Cpu, Plus, Minus } from 'lucide-react';

const FAQRow = ({
  faq,
  index,
  isOpen,
  onToggle,
  hoveredIndex,
  setHoveredIndex
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
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

  // Custom Animated HUD Icons
  const renderHUDIcon = () => {
    switch (index) {
      case 0:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            {/* Spinning Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-amber-500/30 rounded-full"
            />
            {/* Pulsing Core */}
            <motion.div
              animate={{ scale: [0.85, 1.15, 0.85] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20"
            >
              <Cpu size={12} className={isSelfHovered ? "animate-pulse" : ""} />
            </motion.div>
          </div>
        );
      case 1:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            {/* Rotating HUD concentric target */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 border-2 border-indigo-500/10 border-t-indigo-500/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 border border-indigo-500/20"
            >
              <Terminal size={12} />
            </motion.div>
          </div>
        );
      case 2:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            {/* Radar scan ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-0 border border-purple-500/10 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(168, 85, 247, 0.1) 0deg, transparent 90deg)',
              }}
            />
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 border border-purple-500/20"
            >
              <Shield size={12} />
            </motion.div>
          </div>
        );
      default:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            {/* Orbit paths */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-emerald-500/25 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20"
            >
              <Award size={12} />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rounded-[2.5rem] border text-left p-6 md:p-8 transition-all duration-500 relative overflow-hidden backdrop-blur-xl group/row ${
        isSelfHovered
          ? 'border-indigo-500/35 bg-white shadow-[0_0_60px_rgba(99,102,241,0.06)]'
          : isDimmed
            ? 'border-slate-100 opacity-45 scale-[0.985] blur-[0.5px]'
            : 'border-slate-200/50 bg-white/40 shadow-sm'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${-tilt.y * 4}deg) rotateY(${tilt.x * 4}deg) scale3d(${isSelfHovered ? 1.01 : 1}, ${isSelfHovered ? 1.01 : 1}, 1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isSelfHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.04), transparent 80%)`,
        }}
      />

      {/* Razor Border Laser sweep */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col gap-6">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-left gap-4 select-none focus:outline-none"
        >
          <div className="flex items-center gap-4 md:gap-6">
            {renderHUDIcon()}
            <span className={`text-base md:text-lg font-black tracking-tight transition-colors duration-300 ${
              isOpen || isSelfHovered ? 'text-slate-800' : 'text-slate-650'
            }`}>
              {faq.q}
            </span>
          </div>

          {/* Elastic magnetic toggle indicator */}
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border shadow-inner ${
              isOpen 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 animate-none' 
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-100/80 pt-5 mt-1 font-sans text-sm md:text-base leading-relaxed text-slate-500">
                


                {/* Main answer text with gradient left line accent */}
                <div className="pl-4 border-l-2 border-indigo-500/30 font-semibold italic text-slate-650">
                  {faq.a}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Corner Quotes Accents */}
      <div className="absolute top-5 left-5 w-2.5 h-2.5 border-t border-l border-slate-200/50 group-hover/row:border-indigo-500/20 transition-colors" />
      <div className="absolute top-5 right-5 w-2.5 h-2.5 border-t border-r border-slate-200/50 group-hover/row:border-indigo-500/20 transition-colors" />
      <div className="absolute bottom-5 left-5 w-2.5 h-2.5 border-b border-l border-slate-200/50 group-hover/row:border-indigo-500/20 transition-colors" />
      <div className="absolute bottom-5 right-5 w-2.5 h-2.5 border-b border-r border-slate-200/50 group-hover/row:border-indigo-500/20 transition-colors" />
    </motion.div>
  );
};

export const ScholarshipFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: "Is there any registration fee for the NST?", 
      a: "No, the National Scholarship Test is completely free of cost for all students across the country." 
    },
    { 
      q: "Can I appear for the test more than once?", 
      a: "Students can only appear once in a calendar year for the NST to ensure fairness across all participants." 
    },
    { 
      q: "What is the mode of the examination?", 
      a: "The test is primarily conducted online via our secure testing platform. Selected cities may have offline centers." 
    },
    { 
      q: "How will I know my result and scholarship rank?", 
      a: "Results are communicated via your registered email and SMS within 48 hours. A detailed report will be available in the portal." 
    }
  ];

  return (
    <section className="py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* Dotted Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(rgba(79, 70, 229, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Dynamic atmospheric radial spotlights */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-5 shadow-sm"
          >
            <Sparkles size={11} className="text-indigo-500 animate-bounce" />
            <span>Support Matrices</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary tracking-tighter mb-4 uppercase leading-none select-none"
          >
            FREQUENTLY <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600 italic">ASKED QUERIES.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium max-w-md mx-auto"
          >
            Got questions about the National Scholarship Test? Find instant holographic support readouts below.
          </motion.p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <FAQRow
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
