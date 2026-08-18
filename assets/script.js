/* ============================================================
   Kunal Kabra — site behaviour
   Theme toggle · nav highlight · essay filtering (+ keyboard) ·
   keyboard shortcuts · collapsible reading cards · command palette
   ============================================================ */

(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  /* ---------- Theme ---------- */
  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });

  /* ---------- Active nav link ---------- */
  const path = window.location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('mailto') || href.startsWith('http')) return;
    const norm = href.replace(/\/+$/, '').replace(/^\.\//, '').replace(/^\.\.\//, '');
    if (norm && path.endsWith(norm)) a.classList.add('active');
  });

  /* ---------- Essay filtering + keyboard-first navigation ---------- */
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  if (filterBtns.length > 0) {
    const essayItems = Array.from(document.querySelectorAll('.essay-item'));
    let filterIndex = Math.max(0, filterBtns.findIndex((b) => b.classList.contains('active')));
    let essayIndex = -1;
    let zone = 'filters';

    const typing = () => {
      const t = document.activeElement && document.activeElement.tagName;
      return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' ||
        (document.activeElement && document.activeElement.isContentEditable);
    };
    const visible = () => essayItems.filter((i) => !i.classList.contains('hidden'));
    const clearSel = () => {
      filterBtns.forEach((b) => b.classList.remove('keyboard-selected'));
      essayItems.forEach((i) => i.classList.remove('keyboard-selected'));
    };
    function selectFilter(i, focus) {
      filterIndex = (i + filterBtns.length) % filterBtns.length;
      zone = 'filters'; clearSel();
      filterBtns[filterIndex].classList.add('keyboard-selected');
      if (focus) filterBtns[filterIndex].focus({ preventScroll: true });
    }
    function selectEssay(i, focus) {
      const v = visible(); if (!v.length) return;
      essayIndex = (i + v.length) % v.length;
      zone = 'essays'; clearSel();
      const sel = v[essayIndex];
      sel.classList.add('keyboard-selected');
      sel.scrollIntoView({ block: 'nearest' });
      const link = sel.querySelector('.essay-title a');
      if (focus && link) link.focus({ preventScroll: true });
    }
    function applyFilter(btn) {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
      essayItems.forEach((item) => {
        const tags = (item.dataset.tags || '').split(' ');
        item.classList.toggle('hidden', f !== 'all' && !tags.includes(f));
      });
      essayIndex = -1;
    }

    filterBtns.forEach((btn, i) => {
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
      btn.addEventListener('click', () => { filterIndex = i; zone = 'filters'; clearSel(); applyFilter(btn); });
      btn.addEventListener('focus', () => { filterIndex = i; zone = 'filters'; });
    });
    essayItems.forEach((item, i) => {
      const link = item.querySelector('.essay-title a');
      if (!link) return;
      link.addEventListener('focus', () => {
        const vi = visible().indexOf(item);
        if (vi >= 0) { essayIndex = vi; zone = 'essays'; clearSel(); item.classList.add('keyboard-selected'); }
      });
      link.addEventListener('blur', () => essayItems[i] && essayItems[i].classList.remove('keyboard-selected'));
    });

    document.addEventListener('keydown', (e) => {
      if (document.body.classList.contains('cmd-open') || typing()) return;
      if (!(document.querySelector('.essay-list') && document.querySelector('.essay-filters'))) return;
      const onFilter = filterBtns.includes(document.activeElement);
      const onEssay = document.activeElement && document.activeElement.closest && document.activeElement.closest('.essay-item');

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); selectFilter(filterIndex + (e.key === 'ArrowRight' ? 1 : -1), true); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); (zone === 'filters' || onFilter || essayIndex < 0) ? selectEssay(0, true) : selectEssay(essayIndex + 1, true); return; }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (zone === 'essays' || onEssay) { essayIndex <= 0 ? selectFilter(filterIndex, true) : selectEssay(essayIndex - 1, true); }
        else selectFilter(filterIndex, true);
        return;
      }
      if (e.key === 'Home') { e.preventDefault(); zone === 'essays' ? selectEssay(0, true) : selectFilter(0, true); return; }
      if (e.key === 'End') { e.preventDefault(); zone === 'essays' ? selectEssay(visible().length - 1, true) : selectFilter(filterBtns.length - 1, true); return; }
      if ((e.key === 'Enter' || e.key === ' ') && zone === 'filters') { e.preventDefault(); applyFilter(filterBtns[filterIndex]); selectFilter(filterIndex, true); return; }
      if (e.key === 'Enter' && zone === 'essays') {
        const sel = visible()[essayIndex]; const link = sel && sel.querySelector('.essay-title a');
        if (link) { e.preventDefault(); link.click(); } return;
      }
      if (e.key === 'Escape') { clearSel(); essayIndex = -1; zone = 'filters'; }
    });
  }

  /* ---------- Keyboard shortcuts + help ---------- */
  function isTypingContext() {
    const t = document.activeElement && document.activeElement.tagName;
    return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' ||
      (document.activeElement && document.activeElement.isContentEditable);
  }

  function createKeyboardHelp() {
    const existing = document.querySelector('.kbd-help-backdrop');
    if (existing) return existing;
    const help = document.createElement('div');
    help.className = 'kbd-help-backdrop';
    help.setAttribute('role', 'dialog');
    help.setAttribute('aria-modal', 'true');
    help.setAttribute('aria-label', 'Keyboard shortcuts');
    help.innerHTML = `
      <div class="kbd-help-panel">
        <h2>Keyboard shortcuts</h2>
        <div class="kbd-help-grid">
          <kbd>/</kbd><span>Open search</span>
          <kbd>?</kbd><span>Show or hide this help</span>
          <kbd>t</kbd><span>Toggle theme</span>
          <kbd>n</kbd><span>Focus navigation</span>
          <kbd>&uarr; &darr;</kbd><span>Move through nav links, essays, or search results</span>
          <kbd>&larr; &rarr;</kbd><span>Move through essay filters</span>
          <kbd>Enter</kbd><span>Open selected item</span>
          <kbd>g h</kbd><span>Go home</span>
          <kbd>g i</kbd><span>Go to Morning Intelligence</span>
          <kbd>g e</kbd><span>Go to essays</span>
          <kbd>g p</kbd><span>Go to problems</span>
          <kbd>g r</kbd><span>Go to reading</span>
          <kbd>g l</kbd><span>Go to learning notes</span>
          <kbd>Esc</kbd><span>Close overlay or clear selection</span>
        </div>
        <div class="kbd-help-footer">Shortcuts are disabled while typing in inputs.</div>
      </div>`;
    document.body.appendChild(help);
    help.addEventListener('click', (e) => { if (e.target === help) help.classList.remove('open'); });
    return help;
  }

  const keyboardHelp = createKeyboardHelp();
  let goPrefix = false, goTimer = null, navIndex = -1;
  function setGoPrefix(active) {
    goPrefix = active; clearTimeout(goTimer);
    if (active) goTimer = setTimeout(() => { goPrefix = false; }, 1400);
  }
  function siteUrl(p) { return '/' + String(p).replace(/^\//, ''); }
  function goTo(key) {
    const routes = { h: '', i: 'intelligence/#today', e: 'essays/', p: 'projects/', r: 'reading/', l: 'essays/learning-notes/' };
    if (routes[key] !== undefined) window.location.href = siteUrl(routes[key]);
  }
  const navLinks = () => Array.from(document.querySelectorAll('.site-nav a'));
  function focusNav(i) {
    const links = navLinks(); if (!links.length) return;
    navIndex = (i + links.length) % links.length;
    links.forEach((l) => l.classList.remove('keyboard-selected'));
    links[navIndex].classList.add('keyboard-selected');
    links[navIndex].focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => {
    if (isTypingContext() || document.body.classList.contains('cmd-open')) return;
    const helpOpen = keyboardHelp.classList.contains('open');

    if (e.key === 'Escape') {
      e.preventDefault();
      if (helpOpen) keyboardHelp.classList.remove('open');
      navLinks().forEach((l) => l.classList.remove('keyboard-selected'));
      setGoPrefix(false);
      return;
    }
    if (e.key === '?') { e.preventDefault(); keyboardHelp.classList.toggle('open'); return; }
    if (helpOpen) return;

    if (goPrefix) {
      const k = e.key.toLowerCase(); setGoPrefix(false);
      if ('hieprl'.includes(k)) { e.preventDefault(); goTo(k); }
      return;
    }
    if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); setGoPrefix(true); return; }
    if (e.key.toLowerCase() === 't' && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); return; }
    if (e.key.toLowerCase() === 'n' && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); focusNav(navIndex >= 0 ? navIndex : 0); return; }

    const inNav = document.activeElement && document.activeElement.closest && document.activeElement.closest('.site-nav');
    if (inNav && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      const links = navLinks();
      const cur = links.indexOf(document.activeElement);
      const base = cur >= 0 ? cur : Math.max(navIndex, 0);
      focusNav(base + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1));
    }
  });

  /* ---------- Collapsible reading cards ---------- */
  const toggles = Array.from(document.querySelectorAll('.resource-toggle'));
  if (toggles.length) {
    function setState(toggle, open) {
      const card = toggle.closest('.resource-entry');
      const body = card && card.querySelector('.resource-body');
      const hint = card && card.querySelector('.resource-toggle-hint');
      if (!card || !body) return;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      card.classList.toggle('is-open', open);
      body.hidden = !open;
      if (hint) hint.textContent = open ? 'Hide note' : 'Read note';
    }
    toggles.forEach((toggle, i) => {
      toggle.addEventListener('click', () => setState(toggle, toggle.getAttribute('aria-expanded') !== 'true'));
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); toggles[(i + 1) % toggles.length].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); toggles[(i - 1 + toggles.length) % toggles.length].focus(); }
      });
    });
  }

  /* ---------- View counter (GoatCounter) ---------- */
  const countEl = document.getElementById('view-count');
  if (countEl) {
    fetch('https://kunalkabra.goatcounter.com/counter/TOTAL.json')
      .then((r) => r.json())
      .then((d) => { if (d && d.count) countEl.textContent = parseInt(d.count, 10).toLocaleString(); })
      .catch(() => {});
  }
})();

