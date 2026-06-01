import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass } from 'lucide-react';

export const ContactMap = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  return (
    <section className="pt-0 pb-8 bg-[#FAF9F6] relative overflow-hidden select-none">
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* macOS Chrome Bezel Console Window Viewport Mockup */}
        <div 
          ref={mapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-[3rem] overflow-hidden border border-slate-200/80 shadow-3xl bg-slate-900 relative h-[550px] flex flex-col"
        >

          {/* Map Viewport Container */}
          <div className="flex-1 relative overflow-hidden bg-slate-950">
            {/* Fallback Static Map Styled in a Gorgeous Cyber Overlay Grid */}
            <div className="absolute inset-0 bg-slate-900 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/73.8567,18.5204,13.5/1200x550?access_token=none')] bg-cover bg-center grayscale brightness-75 opacity-90 transition-all duration-300">
              <div className="absolute inset-0 bg-indigo-950/20 mix-blend-overlay" />
            </div>

            {/* Scanning neon horizontal coordinate guideline */}
            {isHovered && (
              <div 
                className="absolute left-0 right-0 border-t border-dashed border-orange-500/30 pointer-events-none z-10" 
                style={{ top: coords.y, transition: 'top 0.08s cubic-bezier(0.16, 1, 0.3, 1)' }} 
              />
            )}
            
            {/* Scanning neon vertical coordinate guideline */}
            {isHovered && (
              <div 
                className="absolute top-0 bottom-0 border-l border-dashed border-orange-500/30 pointer-events-none z-10" 
                style={{ left: coords.x, transition: 'left 0.08s cubic-bezier(0.16, 1, 0.3, 1)' }} 
              />
            )}



            {/* Spotlight neon glow following cursor */}
            <div
              className="absolute pointer-events-none transition-opacity duration-150 blur-[100px] rounded-full z-0"
              style={{
                opacity: isHovered ? 0.35 : 0,
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                width: '300px',
                height: '300px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 100%)'
              }}
            />

            {/* Dynamic sweep radar scanner overlaid on Map Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 select-none">
              
              {/* Radar target compass circle */}
              <div className="absolute -inset-16 border border-dashed border-orange-400/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '12s' }} />
              <div className="absolute -inset-10 border border-dotted border-cyan-400/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />

              {/* Pulsing Concentric Radar Rings */}
              <div className="absolute inset-[-20px] rounded-full bg-orange-400/5 animate-ping" style={{ animationDuration: '3s' }} />

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center group relative z-10"
              >
                <div className="bg-orange-500 border border-orange-400/40 text-white font-black px-5 py-3 rounded-2xl shadow-[0_20px_40px_rgba(249,115,22,0.15)] relative backdrop-blur-md">
                  <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                    <Compass size={10} className="animate-spin text-orange-200" style={{ animationDuration: '5s' }} />
                    <span>Main Hub HQ</span>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rotate-45 -mt-2 border-r border-b border-orange-400/40" />
                </div>
                <MapPin className="text-orange-500 mt-4 filter drop-shadow-lg" size={32} />
              </motion.div>
            </div>
            
            {/* Floating Bezel Details Glass Info Card on the bottom-left */}
            <div className="absolute bottom-8 left-8 z-20 hidden md:block">
              <div className="p-8 bg-slate-950/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 w-80 select-none">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
                  <span className="font-sans text-[10px] text-orange-500 uppercase tracking-widest font-bold">HQ Location</span>
                </div>
                <h4 className="text-lg font-black text-white mb-2 italic uppercase">Visit our HQ</h4>
                <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">
                  Central Academic Tower, Level 5, Tech Park Plaza, Kothrud, Pune.
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black text-orange-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <Compass size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
                </a>
              </div>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};
