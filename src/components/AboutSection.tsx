import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Music, Video, Gamepad2, Send, PenTool, Terminal, Globe, Network, MessageSquare } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-[#E5E5E5] text-black pt-0 overflow-hidden selection:bg-blue-500/30">
      {/* Subtle Diagonal Pattern Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(55deg, transparent 0, transparent 4px, rgba(0, 0, 0, 0.13) 4px, rgba(0, 0, 0, 0.13) 5px)'
        }}
      />

      <div className="relative z-10 mx-6 lg:mx-[108px] flex flex-col items-center border-x border-[#757575]">
        
        {/* Header Grid */}
        <div className="w-full flex flex-col items-center mb-10">
          {/* 110px distance between top part of lines bg and About box */}
          <div className="w-full h-[110px]"></div>
          
          {/* About row */}
          <div className="w-full py-[2px] md:py-[3px] flex justify-center border-y border-[#757575] bg-[#E1E1E2]">
            <span className="text-[#4F46E5] font-['Geist_Mono',monospace] text-base md:text-lg font-semibold tracking-wide leading-tight">
              About
            </span>
          </div>

          {/* Thin gap row */}
          <div className="w-full h-4 md:h-6 border-b border-[#757575] bg-[#E1E1E2]"></div>

          {/* Heading row */}
          <div className="w-full pt-[9px] pb-[11px] flex justify-center border-b border-[#757575] bg-[#E1E1E2]">
            <h2 
              className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-['Geist',sans-serif] font-normal tracking-[-0.04em] text-center leading-[1.08] text-black m-0 p-0"
              style={{ letterSpacing: '-0.04em' }}
            >
              Here's what sets me apart<br />and makes me unique
            </h2>
          </div>
          
          {/* Bottom gap row before grid */}
          <div className="w-full h-4 md:h-6 border-b border-[#757575] mb-4"></div>
        </div>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-6 mb-20">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Bio Card */}
            <div className="bg-[#F3F3F3] rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm h-full shadow-[inset_0_2px_10px_rgba(255,255,255,1)]">
              <h3 className="text-xl font-bold mb-8">Learn more about me!</h3>
              <div className="text-gray-600 font-medium leading-relaxed max-w-sm">
                Good Afternoon!<br/>
                I'm Yash Mehta, a final year student at<br/>
                Sir Padampat Singhania University,<br/>
                Udaipur experienced at
              </div>
            </div>

            {/* Games Card */}
            <div className="bg-[#F3F3F3] rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm relative overflow-hidden h-full shadow-[inset_0_2px_10px_rgba(255,255,255,1)]">
              <h3 className="text-xl font-bold mb-4">My kind of games</h3>
              <p className="text-gray-600 font-medium leading-relaxed max-w-[200px]">
                A collection of games I enjoy, replay, and occasionally get way too competitive about.
              </p>
              
              {/* Stacked Game Cards Visual */}
              <div className="absolute right-0 bottom-0 md:-right-4 md:-bottom-4 w-48 md:w-56 h-56 md:h-64 flex items-end justify-end p-4">
                <div className="relative w-full h-full">
                  <div className="absolute top-4 right-16 w-32 h-44 bg-red-600 rounded-xl shadow-lg -rotate-12 border border-white/20 flex items-center justify-center overflow-hidden">
                    <span className="text-white font-bold text-xl opacity-50 rotate-90 tracking-widest">VALORANT</span>
                  </div>
                  <div className="absolute top-2 right-8 w-32 h-44 bg-gray-800 rounded-xl shadow-lg -rotate-6 border border-white/20 flex items-center justify-center overflow-hidden">
                    <span className="text-white font-bold text-xl opacity-50 rotate-90 tracking-widest">CS:GO</span>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-44 bg-[#FCE100] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/40 flex items-center justify-center overflow-hidden z-10 transition-transform hover:-translate-y-2 hover:rotate-2">
                    <div className="text-black font-bold text-center leading-none">
                      <span className="text-xs uppercase tracking-widest opacity-70">Cyberpunk</span><br/>
                      <span className="text-2xl font-black tracking-tighter">2077</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Toolbox Card */}
            <div className="bg-[#F3F3F3] rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm shadow-[inset_0_2px_10px_rgba(255,255,255,1)] flex flex-col items-center overflow-hidden relative">
              <h3 className="text-xl font-bold mb-2 z-10">Toolbox</h3>
              <p className="text-gray-500 font-medium text-center mb-10 z-10">
                Check out my favourite tools and spots around the web
              </p>

              {/* Tools Marquee/Row */}
              <div className="flex items-center gap-4 w-[150%] md:w-[120%] -ml-10 z-10">
                {[
                  { icon: Video, color: "text-purple-500" },
                  { icon: PenTool, color: "text-pink-500", bg: "bg-black" },
                  { icon: Code2, color: "text-blue-500" },
                  { icon: Send, color: "text-orange-500" },
                  { icon: Music, color: "text-green-500" },
                  { icon: Terminal, color: "text-gray-700" }
                ].map((tool, idx) => (
                  <div key={idx} className="shrink-0 w-24 h-24 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                    <tool.icon className={`w-10 h-10 ${tool.color} ${tool.bg ? 'fill-current' : ''}`} />
                  </div>
                ))}
              </div>
              
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F3F3F3] to-transparent z-20"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F3F3F3] to-transparent z-20"></div>
            </div>

            {/* Marquee Card */}
            <div className="bg-[#F3F3F3] rounded-full py-3 overflow-hidden border border-black/5 shadow-sm shadow-[inset_0_2px_10px_rgba(255,255,255,1)]">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center mx-4">
                    <span className="text-gray-400 font-bold tracking-widest text-sm">PERSONAL</span>
                    <span className="text-black font-black tracking-widest text-sm ml-2">PORTFOLIO</span>
                    <span className="mx-4 text-black text-[10px]">✹</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials Grid */}
            <div className="grid grid-cols-2 gap-px bg-black/10 rounded-[2rem] overflow-hidden border border-black/5 shadow-[inset_0_2px_10px_rgba(255,255,255,1)]">
              {[
                { name: "DISCORD", handle: "@festerrrr", icon: MessageSquare },
                { name: "GITHUB", handle: "@self-yash", icon: Globe },
                { name: "LINKEDIN", handle: "@yashhmehta", icon: Network },
                { name: "MONKEYTYPE", handle: "@Festerrr", icon: Gamepad2 }
              ].map((social, idx) => (
                <a key={idx} href="#" className="bg-[#F3F3F3] p-6 hover:bg-white transition-colors group flex flex-col relative h-full">
                  <div className="flex items-center gap-1.5 mb-1 text-gray-400 font-bold text-[10px] tracking-widest">
                    {social.name} <social.icon className="w-3 h-3" />
                  </div>
                  <div className="font-bold text-gray-800">
                    {social.handle}
                  </div>
                  <ArrowUpRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-2 transition-all" />
                </a>
              ))}
            </div>

          </div>
        </div>
        
      </div>
      
      {/* Huge Bottom Text (Optional depending on how deep they scroll) */}
      <div className="w-full overflow-hidden whitespace-nowrap mt-32">
        <h1 className="text-[12vw] font-black tracking-tighter text-black/90 leading-none flex items-center justify-center">
          HIPPED <span className="mx-8 text-[8vw]">●</span> BROK
        </h1>
      </div>
    </section>
  );
}
