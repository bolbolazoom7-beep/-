export type Gender = 'girl' | 'boy';

export type PrankStage = 
  | 'start'      // Start screen with buttons
  | 'loading'    // Typewriter message progression
  | 'freeze'     // Sudden ominous pause before the jump
  | 'scare';     // Sound triggers, big punchline zooms in

export const GIRL_MESSAGES: readonly string[] = [
  'جاري فتح ملفك الدراسي...',
  'جاري البحث عن آخر مرة ذاكرتي فيها...',
  'جاري الاتصال بالمخ...',
  'حدث خطأ غير متوقع...',
  'تم اكتشاف مستوى خطير من التسويف!',
] as const;

export const BOY_MESSAGES: readonly string[] = [
  'جاري فحص الحالة الدراسية...',
  'جاري البحث عن الكتاب...',
  'آخر ظهور للكتاب: من بداية السنة',
  'جاري الاتصال بالمخ...',
  'المخ لا يستجيب حاليًا',
  'تحذير: مستوى التسويف تجاوز الحدود!',
] as const;

export function getMessagesForGender(gender: Gender): readonly string[] {
  return gender === 'girl' ? GIRL_MESSAGES : BOY_MESSAGES;
}

export function getFinalHeading(gender: Gender): string {
  return gender === 'girl' 
    ? 'قومي ذاكري يا فاشلة 🗿' 
    : 'قوم ذاكر يا فاشل 🗿';
}

export const FINAL_SUBTITLE = 'يالورا يابكالوريا 🙂';

export const INITIAL_TITLE = 'عندك رسالة مهمة جدًا...';
export const INITIAL_SUBTITLE = 'بس الأول، اختار أنت مين';
export const GIRL_BUTTON_LABEL = 'أنا بنت';
export const BOY_BUTTON_LABEL = 'أنا ولد';

/**
 * Validates that text content strictly obeys the emoji rule:
 * Permitted emojis in messages: 🗿 and 🙂 (requested in final subtitle).
 * Returns true if valid, false if prohibited emojis are detected.
 */
export function validateEmojiRule(text: string): boolean {
  // Match emoji ranges except U+1F5FF (🗿 Moyai) and U+1F642 (🙂 Slightly Smiling Face)
  const emojiRegex = /(?![🗿🙂])[\u{1F300}-\u{1F5FE}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return !emojiRegex.test(text);
}
