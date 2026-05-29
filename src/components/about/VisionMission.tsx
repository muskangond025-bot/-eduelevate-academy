import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Target, Compass, Eye } from 'lucide-react';

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

const MissionVisionCard = ({
  item,
  index,
  hoveredIndex,
  setHoveredIndex,
  isDesktop
}: {
  item: any;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  isDesktop: boolean;
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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

  const colorMap: Record<string, string> = {
    indigo: "group-hover/card:border-indigo-500/20 text-indigo-650",
    emerald: "group-hover/card:border-emerald-500/20 text-emerald-650"
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-12 rounded-[4rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl flex flex-col bg-white/45 border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.03)] h-full ${
        isSelfHovered
          ? `scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.08)] bg-white/60 border-indigo-500/25`
          : isDimmed
            ? 'opacity-45 scale-[0.985] blur-[0.5px] border-slate-200/20'
            : 'shadow-lg'
      }`}
      style={{
        transform: isDesktop
          ? `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) scale3d(${isSelfHovered ? 1.02 : 1}, ${isSelfHovered ? 1.02 : 1}, 1)`
          : 'none',
        transformStyle: "preserve-3d"
      }}
    >
      {/* Border laser sweep trailing cursor */}
      {isDesktop && (
        <div
          className="absolute inset-0 rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30"
          style={{
            background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${item.laserColor}, transparent 80%)`,
            padding: '1.2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      )}

      {/* Sparks trail */}
      <SparkParticlesTrail coords={coords} colorClass={item.sparkClass} />

      {/* Rotating Concentric HUD Icon Orbits */}
      <div className="relative w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover/card:scale-110 transition-transform z-10 shrink-0" style={{ transform: isDesktop ? "translateZ(25px)" : "none" }}>
        <div className="absolute inset-[-6px] border border-dashed border-slate-200 rounded-full animate-spin pointer-events-none group-hover/card:border-slate-350" style={{ animationDuration: '8s' }} />
        {React.cloneElement(item.icon as React.ReactElement, { size: 30, className: `relative z-10 ${colorMap[item.themeColor].split(' ')[1]}` })}
      </div>

      <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tight" style={{ transform: isDesktop ? "translateZ(20px)" : "none" }}>
        {item.title}
      </h2>
      
      <p className="text-lg text-slate-555 leading-relaxed font-semibold" style={{ transform: isDesktop ? "translateZ(10px)" : "none" }}>
        {item.desc}
      </p>

    </motion.div>
  );
};

