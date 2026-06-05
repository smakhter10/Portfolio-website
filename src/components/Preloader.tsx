import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../portfolioData";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [flickerText, setFlickerText] = useState("PEEL_STAGE_INIT");

  // Multi-stage organic loading speed simulation
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Create non-linear step increments so it behaves like organic loading
      const remaining = 100 - currentProgress;
      let nextStep = Math.floor(Math.random() * 12) + 1;
      
      if (currentProgress > 40 && currentProgress < 60) {
        // Slow down slightly in the middle
        nextStep = Math.floor(Math.random() * 4) + 1;
      } else if (remaining < 15) {
        // Snappy wrap up
        nextStep = Math.floor(Math.random() * 3) + 1;
      }

      currentProgress = Math.min(100, currentProgress + nextStep);
      setProgress(currentProgress);

      // Flickering diagnostic labels
      if (currentProgress < 20) {
        setFlickerText("INDEXING_FILES // SE_EST_2020");
      } else if (currentProgress < 50) {
        setFlickerText("COMPILING_BLUEPRINT_SCHEMATICS");
      } else if (currentProgress < 75) {
        setFlickerText("POLISHING_CREATIVE_ROUTINES_");
      } else if (currentProgress < 95) {
        setFlickerText("TRANSMITTING_GUI_PARAMETERS__STATUS_OK");
      } else {
        setFlickerText("READY_TO_LAUNCH_SYSTEM");
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Wait a short duration to appreciate "100%", then fire exit sequence
        setTimeout(() => {
          setIsDone(true);
          // Let the smooth slide-up exit finish before telling App to update loading state
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 600);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Pad the counter to always maintain exactly three digits (e.g. "000", "039", "100")
  const formattedProgress = String(progress).padStart(3, "0");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-110%",
            transition: { 
              duration: 0.9, 
              ease: [0.76, 0, 0.24, 1] // Premium smooth power-easing curve
            } 
          }}
          className="fixed inset-0 w-full h-screen bg-[#1c1c1e] text-[#fbfbf9] z-[99999] select-none pointer-events-auto overflow-hidden flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Technical Blueprint Grid Accents */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:35px_35px] sm:[background-size:50px_50px]" />
          
          {/* Blueprint subtle border lines */}
          <div className="absolute inset-4 sm:inset-6 border border-white/5 pointer-events-none z-0" />

          {/* TOP MARGIN: System diagnostics details */}
          <div className="w-full flex justify-between items-start z-10 relative font-mono text-[8px] sm:text-[9.5px] uppercase tracking-widest text-[#9c9c99] opacity-85">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
              <span>SYS_INITIALIZING // {flickerText}</span>
            </div>
            <div className="text-right hidden sm:block">
              <span>{portfolioData.clientName} EST. 2020 &copy; 2026 // CODE_F9</span>
            </div>
          </div>

          {/* CENTER: Minimalist layout lines & diagnostic marker */}
          <div className="flex-grow flex items-center justify-center relative z-10">
            <div className="text-center space-y-2 opacity-5">
              <span className="block font-serif-editorial italic text-3xl sm:text-5xl text-white font-extrabold">
                {portfolioData.clientName}
              </span>
              <span className="block font-mono text-[9px] tracking-[0.3em] uppercase text-white font-bold">
                PORTFOLIO PLATFORM
              </span>
            </div>
          </div>

          {/* BOTTOM MARGIN: Dynamic gliding percentage counter */}
          <div className="w-full h-24 sm:h-36 relative z-10 select-none pb-2">
            {/* Smooth glided container that shifts left to right as loading state advances */}
            <div 
              className="absolute bottom-0 transition-all duration-[400ms] ease-out flex items-baseline gap-1"
              style={{ 
                // Linearly glides across horizontal axis bounded between 0% and maximum right space
                left: `${progress * 0.78}%`,
                transform: `translateX(-${progress < 50 ? 0 : progress}%)`
              }}
            >
              {/* Giant screen-peeled counting digits */}
              <div className="overflow-hidden">
                <motion.span 
                  animate={isDone ? { y: "115%" } : { y: 0 }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  className="block font-sans font-black text-[12vw] sm:text-[8vw] lg:text-[7vw] leading-none tracking-tighter"
                  style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 900 }}
                >
                  {formattedProgress}
                </motion.span>
              </div>

              {/* Smaller compact percentage sign */}
              <div className="overflow-hidden">
                <motion.span
                  animate={isDone ? { y: "115%" } : { y: 0 }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                  className="block font-serif-editorial text-[4vw] sm:text-[3vw] lg:text-[2vw] font-bold leading-none select-none opacity-80"
                >
                  %
                </motion.span>
              </div>
            </div>
          </div>

          {/* Editorial corner coordinates */}
          <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 z-10 font-mono text-[7px] sm:text-[8px] text-[#9c9c99] opacity-40 select-none tracking-widest hidden sm:block">
            X:{Math.round(progress * 19.2)} // Y:{Math.round(progress * 10.8)} // SCALE:1.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
