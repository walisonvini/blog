"use client";

import { useEffect, useRef } from "react";

interface Props {
  html: string;
}

const ArticleContent = ({ html }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const figures = container.querySelectorAll(
      "figure[data-rehype-pretty-code-figure]"
    );

    figures.forEach((figure) => {
      const pre = figure.querySelector("pre");
      if (!pre || pre.querySelector(".code-copy-btn")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-btn";
      button.setAttribute("aria-label", "Copiar código");
      button.textContent = "Copiar";

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (!code) return;

        await navigator.clipboard.writeText(code.textContent ?? "");
        button.textContent = "Copiado!";
        setTimeout(() => {
          button.textContent = "Copiar";
        }, 2000);
      });

      pre.appendChild(button);
    });
  }, [html]);

  return (
    <article
      ref={ref}
      className="article"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ArticleContent;
