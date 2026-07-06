import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contato",
  description:
    "Entre em contato com Walison Ribeiro por e-mail para perguntas, colaborações ou conversas sobre tecnologia.",
  path: "/contact",
});

const ContactPage = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Contato</h1>
      </header>

      <div className="flex flex-col gap-5 text-muted leading-7">
        <p>
          Se você tem uma pergunta, quer colaborar ou só dizer olá, fique à
          vontade para entrar em contato.
        </p>
        <p>
          E-mail:{" "}
          <a
            href="mailto:walison.vinicios12@gmail.com"
            className="text-accent transition-opacity hover:opacity-80"
          >
            walison.vinicios12@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
