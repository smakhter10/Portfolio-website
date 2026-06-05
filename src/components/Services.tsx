import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listItemsRef = useRef<HTMLDivElement[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal headline
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger reveal of lists as they scroll in
      gsap.fromTo(
        listItemsRef.current.filter(Boolean),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (hoveredIndex !== null) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [hoveredIndex]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !listItemsRef.current.includes(el)) {
      listItemsRef.current.push(el);
    }
  };

  const services = portfolioData.services;

  return (
    <section
      id="services-section"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-28"
    >
      <div ref={triggerRef} className="max-w-7xl mx-auto w-full space-y-16">
        
        {/* Editorial Title */}
        <div className="space-y-4 max-w-xl">
          <span className="font-mono-editorial text-[10px] uppercase tracking-widest font-bold opacity-60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-color)]" />
            Capabilities &bull; Services
          </span>
          <h2
            ref={headlineRef}
            className="text-3xl md:text-5xl lg:text-6xl font-serif-editorial leading-none tracking-tight text-[var(--text-color)]"
          >
            Capabilities List
          </h2>
        </div>

        {/* Dynamic List Rows - Desktop hover list + Mobile Clickable Envelope Accolade */}
        <div className="border-t border-[var(--text-color)] border-opacity-20 mt-8">
          
          {/* DESKTOP ONLY: High contrast hover deck */}
          <div className="hidden md:block divide-y divide-[var(--text-color)] divide-opacity-20">
            {services.map((svc, sIdx) => (
              <div
                key={`desktop-${sIdx}`}
                ref={addToRefs}
                onMouseEnter={(e) => {
                  setHoveredIndex(sIdx);
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group py-6 md:py-8 flex flex-row items-center justify-between border-b border-[var(--text-color)] border-opacity-20 px-6 -mx-6 transition-all duration-300 hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] relative cursor-none"
              >
                {/* Triple-digit Index */}
                <span className="font-mono-editorial text-[11px] sm:text-xs opacity-50 font-bold tracking-wider group-hover:opacity-90 w-16 sm:w-24 shrink-0 transition-all">
                  {svc.num}
                </span>

                {/* Heavy All-caps sans-serif service title */}
                <h3 className="flex-grow text-left font-sans font-bold text-sm sm:text-xl md:text-2xl tracking-widest uppercase transition-all duration-300 group-hover:translate-x-3">
                  {svc.title}
                </h3>

                {/* Category label on far right */}
                <span className="font-sans font-semibold text-[9px] sm:text-[11px] md:text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  {svc.category}
                </span>
              </div>
            ))}
          </div>

          {/* MOBILE ONLY: Clickable Envelope-style expansion folds */}
          <div className="md:hidden divide-y divide-[var(--text-color)] divide-opacity-20">
            {services.map((svc, sIdx) => {
              const isExpanded = expandedIndex === sIdx;
              return (
                <div
                  key={`mobile-${sIdx}`}
                  className="py-4 flex flex-col transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : sIdx)}
                    className="w-full flex flex-row items-center justify-between py-2 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-editorial text-[10px] opacity-50 font-bold tracking-wider">
                        {svc.num}
                      </span>
                      <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-[var(--text-color)] leading-tight">
                        {svc.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-sans font-semibold text-[8px] tracking-widest uppercase opacity-50">
                        {svc.category.split(" ")[0]} {/* Shorten for smaller screen space */}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="w-4 h-4 rounded-full border border-[var(--text-color)] border-opacity-20 flex items-center justify-center text-[9px]"
                      >
                        ↓
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-3 px-1 flex flex-col items-center">
                          {/* Tactile envelope sleeve container */}
                          <div className="w-full max-w-[290px] bg-white border-2 border-black rounded-[14px] p-2 shadow-[4px_4px_0px_#000000] rotate-1 relative my-2 overflow-hidden flex flex-col">
                            {/* Inner Picture Cards */}
                            <div className="w-full h-[140px] rounded-lg border border-black overflow-hidden relative bg-neutral-100">
                              <img
                                src={svc.image}
                                alt={svc.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 px-1 py-0.5 bg-black text-white text-[6.5px] font-mono-editorial font-bold uppercase tracking-widest rounded select-none shadow">
                                CAPABILITY
                              </div>
                            </div>
                            
                            {/* Envelope footer text descriptor */}
                            <div className="pt-2 flex justify-between items-center px-1">
                              <span className="font-serif-editorial text-[9px] text-neutral-950 font-extrabold italic uppercase tracking-tight">
                                {svc.title}
                              </span>
                              <span className="font-mono text-[7px] text-neutral-400 font-bold">
                                {svc.num}/006
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Floating Hover Card Container with Framer Motion spring controls */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.65, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1.05,
              rotate: 1.5,
              x: mousePos.x - 180, // offset coordinates so the image rests nicely at center of pointer
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.65, rotate: 4 }}
            transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.7 }}
            className="fixed top-0 left-0 w-[220px] h-[140px] sm:w-[360px] sm:h-[235px] pointer-events-none z-50 rounded-xl overflow-hidden shadow-[0_22px_45px_rgba(0,0,0,0.55)] border-[4px] border-[var(--text-color)]"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <img
              src={services[hoveredIndex].image}
              alt={services[hoveredIndex].title}
              className="w-full h-full object-cover scale-102"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial footer marker */}
      <div className="max-w-7xl mx-auto w-full border-t border-[var(--text-color)] border-opacity-10 mt-24 pt-8 flex justify-between text-[10px] font-mono-editorial opacity-50">
        <span>03 / CAPABILITIES</span>
        <span>ENGINEERED RESOLUTIONS</span>
      </div>
    </section>
  );
}
