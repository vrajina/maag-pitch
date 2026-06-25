import { readFileSync, writeFileSync } from 'fs';
let md = readFileSync('presentation.md', 'utf-8');

// Remove duplicate profit items that appear as regular list items before the Профит block
// Pattern: the same items appear twice - once as regular list items, once with ✓
const sections = md.split('---');
const cleaned = sections.map(sec => {
  if (!sec.includes('**Профит:**')) return sec;
  
  // Extract profit items (lines starting with "- ✓")
  const profitLines = sec.match(/- ✓ .+/g) || [];
  const profitTexts = profitLines.map(l => l.replace('- ✓ ', '').trim());
  
  // Remove regular list items that match profit items
  let lines = sec.split('\n');
  lines = lines.filter(line => {
    if (!line.startsWith('- ') || line.startsWith('- ✓') || line.startsWith('- **')) return true;
    const text = line.replace(/^- /, '').trim();
    return !profitTexts.includes(text);
  });
  
  return lines.join('\n');
});

md = cleaned.join('---');

// Also clean up "label" text that leaked through (like "Текущая позиция", "Но есть нюанс" etc)
// These are section labels, not content - remove standalone label lines
const labelPatterns = [
  /^Текущая позиция$/m,
  /^Но есть нюанс$/m,
  /^Кейс из жизни$/m,
  /^Стратегический риск$/m,
  /^Что работает$/m,
  /^Дорожная карта$/m,
  /^Следующий шаг$/m,
  /^Вопросы, которые стоит задать$/m,
];
labelPatterns.forEach(p => { md = md.replace(p, ''); });

// Clean extra blank lines
md = md.replace(/\n{3,}/g, '\n\n');

writeFileSync('presentation.md', md, 'utf-8');
console.log('Cleaned');
