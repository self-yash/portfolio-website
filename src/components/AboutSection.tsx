import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Music, Video, Gamepad2, Send, PenTool, Terminal, Globe, Network, MessageSquare } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-[#E5E5E5] text-black pt-0 overflow-hidden selection:bg-blue-500/30">
      
      {/* Wrapper that cuts off the diagonal background and creates the full-width horizontal line */}
      <div className="relative w-full border-b border-[#757575]">
        {/* Subtle Diagonal Pattern Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(55deg, transparent 0, transparent 4px, rgba(0, 0, 0, 0.13) 4px, rgba(0, 0, 0, 0.13) 5px)'
          }}
        />

        <div className="relative z-10 mx-6 sm:mx-10 md:mx-16 lg:mx-auto lg:max-w-[1050px] flex flex-col items-center border-x border-[#757575]">
        
        {/* Header Grid */}
        <div className="w-full flex flex-col items-center">
          {/* Proportional top spacing - moved down to give breathing room and clear navbar */}
          <div className="w-full h-[80px] sm:h-[90px] md:h-[105px] lg:h-[115px]"></div>
          
          {/* About row */}
          <div className="w-full py-[2px] md:py-[3px] flex justify-center border-y border-[#757575] bg-[#E1E1E2]">
            <span className="text-[#4F46E5] font-['Geist_Mono',monospace] text-base md:text-lg font-semibold tracking-wide leading-tight">
              About
            </span>
          </div>

          {/* Thin gap row */}
          <div className="w-full h-3 md:h-4 border-b border-[#757575] bg-[#E1E1E2]"></div>

          {/* Heading row */}
          <div className="w-full pt-2 pb-2.5 flex justify-center border-b border-[#757575] bg-[#E1E1E2]">
            <h2 
              className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-['Geist',sans-serif] font-normal tracking-[-0.04em] text-center leading-[1.08] text-black m-0 p-0"
              style={{ letterSpacing: '-0.04em' }}
            >
              Here's what sets me apart<br />and makes me unique
            </h2>
          </div>
          
          {/* Box below heading with height of 55px and solid #E1E1E2 color */}
          <div className="w-full h-[55px] border-b border-[#757575] bg-[#E1E1E2]"></div>
        </div>

        {/* Background Box of color #E1E1E2 behind all bento cards - Side lines stop exactly at bottom card */}
        <div className="w-full bg-[#E1E1E2] border-b border-[#757575]">
          {/* Bento Grid - Flush with border on all 4 sides (sides, top, and bottom) with -mx-[1px] and -my-[1px] so strokes merge seamlessly without doubling or overlapping */}
          <div className="w-[calc(100%+2px)] -mx-[1px] -my-[1px] grid grid-cols-1 lg:grid-cols-2 gap-3">
            
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              
              {/* Bio Card - Scaled proportional height: 190px with crisp #757575 border and 18px radius */}
              <div className="bg-[#F8F8F9] rounded-[18px] p-5 md:p-6 border border-[#757575] h-auto lg:h-[190px] flex flex-col justify-start">
                <h3 className="text-[16px] font-['Geist',sans-serif] font-medium text-black mb-3">
                  Learn more about me!
                </h3>
                <div className="font-['Geist',sans-serif] font-normal text-black/70 leading-relaxed max-w-sm text-[14px]">
                  Good Afternoon!<br/>
                  I'm Yash Mehta, a final year student at<br/>
                  Sir Padampat Singhania University,<br/>
                  Udaipur experienced at
                </div>
              </div>

              {/* Games Card - Reduced length: 240px with crisp #757575 border and 18px radius */}
              <div className="bg-[#F8F8F9] rounded-[18px] p-5 md:p-6 border border-[#757575] relative overflow-hidden h-auto min-h-[210px] lg:h-[240px]">
                <h3 className="text-[16px] font-['Geist',sans-serif] font-medium text-black mb-2">
                  My kind of games
                </h3>
                <p className="font-['Geist',sans-serif] font-normal text-black/70 leading-relaxed max-w-[150px] sm:max-w-[180px] text-[14px]">
                  A collection of games I enjoy, replay, and occasionally get way too competitive about.
                </p>
                
                {/* Stacked Game Cards Visual - Reduced spacing between cards, Valorant poster as 3rd image, Forza 2nd, Cyberpunk front */}
                <div className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-end pointer-events-none">
                  <div className="relative flex items-center h-40 sm:h-44 lg:h-48 w-40 sm:w-48 lg:w-52 justify-end">
                    
                    {/* Card 1: Backmost Gradient Accent Card */}
                    <div className="absolute right-12 sm:right-15 lg:right-18 w-24 sm:w-28 lg:w-[114px] h-36 sm:h-40 lg:h-44 rounded-2xl overflow-hidden border border-black/10 bg-gradient-to-b from-[#6D95BE] via-[#9BC0E2] to-[#2B4366] flex flex-col justify-between p-2">
                      <div className="text-[7px] text-white/80 font-bold tracking-widest uppercase">Riot</div>
                      <div className="text-[9px] font-black text-white/70 rotate-90 origin-bottom-left ml-2 tracking-widest">
                        VALORANT
                      </div>
                    </div>

                    {/* Card 2: CS:GO Dark Accent Card */}
                    <div className="absolute right-9 sm:right-11 lg:right-13.5 w-24 sm:w-28 lg:w-[114px] h-36 sm:h-40 lg:h-44 rounded-2xl overflow-hidden border border-black/10 bg-gradient-to-b from-[#4A4237] via-[#2A241F] to-[#151311] flex flex-col justify-between p-2">
                      <div className="text-[7px] text-white/60 font-semibold tracking-wider">VALVE</div>
                      <div className="text-[9px] font-black text-white/60 rotate-90 origin-bottom-left ml-2 tracking-widest">
                        CS:GO
                      </div>
                    </div>

                    {/* Card 3: Valorant Key Art Poster (3rd image in stack behind Forza & Cyberpunk) */}
                    <div className="absolute right-6 sm:right-7.5 lg:right-9 w-24 sm:w-28 lg:w-[114px] h-36 sm:h-40 lg:h-44 rounded-2xl overflow-hidden border border-black/10 shadow-sm z-[5] bg-[#E8333D]">
                      <img 
                        src="/images/valorant.jpg" 
                        alt="Valorant" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Card 4 (2nd Game behind Cyberpunk): Official Forza Horizon 6 Poster */}
                    <div className="absolute right-3 sm:right-4 lg:right-4.5 w-24 sm:w-28 lg:w-[114px] h-36 sm:h-40 lg:h-44 rounded-2xl overflow-hidden border border-black/10 shadow-sm z-10 bg-white">
                      <img 
                        src="/images/forza.jpg" 
                        alt="Forza Horizon 6" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Card 5 (Front): Cyberpunk 2077 Official Poster - No hover effect */}
                    <div className="absolute right-0 w-24 sm:w-28 lg:w-[114px] h-36 sm:h-40 lg:h-44 rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.25)] border border-white/40 overflow-hidden z-20 bg-[#FCE100]">
                      <img 
                        src="/images/cyberpunk.jpg" 
                        alt="Cyberpunk 2077" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              
              {/* Toolbox Card - Reduced length: 240px with crisp #757575 border, 18px radius, more breathing space, no hover effect */}
              <div className="bg-[#F8F8F9] rounded-[18px] p-5 md:p-6 border border-[#757575] flex flex-col items-center justify-center overflow-hidden relative h-auto min-h-[210px] lg:h-[240px]">
                <h3 className="text-[16px] font-['Geist',sans-serif] font-medium text-black mb-1.5 z-10 text-center">
                  Toolbox
                </h3>
                <p className="font-['Geist',sans-serif] font-normal text-black/70 text-center mb-5 z-10 text-[14px] max-w-md">
                  Check out my favourite tools and spots around the web
                </p>

                {/* Tools Row: precisely overflowing, center aligned, fading edges to 26% opacity */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 w-full py-1 z-10 relative left-0 right-0">
                  
                  {/* 1. Premiere Pr - Outer Left (69% scale), exactly 26% opacity to fade out */}
                  <div 
                    className="shrink-0 w-[66px] h-[66px] sm:w-[72px] sm:h-[72px] rounded-[16px] p-[4px] sm:p-[4.5px] flex items-center justify-center cursor-pointer opacity-[0.26]"
                    style={{
                      backgroundColor: '#F7F7F8',
                      border: '1.85px solid #D6DADE',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[12px] flex items-center justify-center"
                      style={{
                        border: '1.85px solid rgba(230, 231, 234, 0.5)',
                        boxShadow: 'inset 0px -3.7px 3.7px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <img 
                        src="/images/premiere.svg" 
                        alt="Premiere Pro" 
                        className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain rounded-[7px]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* 2. Figma - Mid Left (77% scale) */}
                  <div 
                    className="shrink-0 w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] rounded-[18px] p-[4.5px] sm:p-[5px] flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: '#F7F7F8',
                      border: '1.85px solid #D6DADE',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[14px] flex items-center justify-center"
                      style={{
                        border: '1.85px solid rgba(230, 231, 234, 0.5)',
                        boxShadow: 'inset 0px -3.7px 3.7px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <img 
                        src="/images/figma.svg" 
                        alt="Figma" 
                        className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain rounded-[8px]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* 3. VS Code - Center Hero size (100% scale) */}
                  <div 
                    className="shrink-0 w-[96px] h-[96px] sm:w-[104px] sm:h-[104px] rounded-[20px] p-[5px] sm:p-[6px] flex items-center justify-center cursor-pointer z-20"
                    style={{
                      backgroundColor: '#F7F7F8',
                      border: '1.85px solid #D6DADE',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[16px] flex items-center justify-center"
                      style={{
                        border: '1.85px solid rgba(230, 231, 234, 0.5)',
                        boxShadow: 'inset 0px -3.7px 3.7px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <img 
                        src="/images/vscode.svg" 
                        alt="VS Code" 
                        className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* 4. Postman - Mid Right (77% scale) */}
                  <div 
                    className="shrink-0 w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] rounded-[18px] p-[4.5px] sm:p-[5px] flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: '#F7F7F8',
                      border: '1.85px solid #D6DADE',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[14px] flex items-center justify-center"
                      style={{
                        border: '1.85px solid rgba(230, 231, 234, 0.5)',
                        boxShadow: 'inset 0px -3.7px 3.7px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <img 
                        src="/images/postman.svg" 
                        alt="Postman" 
                        className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* 5. Spotify - Outer Right (69% scale), exactly 26% opacity to fade out */}
                  <div 
                    className="shrink-0 w-[66px] h-[66px] sm:w-[72px] sm:h-[72px] rounded-[16px] p-[4px] sm:p-[4.5px] flex items-center justify-center cursor-pointer opacity-[0.26]"
                    style={{
                      backgroundColor: '#F7F7F8',
                      border: '1.85px solid #D6DADE',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[12px] flex items-center justify-center"
                      style={{
                        border: '1.85px solid rgba(230, 231, 234, 0.5)',
                        boxShadow: 'inset 0px -3.7px 3.7px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <img 
                        src="/images/spotify.svg" 
                        alt="Spotify" 
                        className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Marquee Card - Solid white #F8F8F9 background and crisp #757575 border, 18px radius; ONLY text fades on edges */}
              <div className="bg-[#F8F8F9] rounded-[18px] h-[62px] px-3 overflow-hidden border border-[#757575] flex items-center relative">
                <div 
                  className="w-full h-full flex items-center overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  }}
                >
                  <div className="flex whitespace-nowrap animate-marquee w-fit font-['Geist',sans-serif] [animation-duration:55s] select-none">
                    <div className="flex items-center shrink-0">
                      {[...Array(8)].map((_, i) => (
                        <span key={i} className="inline-flex items-center text-sm sm:text-[15px] text-black">
                          <span className="font-[300]">PERSONAL</span>
                          <span className="font-semibold ml-1.5 mr-2">PORTFOLIO</span>
                          <span className="text-xs sm:text-sm select-none mr-2">✹</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center shrink-0">
                      {[...Array(8)].map((_, i) => (
                        <span key={i} className="inline-flex items-center text-sm sm:text-[15px] text-black">
                          <span className="font-[300]">PERSONAL</span>
                          <span className="font-semibold ml-1.5 mr-2">PORTFOLIO</span>
                          <span className="text-xs sm:text-sm select-none mr-2">✹</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials Grid Card - Scaled proportional height: 116px with crisp #757575 border and 18px radius */}
              <div className="grid grid-cols-2 grid-rows-2 bg-[#F8F8F9] rounded-[18px] overflow-hidden border border-[#757575] h-[116px]">
                {/* Discord */}
                <a 
                  href="#" 
                  className="px-4 py-2 border-r border-b border-[#757575] hover:bg-white transition-colors group flex items-center justify-between"
                >
                  <div className="flex flex-col justify-center gap-[6px]">
                    <span className="inline-flex items-center gap-1.5 text-[#5B5B5B] font-['Geist',sans-serif] font-normal text-[9px] tracking-[0.06em] leading-none h-[9px]">
                      <span>DISCORD</span>
                      <svg 
                        viewBox="-1 -1 258 201" 
                        fill="#5B5B5B" 
                        className="w-[11px] h-[9px] shrink-0 self-center overflow-visible"
                      >
                        <path d="M216.856 16.597A208.5 208.5 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046q-29.538-4.442-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.8 207.8 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161 161 0 0 0 79.735 175.3a136.4 136.4 0 0 1-21.846-10.632a109 109 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a132 132 0 0 0 5.355 4.237a136 136 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2s23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18"/>
                      </svg>
                    </span>
                    <div className="font-['Geist',sans-serif] font-medium text-black text-xs sm:text-[13px] leading-none">
                      @festerrrr
                    </div>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-5 h-5 text-black stroke-[1.4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
                  >
                    <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* GitHub */}
                <a 
                  href="#" 
                  className="px-4 py-2 border-b border-[#757575] hover:bg-white transition-colors group flex items-center justify-between"
                >
                  <div className="flex flex-col justify-center gap-[6px]">
                    <span className="inline-flex items-center gap-1.5 text-[#5B5B5B] font-['Geist',sans-serif] font-normal text-[9px] tracking-[0.06em] leading-none h-[9px]">
                      <span>GITHUB</span>
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#5B5B5B" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-[10px] h-[10px] shrink-0 self-center"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.4 13.4 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </span>
                    <div className="font-['Geist',sans-serif] font-medium text-black text-xs sm:text-[13px] leading-none">
                      @self-yash
                    </div>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-5 h-5 text-black stroke-[1.4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
                  >
                    <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="#" 
                  className="px-4 py-2 border-r border-[#757575] hover:bg-white transition-colors group flex items-center justify-between"
                >
                  <div className="flex flex-col justify-center gap-[6px]">
                    <span className="inline-flex items-center gap-1.5 text-[#5B5B5B] font-['Geist',sans-serif] font-normal text-[9px] tracking-[0.06em] leading-none h-[9px]">
                      <span>LINKEDIN</span>
                      <svg 
                        viewBox="0 0 256 256" 
                        fill="#5B5B5B" 
                        className="w-[10px] h-[10px] shrink-0 self-center -translate-y-px"
                      >
                        <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"/>
                      </svg>
                    </span>
                    <div className="font-['Geist',sans-serif] font-medium text-black text-xs sm:text-[13px] leading-none">
                      @yashhmehta
                    </div>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-5 h-5 text-black stroke-[1.4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
                  >
                    <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Monkeytype */}
                <a 
                  href="#" 
                  className="px-4 py-2 hover:bg-white transition-colors group flex items-center justify-between"
                >
                  <div className="flex flex-col justify-center">
                    <span className="inline-flex items-center gap-1 text-[#5B5B5B] font-['Geist',sans-serif] font-normal text-[9px] tracking-[0.06em] leading-none mb-[3px]">
                      <span>MONKEYTYPE</span>
                      <Gamepad2 className="w-[11px] h-[11px] text-[#5B5B5B] shrink-0 self-center" strokeWidth={2.5} />
                    </span>
                    <div className="font-['Geist',sans-serif] font-medium text-black text-xs sm:text-[13px] leading-none">
                      @Festerrr
                    </div>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-5 h-5 text-black stroke-[1.4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
                  >
                    <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Extension of side lines */}
        <div className="w-full h-24 sm:h-32 md:h-40 bg-transparent"></div>
      </div>
      
    </div>
      
      {/* Huge Bottom Text (Optional depending on how deep they scroll) */}
      <div className="relative w-full overflow-hidden whitespace-nowrap mt-16 md:mt-24 mb-16 md:mb-24">
        <h1 className="text-[12vw] font-black tracking-tighter text-black/90 leading-none flex items-center justify-center">
          HIPPED <span className="mx-8 text-[8vw]">●</span> BROK
        </h1>
      </div>
    </section>
  );
}
