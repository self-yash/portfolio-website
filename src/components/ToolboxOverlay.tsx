import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ToolboxOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToolItem {
  name: string;
  icon: string;
}

interface SpecItem {
  label: string;
  value: string;
}

const row1Tools: ToolItem[] = [
  { name: 'Discord', icon: '/images/discord-logo-icon-social-media-icon-free-png.webp' },
  { name: 'Premiere Pro', icon: '/images/premiere.svg' },
  { name: 'VSCode', icon: '/images/vscode.svg' },
  { name: 'Figma', icon: '/images/figma.svg' },
  { name: 'Postman', icon: '/images/postman.svg' },
  { name: 'Spotify', icon: '/images/spotify.svg' },
];

const row2Tools: ToolItem[] = [
  { name: 'Photoshop', icon: '/images/Adobe_Photoshop_CC_icon.svg.webp' },
  { name: 'Chrome', icon: '/images/Google_Chrome_icon_(February_2022).svg.webp' },
  { name: 'Notion', icon: '/images/Notion_app_logo.png' },
  { name: 'After Effects', icon: '/images/Adobe_After_Effects_CC_icon.svg.webp' },
  { name: 'Blender', icon: '/images/Blender_logo_no_text.svg.webp' },
];

const systemSpecs: SpecItem[] = [
  { label: 'Laptop', value: 'ROG Strix G15' },
  { label: 'CPU', value: 'AMD Ryzen 7 6800H' },
  { label: 'GPU', value: 'NVIDIA GeForce RTX 3050' },
  { label: 'Storage', value: '1 TB NVMe SSD' },
  { label: 'RAM', value: '16 GB DDR5' },
  { label: 'Monitor', value: '15.6" 144Hz FHD 100% sRGB Anti-Glare Dolby Vision' },
];

