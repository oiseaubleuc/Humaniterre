import Link from "next/link";
import { vzw } from "@/config/vzwData";
import { donateHref, navLinks } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const footerLinks = [...navLinks, { href: donateHref, label: "Don" }];

export function Footer() {
  return (
    <footer className="border-t border-[#8b9a56]/30 bg-[#15261e] text-[#e7eedd] dark:border-[#8b9a56]/20 dark:bg-[#08110e]">
      <Container className="grid gap-8 py-8 sm:grid-cols-3 sm:items-start sm:py-10">
        <div>
          <Logo />
          <p className="mt-4 text-xs text-[#c5d0b0]/80">
            © {new Date().getFullYear()} {vzw.legalName}
          </p>
        </div>

        <nav aria-label="Pied de page">
          <ul className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#e7eedd] transition hover:text-[#d5e09a]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <a
            href={`mailto:${vzw.email}`}
            className="text-[#e7eedd] transition hover:text-[#d5e09a]"
          >
            {vzw.email}
          </a>
          <p className="mt-2 text-[#c5d0b0]">BCE {vzw.kbo}</p>
          <a
            href={vzw.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Collectif Humaniterre"
            className="mt-4 inline-flex size-10 items-center justify-center rounded-full bg-[#8b9a56]/20 text-[#e7eedd] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8b9a56] hover:text-[#0c1914]"
          >
            <InstagramIcon />
          </a>
        </div>
      </Container>
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
