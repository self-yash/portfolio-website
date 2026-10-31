import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { LiquidGlassLogo } from './liquid-glass-logo';

import fh6Img from '../assets/images/fh6.jpg';
import genshinImg from '../assets/images/GenshinImpact.jpg';
import valorantImg from '../assets/images/valorant.jpg';
import tlouImg from '../assets/images/tlou.jpg';
import coverFileImg from '../assets/images/cover_file.png';
import landingPageImg from '../assets/images/landing_page.png';
import lanyardImg from '../assets/lanyard/lanyard.png';

interface PageLoaderProps {
  onFinish: () => void;
}

// All major images and visual assets used across the portfolio
const ASSETS_TO_PRELOAD: string[] = [
  coverFileImg,
  landingPageImg,
  fh6Img,
  genshinImg,
  valorantImg,
  tlouImg,
  lanyardImg,
  '/images/premiere.svg',
  '/images/figma.svg',
  '/images/vscode.svg',
  '/images/postman.svg',
  '/images/spotify.svg',
  '/images/discord-logo-icon-social-media-icon-free-png.webp',
  '/images/Adobe_Photoshop_CC_icon.svg.webp',
  '/images/Google_Chrome_icon_(February_2022).svg.webp',
  '/images/Notion_app_logo.png',
  '/images/Adobe_After_Effects_CC_icon.svg.webp',
  '/images/Blender_logo_no_text.svg.webp',
  '/logo.svg',
];

function preloadSingleImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    const finalize = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      finalize();
    } else {
      img.onload = finalize;
      img.onerror = () => resolve(); // graceful fallback on network error
    }
  });
}

export default function PageLoader({ onFinish }: PageLoaderProps) {
  const [logoCompleted, setLogoCompleted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isCompletelyRemoved, setIsCompletelyRemoved] = useState(false);

  // Guards against any repeat or loop execution
  const hasFinishedRef = useRef(false);
  const startedPreloadingRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Smooth GPU motion value for lag-free 120fps progress line scaling
  const rawProgress = useMotionValue(0.04);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 22,
    mass: 0.5,
  });

  // Safety fallback: if logo WebGL takes longer than 2.2s due to any browser delay, proceed
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setLogoCompleted(true);
    }, 2200);
    return () => clearTimeout(safetyTimer);
  }, []);

  const handleLogoComplete = useCallback(() => {
    setLogoCompleted(true);
  }, []);

  // Actual asset preloading with paced progress that takes its time to load site images
  useEffect(() => {
    if (!logoCompleted) return;
    if (startedPreloadingRef.current || hasFinishedRef.current) return;
    startedPreloadingRef.current = true;

    let isCancelled = false;
    const total = ASSETS_TO_PRELOAD.length;
    let loadedAssets = 0;
    let pacedAssets = 0;

    // Trigger real image network requests and decoding
    ASSETS_TO_PRELOAD.forEach((src) => {
      preloadSingleImage(src).then(() => {
        if (!isCancelled) {
          loadedAssets++;
        }
      });
    });

    const finishLoading = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      rawProgress.set(1);

      setTimeout(() => {
        if (!isCancelled) {
          setIsFinished(true);
          onFinishRef.current?.();
        }
      }, 350);
    };

    // Paced progress: ensures each asset takes its time (~75ms per step)
    // while strictly waiting for actual images to finish downloading and decoding.
    const stepDuration = 75; // ms per asset step

    const interval = setInterval(() => {
      if (isCancelled || hasFinishedRef.current) {
        clearInterval(interval);
        return;
      }

      // Paced advance: advances by 1 step, but capped by actual loadedAssets
      if (pacedAssets < loadedAssets) {
        pacedAssets++;
      }

      const ratio = Math.min(pacedAssets / total, 0.98);
      rawProgress.set(Math.max(0.05, ratio));

      // Complete only once all assets are truly loaded and decoded AND step pacing completes
      if (pacedAssets >= total && loadedAssets >= total) {
        clearInterval(interval);
        clearTimeout(safetyTimeout);
        finishLoading();
      }
    }, stepDuration);

    // Timeout safety fallback: ensure page is revealed if a network resource hangs
    const safetyTimeout = setTimeout(() => {
      if (!isCancelled && !hasFinishedRef.current) {
        clearInterval(interval);
        finishLoading();
      }
    }, 5500);

    return () => {
      isCancelled = true;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [logoCompleted, rawProgress]);

  if (isCompletelyRemoved) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsCompletelyRemoved(true)}>
      {!isFinished && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none pointer-events-auto overflow-hidden"
          style={{ backgroundColor: '#ffffff' }}
        >
          {/* Main Logo Stage (shifted up by 10px total) */}
          <div className="relative w-full max-w-2xl flex flex-col items-center justify-center -translate-y-[10px]">
            {/* The Liquid Glass Logo configured with soft glow preset in light mode */}
            <div className="w-full flex items-center justify-center">
              <LiquidGlassLogo
                logo="/logo.svg"
                ending="logo"
                preset="soft glow"
                theme="light"
                background="#ffffff"
                tileColor="#e8ecf2"
                logoColor="#09111b"
                style={{ height: 480 }}
                onComplete={handleLogoComplete}
              />
            </div>

            {/* Loader line below logo - shifted up by 3px (-mt-[35px] instead of -mt-8 / -32px) */}
            <div className="h-12 w-full flex flex-col items-center justify-start -mt-[35px]">
              {logoCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col items-center w-56 sm:w-64"
                >
                  {/* Progress bar with black glow - GPU transform scaleX */}
                  <div className="w-full h-1.5 bg-neutral-200/90 border border-neutral-300/50 rounded-full overflow-hidden relative shadow-[0_0_12px_rgba(0,0,0,0.12)]">
                    <motion.div
                      className="h-full w-full bg-black rounded-full relative shadow-[0_0_10px_rgba(0,0,0,0.6)]"
                      style={{
                        originX: 0,
                        scaleX: smoothProgress,
                      }}
                    >
                      {/* Leading glow tip */}
                      <div className="absolute right-0 top-0 bottom-0 w-3 bg-neutral-900 shadow-[0_0_10px_rgba(0,0,0,0.8),0_0_4px_rgba(0,0,0,0.9)] rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
