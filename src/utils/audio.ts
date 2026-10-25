/**
 * Audio manager for the viral screaming chicken prank sound.
 * Handles mobile browser autoplay unlocking, format fallbacks, and single-execution safeguards.
 */

let roosterAudio: HTMLAudioElement | null = null;
let hasPlayed = false;

// Priority: converted MP3 first, then original M4A asset
const AUDIO_SOURCES = [
  '/assets/aistudio/rooster_screaming.mp3',
  '/assets/aistudio/Chicken_on_tree_screaming_viral_sound_effect__Meme_sound_6e4d7d65.m4a',
];

/**
 * Prime and unlock audio during initial user touch/click.
 * This guarantees the browser allows subsequent playback when the prank hits.
 */
export function primeRoosterAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;

  try {
    if (!roosterAudio) {
      roosterAudio = new Audio();
      roosterAudio.preload = 'auto';
      roosterAudio.volume = 0.9;
      roosterAudio.src = AUDIO_SOURCES[0];
      
      // Fallback source onerror
      roosterAudio.onerror = () => {
        if (roosterAudio && roosterAudio.src.endsWith('.mp3')) {
          roosterAudio.src = AUDIO_SOURCES[1];
          roosterAudio.load();
        }
      };

      roosterAudio.load();
    }

    // Attempt silent prime to satisfy mobile webkit user-gesture requirement
    const primePromise = roosterAudio.play();
    if (primePromise !== undefined) {
      primePromise
        .then(() => {
          if (!hasPlayed && roosterAudio) {
            roosterAudio.pause();
            roosterAudio.currentTime = 0;
          }
        })
        .catch(() => {
          // It's normal for immediate silent pause to reject or if muted, keep element ready
        });
    }

    return roosterAudio;
  } catch (err) {
    console.warn('Audio prime error:', err);
    return null;
  }
}

/**
 * Trigger the viral rooster scream sound at the exact punchline moment.
 * Ensures the sound plays strictly once.
 */
export function playRoosterScream(): Promise<boolean> {
  if (hasPlayed) {
    return Promise.resolve(false);
  }

  hasPlayed = true;

  return new Promise((resolve) => {
    try {
      if (!roosterAudio) {
        roosterAudio = new Audio(AUDIO_SOURCES[0]);
        roosterAudio.volume = 0.9;
      }

      roosterAudio.currentTime = 0;
      const playPromise = roosterAudio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            resolve(true);
          })
          .catch((err) => {
            console.warn('Rooster audio play prevented by browser policy:', err);
            // Try backup asset if first one failed
            if (roosterAudio) {
              roosterAudio.src = AUDIO_SOURCES[1];
              roosterAudio.play()
                .then(() => resolve(true))
                .catch(() => resolve(false));
            } else {
              resolve(false);
            }
          });
      } else {
        resolve(true);
      }
    } catch (e) {
      console.warn('Failed to play rooster scream:', e);
      resolve(false);
    }
  });
}

/**
 * Query whether audio has already triggered (safeguard against repeats).
 */
export function isAudioPlayed(): boolean {
  return hasPlayed;
}
