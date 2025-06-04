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

  // Vite configuration for proper asset handling
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: "_astro/[name].[hash][extname]",
        },
      },
    },
  },
});
