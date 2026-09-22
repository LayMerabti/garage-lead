import type { BusinessConfig } from '../config/types';

export function Hero({ config }: { config: BusinessConfig }) {
  const hasPhoto = Boolean(config.heroImageUrl);

  return (
    <section
      className="relative px-8 pt-10 pb-8 md:pt-28 md:pb-24 text-white bg-cover bg-center"
      style={{
        backgroundImage: hasPhoto
          ? `linear-gradient(100deg, rgba(22,25,28,0.88) 0%, rgba(22,25,28,0.72) 55%, rgba(22,25,28,0.5) 100%), url(${config.heroImageUrl})`
          : // Fond de secours tant qu'aucune photo réelle n'est fournie : dégradé +
            // grille technique très subtile, plutôt qu'un aplat plat.
            `linear-gradient(100deg, rgba(22,25,28,0.96) 0%, rgba(22,25,28,0.88) 60%, rgba(22,25,28,0.8) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 14px), var(--color-steel)`,
      }}
    >
      <div className="max-w-[640px] mx-auto">
        <span
          className="inline-block text-sm uppercase tracking-wide border px-3.5 py-1.5 mb-4 md:mb-5"
          style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
        >
          {config.tagline}
        </span>
        <h1
          className="text-[clamp(1.6rem,4.2vw,2.6rem)] leading-[1.15] mb-3 md:mb-5 uppercase font-semibold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.heroTitle}
        </h1>
        <p className="max-w-[46ch] text-gray-300 text-base mb-5 md:mb-8" style={{ fontFamily: 'var(--font-body)' }}>
          {config.heroSubtitle}
        </p>

        {/* flex-nowrap : les deux CTA restent côte à côte à toute taille d'écran.
            flex-1 + text plus petit sur mobile pour que ça tienne même sur un
            écran étroit (320px). Seul le CTA principal a un fond plein — le
            secondaire reste discret pour ne pas lui faire concurrence. */}
        <div className="flex flex-nowrap gap-2.5 md:gap-3.5">
          <a
            href="#devis"
            className="flex-1 md:flex-none text-center px-3 md:px-6 py-3 md:py-3.5 text-xs md:text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--color-accent)' }}
          >
            Demander un devis
          </a>
          <a
            href="#services"
            className="flex-1 md:flex-none text-center px-3 md:px-6 py-3 md:py-3.5 text-xs md:text-sm font-medium uppercase tracking-wide text-white/80 border border-white/40 hover:bg-white/10 hover:text-white hover:border-white transition-colors"
          >
            Voir les prestations
          </a>
        </div>
      </div>
    </section>
  );
}
