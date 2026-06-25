import { siteConfig } from "@/lib/site";

const AboutPage = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Sobre mim</h1>
        <p className="mt-2 font-mono text-sm text-muted">
          Um pouco sobre quem sou.
        </p>
      </header>

      <div className="flex flex-col gap-5 text-muted leading-7">
        <p>
          Bem-vindo ao {siteConfig.name}. Escrevo sobre engenharia de software,
          negócios, livros e as ideias que moldam como penso e trabalho.
        </p>
        <p>
          Este blog é um espaço para compartilhar aprendizados, reflexões e
          pensamentos práticos — simples e focado na escrita.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
