# kunalkabra.com

Personal website of Kunal Kabra — strategy, technology, India's industrial future,
and notes on building durable things.

## Stack

Plain static HTML/CSS/JS generated with Python's standard library. No framework or
third-party build dependency.
Deployed on GitHub Pages at the custom domain `kunalkabra.com` (see `CNAME`).

## Structure

```
/
├── index.html                     Home
├── intelligence/                  Published Morning Intelligence dashboard
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
- Command palette: press `/` anywhere to search pages, Morning Intelligence, essays, and links.
- Keyboard shortcuts: `?` help, `t` theme, `n` nav, `g h/i/e/p/r/l` go-to,
  arrow keys through filters, essays, and results.
- Essay filtering by topic (All / Business / Technology / Manufacturing / Philosophy).
- Collapsible reading notes.
- Substack newsletter sign-up.
- GoatCounter view counter (bottom-right).
- Fully responsive (laptop → phone) with reduced-motion support.

## Editing content

The main-site pages are generated from `build.py` in the repo root. Edit that
source of truth and invoke it as `python path/to/build.py`; it resolves the output
directory relative to the script, not the current shell directory. The generator
writes only its named main-site pages and does not overwrite the published
`/intelligence/` app.

## Local preview

Because links are root-absolute (`/essays/`, `/assets/...`), preview with a
local server rather than opening files directly:

```
python3 -m http.server 8000
# then open http://localhost:8000
```
