import type { Metadata } from "next";
import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import { getAllArticles, getArticleData } from "@/lib/articles";
import { createArticleJsonLd, createArticleMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const generateStaticParams = () => {
  return getAllArticles().map((article) => ({ slug: article.id }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const article = await getArticleData(slug);

  return createArticleMetadata({
    title: article.title,
    description: article.description,
    slug: article.id,
    publishedAt: article.publishedAt,
    category: article.category,
  });
};

const Article = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const articleData = await getArticleData(slug);
  const jsonLd = createArticleJsonLd({
    title: articleData.title,
    description: articleData.description,
    slug: articleData.id,
    publishedAt: articleData.publishedAt,
  });

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-8 font-mono text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-foreground">
          Início
        </Link>
        <span className="mx-2">»</span>
        <span className="text-foreground">{articleData.title}</span>
      </nav>

      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
          {articleData.category}
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {articleData.title}
        </h1>
        <time
          className="mt-4 block font-mono text-sm text-muted"
          dateTime={articleData.publishedAt}
        >
          {articleData.date}
        </time>
      </header>

      <ArticleContent html={articleData.contentHtml} />
    </section>
  );
};

export default Article;
