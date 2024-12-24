import { MatterZod } from "@/types";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  schema: MatterZod,
  loader: glob({ base: "./src/data/blog", pattern: ["*.md", "*.mdx"] }),
});

export const collections = { blog };
