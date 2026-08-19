import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
]);

function localUtilityRoutes() {
  return {
    name: "local-utility-routes",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url || "/", "http://localhost");

        if (["/resume", "/resume/"].includes(url.pathname) && ["GET", "HEAD"].includes(request.method || "GET")) {
          request.url = `/assets/resume.pdf${url.search}`;
          next();
          return;
        }

        if (!url.pathname.startsWith("/intelligence")) {
          next();
          return;
        }

        const relativePath = url.pathname === "/intelligence" || url.pathname === "/intelligence/"
          ? "index.html"
          : url.pathname.slice("/intelligence/".length);
        const intelligenceRoot = path.join(repoRoot, "intelligence");
        const candidate = path.resolve(intelligenceRoot, relativePath);
        if (!candidate.startsWith(`${intelligenceRoot}${path.sep}`) || !existsSync(candidate) || !statSync(candidate).isFile()) {
          next();
          return;
        }

        response.statusCode = 200;
        response.setHeader("Content-Type", contentTypes.get(path.extname(candidate).toLowerCase()) || "application/octet-stream");
        if (request.method === "HEAD") {
          response.end();
          return;
        }
        createReadStream(candidate).pipe(response);
      });
    },
  };
}

export default defineConfig({
  root: "site-app",
  publicDir: "../public",
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/site.js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((name) => name.endsWith(".css"))
            ? "assets/site.css"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [localUtilityRoutes(), react()],
});
