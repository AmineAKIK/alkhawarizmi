import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/test/**",
        "src/data/sheets/**",
        "**/*.test.{ts,tsx}",
        "**/*.config.ts",
        "**/*.d.ts",
        "src/main.tsx",
      ],
      thresholds: {
        lines: 60,
        statements: 60,
        functions: 55,
        branches: 50,
      },
    },
  },
});
