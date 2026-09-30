import Link from "next/link";
import { donateHref } from "@/config/navigation";
import { vzw } from "@/config/vzwData";
import { Container } from "@/components/ui/Container";

export function DonateCta() {
  return (
    <section className="bg-[var(--bg)] py-16 sm:py-20">
      <Container>
        <div className="rounded-[32px] bg-[var(--green-900)] px-6 py-10 sm:px-12 sm:py-14">
          <h2 className="max-w-3xl font-display text-3xl leading-tight text-[var(--on-dark)] sm:text-5xl">
            Chaque don devient une action sur le terrain.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--on-dark-muted)]">
            Don unique ou mensuel, en ligne ou par virement sans frais sur le compte {vzw.ibanDisplay}.
          </p>
          <Link
            href={`${donateHref}#don`}
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--lime)] px-6 text-sm font-semibold text-[var(--green-900)] transition hover:brightness-95"
          >
            Faire un don
          </Link>
        </div>
      </Container>
    </section>
  );
}
