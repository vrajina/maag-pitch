import { readFileSync, writeFileSync } from 'fs';
let f = readFileSync('src/pages/index.astro', 'utf-8');
f = f.replace(
  'У\u00a0лидеров рынка она превышает 25%.</p>',
  'У\u00a0лидеров рынка она превышает 25%. Потенциал упущенной выручки на\u00a0собственном онлайне\u00a0— <strong style="color:var(--accent)">от\u00a05\u00a0млрд\u00a0₽</strong> в\u00a0год.</p>'
);
writeFileSync('src/pages/index.astro', f);
console.log('done');
