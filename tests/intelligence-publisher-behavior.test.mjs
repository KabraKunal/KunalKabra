import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  appendFileSync,
  chmodSync,
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(here, "..");
const publisherSource = path.join(repositoryRoot, "scripts", "publish-intelligence.ps1");
const isWindows = process.platform === "win32";
const pathKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH";

function findExecutable(command) {
  const probe = spawnSync(isWindows ? "where.exe" : "which", [command], {
    encoding: "utf8",
    windowsHide: true,
  });
  assert.equal(probe.status, 0, `could not find ${command}: ${probe.stderr || probe.stdout}`);
  return probe.stdout.split(/\r?\n/).find(Boolean).trim();
}

const realGit = findExecutable("git");
const powerShell = isWindows ? "powershell.exe" : "pwsh";
findExecutable(powerShell);

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env ?? process.env,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  return result;
}

function mustRun(command, args, options = {}) {
  const result = run(command, args, options);
  assert.equal(
    result.status,
    0,
    `${command} ${args.join(" ")} failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );
  return result.stdout.trim();
}

function git(repository, ...args) {
  return mustRun(realGit, ["-c", `safe.directory=${repository}`, "-C", repository, ...args]);
}

function gitResult(repository, ...args) {
  return run(realGit, ["-c", `safe.directory=${repository}`, "-C", repository, ...args]);
}

function bareGit(origin, ...args) {
  return mustRun(realGit, ["--git-dir", origin, ...args]);
}

function bareRefExists(origin, ref) {
  return run(realGit, ["--git-dir", origin, "show-ref", "--verify", "--quiet", ref]).status === 0;
}

function indiaEdition() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    iso: `${parts.year}-${parts.month}-${parts.day}`,
    label: `${Number(parts.day)} ${months[Number(parts.month) - 1]} ${parts.year}`,
  };
}

function editionData(dateLabel, version) {
  const padding = (
    "Independent evidence is separated from interpretation, source lineage is explicit, and each signal is retained only when it changes a decision. "
  ).repeat(24);
  return `export const tabs = [
  "TODAY",
  "MARKETS & MACRO",
  "INDIA",
  "COMPANIES",
  "AI & TECHNOLOGY",
  "ENERGY & GEOPOLITICS",
  "SINCE PRINT",
  "WATCHLIST",
  "DEEP READS",
];

export const edition = {
  dateLabel: "${dateLabel}",
  sourceLabel: "FT + WSJ + Business Standard + Mint + bounded web checks",
  snapshotLabel: "Published snapshot for guarded behavior validation",
  bottomLine: "Version ${version} proves that the publisher moves only reviewed Intelligence artifacts.",
};

export const stories = [
  {
    headline: "Rates signal one",
    summary: "Material policy evidence with a defined next trigger.",
  },
  {
    headline: "India signal two",
    summary: "A domestic market development with explicit provenance.",
  },
  {
    headline: "Company signal three",
    summary: "A capital-allocation decision with durable implications.",
  },
  {
    headline: "Technology signal four",
    summary: "An infrastructure constraint with measurable economics.",
  },
  {
    headline: "Energy signal five",
    summary: "A supply-chain shift with price and currency consequences.",
  },
  {
    headline: "Trade signal six",
    summary: "A policy change whose implementation remains observable.",
  },
  {
    headline: "Market signal seven",
    summary: "A cross-asset move connected to a primary catalyst.",
  },
];

export const sectionGuides = {
  today: "The seven highest-value decisions",
  india: "Domestic policy, markets, and companies",
};
export const macroPulse = [{ label: "Rates", value: "Stable", driver: "Validated evidence" }];
export const sincePrint = [{ headline: "Incremental development", summary: "A bounded post-print change." }];
export const watchlist = [{ theme: "Policy path", status: "NO MATERIAL CHANGE", evidence: "Version ${version}" }];
export const deepReads = [{ title: "Decision architecture", source: "Primary source", rationale: "Worth ten minutes" }];
export const methodology = ${JSON.stringify(padding)};
`;
}

function pngBytes(version = 0) {
  const bytes = Buffer.alloc(2048, 0);
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(bytes);
  bytes[8] = version;
  return bytes;
}

function writeBundle(publicRepository, dataText, ogBytes) {
  const output = path.join(publicRepository, "intelligence");
  rmSync(output, { recursive: true, force: true });
  mkdirSync(path.join(output, "assets"), { recursive: true });
  const fingerprint = createHash("sha256").update(dataText).update(ogBytes).digest("hex");
  writeFileSync(path.join(output, "index.html"), "<!doctype html><title>Morning Intelligence</title>\n");
  writeFileSync(path.join(output, "assets", "intelligence.js"), `export const fingerprint = "${fingerprint}";\n`);
  writeFileSync(path.join(output, "assets", "intelligence.css"), ":root { color: #222; }\n");
  writeFileSync(path.join(output, "og.png"), ogBytes);
}

function shellQuote(value) {
  return `'${value.replaceAll("'", `'\\''`)}'`;
}

function writeLauncher(binDirectory, name, scriptPath) {
  if (isWindows) {
    const launcher = path.join(binDirectory, `${name}.cmd`);
    writeFileSync(
      launcher,
      `@echo off\r\n"${process.execPath}" "${scriptPath}" %*\r\nexit /b %ERRORLEVEL%\r\n`,
    );
    return launcher;
  }

  const launcher = path.join(binDirectory, name);
  writeFileSync(
    launcher,
    `#!/bin/sh\nexec ${shellQuote(process.execPath)} ${shellQuote(scriptPath)} "$@"\n`,
  );
  chmodSync(launcher, 0o755);
  return launcher;
}

function writeShims(fixtureRoot) {
  const binDirectory = path.join(fixtureRoot, "fake-bin");
  mkdirSync(binDirectory, { recursive: true });

  const gitShimScript = path.join(binDirectory, "fake-git.mjs");
  writeFileSync(
    gitShimScript,
    `import { appendFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
if (process.env.FAKE_GIT_LOG) appendFileSync(process.env.FAKE_GIT_LOG, JSON.stringify(args) + "\\n");
const remoteIndex = args.findIndex((value, index) => value === "remote" && args[index + 1] === "get-url" && args[index + 2] === "origin");
if (remoteIndex >= 0) {
  process.stdout.write("https://github.com/KabraKunal/KunalKabra.git\\n");
  process.exit(0);
}
if (process.env.FAKE_GIT_FAIL_PUSH === "1" && args.includes("push")) {
  process.stderr.write("intentional publisher push failure\\n");
  process.exit(41);
}
const child = spawnSync(process.env.REAL_GIT_PATH, args, { stdio: "inherit", env: process.env });
if (child.error) throw child.error;
process.exit(child.status ?? 1);
`,
  );

  const npmShimScript = path.join(binDirectory, "fake-npm.mjs");
  writeFileSync(
    npmShimScript,
    `import { createHash } from "node:crypto";
import { appendFileSync, copyFileSync, mkdirSync, readFileSync, renameSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
if (process.env.FAKE_NPM_LOG) appendFileSync(process.env.FAKE_NPM_LOG, JSON.stringify(args) + "\\n");
const mode = process.env.FAKE_NPM_MODE ?? "normal";
if (mode === "fail-test" && args[0] === "test") {
  process.stderr.write("intentional npm test failure\\n");
  process.exit(23);
}

function git(...gitArgs) {
  const child = spawnSync(process.env.REAL_GIT_PATH, gitArgs, { encoding: "utf8", env: process.env });
  if (child.error) throw child.error;
  if (child.status !== 0) throw new Error(child.stderr || child.stdout || "git command failed");
}

if (args[0] === "run" && args[1] === "build") {
  const appRoot = process.cwd();
  const repositoryRoot = path.resolve(appRoot, "..");

  if (mode === "advance-main") {
    const advancer = process.env.ADVANCER_REPOSITORY;
    appendFileSync(path.join(advancer, "main-site-race.txt"), "main advanced during build\\n");
    git("-C", advancer, "add", "main-site-race.txt");
    git("-C", advancer, "commit", "-m", "Advance main during publisher build");
    git("-C", advancer, "push", "origin", "HEAD:refs/heads/main");
  } else if (mode === "protected-modify") {
    writeFileSync(path.join(repositoryRoot, "site-app", "protected.txt"), "mutated by build\\n");
  } else if (mode === "protected-delete") {
    unlinkSync(path.join(repositoryRoot, "index.html"));
  } else if (mode === "protected-rename") {
    renameSync(
      path.join(repositoryRoot, "site-app", "protected.txt"),
      path.join(repositoryRoot, "site-app", "renamed.txt"),
    );
  }

  const data = readFileSync(path.join(appRoot, "src", "data.ts"));
  const og = readFileSync(path.join(appRoot, "public", "og.png"));
  const output = path.join(repositoryRoot, "intelligence");
  rmSync(output, { recursive: true, force: true });
  mkdirSync(path.join(output, "assets"), { recursive: true });
  const fingerprint = createHash("sha256").update(data).update(og).digest("hex");
  writeFileSync(path.join(output, "index.html"), "<!doctype html><title>Morning Intelligence</title>\\n");
  writeFileSync(path.join(output, "assets", "intelligence.js"), 'export const fingerprint = "' + fingerprint + '";\\n');
  writeFileSync(path.join(output, "assets", "intelligence.css"), ":root { color: #222; }\\n");
  copyFileSync(path.join(appRoot, "public", "og.png"), path.join(output, "og.png"));
}
`,
  );

  writeLauncher(binDirectory, "git", gitShimScript);
  writeLauncher(binDirectory, "npm", npmShimScript);
  return binDirectory;
}

function createFixture(t, { mode = "normal", sourceVersion = "updated", name = "case" } = {}) {
  const fixtureRoot = mkdtempSync(path.join(tmpdir(), "intelligence-publisher-"));
  t.after(() => rmSync(fixtureRoot, { recursive: true, force: true }));

  const edition = indiaEdition();
  const publicRepository = path.join(fixtureRoot, "public-repository");
  const sourceRepository = path.join(fixtureRoot, "private-source");
  const origin = path.join(fixtureRoot, "origin.git");
  const advancer = path.join(fixtureRoot, "advancer");
  const gitLog = path.join(fixtureRoot, "git-commands.jsonl");
  const npmLog = path.join(fixtureRoot, "npm-commands.jsonl");

  mkdirSync(path.join(publicRepository, "scripts"), { recursive: true });
  mkdirSync(path.join(publicRepository, "intelligence-app", "src"), { recursive: true });
  mkdirSync(path.join(publicRepository, "intelligence-app", "public"), { recursive: true });
  mkdirSync(path.join(publicRepository, "site-app"), { recursive: true });
  mkdirSync(path.join(sourceRepository, "app"), { recursive: true });
  mkdirSync(path.join(sourceRepository, "public"), { recursive: true });

  const baselineData = editionData(edition.label, "baseline");
  const baselineOg = pngBytes(0);
  assert.ok(Buffer.byteLength(baselineData) > 2000);
  copyFileSync(publisherSource, path.join(publicRepository, "scripts", "publish-intelligence.ps1"));
  writeFileSync(path.join(publicRepository, "intelligence-app", "package.json"), '{"private":true}\n');
  writeFileSync(path.join(publicRepository, "intelligence-app", "src", "data.ts"), baselineData);
  writeFileSync(path.join(publicRepository, "intelligence-app", "public", "og.png"), baselineOg);
  writeFileSync(path.join(publicRepository, "site-app", "protected.txt"), "protected main-site content\n");
  writeFileSync(path.join(publicRepository, "index.html"), "<!doctype html><title>Main site</title>\n");
  writeFileSync(path.join(publicRepository, "main-site-race.txt"), "initial main\n");
  writeBundle(publicRepository, baselineData, baselineOg);

  mustRun(realGit, ["init", publicRepository]);
  git(publicRepository, "config", "user.name", "Publisher Test");
  git(publicRepository, "config", "user.email", "publisher-test@invalid.local");
  git(publicRepository, "config", "core.autocrlf", "false");
  git(publicRepository, "checkout", "-b", "main");
  git(publicRepository, "add", "--all");
  git(publicRepository, "commit", "-m", "Initial public main");

  mustRun(realGit, ["init", "--bare", origin]);
  git(publicRepository, "remote", "add", "origin", origin);
  git(publicRepository, "push", "--set-upstream", "origin", "main");
  bareGit(origin, "symbolic-ref", "HEAD", "refs/heads/main");

  mustRun(realGit, ["clone", origin, advancer]);
  git(advancer, "config", "user.name", "Main Advancer");
  git(advancer, "config", "user.email", "main-advancer@invalid.local");
  git(advancer, "config", "core.autocrlf", "false");

  const sourceData = editionData(edition.label, sourceVersion);
  writeFileSync(path.join(sourceRepository, "app", "data.ts"), sourceData);
  writeFileSync(path.join(sourceRepository, "public", "og.png"), baselineOg);

  const baseCommit = git(publicRepository, "rev-parse", "origin/main");
  const branch = `codex/morning-intelligence-${edition.iso}-${name}`;
  git(publicRepository, "switch", "--create", branch, "origin/main");

  const fakeBin = writeShims(fixtureRoot);
  const environment = {
    ...process.env,
    [pathKey]: `${fakeBin}${path.delimiter}${process.env[pathKey] ?? ""}`,
    REAL_GIT_PATH: realGit,
    FAKE_GIT_LOG: gitLog,
    FAKE_NPM_LOG: npmLog,
    FAKE_NPM_MODE: mode,
    ADVANCER_REPOSITORY: advancer,
  };

  return {
    advancer,
    baseCommit,
    branch,
    edition,
    environment,
    gitLog,
    mode,
    npmLog,
    origin,
    publicRepository,
    sourceRepository,
  };
}

function runPublisher(fixture, { push = true, failPush = false, expectedBase = fixture.baseCommit } = {}) {
  const args = ["-NoProfile"];
  if (isWindows) args.push("-ExecutionPolicy", "Bypass");
  args.push(
    "-File",
    path.join(fixture.publicRepository, "scripts", "publish-intelligence.ps1"),
    "-SourcePath",
    fixture.sourceRepository,
    "-ExpectedBaseCommit",
    expectedBase,
  );
  if (push) args.push("-Push");
  return run(powerShell, args, {
    cwd: fixture.publicRepository,
    env: {
      ...fixture.environment,
      FAKE_GIT_FAIL_PUSH: failPush ? "1" : "0",
    },
  });
}

function outputOf(result) {
  return `${result.stdout}\n${result.stderr}`;
}

function loggedGitCommands(fixture) {
  if (!bareRefExists(fixture.origin, "refs/heads/main")) return [];
  const text = readFileSync(fixture.gitLog, "utf8").trim();
  return text ? text.split(/\r?\n/).map((line) => JSON.parse(line)) : [];
}

function publicationPushes(fixture) {
  return loggedGitCommands(fixture).filter((args) => args.includes("push"));
}

function assertRemoteBranchMissing(fixture) {
  assert.equal(bareRefExists(fixture.origin, `refs/heads/${fixture.branch}`), false);
}

function assertAllowedCommitDiff(fixture, head = "HEAD") {
  const paths = git(fixture.publicRepository, "diff", "--no-renames", "--name-only", `${fixture.baseCommit}...${head}`)
    .split(/\r?\n/)
    .filter(Boolean);
  assert.ok(paths.length > 0, "expected a publication diff");
  for (const changedPath of paths) {
    assert.match(
      changedPath,
      /^(intelligence-app\/src\/data\.ts|intelligence-app\/public\/og\.png|intelligence\/)/,
      `unexpected committed path: ${changedPath}`,
    );
  }
  return paths;
}

test("successful push creates only the dated PR branch and preserves main", async (t) => {
  const fixture = createFixture(t, { name: "success", sourceVersion: "successful-publication" });
  const protectedBefore = readFileSync(path.join(fixture.publicRepository, "site-app", "protected.txt"));
  const result = runPublisher(fixture);

  assert.equal(result.status, 0, outputOf(result));
  assert.match(result.stdout, new RegExp(`PULL_REQUEST_HEAD=${fixture.branch.replaceAll("/", "\\/")}`));
  assert.equal(bareGit(fixture.origin, "rev-parse", "refs/heads/main"), fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "rev-parse", "refs/heads/main"), fixture.baseCommit);
  const remoteHead = bareGit(fixture.origin, "rev-parse", `refs/heads/${fixture.branch}`);
  assert.notEqual(remoteHead, fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "branch", "--show-current"), fixture.branch);
  assert.equal(git(fixture.publicRepository, "status", "--porcelain=v1", "--untracked-files=all"), "");
  assert.deepEqual(readFileSync(path.join(fixture.publicRepository, "site-app", "protected.txt")), protectedBefore);
  assertAllowedCommitDiff(fixture, remoteHead);

  const pushes = publicationPushes(fixture);
  assert.equal(pushes.length, 1, JSON.stringify(pushes));
  assert.ok(pushes[0].includes(`HEAD:refs/heads/${fixture.branch}`));
  assert.equal(pushes.some((args) => args.some((arg) => arg === "main" || arg.endsWith("refs/heads/main"))), false);
});

