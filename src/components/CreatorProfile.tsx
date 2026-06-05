import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";
import { portfolioData } from "../portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function CreatorProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressObj = useRef({ val: 0 });
  
  const [displayProgress, setDisplayProgress] = useState(0);
  const [tick, setTick] = useState(0);

  // Read bio copy from portfolioData
  const BIO_TEXT = portfolioData.creatorProfile.bioText;

  // Continuous micro-ticking for the scrambling matrix characters animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((t) => t + 1);
    }, 60);
    return () => clearInterval(intervalId);
  }, []);

  // Set up ScrollTrigger to drive the decoding progress with sticky pinning
  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",   // Pin when the section hits top of the viewport
      end: "+=170%",      // Keep it pinned for 170% of viewport height scroll space
      pin: true,          // Sticky pin the section
      scrub: 1,           // Links scroll position directly to decode progress
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) so that decoding completes fully at 70% scroll progress (0.7)
        // This leaves the remaining 30% of scroll space as stable, static, readable text before unpinning.
        const targetProgress = Math.min(1, self.progress / 0.7);

        gsap.to(progressObj.current, {
          val: targetProgress,
          duration: 0.4,
          ease: "power2.out",
          onUpdate: () => {
            setDisplayProgress(progressObj.current.val);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Split text into characters to calculate status
  const chars = BIO_TEXT.split("");
  const totalLen = chars.length;

  return (
    <section
      id="creator-profile-section"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 overflow-hidden border-b border-[var(--text-color)] border-opacity-10 bg-[var(--bg-color)]"
    >
      {/* Background Tech Wire Lines - physical blueprint details */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--text-color)] to-transparent opacity-10" />
      <div className="absolute inset-y-0 left-12 w-px bg-[var(--text-color)] opacity-[0.02] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-[var(--text-color)] opacity-[0.02] hidden md:block" />

      <div className="max-w-5xl mx-auto w-full flex flex-col gap-8 md:gap-12 relative z-10">
        
        {/* Editorial Subheader Metadata row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--text-color)] border-opacity-10 pb-6 gap-3 select-none">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-[var(--text-color)]">
              {portfolioData.creatorProfile.identityTag}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-[9px] font-mono text-[var(--text-color)] opacity-60">
            <span>{portfolioData.creatorProfile.registNo}</span>
            <span className="text-[var(--accent-color)] font-bold">
              {portfolioData.creatorProfile.statusPrefix} {Math.round(displayProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Dynamic Binary/Text Content Body Area */}
        <div className="space-y-4 md:space-y-6">
          
          {/* Section Heading Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--text-color)] bg-opacity-5 rounded-full border border-[var(--text-color)] border-opacity-10 select-none">
            <Terminal size={10} className="text-[var(--text-color)] shrink-0" />
            <span className="font-mono text-[8px] uppercase tracking-widest font-extrabold text-[var(--text-color)]">
              {portfolioData.creatorProfile.badgeLabel}
            </span>
          </div>

          {/* Large display paragraph containing decoding characters */}
          <div
            ref={textContainerRef}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-[1.4] font-mono tracking-tight font-light select-none text-[var(--text-color)] max-w-4xl"
          >
            {chars.map((char, index) => {
              if (char === "\n") {
                return <br key={index} />;
              }
              if (char === " ") {
                return <span key={index}> </span>;
              }

              // Normalized character ratio inside the paragraph length
              const ratio = index / totalLen;
              
              // Scale display progress with a 1.15 multiplier so when progress is 1.0, normProgress reaches 1.15.
              // Since scrambleBand is 0.08, this guarantees the entire text is fully settled before progress ends.
              const normProgress = displayProgress * 1.15;
              
              // Window specifying scramble boundary
              const scrambleBand = 0.08;

              let renderedChar = char;
              let classNames = "text-[var(--text-color)] opacity-100 font-sans font-medium transition-all duration-300";

              if (ratio < normProgress - scrambleBand) {
                // Phase 3: Decoded normal letters
                renderedChar = char;
                classNames = "text-[var(--text-color)] opacity-100 transition-colors duration-400 font-sans italic hover:text-[var(--accent-color)]";
              } else if (ratio >= normProgress - scrambleBand && ratio < normProgress) {
                // Phase 2: Rapid scramble stream
                const pool = ["0", "1", "X", "/", "<", ">", "_", "{", "}", "[", "]", "+", "$", "%", "#", "*", "@"];
                renderedChar = pool[(index + tick) % pool.length];
                classNames = "text-[var(--accent-color)] font-extrabold drop-shadow-[0_0_4px_var(--accent-glow)] select-none animate-pulse scale-110 inline-block font-mono";
              } else {
                // Phase 1: Dimmed stream of digital numbers (flowing 0 / 1)
                const isOne = (index + Math.floor(tick / 6)) % 2 === 0;
                renderedChar = isOne ? "1" : "0";
                classNames = "text-[var(--text-color)] opacity-15 select-none font-mono font-light duration-300";
              }

              return (
                <span
                  key={index}
                  className={`${classNames} select-none`}
                  style={{ transitionDelay: `${index * 0.25}ms` }}
                >
                  {renderedChar}
                </span>
              );
            })}
          </div>

        </div>

        {/* Sleek, flat, non-boxy editorial metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[var(--text-color)] border-opacity-10 text-[9px] font-mono select-none">
          {portfolioData.creatorProfile.profileMetrics.map((met) => (
            <div key={met.id} className="flex flex-col gap-1">
              <span className="opacity-40">{met.id} / {met.label}</span>
              <span className="font-bold tracking-tight text-[var(--text-color)] uppercase">{met.value}</span>
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <span className="opacity-40">04 / CURRENT DECODE STATE</span>
            <span className="font-bold tracking-tight text-[var(--accent-color)] uppercase animate-pulse">
              {displayProgress >= 0.95 ? "COMPLETE &bull; 100%" : `PROCESSING &bull; ${Math.round(displayProgress * 100)}%`}
            </span>
          </div>
        </div>

      </div>

      {/* Decorative Stamp watermark in corner */}
      <div className="absolute bottom-6 right-12 opacity-10 pointer-events-none select-none text-[8px] font-mono tracking-widest uppercase hidden md:block">
        AUTHENTIC PROFILE INDEX
      </div>
    </section>
  );
}
