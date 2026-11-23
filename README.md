# Yash Mehta — Portfolio Website

Personal portfolio of **Yash Mehta**, Backend Developer, Designer, music fanboy and games nerd. It is a single-page, motion-heavy site with an animated intro loader, an interactive 3D lanyard card, liquid-glass UI elements and smooth scroll-linked transitions.

## Features

- **Intro page loader** with a reveal transition into the site
- **Hero section** with a typewriter role switcher and custom cursor
- **Interactive 3D lanyard ID card** (physics-driven, built with React Three Fiber + Rapier)
- **Floating, scroll-aware navbar** that tracks overall scroll position and the active section
- **About section** with a swappable card stack (games and interests) and social links
- **Projects section** showcasing Sports ERP, HandFlow and this portfolio
- **Stack section** with skill bars and categorized tech tags
- **Toolbox overlay**, marquees, shader gradient background and a liquid-glass logo
- Smooth scrolling and snapping via Lenis; responsive down to phone widths

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion / Motion, GSAP, Lenis |
| 3D / Graphics | Three.js, React Three Fiber, Drei, Rapier, ShaderGradient, meshline |
| Icons / Fonts | Lucide, Cal Sans, Geist, Space Grotesk, Giordani Registy |

**Prerequisites:** Node.js 18+ (or Bun) and npm.

## Project Structure

```
.
├── index.html              # HTML entry, meta tags and font/image preloads
├── vite.config.ts          # Vite config (React, Tailwind, .glb asset support)
├── public/
│   ├── assets/lanyard/     # 3D card model (card.glb) and texture
│   ├── fonts/              # Custom font (Giordani Registy)
│   └── images/             # Project, game and tool imagery / icons
└── src/
    ├── main.tsx            # App bootstrap
    ├── App.tsx             # Page layout, scroll logic, navbar, hero
    ├── index.css           # Global styles
    ├── components/
    │   ├── PageLoader.tsx          # Intro loading animation
    │   ├── Background.tsx          # Shader gradient background
    │   ├── Lanyard.tsx             # Interactive 3D lanyard card
    │   ├── AboutSection.tsx        # About + card swap + socials
    │   ├── ProjectsSection.tsx     # Project showcases
    │   ├── StackSection.tsx        # Skills and tech categories
    │   ├── FooterSection.tsx       # Footer and links
    │   ├── ToolboxOverlay.tsx      # Tools overlay
    │   ├── Marquee.tsx             # Velocity marquee
    │   ├── CardSwap.tsx            # Swapping card stack
    │   ├── GlassSurface.tsx        # Glass-effect surface
    │   └── liquid-glass-logo.*     # WebGL liquid-glass logo
    └── utils/                      # Texture generation and page reveal helpers
```