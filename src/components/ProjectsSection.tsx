import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import landingPageImg from '../assets/images/landing_page.png';

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

        {/* Project 01/02 Card (Sports ERP) - 01/02 animates first, followed by the rest of the section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full pt-2"
        >
          {/* Add group class for hover targeting across the entire project block */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[120px] items-start">
            
            {/* Left Column: 01/02 on the far left, aligned with header, and details on right */}
            <div className="lg:col-span-6 flex items-start gap-5 sm:gap-8">
              
              {/* Index 01/02 (Animates FIRST) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 42 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0 } 
                  }
                }}
                className="shrink-0 pt-[10px] sm:pt-[12px] transition-transform duration-300 ease-out group-hover:-translate-x-1"
              >
                <span className="font-['Geist_Mono',monospace] font-normal text-[13px] sm:text-[14px] text-[#000000] opacity-[0.69] select-none block leading-none">
                  01/03
                </span>
              </motion.div>

              {/* Project Content Block (Animates SECOND after 01/02) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 42 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 } 
                  }
                }}
                className="flex-1 flex flex-col justify-start transition-transform duration-300 ease-out group-hover:translate-x-[9px]"
              >
                
                {/* Category: Team Project */}
                <div className="leading-none pb-0.5">
                  <span className="font-['Geist_Mono',monospace] text-[12px] sm:text-[13px] uppercase tracking-wider text-[#4F46E5] font-normal leading-none inline-block transition-colors duration-300">
                    TEAM PROJECT
                  </span>
                </div>

                {/* Title & Arrow Link */}
                <a 
                  href="https://github.com/spsusports/SPSU-SportsERP-DevDocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex flex-col items-start cursor-pointer group/title"
                >
                  {/* Title in Geist Medium */}
                  <h4 className="-mt-[2px] text-3xl sm:text-4xl md:text-[40px] font-['Geist',sans-serif] font-medium text-black tracking-tight leading-tight transition-colors duration-300 group-hover/title:text-[#4F46E5]">
                    Sports ERP
                  </h4>

                  {/* Directional Arrow (Rotates left and shifts extra right on hover) */}
                  <div className="mt-2 mb-6 text-[#4F46E5] inline-block origin-bottom-left transition-transform duration-300 ease-out group-hover:-rotate-5 group-hover:translate-x-[3px]">
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
                  </div>
                </a>

                {/* Description Paragraph */}
                <p className="font-['Geist',sans-serif] font-normal text-[13.5px] sm:text-[14px] leading-relaxed text-[#2D2D2D] mb-8 max-w-lg transition-colors duration-300">
                  Sports ERP is an end-to-end sports facility management platform that centralizes scheduling, equipment allocation, user management, and activity tracking into a unified system. It streamlines bookings, participation flows, and resource utilization across venues through structured, role-based access control and real-time coordination of sports operations.
                </p>

                {/* Key Specs Table */}
                <div className="w-full border-t border-black/15 flex flex-col text-[13px] mb-[24px]">
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
                </div>

                {/* Pills / Tags */}
                <div className="-mt-[4px] flex flex-wrap items-center gap-2">
                  {["Figma", "After Effects", "Prototyping", "Wireframing"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1 rounded-full border border-black/25 text-[11.5px] font-['Geist_Mono',monospace] font-normal text-black/80 bg-transparent hover:bg-black/[2.5%] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </motion.div>

            </div>

            {/* Right Column: Mac-style Showcase Window Mockup with Project Image (Animates with the rest of the section) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 42 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 } 
                }
              }}
              className="lg:col-span-6 w-full lg:mt-[48px]"
            >
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
            </motion.div>

          </div>
          
          {/* Final Divider after the project */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } 
              }
            }}
            className="w-full mt-12 md:mt-16 mb-8"
          >
            <div className="w-full h-[1px] bg-black/30"></div>
          </motion.div>
          
        </motion.div>

        {/* Project 02/03 Card (HandFlow) - 02/03 animates first, followed by the rest of the section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full pt-2"
        >
          {/* Add group class for hover targeting across the entire project block */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[120px] items-start">
            
            {/* Left Column: 02/03 on the far left, aligned with header, and details on right */}
            <div className="lg:col-span-6 flex items-start gap-5 sm:gap-8">
              
              {/* Index 02/03 (Animates FIRST) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 42 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0 } 
                  }
                }}
                className="shrink-0 pt-[10px] sm:pt-[12px] transition-transform duration-300 ease-out group-hover:-translate-x-1"
              >
                <span className="font-['Geist_Mono',monospace] font-normal text-[13px] sm:text-[14px] text-[#000000] opacity-[0.69] select-none block leading-none">
                  02/03
                </span>
              </motion.div>

              {/* Project Content Block (Animates SECOND after 02/03) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 42 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 } 
                  }
                }}
                className="flex-1 flex flex-col justify-start transition-transform duration-300 ease-out group-hover:translate-x-[9px]"
              >
                
                {/* Category: Personal Project */}
                <div className="leading-none pb-0.5">
                  <span className="font-['Geist_Mono',monospace] text-[12px] sm:text-[13px] uppercase tracking-wider text-[#4F46E5] font-normal leading-none inline-block transition-colors duration-300">
                    PERSONAL PROJECT
                  </span>
                </div>

                {/* Title and Arrow with Project Link */}
                <a 
                  href="https://github.com/Self-nasu/HandFlow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 -mt-[2px] w-fit cursor-pointer group/title"
                >
                  <h4 className="text-3xl sm:text-4xl md:text-[40px] font-['Geist',sans-serif] font-medium text-black tracking-tight leading-tight transition-colors duration-300 group-hover/title:text-[#4F46E5]">
                    HandFlow
                  </h4>
                  {/* Directional Arrow (Moves top-right on hover) */}
                  <div className="text-[#4F46E5] transition-transform duration-300 ease-out group-hover:-translate-y-[3px] group-hover:translate-x-[3px]">
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
                  </div>
                </a>

                {/* Description Paragraph */}
                <p className="font-['Geist',sans-serif] font-normal text-[13.5px] sm:text-[14px] leading-relaxed text-[#2D2D2D] mt-8 max-w-lg transition-colors duration-300">
                  HandFlow is a gesture-controlled automation system that enables users to interact with electronic devices through natural hand movements. Using real-time computer vision and machine learning, the system recognizes predefined gestures and translates them into device commands, eliminating the need for physical switches or controllers.
                </p>
              </motion.div>

            </div>

            {/* Right Column: Tags and Specs Table (Animates with the rest of the section) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 42 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 } 
                }
              }}
              className="lg:col-span-6 w-full flex flex-col justify-between h-full lg:pt-[18px]"
            >
              
              {/* Pills / Tags (Top Right Aligned, stacked as requested, moves left on hover) */}
              <div className="flex flex-col items-start lg:items-end gap-2 transition-transform duration-300 ease-out group-hover:-translate-x-[9px]">
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
              </div>

              {/* Key Specs Table (Bottom Aligned, narrower width, values moved closer, moves left on hover) */}
              <div className="w-full lg:w-[65%] lg:ml-auto border-t border-black/15 flex flex-col text-[13px] mt-12 lg:mt-[70px] transition-transform duration-300 ease-out group-hover:-translate-x-[9px]">
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
              </div>

            </motion.div>

          </div>
          
          {/* Final Divider after Project 2 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } 
              }
            }}
            className="w-full mt-12 md:mt-16 mb-8"
          >
            <div className="w-full h-[1px] bg-black/30"></div>
          </motion.div>

        </motion.div>

        {/* Project 03/03 Card (Portfolio Website) - 03/03 animates first, followed by the rest of the section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full pt-2"
        >
          {/* Add group class for hover targeting across the entire project block */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[120px] items-start">
            
            {/* Left Column: 03/03 on the far left, aligned with header, and details on right */}
            <div className="lg:col-span-6 flex items-start gap-5 sm:gap-8">
              
              {/* Index 03/03 (Animates FIRST) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 42 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0 } 
                  }
                }}
                className="shrink-0 pt-[10px] sm:pt-[12px] transition-transform duration-300 ease-out group-hover:-translate-x-1"
              >
                <span className="font-['Geist_Mono',monospace] font-normal text-[13px] sm:text-[14px] text-[#000000] opacity-[0.69] select-none block leading-none">
                  03/03
                </span>
              </motion.div>

              {/* Project Content Block (Animates SECOND after 03/03) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 42 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 } 
                  }
                }}
                className="flex-1 flex flex-col justify-start transition-transform duration-300 ease-out group-hover:translate-x-[9px]"
              >
                
                {/* Category: Personal Project */}
                <div className="leading-none pb-0.5">
                  <span className="font-['Geist_Mono',monospace] text-[12px] sm:text-[13px] uppercase tracking-wider text-[#4F46E5] font-normal leading-none inline-block transition-colors duration-300">
                    PERSONAL PROJECT
                  </span>
                </div>

                {/* Title (Non-clickable, no link, no hover color change) */}
                <div className="w-fit flex flex-col items-start mb-6">
                  {/* Title in Geist Medium */}
                  <h4 className="-mt-[2px] text-3xl sm:text-4xl md:text-[40px] font-['Geist',sans-serif] font-medium text-black tracking-tight leading-tight select-none">
                    Portfolio Website
                  </h4>
                </div>

                {/* Description Paragraph */}
                <p className="font-['Geist',sans-serif] font-normal text-[13.5px] sm:text-[14px] leading-relaxed text-[#2D2D2D] mb-8 max-w-lg transition-colors duration-300">
                  A minimalist, typography-driven personal portfolio designed and engineered to showcase design craft, system engineering, and interactive projects. Built with performance and fluid micro-interactions in mind, featuring scroll-linked velocity marquees, responsive motion transitions, and bespoke typographic hierarchy.
                </p>

                {/* Key Specs Table */}
                <div className="w-full border-t border-black/15 flex flex-col text-[13px] mb-[24px]">
                  <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                    <span className="w-20 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                      ROLE
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                      Design & Frontend Development
                    </span>
                  </div>
                  <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                    <span className="w-20 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                      IMPACT
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                      High-performance personal brand & visual system
                    </span>
                  </div>
                  <div className="flex items-center py-2.5 border-b border-black/15 transition-colors duration-300">
                    <span className="w-20 shrink-0 font-['Geist_Mono',monospace] font-normal text-[11px] text-[#4F46E5] uppercase tracking-wider">
                      CRAFT
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-black text-[13.5px]">
                      Editorial typography, motion physics & responsive layout
                    </span>
                  </div>
                </div>

                {/* Pills / Tags */}
                <div className="-mt-[4px] flex flex-wrap items-center gap-2">
                  {["Figma", "React", "TypeScript", "Tailwind CSS", "Motion"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1 rounded-full border border-black/25 text-[11.5px] font-['Geist_Mono',monospace] font-normal text-black/80 bg-transparent hover:bg-black/[2.5%] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </motion.div>

            </div>

            {/* Right Column: Mac-style Showcase Window Mockup with Dropped Landing Page Image (Animates with the rest of the section) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 42 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.22 } 
                }
              }}
              className="lg:col-span-6 w-full lg:mt-[48px]"
            >
              <div className="w-full rounded-2xl border border-[#909090] bg-[#0A1F6E] overflow-hidden relative transition-all duration-300 ease-out group-hover:border-[#4F46E5] group-hover:shadow-[0_0_35px_1px_rgba(79,70,229,0.5)]">
                
                {/* Window Title Bar - Exactly matching Sports ERP */}
                <div className="bg-[#FFFFFF] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-black/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>

                {/* Project Mockup Showcase Image - Exactly matching Sports ERP */}
                <div className="relative w-full aspect-video overflow-hidden bg-[#0A1F6E]">
                  <img 
                    src={landingPageImg} 
                    alt="Portfolio Website Showcase" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

              </div>
            </motion.div>

          </div>
          
          {/* Final Divider after the project */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } 
              }
            }}
            className="w-full mt-12 md:mt-16 mb-6 md:mb-7"
          >
            <div className="w-full h-[1px] bg-black/30"></div>
          </motion.div>

        </motion.div>
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
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[13vw] h-[13vw] max-w-[125px] max-h-[125px] mx-1 md:mx-4 shrink-0" style={{ stroke: item.color, strokeWidth: '4.5px' }}>
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
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[13vw] h-[13vw] max-w-[125px] max-h-[125px] mx-1 md:mx-4 shrink-0" style={{ stroke: item.color, strokeWidth: '4.5px' }}>
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
