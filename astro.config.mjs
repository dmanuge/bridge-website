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
  security: {
    checkOrigin: true,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