export const ToolboxOverlay: React.FC<ToolboxOverlayProps> = ({ isOpen, onClose }) => {
  // Lock body & Lenis smooth scroll and listen for Escape key when overlay is active
  useEffect(() => {
    if (!isOpen) return;

    // Pause Lenis smooth scroll instance if active
    const lenisInstance = (window as any).__lenis;
    if (lenisInstance && typeof lenisInstance.stop === 'function') {
      lenisInstance.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Save previous styles
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;

      // Resume Lenis smooth scroll
      if (lenisInstance && typeof lenisInstance.start === 'function') {
        lenisInstance.start();
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain flex justify-center items-start sm:items-center px-6 sm:px-10 md:px-16 lg:px-0 py-6 sm:py-10"
          role="dialog"
          aria-modal="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container: Matching the exact width of About Bento cards (1050px) */}
          <motion.div
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[1050px] bg-[#F7F7F8] rounded-[24px] sm:rounded-[28px] border border-[#DCDCE2] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col my-auto shrink-0 select-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-4 sm:top-4 sm:right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/60 hover:text-black transition-colors duration-150 cursor-pointer"
              aria-label="Close Toolbox"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* 1. Empty Box above Hardware && Software */}
            <div className="h-16 sm:h-20 md:h-24 w-full border-b border-[#DCDCE2]" />

            {/* 2. Hardware && Software Section (lines brought ultra-close to text) */}
            <div className="pt-[1px] pb-[3px] sm:pt-[2px] sm:pb-[4px] px-6 text-center border-b border-[#DCDCE2]">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-['Geist',sans-serif] font-medium text-black tracking-[-0.03em] leading-[1.08] m-0 p-0">
                Hardware && software
                <br />
                I keep in my toolbox
              </h2>
            </div>

            {/* 3. Empty Box in between Hardware && Software and Applications */}
            <div className="h-10 sm:h-12 md:h-14 w-full border-b border-[#DCDCE2]" />

            {/* 4. Applications Title Box */}
            <div className="py-[1px] sm:py-[2px] text-center border-b border-[#DCDCE2] flex items-center justify-center">
              <span className="font-['Geist',sans-serif] text-[13px] sm:text-[14px] font-medium text-[#3B48EC] tracking-normal leading-tight inline-block">
                Applications
              </span>
            </div>

            {/* 4.5 Empty Box in between Applications title and Applications elements */}
            <div className="h-[38px] sm:h-[46px] md:h-[54px] w-full border-b border-[#DCDCE2]" />

            {/* 5. Applications Display Area with Blue Side Accent Pillars */}
            <div className="relative w-full pt-0 pb-[10px] pl-[17px] pr-[17px]">
              {/* Left Accent Bar - with divider line on right edge and cast shadow coming only from the right side */}
              <div 
                className="absolute -left-[1px] top-0 bottom-0 w-[12px] sm:w-[13px] bg-[#3B48EC] border-r border-[#757575]/70"
                style={{
                  boxShadow: 'inset -4px 0 7.7px -2px rgba(0, 0, 0, 0.45)',
                }}
              />

              {/* Right Accent Bar - with divider line on left edge and cast shadow coming from the left side */}
              <div 
                className="absolute -right-[1px] top-0 bottom-0 w-[12px] sm:w-[13px] bg-[#3B48EC] border-l border-[#757575]/70"
                style={{
                  boxShadow: 'inset 4px 0 7.7px -2px rgba(0, 0, 0, 0.45)',
                }}
              />

              {/* Grid Content Container with Expanded Gap and Bigger Boxes */}
              <div className="flex flex-col items-center gap-6 sm:gap-7 w-full">
                {/* Row 1: 6 Apps (Discord 5px from left pillar, Spotify 5px from right pillar, touching top divider) */}
                <div className="flex justify-between items-start w-full">
                  {row1Tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group flex flex-col items-center cursor-default shrink-0"
                    >
                      {/* Outer Box: exact same styling as toolbox card VS Code tile + drop shadow on hover */}
                      <div 
                        className="w-[82px] h-[82px] sm:w-[100px] sm:h-[100px] md:w-[112px] md:h-[112px] lg:w-[120px] lg:h-[120px] rounded-[20px] p-[5px] sm:p-[6px] flex items-center justify-center cursor-default transition-all duration-300 border-[1.4px] border-[#D6DADE] group-hover:border-[#818CF8] group-hover:shadow-[0_0_22px_rgba(59,72,236,0.25)]"
                        style={{
                          backgroundColor: '#F7F7F8',
                        }}
                      >
                        {/* Inner Box: rgba(237, 238, 240, 0.85) with 1.85px stroke and slightly reduced inset shadow */}
                        <div
                          className="w-full h-full rounded-[16px] flex items-center justify-center transition-colors duration-200"
                          style={{
                            backgroundColor: 'rgba(237, 238, 240, 0.85)',
                            border: '1.85px solid rgba(230, 231, 234, 0.5)',
                            boxShadow: 'inset 0px 2.8px 2.8px rgba(0, 0, 0, 0.12)',
                          }}
                        >
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none"
                            loading="eager"
                            decoding="sync"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Label */}
                      <span className="mt-2.5 font-['Geist',sans-serif] text-[11px] sm:text-[12.5px] font-normal text-[#2A2A2A] text-center whitespace-nowrap">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Row 2: 5 Apps - Increased gap to match Row 1 */}
                <div className="flex justify-center gap-5 sm:gap-7 md:gap-11 lg:gap-14 xl:gap-16 items-start w-full">
                  {row2Tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group flex flex-col items-center cursor-default shrink-0"
                    >
                      {/* Outer Box: exact same styling as toolbox card VS Code tile + drop shadow on hover */}
                      <div 
                        className="w-[82px] h-[82px] sm:w-[100px] sm:h-[100px] md:w-[112px] md:h-[112px] lg:w-[120px] lg:h-[120px] rounded-[20px] p-[5px] sm:p-[6px] flex items-center justify-center cursor-default transition-all duration-300 border-[1.4px] border-[#D6DADE] group-hover:border-[#818CF8] group-hover:shadow-[0_0_22px_rgba(59,72,236,0.25)]"
                        style={{
                          backgroundColor: '#F7F7F8',
                        }}
                      >
                        {/* Inner Box: rgba(237, 238, 240, 0.85) with 1.85px stroke and slightly reduced inset shadow */}
                        <div
                          className="w-full h-full rounded-[16px] flex items-center justify-center transition-colors duration-200"
                          style={{
                            backgroundColor: 'rgba(237, 238, 240, 0.85)',
                            border: '1.85px solid rgba(230, 231, 234, 0.5)',
                            boxShadow: 'inset 0px 2.8px 2.8px rgba(0, 0, 0, 0.12)',
                          }}
                        >
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none"
                            loading="eager"
                            decoding="sync"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Label */}
                      <span className="mt-2.5 font-['Geist',sans-serif] text-[11px] sm:text-[12.5px] font-normal text-[#2A2A2A] text-center whitespace-nowrap">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Empty Box below Applications (matching height with box above applications) */}
            <div className="h-10 sm:h-12 md:h-14 w-full border-t border-b border-[#DCDCE2]" />

            {/* ================= Hardware Section ================= */}
            <div className="py-[1px] sm:py-[2px] text-center border-b border-[#DCDCE2] flex items-center justify-center">
              <span className="font-['Geist',sans-serif] text-[13px] sm:text-[14px] font-medium text-[#3B48EC] tracking-normal leading-tight inline-block">
                Hardware
              </span>
            </div>

            {/* Hardware Content Area */}
            <div className="w-full p-4 sm:p-6 md:p-7">
              <div className="bg-[#E7E7EC] rounded-[18px] sm:rounded-[22px] p-3.5 sm:p-5 border border-black/5 max-w-[940px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
                  {/* Left: System Specs Card */}
                  <div className="bg-[#F8F8FA] rounded-[14px] sm:rounded-[16px] border border-[#DCE0E6] p-4 sm:p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                    <h3 className="text-[14px] sm:text-[15px] font-['Geist',sans-serif] font-medium text-black text-center pb-4 border-b border-[#E4E4EC] mb-6 sm:mb-7">
                      System
                    </h3>

                    <div className="flex flex-col space-y-5 sm:space-y-[22px] my-auto">
                      {systemSpecs.map((spec) => {
                        const isGPU = spec.label === 'GPU';
                        return (
                          <div key={spec.label} className="flex items-start justify-between gap-4 sm:gap-6">
                            <span className={`w-24 sm:w-28 text-[13.5px] sm:text-[14.5px] font-['Geist',sans-serif] font-normal shrink-0 ${isGPU ? 'line-through text-[#757575]' : 'text-black'}`}>
                              {spec.label}
                            </span>
                            <span className={`text-[13.5px] sm:text-[14.5px] font-['Geist',sans-serif] font-normal leading-snug text-right sm:text-left flex-1 ${isGPU ? 'line-through text-[#757575]' : 'text-[#757575]'}`}>
                              {spec.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Accessories Cards */}
                  <div className="flex flex-col justify-between gap-2.5 sm:gap-3 h-full">
                    {/* Accessories Header Pill: rounded top, sharp bottom */}
                    <div className="bg-[#F8F8FA] rounded-t-[12px] sm:rounded-t-[14px] rounded-b-none border border-[#DCE0E6] flex-1 min-h-[48px] sm:min-h-[54px] px-4 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:border-[#818CF8] hover:shadow-none cursor-default">
                      <h3 className="text-[13.5px] sm:text-[14.5px] font-['Geist',sans-serif] font-medium text-black">
                        Accessories
                      </h3>
                    </div>

                    {/* Logitech Mouse Card: all sharp corners */}
                    <div className="bg-[#F8F8FA] rounded-none border border-[#DCE0E6] flex-1 min-h-[48px] sm:min-h-[54px] px-4 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:border-[#818CF8] hover:shadow-none cursor-default text-center">
                      <h4 className="text-[13px] sm:text-[14px] font-['Geist',sans-serif] font-medium text-black">
                        Logitech G102 Lightsync
                      </h4>
                    </div>

                    {/* boAt Headset Card: all sharp corners */}
                    <div className="bg-[#F8F8FA] rounded-none border border-[#DCE0E6] flex-1 min-h-[48px] sm:min-h-[54px] px-4 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:border-[#818CF8] hover:shadow-none cursor-default text-center">
                      <h4 className="text-[13px] sm:text-[14px] font-['Geist',sans-serif] font-medium text-black">
                        boAt Rockerz Prime 415
                      </h4>
                    </div>

                    {/* realme Buds 2 Card: sharp top, rounded bottom */}
                    <div className="bg-[#F8F8FA] rounded-t-none rounded-b-[14px] sm:rounded-b-[16px] border border-[#DCE0E6] flex-1 min-h-[48px] sm:min-h-[54px] px-4 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:border-[#818CF8] hover:shadow-none cursor-default text-center">
                      <h4 className="text-[13px] sm:text-[14px] font-['Geist',sans-serif] font-medium text-black">
                        realme Buds 2
                      </h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
