import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingObjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Continuous Floating Animation
      objectsRef.current.forEach((obj, idx) => {
        if (!obj) return;

        // Custom speeds and range allocations
        const rX = gsap.utils.random(20, 60);
        const rY = gsap.utils.random(20, 60);
        const rDur = gsap.utils.random(12, 22);
        const rRot = gsap.utils.random(180, 360);

        // Slow hover loop using sine/ease curves
        gsap.to(obj, {
          x: `+=${rX}`,
          y: `-=${rY}`,
          rotation: rRot,
          duration: rDur,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.5,
        });
      });

      // 2. Mouse Parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;

        // Normalize cursor position from -0.5 to 0.5
        const normX = (clientX / wWidth) - 0.5;
        const normY = (clientY / wHeight) - 0.5;

        objectsRef.current.forEach((obj, idx) => {
          if (!obj) return;
          // Different intensities based on object index
          const speedFactor = (idx + 1) * 35;
          
          gsap.to(obj, {
            xPercent: normX * speedFactor,
            yPercent: normY * speedFactor,
            ease: "power2.out",
            duration: 1.2,
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !objectsRef.current.includes(el)) {
      objectsRef.current.push(el);
    }
  };

  return (
    <div
      id="floating-objects-container"
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 floating-object-container"
    >
      {/* Dynamic and fully polished retro vector objects inspired by printed stamp elements */}

      {/* Object 1: Giant Retro Orange Sparkle (4-pointed star, Image 1) */}
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 md:w-32 md:h-32 top-[15%] left-[6%] opacity-35"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Drop shadow background */}
          <path
            d="M50 5 C50 32, 68 50, 95 50 C68 50, 50 68, 50 95 C50 68, 32 50, 5 50 C32 50, 50 32, 50 5 Z"
            fill="var(--text-color)"
            className="opacity-15"
            transform="translate(4, 4)"
          />
          <path
            d="M50 5 C50 32, 68 50, 95 50 C68 50, 50 68, 50 95 C50 68, 32 50, 5 50 C32 50, 50 32, 50 5 Z"
            fill="#ea580c"
            stroke="var(--text-color)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M50 25 C50 38, 62 50, 75 50 C62 50, 50 62, 50 75 C50 62, 38 50, 25 50 C38 50, 50 38, 50 25 Z"
            fill="var(--accent-color)"
            className="opacity-30"
          />
        </svg>
      </div>

      {/* Object 2: Concentric Circle Dot (Image 2) */}
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 md:w-32 md:h-32 top-[60%] left-[10%] opacity-30"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="53" cy="53" r="40" fill="var(--text-color)" className="opacity-15" />
          <circle cx="50" cy="50" r="40" stroke="var(--text-color)" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="28" stroke="var(--text-color)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="16" fill="#e11d48" stroke="var(--text-color)" strokeWidth="3.5" />
        </svg>
      </div>

      {/* Object 3: Hand-Drawn 5-Pointed Star (Image 3) */}
      <div
        ref={addToRefs}
        className="absolute w-20 h-20 md:w-28 md:h-28 top-[20%] right-[8%] opacity-40"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M50 5 L64 35 L96 38 L72 61 L79 93 L50 77 L21 93 L28 61 L4 38 L36 35 Z"
            fill="var(--text-color)"
            className="opacity-15"
            transform="translate(4, 4)"
          />
          <path
            d="M50 5 L64 35 L96 38 L72 61 L79 93 L50 77 L21 93 L28 61 L4 38 L36 35 Z"
            fill="var(--accent-color)"
            stroke="var(--text-color)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M50 20 L57 37 L75 39 L62 52 L66 70 L50 61 L34 70 L38 52 L25 39 L43 37 Z"
            stroke="var(--text-color)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="none"
          />
        </svg>
      </div>

      {/* Object 4: Parallel Retro Wavy Squiggles (Image 4) */}
      <div
        ref={addToRefs}
        className="absolute w-28 h-18 md:w-40 md:h-24 top-[68%] right-[6%] opacity-35"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 120 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Thick black outline underneath, bright retro color on top */}
          <path
            d="M10 20 C25 2, 40 2, 55 20 C70 38, 85 38, 100 20 C108 11, 114 11, 120 20"
            stroke="var(--text-color)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M10 20 C25 2, 40 2, 55 20 C70 38, 85 38, 100 20 C108 11, 114 11, 120 20"
            stroke="#ea580c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          
          <path
            d="M10 40 C25 22, 40 22, 55 40 C70 58, 85 58, 100 40 C108 31, 114 31, 120 40"
            stroke="var(--text-color)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M10 40 C25 22, 40 22, 55 40 C70 58, 85 58, 100 40 C108 31, 114 31, 120 40"
            stroke="#fb923c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Object 5: Mid-screen Retro Star Target Ring Combo */}
      <div
        ref={addToRefs}
        className="absolute w-14 h-14 md:w-18 md:h-18 top-[45%] left-[45%] opacity-25"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M50 15 C50 35, 35 50, 15 50 C35 50, 50 65, 50 85 C50 65, 65 50, 85 50 C65 50, 50 35, 50 15 Z"
            fill="#ea580c"
            stroke="var(--text-color)"
            strokeWidth="4"
          />
          <circle cx="50" cy="50" r="10" fill="var(--accent-color)" stroke="var(--text-color)" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Object 6: Deeper Target Crossair Compass Reticle */}
      <div
        ref={addToRefs}
        className="absolute w-20 h-20 md:w-24 md:h-24 top-[85%] left-[35%] opacity-[0.16]"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="50" cy="50" r="32" stroke="var(--text-color)" strokeWidth="3" strokeDasharray="5 5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="var(--text-color)" strokeWidth="2.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="var(--text-color)" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="14" fill="#e11d48" stroke="var(--text-color)" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
}
