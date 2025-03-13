import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import { APP_VERSION } from "./src/Constants";

export default defineConfig({
  plugins: [react()],
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
