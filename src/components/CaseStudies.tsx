import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Folder, 
  FolderOpen, 
  Terminal, 
  Cpu, 
  Layers, 
  Activity, 
  CornerDownRight, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  X,
  FileCode,
  ArrowUpRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Custom self-contained Audio synthesis engine to output vintage PC floppy hums and typewriter sounds
class WorkstationAudioSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Soft high-pitched PC keyboard click
  playBeep(freq: number = 800, duration: number = 0.05, vol: number = 0.02) {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context fallbacks
    }
  }

  // Multi-frequency data decryption scratch noise
  playDiskRead() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Grain pattern replicating drive heads scratching against magnet plate
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.8);
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400 + Math.random() * 300, this.ctx.currentTime);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.11);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      noise.start();
      noise.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }
}

interface CaseStudyDetails {
  clientRequest: string;
  problem: string;
  role: string;
  solution: string;
  result: string;
  tools: string[];
}

interface ArchiveItem {
  id: string;
  name: string;
  type: string;
  status: string;
  stack: string[];
  summary: string;
  borderColorHex: string;
  accentBgHex: string;
  accentTextHex: string;
  details: CaseStudyDetails;
  liveUrl?: string;
  fileSize: string;
  checksum: string;
}

const CASE_ARCHIVE_DATA: ArchiveItem[] = [
  {
    id: "CASE-FILE_001",
    name: "WordPress Business Website Redesign",
    type: "Client Website Redesign",
    status: "Completed",
    stack: ["WordPress", "Elementor", "WooCommerce", "WPForms", "CSS", "Responsive Design"],
    summary: "Bespoke business profile redesign with refreshed typography, layouts, forms, and fully responsive media frameworks.",
    borderColorHex: "#e5a93b", // mustard
    accentBgHex: "bg-[#e5a93b]/10",
    accentTextHex: "text-[#e5a93b]",
    fileSize: "68.4 KB",
    checksum: "B4_A2_99_F0",
    liveUrl: "https://github.com/smakhter10",
    details: {
      clientRequest: "The client needed a modern, responsive business website that looked more professional, worked smoothly on all devices, and made it easier for visitors to understand their services and contact the business.",
      problem: "The existing website felt outdated, was not properly optimized for mobile users, and did not clearly present the client’s services. Some sections lacked proper structure, spacing, and visual hierarchy, which made the website less effective for potential customers.",
      role: "WordPress Developer / Website Designer",
      solution: "I redesigned the website using WordPress and Elementor with a cleaner layout, improved section structure, better typography, responsive spacing, and clear call-to-action buttons. I also improved the contact flow, added forms, optimized the design for mobile, and made sure the website looked professional across desktop, tablet, and mobile screens.",
      result: "The final website became cleaner, more modern, and easier to navigate. The client received a fully responsive website that could properly represent their business and help convert visitors into leads.",
      tools: ["WordPress", "Elementor Pro", "WooCommerce", "WPForms", "Vanilla CSS", "Responsive Design Rules"]
    }
  },
  {
    id: "CASE-FILE_002",
    name: "Custom Eligibility Quiz Plugin",
    type: "Custom WordPress Plugin",
    status: "Completed",
    stack: ["WordPress", "PHP", "JavaScript", "AJAX", "Shortcode", "Custom Logic", "CSS"],
    summary: "Proprietary interactive question-and-answer plug-in that automates complex user eligibility calculation rules.",
    borderColorHex: "#22c55e", // green
    accentBgHex: "bg-emerald-950/20",
    accentTextHex: "text-emerald-500",
    fileSize: "94.2 KB",
    checksum: "A5_0E_F1_7D",
    liveUrl: "https://github.com/smakhter10",
    details: {
      clientRequest: "The client needed a custom quiz-style tool that could ask users a series of questions and show whether they may be eligible or not based on their answers.",
      problem: "The client wanted to simplify a complex decision-making process for website visitors. Instead of making users read long information pages, they needed an interactive tool that could guide users step by step and provide a result instantly.",
      role: "Plugin Developer",
      solution: "I developed a custom WordPress plugin with a question-and-answer flow. The plugin collected user responses, processed the answers using custom logic, and displayed an eligibility result. I used shortcode support so the quiz could be placed easily on any page. I also worked on making the interface simple, responsive, and easy for non-technical users to interact with.",
      result: "The final plugin turned a complex process into a simple interactive experience. Visitors could answer questions and receive quick guidance, while the website became more useful and engaging.",
      tools: ["WordPress Plugin API", "Object-Oriented PHP", "JavaScript Events", "AJAX Engine", "WordPress Shortcodes", "CSS Layouts"]
    }
  },
  {
    id: "CASE-FILE_003",
    name: "WooCommerce Website Support",
    type: "Website Maintenance & Technical Support",
    status: "Completed",
    stack: ["WordPress", "WooCommerce", "Elementor", "cPanel", "Hosting Tools", "CSS", "Debugging"],
    summary: "Routine system diagnostics, Elementor responsive visual adjustments, plugin conflicts, cPanel checks, and server optimizations.",
    borderColorHex: "#22d3ee", // cyan
    accentBgHex: "bg-cyan-950/20",
    accentTextHex: "text-cyan-400",
    fileSize: "82.1 KB",
    checksum: "C1_FF_D4_0A",
    liveUrl: "https://github.com/smakhter10",
    details: {
      clientRequest: "The client needed help fixing website issues, improving responsiveness, solving plugin-related problems, and keeping the website stable after updates and modifications.",
      problem: "The website had different technical issues such as layout problems, plugin conflicts, mobile responsiveness issues, form problems, and occasional hosting or performance-related concerns. These issues affected the user experience and made it difficult for the client to manage the site confidently.",
      role: "WordPress Support Developer",
      solution: "I reviewed the website carefully, identified the source of the issues, and fixed them step by step. I handled plugin conflicts, adjusted Elementor layouts, improved mobile responsiveness, fixed form-related issues, checked WooCommerce functionality, and provided support through testing and troubleshooting. I also helped with hosting-related checks when needed.",
      result: "The website became more stable, responsive, and easier for the client to use. The client received ongoing technical support, faster issue resolution, and a better-maintained WordPress website.",
      tools: ["WordPress", "WooCommerce Engine", "Elementor Layouts", "cPanel Console", "Hosting Diagnostics", "Custom CSS Tweaks", "Plugin Debugging Mode"]
    }
  }
];

