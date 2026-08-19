# Morning Intelligence publishing

The public app lives at `/intelligence/`. Its maintainable source is in
`intelligence-app/`, while the static bundle served by the website is committed
under root `intelligence/` for the existing branch-backed GitHub Pages setup.

Daily publication deliberately copies only two artifacts from the private Daily
Brief workspace:

- `app/data.ts` to `intelligence-app/src/data.ts`
- `public/og.png` to `intelligence-app/public/og.png`

Newspaper PDFs, research notes, caches, logs, credentials, databases, and other
working material must never enter the website repository.

## Publish an edition

Start from a clean, synchronized `main` checkout of
`https://github.com/KabraKunal/KunalKabra`. Complete and review the Daily Brief
flow first, then run the publisher from the website repository:

```powershell
pwsh -File .\scripts\publish-intelligence.ps1 `
  -SourcePath "C:\path\to\Daily Brief"
```

That command validates the source, installs locked dependencies, runs the app
tests and build, inspects the generated public bundle, and creates a local commit
with the deterministic message `Publish Morning Intelligence: YYYY-MM-DD`. It
does not push.

After confirming the first local run, publish and push in one guarded operation:

```powershell
pwsh -File .\scripts\publish-intelligence.ps1 `
  -SourcePath "C:\path\to\Daily Brief" `
  -Push
```

`-Push` targets `origin/main` explicitly. Without that switch the script never
contacts GitHub to push.

## What the publisher verifies

Before changing anything, the script requires:

- the `KabraKunal/KunalKabra` GitHub remote;
- the `main` branch tracking `origin/main`, freshly fetched with no ahead/behind commits;
- a completely clean worktree and index;
- a source workspace outside the public website repository;
- a populated edition with all app sections and a parseable edition date;
- an edition date equal to the current calendar date in Asia/Kolkata;
- a valid PNG social image and no placeholder or credential-like text.

After copying the two allowed inputs, it runs `npm ci`, `npm test`, and
`npm run build` in `intelligence-app`. It then requires
`intelligence/index.html`, rejects raw document, research, cache, database,
source-map, and secret artifacts, and refuses any diff outside this allowlist:

- `intelligence-app/src/data.ts`
- `intelligence-app/public/og.png`
- `intelligence/**`

Only those paths are passed to `git add`. If nothing changed, no commit is
created. If validation fails before a commit, the publisher restores its allowed
tracked paths and removes its untracked generated files; it never stages or
pushes the failed edition. Any unexpected path left by a failed build is kept for
inspection rather than deleted silently.

If the commit succeeds but the push fails, the local commit is intentionally
retained. Resolve the authentication or remote issue, verify `git status`, and
push it explicitly with:

```powershell
git push origin main
```

## Daily-flow integration

Make the publisher the final step of the Daily Brief flow, after edition data and
the OG image have passed their own review. Use `-Push` only for the scheduled
production run; use the no-push form while testing changes to the flow.

GitHub Actions runs the same app tests and build for relevant pull requests and
pushes. It also verifies that the committed `intelligence/` bundle matches the app
source and that no private document type has entered the public bundle.
