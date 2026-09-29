import type { Metadata } from "next";
import { Droplet, GraduationCap, Trees, Utensils } from "lucide-react";
import { projects } from "@/content/copy";
import { bangladeshProjects } from "@/content/bangladeshProjects";
import { guineaProjects } from "@/content/guineaProjects";
import { PageIntro } from "@/components/layout/PageIntro";
import { PartnerLoop } from "@/components/partners/PartnerLoop";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Les projets du Collectif Humaniterre en Guinée et au Bangladesh.",
};

const icons = [Droplet, Utensils, GraduationCap, Trees];

export default function ProjectenPage() {
  return (
    <main id="contenu">
      <PageIntro
        eyebrow="Terrain"
        title="Projets"
        text="Les photos des missions en Guinée et au Bangladesh."
      />

      <Container className="py-12 sm:py-16">
        <h2 className="font-display text-3xl italic text-[#d5e09a]">Guinée</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d5dcc0]">
          Une mission en cours : eau, éclairage et rencontres avec les habitants.
        </p>
        <div className="mt-8">
          <ProjectCarousel projects={guineaProjects} label="Photos du projet en Guinée" />
        </div>
      </Container>

      <Container className="pb-4 sm:pb-8">
        <h2 className="font-display text-3xl italic text-[#d5e09a]">Bangladesh</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d5dcc0]">
          Une mission en cours : classes, colis et rencontres avec les habitants.
        </p>
        <div className="mt-8">
          <ProjectCarousel projects={bangladeshProjects} label="Photos du projet au Bangladesh" />
        </div>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <ul className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = icons[index];
            return (
              <li
                key={project.title}
                className="rounded-[2rem] border border-[#8b9a56]/30 bg-[#15261e] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d5e09a]/50 sm:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#8b9a56]/20 text-[#d5e09a]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl text-[#f3f5e8]">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#d5dcc0]">{project.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>

      <section className="bg-white py-3" aria-label="Nos partenaires">
        <PartnerLoop />
      </section>
    </main>
  );
}
