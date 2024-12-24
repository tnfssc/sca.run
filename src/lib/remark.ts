import { unified } from "unified";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGemoji from "remark-gemoji";
import rehypeShiki from "@shikijs/rehype";
import rehypeMathjax from "rehype-mathjax";
import rehypeStringify from "rehype-stringify";
import remarkCodeTitle from "remark-code-title";
import remarkFrontmatter from "remark-frontmatter";
import { transformerTwoslash } from "@shikijs/twoslash";
import { transformerCopyButton } from "@rehype-pretty/transformers";

import { rehypeImg } from "./rehype-img";

export const remarked = (md: string): Promise<string> =>
  unified()
    .use(remarkParse, { fragment: true })
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkCodeTitle)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeMathjax)
    .use(rehypeShiki, {
      themes: { dark: "dark-plus", light: "dark-plus" },
      transformers: [
        transformerTwoslash({ explicitTrigger: true }),
        transformerCopyButton({ visibility: "always", feedbackDuration: 3000 }),
      ],
    })
    .use(rehypeImg)
    .use(rehypeStringify)
    .process(md)
    .then(String);
