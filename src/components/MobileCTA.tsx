import type { BusinessConfig } from '../config/types';

// Barre d'action fixe en bas d'écran, visible uniquement sur mobile (md:hidden).
// Objectif : quelqu'un en panne doit pouvoir appeler ou demander un devis en
// un seul geste du pouce, sans avoir à remonter en haut de page.
// pb-[env(safe-area-inset-bottom)] gère l'encoche/barre système iPhone.
export function MobileCTA({ config }: { config: BusinessConfig }) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t"
      style={{
        borderColor: 'rgba(22,25,28,0.12)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <a
        href={`tel:${config.phone.replace(/\s/g, '')}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-wide text-white"
        style={{ background: 'var(--color-steel)' }}
      >
        📞 Appeler
      </a>
      <a
        href="#devis"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-wide text-white"
        style={{ background: 'var(--color-accent)' }}
      >
        📝 Devis
      </a>
    </div>
  );
}
