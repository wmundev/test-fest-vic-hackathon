import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

// Plugin to transform require() calls for static assets into string stubs.
// This handles Vue templates that use require('@/assets/...') which is a
// webpack convention not natively supported in Vite/Vitest.
function requireAssetStub() {
  return {
    name: "require-asset-stub",
    transform(code) {
      const assetRe =
        /\brequire\s*\(\s*['"]([^'"]*\.(jpg|jpeg|png|gif|svg|webp|bmp|ico|woff|woff2|ttf|eot))['"]\s*\)/g;
      if (!assetRe.test(code)) return null;
      const transformed = code.replace(assetRe, (_, assetPath) => {
        return JSON.stringify(assetPath);
      });
      return { code: transformed, map: null };
    },
  };
}

export default defineConfig({
  plugins: [vue(), requireAssetStub()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/unit/**/*.spec.{js,jsx,ts,tsx}"],
  },
});
