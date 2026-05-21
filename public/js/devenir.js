/* ============================================
   DEVENIR — JavaScript
   Micro-interacciones & comportamiento UI
   ============================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. BARRA DE LECTURA (progress de scroll)
     ───────────────────────────────────────── */
  function initReadingProgress() {
    const fill = document.querySelector('.js-reading-progress');
    if (!fill) return;

    function update() {
      const scrolled  = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct       = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
      // Mínimo 8% para que siempre sea visible
      fill.style.width = Math.max(8, Math.min(100, pct)) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ─────────────────────────────────────────
     2. STICKY HEADER — sombra al hacer scroll
     ───────────────────────────────────────── */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 8) {
        header.style.boxShadow = '6px 6px 16px #C8D0DC, -6px -6px 16px #FFFFFF';
      } else {
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     3. CHIPS DE CATEGORÍA — toggle activo
     ───────────────────────────────────────── */
  function initChips() {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
      });
    });
  }

  /* ─────────────────────────────────────────
     4. BOOKMARK TOGGLE
     ───────────────────────────────────────── */
  function initBookmarks() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('.icon');
        const saved = btn.dataset.saved === 'true';

        if (saved) {
          icon.style.fontVariationSettings = "'FILL' 0";
          btn.dataset.saved = 'false';
          btn.setAttribute('aria-label', 'Guardar artículo');
        } else {
          icon.style.fontVariationSettings = "'FILL' 1";
          btn.dataset.saved = 'true';
          btn.setAttribute('aria-label', 'Artículo guardado');
          // Micro-feedback visual
          btn.style.color = 'var(--accent)';
          setTimeout(() => { btn.style.color = ''; }, 600);
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     5. CARDS — efecto press neumórfico
     ───────────────────────────────────────── */
  function initCardPress() {
    document.querySelectorAll('.neu-btn').forEach(el => {
      el.addEventListener('mousedown', () => {
        el.style.transform = 'scale(0.98)';
        el.style.boxShadow = 'inset 2px 2px 4px #D1D9E6, inset -2px -2px 4px #FFFFFF';
      });
      el.addEventListener('mouseup', () => {
        el.style.transform = '';
        el.style.boxShadow = '';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.boxShadow = '';
      });
    });
  }

  /* ─────────────────────────────────────────
     6. MOBILE MENU TOGGLE (hamburger opcional)
     ───────────────────────────────────────── */
  function initMobileMenu() {
    const toggle = document.querySelector('.js-menu-toggle');
    const drawer = document.querySelector('.js-mobile-drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Cerrar al hacer clic fuera
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─────────────────────────────────────────
     7. BÚSQUEDA — expansión en móvil
     ───────────────────────────────────────── */
  function initSearch() {
    const searchToggle = document.querySelector('.js-search-toggle');
    const searchBar    = document.querySelector('.search-bar');
    if (!searchToggle || !searchBar) return;

    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('is-expanded');
      if (searchBar.classList.contains('is-expanded')) {
        searchBar.querySelector('input')?.focus();
      }
    });
  }

  /* ─────────────────────────────────────────
     8. LAZY LOAD de imágenes
     ───────────────────────────────────────── */
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;

    const imgs = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    imgs.forEach(img => observer.observe(img));
  }

  /* ─────────────────────────────────────────
     9. FADE-IN al entrar en viewport
     ───────────────────────────────────────── */
  function initFadeIn() {
    if (!('IntersectionObserver' in window)) {
      // Sin soporte: mostrar todo
      document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
      return;
    }

    const style = document.createElement('style');
    style.textContent = `
      .fade-in { opacity: 0; transform: translateY(16px); transition: opacity .45s ease, transform .45s ease; }
      .fade-in.visible { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  /* ─────────────────────────────────────────
     10. "CARGAR MÁS" — simulación (reemplazar
         con fetch real a tu JSON/API)
     ───────────────────────────────────────── */
  function initLoadMore() {
    const btn = document.querySelector('.js-load-more');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const icon = btn.querySelector('.icon');
      btn.disabled = true;
      if (icon) icon.classList.add('spin-slow');

      // Simula carga — reemplaza con fetch('/api/articles?page=X')
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (icon) icon.classList.remove('spin-slow');
      btn.disabled = false;

      // Aquí inyectarías las nuevas cards con JS
      // Por ahora muestra un mensaje
      console.log('[Devenir] Cargar más artículos…');
    });
  }

  /* ─────────────────────────────────────────
     INIT — ejecutar todo al cargar DOM
     ───────────────────────────────────────── */
  function init() {
    initThemeToggle();  
    initReadingProgress();
    initStickyHeader();
    initChips();
    initBookmarks();
    initCardPress();
    initMobileMenu();
    initSearch();
    initLazyImages();
    initFadeIn();
    initLoadMore();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ─────────────────────────────────────────
   THEME TOGGLE — Dark/Light Mode
   ───────────────────────────────────────── */
function initThemeToggle() {
  const html = document.documentElement;
  const toggleBtn = document.querySelector('.js-theme-toggle');
  const themeIcon = document.querySelector('.js-theme-icon');
  
  // 1. Detectar preferencia del sistema o localStorage
  const getPreferredTheme = () => {
    const stored = localStorage.getItem('devenir-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // 2. Aplicar tema
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = 'light_mode';
    } else {
      html.classList.remove('dark');
      html.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = 'dark_mode';
    }
    // Actualizar atributo aria
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', 
        theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
      );
    }
  };

  // 3. Inicializar
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // 4. Event listener del toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('devenir-theme', newTheme);
      applyTheme(newTheme);
      
      // Micro-animación de feedback
      toggleBtn.style.transform = 'scale(0.9)';
      setTimeout(() => { toggleBtn.style.transform = ''; }, 150);
    });
  }

  // 5. Escuchar cambios del sistema (si el usuario no ha elegido manualmente)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('devenir-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}