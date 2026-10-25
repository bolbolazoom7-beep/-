import React from 'react';

interface ButterfliesProps {
  isFrozen?: boolean;
  isScared?: boolean;
}

export const SparkleSvg: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

export const ButterflySvg: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-[0_6px_12px_rgba(217,119,6,0.35)] ${className}`}
  >
    {/* Butterfly Body */}
    <ellipse cx="50" cy="52" rx="3.5" ry="16" fill="#78350F" />
    <circle cx="50" cy="33" r="3.2" fill="#78350F" />
    {/* Antennae */}
    <path d="M49 31C46 22 39 19 36 20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    <path d="M51 31C54 22 61 19 64 20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    
    {/* Left Wing Group */}
    <g className="animate-wing-left">
      {/* Top Forewing */}
      <path
        d="M48 48C42 30 20 22 8 33C-4 44 12 68 47 54Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1.6"
      />
      {/* Inner Forewing Pattern */}
      <path
        d="M44 47C38 34 24 29 15 37C8 44 19 58 43 51Z"
        fill="#FEF08A"
        opacity="0.9"
      />
      {/* Wing Eye Spot */}
      <circle cx="26" cy="40" r="3" fill="#B45309" opacity="0.8" />
      {/* Bottom Hindwing */}
      <path
        d="M47 55C35 57 18 67 20 80C22 93 42 86 48 64Z"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="1.6"
      />
      <path
        d="M45 58C36 60 25 69 26 77C27 85 40 80 46 65Z"
        fill="#FEF08A"
        opacity="0.85"
      />
    </g>

    {/* Right Wing Group */}
    <g className="animate-wing-right">
      {/* Top Forewing */}
      <path
        d="M52 48C58 30 80 22 92 33C104 44 88 68 53 54Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1.6"
      />
      {/* Inner Forewing Pattern */}
      <path
        d="M56 47C62 34 76 29 85 37C92 44 81 58 57 51Z"
        fill="#FEF08A"
        opacity="0.9"
      />
      {/* Wing Eye Spot */}
      <circle cx="74" cy="40" r="3" fill="#B45309" opacity="0.8" />
      {/* Bottom Hindwing */}
      <path
        d="M53 55C65 57 82 67 80 80C78 93 58 86 52 64Z"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="1.6"
      />
      <path
        d="M55 58C64 60 75 69 74 77C73 85 60 80 54 65Z"
        fill="#FEF08A"
        opacity="0.85"
      />
    </g>
  </svg>
);

export const FloatingDecorations: React.FC<ButterfliesProps> = ({ isFrozen = false, isScared = false }) => {
  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700 ${
        isScared ? 'opacity-15' : 'opacity-100'
      }`}
    >
      {/* Butterfly 1: Top Left */}
      <div 
        className={`absolute top-[6%] left-[6%] sm:left-[12%] transition-all ${
          isFrozen ? '' : 'animate-float-1'
        }`}
        style={{ animationPlayState: isFrozen ? 'paused' : 'running' }}
      >
        <div className="rotate-[-12deg] transform">
          <ButterflySvg size={48} />
        </div>
      </div>

      {/* Butterfly 2: Top Right */}
      <div 
        className={`absolute top-[12%] right-[6%] sm:right-[14%] transition-all ${
          isFrozen ? '' : 'animate-float-2'
        }`}
        style={{ animationPlayState: isFrozen ? 'paused' : 'running' }}
      >
        <div className="rotate-[20deg] transform">
          <ButterflySvg size={44} />
        </div>
      </div>

      {/* Butterfly 3: Mid Bottom Left */}
      <div 
        className={`absolute bottom-[20%] left-[8%] sm:left-[15%] transition-all ${
          isFrozen ? '' : 'animate-float-3'
        }`}
        style={{ animationPlayState: isFrozen ? 'paused' : 'running' }}
      >
        <div className="rotate-[14deg] transform">
          <ButterflySvg size={46} />
        </div>
      </div>

      {/* Butterfly 4: Bottom Right */}
      <div 
        className={`absolute bottom-[8%] right-[8%] sm:right-[16%] transition-all ${
          isFrozen ? '' : 'animate-float-1'
        }`}
        style={{ animationPlayState: isFrozen ? 'paused' : 'running' }}
      >
        <div className="rotate-[-22deg] transform">
          <ButterflySvg size={42} />
        </div>
      </div>

      {/* Decorative Vintage Stamp with Floral Sketch in background */}
      <div 
        className={`absolute top-[24%] left-3 sm:left-[5%] rotate-[-6deg] bg-white/80 backdrop-blur-xs p-2 rounded-xl shadow-md border border-rose-200/80 transition-all ${
          isFrozen ? '' : 'animate-float-2'
        }`}
        style={{ animationPlayState: isFrozen ? 'paused' : 'running' }}
      >
        <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-br from-rose-100 to-pink-200/70 rounded-lg flex flex-col items-center justify-center p-2 text-center border border-dashed border-rose-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-10 h-1.5 bg-rose-400/40 rounded-full mt-2 mb-1" />
          <div className="w-6 h-1 bg-rose-400/30 rounded-full" />
        </div>
      </div>

      {/* Washi Tape Strip at top */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/60 backdrop-blur-xs rotate-[1.5deg] shadow-sm border-y border-dashed border-rose-300/50 rounded-xs pointer-events-none" />

      {/* Crisp SVG Sparkles */}
      <div className="absolute top-[18%] left-[26%] text-amber-200/80 animate-pulse">
        <SparkleSvg size={20} />
      </div>
      <div className="absolute top-[40%] right-[22%] text-amber-200/75 animate-pulse" style={{ animationDelay: '1.2s' }}>
        <SparkleSvg size={16} />
      </div>
      <div className="absolute bottom-[28%] right-[28%] text-rose-200/80 animate-pulse" style={{ animationDelay: '1.8s' }}>
        <SparkleSvg size={22} />
      </div>
      <div className="absolute bottom-[16%] left-[25%] text-amber-200/70 animate-pulse" style={{ animationDelay: '0.8s' }}>
        <SparkleSvg size={14} />
      </div>
    </div>
  );
};
