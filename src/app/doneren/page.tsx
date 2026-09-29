import type { Metadata } from "next";
import { DonatePanel } from "@/components/donate/DonatePanel";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Faire un don",
  description:
    "Soutenir Collectif Humaniterre ASBL par virement bancaire, sans commission, ou via Payconiq.",
};

export default function DonerenPage() {
  return (
    <main id="contenu">
      <PageIntro
        eyebrow="Soutien"
        title="Faire un don"
        text="Le virement bancaire ne coûte rien à l'association : la totalité du montant arrive sur le compte."
      />
      <Container className="py-12 sm:py-16">
        <DonatePanel />
      </Container>
    </main>
  );
}
