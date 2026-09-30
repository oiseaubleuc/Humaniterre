import type { FieldProject } from "@/content/guineaProjects";

type PhotoMasonryProps = {
  projects: FieldProject[];
  label: string;
};

export function PhotoMasonry({ projects, label }: PhotoMasonryProps) {
  return (
    <div className="bg-white p-1.5 sm:p-2">
      <ul className="columns-1 gap-1.5 sm:columns-2 sm:gap-2 lg:columns-3" aria-label={label}>
        {projects.map((project) => (
          <li key={project.image} className="mb-1.5 break-inside-avoid sm:mb-2">
            <img src={project.image} alt={project.alt} className="block h-auto w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
