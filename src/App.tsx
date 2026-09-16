/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Background from './components/Background';
import Marquee from './components/Marquee';
import AboutSection from './components/AboutSection';
import GlassSurface from './components/GlassSurface';
import Lanyard from './components/Lanyard';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';

export default function App() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkPhone = () => setIsPhone(window.innerWidth < 640);
      checkPhone();
      window.addEventListener('resize', checkPhone);
      return () => window.removeEventListener('resize', checkPhone);
    }
  }, []);

  const words = isPhone 
    ? ["Backend Dev", "Designer", "Music fanboy", "Games Nerd"]
    : ["Backend Developer", "Designer", "Music fanboy", "Games Nerd"];

  const [text, setText] = useState(typeof window !== 'undefined' && window.innerWidth < 640 ? "Backend Dev" : "Backend Developer");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);
  const [showAboutNavbar, setShowAboutNavbar] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'projects' | 'stack'>('home');
  const aboutRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // High-performance Hero section custom circle cursor (zero React re-renders, 0ms lag)
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isVisible = false;
    let isClickable = false;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Disable custom cursor on mobile / touch screens
      if (window.innerWidth < 768) {
        if (isVisible) {
          cursor.style.opacity = '0';
          isVisible = false;
        }
        return;
      }

      // 1. Instant 0-latency hardware GPU position tracking
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // 2. Check if pointer is over the hero section (above About section and inside window)
      let inHero = false;
      if (aboutRef.current) {
        const aboutRect = aboutRef.current.getBoundingClientRect();
        inHero = e.clientY < aboutRect.top && e.clientY >= 0 && e.clientY <= window.innerHeight;
      } else {
        inHero = e.clientY >= 0 && e.clientY <= window.innerHeight;
      }

      if (inHero !== isVisible) {
        isVisible = inHero;
        cursor.style.opacity = inHero ? '1' : '0';
      }

      // 3. Scale up ring when hovering clickable elements or dragging lanyard
      if (inHero) {
        const target = e.target as HTMLElement | null;
        const isLanyardGrab = document.body.style.cursor === 'grab' || document.body.style.cursor === 'grabbing';
        const clickable = Boolean(
          (target && target.closest('button, a, [role="button"], [role="tab"], input, textarea, .cursor-pointer')) || isLanyardGrab
        );

        if (clickable !== isClickable) {
          isClickable = clickable;
          if (clickable) {
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursor.style.marginLeft = '-8px';
            cursor.style.marginTop = '-8px';
            cursor.style.boxShadow = '0 0 10px 2px rgba(255,255,255,0.8), 0 0 0 2px rgba(255,255,255,0.4)';
          } else {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.marginLeft = '-4px';
            cursor.style.marginTop = '-4px';
            cursor.style.boxShadow = '0 0 8px rgba(255,255,255,0.7)';
          }
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      cursor.style.opacity = '0';
      isVisible = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  const scrollToHome = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    if (lenisRef.current && aboutRef.current) {
      lenisRef.current.scrollTo(aboutRef.current, {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProject = () => {
    const el = document.getElementById('projects');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, {
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Monitor scroll to reveal navbar when arriving at the 2nd portion (About) and switch active tab
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const threshold = (windowHeight || 800) * 0.72;
      setShowAboutNavbar(latest >= threshold);

      const projectsEl = document.getElementById('projects');
      const stackEl = document.getElementById('stack');
      
      let newActiveSection: 'home' | 'about' | 'projects' | 'stack' = 'home';
      
      if (latest >= threshold) {
        newActiveSection = 'about';
      }
      
      if (projectsEl) {
        const pRect = projectsEl.getBoundingClientRect();
        if (pRect.top <= 240) {
          newActiveSection = 'projects';
        }
      }
      
      if (stackEl) {
        const sRect = stackEl.getBoundingClientRect();
        if (sRect.top <= 240) {
          newActiveSection = 'stack';
        }
      }
      
      setActiveSection(newActiveSection);
    });
    return () => unsubscribe();
  }, [scrollY, windowHeight]);

  const scrollToStack = () => {
    const el = document.getElementById('stack');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Smooth inertial scrolling and sticky snap for the 2nd portion
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }

    const snap = new Snap(lenis, {
      type: 'proximity',
      distanceThreshold: '35%',
      duration: 0.85,
    });

    snap.add(0);
    if (aboutRef.current) {
      snap.addElement(aboutRef.current);
    }

    // Snapping only applies when scrolling from hero down towards about.
    // Once reached or scrolling down within About, disable snap so it is never sticky when scrolling down from about.
    const handleScroll = (l: Lenis) => {
      const aboutTop = aboutRef.current ? aboutRef.current.offsetTop : windowHeight;
      if (l.scroll >= aboutTop - 15) {
        snap.stop();
      } else {
        snap.start();
      }
    };

    lenis.on('scroll', handleScroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', handleScroll);
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [windowHeight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Progressive blur: goes from 0px up to 14px as user scrolls down
  const blurFilter = useTransform(scrollY, (v) => {
    const progress = Math.min(Math.max(v / (windowHeight * 0.75 || 600), 0), 1);
    return `blur(${(progress * 14).toFixed(1)}px)`;
  });

  // Scale down and recede into the background
  const heroScale = useTransform(scrollY, (v) => {
    const progress = Math.min(Math.max(v / (windowHeight * 0.75 || 600), 0), 1);
    return 1 - progress * 0.09; // 1 down to 0.91
  });

  // Subtle opacity dimming
  const heroOpacity = useTransform(scrollY, (v) => {
    const progress = Math.min(Math.max(v / (windowHeight * 0.75 || 600), 0), 1);
    return 1 - progress * 0.5; // 1 down to 0.50
  });

  // Subtle upward depth motion
  const heroY = useTransform(scrollY, (v) => {
    const progress = Math.min(Math.max(v / (windowHeight * 0.75 || 600), 0), 1);
    return progress * -30;
  });

  // Progressive opacity reduction for glass panes from 100% down to 0% (1.5x faster than other elements)
  const glassPanesOpacity = useTransform(scrollY, (v) => {
    const fadeDistance = (windowHeight * 0.75 || 600) / 1.5;
    const progress = Math.min(Math.max(v / fadeDistance, 0), 1);
    return 1 - progress; // from 1.0 (100%) down to 0.0 (0%)
  });

  // Track if hero is active (within visible viewport) to pause 3D physics when reading lower sections
  const [isHeroActive, setIsHeroActive] = useState(true);

  useEffect(() => {
    return scrollY.on('change', (v) => {
      const threshold = (windowHeight || 800) * 0.85;
      const active = v < threshold;
      setIsHeroActive((prev) => (prev !== active ? active : prev));
    });
  }, [scrollY, windowHeight]);

  useEffect(() => {
    const currentWord = words[wordIndex] || (isPhone ? "Backend Dev" : "Backend Developer");
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 50);
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, 100);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, isPhone]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-clip">
      
      {/* Hero Section (Sticky underneath) */}
      <section className="sticky top-0 w-full h-[100dvh] overflow-hidden z-0 hero-custom-cursor-area md:cursor-none">
        {/* Full-bleed background & glass panes stay unscaled and unblurred */}
        <Background />
        
        {/* Glass Panes */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[6080px] h-full z-[5] flex pointer-events-none"
          style={{ opacity: glassPanesOpacity }}
        >
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-[304px] h-full border-l border-white/[0.15] bg-white/[0.04] backdrop-blur-[60px] shadow-[inset_1px_0_0_rgba(255,255,255,0.2)]"
            />
          ))}
        </motion.div>

        {/* 3D Interactive Lanyard with YM Badge: Layered behind navbar, NO push-back/scale, only blurs on scroll */}
        <motion.div 
          className="absolute inset-0 w-full h-full hidden md:block z-10 pointer-events-auto select-none overflow-hidden"
          style={{ 
            filter: blurFilter,
          }}
          aria-label="Interactive 3D Badge"
        >
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} isHeroActive={isHeroActive} />
        </motion.div>

        {/* Content layer that recedes (scale, blur, opacity) on scroll */}
        <motion.div 
          className="relative z-20 w-full h-full origin-center pointer-events-none"
          style={{ 
            filter: blurFilter, 
            scale: heroScale, 
            opacity: heroOpacity, 
            y: heroY 
          }}
        >
          {/* Navbar */}
          <nav aria-label="Main Navigation" className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-8 py-6 md:px-16 md:py-8 pointer-events-auto">
            <button 
              onClick={scrollToHome}
              className="text-[16px] md:text-[18px] lg:text-[20px] font-['Giordani_Registry','GIORDANI_Registry',serif] tracking-normal uppercase flex-1 cursor-pointer select-none transition-opacity hover:opacity-80 leading-none text-left bg-transparent border-0 p-0 text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black/50"
              aria-label="Yash Mehta - scroll to top"
            >
              Yash Mehta
            </button>
            
            {/* Glass Pill */}
            <motion.div 
              initial={{ y: -40, scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
              className="hidden md:flex flex-1 justify-center z-50"
            >
              <div role="tablist" aria-label="Sections" className="flex items-center gap-1 p-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[15px] font-['Geist_Mono',monospace] font-bold">
                <button 
                  onClick={scrollToHome}
                  className={`px-5 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${
                    activeSection === 'home'
                      ? "border border-white/20 border-r-white/80 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15))] backdrop-blur-3xl shadow-[inset_-1px_0_1px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] text-white"
                      : "border border-transparent hover:bg-white/5 text-white/80 hover:text-white"
                  }`}
                  aria-current={activeSection === 'home' ? 'page' : undefined}
                >
                  Home
                </button>
                <button 
                  onClick={scrollToAbout}
                  className={`px-5 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${
                    activeSection === 'about'
                      ? "border border-white/20 border-r-white/80 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15))] backdrop-blur-3xl shadow-[inset_-1px_0_1px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] text-white"
                      : "border border-transparent hover:bg-white/5 text-white/80 hover:text-white"
                  }`}
                  aria-current={activeSection === 'about' ? 'page' : undefined}
                >
                  About
                </button>
                <button 
                  onClick={scrollToProject}
                  className={`px-5 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${
                    activeSection === 'projects'
                      ? "border border-white/20 border-r-white/80 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15))] backdrop-blur-3xl shadow-[inset_-1px_0_1px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] text-white"
                      : "border border-transparent hover:bg-white/5 text-white/80 hover:text-white"
                  }`}
                  aria-current={activeSection === 'projects' ? 'page' : undefined}
                >
                  Project
                </button>
                <button 
                  onClick={scrollToStack}
                  className={`px-5 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 ${
                    activeSection === 'stack'
                      ? "border border-white/20 border-r-white/80 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15))] backdrop-blur-3xl shadow-[inset_-1px_0_1px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] text-white"
                      : "border border-transparent hover:bg-white/5 text-white/80 hover:text-white"
                  }`}
                  aria-current={activeSection === 'stack' ? 'page' : undefined}
                >
                  Stack
                </button>
              </div>
            </motion.div>
            
            {/* Right side placeholder to balance flex */}
            <div className="hidden md:block flex-1"></div>
            <div className="md:hidden w-8"></div>
          </nav>

          {/* Main Content */}
          <main className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-4xl pt-16 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col pointer-events-auto"
            >
              <div className="-translate-y-8 md:-translate-y-12">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-['Geist',sans-serif] font-medium tracking-tight mb-4 leading-tight flex flex-col items-start">
                  <span className="whitespace-nowrap">
                    <span className="text-[#FFFFFF]">Hi, I'm </span>
                    <span className="relative inline-block z-10">
                      <span className="bg-gradient-to-b from-[#EAEAE3] to-[#B2B2A8] text-transparent bg-clip-text">Yash</span>
                      <span className="absolute bottom-[8%] w-[110%] -left-[5%] -z-10 h-[28%] bg-[#3790DD] -skew-x-12"></span>
                    </span>
                    <motion.svg
                      viewBox="0 0 100 100"
                      className="inline-block w-[0.75em] h-[0.75em] ml-3 md:ml-5 text-[#1F9CF0] align-middle -translate-y-[4%]"
                      fill="currentColor"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    >
                      <circle cx="50" cy="50" r="28" />
                      {[...Array(8)].map((_, i) => (
                        <rect
                          key={i}
                          x="44"
                          y="2"
                          width="12"
                          height="96"
                          transform={`rotate(${i * 22.5} 50 50)`}
                        />
                      ))}
                    </motion.svg>
                  </span>
                  <span className="whitespace-nowrap flex items-baseline min-h-[1.2em]">
                    <span className="text-[#FFFFFF] mr-3 md:mr-4 lg:mr-5">a </span>
                    <span className="text-[#4596DD] font-['Cal_Sans',sans-serif] font-semibold">
                      {isPhone ? text.replace("Backend Developer", "Backend Dev") : text}{"\u200B"}
                    </span>
                    <motion.span 
                      className="inline-block bg-gradient-to-b from-[#00C8B3] to-[#0088FF] text-transparent bg-clip-text font-medium ml-1 select-none"
                      style={{ scaleY: 1.18, transformOrigin: 'center' }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                      |
                    </motion.span>
                  </span>
                </h1>
                
                <div className="mt-8 space-y-6 text-[#FFFFFF]/69 text-lg md:text-xl max-w-2xl leading-relaxed font-['Geist',sans-serif] font-normal">
                  <p>
                    I build things, explore weird ideas, and occasionally make the internet a little more interesting.
                  </p>
                  <p>
                    I like making things that work. Most Known For <a href="https://github.com/Self-nasu/HandFlow" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] opacity-100 underline decoration-[#1F9CF0] hover:bg-[#1F9CF0] hover:text-black hover:no-underline transition-all duration-300 underline-offset-4 font-medium px-1 -mx-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1AA1FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black">HandFlow.</a>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={scrollToAbout}
                  className="w-full sm:w-auto px-[30px] py-3 rounded-full bg-[#1AA1FF] text-black font-['Geist_Mono',monospace] font-normal tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_74.5px_2px_rgba(31,156,240,0.62)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Dive in &darr;
                </button>
                <a 
                  href="mailto:yashmehta0005@gmail.com" 
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-transparent border border-[#000000]/[0.39] hover:border-[#0099FF] hover:bg-white/10 text-[#B0C4EA] hover:text-white font-['Geist_Mono',monospace] text-sm tracking-wide transition-all duration-300 flex items-center justify-center"
                >
                  yashmehta0005@gmail.com
                </a>
              </div>
            </motion.div>
          </main>
        </motion.div>

        {/* Marquee stays pinned at bottom-0 */}
        <Marquee />
      </section>

      {/* About Section (Slides up over hero on scroll) */}
      <div ref={aboutRef} className="relative z-10 w-full shadow-[0_-15px_35px_rgba(0,0,0,0.28)]">
        <AboutSection isToolboxOpen={isToolboxOpen} setIsToolboxOpen={setIsToolboxOpen} />
      </div>

      {/* Floating Navbar (exact same glass pill as hero) that animates in from top center after 1.5-second delay when scrolled to 2nd portion - hides when toolbox overlay is open */}
      <AnimatePresence>
        {showAboutNavbar && !isToolboxOpen && (
          <motion.div
            key="about-fixed-navbar"
            initial={{ y: -60, x: "-50%", opacity: 0 }}
            animate={{ 
              y: 0, 
              x: "-50%", 
              opacity: 1, 
              transition: { delay: 1.5, duration: 0.34, ease: "easeOut" } 
            }}
            exit={{ 
              y: -60, 
              x: "-50%", 
              opacity: 0, 
              transition: { delay: 0, duration: 0.22, ease: "easeIn" } 
            }}
            className="fixed top-5 md:top-8 left-1/2 z-50 flex items-center justify-center pointer-events-auto max-w-[calc(100vw-24px)]"
          >
            <GlassSurface
              width="auto"
              height="auto"
              borderRadius={9999}
              backgroundOpacity={0.72}
              saturation={1.8}
              blur={14}
              borderWidth={0.05}
              distortionScale={-120}
              className="rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/10 max-w-full relative overflow-hidden"
              contentClassName="p-0.5 sm:p-1"
            >
              <div role="tablist" aria-label="Floating Navigation" className="flex items-center gap-0.5 sm:gap-1 text-[12px] sm:text-[15px] font-['Geist_Mono',monospace] font-bold">
                <button 
                  onClick={scrollToHome}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white/80 ${
                    activeSection === 'home'
                      ? "border border-black/[0.04] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-black"
                      : "border border-transparent hover:bg-black/5 text-black/70 hover:text-black"
                  }`}
                  aria-current={activeSection === 'home' ? 'page' : undefined}
                >
                  Home
                </button>
                <button 
                  onClick={scrollToAbout}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white/80 ${
                    activeSection === 'about'
                      ? "border border-black/[0.04] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-black"
                      : "border border-transparent hover:bg-black/5 text-black/70 hover:text-black"
                  }`}
                  aria-current={activeSection === 'about' ? 'page' : undefined}
                >
                  About
                </button>
                <button 
                  onClick={scrollToProject}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white/80 ${
                    activeSection === 'projects'
                      ? "border border-black/[0.04] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-black"
                      : "border border-transparent hover:bg-black/5 text-black/70 hover:text-black"
                  }`}
                  aria-current={activeSection === 'projects' ? 'page' : undefined}
                >
                  Project
                </button>
                <button 
                  onClick={scrollToStack}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white/80 ${
                    activeSection === 'stack'
                      ? "border border-black/[0.04] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-black"
                      : "border border-transparent hover:bg-black/5 text-black/70 hover:text-black"
                  }`}
                  aria-current={activeSection === 'stack' ? 'page' : undefined}
                >
                  Stack
                </button>
              </div>

              {/* Overall website scroll position progress line on the lower inside stroke of navbar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0066FF] via-[#0099FF] to-[#00DFD8] shadow-[0_0_6px_rgba(0,153,255,0.7)] pointer-events-none z-20"
                style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
              />
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small white circle cursor active when hovering in Hero section (hidden on mobile screens) */}
      <div 
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white opacity-0"
        style={{
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(255,255,255,0.7)',
          transition: 'opacity 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out, margin 0.15s ease-out, box-shadow 0.15s ease-out',
        }}
      />
    </div>
  );
}


