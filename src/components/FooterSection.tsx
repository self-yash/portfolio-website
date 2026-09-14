import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FooterSection() {
  // Live Indian Standard Time (IST) clock
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setIstTime(formatted);
      } catch {
        const now = new Date();
        setIstTime(now.toTimeString().split(' ')[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative w-full bg-[#E5E5E5] text-black overflow-hidden pt-6 md:pt-8 pb-12 md:pb-16">
      
      {/* Top Divider: Black 30% opacity fully */}
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20 mb-8 md:mb-10">
        <div 
          className="w-full h-[1px]" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* 3 Columns Grid: Elsewhere (Left) | Direct (Center of page) | Status (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-8 md:mb-10 items-start">
          
          {/* Column 1: ELSEWHERE */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <span className="font-['Geist_Mono',monospace] text-[11px] md:text-[11.5px] uppercase tracking-widest text-[#4F46E5] font-medium mb-[15px]">
              ELSEWHERE
            </span>
            <div className="flex flex-col gap-[7px]">
              <a 
                href="https://open.spotify.com/user/pzhezx18x7vkimdhqqw0hnndl?si=4b15251332cd49c5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-[rgba(0,0,0,0.69)] hover:text-[rgba(0,0,0,0.80)] transition-colors duration-200 tracking-tight flex items-center gap-1.5 w-fit group"
              >
                <span>SPOTIFY</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <a 
                href="https://github.com/self-yash" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-[rgba(0,0,0,0.69)] hover:text-[rgba(0,0,0,0.80)] transition-colors duration-200 tracking-tight flex items-center gap-1.5 w-fit group"
              >
                <span>GITHUB</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <a 
                href="https://www.hackerrank.com/profile/Yash_4" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-[rgba(0,0,0,0.69)] hover:text-[rgba(0,0,0,0.80)] transition-colors duration-200 tracking-tight flex items-center gap-1.5 w-fit group"
              >
                <span>HACKERRANK</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
              <a 
                href="https://monkeytype.com/profile/Festerrr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-[rgba(0,0,0,0.69)] hover:text-[rgba(0,0,0,0.80)] transition-colors duration-200 tracking-tight flex items-center gap-1.5 w-fit group"
              >
                <span>MONKEYTYPE</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
          </motion.div>

          {/* Column 2: DIRECT (Left-aligned, positioned in center matching IND) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-start text-left md:ml-[calc(50%-47px)] w-fit"
          >
            <span className="font-['Geist_Mono',monospace] text-[11px] md:text-[11.5px] uppercase tracking-widest text-[#4F46E5] font-medium mb-[15px]">
              DIRECT
            </span>
            <div className="flex flex-col items-start gap-[7px] text-left">
              <span 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase select-text cursor-default whitespace-nowrap text-[rgba(0,0,0,0.69)]"
              >
                YASHMEHTA0005@GMAIL.COM
              </span>
              <span 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase select-text cursor-default whitespace-nowrap text-[rgba(0,0,0,0.69)]"
              >
                UDAIPUR,
              </span>
              <span 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase select-text cursor-default whitespace-nowrap text-[rgba(0,0,0,0.69)]"
              >
                RAJASTHAN
              </span>
            </div>
          </motion.div>

          {/* Column 3: STATUS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col md:ml-auto w-fit"
          >
            <span className="font-['Geist_Mono',monospace] text-[11px] md:text-[11.5px] uppercase tracking-widest text-[#4F46E5] font-medium mb-[15px]">
              STATUS
            </span>
            <div className="flex flex-col gap-[7px]">
              <div className="flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-[#4F46E5] shrink-0" 
                  style={{ 
                    boxShadow: '0 0 8px #4F46E5, 0 0 14px rgba(79, 70, 229, 0.45)' 
                  }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ 
                    duration: 4.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <span 
                  className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase font-medium"
                  style={{ color: 'rgba(0, 0, 0, 0.69)' }}
                >
                  STUDYING NOW
                </span>
              </div>
              <div className="flex items-center">
                <span 
                  className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase"
                  style={{ color: 'rgba(0, 0, 0, 0.69)' }}
                >
                  CURRENTLY @ SPSU
                </span>
              </div>

              {/* Spacer on desktop so BACK TO TOP lands exactly on the 4th row, vertically aligned with MONKEYTYPE on the left */}
              <div 
                className="hidden md:flex items-center gap-1.5 invisible select-none pointer-events-none font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight"
                aria-hidden="true"
              >
                <span>&nbsp;</span>
              </div>

              {/* Back to Top Button */}
              <button 
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-[rgba(0,0,0,0.69)] hover:text-[rgba(0,0,0,0.80)] transition-colors duration-200 tracking-tight flex items-center gap-1.5 w-fit group cursor-pointer text-left"
              >
                <span>BACK TO TOP</span>
                <span className="group-hover:-translate-y-0.5 transition-transform duration-200">↑</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Row: Copyright, Centered Time & Right Attribution */}
        <div className="flex flex-col md:grid md:grid-cols-3 items-start md:items-center justify-between gap-3 md:gap-4 text-[#757575]">
          <div className="font-['Geist_Mono',monospace] text-[11px] md:text-[12px] uppercase tracking-wider text-[#757575]">
            © 2026 YASH MEHTA. DESIGNED WITH FIGMA.
          </div>
          <div className="font-['Geist_Mono',monospace] text-[11px] md:text-[12px] uppercase tracking-wider font-medium text-[#757575] md:text-center">
            IND {istTime || '10:12:40'}
          </div>
          <div className="font-['Geist_Mono',monospace] text-[11px] md:text-[12px] uppercase tracking-wider text-[#757575] md:text-right">
            DESIGNED BY YASH. ENGINEERED BY FESTER.
          </div>
        </div>

      </div>
    </footer>
  );
}
