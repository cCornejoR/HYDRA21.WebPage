// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3500,
  },
  // GitHub Pages configuration
  site: "https://www.hydra21.com",
  base: "/",

  // Build configuration for GitHub Pages
  output: "static",

  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll handle base styles ourselves
    }),
    react(),
  ],

  // Optimize for production
  build: {
    inlineStylesheets: "auto",
  },
});
