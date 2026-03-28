(function () {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Get saved theme or detect system preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme to document
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update toggle button visual state
    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.classList.add('dark');
      } else {
        themeToggle.classList.remove('dark');
      }
    }
  }

  // Initialize theme on page load
  setTheme(getPreferredTheme());

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Highlight current nav link based on path
  const path = window.location.pathname.replace(/\/+$/, "");
  const links = document.querySelectorAll(".nav a");
  links.forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;

    const normalizedHref = href.replace(/\/+$/, "");
    const isIndex = (path === "" || path.endsWith("/index.html")) && (normalizedHref === "index.html" || normalizedHref === "/");
    const matches = path.endsWith(normalizedHref);

    if (matches || isIndex) a.classList.add("active");
  });

  // Essay filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    const essayItems = document.querySelectorAll('.essay-item');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        essayItems.forEach(item => {
          const tags = item.dataset.tags.split(' ');
          item.classList.toggle('hidden', filter !== 'all' && !tags.includes(filter));
        });
      });
    });
  }
})();

// Typewriter hero (homepage only)
(function() {
  var h1 = document.querySelector('.hero h1');
  if (!h1) return;

  var fullText = h1.textContent;
  h1.textContent = '';

  var cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  h1.appendChild(cursor);

  // Fade-in targets: the intro paragraph and the sections below
  var fadeEls = document.querySelectorAll('.hero > div > p, .hero > div > .section');
  fadeEls.forEach(function(el) { el.classList.add('hero-intro-fade'); });

  var i = 0;
  function type() {
    if (i < fullText.length) {
      h1.insertBefore(document.createTextNode(fullText[i]), cursor);
      i++;
      // Slightly vary speed for natural feel
      var delay = fullText[i - 1] === '.' || fullText[i - 1] === ',' ? 180 : 42;
      setTimeout(type, delay);
    } else {
      // Blink cursor a moment then fade it out
      setTimeout(function() {
        cursor.classList.add('fade-out');
        setTimeout(function() { cursor.remove(); }, 600);
      }, 1200);
      // Fade in the rest of the content
      setTimeout(function() {
        fadeEls.forEach(function(el, idx) {
          setTimeout(function() { el.classList.add('visible'); }, idx * 80);
        });
      }, 300);
    }
  }

  setTimeout(type, 400);
})();

