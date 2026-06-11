/* ============================================
   DEVENIR — Articles Loader v2
   Maneja: feed (index.html) + articulo.html
   Fuente: /data/articles.json + /data/articles/[slug].json
   ============================================ */
(function () {
  'use strict';

  const CFG = {
    indexUrl: '../data/articles.json',
    articleDir: '../data/articles/',
    pageSize: 4,
    locale: 'es-MX',
  };

  const state = { all: [], filtered: [], page: 0, category: 'Todo', loading: false };

  /* ── Detectar página ── */
  function init() {
    if (document.getElementById('article-content')) initArticlePage();
    if (document.getElementById('articles-grid')) initFeedPage();
  }

  /* ════════════════════════════════
     A. FEED
     ════════════════════════════════ */
  function initFeedPage() {
    const DOM = {
      grid: document.getElementById('articles-grid'),
      featured: document.getElementById('featured-slot'),
      loadMore: document.querySelector('.js-load-more'),
      chipRow: document.querySelector('.chip-row'),
      skeleton: document.getElementById('feed-skeleton'),
    };

    DOM.chipRow?.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      DOM.chipRow.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      applyFilter(chip.textContent.trim(), DOM);
    });

    DOM.loadMore?.addEventListener('click', () => loadMoreCards(DOM));

    fetchIndex(DOM);
  }

  async function fetchIndex(DOM) {
    showSkeleton(DOM, true);
    try {
      const res = await fetch(CFG.indexUrl);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      state.all = await res.json();
      applyFilter('Todo', DOM);
    } catch (err) {
      console.error('[Devenir Feed]', err);
      if (DOM.grid) DOM.grid.innerHTML = errorTpl('No se cargó <code>data/articles.json</code>.');
    } finally {
      showSkeleton(DOM, false);
    }
  }

  function applyFilter(cat, DOM) {
    state.category = cat;
    state.page = 0;
    state.filtered = cat === 'Todo' ? state.all.slice() : state.all.filter(a => a.category === cat);
    renderFeed(DOM);
  }

  function renderFeed(DOM) {
    const feat = state.filtered.find(a => a.featured) || state.filtered[0];
    const rest = state.filtered.filter(a => a !== feat);

    if (DOM.featured) DOM.featured.innerHTML = feat ? tplFeatured(feat) : '';
    DOM.grid.innerHTML = '';
    rest.slice(0, CFG.pageSize).forEach(a => appendCard(a, DOM.grid, false));
    state.page = 1;
    syncBtn(DOM, rest.length);
  }

  function loadMoreCards(DOM) {
    if (state.loading) return;
    const feat = state.filtered.find(a => a.featured) || state.filtered[0];
    const rest = state.filtered.filter(a => a !== feat);
    const batch = rest.slice(state.page * CFG.pageSize, (state.page + 1) * CFG.pageSize);
    if (!batch.length) return;

    state.loading = true;
    const icon = DOM.loadMore?.querySelector('.icon');
    if (icon) icon.classList.add('spin-slow');
    if (DOM.loadMore) DOM.loadMore.disabled = true;

    setTimeout(() => {
      batch.forEach(a => appendCard(a, DOM.grid, true));
      state.page++;
      state.loading = false;
      if (icon) icon.classList.remove('spin-slow');
      if (DOM.loadMore) DOM.loadMore.disabled = false;
      syncBtn(DOM, rest.length);
    }, 300);
  }

  function syncBtn(DOM, total) {
    const wrap = DOM.loadMore?.closest('.load-more-wrapper');
    if (wrap) wrap.style.display = (state.page * CFG.pageSize >= total) ? 'none' : 'flex';
  }

  function appendCard(article, grid, animate) {
    const div = document.createElement('div');
    div.innerHTML = tplCard(article).trim();
    const node = div.firstElementChild;
    if (!node) return;
    if (animate) {
      node.style.cssText = 'opacity:0;transform:translateY(18px);';
      grid.appendChild(node);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        node.style.cssText = 'transition:opacity .35s ease,transform .35s ease;opacity:1;transform:translateY(0);';
      }));
    } else {
      grid.appendChild(node);
    }
  }

  function showSkeleton(DOM, show) {
    if (DOM.skeleton) DOM.skeleton.style.display = show ? 'grid' : 'none';
    if (DOM.grid) DOM.grid.style.opacity = show ? '0' : '1';
    if (DOM.featured) DOM.featured.style.opacity = show ? '0' : '1';
  }

  /* ════════════════════════════════
     B. ARTICLE PAGE
     ════════════════════════════════ */
  async function initArticlePage() {
    const slug = new URLSearchParams(window.location.search).get('slug');
    if (!slug) { showArtError('Falta <code>?slug=nombre-del-articulo</code> en la URL.'); return; }

    try {
      const res = await fetch(CFG.articleDir + slug + '.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      populateArticle(await res.json());
    } catch (err) {
      console.error('[Devenir Article]', err);
      showArtError('No se encontró <code>' + slug + '.json</code> en <code>data/articles/</code>.');
    }
  }

  function populateArticle(a) {
    /* HEAD */
    document.title = a.title + ' · Devenir';
    const m = document.querySelector('meta[name="description"]');
    if (m) m.content = a.excerpt;

    /* Hero */
    const img = document.getElementById('article-hero-img');
    if (img) { img.src = a.image; img.alt = a.title; }

    /* Textos de cabecera */
    setTxt('article-category', a.category);
    setTxt('article-title-el', a.title);
    setTxt('article-date', fmtDate(a.date));
    setTxt('article-readtime', a.readTime + ' min de lectura');

    /* Cuerpo */
    const body = document.getElementById('article-content');
    if (body) body.innerHTML = a.body || '<p>Sin contenido.</p>';

    /* Fade-in de la página */
    const lay = document.querySelector('.reading-layout');
    if (lay) {
      lay.style.cssText = 'opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease;';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        lay.style.opacity = '1'; lay.style.transform = 'translateY(0)';
      }));
    }
  }

  function showArtError(msg) {
    const b = document.getElementById('article-content');
    if (b) b.innerHTML = errorTpl(msg);
  }

  /* ════════════════════════════════
     TEMPLATES
     ════════════════════════════════ */
  function tplFeatured(a) {
    return `<div class="featured-card fade-in">
      <div class="featured-card__image">
        <img src="${x(a.image)}" alt="${x(a.title)}" loading="eager" />
        <div class="featured-card__overlay">
          <span class="featured-badge gradient-brand">Especial</span>
          <h2 class="featured-card__title">${x(a.title)}</h2>
        </div>
      </div>
      <div class="featured-card__body">
        <p class="featured-card__excerpt">${x(a.excerpt)}</p>
        <div class="featured-card__meta">
          <div class="flex-gap-sm">
            <span class="text-label-md c-primary">${fmtDate(a.date)}</span>
            <span class="dot-separator"></span>
            <span class="text-label-md c-secondary">${a.readTime} min</span>
          </div>
          <a href="/article/index.html?slug=${x(a.slug)}" class="read-link">Leer <span class="icon icon--sm">arrow_forward</span></a>
        </div>
      </div>
    </div>`;
  }

  function tplCard(a) {
    if (a.wide) return `
    <article class="article-card article-card--wide fade-in">
      <div class="card-inner">
        <div class="card-thumb"><img src="${x(a.image)}" alt="${x(a.title)}" loading="lazy"/></div>
        <div class="card-content">
          <span class="article-card__tag">${x(a.category)}</span>
          <h3 class="article-card__title" style="font-size:20px;">${x(a.title)}</h3>
          <p class="article-card__excerpt clamp-2">${x(a.excerpt)}</p>
          <div class="flex-gap-sm" style="margin-top:6px;">
            <span class="text-label-md c-muted">${a.readTime} min</span>
            <span class="dot-separator"></span>
            <a href="articulo.html?slug=${x(a.slug)}" class="read-link">Leer <span class="icon icon--sm">arrow_forward</span></a>
          </div>
        </div>
      </div>
    </article>`;

    return `
    <article class="article-card fade-in">
      <div class="flex-gap-sm" style="flex-wrap:wrap;">
        <span class="article-card__tag neu-carved">${x(a.category).toUpperCase()}</span>
        <span class="text-label-md c-muted">${a.readTime} min de lectura</span>
      </div>
      <div class="article-card__header">
        <h3 class="article-card__title">${x(a.title)}</h3>
        <button class="bookmark-btn" data-saved="false" aria-label="Guardar">
          <span class="icon">bookmark</span>
        </button>
      </div>
      <p class="article-card__excerpt">${x(a.excerpt)}</p>
      <div class="article-card__footer">
        <span class="text-label-md c-muted">${fmtDate(a.date)}</span>
        <a href="articulo.html?slug=${x(a.slug)}" class="read-link">Leer <span class="icon icon--sm">arrow_forward</span></a>
      </div>
    </article>`;
  }

  /* ════════════════════════════════
     UTILS
     ════════════════════════════════ */
  function x(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmtDate(d) {
    try { return new Date(d + 'T00:00:00').toLocaleDateString(CFG.locale, { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (_) { return d; }
  }
  function setTxt(id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; }
  function errorTpl(msg) {
    return `<div style="text-align:center;padding:var(--space-xl);color:var(--secondary);">
      <span class="icon" style="font-size:40px;opacity:.3;">error_outline</span>
      <p class="text-label-md" style="margin-top:var(--space-sm);">${msg}</p>
    </div>`;
  }

  window.reloadFeed = function () {
    if (document.getElementById('articles-grid')) {
      initFeedPage();
    }
  };

  /* ── Arranque ── */
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();

