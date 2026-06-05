# Premium Creative Portfolio — SEEYAM

An editorial, luxury-style high-end creative portfolio website built with **React**, **Vite**, and **GSAP (GreenSock Animation Platform)**. This project synthesizes majestic typography with immersive continuous animations, customizable color modes, and interactive SVG decorations.

---

## 🎨 Design Theme & Core Visuals

- **Bold Editorial Layout:** High-contrast color palettes dominating the viewport, inspired by modern Awwwards designer portfolios.
- **Oversized Serif Typography:** Featuring large display headings pairing **Cormorant Garamond** with **Inter** and **JetBrains Mono**.
- **Interactive Multi-Theme Rig:**
  - `Deep Mustard` (Default Palette)
  - `Cream Editorial`
  - `Dark Luxury`
  - `Blue Experimental`
- **Ambient Noise Overlay:** High-performance fixed SVG turbulence shader creating a realistic matte physical grain texture.
- **Interactive Floating Vectors:** Drifting abstract SVG shapes that revolve, glide, and slide based on mouse coordinate parallax.
- **Dynamic Identity Swapping:** Clicking the main center title smoothly letter-scrambles from `SEEYAM` (the creator) to `MAHDIS` (the aesthetic inspiration).

---

## 🚀 Key Modules & Code Structure

1. `src/App.tsx`: Main page orchestrator mapping progress bars, scroll track monitors, custom follow-mouse circle cursor, and active templates.
2. `src/components/Header.tsx`: Minimal top left (Work, About) and top right (Projects, Contact) navigation layout hosting the interactive Theme Switcher container.
3. `src/components/Hero.tsx`: High-contrast center stage displaying the name, a cursor-parallax rotating star symbol, and Seeyam's creator biography.
4. `src/components/About.tsx`: Narrative structural statement describing client capabilities coupled with a process bento layout.
5. `src/components/Work.tsx`: 4 high-fidelity creative mockups (E-Commerce, Luxury Editorial, Reservation Systems and Custom WordPress plugins) organized in an asymmetrical staggered grid.
6. `src/components/Services.tsx`: Tailored horizonal index lists showcasing capabilities with clean hover states and SVG icons.
7. `src/components/Contact.tsx`: Massive interactive call-to-action layout housing a **Project Brief Generator drawer** enabling customized user messages, budget parameters, and clipboard copy callbacks.
8. `src/styles/global.css` & `src/styles/responsive.css`: Core layout custom properties, animations, scroll bars, cursor effects, and full media query thresholds.

---

## ⚙️ Tech Stack & Dependencies

- **Frontend Core:** React, TypeScript, Vite
- **Animations:** GSAP & GSAP ScrollTrigger
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React

---

## 🏗️ Quick Setup Guide

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Boot the client dev server:**
   ```bash
   npm run dev
   ```
   *The server runs locally on port 3000.*

3. **Build the production bundle:**
   ```bash
   npm run build
   ```

---

## 🖌️ Swapping Colors (CSS variables)

The styling references CSS variables natively. To customize the default color palette, modify `:root` inside `/src/styles/global.css`:

```css
:root {
  --bg-color: #e5a93b;       /* Change background color */
  --text-color: #121212;     /* Change typography colors */
  --accent-color: #fbfbf9;   /* Change highlight / CTA elements */
}
```
You can similarly alter the attribute-triggered scopes for `[data-theme="cream"]`, `[data-theme="dark"]`, or `[data-theme="blue"]` in the same stylesheet.
