import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Sparkles, Target, TrendingUp, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pixverseVideo from '../../assets/pixverse.mp4';

export const HomeHero = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#070a13] text-white overflow-hidden pt-24 pb-16">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />
      
      {/* Abstract Glowing Blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-[120px] animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-pulse duration-[6000ms]" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary-light mb-8 shadow-lg"
            >
              <Sparkles size={14} className="text-accent animate-spin-slow" />
              <span>Admissions Open 2026-27</span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping ml-1" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-8"
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
              className="text-lg md:text-xl text-slate-400 max-w-xl font-normal leading-relaxed mb-10"
            >
              Engineering the next generation of toppers through <span className="text-white font-semibold underline decoration-accent/60 decoration-2 underline-offset-4">AI-driven analytics</span> and elite teaching methods.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-5 mb-12"
            >
              <button 
                onClick={() => navigate('/path')}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-light to-secondary text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
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
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg"
            >
              <div>
                <div className="text-2xl font-bold text-white flex items-center gap-1.5">
                  <Target size={16} className="text-accent" />
                  <span>99.8%</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Percentile Focus</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white flex items-center gap-1.5">
                  <Users size={16} className="text-primary-light" />
                  <span>1-on-1</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Elite Mentorship</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span>AI-Path</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Adaptive Engine</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Deck & Cards */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-[400px] lg:max-w-none"
            >
              {/* Decorative behind-glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-light to-secondary rounded-[2.5rem] opacity-30 blur-2xl animate-pulse" />
              
              {/* Main Video Card */}
              <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
                <video 
                  src={pixverseVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>

              {/* Floating Badge: Selection Rate */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-slate-950/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-light to-secondary flex items-center justify-center font-black text-lg text-white">
                  94%
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Selection Rate</div>
                  <div className="text-xs font-semibold text-white">National Toppers</div>
                </div>
              </motion.div>

              {/* Floating Badge: Analytics Graph Mock */}
              <motion.div 
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -top-6 -right-6 bg-slate-950/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 hidden sm:flex items-center gap-3"
              >
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Diagnostics</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <span>Active Tracking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                </div>
              </motion.div>
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

              {/* Local HTML5 Video Player playing Pixverse Video */}
              <video 
                src={pixverseVideo}
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

