import { readFileSync, writeFileSync } from 'fs';

let f = readFileSync('src/pages/index.astro', 'utf-8');

// Remove frontmatter and script
f = f.replace(/---[\s\S]*?---/, '');
f = f.replace(/<script>[\s\S]*?<\/script>/, '');
f = f.replace(/<\/?Base>/g, '');
f = f.replace(/<div class="slides-wrapper"[^>]*>/, '');
f = f.replace(/<\/div>\s*$/, '');

// Decode HTML entities
f = f.replace(/&nbsp;/g, ' ');
f = f.replace(/&#8209;/g, '-');
f = f.replace(/&amp;/g, '&');
f = f.replace(/\u00a0/g, ' ');

// Process sections
const sections = f.split(/<\/?section[^>]*>/g).filter(s => s.trim());

let md = '# MAAG + AWG = ОНЛАЙН!\n\n';
md += '*Стратегия развития digital-каналов*\n\n';
md += 'Как превратить сильный офлайн-бренд в полноценную омниканальную платформу.\n\n';
md += 'Подготовлено для команды Новая мода | **AWG** · Digital & E-commerce\n\n';
md += '---\n\n';

function clean(html) {
  let t = html;
  t = t.replace(/<br\s*\/?>/g, '\n');
  t = t.replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**');
  t = t.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');
  t = t.replace(/<[^>]+>/g, '');
  t = t.replace(/\n{3,}/g, '\n\n');
  return t.trim();
}

function extractText(html, tag) {
  const re = new RegExp('<' + tag + '[^>]*>(.*?)</' + tag + '>', 'gs');
  const m = re.exec(html);
  return m ? clean(m[1]) : '';
}

function extractAll(html, tag) {
  const re = new RegExp('<' + tag + '[^>]*>(.*?)</' + tag + '>', 'gs');
  const results = [];
  let m;
  while ((m = re.exec(html)) !== null) results.push(clean(m[1]));
  return results;
}

function extractLis(html) {
  const re = /<li>([\s\S]*?)<\/li>/g;
  const results = [];
  let m;
  while ((m = re.exec(html)) !== null) results.push(clean(m[1]));
  return results;
}

// Skip hero (already written), process rest
for (const sec of sections) {
  const label = extractText(sec, 'p');
  const h2 = extractText(sec, 'h2');
  const h3 = extractText(sec, 'h3');
  
  if (!h2 && !h3 && !label) continue;
  if (sec.includes('hero__content')) continue; // skip hero
  
  if (h2) md += `## ${h2}\n\n`;
  
  // Quote blocks
  const quotes = [];
  const quoteRe = /<div class="quote"[^>]*>([\s\S]*?)<\/div>/g;
  let qm;
  while ((qm = quoteRe.exec(sec)) !== null) quotes.push(clean(qm[1]));
  quotes.forEach(q => { md += `> ${q}\n\n`; });
  
  // Stat cards
  if (sec.includes('stat-card')) {
    const numRe = /<div class="stat-card__number"[^>]*>(.*?)<\/div>/g;
    const lblRe = /<div class="stat-card__label">([\s\S]*?)<\/div>/g;
    const nums = [], lbls = [];
    let nm, lm;
    while ((nm = numRe.exec(sec)) !== null) nums.push(clean(nm[1]));
    while ((lm = lblRe.exec(sec)) !== null) lbls.push(clean(lm[1]));
    for (let i = 0; i < nums.length; i++) {
      md += `- **${nums[i]}** — ${lbls[i] || ''}\n`;
    }
    md += '\n';
  }
  
  // Callout
  if (sec.includes('callout-big')) {
    const cnum = extractText(sec.match(/<div class="callout-big__number">(.*?)<\/div>/s)?.[1] || '', '');
    const clbl = extractText(sec.match(/<div class="callout-big__label">(.*?)<\/div>/s)?.[1] || '', '');
    const cnumClean = clean(sec.match(/<div class="callout-big__number">(.*?)<\/div>/s)?.[1] || '');
    const clblClean = clean(sec.match(/<div class="callout-big__label">(.*?)<\/div>/s)?.[1] || '');
    if (cnumClean) md += `> **${cnumClean}** — ${clblClean}\n\n`;
  }
  
  // Paragraphs (not label, not in stat-card)
  const pRe = /<p(?:\s[^>]*)?>(?!<)([\s\S]*?)<\/p>/g;
  let pm;
  while ((pm = pRe.exec(sec)) !== null) {
    const txt = clean(pm[1]);
    if (txt && !txt.startsWith('AWG') && txt.length > 10 && !sec.includes('hero__')) {
      md += `${txt}\n\n`;
    }
  }
  
  // Lists
  const lists = extractLis(sec);
  if (lists.length > 0) {
    lists.forEach(li => { md += `- ${li}\n`; });
    md += '\n';
  }
  
  // Profit box
  if (sec.includes('profit-box')) {
    const profitSection = sec.match(/<div class="profit-box">([\s\S]*?)<\/div>\s*<\/div>/s);
    if (profitSection) {
      md += '**Профит:**\n\n';
      const profitLis = extractLis(profitSection[1]);
      profitLis.forEach(li => { md += `- ✓ ${li}\n`; });
      md += '\n';
    }
  }
  
  md += '---\n\n';
}

// Clean up multiple separators
md = md.replace(/(---\n\n){2,}/g, '---\n\n');
md = md.replace(/\n{3,}/g, '\n\n');

writeFileSync('presentation.md', md, 'utf-8');
console.log('Done:', md.length, 'chars');
