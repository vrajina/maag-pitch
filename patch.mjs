import { readFileSync, writeFileSync } from 'fs';
let f = readFileSync('src/pages/index.astro', 'utf-8');
f = f.replace(
  'нераскрытый потенциал</strong>.</p>\n      </div>',
  'нераскрытый потенциал</strong>.</p>\n        <p style="margin-top:1rem;font-size:1rem;color:#555;line-height:1.7">Для fashion&#8209;ретейлеров с&nbsp;развитым офлайном норма доли собственного онлайна\u00a0— <strong style="color:var(--accent)">от&nbsp;15%</strong> и&nbsp;выше. У&nbsp;лидеров рынка она превышает 25%.</p>\n      </div>'
);
writeFileSync('src/pages/index.astro', f);
console.log('done');
