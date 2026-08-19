# Feature parity audit

Audit date: 19 August 2026
Reference: `KabraKunal/KunalKabra` `main` at `6123e975c1a9ced28e32c991cdbebbf3ed6cbf81`

The working-notebook redesign retains the previous site's user-facing behavior while changing its visual system and information architecture. This audit describes the release candidate prepared for review; deployment still occurs only after the pull request is merged.

| Previous feature | Local redesign status | Implementation |
| --- | --- | --- |
| Hidden résumé URL | Preserved | `/resume` redirects into the browser's PDF reader with the exact attached file. It is excluded from navigation, search, and the sitemap, and is marked `noindex`. |
| Morning Intelligence | Preserved in full | `/intelligence/` contains the complete app with Today, Markets & Macro, India, Companies, AI & Technology, Energy & Geopolitics, Since Print, Watchlist, and Deep Reads. It remains a quiet footer utility. |
| Daily Intelligence publishing | Preserved | Maintainable source, locked dependencies, tests, public-bundle build, guarded PowerShell publisher, and GitHub validation workflow are included locally. |
| Essays and essay detail routes | Preserved and expanded | Canonical routes live under `/writing`; the archive now contains five essays, including two source-backed strategic pieces on procurement and the AI stack. Old `/essays` paths still redirect without breaking shared links. |
| Problems/projects | Preserved | `/problems` is canonical; `/projects` redirects to it. |
| Learning notes | Preserved and promoted to a full archive | `/notes` is searchable and reachable through the chapter rail and shortcuts; the old learning-notes URL redirects. |
| Reading shelf | Preserved | Book notes, expandable details, and keyboard movement remain available. |
| About, beliefs, contact | Preserved | Biography, timeline, beliefs, email, and LinkedIn are retained in the redesigned hierarchy. |
| Newsletter | Preserved | The form submits directly to Kunal's Substack in a new tab from Home, Writing, and every essay; there is no mock success state. |
| Site search | Preserved and expanded | Search covers pages, essays, problems, notes, books, beliefs, Morning Intelligence, email, and LinkedIn. Résumé is intentionally excluded. |
| Keyboard navigation | Preserved and expanded | `/`, `?`, `t`, `n`, arrows, Home/End, Escape, and `g` route chords are documented in an accessible shortcut guide. |
| Theme | Preserved | Light/dark mode honors the legacy `theme` key, the new key, and system preference before paint. |
| View counter | Preserved safely | GoatCounter total views appear only on the production domain; local development makes no analytics request. |
| Not-found experience | Preserved | Unknown routes retain the notebook header, navigation, search, theme control, shortcuts, utilities, and production view counter. |
| SEO and hosting files | Preserved | Canonical/OG metadata, route-aware titles/descriptions, `CNAME`, `robots.txt`, `sitemap.xml`, and a GitHub Pages-compatible `404.html` are included. |

## Validation

- Main production build and parity suite: 7/7 passing.
- Morning Intelligence build and smoke suite: 1/1 passing.
- Browser captures: 19 desktop/mobile views, including both new essays at 1440 px and 390 px; all HTTP 200.
- Morning Intelligence: all nine hash routes select the correct tab and panel.
- Résumé asset: HTTP 200, `application/pdf`, 280,138 bytes, SHA-256 `8FABD63256EA70337584D2DCDF560A3F312FBB3FD982EA5F5A6EA5F3CFF1CBB7`.
- Browser console errors: 0. Failed network requests: 0.
- Document-level horizontal overflow: 0. The mobile chapter rail is intentionally horizontally scrollable.
- Newsletter reach: Home, Writing, and essay-detail forms all point to the production Substack endpoint and require a valid email.
- Unknown-route shell: header, Search, Theme, and Utilities are present at desktop and mobile widths.

## Privacy note

The résumé route is unlisted, not private. Search engines are instructed not to index it, but anyone who knows or receives `kunalkabra.com/resume` can open the PDF.

## Deployment model

The maintainable personal-site source lives under `site-app/`. `npm run validate:pages` builds to `dist/client/`, creates physical HTML shells for every canonical route, and exports an allowlisted set of production files to the repository root. Morning Intelligence and its publisher remain on their established root paths. GitHub Pages therefore continues to publish from `main` without a hosting or DNS configuration change.
