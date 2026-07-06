import moment from "moment";
import "moment/locale/pt-br";

import type { ArticleItem } from "@/types";
import articlesData from "@/lib/generated/articles.json";

moment.locale("pt-br");

type GeneratedArticle = {
  id: string;
  title: string;
  date: string;
  category: string;
  contentHtml: string;
};

const articles = articlesData as GeneratedArticle[];

const formatDate = (date: string) =>
  moment(date, ["DD-MM-YYYY", "YYYY-MM-DD"]).format(
    "D [de] MMMM [de] YYYY",
  );

const getSortedArticles = (): ArticleItem[] => {
  const allArticlesData = articles.map((article) => ({
    id: article.id,
    title: article.title,
    date: article.date,
    formattedDate: formatDate(article.date),
    category: article.category,
  }));

  return allArticlesData.sort((a, b) => {
    const dateOne = moment(a.date, ["DD-MM-YYYY", "YYYY-MM-DD"]);
    const dateTwo = moment(b.date, ["DD-MM-YYYY", "YYYY-MM-DD"]);

    if (dateOne.isBefore(dateTwo)) {
      return -1;
    }

    if (dateOne.isAfter(dateTwo)) {
      return 1;
    }

    return 0;
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
  const article = articles.find((item) => item.id === id);

  if (!article) {
    throw new Error(`Article not found: ${id}`);
  }

  return {
    id: article.id,
    contentHtml: article.contentHtml,
    title: article.title,
    category: article.category,
    date: formatDate(article.date),
  };
};

export const getArticleSlugs = (): string[] => {
  return articles.map((article) => article.id);
};
