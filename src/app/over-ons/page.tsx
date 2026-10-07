import type { Metadata } from "next";
import Image from "next/image";
import { DonateCta } from "@/components/layout/DonateCta";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Mission, vision et histoire du Collectif Humaniterre ASBL, à Ganshoren.",
};

export default function OverOnsPage() {
  return (
    <main id="contenu">
      <header className="bg-[var(--green-900)] text-[var(--on-dark)]">
        <Container className="py-16 sm:py-24">
          <h1 className="font-display text-5xl text-[var(--on-dark)] sm:text-6xl">À propos</h1>
        </Container>
      </header>

      <section className="bg-[var(--bg-alt)] py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/collectif.jpg"
              alt="Membres du Collectif Humaniterre avec un enfant, devant un arbre fruitier."
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mt-3 font-display text-4xl text-[var(--text)]">Le collectif</h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
              L&apos;association est née pour unir des acteurs associatifs, humanitaires, cadres et
              entrepreneurs. Ensemble, ils mettent leur expertise au service des personnes pour qui
              l&apos;eau et l&apos;électricité restent une urgence.
            </p>
          </div>
        </Container>
      </section>

      <DonateCta />
    </main>
  );
}
