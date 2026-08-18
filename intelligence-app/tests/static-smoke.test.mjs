import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(here, "../../intelligence");

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

  assert.ok(javascript.includes("The Hormuz clock is now disputed"));
  assert.ok(css.includes("--navy:"));
  assert.ok(css.includes(".brief-card-lead"));
  assert.ok(css.includes("prefers-reduced-motion:reduce"));
});
