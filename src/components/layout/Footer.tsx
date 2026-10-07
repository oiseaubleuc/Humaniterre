import Link from "next/link";
import { vzw } from "@/config/vzwData";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[var(--green-900)] text-[var(--on-dark)]">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between sm:py-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Collectif Humaniterre, accueil">
            <img src="/images/logo-dark.png" alt="" className="size-10 object-contain" />
            <span className="font-display text-lg">Collectif Humaniterre</span>
          </Link>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--lime)]">Contact</p>
          <a href={`mailto:${vzw.email}`} className="mt-2 inline-flex items-center text-sm hover:text-[var(--lime)]">
            {vzw.email}
          </a>
          <p className="mt-2 text-sm text-[var(--on-dark-muted)]">{vzw.kbo}</p>
          <a
            href={vzw.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Collectif Humaniterre"
            className="mt-3 inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-[var(--on-dark)] transition hover:bg-[var(--lime)] hover:text-[var(--green-900)]"
          >
            <InstagramIcon />
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-3">
          <p className="text-xs text-[var(--on-dark-muted)]">© {new Date().getFullYear()} {vzw.legalName}</p>
        </Container>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
