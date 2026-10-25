import React, { useState, useEffect } from 'react';
import { Gender } from '../utils/prankLogic';

interface FinalScareProps {
  gender: Gender;
}

export const FinalScare: React.FC<FinalScareProps> = ({ gender }) => {
  const isGirl = gender === 'girl';
  const fullMainPhrase = isGirl ? 'قومي ذاكري يا فاشلة' : 'قوم ذاكر يا فاشل';
  const fullSubtitlePhrase = 'يالورا يابكالوريا';

  // Letter by letter state
  const [typedHeading, setTypedHeading] = useState('');
  const [headingDone, setHeadingDone] = useState(false);
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [subtitleDone, setSubtitleDone] = useState(false);

  // Typewriter effect: Type main heading first, then subtitle
  useEffect(() => {
    let headingChar = 0;
    setTypedHeading('');
    setHeadingDone(false);
    setTypedSubtitle('');
    setSubtitleDone(false);

    // Initial brief delay for jumpscare impact before letters start flowing
    const startDelay = setTimeout(() => {
      const headingInterval = setInterval(() => {
        headingChar++;
        setTypedHeading(fullMainPhrase.slice(0, headingChar));

        if (headingChar >= fullMainPhrase.length) {
          clearInterval(headingInterval);
          setHeadingDone(true);

          // After heading finishes, start typing subtitle
          const subDelay = setTimeout(() => {
            let subChar = 0;
            const subInterval = setInterval(() => {
              subChar++;
              setTypedSubtitle(fullSubtitlePhrase.slice(0, subChar));

              if (subChar >= fullSubtitlePhrase.length) {
                clearInterval(subInterval);
                setSubtitleDone(true);
              }
            }, 60);
          }, 300);

          return () => clearTimeout(subDelay);
        }
      }, 55);

      return () => clearInterval(headingInterval);
    }, 200);

    return () => clearTimeout(startDelay);
  }, [fullMainPhrase, fullSubtitlePhrase]);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-[92vh] px-3 sm:px-5 text-center max-w-xl mx-auto py-5 select-none font-['Changa',sans-serif]">
      {/* Deep Blood Red Horror Ambience */}
      <div className="pointer-events-none fixed -inset-24 bg-radial from-red-600/40 via-red-950/40 to-black/90 blur-3xl" />

      {/* Jumpscare Scary Screaming Rooster Card */}
      <div className="relative mb-3 z-30 animate-jumpscare">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl overflow-hidden border-4 border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.95)] bg-black ring-4 ring-red-950/70">
          <img
            src="/assets/aistudio/scary_rooster.jpg"
            alt="صياح الديك المرعب"
            className="w-full h-full object-cover transform scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-red-950/20" />
          
          {/* Subtle audio scream pill at bottom */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white font-extrabold text-[11px] shadow-lg border border-red-400 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
            <span>صياح مستمر 🔊</span>
          </div>
        </div>
      </div>

      {/* Main Scare Card with High-End Glassmorphism */}
      <div className="relative w-full bg-gradient-to-b from-stone-950/95 via-black/95 to-red-950/90 backdrop-blur-2xl rounded-3xl p-5 sm:p-8 shadow-[0_30px_90px_rgba(220,38,38,0.65)] border-2 border-red-600/80 ring-1 ring-amber-500/30 animate-stamp">
        
        {/* Urgent Alert Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 text-red-300 border border-red-600/80 text-xs sm:text-sm font-black tracking-wider mb-5 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>تنبيه نهائي عاجل 🗿</span>
        </div>

        {/* Primary Punchline - Typed Letter by Letter */}
        <div className="min-h-[75px] sm:min-h-[90px] flex items-center justify-center mb-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-[0_4px_24px_rgba(239,68,68,0.9)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-red-500">
              {typedHeading}
            </span>

            {/* Blinking neon cursor while typing heading */}
            {!headingDone && (
              <span className="inline-block w-2 sm:w-3 h-8 sm:h-12 bg-amber-400 mr-1 animate-pulse align-middle rounded-xs shadow-[0_0_15px_rgba(251,191,36,1)]" />
            )}

            {/* Stamp Moyai emoji once heading finishes */}
            {headingDone && (
              <span className="inline-block text-white mr-3 text-4xl sm:text-6xl md:text-7xl align-middle drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] animate-bounce">
                🗿
              </span>
            )}
          </h1>
        </div>

        {/* Dynamic Separator with audio wave vibe */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="h-0.5 w-36 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="absolute w-3 h-3 rounded-full bg-red-500 border-2 border-amber-300 animate-ping" />
        </div>

        {/* Subtitle "يالورا يابكالوريا 🙂" - Typed Letter by Letter */}
        <div className="min-h-[50px] sm:min-h-[65px] flex items-center justify-center mb-6">
          <p className="text-2xl sm:text-4xl md:text-5xl font-black text-amber-300 leading-tight drop-shadow-[0_0_25px_rgba(252,211,77,0.7)]">
            <span>{typedSubtitle}</span>

            {/* Blinking cursor while typing subtitle */}
            {headingDone && !subtitleDone && (
              <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-9 bg-yellow-300 mr-1 animate-pulse align-middle rounded-xs shadow-[0_0_12px_rgba(253,224,71,1)]" />
            )}

            {/* Golden Smiley once subtitle finishes */}
            {subtitleDone && (
              <span className="inline-block mr-2.5 text-3xl sm:text-5xl align-middle drop-shadow-[0_0_16px_rgba(253,224,71,0.9)] animate-pulse">
                🙂
              </span>
            )}
          </p>
        </div>

        {/* Teacher & Spider-Man Meme Grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-red-900/60">
          
          {/* Baccalaureate Teacher Sticker */}
          <div className="flex flex-col items-center bg-stone-900/85 p-3 rounded-2xl border border-amber-500/40 shadow-lg hover:border-amber-400 transition-colors">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] mb-2">
              <img 
                src="/assets/aistudio/user_teacher_sticker.png" 
                alt="أستاذ البكالوريا" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-xs sm:text-sm font-black text-amber-300">أستاذ البكالوريا مستنيك</span>
          </div>

          {/* Sad Spiderman in Despair */}
          <div className="flex flex-col items-center bg-stone-900/85 p-3 rounded-2xl border border-red-500/40 shadow-lg hover:border-red-400 transition-colors">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] mb-2">
              <img 
                src="/assets/aistudio/spiderman_sad.gif" 
                alt="سبايدرمان حزين" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-xs sm:text-sm font-black text-rose-300">حال الطالب دلوقتي</span>
          </div>

        </div>

        {/* Persistent Warning Footer */}
        <div className="mt-5 py-2.5 px-5 rounded-2xl bg-red-950/70 border border-red-700/60 text-red-200 text-xs sm:text-sm font-bold shadow-inner flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>الصوت شغال ومستمر ومش هيسكت إلا لما تقوم تذاكر! 🙂</span>
        </div>
      </div>
    </div>
  );
};
