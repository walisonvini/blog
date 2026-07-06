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

const toIsoDate = (date) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T00:00:00.000Z`).toISOString();
  }

  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
    const [day, month, year] = date.split("-");
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString();
  }

  return new Date(date).toISOString();
};

const extractDescription = (content, frontmatterDescription) => {
  if (frontmatterDescription) {
    return String(frontmatterDescription).slice(0, 160);
  }

  const paragraph = content
    .split("\n\n")
    .map((block) => block.trim())
    .find(
      (block) =>
        block &&
        !block.startsWith("#") &&
        !block.startsWith("![") &&
        !block.startsWith("```"),
    );

  if (!paragraph) {
    return "";
  }

  return paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#*_>]/g, "")
    .trim()
    .slice(0, 160);
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
        publishedAt: toIsoDate(matterResult.data.date),
        description: extractDescription(
          matterResult.content,
          matterResult.data.description,
        ),
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
