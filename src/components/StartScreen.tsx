import React from 'react';
import { 
  Gender, 
  INITIAL_TITLE, 
  INITIAL_SUBTITLE, 
  GIRL_BUTTON_LABEL, 
  BOY_BUTTON_LABEL 
} from '../utils/prankLogic';

interface StartScreenProps {
  onSelectGender: (gender: Gender) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onSelectGender }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 text-center max-w-lg mx-auto">
      {/* Central Envelope / Sweet Card */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-9 shadow-[0_20px_50px_rgba(159,18,57,0.25)] border border-white/70 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(159,18,57,0.3)]">
        
        {/* Soft decorative badge with SVG letter icon */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs sm:text-sm font-bold tracking-wide mb-6 border border-rose-200/80 shadow-xs">
          <svg className="w-4 h-4 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>رسالة خاصة لك</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-rose-950 mb-3 leading-snug tracking-tight">
          {INITIAL_TITLE}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-rose-800/90 font-medium mb-7">
          {INITIAL_SUBTITLE}
        </p>

        {/* Selection Cards with User Meme Stickers */}
        <div className="grid grid-cols-2 gap-4 w-full pt-1">
          
          {/* Girl Card with sticker */}
          <button
            type="button"
            onClick={() => onSelectGender('girl')}
            className="group flex flex-col items-center p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-rose-50/80 to-white hover:to-rose-50/90 border-2 border-rose-200 hover:border-rose-400 shadow-[0_8px_20px_rgba(190,18,60,0.12)] hover:shadow-[0_12px_28px_rgba(190,18,60,0.22)] transition-all duration-300 transform active:scale-95 cursor-pointer"
            aria-label="اختيار أنا بنت"
          >
            {/* Cutout sticker */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full p-1 bg-white shadow-md border-2 border-rose-300 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/assets/aistudio/user_woman_sticker.png"
                alt="بنت"
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-rose-500 border-2 border-white" />
            </div>

            <span className="py-2 px-5 rounded-full bg-rose-600 text-white font-extrabold text-base sm:text-lg shadow-sm group-hover:bg-rose-700 transition-colors w-full text-center">
              {GIRL_BUTTON_LABEL}
            </span>
          </button>

          {/* Boy Card with sticker */}
          <button
            type="button"
            onClick={() => onSelectGender('boy')}
            className="group flex flex-col items-center p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-rose-50/80 to-white hover:to-rose-50/90 border-2 border-rose-200 hover:border-rose-400 shadow-[0_8px_20px_rgba(190,18,60,0.12)] hover:shadow-[0_12px_28px_rgba(190,18,60,0.22)] transition-all duration-300 transform active:scale-95 cursor-pointer"
            aria-label="اختيار أنا ولد"
          >
            {/* Cutout sticker */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full p-1 bg-white shadow-md border-2 border-rose-300 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/assets/aistudio/user_boy_sticker.png"
                alt="ولد"
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
            </div>

            <span className="py-2 px-5 rounded-full bg-rose-600 text-white font-extrabold text-base sm:text-lg shadow-sm group-hover:bg-rose-700 transition-colors w-full text-center">
              {BOY_BUTTON_LABEL}
            </span>
          </button>

        </div>

        {/* Small subtle footnote */}
        <p className="mt-6 text-xs text-rose-400/80 font-medium">
          اضغط للفتح فورًا
        </p>
      </div>
    </div>
  );
};
