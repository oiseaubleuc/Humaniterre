import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const appUrl = process.env.APP_URL || "http://localhost:8888";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "HUMANITERRE — Collectif Humaniterre ASBL",
    template: "%s — HUMANITERRE",
  },
  description:
    "Collectif Humaniterre ASBL à Ganshoren : eau, alimentation, éducation, environnement et culture. Contact : info@collectif-humaniterre.be",
  openGraph: {
    title: "HUMANITERRE — Collectif Humaniterre ASBL",
    description:
      "Collectif Humaniterre ASBL : eau, alimentation, éducation, environnement et culture.",
    images: [
      {
        url: "/images/accueil-chemin.jpg",
        alt: "Membres du collectif marchent avec des enfants sur un sentier, en Guinée.",
      },
    ],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
