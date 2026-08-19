import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(here, "../../intelligence");
const repositoryRoot = path.resolve(here, "../..");

const read = (relativePath) => readFile(path.join(output, relativePath), "utf8");

test("the public Intelligence bundle is complete and subpath-safe", async () => {
  const [html, javascript, css] = await Promise.all([
    read("index.html"),
    read("assets/intelligence.js"),
    read("assets/intelligence.css"),
  ]);

  assert.match(html, /<title>Morning Intelligence \| Kunal Kabra<\/title>/);
  assert.match(html, /https:\/\/kunalkabra\.com\/intelligence\//);
  assert.match(html, /\/intelligence\/assets\/intelligence\.js/);
  assert.match(html, /\/intelligence\/assets\/intelligence\.css/);
  assert.match(html, /\/intelligence\/og\.png/);

  for (const requiredLabel of [
    "TODAY",
    "MARKETS & MACRO",
    "INDIA",
    "COMPANIES",
    "AI & TECHNOLOGY",
    "ENERGY & GEOPOLITICS",
    "SINCE PRINT",
    "WATCHLIST",
    "DEEP READS",
  ]) {
    assert.ok(javascript.includes(requiredLabel), `missing tab label: ${requiredLabel}`);
  }

  assert.ok(javascript.includes("7 Things That Matter Today"));
  assert.ok(javascript.includes("PRINT FACT"));
  assert.ok(javascript.includes("Published snapshot"));
  assert.ok(css.includes("--navy:"));
  assert.ok(css.includes(".brief-card-lead"));
  assert.ok(css.includes("prefers-reduced-motion:reduce"));
});

test("the publisher is PR-only and protects the rest of the site", async () => {
  const [publisher, workflow] = await Promise.all([
    readFile(path.join(repositoryRoot, "scripts/publish-intelligence.ps1"), "utf8"),
    readFile(path.join(repositoryRoot, ".github/workflows/intelligence-validation.yml"), "utf8"),
  ]);

  assert.match(publisher, /ExpectedBaseCommit/);
  assert.match(publisher, /PublicationBranchPrefix\s*=\s*"codex\/morning-intelligence-"/);
  assert.match(publisher, /Assert-BaseBranchUnchanged/);
  assert.match(publisher, /Assert-CommitDiffAllowlist/);
  assert.match(publisher, /diff", "--no-renames", "--name-only"/);
  assert.match(publisher, /PULL_REQUEST_HEAD=/);
  assert.match(publisher, /HEAD:refs\/heads\/\$\(\$script:PublicationBranch\)/);
  assert.doesNotMatch(publisher, /HEAD:refs\/heads\/main/);

  assert.match(workflow, /startsWith\(github\.head_ref, 'codex\/morning-intelligence-'\)/);
  assert.doesNotMatch(workflow, /pull_request:\s*\n\s+paths:/);
  assert.match(workflow, /github\.event\.pull_request\.base\.sha/);
  assert.match(workflow, /github\.event\.pull_request\.head\.sha/);
  assert.match(workflow, /git diff --no-renames --name-only/);
  assert.match(workflow, /node --test tests\/intelligence-publisher-behavior\.test\.mjs/);
  assert.match(workflow, /intelligence-app\/src\/data\\\.ts/);
  assert.match(workflow, /intelligence-app\/public\/og\\\.png/);
});
