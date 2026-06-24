import { readFileSync, writeFileSync } from 'fs';

let f = readFileSync('src/pages/index.astro', 'utf-8');

// 1. Extract roadmap slides by their IDs
function extractSection(html, id) {
  const start = html.indexOf(`id="${id}"`);
  const sectionStart = html.lastIndexOf('<section', start);
  const afterStart = html.indexOf('</section>', start);
  const sectionEnd = afterStart + '</section>'.length;
  return html.substring(sectionStart, sectionEnd);
}

const road01 = extractSection(f, 'road-01');
const road02 = extractSection(f, 'road-02');
const road03 = extractSection(f, 'road-03');
const road04 = extractSection(f, 'road-04');
const road05 = extractSection(f, 'road-05');
const road06 = extractSection(f, 'road-06');
const road07 = extractSection(f, 'road-07');
const road08 = extractSection(f, 'road-08');
const road09 = extractSection(f, 'road-09');

// New order: 01-Conv, 05-Delivery, 02-SEO, 03-Comm, 04-App, 06-Reco, 07-Loyalty, 08-Blog, 09-Infra
const newOrder = [road01, road05, road02, road03, road04, road06, road07, road08, road09];

// Remove all old road sections
let clean = f;
[road01,road02,road03,road04,road05,road06,road07,road08,road09].forEach(s => {
  clean = clean.replace(s, '');
});

// Find where to insert (after road-intro section)
const introEnd = clean.indexOf('</section>', clean.indexOf('id="road-intro"')) + '</section>'.length;

// Build new roadmap with correct numbering
let roadmapHtml = '';
newOrder.forEach((section, i) => {
  let s = section;
  // Update label number
  s = s.replace(/\d{2} \/ 09/, String(i+1).padStart(2,'0') + ' / 09');
  // Update id
  s = s.replace(/id="road-\d{2}"/, `id="road-${String(i+1).padStart(2,'0')}"`);
  roadmapHtml += '\n\n' + s;
});

clean = clean.substring(0, introEnd) + roadmapHtml + '\n\n' + clean.substring(introEnd).replace(/^\s*\n+/, '\n');

// 2. Update road-intro: add parallelization note
clean = clean.replace(
  '9 направлений в&nbsp;порядке приоритета.',
  '9 направлений в&nbsp;порядке приоритета. Многие этапы можно запараллелить.'
);

// 3. Add app integration note to Recommendations slide
clean = clean.replace(
  'Возможность интеграции рекомендаций в&nbsp;офлайн&#8209;точки (POS, digital&#8209;экраны).',
  'Возможность интеграции рекомендаций в&nbsp;офлайн&#8209;точки (POS, digital&#8209;экраны).</li>\n          <li>Особенно эффективна интеграция рекомендаций в&nbsp;мобильное приложение — персонализация в&nbsp;реальном времени, push с&nbsp;подборками, рост конверсии.'
);

// 4. Update nav labels in JS
clean = clean.replace(
  "const names=['MAAG × Онлайн','Позиция силы','Нюанс','Маркетплейсы','Контент','Дорожная карта','01 Web-витрина','02 SEO','03 Коммуникации','04 Приложение','05 Доставка','06 Рекомендации','07 Лояльность','08 Блог','09 Инфраструктура','Контакт'];",
  "const names=['MAAG × Онлайн','Позиция силы','Нюанс','Маркетплейсы','Контент','Дорожная карта','01 Web-витрина','02 Доставка','03 SEO','04 Коммуникации','05 Приложение','06 Рекомендации','07 Лояльность','08 Блог','09 Инфраструктура','Контакт'];"
);

// 5. Russian typography pass
function typo(text) {
  // Non-breaking space before em-dash
  text = text.replace(/ —/g, '\u00a0—');
  // Non-breaking space after em-dash  
  text = text.replace(/— /g, '—\u00a0');
  // Non-breaking space before short words (prepositions)
  text = text.replace(/ (в|и|к|с|у|о|а|на|не|за|от|из|по|до|но|то|ни) /gi, (m, w) => ' ' + w + '\u00a0');
  // Non-breaking space before % and ₽
  text = text.replace(/ ([%₽])/g, '\u00a0$1');
  // Proper quotes
  text = text.replace(/"([^"]+)"/g, '«$1»');
  return text;
}

// Apply typo only to HTML content, not to script or attributes
const scriptStart = clean.indexOf('<script>');
let htmlPart = clean.substring(0, scriptStart);
const scriptPart = clean.substring(scriptStart);

// Apply typography but protect HTML tags and attributes
htmlPart = htmlPart.replace(/>([^<]+)</g, (match, content) => {
  return '>' + typo(content) + '<';
});

clean = htmlPart + scriptPart;

writeFileSync('src/pages/index.astro', clean, 'utf-8');
console.log('Done: reordered, typography, parallelization note, reco-app integration');
