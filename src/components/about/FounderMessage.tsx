import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, BookOpen } from 'lucide-react';

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

export const FounderMessage = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const [stickerCoords, setStickerCoords] = useState({ x: 0, y: 0 });
  const [stickerTilt, setStickerTilt] = useState({ x: 0, y: 0 });
  const stickerRef = useRef<HTMLDivElement>(null);

  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [portraitCoords, setPortraitCoords] = useState({ x: 0, y: 0 });
  const portraitRef = useRef<HTMLDivElement>(null);

  const [consoleTilt, setConsoleTilt] = useState({ x: 0, y: 0 });
  const consoleRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsSectionHovered(true);
  };

  const handleStickerMouseMove = (e: React.MouseEvent) => {
    if (!stickerRef.current) return;
    const rect = stickerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setStickerCoords({ x, y });
    setStickerTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
  };

  const handlePortraitMouseMove = (e: React.MouseEvent) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setPortraitCoords({ x, y });
    setPortraitTilt({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY
    });
  };

  const handleConsoleMouseMove = (e: React.MouseEvent) => {
    if (!consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setConsoleTilt({
      x: (e.clientX - rect.left - centerX) / centerX,
      y: (e.clientY - rect.top - centerY) / centerY
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="py-32 bg-[#FAF9F6] relative overflow-hidden border-b border-slate-200/50"
    >
      {/* Light blueprint coordinates canvas backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle HSL spotlight cursor tracking */}
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

      {/* Layout lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200/40 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          {/* Left Column - Founder Portrait and Sticker */}
          <div 
            ref={portraitRef}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={() => setPortraitTilt({ x: 0, y: 0 })}
            className="w-full lg:w-1/2 relative select-none"
            style={{
              transform: `perspective(1000px) rotateX(${-portraitTilt.y * 5}deg) rotateY(${portraitTilt.x * 5}deg)`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: "preserve-3d"
            }}
          >
            {/* Cyber Bezel Outer Case */}
            <div className="bg-slate-900 rounded-[4rem] border-8 border-slate-200/80 overflow-hidden shadow-2xl relative" style={{ transform: "translateZ(10px)" }}>
              {/* Border laser sweep trailing cursor */}
              <div
                className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-500 z-30"
                style={{
                  background: `radial-gradient(120px circle at ${portraitCoords.x}px ${portraitCoords.y}px, rgba(99, 102, 241, 0.4), transparent 80%)`,
                  padding: '1.2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* Sparks trail */}
              <SparkParticlesTrail coords={portraitCoords} colorClass="bg-indigo-500" />


              {/* Viewport Frame */}
              <div className="aspect-[3/4] relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Founder" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105" 
                  style={{
                    filter: portraitTilt.x !== 0 || portraitTilt.y !== 0 ? 'grayscale(0) scale(1.05)' : 'grayscale(1)',
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

                {/* Laser Sweep Scanner Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.6)] animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            {/* Floating Iridescent Holographic Sticker */}
            <div
              ref={stickerRef}
              onMouseMove={handleStickerMouseMove}
              onMouseLeave={() => setStickerTilt({ x: 0, y: 0 })}
              className="absolute -bottom-4 -right-4 p-4.5 rounded-[1.5rem] shadow-xl border bg-white/85 border-slate-200/60 max-w-[190px] backdrop-blur-xl z-20 overflow-hidden group/sticker cursor-help"
              style={{
                transform: `perspective(800px) rotateX(${-stickerTilt.y * 12}deg) rotateY(${stickerTilt.x * 12}deg) translateZ(35px)`,
                transformStyle: "preserve-3d",
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Gloss Foil Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover/sticker:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle at ${stickerCoords.x}px ${stickerCoords.y}px, rgba(255, 255, 255, 0.8) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)`
                }}
              />
              
              <BookOpen size={20} className="text-indigo-650 mb-2 animate-bounce" style={{ animationDuration: '2.5s' }} />

              <p className="text-sm font-black text-slate-800 leading-tight">"Pedagogy is an art."</p>
              <div className="text-[6.5px] font-mono text-slate-400 uppercase tracking-widest mt-1">// Founder & Chairman</div>
            </div>
          </div>

          {/* Right Column - Messages Quote Console */}
          <div 
            ref={consoleRef}
            onMouseMove={handleConsoleMouseMove}
            onMouseLeave={() => setConsoleTilt({ x: 0, y: 0 })}
            className="w-full lg:w-1/2"
            style={{
              transform: `perspective(1000px) rotateX(${-consoleTilt.y * 4}deg) rotateY(${consoleTilt.x * 4}deg)`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: "preserve-3d"
            }}
          >
            <div className="p-12 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl bg-white/40 border-slate-200/50 shadow-lg hover:bg-white hover:border-indigo-500/20" style={{ transform: "translateZ(15px)" }}>
              {/* Concentric HUD Orbits */}
              <div className="absolute inset-[-10px] border border-dashed border-slate-200 rounded-[4.5rem] pointer-events-none opacity-40 animate-spin" style={{ animationDuration: '18s' }} />


              <Quote size={48} className="text-indigo-500/20 mb-8" />
              
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter mb-10 leading-tight overflow-visible py-1">
                A Message from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic font-black px-1">
                  Our Founder.
                </span>
              </h2>

              <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-semibold italic-small">
                <p>
                  "When I started AcademyPro 15 years ago, I didn't want to build just another coaching center. I wanted to build a sanctuary for logic. A place where a student isn't just a roll number, but a mind waiting to be ignited."
                </p>
                <p>
                  "In my decades of teaching Physics, I realized that students don't fail because they are slow; they fail because of broken foundations. Our entire ecosystem is built to fix those foundations."
                </p>
                <p>
                  "We invite you to join this journey of excellence. Let's not just clear exams; let's master life."
                </p>
              </div>

              {/* Signature Footer */}
              <div className="mt-12 flex items-center gap-6 border-t border-slate-200/40 pt-8">
                <div className="relative shrink-0 select-none">
                  {/* HUD profile orbit */}
                  <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none group-hover/card:border-indigo-400/40" style={{ animationDuration: '8s' }} />
                  <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                    <img src="https://i.pravatar.cc/100?u=fd" alt="Sig" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-xl tracking-tight uppercase leading-none mb-1">Prof. R.S. Choudhary</div>
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Ex-IIT Bombay | Physics Veteran</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
