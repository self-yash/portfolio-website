import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Scrolls left-to-right on scroll (starts left, moves right)
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "5%"]);

  return (
    <div ref={containerRef} id="projects" className="relative w-full border-t border-[#757575] bg-[#E5E5E5] text-black">
      {/* Outer container expanded to sides with generous top spacing */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-8 md:pb-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2.5 text-black font-['Geist_Mono',monospace] font-normal text-sm md:text-[14px] mb-3"
          >
            {/* Glowing Dot: Perfect circle with blur set to 3 and 50% opacity shadow (smaller size) */}
            <span 
              className="w-1 h-1 rounded-full bg-black shrink-0" 
              style={{ boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)' }}
            />
            <span>Projects</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-['Cal_Sans',sans-serif] font-normal tracking-tight text-black leading-[1.05]"
          >
            Things I’ve made.
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-['Cal_Sans',sans-serif] font-normal tracking-tight text-[#757575]/75 leading-[1.05] mt-1"
          >
            Some serious. Some not.
          </motion.h3>
        </div>

        {/* Project 01/04 Card */}
        <div className="w-full pt-2">
          {/* Add group class for hover targeting across the entire project block */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[120px] items-start">
            
            {/* Left Column: 01/04 on the far left, aligned with header, and details on right */}
            <div className="lg:col-span-6 flex items-start gap-5 sm:gap-8">
              
              {/* Index 01/04 (moves left on hover) */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                className="shrink-0 pt-[10px] sm:pt-[12px] transition-transform duration-300 ease-out group-hover:-translate-x-1"
              >
                <span className="font-['Geist_Mono',monospace] font-normal text-[13px] sm:text-[14px] text-[#000000] opacity-[0.69] select-none block leading-none">
                  01/04
                </span>
              </motion.div>

              {/* Project Content Block (moves right on hover) */}
              <div className="flex-1 flex flex-col justify-start transition-transform duration-300 ease-out group-hover:translate-x-[9px]">
                
                {/* Category: Team Project */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  className="leading-none pb-0.5"
                >
                  <span className="font-['Geist_Mono',monospace] text-[12px] sm:text-[13px] uppercase tracking-wider text-[#4F46E5] font-normal leading-none inline-block transition-colors duration-300">
                    TEAM PROJECT
                  </span>
                </motion.div>

                {/* Title in Geist Medium */}
                <motion.h4 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                  className="-mt-[2px] text-3xl sm:text-4xl md:text-[40px] font-['Geist',sans-serif] font-medium text-black tracking-tight leading-tight transition-colors duration-300"
                >
                  Sports ERP
                </motion.h4>

                {/* Directional Arrow (Rotates left and shifts extra right on hover) */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                  className="mt-2 mb-6 text-[#4F46E5] inline-block origin-bottom-left transition-transform duration-300 ease-out group-hover:-rotate-5 group-hover:translate-x-[3px]"
                >
                  <svg 
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 stroke-[1.6px]" 
                    style={{ transform: 'rotate(7deg)', transformOrigin: 'center' }}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="5.5" y1="18.5" x2="17" y2="7"></line>
                    <polyline points="9 7 17 7 17 15"></polyline>
                  </svg>
                </motion.div>

                {/* Description Paragraph */}
                <motion.p 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                  className="font-['Geist',sans-serif] font-normal text-[13.5px] sm:text-[14px] leading-relaxed text-[#2D2D2D] mb-8 max-w-lg transition-colors duration-300"
                >
                  Sports ERP is an end-to-end sports facility management platform that centralizes scheduling, equipment allocation, user management, and activity tracking into a unified system. It streamlines bookings, participation flows, and resource utilization across venues through structured, role-based access control and real-time coordination of sports operations.
                </motion.p>

                {/* Key Specs Table */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                  className="w-full border-t border-black/15 flex flex-col text-[13px] mb-[24px]"
                >
                  <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                    <span className="w-20 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                      ROLE
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                      UI/UX & Visual Designer
                    </span>
                  </div>
                  <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                    <span className="w-20 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                      IMPACT
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                      Designed intuitive user flows for sports operations
                    </span>
                  </div>
                  <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                    <span className="w-20 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                      CRAFT
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                      Figma-driven design system and product showcases
                    </span>
                  </div>
                </motion.div>

                {/* Pills / Tags */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
                  className="-mt-[4px] flex flex-wrap items-center gap-2"
                >
                  {["Figma", "After Effects", "Prototyping", "Wireframing"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1 rounded-full border border-black/25 text-[11.5px] font-['Geist_Mono',monospace] font-normal text-black/80 bg-transparent hover:bg-black/[2.5%] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

              </div>

            </div>

            {/* Right Column: Mac-style Showcase Window Mockup with Project Image */}
            <div className="lg:col-span-6 w-full lg:mt-[48px]">
              {/* Box border and shadow animate on hover via the parent `group` */}
              <div className="w-full rounded-2xl border border-[#909090] bg-[#0A1F6E] overflow-hidden relative transition-all duration-300 ease-out group-hover:border-[#4F46E5] group-hover:shadow-[0_0_35px_1px_rgba(79,70,229,0.5)]">
                
                {/* Window Title Bar */}
                <div className="bg-[#FFFFFF] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-black/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>

                {/* Project Mockup Showcase Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-[#0A1F6E]">
                  <img 
                    src="/cover_file.png" 
                    alt="Sports ERP Platform Showcase" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

              </div>
            </div>

          </div>
          
          {/* Final Divider after the project */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full mt-12 md:mt-16 mb-8"
          >
            <div className="w-full h-[1px] bg-black/30"></div>
          </motion.div>
          
        </div>

        {/* Project 02/04 Card */}
        <div className="w-full pt-2">
          {/* Add group class for hover targeting across the entire project block */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[120px] items-start">
            
            {/* Left Column: 02/04 on the far left, aligned with header, and details on right */}
            <div className="lg:col-span-6 flex items-start gap-5 sm:gap-8">
              
              {/* Index 02/04 (moves left on hover) */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="shrink-0 pt-[10px] sm:pt-[12px] transition-transform duration-300 ease-out group-hover:-translate-x-1"
              >
                <span className="font-['Geist_Mono',monospace] font-normal text-[13px] sm:text-[14px] text-[#000000] opacity-[0.69] select-none block leading-none">
                  02/04
                </span>
              </motion.div>

              {/* Project Content Block (moves right on hover) */}
              <div className="flex-1 flex flex-col justify-start transition-transform duration-300 ease-out group-hover:translate-x-[9px]">
                
                {/* Category: Personal Project */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  className="leading-none pb-0.5"
                >
                  <span className="font-['Geist_Mono',monospace] text-[12px] sm:text-[13px] uppercase tracking-wider text-[#4F46E5] font-normal leading-none inline-block transition-colors duration-300">
                    PERSONAL PROJECT
                  </span>
                </motion.div>

                {/* Title and Arrow in Geist Medium */}
                <div className="flex items-center gap-4 -mt-[2px]">
                  <motion.h4 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-[40px] font-['Geist',sans-serif] font-medium text-black tracking-tight leading-tight transition-colors duration-300"
                  >
                    HandFlow
                  </motion.h4>
                  {/* Directional Arrow (Moves top-right on hover) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    className="text-[#4F46E5] transition-transform duration-300 ease-out group-hover:-translate-y-[3px] group-hover:translate-x-[3px]"
                  >
                    <svg 
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.6px]" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="6" y1="18" x2="18" y2="6"></line>
                      <polyline points="8 6 18 6 18 16"></polyline>
                    </svg>
                  </motion.div>
                </div>

                {/* Description Paragraph */}
                <motion.p 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                  className="font-['Geist',sans-serif] font-normal text-[13.5px] sm:text-[14px] leading-relaxed text-[#2D2D2D] mt-8 max-w-lg transition-colors duration-300"
                >
                  HandFlow is a gesture-controlled automation system that enables users to interact with electronic devices through natural hand movements. Using real-time computer vision and machine learning, the system recognizes predefined gestures and translates them into device commands, eliminating the need for physical switches or controllers.
                </motion.p>
              </div>

            </div>

            {/* Right Column: Tags and Specs Table */}
            <div className="lg:col-span-6 w-full flex flex-col justify-between h-full lg:pt-[18px]">
              
              {/* Pills / Tags (Top Right Aligned, stacked as requested, moves left on hover) */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col items-start lg:items-end gap-2 transition-transform duration-300 ease-out group-hover:-translate-x-[9px]"
              >
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full border border-black/25 text-[11.5px] font-['Geist_Mono',monospace] font-normal text-black/80 bg-transparent hover:bg-black/[2.5%] transition-colors cursor-default">
                    Hand Model
                  </span>
                  <span className="px-3.5 py-1 rounded-full border border-black/25 text-[11.5px] font-['Geist_Mono',monospace] font-normal text-black/80 bg-transparent hover:bg-black/[2.5%] transition-colors cursor-default">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full border border-black/25 text-[11.5px] font-['Geist_Mono',monospace] font-normal text-black/80 bg-transparent hover:bg-black/[2.5%] transition-colors cursor-default">
                    Computer Vision
                  </span>
                </div>
              </motion.div>

              {/* Key Specs Table (Bottom Aligned, narrower width, values moved closer, moves left on hover) */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                className="w-full lg:w-[65%] lg:ml-auto border-t border-black/15 flex flex-col text-[13px] mt-12 lg:mt-[70px] transition-transform duration-300 ease-out group-hover:-translate-x-[9px]"
              >
                <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                  <span className="w-16 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                    ROLE
                  </span>
                  <span className="flex-1 text-center font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                    Dataset Curator
                  </span>
                </div>
                <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                  <span className="w-16 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                    IMPACT
                  </span>
                  <span className="flex-1 text-center font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                    Improved gesture recognition reliability
                  </span>
                </div>
                <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                  <span className="w-16 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                    TECH
                  </span>
                  <span className="flex-1 text-center font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                    MediaPipe, Python, ESP32 & Computer Vision
                  </span>
                </div>
              </motion.div>

            </div>

          </div>
          
          {/* Final Divider after the project */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full mt-12 md:mt-16 mb-6 md:mb-7"
          >
            <div className="w-full h-[1px] bg-black/30"></div>
          </motion.div>

        </div>
      </div>
      
      {/* Left-to-Right Scrolling Marquee for Tech Stack (Scroll-Linked) - Full Width */}
      <div className="relative w-full overflow-hidden whitespace-nowrap pt-2 pb-16 md:pb-24 flex items-center justify-center border-b border-[#757575] bg-[#E5E5E5]">
        <motion.div 
          className="flex items-center gap-6 md:gap-10 w-max"
          style={{ x }}
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {/* Sequence 1: All Grey */}
              {[
                { text: "PYTHON", color: "#757575" },
                { text: "GIT", color: "#757575" },
                { text: "MONGO", color: "#757575" },
              ].map((item, index) => (
                <React.Fragment key={`grey-${i}-${index}`}>
                  <span 
                    className="text-[12vw] font-['Space_Grotesk',sans-serif] font-medium tracking-normal leading-none"
                    style={{ WebkitTextStroke: `2.5px ${item.color}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}
                  >
                    {item.text}
                  </span>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[9vw] h-[9vw] max-w-[85px] max-h-[85px] mx-1 md:mx-4 shrink-0" style={{ stroke: item.color, strokeWidth: '4px' }}>
                    <path d="M50 0C50 35 65 50 100 50C65 50 50 65 50 100C50 65 35 50 0 50C35 50 50 35 50 0Z" />
                  </svg>
                </React.Fragment>
              ))}

              {/* Sequence 2: All Blue */}
              {[
                { text: "PYTHON", color: "#4F46E5" },
                { text: "GIT", color: "#4F46E5" },
                { text: "MONGO", color: "#4F46E5" },
              ].map((item, index) => (
                <React.Fragment key={`blue-${i}-${index}`}>
                  <span 
                    className="text-[12vw] font-['Space_Grotesk',sans-serif] font-medium tracking-normal leading-none"
                    style={{ WebkitTextStroke: `2.5px ${item.color}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}
                  >
                    {item.text}
                  </span>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[9vw] h-[9vw] max-w-[85px] max-h-[85px] mx-1 md:mx-4 shrink-0" style={{ stroke: item.color, strokeWidth: '4px' }}>
                    <path d="M50 0C50 35 65 50 100 50C65 50 50 65 50 100C50 65 35 50 0 50C35 50 50 35 50 0Z" />
                  </svg>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
