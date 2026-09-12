import React from 'react';

const techStack = [
  "Figma", "Code", "Java", "C++", "Python", 
  "Tensorflow", "Premiere", "Valorant", "Games", 
  "Develop", "AI", "Django", "API", "Backend", 
  "Figma", "Code", "Java", "C++"
];

export default function Marquee() {
  return (
    <div className="absolute bottom-0 left-0 z-50 w-full overflow-hidden whitespace-nowrap bg-[#2071CA]/10 py-4 text-white/70 border-t border-[#4A4A4A]/[0.52]">
      {/* Edge gradient masks for fade effect */}
      <div 
        className="flex animate-marquee items-center gap-8 w-max"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      >
        {techStack.map((tech, i) => (
          <React.Fragment key={i}>
            <span className="text-base md:text-lg font-['Geist',sans-serif] font-normal capitalize">
              {tech}
            </span>
            <span className="text-sm">
              ✦
            </span>
          </React.Fragment>
        ))}
        {/* Duplicate for seamless loop */}
        {techStack.map((tech, i) => (
          <React.Fragment key={`dup-${i}`}>
            <span className="text-base md:text-lg font-['Geist',sans-serif] font-normal capitalize">
              {tech}
            </span>
            <span className="text-sm">
              ✦
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
