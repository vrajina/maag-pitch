import { readFileSync, writeFileSync } from 'fs';

let f = readFileSync('src/pages/index.astro', 'utf-8');

// 1. Replace old GROWTH ROADMAP section (from <!-- GROWTH ROADMAP --> to </section> before SYNERGY)
const growthStart = f.indexOf('<!-- GROWTH ROADMAP -->');
const synergyStart = f.indexOf('<!-- SYNERGY -->');
const growthSection = f.substring(growthStart, synergyStart);

const newGrowth = `<!-- GROWTH ROADMAP -->
<section class="slide slide--black" id="growth">
  <div class="slide__inner fade-up">
    <p class="label">Дорожная карта</p>
    <div class="divider"></div>
    <h2 style="margin-bottom:1rem">План развития digital&hyphen;каналов</h2>
    <p class="subhead" style="margin-bottom:0">Восемь направлений в&nbsp;порядке приоритета. Каждое&nbsp;&mdash; измеримый вклад в&nbsp;выручку, конверсию и&nbsp;клиентский опыт.</p>
    <div class="carousel-wrapper">
      <div class="carousel" id="growthCarousel">
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">01</div>
          <h3 class="growth-card__title">Конверсионные доработки интерфейса</h3>
          <p class="growth-card__text">Упростить оформление заказа&nbsp;&mdash; убрать обязательную полную регистрацию. Доработать дизайн&hyphen;систему: CTA&hyphen;элементы на&nbsp;всех баннерах. Интеграция коммерции в&nbsp;контент: визуализация и&nbsp;реализация Shop&nbsp;by&nbsp;Look. Доработка шапки сайта&nbsp;&mdash; более удобная навигация без ущерба для полноэкранных изображений. Конверсионные доработки карточки товара: больше рациональной информации, УТП, блоки UGC, реко&hyphen;блоки. Улучшение структуры посадочных страниц&nbsp;&mdash; баннер на&nbsp;посадочной не&nbsp;должен дублировать главную, это дезориентирует пользователей.</p>
          <div class="growth-card__highlight">Рост конверсии в&nbsp;оформлении заказов на&nbsp;20&ndash;45%</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">02</div>
          <h3 class="growth-card__title">SEO: аудит и&nbsp;базовая оптимизация</h3>
          <p class="growth-card__text">Полный технический аудит: скорость загрузки, Core Web Vitals, краулинговый бюджет, структура URL, каноникалы, hreflang. Настройка микроразметки (Schema.org) для товаров, категорий и&nbsp;хлебных крошек. Оптимизация мета&hyphen;тегов, заголовков и&nbsp;alt&hyphen;текстов. Исправление дублей контента и&nbsp;битых ссылок. Создание XML&hyphen;sitemap и&nbsp;настройка robots.txt. Внедрение внутренней перелинковки для усиления ключевых страниц.</p>
          <div class="growth-card__highlight">Фундамент для органического роста&nbsp;&mdash; без базовой технички остальные инвестиции в&nbsp;SEO бессмысленны</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">03</div>
          <h3 class="growth-card__title">Доработки коммуникаций</h3>
          <p class="growth-card__text">Починить траст почтового домена&nbsp;&mdash; сейчас все письма улетают в&nbsp;спам. Провести ревизию текущих коммуникационных цепочек. Реализовать базовые автоматические триггеры: велком&hyphen;цепочка с&nbsp;предложением заполнить профиль, брошенная корзина, товары в&nbsp;избранном, снижение цены на&nbsp;товар в&nbsp;корзине / в&nbsp;избранном. Следующий этап&nbsp;&mdash; дайджест&hyphen;рассылки: аудит, доработки шаблона, запуск.</p>
          <div class="growth-card__highlight">Рост клиентской базы, качественные коммуникации и&nbsp;рост конверсии с&nbsp;email&hyphen;канала</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">04</div>
          <h3 class="growth-card__title">Мобильное приложение MAAG</h3>
          <p class="growth-card__text">Запуск мобильного приложения на&nbsp;базе решения от&nbsp;Fittin. Дешёвые и&nbsp;эффективные коммуникации с&nbsp;постоянными клиентами через push&hyphen;уведомления (CTR в&nbsp;5&ndash;10&nbsp;раз выше, чем у&nbsp;email). Возможность собирать новую аудиторию в&nbsp;каналах мобильного маркетинга&nbsp;&mdash; вести новых клиентов сразу в&nbsp;приложение. Быстрый чекаут, wishlist, персональные подборки.</p>
          <div class="growth-card__highlight">Общий рост выручки. Доля заказов через приложение может достигать 40&ndash;50% при&nbsp;кратно меньших затратах</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">05</div>
          <h3 class="growth-card__title">Товарные рекомендации</h3>
          <p class="growth-card__text">Интеграция блоков персональных товарных рекомендаций на&nbsp;сайте и&nbsp;в&nbsp;приложении: похожие товары, сопутствующие, &laquo;следующая покупка&raquo;, &laquo;с&nbsp;этим покупают&raquo;. Рекомендации на&nbsp;карточке товара, в&nbsp;корзине, на&nbsp;главной и&nbsp;в&nbsp;категориях. Готовые решения (Retail Rocket, Mindbox) позволяют запустить быстро.</p>
          <div class="growth-card__highlight">Рост выручки и&nbsp;среднего чека корзины и&nbsp;выкупленных заказов на&nbsp;10&ndash;20%</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">06</div>
          <h3 class="growth-card__title">Омниканальная программа лояльности</h3>
          <p class="growth-card__text">Единая ПЛ на&nbsp;ВСЕ бренды&nbsp;&mdash; онлайн и&nbsp;офлайн. Бонусы, кэшбэк, персональные предложения, уровни. Кросс&hyphen;продажи между брендами увеличивают LTV. Возможность выстраивать точечные персональные коммуникации практически с&nbsp;каждым клиентом. Единая карточка клиента для аналитики и&nbsp;сегментации.</p>
          <div class="growth-card__highlight">Рост клиентской базы, рост выручки, +20&ndash;30% повторных покупок</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">07</div>
          <h3 class="growth-card__title">Блог для инфотрафика и&nbsp;GEO</h3>
          <p class="growth-card__text">Запуск контентного хаба (блог / журнал) на&nbsp;сайте для сбора информационного трафика и&nbsp;роста GEO&hyphen;факторов. Интеграция коммерции в&nbsp;контент&nbsp;&mdash; каждая статья ведёт к&nbsp;покупке. Единое решение для всех брендов, единая редакция. Материалы о&nbsp;стиле, трендах, коллекциях генерируют бесплатный органический трафик.</p>
          <div class="growth-card__highlight">Органический трафик&nbsp;&mdash; самый дешёвый и&nbsp;стабильный канал привлечения в&nbsp;долгосрочной перспективе</div>
        </div></div>
        <div class="carousel__item"><div class="growth-card">
          <div class="growth-card__number">08</div>
          <h3 class="growth-card__title">Единая еком&hyphen;инфраструктура</h3>
          <p class="growth-card__text">Создание единой технической платформы для всех брендов. Работа с&nbsp;контентом и&nbsp;каталогами ведётся раздельно, разными командами&nbsp;&mdash; но&nbsp;техническая инфраструктура одна. Синергия вместо конкуренции: фича, разработанная для MAAG, мгновенно доступна DUB, ECRU и&nbsp;VILET. Четыре бренда тянут платформу вперёд, а&nbsp;не&nbsp;дублируют расходы.</p>
          <div class="growth-card__highlight">Оптимизация костов поддержки до&nbsp;60&ndash;70%, унификация фич, синергия развития вместо конкуренции бюджетов</div>
        </div></div>
      </div>
      <div class="carousel__nav"><button class="carousel__btn" data-carousel="growthCarousel" data-dir="-1">&larr;</button><span class="carousel__counter" id="growthCounter">1 / 8</span><button class="carousel__btn" data-carousel="growthCarousel" data-dir="1">&rarr;</button></div>
    </div>
  </div>
</section>

`;

