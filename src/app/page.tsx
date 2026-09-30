import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import styles from "./home.module.css";
// Photo d'accueil importée directement : Next.js connaît sa taille exacte,
// elle s'affiche donc en entier, sans recadrage ni agrandissement.
import heroImage from "../../public/images/accueil-chemin.jpg";

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

const VALEURS = [
  {
    n: "01",
    titre: "Rigueur",
    texte: "Chaque action est préparée avec soin, pour que l'aide tienne dans la durée.",
  },
  {
    n: "02",
    titre: "Transparence",
    texte: "Les moyens confiés à l'ASBL restent lisibles, du don jusqu'au terrain.",
  },
  {
    n: "03",
    titre: "Éthique",
    texte: "Nous agissons avec respect pour les personnes et pour les partenaires.",
  },
  {
    n: "04",
    titre: "Autonomie",
    texte: "L'urgence est traitée vite, sans installer une dépendance.",
  },
];

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
        <Image
          src={heroImage}
          alt="Des pas sur une piste en terre, sur le terrain"
          priority
          unoptimized
          placeholder="blur"
          className={styles.heroImg}
        />
      </div>

      {/* Bandeau titre */}
      <section className={styles.band}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Collectif Humaniterre ASBL</p>
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
          <p className={styles.aboutText}>
            Le Collectif Humaniterre est une association née d&apos;une conviction
            forte : l&apos;impact humanitaire est décuplé lorsque les compétences, les
            énergies et les ressources sont unies.
          </p>

          <ul className={styles.values}>
            {VALEURS.map((v) => (
              <li key={v.n} className={styles.valueCard}>
                <span className={styles.valueNumber}>{v.n}</span>
                <h3 className={styles.valueTitle}>{v.titre}</h3>
                <p className={styles.valueText}>{v.texte}</p>
              </li>
            ))}
          </ul>

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
