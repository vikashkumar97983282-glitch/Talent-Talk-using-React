import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // required for React
    globals: true
  }
});