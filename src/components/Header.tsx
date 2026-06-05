import { useEffect, useState } from "react";
import { Sun, Moon, Palette, Check, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../portfolioData";

interface HeaderProps {
  onHoverStart?: (type?: string) => void;
  onHoverEnd?: () => void;
}

export default function Header({ onHoverStart, onHoverEnd }: HeaderProps) {
  const [activeTheme, setActiveTheme] = useState<string>("mustard");
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply theme to document documentelement
  const changeTheme = (theme: string) => {
    setActiveTheme(theme);
    const root = document.documentElement;
    if (theme === "mustard") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  };

  // Keyboard shortcut to switch themes for premium accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "t" && e.altKey) {
        const themes = ["mustard", "cream", "dark", "blue"];
        const currentIdx = themes.indexOf(activeTheme);
        const nextThemes = themes[(currentIdx + 1) % themes.length];
        changeTheme(nextThemes);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTheme]);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const themes = [
    { id: "mustard", name: "Deep Mustard", color: "#e5a93b" },
    { id: "cream", name: "Cream Editorial", color: "#f7f3eb" },
    { id: "dark", name: "Dark Luxury", color: "#111111" },
    { id: "blue", name: "Blue Experimental", color: "#3b82f6" },
  ];

  const handlePrev = () => {
    const currentIdx = themes.findIndex((t) => t.id === activeTheme);
    const prevIdx = (currentIdx - 1 + themes.length) % themes.length;
    changeTheme(themes[prevIdx].id);
  };

  const handleNext = () => {
    const currentIdx = themes.findIndex((t) => t.id === activeTheme);
    const nextIdx = (currentIdx + 1) % themes.length;
    changeTheme(themes[nextIdx].id);
  };

  return (
    <>
      {/* Editorial Navigation Headers: Sticky on mobile, absolute on desktop */}
      <header
        id="portfolio-header"
        className="fixed md:absolute top-0 left-0 w-full z-40 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center select-none bg-[var(--bg-color)]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-black/5 md:border-b-0 transition-colors duration-200"
      >
        {/* Top Left Navigation: Work, About (hidden in mobile) */}
        <nav className="hidden md:flex items-center space-x-6 md:space-x-10 text-xs font-semibold tracking-widest uppercase font-mono-editorial">
          <button
            onClick={() => handleScrollTo("work-section")}
            onMouseEnter={() => onHoverStart?.("magnetic")}
            onMouseLeave={onHoverEnd}
            className="relative group py-1 text-[var(--text-color)] opacity-75 hover:opacity-100 transition-opacity cursor-none"
          >
            Work
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--text-color)] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleScrollTo("about-section")}
            onMouseEnter={() => onHoverStart?.("magnetic")}
            onMouseLeave={onHoverEnd}
            className="relative group py-1 text-[var(--text-color)] opacity-75 hover:opacity-100 transition-opacity cursor-none"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--text-color)] transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Brand visual anchor/indicator in top-left for mobile balancing */}
        <div className="md:hidden flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-color)] animate-ping" />
          <span className="font-mono-editorial text-xs uppercase font-extrabold tracking-widest text-[var(--text-color)]">
            {portfolioData.clientName.toUpperCase()}
          </span>
        </div>

        {/* Hamburger Trigger (Mobile Only) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000000] hover:scale-105 active:scale-95 transition-transform"
        >
          <Menu size={16} className="stroke-[2.5]" />
        </button>

        {/* Top Right Navigation: Projects, Contact (hidden in mobile) */}
        <nav className="hidden md:flex items-center space-x-6 md:space-x-10 text-xs font-semibold tracking-widest uppercase font-mono-editorial">
          <button
            onClick={() => handleScrollTo("work-section")}
            onMouseEnter={() => onHoverStart?.("magnetic")}
            onMouseLeave={onHoverEnd}
            className="relative group py-1 text-[var(--text-color)] opacity-75 hover:opacity-100 transition-opacity cursor-none"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--text-color)] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleScrollTo("contact-section")}
            onMouseEnter={() => onHoverStart?.("magnetic")}
            onMouseLeave={onHoverEnd}
            className="relative group py-1 text-[var(--text-color)] opacity-75 hover:opacity-100 transition-opacity cursor-none"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--text-color)] transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>
      </header>

      {/* Full Screen Falling Drapes Overlay Menu (Mobile Only) */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
            {/* Curtain 1: Translucent Secondary Accent Drape */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
              className="absolute inset-0 bg-[#e5a93b] opacity-45 z-10"
            />

            {/* Curtain 2: Charcoal Under-curtain Drape */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.55, delay: 0.08 }}
              className="absolute inset-0 bg-[#161619] z-20"
            />

            {/* Curtain 3: Primary Dark Interactive Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.62, delay: 0.15 }}
              className="absolute inset-0 bg-[#0d0d10] z-30 flex flex-col justify-between items-center px-6 py-12 relative w-full h-full"
            >
              {/* Backing Giant Identity Watermark */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none text-center font-serif-editorial text-[22vw] leading-none tracking-tighter text-white font-black italic z-0">
                SEEYAM
              </div>

              {/* Top Bar inside Curtain Overlay */}
              <div className="w-full flex justify-between items-center z-40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e5a93b] animate-pulse" />
                  <span className="font-mono-editorial text-[10px] uppercase font-extrabold tracking-widest text-[#faf6f0]">
                    MENU CHANNELS
                  </span>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white border-2 border-black text-black flex items-center justify-center hover:scale-105 active:scale-95 shadow-[3px_3px_0px_#000000] transition-transform"
                >
                  <X size={16} className="stroke-[2.5]" />
                </button>
              </div>

              {/* Overlay Navigation Links with Staggered Cascading Slides */}
              <div className="flex flex-col items-center justify-center gap-8 z-40 w-full max-w-xs text-center flex-grow">
                {[
                  { label: "SELECTED WORK", target: "work-section", sub: "STORY 01" },
                  { label: "ARTIST PROFILE", target: "about-section", sub: "METRIC 02" },
                  { label: "CONTACT DESK", target: "contact-section", sub: "TRANSMIT 03" }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ y: 55, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 35, opacity: 0 }}
                    transition={{ delay: 0.4 + index * 0.08, ease: "easeOut", duration: 0.4 }}
                    onClick={() => {
                      setMenuOpen(false);
                      setTimeout(() => {
                        handleScrollTo(item.target);
                      }, 500); // allow curtains to glide back up smoothly before scrolling starts
                    }}
                    className="group flex flex-col items-center gap-1 focus:outline-none"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#e5a93b]/80 font-bold">
                      {item.sub}
                    </span>
                    <span className="text-2xl font-serif-editorial text-white hover:text-[#e5a93b] active:scale-95 transition-all tracking-tighter">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Bottom stamp inside menu */}
              <div className="w-full flex justify-between items-center text-[8px] uppercase tracking-widest font-mono text-white/30 z-30">
                <span>{portfolioData.clientName.toUpperCase()} PORTFOLIO</span>
                <span>EDITION &copy;{portfolioData.copyYear}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standalone Theme Slider: Sticky, floating at the bottom in mobile and top in desktop with a gorgeous 3D comic-style drop shadow */}
      <div className="fixed bottom-6 md:top-6 md:bottom-auto left-1/2 -translate-x-1/2 z-50 select-none group/slider">
        {/* Solid Black Underlay Shadow Pill (Inspiration from user's attachment) */}
        <div className="absolute inset-0 bg-black rounded-full translate-y-[4px] translate-x-[3px] md:translate-y-[6px] md:translate-x-[4px] w-full h-8 md:h-10 -z-10" />

        {/* Foreground Interactive Slider Pill */}
        <div className="flex items-center h-8 md:h-10 px-2 md:px-2.5 bg-white border-2 border-black rounded-full text-neutral-800 hover:-translate-y-[1px] hover:-translate-x-[0.5px] md:hover:-translate-y-[1.5px] md:hover:-translate-x-[1px] active:translate-y-[3px] md:active:translate-y-[4px] active:translate-x-[2px] md:active:translate-x-[2.5px] transition-all duration-150">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          onMouseEnter={() => onHoverStart?.("magnetic")}
          onMouseLeave={onHoverEnd}
          className="p-0.5 md:p-1 rounded-full text-neutral-500 hover:text-black hover:bg-black/5 transition-all cursor-none"
          title="Previous Theme"
        >
          <ChevronLeft size={12} className="stroke-[2.5]" />
        </button>

        {/* Small vertical divider */}
        <div className="h-3 md:h-4 w-[1.5px] bg-black/15 mx-1 md:mx-2" />

        {/* Dynamic theme select dots */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {themes.map((theme) => {
            const isActive = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                onMouseEnter={() => onHoverStart?.("standard")}
                onMouseLeave={onHoverEnd}
                className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full transition-all duration-350 cursor-none hover:scale-120"
                title={`Switch to ${theme.name}`}
              >
                {/* Active selector outline representing choice indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeThemePillBorder"
                    className="absolute inset-[1px] border border-black/90 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 25 }}
                  />
                )}
                {/* Active center core indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeThemeCenterDot"
                    className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full z-20"
                    transition={{ type: "spring", stiffness: 380, damping: 25 }}
                  />
                )}
                {/* Outer colored dot */}
                <span
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-black/10 shadow-sm shrink-0 transition-opacity"
                  style={{
                    backgroundColor: theme.color,
                    opacity: isActive ? 0.35 : 0.85,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Small vertical divider */}
        <div className="h-3 md:h-4 w-[1.5px] bg-black/15 mx-1 md:mx-2" />

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          onMouseEnter={() => onHoverStart?.("magnetic")}
          onMouseLeave={onHoverEnd}
          className="p-0.5 md:p-1 rounded-full text-neutral-500 hover:text-black hover:bg-black/5 transition-all cursor-none"
          title="Next Theme"
        >
          <ChevronRight size={12} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
    </>
  );
}
