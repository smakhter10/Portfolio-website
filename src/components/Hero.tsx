import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { portfolioData } from "../portfolioData";

interface HeroProps {
  onHoverStart?: (type?: string) => void;
  onHoverEnd?: () => void;
}

export default function Hero({ onHoverStart, onHoverEnd }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLettersRef = useRef<HTMLSpanElement[]>([]);
  const bioRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const numberBadgeRef = useRef<HTMLSpanElement>(null);

  // Read centralized config name
  const displayName = portfolioData.hero.displayName || "SEEYAM";

  useEffect(() => {
    // Collect all elements for initial GSAP staggering
    const letters = titleLettersRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(letters, { y: "130%", rotate: 8, opacity: 0 });
      gsap.set(numberBadgeRef.current, { scale: 0, opacity: 0 });
      gsap.set(bioRef.current, { y: 40, opacity: 0 });
      gsap.set(starRef.current, { scale: 0, rotation: -180, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { y: 20, opacity: 0 });

      // Page Entrance Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.8,
      })
        .to(
          starRef.current,
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          letters,
          {
            y: "0%",
            rotate: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.06,
          },
          "-=1.0"
        )
        .to(
          numberBadgeRef.current,
          {
            scale: 1,
            opacity: 0.85,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.6"
        )
        .to(
          bioRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
          },
          "-=0.8"
        )
        .to(
          scrollIndicatorRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
          },
          "-=1.0"
        );

      // Mouse Parallax for the Star Symbol and Main Title
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;

        const devX = clientX - wWidth / 2;
        const devY = clientY - wHeight / 2;

        // Subtle rotation of star based on position
        if (starRef.current) {
          gsap.to(starRef.current, {
            rotation: devX * 0.1,
            x: devX * 0.03,
            y: devY * 0.03,
            duration: 0.8,
            ease: "power1.out",
          });
        }

        // Very subtle drift of title letters
        if (letters.length > 0) {
          gsap.to(letters, {
            x: devX * 0.015,
            y: devY * 0.015,
            duration: 1.2,
            stagger: 0.01,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [displayName]);

  const addLetterRef = (el: HTMLSpanElement | null) => {
    if (el && !titleLettersRef.current.includes(el)) {
      titleLettersRef.current.push(el);
    }
  };

  // Reset letters array before render when setting raw letters
  titleLettersRef.current = [];

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between px-6 py-24 md:px-12 md:py-28 overflow-hidden"
    >
      {/* Decorative Star Symbol Near Top Center */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <svg
          ref={starRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 md:w-20 md:h-20 text-[var(--text-color)] opacity-60"
        >
          <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
          <circle cx="12" cy="12" r="1.5" fill="var(--text-color)" />
        </svg>
      </div>

      {/* Hero Body Layout: Spaced Middle */}
      <div className="flex-grow flex flex-col justify-center items-center relative z-20 py-16 w-full">
        {/* Name Main Row */}
        <div className="relative flex flex-row items-baseline justify-center select-none max-w-full">
          {/* Main Name Heading with elegant serif typography */}
          <h1
            onMouseEnter={() => onHoverStart?.("standard")}
            onMouseLeave={onHoverEnd}
            className="hero-name-container text-[15vw] leading-[1] font-serif-editorial tracking-tighter text-[var(--text-color)] text-center cursor-none transform scale-y-105 select-none transition-all duration-300 flex flex-row items-baseline justify-center whitespace-nowrap"
          >
            {displayName.split("").map((letter, index) => (
              <span key={`${displayName}-${index}`} className="inline-block overflow-hidden relative leading-none whitespace-nowrap">
                <span ref={addLetterRef} className="inline-block transition-all hover:scale-110 hover:text-[var(--accent-color)] leading-none whitespace-nowrap">
                  {letter}
                </span>
              </span>
            ))}
          </h1>

          {/* Small index designation beside the name */}
          <span
            ref={numberBadgeRef}
            className="font-mono-editorial text-[9px] md:text-md uppercase tracking-wider font-bold opacity-80 self-start mt-2 md:mt-4 ml-1 md:ml-2 border border-[var(--text-color)] border-opacity-30 rounded-full px-1.5 py-0.2 shrink-0"
            style={{ transformOrigin: "bottom left" }}
          >
            {portfolioData.hero.badgeNumber}
          </span>
        </div>
      </div>

      {/* Hero Footer Layout: Centered on mobile, spaced bottom on desktop */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-8 relative z-20">
        {/* Left Side: Minimalist Editorial Metadata Tag (Centered on mobile) */}
        <div ref={bioRef} className="max-w-[340px] text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start w-full">
          <p className="text-[10px] uppercase tracking-widest font-mono-editorial opacity-50 mb-1.5 font-bold">
            {portfolioData.hero.bioTag}
          </p>
          <p className="text-sm font-serif-editorial italic text-[var(--text-color)] opacity-90 leading-normal">
            {portfolioData.hero.bioDescription}
          </p>
        </div>

        {/* Right Side: Scroll Indicator (Centered on mobile) */}
        <div
          ref={scrollIndicatorRef}
          onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
          onMouseEnter={() => onHoverStart?.("magnetic")}
          onMouseLeave={onHoverEnd}
          className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono-editorial opacity-60 hover:opacity-100 transition-opacity cursor-none select-none self-center md:self-end mx-auto md:mx-0"
        >
          <span>{portfolioData.hero.scrollLabel}</span>
          <div className="w-8 h-8 rounded-full border border-[var(--text-color)] border-opacity-30 flex items-center justify-center animate-bounce">
            <ArrowDown size={12} className="text-[var(--text-color)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
