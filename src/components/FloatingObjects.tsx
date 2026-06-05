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
      {/* Dynamic elegant feathers, abstract leaves and luxury spheres as SVGs */}

      {/* Object 1: Premium Leaf / Feather */}
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 md:w-32 md:h-32 top-[18%] left-[8%] opacity-35"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-[0.7] stroke-[var(--text-color)] stroke-dasharray-[2,4]"
        >
          <path
            d="M50 5 C50 5, 80 40, 80 65 C80 85, 65 95, 50 95 C35 95, 20 85, 20 65 C20 40, 50 5, 50 5 Z"
            fill="none"
          />
          <path d="M50 5 L50 95" strokeDasharray="3 3" />
          <path d="M50 35 Q65 42, 72 45" />
          <path d="M50 45 Q35 52, 28 55" />
          <path d="M50 55 Q68 62, 76 65" />
          <path d="M50 65 Q32 72, 24 75" />
        </svg>
      </div>

      {/* Object 2: Orbital Rings */}
      <div
        ref={addToRefs}
        className="absolute w-28 h-28 md:w-40 md:h-40 top-[60%] left-[12%] opacity-25"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-[0.5] stroke-[var(--text-color)]"
        >
          <circle cx="50" cy="50" r="40" />
          <ellipse cx="50" cy="50" rx="40" ry="12" transform="rotate(-30 50 50)" />
          <ellipse cx="50" cy="50" rx="40" ry="12" transform="rotate(45 50 50)" />
          <circle cx="50" cy="50" r="3" fill="var(--text-color)" />
        </svg>
      </div>

      {/* Object 3: Premium Abstract Asterisk / Floral */}
      <div
        ref={addToRefs}
        className="absolute w-20 h-20 md:w-28 md:h-28 top-[22%] right-[10%] opacity-40"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-[0.8] stroke-[var(--text-color)]"
        >
          <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" />
          <circle cx="50" cy="50" r="8" fill="var(--bg-color)" className="stroke-[0.8] stroke-[var(--text-color)]" />
          <circle cx="50" cy="10" r="2" fill="var(--text-color)" />
          <circle cx="50" cy="90" r="2" fill="var(--text-color)" />
          <circle cx="10" cy="50" r="2" fill="var(--text-color)" />
          <circle cx="90" cy="50" r="2" fill="var(--text-color)" />
        </svg>
      </div>

      {/* Object 4: Organic Wave Contour */}
      <div
        ref={addToRefs}
        className="absolute w-32 h-32 md:w-44 md:h-44 top-[65%] right-[8%] opacity-30"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-[0.6] stroke-[var(--text-color)]"
        >
          <path d="M10 60 C30 20, 90 20, 110 60 C110 60, 110 60, 110 60 C90 100, 30 100, 10 60 Z" />
          <path d="M25 60 C40 35, 80 35, 95 60 C95 60, 95 60, 95 60 C80 85, 40 85, 25 60 Z" />
          <path d="M40 60 C50 45, 70 45, 80 60 C80 60, 80 60, 80 60 C70 75, 50 75, 40 60 Z" />
          <circle cx="60" cy="60" r="5" fill="var(--text-color)" />
        </svg>
      </div>

      {/* Object 5: Minimal Star Burst Center Top Left Extra */}
      <div
        ref={addToRefs}
        className="absolute w-12 h-12 md:w-16 md:h-16 top-[48%] left-[45%] opacity-[0.18]"
        style={{ transformOrigin: "center" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[var(--text-color)]"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
        </svg>
      </div>
    </div>
  );
}
