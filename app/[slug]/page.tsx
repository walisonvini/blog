import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import { getAllArticles, getArticleData } from "@/lib/articles";

export const dynamic = "force-static";

export const generateStaticParams = () => {
  return getAllArticles().map((article) => ({ slug: article.id }));
};

const Article = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const articleData = await getArticleData(slug);

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
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
        <time className="mt-4 block font-mono text-sm text-muted">
          {articleData.date.toString()}
        </time>
      </header>

      <ArticleContent html={articleData.contentHtml} />
    </section>
  );
};

export default Article;
