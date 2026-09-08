import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@utils": path.resolve(process.cwd(), "src/utils"),
      "@components": path.resolve(process.cwd(), "src/components"),
    },
  },

  test: {
    environment: "jsdom",

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
