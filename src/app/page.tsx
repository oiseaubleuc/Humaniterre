import { donateHref } from "@/config/navigation";
import { vzw } from "@/config/vzwData";
import { about, values } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const valueIcons = ["01", "02", "03", "04"];

export default function HomePage() {
  return (
    <main id="contenu">
      <section className="bg-[#15261e]">
        <img
          src="/images/accueil-chemin.jpg"
          alt="Membres du collectif marchent avec des enfants sur un sentier, en Guinée."
          className="block h-auto w-full"
        />
        <Container className="py-10 sm:py-14">
          <div className="max-w-2xl text-[#f4f6ee]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              {vzw.legalName}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {vzw.slogan}
            </h1>
            <div className="mt-8">
              <Button href={donateHref} showArrow>
                Nous soutenir
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl italic text-[#d5e09a] sm:text-4xl">
              Qui sommes-nous ?
            </h2>
            <p className="mt-6 text-base leading-7 text-[#d5dcc0]">{about.intro}</p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="rounded-3xl border border-[#8b9a56]/30 bg-[#15261e] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d5e09a]/50"
              >
                <p className="font-display text-sm text-[#d5e09a]">{valueIcons[index]}</p>
                <h3 className="mt-3 font-display text-xl text-[#f3f5e8]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d5dcc0]">{value.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <Button href={donateHref} variant="forest" showArrow>
              Nous soutenir
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
