import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const prettyCodeOptions: Options = {
  theme: "github-light",
  keepBackground: false,
  grid: false,
  defaultLang: "plaintext",
};

export const renderMarkdown = async (content: string) => {
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return processedContent.toString();
};
