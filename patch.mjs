import { readFileSync, writeFileSync } from 'fs';
let f = readFileSync('src/pages/index.astro', 'utf-8');
f = f.replace(
  '<h1>MAAG <span>×</span> ОНЛАЙН</h1>',
  '<h1>MAAG <span>+</span> AWG <span>=</span><br>ОНЛАЙН!</h1>'
);
writeFileSync('src/pages/index.astro', f);
console.log('done');
