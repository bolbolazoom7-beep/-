import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  GIRL_MESSAGES, 
  BOY_MESSAGES, 
  getMessagesForGender, 
  getFinalHeading, 
  FINAL_SUBTITLE,
  validateEmojiRule 
} from './prankLogic.js';

test('Girl message sequence matches requirements exactly', () => {
  const messages = getMessagesForGender('girl');
  assert.equal(messages.length, 5);
  assert.equal(messages[0], 'جاري فتح ملفك الدراسي...');
  assert.equal(messages[1], 'جاري البحث عن آخر مرة ذاكرتي فيها...');
  assert.equal(messages[2], 'جاري الاتصال بالمخ...');
  assert.equal(messages[3], 'حدث خطأ غير متوقع...');
  assert.equal(messages[4], 'تم اكتشاف مستوى خطير من التسويف!');
});

test('Boy message sequence matches requirements exactly', () => {
  const messages = getMessagesForGender('boy');
  assert.equal(messages.length, 6);
  assert.equal(messages[0], 'جاري فحص الحالة الدراسية...');
  assert.equal(messages[1], 'جاري البحث عن الكتاب...');
  assert.equal(messages[2], 'آخر ظهور للكتاب: من بداية السنة');
  assert.equal(messages[3], 'جاري الاتصال بالمخ...');
  assert.equal(messages[4], 'المخ لا يستجيب حاليًا');
  assert.equal(messages[5], 'تحذير: مستوى التسويف تجاوز الحدود!');
});

test('Final punchline messages and subtitle match exact strings with single 🗿 emoji', () => {
  const girlFinal = getFinalHeading('girl');
  const boyFinal = getFinalHeading('boy');

  assert.equal(girlFinal, 'قومي ذاكري يا فاشلة 🗿');
  assert.equal(boyFinal, 'قوم ذاكر يا فاشل 🗿');
  assert.equal(FINAL_SUBTITLE, 'يالورا يابكالوريا 🙂');

  // Verify emoji rules: only 🗿 allowed in all text messages
  for (const msg of GIRL_MESSAGES) {
    assert.equal(validateEmojiRule(msg), true, `Prohibited emoji found in girl message: ${msg}`);
  }
  for (const msg of BOY_MESSAGES) {
    assert.equal(validateEmojiRule(msg), true, `Prohibited emoji found in boy message: ${msg}`);
  }
  assert.equal(validateEmojiRule(girlFinal), true);
  assert.equal(validateEmojiRule(boyFinal), true);
  assert.equal(validateEmojiRule(FINAL_SUBTITLE), true);

  // Negative test: verify emojis like ❤️ or 😂 are caught
  assert.equal(validateEmojiRule('قوم ذاكر يا فاشل 😂'), false);
  assert.equal(validateEmojiRule('رسالة حب ❤️'), false);
});
