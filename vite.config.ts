import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds into /dist, which wrangler.jsonc serves on Cloudflare.
// base "./" keeps asset paths relative, so the site works from any URL.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
