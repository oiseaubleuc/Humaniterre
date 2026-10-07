import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import styles from "./home.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--home-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collectif Humaniterre ASBL",
  description:
    "L'eau potable, l'électricité : une norme pour nous, une urgence pour nos bénéficiaires. Missions en Guinée et au Bangladesh.",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.arrow}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className={`${styles.page} ${montserrat.variable}`}>
      {/* Photo d'en-tête */}
      <div className={styles.heroImage}>
        <img
          src="/images/accueil.jpg"
          alt="Membres du collectif marchent avec des enfants sur un sentier."
          width={1024}
          height={576}
          className={styles.heroImg}
        />
      </div>

      {/* Bandeau titre */}
      <section className={styles.band}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            L&apos;eau potable, l&apos;électricité : une norme pour nous, une urgence
            pour nos bénéficiaires.
          </h1>
          <Link href="/don" className={styles.linkButton}>
            Nous soutenir <Arrow />
          </Link>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className={styles.about}>
        <div className={styles.container}>
          <h2 className={styles.aboutTitle}>Qui sommes-nous ?</h2>
          <div className={styles.aboutText}>
            <p>
              Le Collectif Humaniterre est une association née d&apos;une conviction
              forte : l&apos;impact humanitaire est décuplé lorsque les compétences, les
              énergies et les ressources sont unies.
            </p>
            <p>
              Nous rassemblons des acteurs associatifs, humanitaires, cadres et
              entrepreneurs engagés, qui mettent leurs expertises au service de causes
              essentielles : l&apos;apport en eau potable, l&apos;alimentation, l&apos;éducation,
              l&apos;environnement et la culture.
            </p>
            <p>
              Au cœur de l&apos;action, nous agissons avec des valeurs fondamentales de
              rigueur, de transparence et d&apos;éthique.
            </p>
          </div>

          <div className={styles.center}>
            <Link href="/don" className={styles.pillButton}>
              Nous soutenir <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
