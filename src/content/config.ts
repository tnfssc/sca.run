import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/data/blog", pattern: ["*.md", "*.mdx"] }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    heroImage: z.string(),
    authorName: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    public: z.boolean().default(false),
    authorProfileUrl: z.string().url(),
  }),
});

export const collections = { blog };
