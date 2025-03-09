import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss"; // Use the correct Tailwind CSS PostCSS plugin
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()], // Use the correct Tailwind CSS plugin
    },
  },
});
