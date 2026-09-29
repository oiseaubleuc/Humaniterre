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
      <PageIntro
        eyebrow="Échange"
        title="Contact"
        text="Un message, un appel ou une visite : l'ASBL est joignable directement."
      />
      <Container className="grid gap-12 py-14 lg:grid-cols-2 sm:py-16">
        <ContactForm />
        <address className="not-italic">
          <ul className="space-y-5 text-sm leading-6">
            <li>
              <a
                href={`mailto:${vzw.email}`}
                className="inline-flex items-start gap-3 text-[#f3f5e8] transition hover:text-[#d5e09a]"
              >
                <Mail className="mt-0.5 size-4 text-[#d5e09a]" aria-hidden="true" />
                {vzw.email}
              </a>
            </li>
            <li>
              <a
                href={vzw.phoneHref}
                className="inline-flex items-start gap-3 text-[#f3f5e8] transition hover:text-[#d5e09a]"
              >
                <Phone className="mt-0.5 size-4 text-[#d5e09a]" aria-hidden="true" />
                {vzw.phone}
              </a>
            </li>
            <li className="text-[#c5d0b0]">
              N° d&apos;entreprise (BCE){" "}
              <span className="font-medium text-[#f3f5e8]">{vzw.kbo}</span>
            </li>
          </ul>
        </address>
      </Container>
    </main>
  );
}
