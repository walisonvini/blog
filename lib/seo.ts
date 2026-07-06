import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
};

type ArticleMetadataOptions = PageMetadataOptions & {
  slug: string;
  publishedAt: string;
  category: string;
};

export const createPageMetadata = ({
  title,
  description,
  path = "",
}: PageMetadataOptions): Metadata => {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: "pt_BR",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
};

export const createArticleMetadata = ({
  title,
  description,
  slug,
  publishedAt,
  category,
}: ArticleMetadataOptions): Metadata => {
  const url = `${siteConfig.url}/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: publishedAt,
      authors: [siteConfig.author.name],
      siteName: siteConfig.name,
      locale: "pt_BR",
      tags: [category],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

export const createArticleJsonLd = ({
  title,
  description,
  slug,
  publishedAt,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: publishedAt,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}/${slug}`,
  },
});
