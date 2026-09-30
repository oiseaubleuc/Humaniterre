import type { Metadata } from "next";
import Image from "next/image";
import { vzw } from "@/config/vzwData";
import { about, values } from "@/content/copy";
import { DonateCta } from "@/components/layout/DonateCta";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Mission, vision et histoire du Collectif Humaniterre ASBL, à Ganshoren.",
};

const labels = ["Acteurs associatifs", "Humanitaires", "Cadres", "Entrepreneurs"];
const numbers = ["01", "02", "03", "04"];

export default function OverOnsPage() {
  return (
    <main id="contenu">
      <header className="bg-[var(--green-900)] text-[var(--on-dark)]">
        <Container className="py-16 sm:py-24">
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--lime)]">L&apos;association</p>
          <h1 className="mt-4 font-display text-5xl text-[var(--on-dark)] sm:text-6xl">À propos</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--on-dark-muted)]">
            Une ASBL qui réunit des compétences pour l&apos;eau, l&apos;alimentation, l&apos;éducation,
            l&apos;environnement et la culture.
          </p>
        </Container>
      </header>

      <section className="bg-[var(--bg)] py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--green-700)] dark:text-[var(--lime)]">
              Notre mission
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--text)]">
              L&apos;impact est décuplé lorsque les forces sont unies.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[var(--text-muted)]">
              <p>{about.intro}</p>
              {about.mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--green-700)] dark:text-[var(--lime)]">
              Notre vision
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--text)]">
              Agir vite, et pour longtemps.
            </h2>
            <p className="mt-6 text-base leading-7 text-[var(--text-muted)]">{about.vision}</p>
            <blockquote className="mt-8 rounded-3xl bg-[var(--green-900)] p-8">
              <p className="font-display text-5xl leading-none text-[var(--lime)]" aria-hidden="true">
                “
              </p>
              <p className="mt-3 font-display text-2xl italic leading-snug text-[var(--on-dark)]">{vzw.slogan}</p>
            </blockquote>
          </div>
        </Container>
      </section>

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
            <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--green-700)] dark:text-[var(--lime)]">
              Ensemble
            </p>
            <h2 className="mt-3 font-display text-4xl text-[var(--text)]">Le collectif</h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
              L&apos;association est née pour unir des acteurs associatifs, humanitaires, cadres et
              entrepreneurs. Ensemble, ils mettent leur expertise au service des personnes pour qui
              l&apos;eau et l&apos;électricité restent une urgence.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {labels.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text)]"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--bg)] py-16 sm:py-24">
        <Container>
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--green-700)] dark:text-[var(--lime)]">
            Repères
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--text)]">Nos valeurs</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li key={value.title} className="border-t border-[var(--border)] pt-5">
                <p className="font-display text-sm text-[var(--olive)]">{numbers[index]}</p>
                <h3 className="mt-3 font-display text-2xl text-[var(--text)]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{value.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <DonateCta />
    </main>
  );
}
