const ContactPage = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Contato</h1>
        <p className="mt-2 font-mono text-sm text-muted">
          Fale comigo — adoraria ouvir você.
        </p>
      </header>

      <div className="flex flex-col gap-5 text-muted leading-7">
        <p>
          Se você tem uma pergunta, quer colaborar ou só dizer olá, fique à
          vontade para entrar em contato.
        </p>
        <p>
          E-mail:{" "}
          <a
            href="mailto:hello@example.com"
            className="text-accent transition-opacity hover:opacity-80"
          >
            hello@example.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
