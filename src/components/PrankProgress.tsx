import React, { useState, useEffect, useRef } from 'react';
import { Gender, getMessagesForGender } from '../utils/prankLogic';

interface PrankProgressProps {
  gender: Gender;
  onComplete: () => void;
}

export const PrankProgress: React.FC<PrankProgressProps> = ({ gender, onComplete }) => {
  const messages = getMessagesForGender(gender);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [completedMessages, setCompletedMessages] = useState<string[]>([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const fullText = messages[currentIdx];
    if (!fullText) return;

    // Typewriter interval
    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Pause to let the user read the funny message
        const readDelay = currentIdx === messages.length - 1 ? 1600 : 1300;
        const nextTimer = setTimeout(() => {
          if (currentIdx < messages.length - 1) {
            setCompletedMessages((prev) => [...prev, fullText]);
            setCurrentIdx((prev) => prev + 1);
          } else {
            // All messages complete! Transition to freeze phase
            onCompleteRef.current();
          }
        }, readDelay);

        return () => clearTimeout(nextTimer);
      }
    }, 45);

    return () => {
      clearInterval(typeInterval);
    };
  }, [currentIdx, messages]);

  const progressPercentage = Math.round(((currentIdx + (isTyping ? 0.4 : 1)) / messages.length) * 100);

  // Dynamic reaction sticker based on message progression
  const renderReactionSticker = () => {
    if (gender === 'girl') {
      if (currentIdx >= 3) {
        // High procrastination alert - shocked woman
        return (
          <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-2xl border border-rose-200 animate-bounce">
            <img 
              src="/assets/aistudio/user_woman_sticker.png" 
              alt="صدمة" 
              className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover" 
            />
            <div className="text-right">
              <span className="text-xs font-bold text-rose-600 block">حالة الطوارئ الدراسية</span>
              <span className="text-sm font-black text-rose-950">صدمة غير متوقعة!</span>
            </div>
          </div>
        );
      } else {
        // Judging cat checking study records
        return (
          <div className="flex items-center gap-3 p-2.5 bg-rose-50/70 rounded-2xl border border-rose-100">
            <img 
              src="/assets/aistudio/sticker_cat.png" 
              alt="قطة تراقب" 
              className="w-12 h-12 rounded-xl border border-white shadow-sm object-cover" 
            />
            <div className="text-right">
              <span className="text-xs font-semibold text-rose-700">مساعد التفتيش الأكاديمي</span>
              <span className="text-xs text-rose-500 block">جاري مطابقة درجات التسويف...</span>
            </div>
          </div>
        );
      }
    } else {
      // Boy journey
      if (currentIdx >= 4) {
        // Spider-Man in despair
        return (
          <div className="flex items-center gap-3 p-3 bg-stone-900 text-white rounded-2xl border border-rose-400 shadow-md">
            <img 
              src="/assets/aistudio/spiderman_sad.gif" 
              alt="سبايدرمان حزين" 
              className="w-14 h-14 rounded-xl border-2 border-rose-500 shadow-md object-cover" 
            />
            <div className="text-right">
              <span className="text-xs font-bold text-red-400 block">المخ خارج التغطية</span>
              <span className="text-xs text-rose-200">فقدان الأمل في المنهج حاليًا</span>
            </div>
          </div>
        );
      } else if (currentIdx >= 2) {
        // Judging cat
        return (
          <div className="flex items-center gap-3 p-2.5 bg-rose-50 rounded-2xl border border-rose-200">
            <img 
              src="/assets/aistudio/sticker_cat.png" 
              alt="قطة تحكم بصمت" 
              className="w-12 h-12 rounded-xl border border-white shadow-sm object-cover" 
            />
            <div className="text-right">
              <span className="text-xs font-bold text-rose-700">الكتاب مفقود</span>
              <span className="text-xs text-rose-500">نظرة استنكار على حالة المذاكرة</span>
            </div>
          </div>
        );
      } else {
        // Confident kid at the beginning
        return (
          <div className="flex items-center gap-3 p-2.5 bg-rose-50/70 rounded-2xl border border-rose-100">
            <img 
              src="/assets/aistudio/user_boy_sticker.png" 
              alt="الولد واثق" 
              className="w-12 h-12 rounded-full border border-white shadow-sm object-cover" 
            />
            <div className="text-right">
              <span className="text-xs font-semibold text-rose-700">الثقة في البداية</span>
              <span className="text-xs text-rose-500">فاكر نفسه مذاكر كل المواد...</span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 max-w-lg mx-auto text-right">
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(159,18,57,0.25)] border border-rose-100">
        
        {/* Progress header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-rose-800">
              {gender === 'girl' ? 'فحص السجل الدراسي للبنت' : 'فحص السجل الدراسي للولد'}
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            {progressPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden mb-5">
          <div 
            className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Interactive Helper Reaction Card */}
        <div className="mb-4">
          {renderReactionSticker()}
        </div>

        {/* Log of completed messages */}
        <div className="space-y-2 mb-4 max-h-36 overflow-y-auto pr-1">
          {completedMessages.map((msg, index) => (
            <div 
              key={index} 
              className="text-xs sm:text-sm text-rose-900/60 font-medium py-1 px-3 bg-rose-50/70 rounded-xl border border-rose-100/50 flex items-center justify-between"
            >
              <span>{msg}</span>
              <span className="text-rose-400 text-xs">✓</span>
            </div>
          ))}
        </div>

        {/* Current Active Typewriter Message */}
        <div className="min-h-[72px] bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-2xl border-2 border-rose-200/80 flex items-center shadow-inner">
          <p className="text-base sm:text-xl font-black text-rose-950 leading-relaxed w-full">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-rose-600 mr-1 animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* Subtle status indicator */}
        <div className="mt-4 text-center">
          <p className="text-xs text-rose-400/80 font-medium">
            يرجى الانتظار حتى اكتمال المعالجة...
          </p>
        </div>
      </div>
    </div>
  );
};
