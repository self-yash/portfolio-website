/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Background from './components/Background';
import Marquee from './components/Marquee';
import AboutSection from './components/AboutSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';

export default function App() {
  const words = ["Backend Developer", "Designer", "Music fanboy", "Games Nerd"];
  const [text, setText] = useState("Backend Developer");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Smooth inertial scrolling and sticky snap for the 2nd portion
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    const snap = new Snap(lenis, {
      type: 'proximity',
      distanceThreshold: '35%',
      duration: 0.85,
    });

    snap.add(0);
    if (aboutRef.current) {
      snap.addElement(aboutRef.current);
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      snap.destroy();
      lenis.destroy();
    };
  }, []);

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

  useEffect(() => {
    const currentWord = words[wordIndex];
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
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-clip">
      
      {/* Hero Section (Sticky underneath) */}
      <section className="sticky top-0 w-full h-[100dvh] overflow-hidden z-0">
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

        {/* Content layer that recedes (scale, blur, opacity) on scroll */}
        <motion.div 
          className="relative z-10 w-full h-full origin-center"
          style={{ 
            filter: blurFilter, 
            scale: heroScale, 
            opacity: heroOpacity, 
            y: heroY 
          }}
        >
          {/* Navbar */}
          <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-8 py-6 md:px-16 md:py-8">
            <div className="text-base md:text-lg font-['Playfair_Display',serif] tracking-tight uppercase flex-1">
              Yash Mehta
            </div>
            
            {/* Glass Pill */}
            <motion.div 
              initial={{ y: -40, scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
              className="hidden md:flex flex-1 justify-center z-50"
            >
              <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[15px] font-['Geist_Mono',monospace] font-bold">
                <a href="#" className="px-5 py-2 rounded-full border border-white/20 border-r-white/80 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.15))] backdrop-blur-3xl shadow-[inset_-1px_0_1px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] transition-all whitespace-nowrap">Home</a>
                <a href="#" className="px-5 py-2 rounded-full border border-transparent hover:bg-white/5 transition-all text-white/80 hover:text-white whitespace-nowrap">About</a>
                <a href="#" className="px-5 py-2 rounded-full border border-transparent hover:bg-white/5 transition-all text-white/80 hover:text-white whitespace-nowrap">Project</a>
                <a href="#" className="px-5 py-2 rounded-full border border-transparent hover:bg-white/5 transition-all text-white/80 hover:text-white whitespace-nowrap">Stack</a>
              </div>
            </motion.div>
            
            {/* Right side placeholder to balance flex */}
            <div className="hidden md:block flex-1"></div>
            <div className="md:hidden w-8"></div>
          </nav>

          {/* Main Content */}
          <main className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 max-w-4xl pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col"
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
                    <span className="text-[#4596DD] font-['Cal_Sans',sans-serif] font-semibold">{text}{"\u200B"}</span>
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
                    I like making things that work. Most Known For <a href="#" className="text-[#FFFFFF] opacity-100 underline decoration-[#1F9CF0] hover:bg-[#1F9CF0] hover:text-black hover:no-underline transition-all duration-300 underline-offset-4 font-medium px-1 -mx-1 rounded">HandFlow.</a>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="#about" 
                  className="w-full sm:w-auto px-[30px] py-3 rounded-full bg-[#1AA1FF] text-black font-['Geist_Mono',monospace] font-normal tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_74.5px_2px_rgba(31,156,240,0.62)]"
                >
                  Dive in &darr;
                </a>
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
        <AboutSection />
      </div>
    </div>
  );
}