f = f.replace(growthSection, newGrowth);

// 2. Remove APPROACH section
const approachStart = f.indexOf('<!-- APPROACH -->');
const ctaStart = f.indexOf('<!-- CTA -->');
f = f.substring(0, approachStart) + f.substring(ctaStart);

// 3. Replace CTA section
const ctaEnd = f.indexOf('</section>', ctaStart) + '</section>'.length;
const oldCta = f.substring(ctaStart, ctaEnd);
const newCta = `<!-- CTA -->
<section class="slide slide--dark" id="cta">
  <div class="slide__inner fade-up cta">
    <p class="label" style="margin-bottom:2rem">Следующий шаг</p>
    <h2>Давайте раскроем потенциал вашего онлайна</h2>
    <p class="subhead">Предлагаем провести детальный аудит digital\u2011каналов и\u00a0подготовить конкретную дорожную карту развития.</p>
    <a href="https://awg.ru" class="cta-btn" target="_blank" rel="noopener">Связаться с\u00a0AWG</a>
    <p style="margin-top:1.5rem;font-size:.85rem;color:var(--text-muted)">AWG \u00b7 Digital\u00a0&\u00a0E\u2011commerce</p>
  </div>
</section>`;
f = f.replace(oldCta, newCta);

// 4. Fix JS counters — remove uxCarousel references, update growthCarousel count
f = f.replace(
  "[['uxCarousel','uxCounter',6],['growthCarousel','growthCounter',7]]",
  "[['growthCarousel','growthCounter',8]]"
);

writeFileSync('src/pages/index.astro', f, 'utf-8');
console.log('Done: roadmap rewritten, approach removed, CTA updated');
