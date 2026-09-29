import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  text: string;
  className?: string;
};

export function PageIntro({ eyebrow, title, text, className }: PageIntroProps) {
  return (
    <header
      className={
        className ??
        "border-b border-[#8b9a56]/30 bg-[#2f3a22] dark:border-[#8b9a56]/20 dark:bg-[#101c16]"
      }
    >
      <Container className="py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8f3e4]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#e7f6ee]">{text}</p>
      </Container>
    </header>
  );
}