export const VisionMission = () => {
  const [sectionCoords, setSectionCoords] = useState({ x: 0, y: 0 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const [stickerCoords, setStickerCoords] = useState({ x: 0, y: 0 });
  const [stickerTilt, setStickerTilt] = useState({ x: 0, y: 0 });
  const stickerRef = useRef<HTMLDivElement>(null);

  const [viewportTilt, setViewportTilt] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleViewportMouseMove = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setViewportTilt({
      x: (e.clientX - rect.left - centerX) / centerX,
      y: (e.clientY - rect.top - centerY) / centerY
    });
  };

  const items = [
    {
      title: "Our Mission",
      desc: "To democratize high-end competitive coaching through a blend of rigorous traditional pedagogy and modern technological tools, ensuring every student has the mental framework to win.",
      icon: <Target />,
      themeColor: "indigo",
      sparkClass: "bg-indigo-500",
      laserColor: "rgba(99, 102, 241, 0.4)",
      badgeCode: "GOAL_01 // CORE_MISSION"
    },
    {
      title: "Our Vision",
      desc: "To be the global benchmark for intelligence nurturing, where academic results are just a byproduct of a deep-rooted love for science and logical reasoning.",
      icon: <Eye />,
      themeColor: "emerald",
      sparkClass: "bg-emerald-500",
      laserColor: "rgba(16, 185, 129, 0.4)",
      badgeCode: "GOAL_02 // FUTURE_VISION"
    }
  ];

  // Scroll targets for stacking cards (pointing to non-sticky wrapper sectionRef)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  // Card 1 transforms (scale down, fade, slide up slightly - complete by progress = 0.55)
  const card1Scale = useTransform(smoothProgress, [0, 0.15, 0.55], [1, 1, 0.92], { clamp: true });
  const card1Opacity = useTransform(smoothProgress, [0, 0.15, 0.55], [1, 1, 0.65], { clamp: true });
  const card1Y = useTransform(smoothProgress, [0, 0.15, 0.55], [0, 0, -25], { clamp: true });

  // Card 2 transforms (slide up from bottom, scale up, fade in - complete by progress = 0.55)
  const card2Y = useTransform(smoothProgress, [0, 0.10, 0.55], [450, 450, 0], { clamp: true });
  const card2Scale = useTransform(smoothProgress, [0, 0.10, 0.55], [0.88, 0.88, 1], { clamp: true });
  const card2Opacity = useTransform(smoothProgress, [0, 0.10, 0.55], [0, 0, 1], { clamp: true });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="bg-[#FAF9F6] relative overflow-x-clip border-b border-slate-200/50"
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

      {/* Main scrolling wrapper */}
      <div 
        ref={containerRef} 
        className={isDesktop ? "relative h-[220vh] w-full" : "py-24 w-full"}
      >
        <div className={isDesktop ? "sticky top-0 h-screen flex items-center w-full" : "w-full"}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              
              {/* Left Column: Mission & Vision (Adaptive Deck vs. List) */}
              {isDesktop ? (
                // Desktop 3D Stacking Card Deck
                <div className="relative w-full h-[520px] flex items-center justify-center">
                  
                  {/* Card 1: Our Mission */}
                  <motion.div
                    style={{
                      scale: card1Scale,
                      opacity: card1Opacity,
                      y: card1Y,
                      zIndex: 10
                    }}
                    className="absolute inset-0"
                  >
                    <MissionVisionCard
                      item={items[0]}
                      index={0}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                      isDesktop={isDesktop}
                    />
                  </motion.div>

                  {/* Card 2: Our Vision */}
                  <motion.div
                    style={{
                      y: card2Y,
                      scale: card2Scale,
                      opacity: card2Opacity,
                      zIndex: 20
                    }}
                    className="absolute inset-0"
                  >
                    <MissionVisionCard
                      item={items[1]}
                      index={1}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                      isDesktop={isDesktop}
                    />
                  </motion.div>

                </div>
              ) : (
                // Mobile Vertical List Layout
                <div className="space-y-12 w-full">
                  {items.map((item, idx) => (
                    <MissionVisionCard
                      key={idx}
                      item={item}
                      index={idx}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                      isDesktop={isDesktop}
                    />
                  ))}
                </div>
              )}

              {/* Right Column - Cyber Bezel Image Viewport with Holographic Sticker */}
              <div 
                ref={viewportRef}
                onMouseMove={handleViewportMouseMove}
                onMouseLeave={() => setViewportTilt({ x: 0, y: 0 })}
                className="relative select-none w-full"
                style={{
                  transform: `perspective(1000px) rotateX(${-viewportTilt.y * 3}deg) rotateY(${viewportTilt.x * 3}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Cyber Bezel Shell */}
                <div className="bg-slate-900 rounded-[4rem] border-8 border-slate-200/80 overflow-hidden shadow-2xl relative animate-none" style={{ transform: "translateZ(10px)" }}>
                  {/* Viewport Frame */}
                  <div className="aspect-[4/3] relative overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=1000" 
                      alt="Scientific Vision" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
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
                  className="absolute -bottom-10 -right-10 p-8 rounded-3xl shadow-2xl border bg-white/70 border-slate-200/50 max-w-[280px] backdrop-blur-xl z-20 overflow-hidden group/sticker cursor-help"
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
                  
                  <Compass size={32} className="text-indigo-650 mb-4 animate-spin" style={{ animationDuration: '12s' }} />

                  <p className="text-xl font-black text-slate-800 leading-tight">Ethics First. Students Always.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
