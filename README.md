# kunalkabra.com

Personal website of Kunal Kabra — strategy, technology, India's industrial future,
and notes on building durable things.

## Stack

Plain static HTML/CSS/JS. No build step, no framework, no dependencies.
Deployed on GitHub Pages at the custom domain `kunalkabra.com` (see `CNAME`).

## Structure

```
/
├── index.html                     Home
├── 404.html                       Not-found page
├── about/                         Legacy redirect → /
├── essays/
│   ├── index.html                 Essays list (with topic filters)
│   ├── why-moats-matter/
│   ├── last-mile-manufacturing/
│   ├── agency-and-leverage/
│   └── learning-notes/
├── projects/index.html            Problems I'm exploring
├── reading/index.html             Reading & resources (collapsible notes)
└── assets/
    ├── style.css                  All styles (dark + light themes)
    ├── script.js                  All behaviour
    ├── logo-light.svg / logo-dark.svg / logo.svg
    └── portrait.jpg / portrait.heif
```

## Features

- Dark / light theme with system-preference detection, persisted in `localStorage`
  (no flash of unstyled content — theme is applied before first paint).
- Command palette: press `/` anywhere to search pages, essays, and links.
- Keyboard shortcuts: `?` help, `t` theme, `n` nav, `g h/e/p/r/l` go-to,
  arrow keys through filters, essays, and results.
- Essay filtering by topic (All / Business / Technology / Manufacturing / Philosophy).
- Collapsible reading notes.
- Substack newsletter sign-up.
- GoatCounter view counter (bottom-right).
- Fully responsive (laptop → phone) with reduced-motion support.

## Editing content

All pages are generated from `build.py` in the repo root (kept for convenience).
You can either edit the generated HTML files directly, or edit `build.py` and
re-run `python3 build.py` to regenerate everything with consistent header/footer.

## Local preview

Because links are root-absolute (`/essays/`, `/assets/...`), preview with a
local server rather than opening files directly:

```
python3 -m http.server 8000
# then open http://localhost:8000
```
