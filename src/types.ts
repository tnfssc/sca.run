import { z } from "astro/zod";

export const MatterZod = z.object({
  title: z.string(),
  date: z.coerce.date(),
  heroImage: z.string(),
  authorName: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  public: z.boolean().default(false),
  authorProfileUrl: z.string().url(),
});
