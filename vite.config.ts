import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const base = resolveBasePath();

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      output: {
        // These are genuine vendor cache boundaries. Sheet data is intentionally
        // left to Rollup: manually splitting eagerly imported data creates extra
        // initial requests without making that data lazy.
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["lucide-react"],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
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
