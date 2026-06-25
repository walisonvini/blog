import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  article: ArticleItem;
}

const ArticleListItem = ({ article }: Props) => {
  return (
    <li>
      <Link href={`/${article.id}`} className="group block py-5">
        <h2 className="text-xl font-semibold text-accent transition-opacity group-hover:opacity-80">
          {article.title}
        </h2>
        <div className="mt-1.5 flex items-center gap-3 font-mono text-sm text-muted">
          <time dateTime={article.date}>{article.formattedDate}</time>
          <span className="text-border">·</span>
          <span className="uppercase tracking-wider">{article.category}</span>
        </div>
      </Link>
    </li>
  );
};

export default ArticleListItem;
