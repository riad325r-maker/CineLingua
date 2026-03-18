import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "CineLingua - تعلم الإنجليزية بذكاء",
        short_name: "CineLingua",
        description: "منصة تعليمية متكاملة لتعلم اللغة الإنجليزية",
        theme_color: "#6366f1",
        background_color: "#f8fafc",
        display: "standalone",
        dir: "rtl",
        lang: "ar",
        start_url: "/",
        icons: [{ src: "/favicon.ico", sizes: "64x64", type: "image/x-icon" }],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallbackDenylist: [/^\/~oauth/],
      },
    }),
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
