"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { FieldProject } from "@/content/guineaProjects";

type Mission = {
  id: "guinee" | "bangladesh";
  title: string;
  text: string;
  projects: FieldProject[];
};

const tabs = [
  { id: "toutes", label: "Toutes les missions" },
  { id: "guinee", label: "Guinée" },
  { id: "bangladesh", label: "Bangladesh" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProjectBrowser({ missions, query }: { missions: Mission[]; query: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState<TabId>("toutes");
  const tablistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "guinee" || hash === "bangladesh") setTab(hash);
  }, []);

  function select(next: TabId) {
    setTab(next);
    const hash = next === "toutes" ? "" : `#${next}`;
    router.replace(`${pathname}${hash}`, { scroll: false });
  }

  function onTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((item) => item.id === tab);
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    select(next.id);
    const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[(index + direction + tabs.length) % tabs.length]?.focus();
  }

  const visible = missions.filter((mission) => tab === "toutes" || mission.id === tab);

  return (
    <div>
      <div className="bg-[var(--green-900)] pb-12">
      <Container>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Filtrer les missions"
        onKeyDown={onTabKeyDown}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`onglet-${item.id}`}
              aria-selected={selected}
              aria-controls={item.id === "toutes" ? "missions" : item.id}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.id)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
                selected
                  ? "bg-[var(--lime)] text-[var(--green-900)]"
                  : "border border-white/25 text-[var(--on-dark)] hover:border-[var(--lime)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      </Container>
      </div>

      <div id="missions" className="bg-[var(--bg)] py-16 sm:py-20">
      <Container className="space-y-16">
        {visible.map((mission) => (
          <MissionSection key={mission.id} mission={mission} query={query} />
        ))}
        {visible.every((mission) => filterProjects(mission.projects, query).length === 0) ? (
          <p className="text-sm text-[var(--text-muted)]">Aucune photo ne correspond à cette recherche.</p>
        ) : null}
      </Container>
      </div>
    </div>
  );
}

function MissionSection({ mission, query }: { mission: Mission; query: string }) {
  const projects = filterProjects(mission.projects, query);
  if (projects.length === 0) return null;

  return (
    <section id={mission.id} className="scroll-mt-24" aria-labelledby={`titre-${mission.id}`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 id={`titre-${mission.id}`} className="font-display text-4xl text-[var(--text)] sm:text-5xl">
              {mission.title}
            </h2>
            <span className="rounded-full bg-[var(--badge-bg)] px-3 py-1 text-xs font-semibold text-[var(--green-700)] dark:text-[var(--lime)]">
              Mission en cours
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{mission.text}</p>
        </div>
      </div>
      <PhotoGrid projects={projects} label={`Photos du projet ${mission.title}`} />
    </section>
  );
}

function PhotoGrid({ projects, label }: { projects: FieldProject[]; label: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((current) => (current === null ? current : (current + 1) % projects.length));
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current === null ? current : (current - 1 + projects.length) % projects.length));
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, projects.length]);

  const current = index === null ? null : projects[index];

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 min-[1280px]:grid-cols-3" aria-label={label}>
        {projects.map((project, photoIndex) => (
          <li key={project.image}>
            <figure className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <button
                type="button"
                onClick={() => setIndex(photoIndex)}
                className="relative block h-[280px] w-full"
                aria-label={`Agrandir : ${project.alt}`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </button>
              <figcaption className="p-5">
                <h3 className="font-display text-2xl text-[var(--text)]">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{project.text}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--green-900)]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Fermer"
            onClick={() => setIndex(null)}
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-[var(--lime)] text-[var(--green-900)]"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={() => setIndex((index! - 1 + projects.length) % projects.length)}
            className="absolute left-3 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-[var(--on-dark)] sm:left-6"
          >
            ‹
          </button>
          <figure className="max-h-[85vh] w-full max-w-4xl">
            <div className="relative mx-auto h-[70vh] w-full">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption id={titleId} className="mt-3 text-center text-sm text-[var(--on-dark)]">
              <span className="font-display text-xl">{current.title}</span>
              <span className="mt-1 block text-[var(--on-dark-muted)]">{current.text}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={() => setIndex((index! + 1) % projects.length)}
            className="absolute right-3 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-[var(--on-dark)] sm:right-6"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}

function filterProjects(projects: FieldProject[], query: string) {
  if (!query) return projects;
  return projects.filter((project) =>
    `${project.title} ${project.text} ${project.alt}`.toLocaleLowerCase("fr").includes(query),
  );
}
