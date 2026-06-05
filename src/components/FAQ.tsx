import { useEffect, useState, useRef, FormEvent } from "react";
import { Terminal, CornerDownLeft, CircleAlert, HelpCircle, RotateCcw, Monitor, FileCode, CheckCircle2 } from "lucide-react";
import { portfolioData } from "../portfolioData";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system" | "success";
}

// Low-fidelity Web Audio API synth helper to generate retro floppy clicks & mechanical key taps
class RetroAudioSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Soft high-frequency mechanical key click
  playKeyTap() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio context block security fallback
    }
  }

  // Dual-tone crunchy Floppy Disk mechanical laser head travel click
  playFloppyClick() {
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Seed brown/pink-like grainy noise to simulate mechanical metal head scraping
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
      }
      
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.07);
      
      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      noiseNode.start();
      noiseNode.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio context fallback
    }
  }
}

export default function FAQ() {
  const { faq, clientName } = portfolioData;
  const audioSynth = useRef(new RetroAudioSynth());
  
  // Custom states
  const [terminalColor, setTerminalColor] = useState<"amber" | "green" | "white">("amber");
  const [activeInput, setActiveInput] = useState("");
  const [stdout, setStdout] = useState<TerminalLine[]>([
    { text: `=== ${faq.systemName} ===`, type: "system" },
    { text: faq.mainVolume, type: "system" },
    { text: "SE_CPU_CLOCK ENABLED // SEC_ENCRYPT AT 100%", type: "system" },
    { text: `TYPE 'help' FOR AVAILABLE COMMMAND ARRAYS.`, type: "system" },
    { text: "--------------------------------------------------", type: "system" },
    { text: faq.instructions, type: "output" }
  ]);
  const [isTypingSimulated, setIsTypingSimulated] = useState(false);
  const [showScanlines, setShowScanlines] = useState(true);

  // References
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalMonitorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal buffer internally as logs load without shifting viewport on desktop
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [stdout]);

  // Command Parser Engine
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    audioSynth.current.playFloppyClick();

    const normalized = trimmed.toLowerCase();
    const parts = normalized.split(" ");
    const primaryCmd = parts[0];
    const argument = parts[1] || "";

    // Append user input into stdout buffer
    const newLines: TerminalLine[] = [
      { text: `${faq.promptPrefix} ${trimmed}`, type: "input" }
    ];

    if (primaryCmd === "help" || primaryCmd === "?") {
      newLines.push(
        { text: "BIOS ASSIST PROTOCOLS - AVAILABLE REGISTER COMMANDS:", type: "system" },
        { text: "  dir / ls             - List files in local disk repository", type: "output" },
        { text: "  cat [filename.txt]   - Load file contents onto active rendering terminal", type: "output" },
        { text: "  clear / cls          - Flush buffer and wipe CRT screens", type: "output" },
        { text: "  theme [amber/green]  - Shift terminal visual paint profiles", type: "output" },
        { text: "  scanlines            - Toggle vertical CRT electron gun filter", type: "output" },
        { text: "  help                 - Display this configuration guide", type: "output" }
      );
    } else if (primaryCmd === "dir" || primaryCmd === "ls") {
      newLines.push(
        { text: ` Volume in Drive A has no label.`, type: "output" },
        { text: ` ${faq.directoryLabel}`, type: "system" },
        { text: "----------------------------------------", type: "system" }
      );
      
      faq.items.forEach((item) => {
        newLines.push({
          text: `FILE_${item.id}   TXT   ${item.answer.length} B   [12-04-2026]  -->  ${item.answer.substring(0, 24)}... (command: cat ${item.fileCode})`,
          type: "output"
        });
      });
      
      newLines.push(
        { text: "----------------------------------------", type: "system" },
        { text: `     ${faq.items.length} File(s)    ${faq.items.reduce((acc, i) => acc + i.answer.length, 0)} Bytes total`, type: "success" }
      );
    } else if (primaryCmd === "clear" || primaryCmd === "cls") {
      setStdout([]);
      return;
    } else if (primaryCmd === "scanlines") {
      setShowScanlines(!showScanlines);
      newLines.push({ text: `CRT SCANLINE GRID MASK FORCED TO: ${!showScanlines ? "Y" : "N"}`, type: "success" });
    } else if (primaryCmd === "theme") {
      if (argument === "amber" || argument === "green" || argument === "white") {
        setTerminalColor(argument as any);
        newLines.push({ text: `TERMINAL COLOR PROFILE UPDATED TO: ${argument.toUpperCase()}`, type: "success" });
      } else {
        newLines.push({ text: "ERROR: INVALID SCHEMA. SUPPORTED PRESETS: theme amber, theme green, theme white", type: "error" });
      }
    } else if (primaryCmd === "cat") {
      if (!argument) {
        newLines.push({ text: "USAGE_ERROR: 'cat [filename.txt]' expects a file context target.", type: "error" });
      } else {
        const fileMatch = faq.items.find(
          (item) => item.fileCode.toLowerCase() === argument.toLowerCase() || item.command.toLowerCase().includes(argument.toLowerCase())
        );

        if (fileMatch) {
          newLines.push(
            { text: `LOADING DATA ROUTINE FOR TARGET: ${fileMatch.fileCode}...OK`, type: "system" },
            { text: `--------------------------------------------------`, type: "system" },
            { text: `QUESTION MATRIX // ${fileMatch.question}`, type: "success" },
            { text: ``, type: "output" },
            ...fileMatch.answer.split("\n").map((ln) => ({ text: ln, type: "output" as const })),
            { text: `--------------------------------------------------`, type: "system" }
          );
        } else {
          newLines.push({ text: `IO_ERROR: TARGET REGISTER FILE '${argument}' NOT CONFIGURED IN MATRIX STORAGE. Type 'dir' to check records.`, type: "error" });
        }
      }
    } else {
      // Fallback: Check if user just typed the file name in directly without "cat" (e.g. "Profile.txt")
      const rawFileMatch = faq.items.find(
        (item) => item.fileCode.toLowerCase() === normalized || item.command.toLowerCase() === normalized
      );

      if (rawFileMatch) {
         newLines.push(
            { text: `INTUITIVE LOADER // INTERCEPTED TARGET: ${rawFileMatch.fileCode}`, type: "system" },
            { text: `STRETCHING TERMINAL STREAM BUFFER...`, type: "system" },
            { text: `--------------------------------------------------`, type: "system" },
            { text: `QUESTION // ${rawFileMatch.question}`, type: "success" },
            { text: ``, type: "output" },
            ...rawFileMatch.answer.split("\n").map((ln) => ({ text: ln, type: "output" as const })),
            { text: `--------------------------------------------------`, type: "system" }
         );
      } else {
        newLines.push({ text: `SYNTAX_ERROR: COMMAND '${trimmed}' NOT RECOGNIZED BY INTEL ROM BIOS. TYPE 'help' FOR SCHEMATIC.`, type: "error" });
      }
    }

    setStdout((prev) => [...prev, ...newLines]);
    setActiveInput("");
  };

  // Keyboard form handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isTypingSimulated) return;
    executeCommand(activeInput);
  };

  // Click file helper simulating robotic auto-typing output
  const handleSimulateFileTyping = (commandToType: string) => {
    if (isTypingSimulated) return;
    
    setIsTypingSimulated(true);
    setActiveInput("");
    inputRef.current?.blur(); // Blur current input during typewriter simulation

    // On mobile screens, scroll smoothly down to render progress
    if (window.innerWidth < 1024 && terminalMonitorRef.current) {
      terminalMonitorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    let cursorIndex = 0;
    audioSynth.current.playFloppyClick();

    const typeTimer = setInterval(() => {
      if (cursorIndex < commandToType.length) {
        const nextChar = commandToType[cursorIndex];
        setActiveInput((prev) => prev + nextChar);
        audioSynth.current.playKeyTap();
        cursorIndex++;
      } else {
        clearInterval(typeTimer);
        // Pause briefly, then hit Enter automatically
        setTimeout(() => {
          setIsTypingSimulated(false);
          executeCommand(commandToType);
          inputRef.current?.focus();
        }, 350);
      }
    }, 45); // Snappy high speed typing
  };

  // Click handler to focus standard typing input
  const handleTerminalScreenClick = () => {
    if (!isTypingSimulated) {
      inputRef.current?.focus();
    }
  };

  // Color theme mapper
  const colorMap = {
    amber: {
      text: "text-amber-400",
      border: "border-amber-400/40",
      bg: "bg-[#181105]",
      glow: "shadow-[inset_0_0_20px_rgba(234,88,12,0.15)]",
      cursor: "bg-amber-400",
      accent: "#f59e0b",
      badge: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    },
    green: {
      text: "text-emerald-400",
      border: "border-emerald-400/40",
      bg: "bg-[#041208]",
      glow: "shadow-[inset_0_0_20px_rgba(16,185,129,0.15)]",
      cursor: "bg-emerald-400",
      accent: "#10b981",
      badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    white: {
      text: "text-neutral-200",
      border: "border-neutral-200/40",
      bg: "bg-[#141415]",
      glow: "shadow-[inset_0_0_20px_rgba(255,255,255,0.08)]",
      cursor: "bg-neutral-200",
      accent: "#e5e5e5",
      badge: "bg-neutral-200/10 text-neutral-200 border-neutral-200/20"
    }
  }[terminalColor];

  return (
    <section
      id="faq-section"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[var(--bg-color)] border-t border-black/5 select-none relative z-30 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* LEFT COLUMN: Editorial Index / Instructions (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:pr-6">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--text-color)] bg-opacity-5 rounded-full border border-[var(--text-color)] border-opacity-10">
              <Terminal size={12} className="text-[var(--text-color)] shrink-0 animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-widest font-extrabold text-[var(--text-color)]">
                FAQS &amp; SYSTEM OVERVIEW // LEVEL_05
              </span>
            </div>

            <h2 className="font-serif-editorial text-4xl md:text-5xl lg:text-6xl text-[var(--text-color)] leading-none tracking-tighter">
              The Retro BIOS FAQ Terminal
            </h2>

            <p className="font-sans text-sm text-[var(--text-color)] opacity-70 leading-relaxed font-semibold">
              To keep communication dynamic and clear, I integrated an interactive BIOS directory console where clients can examine standard legal indexes, operational systems workflow, and tech parameters manually.
            </p>

            {/* Tactile quick click targets (Looks like disk labels / file badges) */}
            <div className="space-y-3 pt-4">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--text-color)] opacity-40">
                // SYSTEM DISK DIRECTORY: Click to query record
              </span>
              
              <div className="flex flex-col gap-2">
                {faq.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSimulateFileTyping(`cat ${item.fileCode}`)}
                    disabled={isTypingSimulated}
                    className="group w-full flex items-center justify-between text-left p-3 rounded-xl border border-black/10 hover:border-black hover:bg-black/5 cursor-none transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Retro comic-style flat bottom block shadow under individual listings */}
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-black text-white font-mono text-[10px] flex items-center justify-center font-bold">
                        {item.id}
                      </div>
                      <div>
                        <span className="block font-sans text-sm md:text-base text-[var(--text-color)] group-hover:translate-x-1.5 transition-transform font-bold tracking-tight leading-snug">
                          {item.question}
                        </span>
                        <span className="block font-mono text-[7px] text-[var(--text-color)] opacity-40 uppercase tracking-widest mt-0.5">
                          file code: {item.fileCode} &bull; action: click to auto-type
                        </span>
                      </div>
                    </div>
                    
                    <FileCode size={13} className="text-[var(--text-color)] opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick instructions panel details */}
          <div className="p-4 rounded-2xl bg-black/5 border border-black/10 flex items-start gap-3">
            <CircleAlert size={15} className="text-[var(--text-color)] opacity-60 mt-0.5 shrink-0" />
            <div className="font-mono text-[9px] text-[var(--text-color)] opacity-70 leading-relaxed uppercase">
              <span className="font-bold text-black block mb-1">TERMINAL USABILITY NOTES</span>
              - Click any item to trigger auto-complete disk laser sequencing.<br />
              - Or type commands like <span className="underline font-bold">dir</span>, <span className="underline font-bold">ls</span>, <span className="underline font-bold">cls</span>, or <span className="underline font-bold">theme green</span> inside the green flashing cursor prompt directly.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Terminal Shell Emulation Monitor (7 columns) */}
        <div ref={terminalMonitorRef} className="lg:col-span-7 flex flex-col justify-between">
          <div className="relative w-full h-full min-h-[500px] md:min-h-[580px] flex flex-col rounded-3xl overflow-hidden border-4 border-neutral-900 bg-[#0d0d0f] shadow-2xl">
            
            {/* Monitor Header Bezel / Screws */}
            <div className="w-full h-10 bg-neutral-900 px-4 flex items-center justify-between border-b border-[#2d2d30] relative z-20">
              <div className="flex items-center gap-6">
                {/* Simulated Monitor Screws */}
                <div className="w-3 h-3 rounded-full bg-[#1e1e21] border border-neutral-700 flex items-center justify-center">
                  <span className="block w-2.5 h-[1px] bg-neutral-800 rotate-45" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#a1a1aa] font-bold">
                    CRT_MONITOR_TUBE_M2 // ACTIVE
                  </span>
                </div>
              </div>

              {/* Console Settings ToolBar */}
              <div className="flex items-center gap-1.5 font-mono text-[8px]">
                {/* Contrast Toggle Button */}
                <button
                  onClick={() => setShowScanlines(!showScanlines)}
                  className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-[#a1a1aa] rounded border border-neutral-700 flex items-center gap-1 hover:text-white cursor-none"
                  title="Toggle CRT Scanline Overlay Filter"
                  disabled={isTypingSimulated}
                >
                  <Monitor size={8} />
                  <span>CRT: {showScanlines ? "ON" : "OFF"}</span>
                </button>

                {/* Theme Selector Badge options within Shell toolbar */}
                <div className="flex items-center gap-1 pl-2 border-l border-neutral-700/80">
                  {(["amber", "green", "white"] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setTerminalColor(color);
                        audioSynth.current.playKeyTap();
                      }}
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center cursor-none transition-all ${
                        terminalColor === color ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: color === "amber" ? "#ea580c" : color === "green" ? "#10b981" : "#e5e5e5"
                      }}
                      title={`Switch shell text to ${color}`}
                      disabled={isTypingSimulated}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CRT Screen Panel Wrapper */}
            <div 
              onClick={handleTerminalScreenClick}
              className={`flex-grow p-4 md:p-6 font-mono text-[10px] md:text-[11.5px] leading-relaxed relative flex flex-col justify-between overflow-hidden cursor-none transition-all duration-300 ${colorMap.bg} ${colorMap.text} ${colorMap.glow}`}
            >
              
              {/* Scanline Electron Gun CSS Effect */}
              {showScanlines && (
                <>
                  {/* CSS scanline animation */}
                  <div className="absolute inset-0 pointer-events-none z-10 scanlines opacity-[0.25]" />
                  {/* Subtle CRT Flicker */}
                  <div className="absolute inset-0 pointer-events-none z-10 crt-flicker opacity-[0.05] bg-white" />
                </>
              )}

              {/* Text Buffer Layout Area */}
              <div 
                ref={terminalBodyRef}
                className="overflow-y-auto space-y-2 max-h-[420px] md:max-h-[480px] scrollbar-thin scrollbar-thumb-amber-500 flex-grow relative z-10"
              >
                {stdout.map((line, idx) => {
                  const lineStyle = {
                    input: "font-semibold opacity-95",
                    output: "opacity-80 font-medium",
                    error: "text-red-500 font-bold tracking-tight bg-red-950/10 px-1 py-0.5 rounded",
                    system: "opacity-45 text-[9px] tracking-wide italic",
                    success: "font-bold text-emerald-400 bg-emerald-950/15 px-1 rounded-sm"
                  }[line.type];
                  
                  return (
                    <div key={idx} className={`${lineStyle} whitespace-pre-wrap leading-relaxed select-text font-mono`}>
                      {line.text}
                    </div>
                  );
                })}
              </div>

              {/* Shell Interactive Prompts footer */}
              <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-current border-opacity-15 flex items-center relative z-10 select-none">
                <span className="mr-2 select-none font-bold tracking-widest shrink-0 font-mono">
                  {faq.promptPrefix}
                </span>

                <div className="flex-grow flex items-center relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={activeInput}
                    onChange={(e) => {
                      if (!isTypingSimulated) {
                        setActiveInput(e.target.value);
                        audioSynth.current.playKeyTap();
                      }
                    }}
                    disabled={isTypingSimulated}
                    className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-current font-mono text-[10px] md:text-[11.5px] cursor-none select-text"
                    placeholder={isTypingSimulated ? "Simulating laser head sequencing..." : "Type command here ..."}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />

                  {/* Virtual glowing terminal cursor block */}
                  <span 
                    className={`absolute w-1.5 h-3 md:w-2 md:h-3.5 animate-pulse shrink-0 ${colorMap.cursor}`}
                    style={{
                      left: `${Math.min(activeInput.length * 7, 240)}px` // dynamically floats standard mono width
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isTypingSimulated || !activeInput.trim()}
                  className="ml-2 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 cursor-none p-1 shrink-0"
                >
                  <CornerDownLeft size={12} className="stroke-[2]" />
                </button>
              </form>
            </div>

            {/* Monitor Footer Bezel */}
            <div className="w-full bg-neutral-900 border-t border-[#2d2d30] py-2 px-6 flex justify-between items-center relative z-20 text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              <span>DESIGNED &amp; ENGINEERED BY {clientName}</span>
              <span>CONSOLE MODEL_CRT_6982X &bull; TEMP_STABLE</span>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
