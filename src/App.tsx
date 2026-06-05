import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import CreatorProfile from "./components/CreatorProfile.tsx";
import FloatingObjects from "./components/FloatingObjects.tsx";
import About from "./components/About.tsx";
import Work from "./components/Work.tsx";
import Services from "./components/Services.tsx";
import Contact from "./components/Contact.tsx";
import Preloader from "./components/Preloader.tsx";

import "./styles/global.css";
import "./styles/responsive.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<string>("default");

  // Lock body scroll while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Track scroll progress for the top level indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track client mouse coordinates for custom cursor logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Global Snappy Pop Transitions (inspired by Sowieso / Wero wallet playful aesthetics)
  useEffect(() => {
    // Select entering sections except landing Hero
    const sections = gsap.utils.toArray<HTMLElement>("section:not(#hero-section)");
    
    sections.forEach((section) => {
      // 1. Fast, snappy reveal for the entire section container once it crosses the threshold
      gsap.fromTo(
        section,
        {
          y: 45,             // subtle jump offset from below
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out", // swift, clean transition curve
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // reveals exactly when the section top reaches 85% of viewport
            toggleActions: "play none none none", // plays once (never drags, lags, or gets stuck)
          },
        }
      );

      // 2. Playful Staggered Spring Trigger for internal elements within each section
      const interactiveItems = section.querySelectorAll(".font-serif-editorial, .grid > div, form, .services-card, .border-t, h2, h3, p");
      if (interactiveItems.length > 0) {
        gsap.fromTo(
          interactiveItems,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,     // punchy, quick staggered cascading sequence
            ease: "back.out(1.2)", // premium playful bounce that lands beautifully
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none none",
            }
          }
        );
      }
    });
  }, []);

  return (
    <div
      id="portfolio-main-wrapper"
      className={`relative min-h-screen w-full overflow-hidden ${
        cursorType !== "default" ? "cursor-hovering" : ""
      } ${cursorType === "magnetic" ? "cursor-hovering-magnetic" : ""}`}
    >
      {/* High-Contrast Interactive Blueprint Preloader */}
      <Preloader onComplete={() => setLoading(false)} />

      {/* Scroll Progress Indicator */}
      <div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 h-[3.5px] bg-[var(--text-color)] z-[9999] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* SVG Turbulence Grain Overlay */}
      <div id="ambient-grain-overlay" className="grain-overlay" />

      {/* Custom Follow-Mouse Elegant Circular Cursor */}
      <div
        id="luxury-custom-cursor"
        className="custom-cursor hidden lg:block"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        id="luxury-custom-cursor-dot"
        className="custom-cursor-dot hidden lg:block"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Minimal Header navigation / theme manager */}
      <Header
        onHoverStart={(type) => setCursorType(type || "standard")}
        onHoverEnd={() => setCursorType("default")}
      />

      {/* Core Portfolio Sections */}
      <main id="portfolio-scroll-container" className="relative w-full">
        {/* Floating background decorative vector shapes with parallax mapping */}
        <FloatingObjects />

        {/* Hero Landing */}
        <Hero
          onHoverStart={(type) => setCursorType(type || "standard")}
          onHoverEnd={() => setCursorType("default")}
        />

        {/* Standalone Interactive Creator Profile Section with Binary Code-Reveal */}
        <CreatorProfile />

        {/* Section 1: Philosophy & Skills */}
        <About />

        {/* Section 2: Portfolio / Works */}
        <Work />

        {/* Section 3: Services & Abilities */}
        <Services />

        {/* Section 4: Contact Core Form */}
        <Contact
          onHoverStart={(type) => setCursorType(type || "standard")}
          onHoverEnd={() => setCursorType("default")}
        />
      </main>

      {/* Subtle accessibility instructions in lower left screen margin */}
      <div className="fixed bottom-4 left-6 z-40 hidden md:block select-none pointer-events-none opacity-30 text-[8px] font-mono-editorial text-[var(--text-color)]">
        ALT + T SWITCH THEME &bull; CLICK MAIN NAME TO MORPH
      </div>
    </div>
  );
}
