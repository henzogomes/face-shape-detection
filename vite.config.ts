import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import { APP_VERSION } from "./src/Constants";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
      modernTargets: ["last 2 versions", "not IE 11", "not dead"],
      renderLegacyChunks: true,
      polyfills: true,
    }),
  ],

  build: {
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React dependencies into a vendor chunk
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Move any larger libraries to separate chunks
          // Add more as needed based on your dependencies
        },
      },
    },
  },
  server: {
    port: 8000,
  },
  base: "/",
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(APP_VERSION),
  },
});
