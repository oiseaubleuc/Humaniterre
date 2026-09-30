import Link from "next/link";
import { vzw } from "@/config/vzwData";
import { donateHref, navLinks } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

const footerLinks = [...navLinks, { href: donateHref, label: "Faire un don" }];

export function Footer() {
  return (
    <footer className="bg-[var(--green-900)] text-[var(--on-dark)]">
      <Container className="grid gap-10 py-12 sm:grid-cols-3 sm:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Collectif Humaniterre, accueil">
            <img src="/images/logo-dark.png" alt="" className="size-12 object-contain" />
            <span className="font-display text-xl">Collectif Humaniterre</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--on-dark-muted)]">{vzw.slogan}</p>
        </div>

        <nav aria-label="Pied de page">
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--lime)]">Navigation</p>
          <ul className="mt-4 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center text-sm hover:text-[var(--lime)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[2.4px] text-[var(--lime)]">Contact</p>
          <a href={`mailto:${vzw.email}`} className="mt-4 inline-flex min-h-11 items-center text-sm hover:text-[var(--lime)]">
            {vzw.email}
          </a>
          <p className="text-sm text-[var(--on-dark-muted)]">BCE {vzw.kbo}</p>
          <a
            href={vzw.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Collectif Humaniterre"
            className="mt-4 inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-[var(--on-dark)] transition hover:bg-[var(--lime)] hover:text-[var(--green-900)]"
          >
            <InstagramIcon />
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5">
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
