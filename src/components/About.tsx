import { useState, useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Cpu, Layers, Globe } from "lucide-react";
import { portfolioData } from "../portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface Dossier {
  num: string;
  docCode: string;
  title: string;
  longDesc: string;
  icon: ReactNode;
  specs: string[];
  metrics: { label: string; val: string }[];
  tag: string;
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);
  const [activeDossier, setActiveDossier] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smoothly auto-scroll the horizontal tabs to center the active item on mobile
  useEffect(() => {
    if (isMobile && tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.children[activeDossier] as HTMLElement;
      if (activeBtn) {
        const container = tabsContainerRef.current;
        const containerWidth = container.clientWidth;
        const btnWidth = activeBtn.clientWidth;
        const btnLeft = activeBtn.offsetLeft;
        const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);

        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeDossier, isMobile]);

  // Icons array to pair dynamically with decentralized client configuration
  const dossierIcons = [
    <Terminal size={18} className="text-neutral-700" />,
    <Cpu size={18} className="text-neutral-700" />,
    <Layers size={18} className="text-neutral-700" />,
    <Globe size={18} className="text-neutral-700" />
  ];

  const dossiers: Dossier[] = portfolioData.dossiers.map((doc, idx) => ({
    ...doc,
    icon: dossierIcons[idx % dossierIcons.length]
  }));

  // Pin section and update active dossier index based on scroll scrubbing
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",      // Keep the section sticky for several scrolls
        pin: true,          // Pinned 100vh of space
        scrub: 1,           // Links scroll position to decode progress
        onUpdate: (self) => {
          const p = self.progress;
          let idx = 0;
          if (p < 0.25) idx = 0;
          else if (p < 0.55) idx = 1;
          else if (p < 0.82) idx = 2;
          else idx = 3;
          setActiveDossier(idx);
        },
      });

      scrollTriggerRef.current = trigger;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Programmatically scrolls window to match targeted slider indexes
  const handleTabClick = (idx: number) => {
    if (!scrollTriggerRef.current) return;
    const trigger = scrollTriggerRef.current;
    const start = trigger.start;
    const end = trigger.end;
    const total = end - start;

    let targetProgress = 0;
    if (idx === 0) targetProgress = 0.0;
    else if (idx === 1) targetProgress = 0.38;
    else if (idx === 2) targetProgress = 0.68;
    else if (idx === 3) targetProgress = 0.95;

    window.scrollTo({
      top: start + targetProgress * total + 5,
      behavior: "smooth"
    });
  };

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between px-3 xs:px-4 sm:px-6 md:px-12 py-3 xs:py-5 sm:py-8 md:py-14 overflow-hidden border-b border-[var(--text-color)] border-opacity-10 bg-[var(--bg-color)]"
    >
      {/* Structural Blueprint Grid Accents */}
      <div className="absolute inset-y-0 left-12 w-px bg-[var(--text-color)] opacity-[0.02] hidden lg:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-[var(--text-color)] opacity-[0.02] hidden lg:block" />

      {/* Sleek dynamic upper header block */}
      <div className="w-full flex justify-between items-start select-none border-b border-[var(--text-color)] border-opacity-10 pb-2 md:pb-4">
        <div className="flex flex-col gap-0.5 md:gap-1.5 max-w-2xl text-left">
          <span className="font-mono-editorial text-[7.5px] xs:text-[8px] sm:text-[9px] uppercase tracking-widest font-extrabold text-[var(--text-color)] opacity-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
            METHODOLOGY DOSSIERS // SYSTEM_CORE
          </span>
          <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-[28px] font-serif-editorial text-[var(--text-color)] tracking-tight italic select-none">
            Rigorous technical principles, executed through custom systems.
          </h2>
        </div>
        <div className="hidden sm:flex flex-col items-end font-mono text-[8px] opacity-40 select-none">
          <span>CLASSIFIED DECK INDEX</span>
          <span>EDITION &copy;2026</span>
        </div>
      </div>

      {/* Main interactive grid area: folder list and 3D stacking visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xs:gap-5 lg:gap-12 items-center flex-grow py-2 xs:py-3 overflow-hidden">
        
        {/* LEFT COLUMN: Folders registers index list */}
        <div className="lg:col-span-5 flex flex-col gap-1.5 w-full">
          <span className="font-mono text-[8px] tracking-widest text-[var(--text-color)] opacity-40 uppercase hidden lg:block pb-1">
            ACTIVE DECK REGISTERS //
          </span>

          {/* Row arrangement on mobile, sleek vertical list stack on desktop */}
          <div 
            ref={tabsContainerRef}
            className="flex flex-row lg:flex-col gap-1.5 xs:gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-2.5 lg:pb-0 scrollbar-none snap-x snap-mandatory scroll-smooth"
          >
            {dossiers.map((doc, idx) => {
              const isActive = activeDossier === idx;
              return (
                <button
                  key={doc.num}
                  onClick={() => handleTabClick(idx)}
                  className={`text-left shrink-0 lg:shrink w-[210px] xs:w-[250px] sm:w-[280px] lg:w-auto px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 lg:py-3.5 border-2 transition-all duration-350 rounded-lg lg:rounded-xl select-none flex flex-row items-center justify-between group overflow-hidden snap-center ${
                    isActive
                      ? "bg-white text-black border-black shadow-[2px_2px_0px_#000000] lg:shadow-[4px_4px_0px_#000000]"
                      : "border-[var(--text-color)] border-opacity-10 hover:border-opacity-35 hover:bg-[var(--text-color)] hover:bg-opacity-[0.02] text-[var(--text-color)]"
                  }`}
                >
                  <div className="flex items-center gap-2 lg:gap-4 overflow-hidden truncate">
                    <span className={`font-mono-editorial text-[8.5px] lg:text-xs font-black tracking-wider ${
                      isActive ? "text-neutral-900" : "opacity-45"
                    }`}>
                      REF/{doc.num}
                    </span>

                    <div className="flex flex-col min-w-0 truncate">
                      <span className={`font-mono text-[6.5px] uppercase tracking-wider font-extrabold scale-90 origin-left ${
                        isActive ? "text-[var(--accent-color)]" : "opacity-45"
                      }`}>
                        {doc.docCode.split(" // ")[0]}
                      </span>
                      <span className={`font-sans font-bold text-[9.5px] xs:text-[11px] sm:text-xs lg:text-sm tracking-wide truncate ${
                        isActive ? "text-neutral-950" : "text-[var(--text-color)]"
                      }`}>
                        {doc.title}
                      </span>
                    </div>
                  </div>

                  <div className={`hidden lg:flex w-5 h-5 rounded-full items-center justify-center border text-[9px] transition-all ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "border-[var(--text-color)] border-opacity-25"
                  }`}>
                    {isActive ? "✓" : "→"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Stacked document/letter physical sheet cards */}
        <div className="lg:col-span-7 w-full h-[330px] xs:h-[350px] sm:h-[370px] md:h-[410px] lg:h-[470px] relative flex items-center justify-center overflow-visible">
          <div className="relative w-[92%] xs:w-[94%] sm:w-[96%] lg:w-full h-full max-w-xl">
            
            {/* Elegant static paper board shadow-layers to give a physical stack appearance */}
            <div 
              className={`absolute inset-0 bg-[#f4f4f0] border-2 border-black rounded-xl md:rounded-2xl shadow-[5px_5px_0px_rgba(0,0,0,0.15)] pointer-events-none z-0 opacity-90 transition-all duration-500`} 
              style={{
                transform: isMobile 
                  ? "translateY(1.5px) translateX(-1px) rotate(-1deg) scale(0.99)" 
                  : "translateY(1.5px) -translate-x-1.5 rotate(-3.5deg)"
              }}
            />
            <div 
              className={`absolute inset-0 bg-[#fcf9f2] border-2 border-black rounded-xl md:rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)] pointer-events-none z-1 opacity-95 transition-all duration-500`}
              style={{
                transform: isMobile
                  ? "translateY(0.5px) translateX(0.5px) rotate(0.75deg) scale(0.995)"
                  : "translateY(0.5px) translate-x-0.5 rotate(2.5deg)"
              }}
            />

            {dossiers.map((doc, idx) => {
              // Calculate custom physical stacks transitions based on current dossier
              let transformStyle = "";
              let zIndexStyle = idx;
              let opacityStyle = 1;

              if (idx === activeDossier) {
                // The current focused top folder (rests nicely aligned with small active tilt)
                const activeRotations = [-1, 1.2, -0.8, 1.5];
                const r = isMobile ? activeRotations[idx] * 0.4 : activeRotations[idx];
                transformStyle = `translateY(0) scale(1) rotate(${r}deg)`;
                zIndexStyle = 40;
                opacityStyle = 1;
              } else if (idx < activeDossier) {
                // Already read layers resting underneath in the stacked pile
                const stackedRotations = [-2.5, -0.5, -2, 0.3];
                const r = isMobile ? stackedRotations[idx] * 0.4 : stackedRotations[idx];
                const xOffset = idx % 2 === 0 ? -3 : 3;
                const yOffset = idx * 1.5 - 3;
                transformStyle = `translateY(${isMobile ? yOffset * 0.5 : yOffset}px) translateX(${isMobile ? xOffset * 0.5 : xOffset}px) scale(0.995) rotate(${r}deg)`;
                zIndexStyle = 10 + idx; // stacked below active card but above back cards
                opacityStyle = 0.95;
              } else {
                // Incoming folders resting at the bottom, ready to rise over
                const incomingRotations = [3, -2.5, 4, -3];
                const r = isMobile ? incomingRotations[idx] * 0.3 : incomingRotations[idx];
                transformStyle = `translateY(118%) scale(0.96) rotate(${r}deg)`;
                zIndexStyle = 5 - idx; // hidden underneath
                opacityStyle = 0; // invisible until swipe and stack starts
              }

              return (
                <div
                  key={`tactile-stacked-folder-${idx}`}
                  className="absolute inset-0 bg-[#fcfcf9] text-neutral-900 border-2 border-black rounded-xl md:rounded-2xl p-3 xs:p-4.5 sm:p-5 md:p-7 shadow-[4px_4px_0px_#000000] lg:shadow-[5px_5px_0px_#000000] overflow-hidden select-none flex flex-col justify-between transition-all duration-[750ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    zIndex: zIndexStyle,
                    transform: transformStyle,
                    opacity: opacityStyle,
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px] z-0" />

                  {/* Document specifications ribbon */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-1.5 xs:mb-2 z-10 relative select-none">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-[var(--accent-color)]" />
                      <span className="font-mono text-[7px] xs:text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#726d60]">
                        {doc.docCode}
                      </span>
                    </div>
                    <span className="font-mono text-[6px] xs:text-[7px] md:text-[8px] text-[#908874] leading-none uppercase font-bold">
                      INVENTORY REGISTER
                    </span>
                  </div>

                  {/* Core layout containing specifications details */}
                  <div className="z-10 relative flex-grow flex flex-col justify-between gap-1 md:gap-2.5 text-left">
                    
                    <div className="space-y-0.5 xs:space-y-1">
                      <div className="inline-block bg-[#edd1a4]/45 text-[#4c3f25] px-1 py-0.5 rounded text-[6px] xs:text-[7px] md:text-[8px] font-mono tracking-widest font-extrabold uppercase select-none">
                        {doc.tag}
                      </div>
                      <h3 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-serif-editorial text-neutral-950 font-black leading-none tracking-tight">
                        {doc.title}
                      </h3>
                    </div>

                    <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-[13px] leading-relaxed text-neutral-800 font-sans line-clamp-4 xs:line-clamp-none">
                      {doc.longDesc}
                    </p>

                    {/* Compact Specs list indicators */}
                    <div className="space-y-0.5 xs:space-y-1 pt-0.5">
                      <h4 className="font-mono text-[7px] xs:text-[8px] md:text-[9px] tracking-widest text-[#908874] uppercase font-bold select-none">
                        SYSTEM SPECIFICATIONS:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 xs:gap-1 md:gap-1.5">
                        {doc.specs.slice(0, isMobile ? 3 : 4).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1 xs:gap-1.5 text-[8.5px] xs:text-[9px] sm:text-[10px] font-sans text-neutral-750 leading-none">
                            <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-[#bf8211] shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical metrics panel */}
                    <div className="border-t border-black/10 pt-1.5 xs:pt-2.5 mt-0.5 xs:mt-1 grid grid-cols-3 gap-1.5 xs:gap-2">
                      {doc.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="space-y-0.5 bg-[#fbfbf8] border border-black/5 rounded p-0.5 xs:p-1 md:p-1.5 text-center sm:text-left select-none">
                          <span className="block font-mono text-[5.5px] xs:text-[6px] md:text-[6.5px] uppercase tracking-wider text-[#908874]">
                            {metric.label}
                          </span>
                          <span className="block font-serif-editorial text-[8px] xs:text-[9px] sm:text-[10.5px] text-neutral-950 font-black tracking-tight leading-none italic uppercase">
                            {metric.val}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* physical branding stamp */}
                  <div className="absolute bottom-1 right-2 xs:bottom-2 xs:right-4 opacity-5 select-none pointer-events-none font-serif-editorial font-black italic text-xl xs:text-2xl text-black">
                    SEEYAM
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer indicators */}
      <div className="w-full border-t border-[var(--text-color)] border-opacity-10 pt-2 md:pt-4 flex justify-between text-[7.5px] xs:text-[8px] md:text-[9px] font-mono-editorial opacity-40 select-none">
        <span>METRICS SYSTEM DECK INDEX v2.6 // FLIP-BOOK DECK</span>
        <span>SEEYAM PORTFOLIO &copy; 2026</span>
      </div>
    </section>
  );
}
