import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["lucide-react"],
          // Lazy load data by category: each category sheet data is a separate chunk
          // This enables faster initial page load for the home page and category listings
          data_technique: ["src/data/sheets/technique/index.ts"],
          data_conception: ["src/data/sheets/conception/index.ts"],
          data_design: ["src/data/sheets/design/index.ts"],
          data_production: ["src/data/sheets/production/index.ts"],
          data_collaboration: ["src/data/sheets/collaboration/index.ts"],
        }
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      // registerType: "autoUpdate" automatically updates SW in background
      registerType: "prompt",
      // Manifest must be true for installability (icons, name, theme_color, etc)
      manifest: {
        name: "Alkhawarizmi - Fiches systémiques",
        short_name: "Alkhawarizmi",
        description: "Cartes navigables pour apprendre le développement systématiquement",
        theme_color: "#080a10",
        background_color: "#080a10",
        display: "standalone",
        icons: [
          {
            src: "/icons/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "/icons/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Cache strategies for different asset types
        globPatterns: [
          "**/*.{js,css,html,svg,png,webp,woff2}",
        ],
        // Don't cache data chunks - they load on demand
        globIgnores: [
          "**/data/**",
        ],
      },
    })
  ]
});
