import { writeFileSync } from 'fs';
import { top } from './_p1.mjs';
import { road } from './_p2.mjs';
import { road2 } from './_p3.mjs';

const bottom = `
<section class="slide slide--dark" id="cta">
  <div class="slide__inner fade-up cta">
    <p class="label" style="margin-bottom:2rem">Следующий шаг</p>
    <h2>Давайте раскроем потенциал вашего онлайна</h2>
    <p class="subhead">Предлагаем провести детальный аудит digital&#8209;каналов и&nbsp;подготовить конкретную дорожную карту.</p>
    <a href="https://awg.ru" class="cta-btn" target="_blank" rel="noopener">Связаться с&nbsp;AWG</a>
    <p style="margin-top:1.5rem;font-size:.85rem;color:var(--text-muted)">AWG · Digital&nbsp;&&nbsp;E&#8209;commerce</p>
  </div>
</section>
</div>

<script>
(function(){
  const w=document.getElementById('slidesWrapper'),slides=w.querySelectorAll('.hero,.slide'),total=slides.length;
  let current=0,isAnim=false;
  function goTo(i){if(i<0||i>=total||i===current||isAnim)return;isAnim=true;current=i;w.style.transform='translateY(-'+(current*100)+'vh)';const f=slides[current].querySelector('.fade-up');if(f)f.classList.add('visible');setTimeout(()=>{isAnim=false},700)}
  const f0=slides[0].querySelector('.fade-up');if(f0)f0.classList.add('visible');
  const isMob=()=>window.innerWidth<=900;
  if(isMob()){document.querySelectorAll('.fade-up').forEach(el=>el.classList.add('visible'))}
  let wa=0;
  document.addEventListener('wheel',(e)=>{if(isMob())return;e.preventDefault();wa+=e.deltaY;if(Math.abs(wa)>=60){goTo(current+(wa>0?1:-1));wa=0}},{passive:false});
  document.addEventListener('keydown',(e)=>{if(isMob())return;if(e.key==='ArrowDown'||e.key==='PageDown'||e.key===' '){e.preventDefault();goTo(current+1)}if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();goTo(current-1)}if(e.key==='Home'){e.preventDefault();goTo(0)}if(e.key==='End'){e.preventDefault();goTo(total-1)}});
  const nav=document.createElement('nav');nav.className='slide-nav';
  slides.forEach((s,i)=>{const d=document.createElement('button');d.className='slide-nav__dot'+(i===0?' active':'');d.addEventListener('click',()=>goTo(i));nav.appendChild(d)});
  document.body.appendChild(nav);
  new MutationObserver(()=>{nav.querySelectorAll('.slide-nav__dot').forEach((d,i)=>{d.classList.toggle('active',i===current)})}).observe(w,{attributes:true,attributeFilter:['style']});
})();
</script>
</Base>
`;

writeFileSync('src/pages/index.astro', top + road + road2 + bottom, 'utf-8');
console.log('Done: full rebuild with 9 roadmap slides');
