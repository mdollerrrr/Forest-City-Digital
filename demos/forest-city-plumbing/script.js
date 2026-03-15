/* Forest City Plumbing demo interactions */

(function () {
  const root = document.documentElement;

  const topbar = document.getElementById('topbar');
  const header = document.getElementById('header');
  const headerInner = document.querySelector('.header-inner');

  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  const mobileCta = document.getElementById('mobileCta');

  function setVar(name, px) {
    root.style.setProperty(name, `${Math.max(0, Math.round(px))}px`);
  }

  // Mobile menu
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const next = !mobileNav.classList.contains('active');
      mobileNav.classList.toggle('active', next);
      navToggle.classList.toggle('active', next);
      navToggle.setAttribute('aria-expanded', next ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Topbar collapse + header offset
  let topbarExpanded = 52;
  let headerH = 72;
  let collapsed = false;
  let ticking = false;

  function measure() {
    if (topbar) topbarExpanded = Math.max(0, Math.ceil(topbar.scrollHeight || 0));
    headerH = headerInner ? Math.max(0, Math.ceil(headerInner.getBoundingClientRect().height || 0)) : 72;

    setVar('--topbar-h', collapsed ? 0 : topbarExpanded);
    setVar('--header-h', headerH);
  }

  function setCollapsed(next) {
    if (!topbar) return;
    if (next === collapsed) return;
    collapsed = next;
    topbar.classList.toggle('is-collapsed', collapsed);
    setVar('--topbar-h', collapsed ? 0 : topbarExpanded);
  }

  function compute(y) {
    const threshold = 44;
    if (!collapsed && y > threshold + 14) return true;
    if (collapsed && y < threshold) return false;
    return collapsed;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.pageYOffset || 0;
      setCollapsed(compute(y));
      if (mobileCta) mobileCta.classList.toggle('visible', y > (window.innerWidth < 520 ? 180 : 220));
    });
  }

  function onResize() {
    measure();
    onScroll();
  }

  measure();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // Smooth anchor scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const offset = (parseInt(getComputedStyle(root).getPropertyValue('--topbar-h'), 10) || 0) + (parseInt(getComputedStyle(root).getPropertyValue('--header-h'), 10) || 0) + 14;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

