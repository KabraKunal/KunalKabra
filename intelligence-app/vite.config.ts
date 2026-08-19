import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

const normalizeGeneratedHtml = {
  name: "normalize-generated-html",
  closeBundle() {
    const output = path.resolve(appRoot, "../intelligence/index.html");
    const html = readFileSync(output, "utf8").replace(/\r+\n/g, "\n").replace(/\r/g, "\n");
    writeFileSync(output, html, "utf8");
  },
};

export default defineConfig({
  base: "/intelligence/",
  plugins: [react(), normalizeGeneratedHtml],
  build: {
    outDir: "../intelligence",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "assets/intelligence.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((name) => name.endsWith(".css"))
            ? "assets/intelligence.css"
            : "assets/[name][extname]",
      },
    },
  },
});
