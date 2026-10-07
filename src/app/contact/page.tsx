import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { vzw } from "@/config/vzwData";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire au Collectif Humaniterre ASBL : info@collectif-humaniterre.be, Ganshoren.",
};

export default function ContactPage() {
  return (
    <main id="contenu">
      <PageIntro title="Contact" />
      <Container className="grid gap-12 py-14 lg:grid-cols-2 sm:py-16">
        <ContactForm />
        <address className="not-italic">
          <ul className="space-y-5 text-sm leading-6">
            <li>
              <a
                href={`mailto:${vzw.email}`}
                className="inline-flex min-h-11 items-start gap-3 text-[var(--text)] transition hover:text-[var(--green-700)]"
              >
                <Mail className="mt-0.5 size-4 text-[var(--green-700)]" aria-hidden="true" />
                {vzw.email}
              </a>
            </li>
            <li>
              <a
                href={vzw.phoneHref}
                className="inline-flex min-h-11 items-start gap-3 text-[var(--text)] transition hover:text-[var(--green-700)]"
              >
                <Phone className="mt-0.5 size-4 text-[var(--green-700)]" aria-hidden="true" />
                {vzw.phone}
              </a>
            </li>
            <li className="text-[var(--text-muted)]">
              N° d&apos;entreprise{" "}
              <span className="font-medium text-[var(--text)]">{vzw.kbo}</span>
            </li>
          </ul>
        </address>
      </Container>
    </main>
  );
}
