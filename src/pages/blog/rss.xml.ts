import type { APIContext } from "astro";

import rss from "@astrojs/rss";
import { remarked } from "@/lib/remark";
import { getCollection } from "astro:content";

export async function GET(context: APIContext): Promise<Response> {
  if (!context.site) throw new Error("No site found");

  const posts = await getCollection("blog").then((allPosts) =>
    allPosts.filter((post) => post.data.public).toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
  );

  return rss({
    site: context.site,
    trailingSlash: false,
    title: import.meta.env.SITE_TITLE ?? "sca.run",
    description: import.meta.env.SITE_DESCRIPTION ?? "sca.run blog collection",
    items: await Promise.all(
      posts.map(async (post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        link: `/blog/${post.id}`,
        categories: post.data.tags,
        author: post.data.authorProfileUrl,
        description: post.data.description,
        content: await remarked(post.body ?? post.data.description),
      })),
    ),
  });
}