// Command Palette
(function() {
  var commands = [
    { group: 'Pages', title: 'Home', subtitle: 'Start here', url: '/', icon: 'home' },
    { group: 'Pages', title: 'About', subtitle: 'Who I am and what I\'m building', url: '/about', icon: 'user' },
    { group: 'Pages', title: 'Essays', subtitle: 'All essays and articles', url: '/essays', icon: 'file-text' },
    { group: 'Pages', title: 'Projects', subtitle: 'Problems I\'m exploring', url: '/projects', icon: 'box' },
    { group: 'Pages', title: 'Reading', subtitle: 'Books and resources', url: '/reading', icon: 'book' },
    { group: 'Essays', title: 'Why Moats Matter More Than Innovation', subtitle: 'On durable competitive advantage', url: '/essays/why-moats-matter', icon: 'essay' },
    { group: 'Essays', title: 'The Last-Mile Problem in Indian Manufacturing', subtitle: 'India\'s execution gap', url: '/essays/last-mile-manufacturing', icon: 'essay' },
    { group: 'Essays', title: 'Agency and Leverage: Building Compounding Systems', subtitle: 'How individuals compound', url: '/essays/agency-and-leverage', icon: 'essay' },
    { group: 'Essays', title: 'Learning Notes', subtitle: 'Notes on what I\'m studying', url: '/essays/learning-notes', icon: 'essay' },
    { group: 'Contact', title: 'Send Email', subtitle: 'kunal.kabra.iitb@gmail.com', url: 'mailto:kunal.kabra.iitb@gmail.com', icon: 'mail' },
    { group: 'Contact', title: 'LinkedIn', subtitle: 'linkedin.com/in/kunal-kabra', url: 'https://www.linkedin.com/in/kunal-kabra', icon: 'link', external: true },
  ];

  var svgPaths = {
    'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
    'box': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
    'book': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"></path>',
    'essay': '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>',
    'mail': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
    'search': '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  };

  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (svgPaths[name] || svgPaths['essay']) + '</svg>';
  }

  // Build DOM
  var backdrop = document.createElement('div');
  backdrop.className = 'cmd-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'Command palette');
  backdrop.innerHTML =
    '<div class="cmd-palette">' +
      '<div class="cmd-input-wrap">' +
        '<span class="cmd-input-icon">' + icon('search') + '</span>' +
        '<input class="cmd-input" type="text" placeholder="Search pages, essays, contact..." autocomplete="off" spellcheck="false" />' +
        '<kbd class="cmd-esc-hint">esc</kbd>' +
      '</div>' +
      '<div class="cmd-results" id="cmd-results"></div>' +
      '<div class="cmd-footer">' +
        '<span class="cmd-footer-hint"><kbd>↑↓</kbd> navigate</span>' +
        '<span class="cmd-footer-hint"><kbd>↵</kbd> open</span>' +
        '<span class="cmd-footer-hint"><kbd>esc</kbd> close</span>' +
        '<span class="cmd-footer-hint" style="margin-left:auto"><kbd>/</kbd> to open</span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);

  var input = backdrop.querySelector('.cmd-input');
  var resultsEl = backdrop.querySelector('#cmd-results');
  var selectedIndex = 0;
  var filtered = [];

  function openPalette() {
    backdrop.classList.add('open');
    input.value = '';
    selectedIndex = 0;
    render('');
    setTimeout(function() { input.focus(); }, 10);
  }

  function closePalette() {
    backdrop.classList.remove('open');
  }

  function render(query) {
    var q = query.trim().toLowerCase();
    filtered = q
      ? commands.filter(function(c) {
          return c.title.toLowerCase().includes(q) ||
                 c.subtitle.toLowerCase().includes(q) ||
                 c.group.toLowerCase().includes(q);
        })
      : commands;

    if (filtered.length === 0) {
      resultsEl.innerHTML = '<div class="cmd-empty">No results for "' + query + '"</div>';
      selectedIndex = -1;
      return;
    }

    if (selectedIndex >= filtered.length) selectedIndex = 0;

    // Group
    var groups = {};
    var order = [];
    filtered.forEach(function(cmd) {
      if (!groups[cmd.group]) { groups[cmd.group] = []; order.push(cmd.group); }
      groups[cmd.group].push(cmd);
    });

    var html = '';
    var idx = 0;
    order.forEach(function(group) {
      html += '<div class="cmd-group-label">' + group + '</div>';
      groups[group].forEach(function(cmd) {
        var sel = idx === selectedIndex;
        html +=
          '<a class="cmd-item' + (sel ? ' selected' : '') + '" href="' + cmd.url + '"' +
          (cmd.external ? ' target="_blank" rel="noopener"' : '') +
          ' data-idx="' + idx + '">' +
            '<span class="cmd-item-icon">' + icon(cmd.icon) + '</span>' +
            '<span class="cmd-item-text">' +
              '<span class="cmd-item-title">' + cmd.title + '</span>' +
              '<span class="cmd-item-subtitle">' + cmd.subtitle + '</span>' +
            '</span>' +
            '<span class="cmd-item-enter">↵</span>' +
          '</a>';
        idx++;
      });
    });

    resultsEl.innerHTML = html;

    resultsEl.querySelectorAll('.cmd-item').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        selectedIndex = parseInt(el.dataset.idx);
        render(input.value);
      });
    });
  }

  function move(dir) {
    if (filtered.length === 0) return;
    selectedIndex = (selectedIndex + dir + filtered.length) % filtered.length;
    render(input.value);
    var sel = resultsEl.querySelector('.cmd-item.selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  function activate() {
    if (selectedIndex >= 0 && filtered[selectedIndex]) {
      var cmd = filtered[selectedIndex];
      closePalette();
      if (cmd.external) {
        window.open(cmd.url, '_blank', 'noopener');
      } else {
        window.location.href = cmd.url;
      }
    }
  }

  // Inject / hint into sidebar nav
  var navbox = document.querySelector('.navbox');
  if (navbox) {
    var hint = document.createElement('div');
    hint.style.cssText = 'margin-top:14px; padding-top:12px; border-top:1px solid var(--border);';
    hint.innerHTML = '<button class="cmd-kbd-trigger"><kbd style="font-size:13px;font-family:monospace;">/</kbd>&nbsp; Search</button>';
    navbox.appendChild(hint);
    hint.querySelector('.cmd-kbd-trigger').addEventListener('click', openPalette);
  }

  function isTyping() {
    var tag = document.activeElement && document.activeElement.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
           (document.activeElement && document.activeElement.isContentEditable);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !isTyping() && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      backdrop.classList.contains('open') ? closePalette() : openPalette();
    }
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closePalette();
    }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); activate(); }
    else if (e.key === 'Escape') { closePalette(); }
  });

  input.addEventListener('input', function() {
    selectedIndex = 0;
    render(input.value);
  });

  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) closePalette();
  });
})();
