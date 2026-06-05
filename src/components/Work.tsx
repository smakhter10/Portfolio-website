import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Disc } from "lucide-react";
import { portfolioData } from "../portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Tapped active card state for mobile & tactile clicks
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Heading
      gsap.fromTo(
        headingRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const projects = portfolioData.projects;

  return (
    <section
      id="work-section"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 py-20 md:px-12 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--text-color)] border-opacity-10 pb-8 gap-4">
          <div className="space-y-4">
            <span className="font-mono-editorial text-[10px] uppercase tracking-widest font-bold opacity-60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-color)]" />
              Mixtape Artifacts
            </span>
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-serif-editorial leading-none tracking-tight text-[var(--text-color)]"
            >
              Selected Masterpieces
            </h2>
          </div>
          <p className="max-w-[320px] text-xs text-[var(--text-color)] opacity-70 leading-relaxed font-sans-editorial">
            Tap a cassette on mobile (or click/hover on desktop) to spin the reels and slide open a Polaroid website snapshot sleeve for each product.
          </p>
        </div>

        {/* Selected Projects Grid Structure */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-24 md:gap-x-14 md:gap-y-28 xl:gap-x-16 lg:pt-8"
        >
          {projects.map((proj, idx) => {
            const isActive = activeCard === idx;
            const imageUrl = proj.image;

            return (
              <div
                key={idx}
                ref={addToRefs}
                className="relative flex flex-col items-center pt-20 md:pt-24 pb-4 w-full md:translate-y-4"
              >
                {/* 1. PHYSICAL SLIDEOUT TAPE JACKET / POLAROID PICTURE */}
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[84%] bg-white border-2 border-black rounded-[16px] p-2 sm:p-2.5 shadow-[4px_4px_0px_#000000] transition-all duration-500 ease-out z-0 pointer-events-none flex flex-col ${
                    isActive
                      ? "-translate-y-[18%] sm:-translate-y-[24%] scale-100 opacity-100 rotate-2"
                      : "translate-y-[20px] opacity-0 scale-95 rotate-0"
                  }`}
                >
                  <div className="w-full h-[120px] sm:h-[180px] rounded-lg border border-black overflow-hidden relative bg-neutral-100">
                    <img
                      src={imageUrl}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black text-white text-[7px] font-mono-editorial uppercase tracking-widest rounded select-none">
                      PREVIEW
                    </div>
                  </div>
                  <div className="pt-2 text-center font-serif-editorial text-[11px] sm:text-xs text-neutral-950 font-bold flex justify-between items-center px-1 select-none">
                    <span className="italic">{proj.title}</span>
                    <span className="text-[8px] font-mono-editorial text-neutral-400">SIDE A</span>
                  </div>
                </div>

                {/* 2. CASSETTE RETRO DECK CARD (TACTILE PUSH BUTTON) */}
                <div
                  onClick={() => setActiveCard(isActive ? null : idx)}
                  className={`group relative flex flex-col justify-between w-full h-[270px] sm:h-[350px] bg-[#121214] border-[5px] border-[#202023] rounded-[22px] p-3 sm:p-4 select-none overflow-hidden transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.85)] z-10 cursor-pointer ${
                    isActive
                      ? "cassette-active scale-[0.96] border-[#e5a93b]/75 translate-y-3.5 ring-4 ring-[#e5a93b]/25 shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
                      : "hover:border-neutral-700 hover:-translate-y-[2px]"
                  }`}
                >
                  {/* Surface Reflection Line */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-white/6 opacity-70 pointer-events-none z-30" />

                  {/* Corners decorative metal screws */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow flex items-center justify-center">
                    <div className="w-1 h-[0.5px] bg-zinc-800 rotate-45" />
                  </div>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow flex items-center justify-center">
                    <div className="w-1 h-[0.5px] bg-zinc-800 -rotate-12" />
                  </div>
                  <div className="absolute bottom-5 left-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow flex items-center justify-center">
                    <div className="w-1 h-[0.5px] bg-zinc-800 rotate-12" />
                  </div>
                  <div className="absolute bottom-5 right-2 w-1.5 h-1.5 rounded-full bg-zinc-600 border border-black shadow flex items-center justify-center">
                    <div className="w-1 h-[0.5px] bg-zinc-800 -rotate-45" />
                  </div>

                  {/* Top details brand strip */}
                  <div className="flex justify-between items-center text-[7.5px] font-mono-editorial text-zinc-500 tracking-wider pb-1.5 border-b border-zinc-800/80 uppercase">
                    <span>{proj.biasText}</span>
                    <span className="font-bold text-[#faf6f0]">SIDE A</span>
                    <span className="font-extrabold text-zinc-400 px-1 border border-zinc-700 rounded-sm">
                      {proj.volScale}
                    </span>
                  </div>

                  {/* STICKER WRAPPER */}
                  <div className="flex-grow mt-2 rounded-[8px] border border-black/40 bg-[#f0f2f5] p-2 sm:p-3 relative shadow-inner overflow-hidden text-neutral-900 flex flex-col justify-between">
                    {/* Category top stripe */}
                    <div className={`absolute left-0 top-0 right-0 h-3.5 ${proj.stickerBg} flex items-center px-2 sm:px-3 justify-between select-none`}>
                      <span className="text-[6px] sm:text-[7.5px] font-black font-mono-editorial text-white uppercase tracking-widest leading-none">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[5px] sm:text-[6px] font-bold text-white/70 font-mono-editorial leading-none">
                          DOLBY SYS
                        </span>
                        <div className="w-0.5 h-0.5 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>

                    {/* Main Texts (Title / Desc) */}
                    <div className="flex justify-between items-start mt-2.5 select-text">
                      <div className="space-y-0.5 max-w-[85%] text-left">
                        <h3 className="text-sm sm:text-lg md:text-xl font-black text-neutral-950 font-serif leading-none tracking-tight">
                          {proj.title}
                        </h3>
                        <p className="text-[9px] sm:text-[11px] leading-snug font-medium text-neutral-700 font-sans-editorial select-none pt-0.5">
                          {proj.desc}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] sm:text-[11px] font-black uppercase text-neutral-950 font-mono-editorial block leading-none">
                          /{proj.year}
                        </span>
                        <span className="text-[5.5px] text-zinc-400 block font-mono-editorial leading-none mt-0.5 uppercase tracking-tighter">
                          REC.IND
                        </span>
                      </div>
                    </div>

                    {/* SPINDLE WHEEL VIEWPORT */}
                    <div className="mx-auto w-[92%] sm:w-[78%] h-7 sm:h-9 bg-zinc-950 border border-zinc-800 rounded-md flex items-center justify-between px-3 sm:px-5 relative overflow-hidden my-1 bg-black shadow-[inset_0_3px_6px_rgba(0,0,0,0.95)]">
                      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-85 z-0" />

                      {/* Left Spindle hub */}
                      <div className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden select-none z-10 shrink-0">
                        <div className={`absolute inset-[1px] rounded-full bg-gradient-to-tr ${proj.reelColor} scale-100 group-hover:scale-105 transition-all duration-1000`} />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#faf6f0] border border-neutral-300 flex items-center justify-center relative z-10 shadow-sm tape-hub-spin">
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-0" />
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-45" />
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-90" />
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-135" />
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-950" />
                        </div>
                      </div>

                      {/* Center marks */}
                      <div className="flex flex-col items-center justify-center flex-grow z-10 select-none opacity-30 shrink">
                        <div className="w-[1px] h-2 bg-zinc-600" />
                        <div className="flex gap-1 text-[4px] sm:text-[5px] text-zinc-400 font-mono-editorial mt-0.5">
                          <span>0</span>
                          <span>100</span>
                        </div>
                      </div>

                      {/* Right Spindle hub */}
                      <div className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden select-none z-10 shrink-0">
                        <div className={`absolute inset-[1px] rounded-full bg-gradient-to-tr ${proj.reelColor} scale-95 group-hover:scale-110 transition-all duration-1000`} />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#faf6f0] border border-neutral-300 flex items-center justify-center relative z-10 shadow-sm tape-hub-spin">
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-0" />
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-45" />
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-90" />
                          <div className="absolute w-full h-[1px] bg-zinc-600 rotate-135" />
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-950" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom strip inside sticker label */}
                    <div className="flex justify-between items-center border-t border-dashed border-zinc-300 pt-1.5 select-none z-10">
                      <div className="flex flex-wrap gap-1 max-w-[70%] text-left">
                        {proj.tech.slice(0, 3).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[7px] sm:text-[8px] uppercase tracking-wider font-mono-editorial font-bold text-neutral-800 px-1 py-0.2 rounded bg-neutral-200 border border-neutral-350"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider font-mono-editorial ${proj.textColor}`}>
                        {proj.tapeFormat}
                      </span>
                    </div>
                  </div>

                  {/* Trapezoid head guide slider */}
                  <div className="mx-auto w-[68%] h-5 sm:h-6 bg-[#1a1a1c] border-t border-b border-black rounded-b-lg flex justify-between items-center px-4 sm:px-5 relative mt-1.5 sm:mt-2 shadow-md z-20 shrink-0">
                    <div className="w-1 h-1 rounded-full bg-zinc-900 border border-zinc-700 shadow" />
                    <div className="flex items-center gap-1 text-[6.5px] sm:text-[7.5px] font-mono-editorial text-neutral-400">
                      <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                      <span>{isActive ? "PLAYING" : "ENGAGED"}</span>
                    </div>
                    <a
                      href="#contact-section"
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-[#faf6f0] hover:text-black transition-colors flex items-center justify-center hover:scale-105 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent card toggling when clicking anchor
                      }}
                    >
                      <ArrowUpRight size={8} className="stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid margin adjust and layout line */}
      <div className="max-w-7xl mx-auto w-full border-t border-[var(--text-color)] border-opacity-10 mt-24 pt-8 flex justify-between text-[10px] font-mono-editorial opacity-50 relative z-30">
        <span>02 / RETRO INTERFACES</span>
        <span>CASSETTE TAPE PLAY DECK &bull; HIGH CONTRAST</span>
      </div>
    </section>
  );
}
