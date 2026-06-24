import { readFileSync, writeFileSync } from 'fs';

// 1. Add CSS for big callout box
let css = readFileSync('src/styles/global.css', 'utf-8');
if (!css.includes('callout-big')) {
  css += `
/* Big callout */
.callout-big{margin-top:2rem;padding:2rem 2.5rem;border-radius:16px;background:linear-gradient(135deg,rgba(212,163,115,.15),rgba(212,163,115,.05));border:1px solid rgba(212,163,115,.3);text-align:center}
.callout-big__number{font-family:var(--font-display);font-size:3.5rem;font-weight:800;color:var(--accent);line-height:1;margin-bottom:.5rem}
.callout-big__label{font-size:1rem;color:var(--text-secondary);line-height:1.5}
@media(max-width:900px){.callout-big__number{font-size:2.5rem}.callout-big{padding:1.5rem}}
`;
  writeFileSync('src/styles/global.css', css);
  console.log('CSS updated');
}

// 2. Replace inline text with a separate callout block
let f = readFileSync('src/pages/index.astro', 'utf-8');

// Remove the revenue part from the paragraph text
f = f.replace(
  /Потенциал упущенной выручки на.собственном онлайне.— <strong style="color:var\(--accent\)">от.5.млрд.₽<\/strong> в.год\./,
  ''
);

// Add callout block after the benchmark paragraph (before </div> closing the left column)
f = f.replace(
  'она превышает 25%.</p>\n      </div>\n      <div>\n        <ul class="risk-list">',
  `она превышает 25%.</p>
        <div class="callout-big">
          <div class="callout-big__number">~5\u00a0млрд\u00a0₽</div>
          <div class="callout-big__label">потенциал упущенной выручки на\u00a0собственном онлайне ежегодно</div>
        </div>
      </div>
      <div>
        <ul class="risk-list">`
);

writeFileSync('src/pages/index.astro', f);
console.log('HTML updated');
