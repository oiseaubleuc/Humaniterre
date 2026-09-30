import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import DonationForm from "./DonationForm";
import CopyButton from "./CopyButton";
import styles from "./don.module.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--don-font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--don-font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faire un don – Collectif Humaniterre",
  description:
    "Soutenez les missions du Collectif Humaniterre en Guinée et au Bangladesh : don en ligne sécurisé (Bancontact, carte) ou virement sans frais.",
};

const IBAN = "BE38 9733 7520 9572";
const BIC = "ARSPBE22";
const COMMUNICATION = "Don ASBL Collectif Humaniterre";

// Remplace ce chemin par celui du QR code EPC déjà présent dans le projet.
const QR_EPC_SRC = "/qr-epc.png";

export default function DonPage() {
  return (
    <main className={`${styles.page} ${fraunces.variable} ${manrope.variable}`}>
      {/* HERO + FORMULAIRE */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrowLight}>Soutenir Humaniterre</p>
            <h1 className={styles.heroTitle}>
              Votre don devient une action concrète sur le terrain.
            </h1>
            <p className={styles.heroLead}>
              Vos dons financent nos missions en Guinée et au Bangladesh : eau
              potable, alimentation, éducation, environnement et culture.
            </p>
            <ul className={styles.trustList}>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                Paiement sécurisé par Stripe, vos données bancaires ne passent
                pas par notre site
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                Confirmation envoyée par email après chaque don
              </li>
            </ul>
          </div>

          <div id="formulaire" className={styles.formCard}>
            <DonationForm />
          </div>
        </div>
      </section>

      {/* VIREMENT */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.sectionIntro}>
            <span className={styles.badge}>0 % de frais</span>
            <h2 className={styles.sectionTitle}>Vous préférez le virement ?</h2>
            <p className={styles.sectionText}>
              C&apos;est l&apos;option la plus avantageuse pour l&apos;association :
              aucune commission, la totalité du montant arrive sur notre compte.
              Idéal aussi pour mettre en place un ordre permanent depuis votre
              banque.
            </p>
          </div>

          <div className={styles.bankCard}>
            <dl className={styles.bankList}>
              <div className={styles.bankRow}>
                <div>
                  <dt>Bénéficiaire</dt>
                  <dd>Collectif Humaniterre ASBL</dd>
                </div>
              </div>
              <div className={styles.bankRow}>
                <div>
                  <dt>IBAN</dt>
                  <dd className={styles.iban}>{IBAN}</dd>
                </div>
                <CopyButton value={IBAN.replace(/\s/g, "")} label="Copier l'IBAN" />
              </div>
              <div className={styles.bankRow}>
                <div>
                  <dt>BIC</dt>
                  <dd>{BIC}</dd>
                </div>
              </div>
              <div className={styles.bankRow}>
                <div>
                  <dt>Communication</dt>
                  <dd>{COMMUNICATION}</dd>
                </div>
                <CopyButton value={COMMUNICATION} label="Copier la communication" />
              </div>
            </dl>

            <div className={styles.qrBlock}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={QR_EPC_SRC}
                alt="QR code EPC pour un virement vers le Collectif Humaniterre"
                className={styles.qrImage}
                width={180}
                height={180}
              />
              <p>Scannez avec l&apos;app de votre banque, le montant se saisit dans l&apos;app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.twoCol}>
          <h2 className={styles.sectionTitle}>Questions fréquentes</h2>
          <div className={styles.faq}>
            <details>
              <summary>Le paiement en ligne est-il sûr ?</summary>
              <p>
                Le paiement est traité par Stripe. Humaniterre ne voit ni ne
                stocke jamais vos données de carte ou de compte.
              </p>
            </details>
            <details>
              <summary>Pourquoi recommandez-vous le virement ?</summary>
              <p>
                Le paiement en ligne entraîne une petite commission prélevée par
                l&apos;intermédiaire. Le virement n&apos;en a aucune : chaque euro
                va au projet.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
