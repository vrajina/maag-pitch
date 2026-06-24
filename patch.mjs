import { readFileSync, writeFileSync } from 'fs';
let f = readFileSync('src/pages/index.astro', 'utf-8');

// Replace all variations of "33 млрд"
f = f.replace(/33\u00a0млрд/g, '31+\u00a0млрд');
f = f.replace(/33&nbsp;млрд/g, '31+&nbsp;млрд');

writeFileSync('src/pages/index.astro', f);

// Count replacements for verification
const count = (f.match(/31\+/g) || []).length;
console.log(`Done: ${count} occurrences of "31+" in file`);
