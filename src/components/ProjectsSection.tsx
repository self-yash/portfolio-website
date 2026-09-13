import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  return (
    <div id="projects" className="relative w-full border-t border-[#757575] bg-[#E5E5E5] text-black">
      {/* Outer container expanded to sides with generous top spacing */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-24">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 text-black font-['Geist_Mono',monospace] font-normal text-sm md:text-[14px] mb-3">
            {/* Glowing Dot: Perfect circle with blur set to 3 and 50% opacity shadow (smaller size) */}
            <span 
              className="w-1 h-1 rounded-full bg-black shrink-0" 
              style={{ boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)' }}
            />
            <span>Projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-['Cal_Sans',sans-serif] font-normal tracking-tight text-black leading-[1.05]">
            Things I’ve made.
          </h2>
          <h3 className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-['Cal_Sans',sans-serif] font-normal tracking-tight text-[#757575]/75 leading-[1.05] mt-1">
            Some serious. Some not.
          </h3>
        </div>

        {/* Project 01/04 Card */}
        <div className="w-full pt-2">
          {/* Add group class for hover targeting across the entire project block */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[120px] items-start">
            
            {/* Left Column: 01/04 on the far left, aligned with header, and details on right */}
            <div className="lg:col-span-6 flex items-start gap-5 sm:gap-8">
              
              {/* Index 01/04 (moves left on hover) */}
              <div className="shrink-0 pt-[10px] sm:pt-[12px] transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <span className="font-['Geist_Mono',monospace] font-normal text-[13px] sm:text-[14px] text-[#000000] opacity-[0.69] select-none block leading-none">
                  01/04
                </span>
              </div>

              {/* Project Content Block (moves right on hover) */}
              <div className="flex-1 flex flex-col justify-start transition-transform duration-300 ease-out group-hover:translate-x-[9px]">
                
                {/* Category: Team Project */}
                <div className="leading-none pb-0.5">
                  <span className="font-['Geist_Mono',monospace] text-[12px] sm:text-[13px] uppercase tracking-wider text-[#4F46E5] font-normal leading-none inline-block transition-colors duration-300">
                    TEAM PROJECT
                  </span>
                </div>

                {/* Title in Geist Medium */}
                <h4 className="-mt-[2px] text-3xl sm:text-4xl md:text-[40px] font-['Geist',sans-serif] font-medium text-black tracking-tight leading-tight transition-colors duration-300">
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
          <div className="w-full mt-12 md:mt-16 mb-8">
            <div className="w-full h-[1px] bg-black/30"></div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
