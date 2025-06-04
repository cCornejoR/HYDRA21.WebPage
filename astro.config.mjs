// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3500,
  },
  // Configuración para dominio personalizado
  site: "https://www.hydra21.com",
  base: "/",

  // Build configuration - static para GitHub Pages
  output: "static",

  integrations: [tailwind(), react()],

  // Optimize for production
  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
  },

  // Vite configuration for proper asset handling and performance
  vite: {
    build: {
      assetsInlineLimit: 4096, // Inline assets smaller than 4KB
      rollupOptions: {
        output: {
          assetFileNames: "_astro/[name].[hash][extname]",
          // Code splitting for better performance
          manualChunks: {
            vendor: ["react", "react-dom"],
            utils: ["fuse.js"],
          },
        },
      },
    },
    // Development optimizations
    server: {
      fs: {
        strict: false,
      },
    },
    // Image processing optimizations
    optimizeDeps: {
      include: ["react", "react-dom", "fuse.js"],
    },
  },
});
