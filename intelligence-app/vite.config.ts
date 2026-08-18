import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/intelligence/",
  plugins: [react()],
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
