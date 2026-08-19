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

Start from a clean `codex/morning-intelligence-YYYY-MM-DD-*` branch created from
the exact latest `origin/main` commit of
`https://github.com/KabraKunal/KunalKabra`. Complete and review the Daily Brief
flow first, then run the publisher from that branch:

```powershell
pwsh -File .\scripts\publish-intelligence.ps1 `
  -SourcePath "C:\path\to\Daily Brief" `
  -ExpectedBaseCommit "<40-character origin/main SHA>"
```

That command validates the source, installs locked dependencies, runs the app
tests and build, inspects the generated public bundle, and creates a local commit
with the deterministic message `Publish Morning Intelligence: YYYY-MM-DD`. It
does not push.

For the production preparation run, start a fresh dated branch from the current
`origin/main` and publish and push in one guarded operation:

```powershell
pwsh -File .\scripts\publish-intelligence.ps1 `
  -SourcePath "C:\path\to\Daily Brief" `
  -ExpectedBaseCommit "<40-character origin/main SHA>" `
  -Push
```

`-Push` pushes only the checked-out dated PR branch. The publisher never updates
`origin/main`. Without that switch it never contacts GitHub to push.

A no-push run creates a local diagnostic commit for inspection. Do not invoke
the publisher a second time on that now-ahead branch; the guarded production run
must use a new dated branch from the then-current `origin/main` so its base and
race checks remain meaningful.

## What the publisher verifies

Before changing anything, the script requires:

- the `KabraKunal/KunalKabra` GitHub remote;
- a dated `codex/morning-intelligence-*` PR branch whose `HEAD` exactly equals
  the supplied, freshly fetched `origin/main` base commit before publication;
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

The publisher re-fetches `origin/main` after the build and immediately before
branch push. If the base changed, it aborts rather than creating a stale-base PR.
It also validates the complete base-to-commit diff against the same allowlist.

If the commit succeeds but the branch push fails, the local commit is
intentionally retained. Resolve authentication, verify `git status`, and push
only that PR branch; never substitute `main`:

```powershell
git push --set-upstream origin HEAD
```

## Daily-flow integration

Make the publisher the branch-preparation step after edition data and the OG
image have passed review. The caller must then open a PR against `main`, verify
that the complete PR diff is confined to the allowlist, wait for required checks,
merge, and separately verify the live GitHub Pages bundle. A pushed branch or
open PR is not yet published.

GitHub Actions runs the same app tests and build for relevant pull requests and
pushes. It also verifies that the committed `intelligence/` bundle matches the app
source and that no private document type has entered the public bundle.
