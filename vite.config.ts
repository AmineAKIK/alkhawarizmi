import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const base = resolveBasePath();

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      output: {
        // Vendor chunks improve cache stability. The sheet-data chunks are size
        // boundaries, not lazy loading: the catalogue imports them eagerly, but
        // keeping each category separate prevents one multi-megabyte entry chunk
        // from exceeding Workbox's default precache limit.
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["lucide-react"],
          data_technique: ["src/data/sheets/technique/index.ts"],
          data_conception: ["src/data/sheets/conception/index.ts"],
          data_design: ["src/data/sheets/design/index.ts"],
          data_production: ["src/data/sheets/production/index.ts"],
          data_collaboration: ["src/data/sheets/collaboration/index.ts"],
          data_culture: ["src/data/sheets/culture/index.ts"],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.svg"],
      manifest: {
        name: "Al Khawarizmi — Catalogue Dev",
        short_name: "Alkhawarizmi",
        description: "Cartes navigables pour apprendre le développement systématiquement.",
        theme_color: "#080a10",
        background_color: "#080a10",
        display: "standalone",
        lang: "fr",
        scope: base,
        start_url: base,
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            // A dedicated maskable asset, not a reuse of the "any" icon:
            // maskable icons need ~20% padding around the artwork since the
            // OS crops to its own shape (circle, squircle...) and clips
            // anything outside the safe zone.
            src: "icons/icon-512-maskable.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
      },
    }),
  ],
});

function resolveBasePath() {
  if (process.env.GITHUB_PAGES !== "true") return "/";

  const [, repositoryName] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  return repositoryName ? `/${repositoryName}/` : "/";
}
