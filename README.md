# Garage Lead — V2

Site de génération de demandes pour garages automobiles (et duplicable vers
d'autres métiers). React + TypeScript + Tailwind v4 + Vite.

## Stack
- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Vite

## Architecture config-driven

Un seul codebase, plusieurs clients. Rien dans `src/components` ne doit
jamais mentionner un métier ou un client en particulier.

```
src/
  config/
    types.ts               <- contrat BusinessConfig (ne pas dupliquer)
    registry.ts             <- sélectionne la config selon VITE_BUSINESS
    businesses/
      atelier-ferrand.ts     <- 1 fichier = 1 client
  hooks/
    useBusinessTheme.ts      <- injecte couleurs + police au runtime
    useMultiStepForm.ts      <- state machine du formulaire de devis
  components/                <- génériques, ne dépendent que de BusinessConfig
  lib/
    submitForm.ts            <- envoi + fallback fail-safe
```

## Dupliquer pour un nouveau client / métier

1. Copier `src/config/businesses/atelier-ferrand.ts` → `src/config/businesses/nom-client.ts`
2. Adapter les valeurs (couleurs, textes, prestations, champs du formulaire)
3. Ajouter la ligne dans `src/config/registry.ts` :
   ```ts
   'nom-client': nomClientConfig,
   ```
4. Créer un `.env` avec `VITE_BUSINESS=nom-client` (ou une variable d'env sur l'hébergeur)
5. `npm run build` → un nouveau site, zéro ligne de composant modifiée.

## Installation locale

```bash
npm install
npm run dev        # démarre en local sur http://localhost:5173
npm run build      # build de production dans /dist
```

## Variables d'environnement

Voir `.env` — `VITE_BUSINESS` détermine quel fichier de config est chargé.

## Le principe fail-safe

Le formulaire envoie les données au `webhookUrl` défini dans la config
(n8n). Si l'envoi échoue, l'utilisateur voit un message clair l'invitant à
appeler ou écrire directement — jamais une erreur muette. Voir
`src/lib/submitForm.ts`.

## Conventions Git

- Commits en anglais, format conventionnel : `feat:`, `fix:`, `chore:`, `docs:`
- Une branche par fonctionnalité : `feat/nom-client-config`, `feat/n8n-integration`
- `main` reste toujours déployable
