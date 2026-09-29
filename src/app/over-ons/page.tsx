import type { Metadata } from "next";
import { vzw } from "@/config/vzwData";
import { about } from "@/content/copy";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Mission, vision et histoire du Collectif Humaniterre ASBL, à Ganshoren.",
};

export default function OverOnsPage() {
  return (
    <main id="contenu">
      <PageIntro
        eyebrow="L'association"
        title="À propos"
        text="Une ASBL qui réunit des compétences pour l'eau, l'alimentation, l'éducation, l'environnement et la culture."
      />

      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-3xl italic text-[#d5e09a]">Mission</h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-[#d5dcc0]">
            <p>{about.intro}</p>
            {about.mission.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl italic text-[#d5e09a]">Vision</h2>
          <p className="mt-5 text-base leading-7 text-[#d5dcc0]">{about.vision}</p>
          <blockquote className="mt-8 border-l-2 border-[#8b9a56] pl-5 font-display text-2xl leading-snug text-[#f3f5e8]">
            {vzw.slogan}
          </blockquote>
        </section>
      </Container>

      <section className="bg-[#2f3a22] dark:bg-[#101c16]">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 sm:py-20">
          <img
            src="/collectif.jpg"
            alt="Membres du Collectif Humaniterre avec un enfant, devant un arbre fruitier."
            className="aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
          <div>
            <h2 className="font-display text-3xl italic text-[#d5e09a]">
              Le collectif
            </h2>
            <p className="mt-5 text-base leading-7 text-[#d5dcc0]">
              L&apos;association est née pour unir des acteurs associatifs,
              humanitaires, cadres et entrepreneurs. Ensemble, ils mettent leur
              expertise au service des personnes pour qui l&apos;eau et
              l&apos;électricité restent une urgence.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
