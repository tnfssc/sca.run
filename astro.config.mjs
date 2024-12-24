// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import Icons from "unplugin-icons/vite";
import remarkGemoji from "remark-gemoji";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { transformerTwoslash } from "@shikijs/twoslash";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import codeTitle from "remark-code-title";
import rehypeMathjax from "rehype-mathjax";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: process.env.BASE_URL ?? "https://www.sca.run",
  image: { domains: ["cdn.sharath.uk", "img.shields.io"] },
  adapter: cloudflare({ imageService: "compile" }),
  vite: { plugins: [Icons({ compiler: "astro" })] },
  markdown: {
    remarkPlugins: [remarkGemoji, codeTitle],
    rehypePlugins: [rehypeMathjax, rehypeMermaid],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "dark-plus",
      transformers: [
        transformerTwoslash({ explicitTrigger: true }),
        transformerCopyButton({ visibility: "always", feedbackDuration: 3000 }),
      ],
    },
  },
  integrations: [mdx(), sitemap(), react(), tailwind({ applyBaseStyles: false })],
  env: {
    validateSecrets: true,
    schema: {
      SITE_TITLE: envField.string({ access: "public", context: "client", default: "www.sca.run" }),
      SITE_DESCRIPTION: envField.string({ access: "public", context: "client", default: "sca.run's website" }),
      BASE_URL: envField.string({ access: "public", context: "client", default: "https://www.sca.run" }),
    },
  },
});
