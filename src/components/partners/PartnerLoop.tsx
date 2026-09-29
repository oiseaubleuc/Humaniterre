const partners = [
  { src: "/partners/cappuccino.png", name: "Cappuccino Brussels" },
  { src: "/partners/cookienes.png", name: "Cookie'Nes" },
  { src: "/partners/sel-miel.png", name: "Sel & Miel" },
  { src: "/partners/blmeya.png", name: "Blmeya" },
  { src: "/partners/mya.png", name: "MYA Event" },
  { src: "/partners/bekubik.png", name: "Bekubik" },
  { src: "/partners/amira.png", name: "Turbans by Amira" },
  { src: "/partners/hanane.png", name: "Hanane Afellah" },
  { src: "/partners/legrain.png", name: "Legrain" },
  { src: "/partners/lmb.png", name: "Ligue des Musulmans de Belgique" },
  { src: "/partners/nora.png", name: "Nora Creation" },
  { src: "/partners/mont-lax.png", name: "Le Mont Lax" },
  { src: "/partners/bourse.png", name: "Bourse Design" },
  { src: "/partners/candyman.png", name: "The Candyman" },
  { src: "/partners/lotulys.png", name: "Lotulys" },
] as const;

export function PartnerLoop() {
  const loop = [...partners, ...partners];

  return (
    <div className="overflow-hidden" aria-label="Nos partenaires">
      <div className="logo-loop flex w-max items-center gap-14 px-4">
        {loop.map((partner, index) => (
          <img
            key={`${partner.src}-${index}`}
            src={partner.src}
            alt={index < partners.length ? partner.name : ""}
            className="h-8 w-auto max-w-28 shrink-0 object-contain sm:h-10"
          />
        ))}
      </div>
    </div>
  );
}
