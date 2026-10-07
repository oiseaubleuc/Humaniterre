import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  text,
  align = "start",
  className,
}: PageIntroProps) {
  const centered = align === "center";

  return (
    <header className={className ?? "bg-[var(--green-900)] text-[var(--on-dark)]"}>
      <Container className={`py-16 sm:py-24 ${centered ? "text-center" : ""}`}>
        {eyebrow ? (
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--lime)]">{eyebrow}</p>
        ) : null}
        <h1
          className={`${eyebrow ? "mt-4" : ""} font-display text-4xl leading-tight text-[var(--on-dark)] sm:text-6xl ${
            centered ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {title}
        </h1>
        {text ? (
          <p
            className={`mt-5 max-w-2xl text-base leading-7 text-[var(--on-dark-muted)] ${
              centered ? "mx-auto" : ""
            }`}
          >
            {text}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