/* ============================================================
   Command palette (/ to open)
   ============================================================ */
(function () {
  const commands = [
    { group: 'Pages', title: 'Home', subtitle: "Who I am and where to start", url: '/', icon: 'home' },
    { group: 'Pages', title: 'Morning Intelligence', subtitle: 'Daily decision brief, watchlist and deep reads', url: '/intelligence/#today', icon: 'intelligence' },
    { group: 'Pages', title: 'Essays', subtitle: 'All essays and articles', url: '/essays/', icon: 'file-text' },
    { group: 'Pages', title: 'Problems', subtitle: "Problems I'm exploring", url: '/projects/', icon: 'box' },
    { group: 'Pages', title: 'Reading', subtitle: 'Books and resources', url: '/reading/', icon: 'book' },
    { group: 'Essays', title: 'Why Moats Matter More Than Innovation', subtitle: 'On durable competitive advantage', url: '/essays/why-moats-matter/', icon: 'essay' },
    { group: 'Essays', title: 'The Last-Mile Problem in Indian Manufacturing', subtitle: "India's execution gap", url: '/essays/last-mile-manufacturing/', icon: 'essay' },
    { group: 'Essays', title: 'Agency and Leverage: Building Compounding Systems', subtitle: 'How individuals compound', url: '/essays/agency-and-leverage/', icon: 'essay' },
    { group: 'Essays', title: 'Learning Notes', subtitle: "Notes on what I'm studying", url: '/essays/learning-notes/', icon: 'essay' },
    { group: 'Contact', title: 'Send email', subtitle: 'kunal.kabra.iitb@gmail.com', url: 'mailto:kunal.kabra.iitb@gmail.com', icon: 'mail' },
    { group: 'Contact', title: 'LinkedIn', subtitle: 'linkedin.com/in/kunal-kabra', url: 'https://www.linkedin.com/in/kunal-kabra', icon: 'link', external: true },
  ];

  const svgPaths = {
    'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    'intelligence': '<path d="M4 19V9"></path><path d="M10 19V5"></path><path d="M16 19v-7"></path><path d="M22 19V2"></path><path d="M2 19h22"></path>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
    'box': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
    'book': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"></path>',
    'essay': '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>',
    'mail': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
    'search': '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
  };
  const icon = (n) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (svgPaths[n] || svgPaths.essay) + '</svg>';
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function highlight(text, q) {
    if (!q) return esc(text);
    const e = esc(text);
    const qe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return e.replace(new RegExp('(' + qe + ')', 'gi'), '<mark class="cmd-highlight">$1</mark>');
  }

  const backdrop = document.createElement('div');
  backdrop.className = 'cmd-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'Command palette');
  backdrop.innerHTML =
    '<div class="cmd-palette">' +
      '<div class="cmd-input-wrap">' +
        '<span class="cmd-input-icon">' + icon('search') + '</span>' +
        '<input class="cmd-input" type="text" placeholder="Search pages, essays, links..." autocomplete="off" spellcheck="false" />' +
        '<kbd class="cmd-esc-hint">esc</kbd>' +
      '</div>' +
      '<div class="cmd-results" id="cmd-results"></div>' +
      '<div class="cmd-footer">' +
        '<span class="cmd-footer-hint"><kbd>&uarr;&darr;</kbd> navigate</span>' +
        '<span class="cmd-footer-hint"><kbd>&crarr;</kbd> open</span>' +
        '<span class="cmd-footer-hint"><kbd>esc</kbd> close</span>' +
        '<span class="cmd-footer-hint" style="margin-left:auto"><kbd>/</kbd> to open</span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);

  const input = backdrop.querySelector('.cmd-input');
  const resultsEl = backdrop.querySelector('#cmd-results');
  let selectedIndex = 0, filtered = [];

  function openPalette() {
    backdrop.classList.add('open');
    document.body.classList.add('cmd-open');
    input.value = ''; selectedIndex = 0; render('');
    requestAnimationFrame(() => requestAnimationFrame(() => input.focus()));
  }
  function closePalette() {
    backdrop.classList.remove('open');
    document.body.classList.remove('cmd-open');
    // Release focus from the (now-hidden) input so global shortcuts work again
    if (document.activeElement === input) input.blur();
  }

  function render(query) {
    const q = query.trim().toLowerCase();
    filtered = q ? commands.filter((c) =>
      c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    ) : commands;

    if (!filtered.length) {
      resultsEl.innerHTML =
        '<div class="cmd-empty"><div class="cmd-empty-icon">' + icon('search') + '</div>' +
        '<div class="cmd-empty-text">No results for "' + esc(query) + '"</div>' +
        '<div class="cmd-empty-sub">Try a page, essay, or contact</div></div>';
      selectedIndex = -1; return;
    }
    if (selectedIndex >= filtered.length) selectedIndex = 0;

    const groups = {}, order = [];
    filtered.forEach((c) => { if (!groups[c.group]) { groups[c.group] = []; order.push(c.group); } groups[c.group].push(c); });

    let out = '', idx = 0;
    order.forEach((g) => {
      out += '<div class="cmd-group-label">' + esc(g) + '</div>';
      groups[g].forEach((cmd) => {
        out += '<a class="cmd-item' + (idx === selectedIndex ? ' selected' : '') + '" href="' + cmd.url + '"' +
          (cmd.external ? ' target="_blank" rel="noopener"' : '') + ' data-idx="' + idx + '">' +
          '<span class="cmd-item-icon">' + icon(cmd.icon) + '</span>' +
          '<span class="cmd-item-text"><span class="cmd-item-title">' + highlight(cmd.title, q) + '</span>' +
          '<span class="cmd-item-subtitle">' + highlight(cmd.subtitle, q) + '</span></span>' +
          '<span class="cmd-item-enter">' + icon('arrow-right') + '</span></a>';
        idx++;
      });
    });
    resultsEl.innerHTML = out;
    updateSelection();
  }
  function updateSelection() {
    resultsEl.querySelectorAll('.cmd-item').forEach((el) => {
      el.classList.toggle('selected', parseInt(el.dataset.idx, 10) === selectedIndex);
    });
  }
  resultsEl.addEventListener('mousemove', (e) => {
    const item = e.target.closest('.cmd-item');
    if (item) { const n = parseInt(item.dataset.idx, 10); if (n !== selectedIndex) { selectedIndex = n; updateSelection(); } }
  });
  function move(dir) {
    if (!filtered.length) return;
    selectedIndex = (selectedIndex + dir + filtered.length) % filtered.length;
    updateSelection();
    const sel = resultsEl.querySelector('.cmd-item.selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }
  function activate() {
    if (selectedIndex >= 0 && filtered[selectedIndex]) {
      const cmd = filtered[selectedIndex];
      closePalette();
      if (cmd.external) window.open(cmd.url, '_blank', 'noopener');
      else window.location.href = cmd.url;
    }
  }

  // Wire header search button(s)
  document.querySelectorAll('[data-search-trigger]').forEach((btn) => btn.addEventListener('click', openPalette));

  const isTyping = () => {
    const t = document.activeElement && document.activeElement.tagName;
    return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' ||
      (document.activeElement && document.activeElement.isContentEditable);
  };

  document.addEventListener('keydown', (e) => {
    const open = backdrop.classList.contains('open');
    if (e.key === '/' && !isTyping() && !e.metaKey && !e.ctrlKey) { e.preventDefault(); open ? closePalette() : openPalette(); return; }
    if (!open) return;
    if (e.key === 'Escape') { closePalette(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); return; }
    if (e.key === 'Enter') { e.preventDefault(); activate(); return; }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && document.activeElement !== input) input.focus();
  });
  input.addEventListener('input', () => { selectedIndex = 0; render(input.value); });
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closePalette(); });
})();
