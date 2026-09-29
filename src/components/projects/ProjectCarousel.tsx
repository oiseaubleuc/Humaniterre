"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FieldProject } from "@/content/guineaProjects";

type ProjectCarouselProps = {
  projects: FieldProject[];
  label: string;
};

export function ProjectCarousel({ projects, label }: ProjectCarouselProps) {
  const scroller = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  function metrics() {
    const el = scroller.current;
    if (!el || el.children.length === 0) return null;
    const card = el.children[0] as HTMLElement;
    const gap = 16;
    const perView = Math.max(1, Math.round((el.clientWidth + gap) / (card.offsetWidth + gap)));
    const total = Math.max(1, Math.ceil(projects.length / perView));
    return { el, card, gap, perView, total };
  }

  function goTo(next: number) {
    const current = metrics();
    if (!current) return;
    const index = ((next % current.total) + current.total) % current.total;
    current.el.scrollTo({
      left: index * current.perView * (current.card.offsetWidth + current.gap),
      behavior: "smooth",
    });
    setPage(index);
  }

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const sync = () => {
      const current = metrics();
      if (!current) return;
      setPages(current.total);
      const index = Math.round(current.el.scrollLeft / (current.perView * (current.card.offsetWidth + current.gap)));
      setPage(Math.min(current.total - 1, Math.max(0, index)));
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [projects.length]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || pages < 2) return;
    const timer = window.setInterval(() => goTo(page + 1), 4500);
    return () => window.clearInterval(timer);
  }, [paused, page, pages]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={label}
      >
        {projects.map((project) => (
          <li
            key={project.image}
            className="w-full shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
          >
            <article className="overflow-hidden rounded-[1.5rem] border border-[#8b9a56]/30 bg-[#15261e] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {project.status}
                </span>
                <h3 className="mt-3 font-display text-2xl text-[#f4f6ee]">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d5dcc0]">{project.text}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <CarouselButton label="Photo précédente" onClick={() => goTo(page - 1)}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </CarouselButton>
          <CarouselButton label="Photo suivante" onClick={() => goTo(page + 1)}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </CarouselButton>
        </div>
        <div className="flex flex-wrap justify-end gap-2" role="tablist" aria-label="Pages de la galerie">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === page}
              aria-label={`Page ${index + 1}`}
              onClick={() => goTo(index)}
              className={`size-2.5 rounded-full transition ${
                index === page ? "bg-emerald-400" : "bg-emerald-600/40 hover:bg-emerald-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-emerald-600/50 bg-[#15261e] text-emerald-300 transition hover:bg-emerald-600 hover:text-white"
    >
      {children}
    </button>
  );
}