export default function CaseStudies() {
  const synth = useRef(new WorkstationAudioSynth());
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // States for diagnostic file verification sequence
  const [deviceCheck, setDeviceCheck] = useState<"IDLE" | "SCANNING" | "READY">("IDLE");
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showScanlines, setShowScanlines] = useState<boolean>(true);

  // State to simulate decryption sequences on separate cards
  const [cardStatus, setCardStatus] = useState<Record<string, "LOCKED" | "DECRYPTING" | "SECURED">>({
    "CASE-FILE_001": "LOCKED",
    "CASE-FILE_002": "LOCKED",
    "CASE-FILE_003": "LOCKED"
  });

  const [decryptedValues, setDecryptedValues] = useState<Record<string, number>>({
    "CASE-FILE_001": 0,
    "CASE-FILE_002": 0,
    "CASE-FILE_003": 0
  });

  // GSAP entering animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for initial grid cards
      gsap.fromTo(
        ".retro-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: "#case-studies-section",
            start: "top 78%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    // Boot workstation check log sequence on page loading scroll trigger
    ScrollTrigger.create({
      trigger: "#case-studies-section",
      start: "top 80%",
      onEnter: () => {
        if (deviceCheck === "IDLE") {
          runWorkstationDiagnostics();
        }
      }
    });

    return () => ctx.revert();
  }, [deviceCheck]);

  // Command workstation diagnostics logs sequence
  const runWorkstationDiagnostics = async () => {
    setDeviceCheck("SCANNING");
    const steps = [
      "SYSTEM INITIATED // BOOTING PROJECT ARCHIVE NODE...",
      "VERIFYING INDEX DATA MEMORY ALLOCATIONS...",
      "INTEGRITY METRICS SEED: OK [99.78% SUCCESS RATIO]",
      "3 ARCHIVE BLOCKS LOCATED REQUIRING PASSKEY INTRUSION...",
      "READY FOR SECURE ENVELOPE INSPECTION."
    ];

    for (let i = 0; i < steps.length; i++) {
      synth.current.playBeep(650 - i * 60, 0.08, 0.02);
      setSystemLogs(prev => [...prev, `[INIT]: ${steps[i]}`]);
      await new Promise(resolve => setTimeout(resolve, 380));
    }
    setDeviceCheck("READY");
    synth.current.playBeep(920, 0.25, 0.04);
  };

  // Run Simulated Decryption Sequence on click
  const triggerDecryption = (id: string) => {
    if (cardStatus[id] !== "LOCKED") return;

    synth.current.playBeep(480, 0.1, 0.03);
    setCardStatus(prev => ({ ...prev, [id]: "DECRYPTING" }));

    let prg = 0;
    const interval = setInterval(() => {
      prg += Math.floor(Math.random() * 12) + 6;
      if (prg >= 100) {
        prg = 100;
        clearInterval(interval);
        setCardStatus(prev => ({ ...prev, [id]: "SECURED" }));
        synth.current.playBeep(880, 0.25, 0.05);
      } else {
        synth.current.playDiskRead();
      }
      setDecryptedValues(prev => ({ ...prev, [id]: prg }));
    }, 85);
  };

  // Open full-screen popup window
  const openCaseFile = (id: string) => {
    synth.current.playBeep(1100, 0.15, 0.04);
    setActiveTab(id);
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
  };

  // Close popup window
  const closeCaseFile = () => {
    synth.current.playBeep(350, 0.12, 0.03);
    setActiveTab(null);
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
  };

  const activeProject = CASE_ARCHIVE_DATA.find(p => p.id === activeTab);

  return (
    <section
      id="case-studies-section"
      ref={containerRef}
      className="relative min-h-screen w-full py-20 px-4 md:px-8 bg-transparent text-[var(--text-color)] overflow-hidden"
    >
      {/* Background computer grid overlay that adapts to current theme */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--text-color) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Retro desktop header dashboard box */}
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Editorial Title Bar inspired by old computer shell */}
        <div ref={headerRef} className="border-4 border-[#efece6] bg-[#0c0a0e] text-[#efece6] p-6 rounded-3xl shadow-[5px_5px_0px_#000] relative overflow-hidden transition-colors duration-500">
          {/* Windows bar controller buttons */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#f85c5c] border border-black inline-block shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#f1be3d] border border-black inline-block shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#27c34b] border border-black inline-block shadow-sm" />
              <span className="ml-2 font-mono text-xs text-[#efece6] opacity-60 font-bold tracking-widest hidden sm:inline-block">ARCHIVE_EXPLORER.EXE</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setShowScanlines(p => !p);
                  synth.current.playBeep(700, 0.05, 0.02);
                }}
                className="px-2.5 py-1 text-[9px] font-mono border-2 border-neutral-700 text-[#efece6] hover:bg-[#efece6] hover:text-black rounded transition-all flex items-center gap-1.5 cursor-none"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${showScanlines ? "bg-emerald-500 animate-pulse" : "bg-neutral-500"}`} />
                <span>CRT SCANLINES: {showScanlines ? "ON" : "OFF"}</span>
              </button>
              <span className="font-mono text-xs text-neutral-400 opacity-50 hidden md:inline-block">BAUD_RATE 9600 // SECURE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-neutral-900 font-mono text-[9px] uppercase text-[#e5a93b] tracking-wider border border-neutral-800">
                <Terminal size={10} className="animate-pulse text-[#e5a93b]" />
                SYSTEM CENTRAL ARCHIVES
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold sm:tracking-tight font-serif-editorial leading-tight text-[#efece6]">
                Project Archives
              </h2>
              <p className="text-sm md:text-base text-[#efece6] opacity-80 max-w-xl font-sans tracking-wide leading-relaxed">
                Selected case files from my web development journey. Each document details structural solutions, query optimizations, and technical metrics.
              </p>
            </div>

            {/* Diagnostic system screen */}
            <div className="lg:col-span-5 h-[140px] md:h-[150px] bg-neutral-950 rounded-xl border-2 border-neutral-800 p-4 font-mono text-[10px] sm:text-xs text-emerald-400 overflow-y-auto space-y-1 shadow-inner relative flex flex-col justify-between">
              {/* Scanline overlay for debug terminal */}
              {showScanlines && <div className="absolute inset-0 scanlines pointer-events-none opacity-40 rounded-xl" />}
              
              <div className="space-y-1 relative z-10">
                <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-900 pb-1 text-[9px] font-bold">
                  <span>SYSTEM TELEMETRY WATCH</span>
                  <span className="flex items-center gap-1"><Clock size={8} /> 2026_06_05</span>
                </div>
                {systemLogs.length === 0 ? (
                  <p className="text-zinc-650 italic text-[11px]">No network triggers detected. Scroll to active section...</p>
                ) : (
                  systemLogs.map((log, idx) => (
                     <div key={idx} className="flex gap-1.5 leading-tight text-[11px] text-emerald-400 font-mono">
                      <span className="text-[#e5a93b] select-none">&gt;</span>
                      <span className="truncate">{log}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between items-center border-t border-neutral-905 pt-1.5 mt-2 text-[10px] text-neutral-500 font-bold relative z-10 shrink-0">
                <span>VERIFY_STATE: {deviceCheck}</span>
                <span className="animate-pulse text-[#e5a93b] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93b]" /> LIVE SYSTEM BUFFER
                </span>
              </div>
            </div>
          </div>
        </div>        {/* Dynamic Project Case File Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_ARCHIVE_DATA.map((item, index) => {
            const isDecrypting = cardStatus[item.id] === "DECRYPTING";
            const isSecured = cardStatus[item.id] === "SECURED";
            const decPrg = decryptedValues[item.id] || 0;

            return (
              <div
                key={item.id}
                className="retro-card group relative flex flex-col bg-[#0c0a0e] border-4 border-[#efece6] text-[#efece6] rounded-3xl p-5 md:p-6 shadow-[6px_6px_0px_#000] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-2 transition-all duration-400 ease-out flex-grow overflow-hidden cursor-none"
              >
                {/* Vintage scanline animation strictly constrained within card */}
                {showScanlines && (
                  <div className="absolute inset-0 scanlines pointer-events-none opacity-[0.10] group-hover:opacity-[0.22] transition-opacity z-10" />
                )}

                {/* Left and Right design bracket screws */}
                <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-neutral-350 dark:bg-neutral-800 border border-black inline-block z-10" />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-neutral-350 dark:bg-neutral-800 border border-black inline-block z-10" />

                {/* Title and ID banner */}
                <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-4 select-none relative z-10 font-mono">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#e5a93b] font-extrabold bg-[#e5a93b]/10 py-0.5 px-2 rounded-md border border-[#e5a93b]/20">
                    {item.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-450">
                    <CheckCircle2 size={12} className={isSecured ? "text-emerald-500" : "text-neutral-600"} />
                    <span className="font-semibold">{item.status}</span>
                  </div>
                </div>

                {/* Cassette Folder tab shape detail */}
                <div className="flex flex-col flex-grow space-y-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:bg-[#e5a93b]/10 group-hover:border-[#e5a93b]/40 transition-colors">
                      {isSecured ? (
                        <FolderOpen className="text-[#efece6]" size={22} />
                      ) : (
                        <Folder className="text-neutral-600" size={22} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif-editorial text-lg md:text-xl font-bold leading-snug text-[#efece6]">
                        {item.name}
                      </h3>
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Summary information panel */}
                  <div className="bg-neutral-950 rounded-2xl border border-neutral-850 p-3 flex flex-col justify-between h-[100px] shadow-inner select-none relative w-full overflow-hidden">
                    {isSecured ? (
                      <p className="text-neutral-300 opacity-90 text-[11.5px] leading-relaxed font-sans line-clamp-3 overflow-hidden">
                        {item.summary}
                      </p>
                    ) : isDecrypting ? (
                      <div className="space-y-2 font-mono text-[10px] text-emerald-400 w-full relative z-10">
                        <div className="flex justify-between font-bold">
                          <span>DECRYPTING DATASTREAM...</span>
                          <span>{decPrg}%</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-2 rounded border border-neutral-850 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full transition-all duration-75"
                            style={{ width: `${decPrg}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[8px] text-zinc-505">
                          <span>BLOCKS_T: OK</span>
                          <span className="animate-pulse">DECRYPTING...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center h-full text-neutral-500 font-mono text-[10.5px] space-y-2 w-full text-center py-2 relative z-10">
                        <ShieldAlert size={18} className="text-neutral-600 animate-pulse" />
                        <div className="space-y-0.5">
                          <div>SECURED DATA ENVELOPE</div>
                          <div className="text-[8.5px] text-[#e5a93b] opacity-85 cursor-none underline hover:opacity-100 uppercase font-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerDecryption(item.id);
                            }}>
                            Click to Decrypt File Block
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tech stack badge grids */}
                  <div className="space-y-1.5 select-none font-mono">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">TECH STRUCTURE:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 text-[8.5px] font-extrabold bg-neutral-900 border border-neutral-800 rounded text-[#efece6] tracking-tight hover:brightness-95 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action core trigger buttons */}
                  <div className="pt-4 border-t border-neutral-800 mt-auto select-none">
                    {isSecured ? (
                      <button
                        onClick={() => openCaseFile(item.id)}
                        className="w-full py-2.5 px-4 bg-[#efece6] hover:bg-[#e5a93b] text-black hover:text-black border-2 border-black rounded-xl text-xs font-mono font-black tracking-widest uppercase transition-all duration-150 active:translate-y-0.5 shadow-[3px_3px_0px_#000] active:shadow-[0px_0px_0px_#000] flex items-center justify-center gap-1.5 cursor-none"
                      >
                        <span>Open Case File</span>
                        <FolderOpen size={13} />
                      </button>
                    ) : (
                      <button
                        onClick={() => triggerDecryption(item.id)}
                        disabled={isDecrypting}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-black tracking-widest uppercase border-2 border-neutral-800 transition-all shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1.5 cursor-none ${
                          isDecrypting 
                             ? "bg-neutral-900 text-neutral-600 border-neutral-850 shadow-none translate-y-0.5" 
                             : "bg-neutral-950 text-[#e5a93b] border-neutral-800 hover:border-emerald-500 hover:text-emerald-550 dark:hover:text-emerald-400"
                        }`}
                      >
                        <Activity size={13} className={isDecrypting ? "animate-spin" : ""} />
                        <span>{isDecrypting ? "Decrypting..." : "Decrypt Archive"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Muted file stats footer */}
                <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-neutral-500 select-none font-bold">
                  <span>SIZE: {item.fileSize}</span>
                  <span>CRC_CHK: {item.checksum}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAILED DETECTIVE SCREEN LAPTOP WINDOW OVERLAY MODAL */}
      {activeTab && activeProject && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          {/* Active Workstation Monitor Area Container - Restored to classic retro terminal dark layout */}
          <div className="relative w-full max-w-4xl bg-[#0c0a0e] border-4 border-[#efece6] text-[#efece6] rounded-3xl p-4 sm:p-6 shadow-[10px_10px_0px_#000000] flex flex-col overflow-hidden max-h-[92vh]">
            
            {/* Scanline filter overlay */}
            {showScanlines && <div className="absolute inset-0 scanlines pointer-events-none opacity-[0.25] z-10 rounded-2xl" />}
            
            {/* Monitor Chrome Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-neutral-800 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-[#f85c5c] border border-black cursor-none flex items-center justify-center" onClick={closeCaseFile}>
                  <X size={8} className="text-[#3a0000] font-bold" />
                </div>
                <div className="px-2 py-0.5 bg-neutral-900 rounded font-mono text-[9px] text-[#e5a93b] border border-neutral-800 flex items-center gap-1.5 shadow-inner">
                  <Terminal size={10} />
                  <span>DECRYPT_CORE: {activeProject.id}.SYS (READ_ONLY)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 font-mono">
                <button 
                  onClick={closeCaseFile}
                  className="px-2.5 py-1 text-[9px] border border-neutral-700 text-neutral-300 hover:bg-[#efece6] hover:text-black rounded transition-all cursor-none"
                >
                  [ESC] CLOSE
                </button>
                <span className="font-mono text-xs text-neutral-500 hidden sm:inline-block font-extrabold tracking-widest">SHA-256 OK</span>
              </div>
            </div>

            {/* Modal Body Scroll area */}
            <div className="overflow-y-auto pr-1 space-y-6 scrollbar-thin scrollbar-thumb-[#e5a93b] relative z-10 flex-grow max-h-[70vh]">
              
              {/* Dynamic folder badge layout */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#e5a93b] tracking-widest block mb-0.5 font-extrabold">PROJECT DATA RECORD:</span>
                  <h2 className="text-2xl sm:text-3.5xl font-extrabold font-serif-editorial text-[#efece6] flex items-center gap-2">
                    {activeProject.name}
                  </h2>
                </div>
                
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start sm:self-center px-4 py-2 bg-[#efece6] text-black hover:bg-[#e5a93b] hover:text-black rounded-xl text-[10px] font-mono font-extrabold tracking-widest uppercase border-2 border-black flex items-center gap-1.5 hover:shadow-[3px_3px_0px_#000] transition-all cursor-none"
                  >
                    <span>Launch Project Live</span>
                    <ArrowUpRight size={12} className="stroke-[3]" />
                  </a>
                )}
              </div>

              {/* Grid block formatting of content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-4">
                
                {/* Left columns: Project core specifications */}
                <div className="md:col-span-4 space-y-4 font-mono select-none">
                  {/* Scope metadata board */}
                  <div className="bg-[#121115] rounded-2xl border border-neutral-800 p-4 space-y-3.5 text-[11px] shadow-inner font-mono">
                    <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                      <span>PROJECT ID:</span>
                      <span className="font-extrabold text-[#efece6]">{activeProject.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                      <span>TYPE SCHEMA:</span>
                      <span className="font-extrabold text-[#efece6]">{activeProject.type}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                      <span>INTEG_STATUS:</span>
                      <span className="font-extrabold text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 size={10} /> SECURE
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                      <span>ROLE RESPON:</span>
                      <span className="font-extrabold text-[#e5a93b] text-right pl-2 shrink">{activeProject.details.role}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900 text-neutral-400">
                      <span>TRANSMIT_SZ:</span>
                      <span className="font-extrabold text-[#efece6]">{activeProject.fileSize}</span>
                    </div>
                  </div>

                  {/* Micro-interactive tools list inside popup */}
                  <div className="bg-[#121115] rounded-2xl border border-neutral-800 p-4 space-y-2.5 shadow-inner">
                    <span className="text-[10px] text-[#e5a93b] font-extrabold uppercase tracking-wider block">COMPILER TOOLS USED:</span>
                    <div className="flex flex-col gap-2 text-xs text-neutral-300">
                      {activeProject.details.tools.map((tool) => (
                        <div key={tool} className="flex items-center gap-2">
                          <CornerDownRight size={12} className="text-neutral-500 shrink-0" />
                          <span className="text-[10.5px] font-medium text-neutral-300">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right columns: Structured problem solving text block */}
                <div className="md:col-span-8 space-y-6">
                  
                  {/* Section A: Client goals & specifications */}
                  <div className="space-y-2 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5 w-full">
                      <FolderOpen className="text-[#e5a93b] shrink-0" size={16} />
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#e5a93b] font-black">
                        01 // Client Mandate & Requirements
                      </h4>
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed font-sans text-left">
                      {activeProject.details.clientRequest}
                    </p>
                  </div>

                  {/* Section B: The Bottleneck challenge */}
                  <div className="space-y-2 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5 w-full">
                      <FileCode className="text-red-400 shrink-0" size={16} />
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-red-500 font-black">
                        02 // Performance Bottleneck & Complexity
                      </h4>
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed font-sans bg-red-950/15 border border-red-900/30 rounded-xl p-3 w-full text-left">
                      {activeProject.details.problem}
                    </p>
                  </div>

                  {/* Section C: Tactile Implementation flow */}
                  <div className="space-y-2 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5 w-full">
                      <Cpu className="text-cyan-400 shrink-0" size={16} />
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-black">
                        03 // Core Implementation Architecture
                      </h4>
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed font-sans text-left">
                      {activeProject.details.solution}
                    </p>
                  </div>

                  {/* Section D: Final Metrics Results */}
                  <div className="space-y-2 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5 w-full">
                      <Activity className="text-emerald-400 shrink-0" size={16} />
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-black">
                        04 // Technical Optimization Results
                      </h4>
                    </div>
                    <p className="text-emerald-400 text-xs sm:text-[13px] leading-relaxed font-mono bg-emerald-950/15 border border-emerald-900/30 rounded-xl p-3 w-full text-left">
                      {activeProject.details.result}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Laptop window base footer bar */}
            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-[9px] font-mono text-neutral-500 select-none relative z-10 shrink-0">
              <span className="flex items-center gap-1.5 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM SECURE DATA STREAM ACTIVE
              </span>
              <span>INDEX: {activeProject.id} ({activeProject.checksum})</span>
            </div>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
