import { readFileSync, writeFileSync } from 'fs';

let f = readFileSync('src/pages/index.astro', 'utf-8');

// Add periods before closing </li>, </p>, </div> where text doesn't end with punctuation
// Skip headings (h1, h2, h3), labels, script block

// Process </li> — add period if last char before tag isn't punctuation
f = f.replace(/([^.!?:…»;—\d%])\s*<\/li>/g, '$1.</li>');

// Process </p> — but skip if inside <script> or is a label/eyebrow
// We'll do it line by line to be safe
const lines = f.split('\n');
const result = [];
let inScript = false;

for (const line of lines) {
  let l = line;
  if (l.includes('<script>')) inScript = true;
  if (l.includes('</script>')) inScript = false;
  
  if (!inScript) {
    // Skip headings and labels
    const isHeading = /<h[123]/.test(l);
    const isLabel = /class="label"/.test(l) || /class="hero__eyebrow"/.test(l);
    const isCounter = /class="carousel__counter"/.test(l);
    const isButton = /<button/.test(l) || /<a /.test(l) || /class="cta-btn"/.test(l);
    const isAuthor = /class="hero__author"/.test(l);
    
    if (!isHeading && !isLabel && !isCounter && !isButton && !isAuthor) {
      // Add period before </p> if missing punctuation
      l = l.replace(/([^.!?:…»;—\d%<])\s*<\/p>/g, '$1.</p>');
      
      // Add period before closing profit-box__title div (skip — it's a label)
      // Add period before closing growth-card__highlight, stat-card__label, etc
      // but only for text-content divs, not structural ones
    }
  }
  
  result.push(l);
}

writeFileSync('src/pages/index.astro', result.join('\n'), 'utf-8');
console.log('Done: periods added');
