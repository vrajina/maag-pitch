import { readFileSync, writeFileSync } from 'fs';
let f = readFileSync('src/pages/index.astro', 'utf-8');
f = f.replace('~5\u00a0млрд\u00a0₽', '4,5+\u00a0млрд\u00a0₽');
writeFileSync('src/pages/index.astro', f);
console.log('done');
