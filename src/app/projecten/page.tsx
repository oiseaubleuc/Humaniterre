import type { Metadata } from "next";
import Image from "next/image";
import { DonateCta } from "@/components/layout/DonateCta";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Les actions du Collectif Humaniterre : eau potable, enseignement, lumière, alimentation, orphelins, abris.",
};

const actions = [
  {
    title: "L'accès à l'eau potable",
    text: "Dans les régions où l'eau se fait rare, nous contribuons à créer un accès durable à cette ressource essentielle. Le forage de puits permet aux communautés de disposer d'une eau potable plus accessible et d'améliorer concrètement leur quotidien.",
    image: "/images/actions/eau.jpg",
    alt: "Forage d'un puits : un camion de forage et une équipe sur un terrain sec.",
    tone: "dark",
  },
  {
    title: "L'enseignement",
    text: "L'éducation ouvre des perspectives et donne aux enfants les moyens de construire leur avenir. Nous distribuons du matériel et des fournitures scolaires afin qu'ils puissent apprendre et poursuivre leur scolarité dans de meilleures conditions.",
    image: "/images/actions/enseignement.jpg",
    alt: "Un membre du collectif avec des élèves dans une salle de classe.",
    tone: "light",
  },
  {
    title: "Apporter la lumière",
    text: "Dans certains villages, l'électricité reste encore inaccessible. Nous installons notamment des panneaux solaires sur les habitations afin d'apporter une source d'énergie autonome et durable, capable d'améliorer la vie quotidienne des familles.",
    image: "/images/actions/lumiere.jpg",
    alt: "Installation d'un panneau solaire sur un toit en tôle.",
    tone: "dark",
  },
  {
    title: "Nourrir",
    text: "Répondre aux besoins les plus urgents commence souvent par l'essentiel. Nous organisons des distributions de colis alimentaires afin de soutenir les familles confrontées à la précarité et aux périodes les plus difficiles.",
    image: "/images/actions/nourrir.jpg",
    alt: "Des colis alimentaires alignés sur un terrain, prêts à être distribués.",
    tone: "light",
  },
  {
    title: "Prendre soin des orphelins",
    text: "Être présent auprès des enfants les plus vulnérables, c'est leur apporter bien plus qu'une aide ponctuelle. Nous soutenons les orphelins dans leurs besoins essentiels et contribuons à leur offrir un environnement plus stable, attentif et bienveillant.",
    image: "/images/actions/orphelins.jpg",
    alt: "Membres du collectif assis avec des enfants au coucher du soleil.",
    tone: "dark",
  },
  {
    title: "Protéger et abriter",
    text: "Disposer d'un toit sûr est une nécessité fondamentale. Nous participons à la construction d'abris et de solutions d'hébergement pour offrir aux personnes réfugiées, déplacées ou vulnérables un lieu plus digne et sécurisant.",
    image: "/images/actions/abriter.jpg",
    alt: "Membres du collectif avec des enfants devant un abri en briques.",
    tone: "light",
  },
  {
    title: "Construire pour demain",
    text: "Chaque territoire possède ses propres réalités. Nous développons nos projets en tenant compte des besoins locaux et en privilégiant des solutions durables, utiles sur le long terme et pensées au plus près des communautés.",
    image: "/images/actions/demain.jpg",
    alt: "Deux membres du collectif en discussion sur un chemin de terre.",
    tone: "wide",
  },
] as const;

export default async function ProjectenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (raw ?? "").trim().toLocaleLowerCase("fr");
  const visible = query
    ? actions.filter((action) =>
        `${action.title} ${action.text}`.toLocaleLowerCase("fr").includes(query),
      )
    : actions;

  return (
    <main id="contenu">
      {visible.length === 0 ? (
        <section className="bg-[#F5F2EA] py-24">
          <Container>
            <p className="text-base text-[#1F5C3A]">Aucun projet ne correspond à cette recherche.</p>
          </Container>
        </section>
      ) : (
        visible.map((action, index) => {
          const previous = visible[index - 1];
          const overlap = action.tone === "light" && previous?.tone === "dark";

          if (action.tone === "wide") {
            return (
              <section key={action.title} className="bg-[#0E2B1F] py-16 text-[#F5F2EA] sm:py-24">
                <Container>
                  <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{action.title}</h2>
                  <p className="mt-6 max-w-3xl text-base leading-7 text-[#D5DDD4] sm:text-lg">{action.text}</p>
                  <Image
                    src={action.image}
                    alt={action.alt}
                    width={1200}
                    height={900}
                    className="mt-10 aspect-[4/3] w-full rounded-3xl object-cover sm:mt-14"
                  />
                </Container>
              </section>
            );
          }

          const dark = action.tone === "dark";

          return (
            <section
              key={action.title}
              className={
                dark
                  ? "bg-[#0E2B1F] py-16 text-[#F5F2EA] sm:py-24"
                  : `bg-[var(--bg)] py-16 text-[var(--text)] sm:py-24 ${overlap ? "relative z-10 -mt-10 rounded-t-[36px] sm:-mt-12 sm:rounded-t-[48px]" : ""}`
              }
            >
              <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={dark ? "" : "lg:order-2"}>
                  <h2 className="font-display text-4xl leading-tight sm:text-5xl">{action.title}</h2>
                  <p
                    className={`mt-6 text-base leading-7 sm:text-lg ${dark ? "text-[#D5DDD4]" : "text-[var(--green-700)] dark:text-[var(--text-muted)]"}`}
                  >
                    {action.text}
                  </p>
                </div>
                <Image
                  src={action.image}
                  alt={action.alt}
                  width={1200}
                  height={900}
                  className={`aspect-[4/3] w-full rounded-3xl object-cover ${dark ? "" : "lg:order-1"}`}
                />
              </Container>
            </section>
          );
        })
      )}

      <DonateCta />
    </main>
  );
}
