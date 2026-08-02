import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

const site = process.env.PUBLIC_SITE_URL || "https://www.bridge.co";

export default defineConfig({
  site,
  publicDir: "./assets",
  output: "server",
  devToolbar: {
    enabled: false,
  },
  adapter: node({ mode: "standalone" }),
  integrations: [sitemap()],
  // Prefetch linked pages on hover so version switches feel instant
  prefetch: {
    defaultStrategy: "hover",
  },
  security: {
    checkOrigin: true,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
