import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CourseCTA = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic button state triggers
  const [btn1Pos, setBtn1Pos] = useState({ x: 0, y: 0 });
  const [btn2Pos, setBtn2Pos] = useState({ x: 0, y: 0 });
  
  // Local button mouse coordinates for laser sweeps
  const [btn1Mouse, setBtn1Mouse] = useState({ x: 0, y: 0 });
  const [btn2Mouse, setBtn2Mouse] = useState({ x: 0, y: 0 });
  const [btn1Hover, setBtn1Hover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleButton1Move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBtn1Mouse({ x, y });
    setBtn1Pos({ 
      x: (e.clientX - rect.left - rect.width / 2) * 0.35, 
      y: (e.clientY - rect.top - rect.height / 2) * 0.35 
    });
  };

  const handleButton2Move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBtn2Mouse({ x, y });
    setBtn2Pos({ 
      x: (e.clientX - rect.left - rect.width / 2) * 0.35, 
      y: (e.clientY - rect.top - rect.height / 2) * 0.35 
    });
  };

  const handleButtonLeave = () => {
    setBtn1Pos({ x: 0, y: 0 });
    setBtn2Pos({ x: 0, y: 0 });
  };

  // SHIFTING COORDINATES WARP CANVAS GRID GENERATOR
  const cols = 14;
  const rows = 6;
  const gridWidth = 1000;
  const gridHeight = 450;
  
  const getWarpedGridPaths = () => {
    const points: Array<{x: number; y: number}> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * gridWidth;
        const y = (r / (rows - 1)) * gridHeight;
        
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const distance = Math.hypot(dx, dy);
        const maxDist = 260;
        
        let rx = x;
        let ry = y;
        
        if (distance < maxDist && isHovered) {
          const force = (1 - distance / maxDist) * 38; // 38px displacement force
          const angle = Math.atan2(dy, dx);
          rx += Math.cos(angle) * force;
          ry += Math.sin(angle) * force;
        }
        
        points.push({ x: rx, y: ry });
      }
    }

    const paths: string[] = [];
    
    // Generate Horizontal lines
    for (let r = 0; r < rows; r++) {
      let pathStr = "";
      for (let c = 0; c < cols; c++) {
        const pt = points[r * cols + c];
        if (c === 0) pathStr += `M ${pt.x} ${pt.y}`;
        else pathStr += ` L ${pt.x} ${pt.y}`;
      }
      paths.push(pathStr);
    }
    
    // Generate Vertical lines
    for (let c = 0; c < cols; c++) {
      let pathStr = "";
      for (let r = 0; r < rows; r++) {
        const pt = points[r * cols + c];
        if (r === 0) pathStr += `M ${pt.x} ${pt.y}`;
        else pathStr += ` L ${pt.x} ${pt.y}`;
      }
      paths.push(pathStr);
    }
    
    return paths;
  };

  const warpedPaths = getWarpedGridPaths();

  return (
    <section className="pt-12 pb-24 bg-white text-center relative overflow-hidden">
      {/* Subtle outer grid lines background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={bannerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleButtonLeave();
          }}
          className="relative group bg-[#05070F] rounded-[3.5rem] px-6 py-8 lg:px-20 lg:py-12 overflow-hidden text-white shadow-2xl border border-white/10 transition-all duration-700 select-none"
        >
          {/* INTERACTIVE SHIFTING COORDINATES WARP CANVAS GRID */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 transition-opacity duration-300"
            viewBox="0 0 1000 450" 
            preserveAspectRatio="none"
          >
            {warpedPaths.map((d, idx) => (
              <path 
                key={idx} 
                d={d} 
                fill="none" 
                stroke="rgba(99, 102, 241, 0.15)" 
                strokeWidth="0.8" 
                className="transition-all duration-75"
              />
            ))}
          </svg>

          {/* Interactive Mouse Coordinate Spotlight Sweeper */}
          <div 
            className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[150px]"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 100%)',
              left: `${mousePos.x - 400}px`,
              top: `${mousePos.y - 400}px`,
            }}
          />

          {/* Spark Particles trailing mouse */}
          {isHovered && (
            <>
              <div 
                className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400/35 pointer-events-none blur-[1.5px] transition-all duration-300 ease-out"
                style={{ left: mousePos.x - 5, top: mousePos.y - 5 }}
              />
              <div 
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/30 pointer-events-none blur-[1px] transition-all duration-500 ease-out"
                style={{ left: mousePos.x - 3, top: mousePos.y - 3 }}
              />
            </>
          )}

          {/* Constant ambient color flares */}
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-indigo-50/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-amber-50/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            
            {/* Core Icon with Concentric Orbiting HUD Vector Rings */}
            <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              {/* Concentric HUD orbits */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-12 pointer-events-none" viewBox="0 0 100 100">
                {/* Outer dashed HUD orbit */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  className={`stroke-indigo-500/25 ${isHovered ? 'animate-[spin_6s_linear_infinite]' : ''}`} 
                  strokeWidth="1.2" 
                  strokeDasharray="6 4" 
                />
                {/* Crosshairs notches */}
                <path d="M 50 2 L 50 8 M 50 92 L 50 98 M 2 50 L 8 50 M 92 50 L 98 50" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
                
                {/* Middle vector solid rotating orbit */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="36" 
                  fill="none" 
                  className={`stroke-amber-500/20 ${isHovered ? 'animate-[spin_4s_linear_infinite_reverse]' : ''}`} 
                  strokeWidth="1.8" 
                  strokeDasharray="25 15" 
                />
                
                {/* Inner dashed HUD orbit */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="28" 
                  fill="none" 
                  className="stroke-indigo-400/15" 
                  strokeWidth="0.8" 
                  strokeDasharray="2 2" 
                />
              </svg>

              {/* Pulsing Backglow */}
              <div className="absolute inset-2 rounded-[1.2rem] bg-gradient-to-br from-indigo-500/20 to-amber-500/20 opacity-40 group-hover:opacity-100 group-hover:scale-110 blur-sm transition-all duration-700" />
              
              {/* Icon Container */}
              <div className="relative z-10 w-14 h-14 bg-white/5 rounded-[1.2rem] flex items-center justify-center border border-white/10 group-hover:scale-105 group-hover:rotate-6 group-hover:border-amber-500/30 transition-all duration-500">
                <Calendar size={24} className="text-amber-400 animate-pulse" />
              </div>

              {/* Decorative side sparkles */}
              <div className="absolute top-2 right-2 text-indigo-400 animate-bounce">
                <Sparkles size={16} />
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 leading-[0.95] text-white select-none">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 italic">Academic</span> Odyssey.
            </h2>
            
            <p className="text-sm lg:text-base text-indigo-100/70 mb-8 max-w-xl mx-auto leading-relaxed font-medium">
              Don't leave your potential to chance. Partner with India's most analytical, high-results academic incubator.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* Magnetic Book Demo CTA */}
              <Link 
                to="/book-demo" 
                onMouseMove={handleButton1Move}
                onMouseEnter={() => setBtn1Hover(true)}
                onMouseLeave={() => {
                  setBtn1Hover(false);
                  handleButtonLeave();
                }}
                style={{
                  transform: `translate3d(${btn1Pos.x}px, ${btn1Pos.y}px, 0)`,
                  transition: btn1Pos.x === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
                className="relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-3 w-full sm:w-auto justify-center group shadow-2xl shadow-amber-500/20 border border-amber-300/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {/* Laser Sweep cursor overlay inside button */}
                {btn1Hover && (
                  <div 
                    className="absolute w-24 h-24 rounded-full bg-white/35 pointer-events-none blur-md transition-opacity duration-300"
                    style={{ left: btn1Mouse.x - 48, top: btn1Mouse.y - 48 }}
                  />
                )}
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  Book Demo 
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
              </Link>

              {/* Magnetic Live Enquiry CTA */}
              <a 
                href="https://wa.me/919876543210" 
                onMouseMove={handleButton2Move}
                onMouseEnter={() => setBtn2Hover(true)}
                onMouseLeave={() => {
                  setBtn2Hover(false);
                  handleButtonLeave();
                }}
                style={{
                  transform: `translate3d(${btn2Pos.x}px, ${btn2Pos.y}px, 0)`,
                  transition: btn2Pos.x === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
                className="relative overflow-hidden bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-3 w-full sm:w-auto justify-center border border-white/10 hover:border-white/25 hover:scale-105 active:scale-95 transition-all duration-300 animate-none"
              >
                {/* Laser Sweep cursor overlay inside button */}
                {btn2Hover && (
                  <div 
                    className="absolute w-24 h-24 rounded-full bg-white/15 pointer-events-none blur-md transition-opacity duration-300"
                    style={{ left: btn2Mouse.x - 48, top: btn2Mouse.y - 48 }}
                  />
                )}
                <span className="absolute inset-0 w-full h-full bg-indigo-500/10 transform skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  Live Enquiry 
                  <MessageSquare size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
