(function () {
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
})();
