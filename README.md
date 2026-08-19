# Kunal Kabra — working notebook

Source and published output for [kunalkabra.com](https://kunalkabra.com).

## Structure

- `site-app/` — React/Vite source for the personal website.
- `public/` — static source files copied into the main-site build.
- `intelligence-app/` — maintainable Morning Intelligence source.
- `intelligence/` — committed Morning Intelligence production bundle.
- Root HTML, `assets/`, and canonical route folders — deterministic GitHub Pages output generated from `site-app/`.
- `/resume/` — unlisted, noindex route to the approved résumé PDF. It is intentionally absent from navigation, search, and the sitemap.

Morning Intelligence is preserved as a quiet footer utility; essays, problems, notes, books, and authored beliefs remain the site's primary hierarchy.

## Local development

```powershell
npm ci
npm run dev -- --port 4174
```

The Vite server includes local handling for `/resume/` and the committed `/intelligence/` app.

For a production-faithful preview:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4175
```

## Validate and export

```powershell
npm test
npm run validate:pages
```

`validate:pages` builds the app, generates physical route shells with route-specific SEO metadata, exports only the managed GitHub Pages paths to the repository root, and verifies the résumé, CNAME, Intelligence utility, redirects, and output parity. Do not hand-edit generated root HTML or `assets/`; edit `site-app/` or `public/` and re-export.

GitHub Pages continues to publish from `main` at the repository root, so no Pages or DNS setting change is required.
