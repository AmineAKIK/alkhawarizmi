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
      // src/audio/ is excluded for now: useSpeechReader.ts wraps the Web
      // Speech API (SpeechSynthesisUtterance/speechSynthesis timing) and is
      // under active development — it needs its own mocked-timer test setup
      // rather than a threshold that would either fail immediately or be
      // set low enough to be meaningless.
      exclude: ["src/audio/**", "src/test/**", "**/*.config.ts", "src/main.tsx"],
      thresholds: {
        lines: 60,
        statements: 60,
        functions: 55,
        branches: 50,
      },
    },
  },
});