test("origin/main advancing during the build aborts before commit or branch push", async (t) => {
  const fixture = createFixture(t, { mode: "advance-main", name: "race", sourceVersion: "race-candidate" });
  const result = runPublisher(fixture);

  assert.notEqual(result.status, 0, "publisher unexpectedly succeeded");
  assert.match(outputOf(result), /origin\/main advanced[\s\S]*during[\s\S]*the build/i);
  assert.notEqual(bareGit(fixture.origin, "rev-parse", "refs/heads/main"), fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "rev-parse", "HEAD"), fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "status", "--porcelain=v1", "--untracked-files=all"), "");
  assertRemoteBranchMissing(fixture);
  assert.equal(publicationPushes(fixture).length, 0);
});

for (const [mode, expectedPath] of [
  ["protected-modify", "site-app/protected.txt"],
  ["protected-delete", "index.html"],
  ["protected-rename", "site-app/protected.txt"],
]) {
  test(`${mode} is rejected without committing or pushing protected main-site paths`, async (t) => {
    const fixture = createFixture(t, { mode, name: mode, sourceVersion: mode });
    const result = runPublisher(fixture);

    assert.notEqual(result.status, 0, "publisher unexpectedly succeeded");
    assert.match(outputOf(result), /outside the publishing allowlist/i);
    assert.equal(git(fixture.publicRepository, "rev-parse", "HEAD"), fixture.baseCommit);
    assert.equal(bareGit(fixture.origin, "rev-parse", "refs/heads/main"), fixture.baseCommit);
    assertRemoteBranchMissing(fixture);
    assert.equal(publicationPushes(fixture).length, 0);

    const changed = git(fixture.publicRepository, "status", "--porcelain=v1", "--untracked-files=all");
    assert.match(changed, new RegExp(expectedPath.replaceAll("/", "[/\\\\]")));
    const allowedResidue = git(
      fixture.publicRepository,
      "status",
      "--porcelain=v1",
      "--untracked-files=all",
      "--",
      "intelligence-app/src/data.ts",
      "intelligence-app/public/og.png",
      "intelligence",
    );
    assert.equal(allowedResidue, "", `publisher-owned paths were not restored:\n${allowedResidue}`);
  });
}

