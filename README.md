# HUMANITERRE

Site de Collectif Humaniterre ASBL, association à Ganshoren. Le site présente l'association, ses projets en Guinée et au Bangladesh, et les moyens de la soutenir.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Développement

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:8888](http://localhost:8888).

## Production

```bash
npm run build
npm start
```

## Pages

- `/` — accueil
- `/over-ons` — l'association
- `/projecten` — projets
- `/doneren` — don
- `/contact` — contact

Les coordonnées de l'ASBL et le lien Stripe se règlent dans `src/config/vzwData.ts`. Les photos de projet se règlent dans `src/content/guineaProjects.ts` et `src/content/bangladeshProjects.ts`.
