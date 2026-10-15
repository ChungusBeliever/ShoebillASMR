import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds into /docs so GitHub Pages ("main" branch, /docs folder) keeps working.
// base "./" makes asset paths relative, so it works under /ShoebillASMR/ or anywhere else.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
