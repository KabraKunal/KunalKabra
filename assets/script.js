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

  // Newsletter: lightweight UX (replace with Substack embed or custom backend)
  const form = document.querySelector("[data-newsletter]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']").value.trim();
      if (!email) return;
      alert("Nice — now wire this to Substack. Email: " + email);
      form.reset();
    });
  }

  // Simple view counter (localStorage-based for demo)
  // For production, use GoatCounter, Plausible, or a custom backend
  const viewCountEl = document.getElementById('view-count');
  if (viewCountEl) {
    const storageKey = 'site_views';
    const sessionKey = 'session_counted';

    let views = parseInt(localStorage.getItem(storageKey) || '0', 10);

    // Only count once per session
    if (!sessionStorage.getItem(sessionKey)) {
      views++;
      localStorage.setItem(storageKey, views.toString());
      sessionStorage.setItem(sessionKey, 'true');
    }

    // Format number with commas
    viewCountEl.textContent = views.toLocaleString();
  }
})();
