#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { essays } from "../site-app/src/content.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(repoRoot, "dist", "client");
const baseIndexPath = path.join(distRoot, "index.html");

if (!existsSync(baseIndexPath)) {
  throw new Error("Missing dist/client/index.html. Run Vite before preparing the Pages bundle.");
}

const routeMetadata = [
  {
    path: "/writing/",
    title: "Writing — Kunal Kabra",
    description: "Essays on business, technology, manufacturing, strategy, and philosophy.",
  },
  {
    path: "/problems/",
    title: "Problems — Kunal Kabra",
    description: "Open questions, constraints, and working hypotheses on rural productivity and energy independence.",
  },
  {
    path: "/notes/",
    title: "Learning notes — Kunal Kabra",
    description: "Working notes from what Kunal Kabra is studying and trying to understand.",
  },
  {
    path: "/reading/",
    title: "Reading — Kunal Kabra",
    description: "Books and resources that shaped how Kunal Kabra thinks.",
  },
  {
    path: "/about/",
    title: "About — Kunal Kabra",
    description: "Kunal Kabra's background, path, working beliefs, and contact details.",
  },
  ...essays.map((essay) => ({
    path: `/writing/${essay.slug}/`,
    title: `${essay.title} — Kunal Kabra`,
    description: essay.excerpt,
    type: "article",
  })),
];

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

function createRouteShell(baseHtml, route) {
  const canonical = `https://kunalkabra.com${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const fallback = `<noscript><article><h1>${title.replace(" — Kunal Kabra", "")}</h1><p>${description}</p><p><a href="/">Return to Kunal Kabra's notebook</a></p></article></noscript>`;

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${description}" />`)
    .replace(/<link\s+rel="canonical"[\s\S]*?>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta\s+property="og:type"[\s\S]*?>/i, `<meta property="og:type" content="${route.type || "website"}" />`)
    .replace(/<meta\s+property="og:title"[\s\S]*?>/i, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?>/i, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+property="og:url"[\s\S]*?>/i, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta\s+name="twitter:title"[\s\S]*?>/i, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"[\s\S]*?>/i, `<meta name="twitter:description" content="${description}" />`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

const baseHtml = readFileSync(baseIndexPath, "utf8");
for (const route of routeMetadata) {
  const routeDirectory = path.join(distRoot, ...route.path.split("/").filter(Boolean));
  mkdirSync(routeDirectory, { recursive: true });
  writeFileSync(path.join(routeDirectory, "index.html"), createRouteShell(baseHtml, route), "utf8");
}

const intelligenceSource = path.join(repoRoot, "intelligence");
const intelligenceDestination = path.join(distRoot, "intelligence");
if (!existsSync(path.join(intelligenceSource, "index.html"))) {
  throw new Error("Missing committed Morning Intelligence bundle at intelligence/index.html.");
}
rmSync(intelligenceDestination, { recursive: true, force: true });
cpSync(intelligenceSource, intelligenceDestination, { recursive: true });

writeFileSync(path.join(distRoot, ".nojekyll"), "", "utf8");
console.log(`Prepared ${routeMetadata.length} canonical route shells and the Intelligence utility bundle.`);
