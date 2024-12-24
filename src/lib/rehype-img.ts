import type { Plugin } from "unified";

import { visit } from "unist-util-visit";

export const rehypeImg: Plugin = () => {
  return (rootNode) => {
    visit(rootNode, (node) => {
      if (node.type !== "element") return;
      // @ts-expect-error - abc
      if (node.tagName !== "img") return;
      // @ts-expect-error - abc
      node.properties.referrerpolicy = "no-referrer";
      // @ts-expect-error - abc
      node.properties.class = "w-full rounded-xl";
    });
    return rootNode;
  };
};
