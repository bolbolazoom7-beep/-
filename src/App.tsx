/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Gender, PrankStage } from './utils/prankLogic';
import { FloatingDecorations } from './components/Butterflies';
import { StartScreen } from './components/StartScreen';
import { PrankProgress } from './components/PrankProgress';
import { FinalScare } from './components/FinalScare';

export default function App() {
  const [stage, setStage] = useState<PrankStage>('start');
  const [gender, setGender] = useState<Gender>('girl');
  const [showFlash, setShowFlash] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse URL params for testing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    const paramGender = params.get('gender') as Gender | null;
    const paramStage = params.get('stage') as PrankStage | null;

    if (paramGender === 'boy' || paramGender === 'girl') {
      setGender(paramGender);
    }

    if (paramStage === 'scare') {
      setStage('scare');
      triggerLoopingSound();
    } else if (autostart === '1') {
      primeAudio();
      setStage('loading');
    }
  }, []);

  const primeAudio = () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.volume = 1.0;
      audioRef.current.loop = true;
      audioRef.current.load();
      // Unlock mobile WebKit / Chromium autoplay restriction
      const p = audioRef.current.play();
      if (p !== undefined) {
        p.then(() => {
          if (audioRef.current && !soundPlayed) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }).catch(() => {
          // Expected during silent unlocking
        });
      }
    } catch {
      // Non-blocking
    }
  };

  const triggerLoopingSound = () => {
    setSoundPlayed(true);

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        audioRef.current.loop = true; // Non-stop infinite loop as requested!
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio play notice:', err);
          });
        }
      } catch (err) {
        console.warn('Audio play exception:', err);
      }
    }
  };

  const handleSelectGender = (selectedGender: Gender) => {
    primeAudio();
    setGender(selectedGender);
    setStage('loading');
  };

  const handleLoadingComplete = () => {
    // 1. Sudden stop and freeze
    setStage('freeze');

    // 2. Pause in tension (~850ms), then unleash the jumpscare & endless rooster sound
    setTimeout(() => {
      setShowFlash(true);
      setStage('scare');
      triggerLoopingSound();

      setTimeout(() => {
        setShowFlash(false);
      }, 350);
    }, 850);
  };

  const getBackgroundClass = () => {
    switch (stage) {
      case 'start':
      case 'loading':
        return 'bg-gradient-to-b from-[#ff8fa3] via-[#ff4d6d] to-[#c9184a] text-stone-900';
      case 'freeze':
        return 'bg-gradient-to-b from-[#4a0817] via-[#2d030c] to-[#0f0003] text-stone-100 transition-colors duration-700';
      case 'scare':
        return 'bg-gradient-to-b from-[#220006] via-[#100003] to-[#050001] text-white animate-blood-pulse';
      default:
        return 'bg-rose-500 text-stone-900';
    }
  };

  const isFrozen = stage === 'freeze' || stage === 'scare';
  const isScared = stage === 'scare';

  return (
    <main
      data-testid="prank-container"
      data-stage={stage}
      data-sound-played={soundPlayed ? 'true' : 'false'}
      className={`relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto transition-colors duration-500 select-none ${getBackgroundClass()} ${
        isScared ? 'animate-shake' : ''
      }`}
      dir="rtl"
    >
      {/* Hidden DOM Audio element for viral rooster screaming configured to LOOP infinitely */}
      <audio
        id="rooster-audio"
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        onEnded={() => {
          // Extra safeguard: replay immediately if browser ignores loop attribute
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
      >
        <source src="/assets/aistudio/rooster_screaming.mp3" type="audio/mpeg" />
        <source src="/assets/aistudio/Chicken_on_tree_screaming_viral_sound_effect__Meme_sound_6e4d7d65.m4a" type="audio/mp4" />
      </audio>

      {/* Visual Flash effect overlay */}
      {showFlash && (
        <div className="fixed inset-0 z-50 bg-red-600 animate-flash pointer-events-none" />
      )}

      {/* Decorative Yellow Butterflies & Vintage Stickers */}
      <FloatingDecorations isFrozen={isFrozen} isScared={isScared} />

      {/* Main Content Viewports */}
      <div className="relative z-10 w-full py-4">
        {stage === 'start' && (
          <StartScreen onSelectGender={handleSelectGender} />
        )}

        {stage === 'loading' && (
          <PrankProgress
            gender={gender}
            onComplete={handleLoadingComplete}
          />
        )}

        {(stage === 'freeze' || stage === 'scare') && (
          <FinalScare gender={gender} />
        )}
      </div>
    </main>
  );
}
