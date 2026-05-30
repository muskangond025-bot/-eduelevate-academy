import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Navigation, ArrowDown, Activity } from 'lucide-react';
import { AboutHero } from '../components/about/AboutHero';
import { VisionMission } from '../components/about/VisionMission';
import { FounderMessage } from '../components/about/FounderMessage';
import { JourneyTimeline } from '../components/about/JourneyTimeline';
import { AchievementsMilestones } from '../components/about/AchievementsMilestones';
import { ResultsSnapshot } from '../components/about/ResultsSnapshot';
import { FacultyHighlightsAbout } from '../components/about/FacultyHighlightsAbout';
import { Infrastructure } from '../components/about/Infrastructure';
import { SuccessStories } from '../components/about/SuccessStories';
import { AboutCTA } from '../components/about/AboutCTA';

export const AboutPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const sectionIds = [
    { label: "HERO", title: "01 // STORY HERO" },
    { label: "VISION", title: "02 // VISION & MISSION" },
    { label: "FOUNDER", title: "03 // FOUNDER'S MESSAGE" },
    { label: "TIMELINE", title: "04 // JOURNEY TIMELINE" },
    { label: "HONOURS", title: "05 // ACHIEVEMENTS" },
    { label: "METRICS", title: "06 // SNAPSHOT METRICS" },
    { label: "FACULTY", title: "07 // FACULTY PRESTIGE" },
    { label: "CAMPUS", title: "08 // INFRASTRUCTURE" },
    { label: "VOICES", title: "09 // SUCCESS STORIES" },
    { label: "ODYSSEY", title: "10 // CTA ODYSSEY" }
  ];

  // Pre-load simulator
  useEffect(() => {
    const logs = [
      "BOOTSTRAP: INITIALIZING ABOUT_SUITE...",
      "INTEGRITY CHECK: 10 CORE VIEWPORTS STABLE",
      "CALIBRATION: RADIANS COORDINATE MATRIX ACTIVE",
      "spring COMPOSERS: CONNECTING KINETIC PHYSICS...",
      "LAUNCH: RENDERING HIGH-FIDELITY GRAPHICS CONSOLE"
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setLoadingLogs((prev) => [...prev, `[${(performance.now() / 1000).toFixed(2)}s] // ${logs[logIndex]}`]);
        logIndex++;
      }
    }, 250);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(logInterval);
      clearInterval(progressInterval);
    }, 1750);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  // Scroll & Telemetry Tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Find active section based on bounding boxes
      let currentSection = 0;
      for (let i = 0; i < 10; i++) {
        const el = document.getElementById(`about-sec-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight * 0.45) {
            currentSection = i;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#FAF9F6] relative overflow-x-clip select-none min-h-screen">
      {/* 1. Dynamic Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Premium Entrance Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100%",
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[120] bg-[#FAF9F6] flex flex-col items-center justify-center p-8 overflow-hidden select-none"
          >
            {/* Fine dotted layout grid */}
            <div
              className="absolute inset-0 opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative max-w-2xl w-full flex flex-col items-center text-center z-10">
              {/* Concentric HUD Orbit Target Loader */}
              <div className="relative w-28 h-28 flex items-center justify-center mb-12">
                {/* Rotating Dashed Circle */}
                <div className="absolute inset-0 border border-dashed border-indigo-400 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                {/* Rotating Dotted Outer Circle */}
                <div className="absolute inset-[-10px] border border-dotted border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }} />
                {/* Pulsing Center Icon */}
                <motion.div
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-650 shadow-sm"
                >
                  <Cpu size={28} className="animate-pulse" />
                </motion.div>
              </div>

              {/* Title Header */}
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase mb-2">
                AcademyPro Suite
              </h2>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-10">
                [SYSTEM_BOOT: DEPLOYING ABOUT_SECTION]
              </p>

              {/* Progress Count Ticker */}
              <div className="font-mono text-3xl font-black text-indigo-600 mb-6">
                {Math.min(loadingProgress, 100)}%
              </div>

              {/* Progress Bar Track */}
              <div className="w-64 h-1.5 bg-slate-200/60 rounded-full overflow-hidden mb-8 border border-slate-300/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Terminal Logs Disclosures */}
              <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-white/5 p-5 text-left font-mono text-[8px] text-emerald-400/90 leading-relaxed shadow-lg overflow-hidden h-28 flex flex-col justify-end">
                <div className="space-y-1 overflow-y-auto">
                  {loadingLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="truncate"
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span>STATUS: {loadingProgress >= 100 ? "LOCKED // SUCCESS" : "COMPILING..."}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Page-Level Scrolling Laser Pulse Guidelines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none z-0">
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="w-[1px] h-64 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"
        />
      </div>
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/30 pointer-events-none z-0">
        <motion.div
          animate={{ y: ["100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="w-[1px] h-64 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
        />
      </div>

      {/* 4. Fixed Vertical Scrolling Navigator HUD Panel (Desktop Only) */}
      <div className="fixed left-6 top-[35%] z-[60] hidden xl:flex flex-col items-center gap-6 select-none">
        <div className="relative w-[1px] h-72 bg-slate-200/60 flex flex-col items-center justify-between py-1">
          {/* Scroll progress bullet sliding down track */}
          <div 
            className="absolute w-2 h-2 -left-[3px] rounded-full bg-indigo-600 transition-all duration-300 shadow-sm z-10"
            style={{ top: `${(activeSection / 9) * 100}%` }}
          />
          {sectionIds.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => {
                document.getElementById(`about-sec-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group focus:outline-none z-20"
            >
              <div 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeSection === idx 
                    ? 'bg-indigo-650 scale-150 ring-4 ring-indigo-100' 
                    : 'bg-slate-300 hover:bg-slate-500 hover:scale-125'
                }`}
              />
              {/* Floating label appearing on hover */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none font-mono text-[8px] tracking-wider text-indigo-650 bg-white border border-indigo-100 shadow-md px-3.5 py-1.5 rounded-xl flex items-center gap-2 font-bold whitespace-nowrap">
                <span>{sec.title}</span>
                {activeSection === idx && <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 6. High-End Scrolling Sections */}
      <main className="relative z-10">
        <div id="about-sec-0" className="scroll-mt-10">
          <AboutHero />
        </div>
        <div id="about-sec-1" className="scroll-mt-10">
          <VisionMission />
        </div>
        <div id="about-sec-2" className="scroll-mt-10">
          <FounderMessage />
        </div>
        <div id="about-sec-3" className="scroll-mt-10">
          <JourneyTimeline />
        </div>
        <div id="about-sec-4" className="scroll-mt-10 bg-[#060813]">
          <AchievementsMilestones />
        </div>
        <div id="about-sec-5" className="scroll-mt-10">
          <ResultsSnapshot />
        </div>
        <div id="about-sec-6" className="scroll-mt-10">
          <FacultyHighlightsAbout />
        </div>
        <div id="about-sec-7" className="scroll-mt-10">
          <Infrastructure />
        </div>
        <div id="about-sec-8" className="scroll-mt-10 bg-[#060813]">
          <SuccessStories />
        </div>
        <div id="about-sec-9" className="scroll-mt-10">
          <AboutCTA />
        </div>
      </main>
    </div>
  );
};
