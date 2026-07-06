import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sobre mim",
  description:
    "Conheça Walison Ribeiro — desenvolvedor back-end, formado em Ciência da Computação e autor deste blog sobre computação e engenharia de software.",
  path: "/about",
});

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
          Olá, meu nome é Walison Ribeiro. Sou desenvolvedor back-end, técnico
          em Desenvolvimento de Sistemas e bacharel em Ciência da Computação.
          Programo desde 2018 e atuo profissionalmente na área desde 2020.
        </p>
        <p>
          Sempre tive interesse em compreender como a tecnologia funciona. Essa
          curiosidade me levou a buscar uma formação mais aprofundada em Ciência
          da Computação e continua guiando a forma como estudo e trabalho até
          hoje. Mais do que aprender ferramentas, gosto de entender os conceitos
          e fundamentos que as tornam possíveis.
        </p>
        <p>
          Este blog nasceu como uma forma de organizar meus estudos e registrar
          minha evolução. Acredito que escrever é uma das melhores maneiras de
          consolidar o aprendizado, além de compartilhar conhecimento com outras
          pessoas que estejam passando pela mesma jornada.
        </p>
        <p>
          Não escrevo com a pretensão de ter todas as respostas. Minha intenção
          é documentar o que estou aprendendo, compartilhar experiências reais
          e registrar as ideias que, ao longo do tempo, mudam a forma como
          enxergo tecnologia e desenvolvimento de software.
        </p>
        <p>
          Mais do que falar sobre ferramentas, este blog é um espaço para
          entender os fundamentos que as sustentam e registrar as ideias que
          mudam a forma como penso e construo software.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
