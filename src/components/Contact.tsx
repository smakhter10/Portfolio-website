import React, { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Copy, Check, Send, Sparkles } from "lucide-react";
import { portfolioData } from "../portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  onHoverStart?: (type?: string) => void;
  onHoverEnd?: () => void;
}

export default function Contact({ onHoverStart, onHoverEnd }: ContactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", budget: "Premium", message: "" });
  const [isSent, setIsSent] = useState(false);

  // Spotlight Torch coordinates & hover states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the massive contact header
      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Reveal email link button
      gsap.fromTo(
        emailRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate luxury API response loading
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setIsFormOpen(false);
      setFormData({ name: "", email: "", budget: "Premium", message: "" });
      alert(portfolioData.contact.successAlertMessage);
    }, 1500);
  };

  return (
    <section
      id="contact-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[90vh] w-full flex flex-col justify-between px-6 py-20 md:px-12 md:py-28 overflow-hidden bg-[#080808] text-white"
    >
      {/* Torchlight Masking Overlay: Black overlay where the cursor creates a transparent spotlight (Disabled on mobile) */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-20 bg-[#080808] transition-opacity duration-300 select-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle 170px at ${isHovered ? `${mousePos.x}px` : "50%"} ${isHovered ? `${mousePos.y}px` : "50%"}, transparent 0%, rgba(8, 8, 8, 1) 100%)`,
          maskImage: `radial-gradient(circle 170px at ${isHovered ? `${mousePos.x}px` : "50%"} ${isHovered ? `${mousePos.y}px` : "50%"}, transparent 0%, rgba(8, 8, 8, 1) 100%)`,
          opacity: 0.98,
        }}
      />

      <div ref={triggerRef} className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-center text-center space-y-12 relative z-10">
        
        {/* Core CTA Phrase */}
        <div className="space-y-4 max-w-4xl">
          <span className="font-mono-editorial text-[10px] uppercase tracking-widest font-bold text-white/50 flex items-center justify-center gap-2">
            <Sparkles size={11} className="animate-spin text-white/75" />
            {portfolioData.contact.sectionTag}
          </span>
          <h2
            ref={headlineRef}
            className="contact-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial leading-none tracking-tighter text-white transform scale-y-105"
          >
            {portfolioData.contact.ctaHeadline}
          </h2>
        </div>

        {/* Email Copy Trigger */}
        <button
          ref={emailRef}
          onClick={handleCopyEmail}
          onMouseEnter={() => onHoverStart?.("magnetic")}
          onMouseLeave={onHoverEnd}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono-editorial text-sm tracking-wider cursor-none transition-all duration-300"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span>{portfolioData.contactEmail}</span>
          {copied ? (
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold font-sans-editorial">copied!</span>
          ) : (
            <span className="text-[9px] text-white/40 uppercase font-sans-editorial font-bold">click to copy</span>
          )}
        </button>

        {/* Start a Project Core CTA Button */}
        <button
          onClick={() => setIsFormOpen(true)}
          onMouseEnter={() => onHoverStart?.("magnetic")}
          onMouseLeave={onHoverEnd}
          className="px-10 py-5 rounded-full bg-white text-black font-serif-editorial text-lg italic hover:scale-105 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.15)] z-30 cursor-none relative group overflow-hidden"
        >
          <span className="relative z-10 font-bold flex items-center gap-2 text-black transition-colors duration-300">
            Start a Project <ArrowUpRight size={18} />
          </span>
        </button>

      </div>

      {/* Slide-out Interactive Project Planner Drawer (Start a Project Form) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop screen */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFormOpen(false)}
          />

          {/* Drawer content (Styled in high-end pitch-black/charcoal layout) */}
          <div className="relative w-full max-w-lg h-full bg-[#0d0d0f] border-l border-white/10 p-8 flex flex-col justify-between shadow-2xl overflow-y-auto block z-10 transition-transform duration-500 text-white">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <span className="font-mono-editorial text-[10px] uppercase font-bold tracking-widest text-white/80">
                  Project Brief Generator
                </span>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs uppercase font-mono-editorial py-1 px-3 border border-white/20 rounded-full hover:border-white transition-all text-white/90"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono-editorial text-white/60 mb-2">
                    {portfolioData.contact.budgetPlaceholder}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-2.5 text-md text-white focus:outline-none placeholder-white/30 font-serif-editorial animate-transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono-editorial text-white/60 mb-2">
                    {portfolioData.contact.emailPlaceholder}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@agency.com"
                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-2.5 text-md text-white focus:outline-none placeholder-white/30 font-serif-editorial animate-transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono-editorial text-white/60 mb-3">
                    {portfolioData.contact.budgetTierLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {portfolioData.contact.budgetTiers.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`py-2 px-3 rounded-full text-[10px] font-mono-editorial border border-white/20 hover:border-white/80 hover:bg-white hover:bg-opacity-5 uppercase transition-all duration-300 ${
                          formData.budget === b
                            ? "bg-white text-black font-bold"
                            : ""
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono-editorial text-white/60 mb-2">
                    {portfolioData.contact.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={portfolioData.contact.messagePlaceholder}
                    className="w-full bg-transparent border border-white/20 focus:border-white p-3 rounded-xl text-xs text-white focus:outline-none placeholder-white/30 font-serif-editorial resize-none animate-transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSent}
                  className="w-full py-4 rounded-xl bg-white text-black font-mono-editorial text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors duration-300"
                >
                  {isSent ? (
                    <>{portfolioData.contact.buttonSendingLabel}</>
                  ) : (
                    <>
                      {portfolioData.contact.buttonSubmitLabel} <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="pt-8 border-t border-white/10 text-[9px] uppercase tracking-widest font-mono-editorial text-white/40">
              {portfolioData.contact.responseGuaranteedLabel}
            </div>
          </div>
        </div>
      )}

      {/* Editorial footer rail */}
      <div className="max-w-7xl mx-auto w-full border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-mono-editorial text-white/40 relative z-30">
        <div className="flex flex-wrap gap-4">
          {portfolioData.socials.map((soc) => (
            <a
              key={soc.label}
              href={soc.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-300 cursor-none"
            >
              {soc.label}
            </a>
          ))}
        </div>
        <span>{portfolioData.clientName.toUpperCase()} CREATIVE &copy; {portfolioData.copyYear}</span>
      </div>
    </section>
  );
}