test("no-op edition exits cleanly without a commit or remote branch", async (t) => {
  const fixture = createFixture(t, { name: "noop", sourceVersion: "baseline" });
  const result = runPublisher(fixture);

  assert.equal(result.status, 0, outputOf(result));
  assert.match(result.stdout, /already current; no commit or push was needed/i);
  assert.equal(git(fixture.publicRepository, "rev-parse", "HEAD"), fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "status", "--porcelain=v1", "--untracked-files=all"), "");
  assertRemoteBranchMissing(fixture);
  assert.equal(publicationPushes(fixture).length, 0);
});

test("pre-commit npm failure restores publisher-owned paths and leaves refs untouched", async (t) => {
  const fixture = createFixture(t, { mode: "fail-test", name: "precommit", sourceVersion: "precommit-failure" });
  const result = runPublisher(fixture);

  assert.notEqual(result.status, 0, "publisher unexpectedly succeeded");
  assert.match(outputOf(result), /npm test failed with exit code 23/i);
  assert.equal(git(fixture.publicRepository, "rev-parse", "HEAD"), fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "status", "--porcelain=v1", "--untracked-files=all"), "");
  assert.equal(bareGit(fixture.origin, "rev-parse", "refs/heads/main"), fixture.baseCommit);
  assertRemoteBranchMissing(fixture);
  assert.equal(publicationPushes(fixture).length, 0);
});

