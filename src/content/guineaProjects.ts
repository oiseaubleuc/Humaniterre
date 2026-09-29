export type ProjectStatus = "En cours" | "Réalisé";

export type FieldProject = {
  image: string;
  title: string;
  text: string;
  status: ProjectStatus;
  alt: string;
};

/** Photos du projet en Guinée. Ajoutez une entrée pour une nouvelle image. */
export const guineaProjects: FieldProject[] = [
  {
    image: "/images/projects/guinee-rencontre.jpg",
    title: "Rencontre",
    text: "Le collectif avec les enfants et les familles, sur le terrain en Guinée.",
    status: "En cours",
    alt: "Groupe d'enfants et d'adultes réunis dehors, en Guinée.",
  },
  {
    image: "/images/projects/guinee-forage.jpg",
    title: "Eau",
    text: "Un forage pour rapprocher l'eau potable des habitants.",
    status: "En cours",
    alt: "Deux hommes devant une machine de forage, en Guinée.",
  },
  {
    image: "/images/projects/guinee-eclairage.jpg",
    title: "Éclairage",
    text: "Une ampoule allumée dans une maison : l'électricité reste une urgence.",
    status: "En cours",
    alt: "Deux hommes dans une pièce en terre, sous une ampoule allumée.",
  },
  {
    image: "/images/projects/guinee-ravitaillement.jpg",
    title: "Ravitaillement",
    text: "Des sacs portés ensemble pour répondre aux besoins du quotidien.",
    status: "En cours",
    alt: "Deux hommes portant un sac sous les arbres fruitiers.",
  },
  {
    image: "/images/projects/guinee-chemin.jpg",
    title: "Chemin",
    text: "Le collectif avance avec les enfants, d'une maison à l'autre.",
    status: "En cours",
    alt: "Deux adultes et deux enfants marchant sur un sentier.",
  },
  {
    image: "/images/projects/guinee-maison.jpg",
    title: "Maison",
    text: "Devant une maison en briques, les enfants tiennent la main des adultes.",
    status: "En cours",
    alt: "Adultes et enfants devant une maison en briques, en Guinée.",
  },
  {
    image: "/images/projects/guinee-echange.jpg",
    title: "Échange",
    text: "Une discussion sur le chemin, avec les partenaires locaux.",
    status: "En cours",
    alt: "Deux hommes en conversation sur une piste en terre.",
  },
  {
    image: "/images/projects/guinee-portrait.jpg",
    title: "Portrait",
    text: "Un enfant au milieu du groupe, lors de la visite en Guinée.",
    status: "En cours",
    alt: "Portrait d'un enfant tenant une sucette.",
  },
  {
    image: "/images/projects/guinee-sourire.jpg",
    title: "Sourire",
    text: "Un visage du projet : la rencontre reste au centre de l'action.",
    status: "En cours",
    alt: "Gros plan d'une enfant qui sourit.",
  },
  {
    image: "/images/projects/guinee-coeur.jpg",
    title: "Accueil",
    text: "Les enfants accueillent le collectif pendant la mission en Guinée.",
    status: "En cours",
    alt: "Une enfant fait un cœur avec ses mains, d'autres enfants derrière elle.",
  },
];
