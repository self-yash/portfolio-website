import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function SkillBar({ name, sub, value, isCyan, delay = 0 }: { name: string, sub?: string, value: number, isCyan?: boolean, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="w-full relative"
    >
      <div className="flex justify-between items-end mb-2.5">
        <div 
          className="font-['Space_Grotesk',sans-serif] text-[15px] md:text-[16px] text-black tracking-tight flex items-center"
          style={{ fontWeight: 430 }}
        >
          <span>{name}</span>
          {sub && (
            <span className="text-[#757575]/80 font-normal ml-1.5 font-['Geist',sans-serif] inline-flex items-center">
              |{' '}
              {sub.includes("Platinum 2") ? (
                <span className="relative group/peak inline-flex items-center ml-1 cursor-default">
                  <span className="text-[#757575]/80 font-normal">{sub}</span>
                  {/* Tooltip pop matching reference with #242429 and no shadow */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-[8px] bg-[#242429] border border-white/10 text-white text-[12.5px] font-['Geist',sans-serif] font-medium opacity-0 group-hover/peak:opacity-100 group-hover/peak:-translate-y-1 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap flex items-center justify-center">
                    Peak
                    <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#242429] rotate-45 border-r border-b border-white/10" />
                  </span>
                </span>
              ) : (
                <span className="ml-1">{sub}</span>
              )}
            </span>
          )}
        </div>
        <div className="font-['Geist_Mono',monospace] font-normal text-[12px] md:text-[13px] text-[#757575]">
          {value}
        </div>
      </div>
      <div className="w-full h-[5.5px] bg-black/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut", delay: delay + 0.2 }}
          className={`h-full ${isCyan ? 'bg-[#22d3ee]' : 'bg-[#4F46E5]'}`}
        />
      </div>
    </motion.div>
  );
}

function CategoryCard({ title, tags, delay = 0 }: { title: string, tags: string[], delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="w-full rounded-[22px] border border-black/30 px-6 py-4.5 md:py-5 flex flex-col gap-3.5 bg-[#DCDCDC]/75 backdrop-blur-[2px]"
      style={{ backgroundColor: 'rgba(220, 220, 220, 0.75)' }}
    >
      <div className="font-['Geist_Mono',monospace] text-[11.5px] md:text-[12px] uppercase tracking-widest text-[#4F46E5] font-medium leading-tight">
        {title}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {tags.map(tag => (
          <span key={tag} className="px-4 py-[6px] md:py-[6.5px] rounded-full border border-black/15 text-[12px] md:text-[12.5px] font-['Geist_Mono',monospace] font-normal text-[#757575] bg-transparent">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function StackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slow, rigid horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-16vw"]);

  return (
    <div ref={containerRef} id="stack" className="relative w-full bg-[#E5E5E5] text-black overflow-hidden pt-12 md:pt-16 pb-10 md:pb-12">
      
      {/* Huge STACK Background Text - Positioned below "The Curtain." and shifted right */}
      <div className="absolute top-[180px] sm:top-[210px] md:top-[240px] left-0 select-none pointer-events-none z-0 flex items-center w-full">
        <motion.div 
          style={{ x }}
          className="flex items-center gap-12 md:gap-16 whitespace-nowrap pl-[16vw] md:pl-[22vw]"
        >
          <span 
            className="text-[25vw] md:text-[22vw] font-['Cal_Sans',sans-serif] font-normal leading-none tracking-[0.02em]"
            style={{ color: 'rgba(0,0,0,0.08)' }}
          >
            STACK
          </span>
          <span 
            className="text-[25vw] md:text-[22vw] font-['Cal_Sans',sans-serif] font-normal leading-none tracking-[0.02em]"
            style={{ WebkitTextStroke: '3px #CFCFD0', WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}
          >
            STACK
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2.5 text-black font-['Geist_Mono',monospace] font-normal text-sm md:text-[14px] mb-4"
          >
            <span 
              className="w-1 h-1 rounded-full bg-black shrink-0" 
              style={{ boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)' }}
            />
            <span>Stack</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-['Cal_Sans',sans-serif] font-normal tracking-tight text-[#757575] leading-[1.05]"
          >
            A peek behind
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-['Cal_Sans',sans-serif] font-normal tracking-tight text-black leading-[1.05] mt-1 md:mt-2"
          >
            The Curtain.
          </motion.h3>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left: Skill Bars */}
          <div className="w-full flex flex-col justify-between py-1 gap-7 md:gap-8">
            <SkillBar name="Django" value={70} delay={0.1} />
            <SkillBar name="Figma" value={85} delay={0.15} />
            <SkillBar name="Genshin Impact" sub="AR60" value={100} delay={0.2} />
            <SkillBar name="Python" value={70} delay={0.25} />
            <SkillBar name="Valorant" sub="Platinum 2" value={60} isCyan delay={0.3} />
            <SkillBar name="Firebase" value={80} delay={0.35} />
            <SkillBar name="Git" value={75} delay={0.4} />
          </div>

          {/* Right: Category Cards */}
          <div className="w-full flex flex-col justify-between h-full gap-4 lg:gap-0">
            <CategoryCard 
              title="LANGUAGES" 
              tags={["Python", "C++"]} 
              delay={0.1}
            />
            <CategoryCard 
              title="FRAMEWORKS" 
              tags={["Django", "Tensorflow", "discord.py", "NestJS"]} 
              delay={0.2}
            />
            <CategoryCard 
              title="DESIGN & TOOLS" 
              tags={["Figma", "LottieFiles", "Premiere Pro"]} 
              delay={0.3}
            />
            <CategoryCard 
              title="DATABASE" 
              tags={["Firebase", "MySQL"]} 
              delay={0.4}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
