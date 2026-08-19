#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { essays } from "../site-app/src/content.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(repoRoot, "dist", "client");

const requiredRoutes = [
  "writing",
  "problems",
  "notes",
  "reading",
  "about",
  ...essays.map((essay) => path.join("writing", essay.slug)),
];

for (const route of requiredRoutes) {
  const file = path.join(repoRoot, route, "index.html");
  if (!existsSync(file)) throw new Error(`Missing exported route shell: ${route}/index.html`);
  const html = readFileSync(file, "utf8");
  const canonical = `https://kunalkabra.com/${route.replaceAll("\\", "/")}/`;
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) {
    throw new Error(`Incorrect canonical metadata for ${route}.`);
  }
  if (!html.includes("/assets/site.js")) throw new Error(`Missing compiled app entry for ${route}.`);
}

if (readFileSync(path.join(repoRoot, "CNAME"), "utf8").trim() !== "kunalkabra.com") {
  throw new Error("CNAME must remain exactly kunalkabra.com.");
}

const resume = readFileSync(path.join(repoRoot, "assets", "resume.pdf"));
const resumeHash = createHash("sha256").update(resume).digest("hex").toUpperCase();
if (resume.byteLength !== 280138 || resumeHash !== "8FABD63256EA70337584D2DCDF560A3F312FBB3FD982EA5F5A6EA5F3CFF1CBB7") {
  throw new Error("The deployed résumé PDF no longer matches the approved file.");
}

for (const relative of ["index.html", "assets", "writing", "problems", "notes", "reading", "about", "essays", "projects", "resume"]) {
  const source = path.join(distRoot, relative);
  const destination = path.join(repoRoot, relative);
  const snapshot = (target) => {
    if (statSync(target).isFile()) {
      return createHash("sha256").update(readFileSync(target)).digest("hex");
    }
    return readdirSync(target, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const relativePath = path.relative(target, path.join(entry.parentPath, entry.name));
        const digest = createHash("sha256").update(readFileSync(path.join(target, relativePath))).digest("hex");
        return `${relativePath.replaceAll("\\", "/")}:${digest}`;
      })
      .sort()
      .join("\n");
  };
  if (snapshot(source) !== snapshot(destination)) throw new Error(`Export drift detected in ${relative}.`);
}

const sitemap = readFileSync(path.join(repoRoot, "sitemap.xml"), "utf8");
const searchContent = readFileSync(path.join(repoRoot, "site-app", "src", "content.js"), "utf8");
if (/resume/i.test(sitemap) || /resume/i.test(searchContent)) {
  throw new Error("The unlisted résumé must remain absent from sitemap and search content.");
}

if (!existsSync(path.join(repoRoot, "intelligence", "index.html"))) {
  throw new Error("Morning Intelligence was lost during the main-site export.");
}

console.log(`Verified ${requiredRoutes.length} canonical routes, résumé parity, and deterministic Pages output.`);
