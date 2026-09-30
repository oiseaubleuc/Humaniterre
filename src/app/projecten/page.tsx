import type { Metadata } from "next";
import { Droplet, GraduationCap, Trees, Utensils } from "lucide-react";
import { projects } from "@/content/copy";
import { bangladeshProjects } from "@/content/bangladeshProjects";
import { guineaProjects } from "@/content/guineaProjects";
import { DonateCta } from "@/components/layout/DonateCta";
import { ProjectBrowser } from "@/components/projects/ProjectBrowser";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projets",
  description: "Les projets du Collectif Humaniterre en Guinée et au Bangladesh.",
};

const icons = [Droplet, Utensils, GraduationCap, Trees];

export default async function ProjectenPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (raw ?? "").trim().toLocaleLowerCase("fr");

  return (
    <main id="contenu">
      <header className="bg-[var(--green-900)] text-[var(--on-dark)]">
        <Container className="py-16 sm:py-24">
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--lime)]">Terrain</p>
          <h1 className="mt-4 font-display text-5xl text-[var(--on-dark)] sm:text-6xl">Projets</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--on-dark-muted)]">
            Les photos des missions en Guinée et au Bangladesh.
          </p>
        </Container>
      </header>

      <ProjectBrowser
        query={query}
        missions={[
          {
            id: "guinee",
            title: "Guinée",
            text: "Une mission en cours : eau, éclairage et rencontres avec les habitants.",
            projects: guineaProjects,
          },
          {
            id: "bangladesh",
            title: "Bangladesh",
            text: "Une mission en cours : classes, colis et rencontres avec les habitants.",
            projects: bangladeshProjects,
          },
        ]}
      />

      <section className="bg-[var(--bg-alt)] py-16 sm:py-24">
        <Container>
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--green-700)] dark:text-[var(--lime)]">
            Vos dons
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--text)] sm:text-5xl">Ce que financent vos dons</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {projects.map((project, index) => {
              const Icon = icons[index];
              return (
                <li key={project.title} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[var(--badge-bg)] text-[var(--green-700)] dark:text-[var(--lime)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-[var(--text)]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{project.text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <DonateCta />
    </main>
  );
}
