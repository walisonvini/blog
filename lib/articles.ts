import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import "moment/locale/pt-br";
import { renderMarkdown } from "@/lib/markdown";

import type { ArticleItem } from "@/types";

moment.locale("pt-br");

const articDirectory = path.join(process.cwd(), "articles");

const formatDate = (date: string) =>
  moment(date, "DD-MM-YYYY").format("D [de] MMMM [de] YYYY");

const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs.readdirSync(articDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      formattedDate: formatDate(matterResult.data.date),
      category: matterResult.data.category,
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);

    if (dateOne.isBefore(dateTwo)) {
      return -1;
    } else if (dateOne.isAfter(dateTwo)) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getAllArticles = (): ArticleItem[] => {
  return getSortedArticles().reverse();
};

export const getCategoriedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles();
  const categorisedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    if (!categorisedArticles[article.category]) {
      categorisedArticles[article.category] = [];
    }
    categorisedArticles[article.category].push(article);
  });

  return categorisedArticles;
};

export const getArticleData = async (id: string) => {
  const fullPath = path.join(articDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await renderMarkdown(matterResult.content);

  return {
    id,
    contentHtml: processedContent,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: formatDate(matterResult.data.date),
  };
};