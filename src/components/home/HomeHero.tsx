import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Sparkles, Target, TrendingUp, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import teacherClassroomVideo from '../../assets/teacher_classroom.mp4';

export const HomeHero = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [bookState, setBookState] = React.useState<'closed' | 'open' | 'zoomed' | 'fullscreen'>('closed');
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;
    
    setMousePos({ x, y });
    setTilt({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleVideoEnded = () => {
    // Smooth scroll to the second section if user has not scrolled manually
    if (window.scrollY < 50) {
      const sections = document.querySelectorAll('section');
      if (sections && sections.length > 1) {
        sections[1].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  React.useEffect(() => {
    // Stage transition timers
    const timer1 = setTimeout(() => {
      setBookState('open');
    }, 1200); // Closed state duration

    const timer2 = setTimeout(() => {
      setBookState('zoomed');
    }, 2900); // 1.7s after opening, zoom in

    const timer3 = setTimeout(() => {
      setBookState('fullscreen');
    }, 4200); // 1.3s after zoom, dissolve to full screen video

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-5rem)] flex items-center bg-black text-white overflow-hidden pt-24 pb-16"
    >
      {/* Golden Book Cinematic Entrance Overlay */}
      {bookState !== 'fullscreen' && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: bookState === 'zoomed' ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950"
        >
          {/* Subtle ambient light */}
          <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

          <motion.div
            initial={{ scale: 0.55, rotateX: 10, rotateY: 5 }}
            animate={{
              scale: bookState === 'closed' ? 0.55 : bookState === 'open' ? 0.95 : 3.5,
              x: bookState === 'closed' ? 150 : 0,
              rotateX: bookState === 'zoomed' ? 0 : 10,
              rotateY: bookState === 'zoomed' ? 0 : 5,
            }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            style={{ perspective: 1800, transformStyle: "preserve-3d" }}
            className="relative w-[600px] h-[380px] max-w-[90vw] aspect-[1.58/1] select-none pointer-events-none"
          >
             {/* Left Page (Inside Book) */}
             <motion.div 
               style={{ transform: "translateZ(1px)" }}
               animate={{ opacity: bookState === 'closed' ? 0 : 1 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-amber-50/95 via-amber-100/95 to-amber-50/95 rounded-l-2xl border-l-4 border-amber-900 shadow-2xl overflow-hidden flex flex-col justify-between p-8"
             >
                <div className="border-b border-amber-900/10 pb-4">
                  <div className="text-[8px] font-black text-amber-800 tracking-widest uppercase">SECTION I</div>
                  <h4 className="font-display font-black text-amber-950 text-sm italic-small tracking-tight leading-none mt-1">THE ROADMAP OF PRECISION</h4>
                </div>
                <div className="flex-grow flex items-center justify-center my-4 opacity-15">
                  <Sparkles className="text-amber-950 animate-pulse" size={80} />
                </div>
                <div className="text-[7.5px] text-amber-850/80 font-serif leading-relaxed italic">
                  "Engineering the next generation of academic excellence through rigorous analytics, target modules, and elite teaching frameworks."
                </div>
             </motion.div>

             {/* Right Page (Inside Book - playing the video) */}
             <div 
               style={{ transform: "translateZ(1px)" }}
               className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-50/95 via-amber-100/95 to-amber-50/95 rounded-r-2xl border-r-4 border-amber-900 shadow-2xl overflow-hidden"
             >
                <div className="absolute inset-4 rounded-xl overflow-hidden bg-black shadow-inner border border-amber-900/15">
                  <video 
                    src={teacherClassroomVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
             </div>

             {/* Page spine shadow */}
             <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-4 bg-gradient-to-r from-black/20 via-black/45 to-black/20 z-10" />
             <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-amber-950/40 z-10" />

             {/* Front Cover (Gold finish, folds open to the left) */}
             <motion.div
               initial={{ rotateY: 0 }}
               animate={{ rotateY: bookState === 'closed' ? 0 : -180 }}
               transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
               style={{ 
                 transformOrigin: "left center", 
                 transformStyle: "preserve-3d", 
                 backfaceVisibility: "hidden" 
               }}
               className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-amber-600 via-yellow-400 to-amber-700 rounded-r-2xl border-l border-amber-600/50 shadow-2xl flex flex-col items-center justify-center p-8 text-center z-20"
             >
                <div className="absolute inset-3 border border-yellow-300/30 rounded-xl pointer-events-none" />
                <div className="absolute inset-4 border-2 border-yellow-300/15 rounded-lg pointer-events-none" />

                <div className="w-16 h-16 bg-yellow-300/10 rounded-full border border-yellow-300/40 flex items-center justify-center mb-6 text-yellow-300 font-black text-2xl rotate-6 shadow-inner">A</div>
                <h2 className="font-display font-black text-2xl text-yellow-100 tracking-tight leading-none uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">EDUELEVATE</h2>
                <span className="text-[8px] text-yellow-300 font-black uppercase tracking-[0.3em] mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Academy Pro</span>
             </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Full-screen background video triggers auto-scroll on completion */}
      <video 
        src={teacherClassroomVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover opacity-95 pointer-events-none z-0"
      />
      {/* Cinematic dark overlays to guarantee legibility */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none z-0" />

      {/* Background Graphic Elements - Subtle premium purple glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.08),transparent_50%)] z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex justify-start items-center">
          
          {/* Left Column: Text & CTAs (Left Aligned) */}
          <div className="max-w-3xl text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary-light mb-8 shadow-lg"
            >
              <Sparkles size={14} className="text-accent animate-spin-slow" />
              <span>Admissions Open 2026-27</span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping ml-1" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight md:leading-[1.1] mb-8"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                PRECISION
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-indigo-300 italic">
                EDUCATION.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl font-normal leading-relaxed mb-10 text-left"
            >
              Engineering the next generation of toppers through <span className="text-white font-semibold underline decoration-accent/60 decoration-2 underline-offset-4">AI-driven analytics</span> and elite teaching methods.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-start items-center gap-5 mb-12"
            >
              <button 
                onClick={() => navigate('/path')}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-light to-secondary text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(109,40,217,0.5)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-sm font-semibold"
              >
                <span className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center text-primary-light group-hover:scale-110 transition-transform">
                  <Play size={14} className="fill-primary-light ml-0.5" />
                </span>
                <span>Watch Intro Video</span>
              </button>
            </motion.div>

            {/* Micro Stats / Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-12 pt-8 border-t border-white/10 w-full max-w-lg"
            >
              <div>
                <div className="text-2xl font-bold text-white flex items-center justify-start gap-1.5">
                  <Target size={16} className="text-accent" />
                  <span>99.8%</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 text-left">Percentile Focus</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white flex items-center justify-start gap-1.5">
                  <Users size={16} className="text-primary-light" />
                  <span>1-on-1</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 text-left">Elite Mentorship</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white flex items-center justify-start gap-1.5">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span>AI-Path</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 text-left">Adaptive Engine</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      {/* Premium Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 bg-bg-dark/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 select-none"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-4xl aspect-video overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-950/85 border border-white/15 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-300 shadow-xl"
              >
                <X size={18} />
              </button>

              {/* Local HTML5 Video Player playing local stock video */}
              <video 
                src={teacherClassroomVideo}
                autoPlay
                controls
                className="w-full h-full object-contain bg-slate-950 z-10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

