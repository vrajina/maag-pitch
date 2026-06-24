import { readFileSync, writeFileSync } from 'fs';
let f = readFileSync('src/pages/index.astro', 'utf-8');

// 1. Insert Strategy slide before road-intro
const strategy = `<section class="slide slide--dark" id="strategy">
  <div class="slide__inner fade-up">
    <p class="label">Стратегия</p><div class="divider"></div>
    <h2 style="margin-bottom:2rem">Четыре шага к\u00a0результату</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card__number" style="font-size:1.5rem">Шаг\u00a01</div>
        <div class="stat-card__label"><strong>Подготовка</strong><br>Конверсионные доработки web\u2011витрин, доставка, SEO, запуск мобильного приложения.</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__number" style="font-size:1.5rem">Шаг\u00a02</div>
        <div class="stat-card__label"><strong>Консолидация</strong><br>Собрать всех лояльных клиентов в\u00a0единую экосистему: приложение, коммуникации, рекомендации, программа лояльности.</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__number" style="font-size:1.5rem">Шаг\u00a03</div>
        <div class="stat-card__label"><strong>Работа с\u00a0базой</strong><br>Привлечение, возврат, удержание. Персональные предложения, триггерные коммуникации, увеличение LTV.</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__number" style="font-size:1.5rem">Шаг\u00a04</div>
        <div class="stat-card__label"><strong>Экспансия</strong><br>Полномасштабные инвестиции в\u00a0трафик и\u00a0маркетинг. Платформа готова\u00a0— пора масштабировать.</div>
      </div>
    </div>
  </div>
</section>

`;

f = f.replace('<section class="slide slide--black" id="road-intro">', strategy + '<section class="slide slide--black" id="road-intro">');

// 2. Update road-intro: 9 → 10 directions
f = f.replace('9 направлений', '10 направлений');

// 3. Insert marketing slide (road-10) after road-09, before CTA
const marketing = `<section class="slide slide--dark" id="road-10">
  <div class="slide__inner fade-up">
    <p class="label">10 / 10</p><div class="divider"></div>
    <h2 style="margin-bottom:1.5rem">Маркетинг и\u00a0трафик</h2>
    <div class="cols">
      <div>
        <ul class="benefit-list">
          <li>Контекстная реклама: Яндекс\u00a0Директ, брендовые и\u00a0товарные кампании.</li>
          <li>Таргетированная реклама в\u00a0социальных сетях: VK, Telegram\u00a0Ads.</li>
          <li>Мобильный маркетинг: продвижение приложения, ретаргетинг, push\u2011кампании.</li>
          <li>Ретаргетинг и\u00a0look-alike аудитории на\u00a0базе CRM\u2011данных.</li>
          <li>Influence-маркетинг и\u00a0коллаборации.</li>
          <li>Performance на\u00a0всех этапах воронки: охват \u2192 вовлечение \u2192 конверсия \u2192 retention.</li>
        </ul>
      </div>
      <div>
        <div class="profit-box">
          <div class="profit-box__title">Профит</div>
          <ul class="profit-list">
            <li>Платформа готова\u00a0— каждый вложенный рубль работает <strong>в\u00a0разы эффективнее</strong>.</li>
            <li>Полный контроль unit\u2011экономики.</li>
            <li>Данные CRM + рекомендации = точечный таргетинг.</li>
            <li>Масштабирование без потери эффективности.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

`;

f = f.replace('\n<section class="slide slide--dark" id="cta">', '\n' + marketing + '<section class="slide slide--dark" id="cta">');

// 4. Update all roadmap numbering from /09 to /10
f = f.replace(/\/ 09/g, '/ 10');

// 5. Update nav labels
f = f.replace(
  "const names=['MAAG × Онлайн','Позиция силы','Но есть нюанс','Кейс','Маркетплейсы','Сила в контенте','Дорожная карта',",
  "const names=['MAAG × Онлайн','Позиция силы','Но есть нюанс','Кейс','Маркетплейсы','Сила в контенте','Стратегия','Дорожная карта',"
);
f = f.replace(
  "'09 Инфраструктура','Контакт'",
  "'09 Инфраструктура','10 Маркетинг','Контакт'"
);

writeFileSync('src/pages/index.astro', f);
console.log('done');
