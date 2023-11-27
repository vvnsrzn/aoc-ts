import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    setupFiles: ["dotenv/config"],
  },
});
