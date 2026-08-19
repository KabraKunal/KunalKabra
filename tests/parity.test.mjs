import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { essays, searchItems } from "../site-app/src/content.js";

const root = new URL("../", import.meta.url);
const readText = (path) => readFile(new URL(path, root), "utf8");

test("preserves the exact unlisted resume asset", async () => {
  const pdf = await readFile(new URL("public/assets/resume.pdf", root));
  const hash = createHash("sha256").update(pdf).digest("hex").toUpperCase();
  assert.equal(pdf.byteLength, 280138);
  assert.equal(hash, "8FABD63256EA70337584D2DCDF560A3F312FBB3FD982EA5F5A6EA5F3CFF1CBB7");

  const [redirect, sitemap, searchContent, robots] = await Promise.all([
    readText("public/resume/index.html"),
    readText("public/sitemap.xml"),
    readText("site-app/src/content.js"),
    readText("public/robots.txt"),
  ]);
  assert.match(redirect, /noindex, nofollow, noarchive/);
  assert.match(redirect, /\/assets\/resume\.pdf/);
  assert.doesNotMatch(sitemap, /resume/i);
  assert.doesNotMatch(searchContent, /resume/i);
  assert.match(robots, /Disallow: \/resume/);
});

test("keeps local Morning Intelligence and legacy route parity", async () => {
  const [app, intelligence, intelligenceSource, sitemap] = await Promise.all([
    readText("site-app/src/App.jsx"),
    readText("intelligence/index.html"),
    readText("intelligence-app/src/App.tsx"),
    readText("public/sitemap.xml"),
  ]);
  assert.match(app, /"\/essays": "\/writing"/);
  assert.match(app, /"\/projects": "\/problems"/);
  assert.match(app, /"\/essays\/learning-notes": "\/notes"/);
  assert.match(app, /href="\/intelligence\/#today"/);
  assert.match(intelligence, /Morning Intelligence/i);
  for (const hash of [
    "today",
    "markets-macro",
    "india",
    "companies",
    "ai-technology",
    "energy-geopolitics",
    "since-print",
    "watchlist",
    "deep-reads",
  ]) {
    assert.match(intelligenceSource, new RegExp(`\\b${hash.replace("-", "[- ]")}\\b`, "i"));
  }
  assert.match(sitemap, /https:\/\/kunalkabra\.com\/notes/);
  assert.match(sitemap, /https:\/\/kunalkabra\.com\/intelligence\//);
});

test("publishes two researched strategic essays without crowding the homepage", async () => {
  const [app, sitemap] = await Promise.all([
    readText("site-app/src/App.jsx"),
    readText("public/sitemap.xml"),
  ]);
  const additions = essays.filter((essay) => [
    "costs-that-build-the-company",
    "ai-stack-moving-bottleneck",
  ].includes(essay.slug));

  assert.equal(essays.length, 5);
  assert.equal(additions.length, 2);
  assert.equal(essays.filter((essay) => essay.featured).length, 3);
  const expectedReadTimes = new Map([
    ["costs-that-build-the-company", "8 min read"],
    ["ai-stack-moving-bottleneck", "11 min read"],
  ]);
  for (const essay of additions) {
    assert.equal(essay.date, "19 Aug 2026");
    assert.ok(essay.sections.length >= 8);
    assert.ok(essay.sources.length >= 7);
    assert.equal(essay.readTime, expectedReadTimes.get(essay.slug));
    assert.ok(searchItems.some((item) => item.href === `/writing/${essay.slug}`));
    assert.match(sitemap, new RegExp(`https:\/\/kunalkabra\\.com\/writing\/${essay.slug}`));
  }
  assert.doesNotMatch(app, /id="source-notes"|article-sources/);
  assert.match(app, /id: "operations", label: "Operations"/);
  assert.match(app, /id: "technology", label: "Technology"/);
});

test("keeps the notebook concise and orders Home chapters by the rendered page", async () => {
  const [app, styles] = await Promise.all([
    readText("site-app/src/App.jsx"),
    readText("site-app/src/styles.css"),
  ]);
  const homeStart = app.indexOf("function HomePage");
  const homeEnd = app.indexOf("function PageIntro", homeStart);
  const home = app.slice(homeStart, homeEnd);

  assert.match(app, /useState\("beliefs"\)/);
  assert.ok(home.indexOf("<BeliefsSection") < home.indexOf("<QuestionsSection"));
  assert.ok(home.indexOf("<QuestionsSection") < home.indexOf("<EssaysSection"));
  assert.ok(home.indexOf("<EssaysSection") < home.indexOf("<NotesSection"));
  assert.ok(home.indexOf("<NotesSection") < home.indexOf("<ReadingSection"));
  assert.doesNotMatch(app, /path-timeline|path-line|reading-page-art|book-spine-(green|rust)|Research ledger|Keep the argument, challenge the assumptions|How these pages evolve|How this archive grows|Later on this page|Margin note/);
  assert.match(app, /A working notebook on <span className="accent-underline">what I’m learning and thinking through\.<\/span>/);
  assert.match(app, /I am interested in how complex systems work—and what it takes to build them well\./);
  assert.doesNotMatch(app, /I work where strategy meets execution/);
  assert.match(app, /className="belief-list"[\s\S]*?beliefs\.slice\(1\)/);
  assert.match(app, /function SocialLinks/);
  const socialStart = styles.indexOf(".social-list {");
  const socialStyles = styles.slice(socialStart, styles.indexOf(".utilities-footer", socialStart));
  assert.match(socialStyles, /display: flex;[\s\S]*?flex-wrap: wrap;/);
  assert.doesNotMatch(socialStyles, /nth-child|border:/);
  assert.match(app, /about-contact-compact/);
  assert.match(app, /<h2 id="about-contact-heading" className="section-label">Get in touch<\/h2>/);
  assert.match(app, /meta\[name="theme-color"\]/);
  assert.match(app, /path === "\/writing" \|\| essays\.some\(\(essay\) => path === `\/writing\/\$\{essay\.slug\}`\)/);
  assert.match(app, /\^\\\/writing\\\/\[\^\/\]\+\$/);
  assert.match(app, /role="combobox"/);
  assert.ok(searchItems.some((item) => item.type === "Book" && item.href.startsWith("/reading#")));
  assert.ok(searchItems.some((item) => item.type === "Note" && item.href.startsWith("/notes#note-")));
  assert.ok(searchItems.some((item) => item.type === "Belief" && item.href === "/#beliefs"));
});

test("keeps legacy URLs as static redirects for branch-backed hosting", async () => {
  const redirects = new Map([
    ["public/essays/index.html", "/writing"],
    ["public/projects/index.html", "/problems"],
    ["public/essays/why-moats-matter/index.html", "/writing/why-moats-matter"],
    ["public/essays/last-mile-manufacturing/index.html", "/writing/last-mile-manufacturing"],
    ["public/essays/agency-and-leverage/index.html", "/writing/agency-and-leverage"],
    ["public/essays/learning-notes/index.html", "/notes"],
  ]);

  for (const [path, destination] of redirects) {
    const redirect = await readText(path);
    assert.match(redirect, /noindex/i);
    assert.match(redirect, new RegExp(destination.replaceAll("/", "\\/")));
  }
});

test("restores production newsletter, keyboard, theme, accessibility, and domain behavior", async () => {
  const [app, styles, index, cname] = await Promise.all([
    readText("site-app/src/App.jsx"),
    readText("site-app/src/styles.css"),
    readText("site-app/index.html"),
    readText("public/CNAME"),
  ]);
  assert.match(app, /action="https:\/\/kunalkabra\.substack\.com\/subscribe"/);
  assert.match(app, /<NewsletterCallout idPrefix="writing" \/>/);
  assert.match(app, /<NewsletterCallout idPrefix=\{`essay-\$\{essay\.slug\}`\} \/>/);
  assert.match(app, /function NotFoundPage[\s\S]*?<NotebookShell[\s\S]*?<PageFooter/);
  assert.match(app, /id="essays-heading"/);
  assert.match(app, /role="status" aria-live="polite"/);
  assert.match(app, /srcSet="\/assets\/portrait-640\.jpg 640w,[^"]+portrait-1200\.jpg 1200w/);
  assert.match(styles, /\.portrait-note img \{[\s\S]*?height: auto;/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(app, /\["\?", "Show or hide this guide"\]/);
  assert.match(app, /const routes = \{ h: "\/", e: "\/writing", p: "\/problems", l: "\/notes", r: "\/reading" \}/);
  assert.match(index, /localStorage\.getItem\("theme"\)/);
  assert.match(index, /rel="canonical" href="https:\/\/kunalkabra\.com\/"/);
  assert.equal(cname.trim(), "kunalkabra.com");
});

test("generates status-200 route shells with route-specific metadata", async () => {
  const routes = [
    "writing",
    "problems",
    "notes",
    "reading",
    "about",
    ...essays.map((essay) => `writing/${essay.slug}`),
  ];

  for (const route of routes) {
    const html = await readText(`dist/client/${route}/index.html`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https:\\/\\/kunalkabra\\.com\\/${route}\\/"`));
    assert.match(html, /<meta property="og:title" content="[^"]+"/);
    assert.match(html, /<meta property="og:description" content="[^"]+"/);
    assert.match(html, /<noscript><article>/);
    assert.match(html, /\/assets\/site\.js/);
  }

  const about = await readText("dist/client/about/index.html");
  assert.match(about, /Kunal Kabra's background, working beliefs, and contact details\./);
  assert.doesNotMatch(about, /background, path/i);
});

test("enforces same-day India publication for Morning Intelligence", async () => {
  const publisher = await readText("scripts/publish-intelligence.ps1");
  assert.match(publisher, /Asia\/Kolkata|India Standard Time/);
  assert.match(publisher, /editionDate[\s\S]*todayInIndia|todayInIndia[\s\S]*editionDate/i);
});
