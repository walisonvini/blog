import ArticleListItem from "@/components/ArticleListItem";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const HomePage = () => {
  const articles = getAllArticles();

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Artigos</h1>
        <p className="mt-2 font-mono text-sm text-muted">
          {siteConfig.description}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="font-mono text-sm text-muted">
          Nenhum artigo publicado ainda.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {articles.map((article) => (
            <ArticleListItem article={article} key={article.id} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default HomePage;
