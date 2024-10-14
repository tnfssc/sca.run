// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import Icons from "unplugin-icons/vite";
import remarkGemoji from "remark-gemoji";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: process.env.BASE_URL ?? "https://v6.sharath.uk",
  image: { domains: ["cdn.sharath.uk"] },
  adapter: cloudflare({ imageService: "compile" }),
  vite: { plugins: [Icons({ compiler: "astro" })] },
  integrations: [
    mdx({ remarkPlugins: [remarkGemoji], rehypePlugins: [rehypeAccessibleEmojis] }),
    sitemap(),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  env: {
    validateSecrets: true,
    schema: {
      SITE_TITLE: envField.string({ access: "public", context: "client", default: "sharath.uk" }),
      SITE_DESCRIPTION: envField.string({ access: "public", context: "client", default: "sharath's website" }),
      BASE_URL: envField.string({ access: "public", context: "client", default: "https://v6.sharath.uk" }),
    },
  },
});
