import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const articlesDir = path.join(process.cwd(), "articles");
const outputDir = path.join(process.cwd(), "lib/generated");
const outputFile = path.join(outputDir, "articles.json");

const prettyCodeOptions = {
  theme: "github-light",
  keepBackground: false,
  grid: false,
  defaultLang: "plaintext",
};

const renderMarkdown = async (content) => {
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return processedContent.toString();
};

const generateArticles = async () => {
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputFile, "[]");
    return;
  }

  const fileNames = fs
    .readdirSync(articlesDir)
    .filter((fileName) => fileName.endsWith(".md"));

  const articles = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(articlesDir, fileName),
        "utf8",
      );
      const matterResult = matter(fileContents);
      const contentHtml = await renderMarkdown(matterResult.content);

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        category: matterResult.data.category,
        contentHtml,
      };
    }),
  );

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
};

generateArticles().catch((error) => {
  console.error("Failed to generate articles:", error);
  process.exit(1);
});
