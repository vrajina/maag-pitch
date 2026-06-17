import { readFileSync, writeFileSync } from 'fs';
const file = 'src/pages/index.astro';
let t = readFileSync(file, 'utf-8');

// Non-breaking hyphen for compound words (already partially done, catch remaining)
const compounds = ['e-commerce','e-com','SaaS-решения','SaaS-модели','cross-sell','SEO-оптимизация','SEO-трафик','UX-доработки','UX-аудит','OMS-систем','AI-driven','fashion-ритейлер','онлайн-заказ','онлайн-платформ','онлайн-канал','Click & Collect'];
// Already handled most, skip

// nbsp before — (em dash) that aren't already &nbsp;—
t = t.replace(/([^\s;])(\s)—/g, (m, before, sp) => {
  if (sp === '\u00a0' || m.includes('&nbsp;')) return m;
  return before + '&nbsp;—';
});

// nbsp after short prepositions: в, на, к, с, и, о, у, а, но, из, не, по, за, от, до
// Only when followed by a regular space and a word char
const preps = ['в','на','к','с','и','о','у','а','но','из','не','по','за','от','до','ни','на','при'];
for (const p of preps) {
  // After > or space, the preposition, then a normal space
  const re = new RegExp(`(>|\\s)(${p}) (?=[а-яёА-ЯЁa-zA-Z0-9«"\\(])`, 'g');
  t = t.replace(re, `$1$2&nbsp;`);
}

// nbsp before ₽
t = t.replace(/ ₽/g, '&nbsp;₽');

// nbsp before %  (but not in CSS or attributes)
// Only in visible text content
t = t.replace(/(\d) ?%/g, '$1%'); // already fine, % sticks to number

// Non-breaking space between number and unit words
t = t.replace(/(\d) (млрд|млн|тыс|лет|год[а-я]*|месяц[а-я]*|раз[а-я]*)/g, '$1&nbsp;$2');

// Fix double &nbsp;&nbsp;
t = t.replace(/&nbsp;&nbsp;/g, '&nbsp;');

// Fix &nbsp; that got into HTML attributes
t = t.replace(/(style="[^"]*?)&nbsp;/g, '$1 ');
t = t.replace(/(class="[^"]*?)&nbsp;/g, '$1 ');
t = t.replace(/(id="[^"]*?)&nbsp;/g, '$1 ');
t = t.replace(/(data-[^"]*?"[^"]*?)&nbsp;/g, '$1 ');

writeFileSync(file, t, 'utf-8');
console.log('Typography applied.');
