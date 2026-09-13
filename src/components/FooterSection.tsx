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
    <footer id="contact" className="relative w-full bg-[#E5E5E5] text-black overflow-hidden pt-0 pb-12 md:pb-16">
      
      {/* Top Divider: Black 30% opacity fully */}
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20 mb-8 md:mb-10">
        <div 
          className="w-full h-[1px]" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mb-8 md:mb-10">
          
          {/* Column 1: ELSEWHERE */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2.5 md:gap-3"
          >
            <span className="font-['Geist_Mono',monospace] text-[11px] md:text-[11.5px] uppercase tracking-widest text-[#4F46E5] font-medium mb-1">
              ELSEWHERE
            </span>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-black/69 hover:text-black transition-colors tracking-tight flex items-center gap-1.5 w-fit group"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              <span>LINKEDIN</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-black/69 hover:text-black transition-colors tracking-tight flex items-center gap-1.5 w-fit group"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              <span>GITHUB</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
            <a 
              href="https://hackerrank.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-black/69 hover:text-black transition-colors tracking-tight flex items-center gap-1.5 w-fit group"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              <span>HACKERRANK</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
            <a 
              href="https://monkeytype.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] text-black/69 hover:text-black transition-colors tracking-tight flex items-center gap-1.5 w-fit group"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              <span>MONKEYTYPE</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Column 2: DIRECT */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-2.5"
          >
            <span className="font-['Geist_Mono',monospace] text-[11px] md:text-[11.5px] uppercase tracking-widest text-[#4F46E5] font-medium mb-1">
              DIRECT
            </span>
            <span 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase w-fit select-text cursor-default"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              YASHMEHTA0005@GMAIL.COM
            </span>
            <span 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              UDAIPUR,
            </span>
            <span 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              RAJASTHAN
            </span>
          </motion.div>

          {/* Column 3: STATUS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-2.5"
          >
            <span className="font-['Geist_Mono',monospace] text-[11px] md:text-[11.5px] uppercase tracking-widest text-[#4F46E5] font-medium mb-1">
              STATUS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5] shrink-0" />
              <span 
                className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase font-medium"
                style={{ color: 'rgba(0, 0, 0, 0.69)' }}
              >
                STUDYING NOW
              </span>
            </div>
            <span 
              className="font-['Geist_Mono',monospace] text-[13px] md:text-[13.5px] tracking-tight uppercase"
              style={{ color: 'rgba(0, 0, 0, 0.69)' }}
            >
              CURRENTLY @ SPSU
            </span>
          </motion.div>

        </div>

        {/* Bottom Row: Copyright & Time (no line above, placed closely below column elements) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div 
            className="font-['Geist_Mono',monospace] text-[11px] md:text-[12px] uppercase tracking-wider"
            style={{ color: 'rgba(0, 0, 0, 0.69)' }}
          >
            © 2026 YASH MEHTA. DESIGNED WITH FIGMA.
          </div>
          <div 
            className="font-['Geist_Mono',monospace] text-[11px] md:text-[12px] uppercase tracking-wider font-medium"
            style={{ color: 'rgba(0, 0, 0, 0.69)' }}
          >
            IND {istTime || '10:12:40'}
          </div>
        </div>

      </div>
    </footer>
  );
}