test("post-commit push failure retains a clean diagnostic commit only on the local PR branch", async (t) => {
  const fixture = createFixture(t, { name: "pushfail", sourceVersion: "postcommit-failure" });
  const result = runPublisher(fixture, { failPush: true });

  assert.notEqual(result.status, 0, "publisher unexpectedly succeeded");
  assert.match(outputOf(result), /intentional publisher push failure/i);
  const localHead = git(fixture.publicRepository, "rev-parse", "HEAD");
  assert.notEqual(localHead, fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "rev-parse", "refs/heads/main"), fixture.baseCommit);
  assert.equal(bareGit(fixture.origin, "rev-parse", "refs/heads/main"), fixture.baseCommit);
  assert.equal(git(fixture.publicRepository, "branch", "--show-current"), fixture.branch);
  assert.equal(git(fixture.publicRepository, "status", "--porcelain=v1", "--untracked-files=all"), "");
  assertRemoteBranchMissing(fixture);
  assertAllowedCommitDiff(fixture, localHead);

  const pushes = publicationPushes(fixture);
  assert.equal(pushes.length, 1, JSON.stringify(pushes));
  assert.ok(pushes[0].includes(`HEAD:refs/heads/${fixture.branch}`));
  assert.equal(pushes[0].some((arg) => arg === "main" || arg.endsWith("refs/heads/main")), false);
});
