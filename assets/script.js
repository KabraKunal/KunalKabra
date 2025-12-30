(function () {
  // ==================== Dark Mode Toggle ====================
  const themeToggle = document.getElementById('theme-toggle');
  const logo = document.getElementById('site-logo');

  // Detect if we're in a subdirectory (essays/) and set correct path prefix
  const isSubdir = window.location.pathname.includes('/essays/');
  const assetPrefix = isSubdir ? '../assets/' : 'assets/';
  const LIGHT_LOGO = assetPrefix + 'Light Logo.svg';
  const DARK_LOGO = assetPrefix + 'Dark Logo.svg';

  // Check for saved theme preference or default to light
  function getThemePreference() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      if (logo) logo.src = DARK_LOGO;
    } else {
      document.documentElement.classList.remove('dark');
      if (logo) logo.src = LIGHT_LOGO;
    }
    localStorage.setItem('theme', theme);
  }

  // Apply theme on page load (before content renders to avoid flash)
  setTheme(getThemePreference());

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ==================== View Counter (Homepage Only) ====================
  const viewCountEl = document.getElementById('view-count');
  if (viewCountEl) {
    // Get current count from localStorage
    let count = parseInt(localStorage.getItem('pageViews') || '0', 10);

    // Increment count
    count++;

    // Save new count
    localStorage.setItem('pageViews', count.toString());

    // Format as 5-digit number with leading zeros
    const formattedCount = count.toString().padStart(5, '0');
    viewCountEl.textContent = formattedCount;
  }

  // ==================== Navigation Highlighting ====================
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

  // ==================== Newsletter Form ====================
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
})();
