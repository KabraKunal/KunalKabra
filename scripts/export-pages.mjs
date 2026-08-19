#!/usr/bin/env node
import { cpSync, existsSync, lstatSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(repoRoot, "dist", "client");
const managedEntries = [
  ".nojekyll",
  "404.html",
  "CNAME",
  "favicon.svg",
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "about",
  "assets",
  "essays",
  "notes",
  "problems",
  "projects",
  "reading",
  "resume",
  "writing",
];

if (!existsSync(path.join(distRoot, "index.html"))) {
  throw new Error("Missing prepared Pages bundle. Run npm run build first.");
}

for (const entry of managedEntries) {
  const source = path.join(distRoot, entry);
  const destination = path.join(repoRoot, entry);
  if (!existsSync(source)) {
    throw new Error(`Prepared Pages bundle is missing ${entry}.`);
  }
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: lstatSync(source).isDirectory() });
}

console.log(`Exported ${managedEntries.length} managed Pages entries to the repository root.`);
