import type { BusinessConfig } from '../config/types';

export function Hero({ config }: { config: BusinessConfig }) {
  return (
    <section
      className="relative px-8 pt-28 pb-24 text-white"
      style={{
        background: `linear-gradient(100deg, rgba(22,25,28,0.94) 0%, rgba(22,25,28,0.75) 60%, rgba(22,25,28,0.55) 100%), var(--color-steel)`,
      }}
    >
      <div className="max-w-[620px] mx-auto">
        <span
          className="inline-block text-sm uppercase tracking-wide border px-3.5 py-1.5 mb-5"
          style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
        >
          {config.tagline}
        </span>
        <h1
          className="text-[clamp(2.3rem,4.6vw,3.3rem)] leading-tight mb-5 uppercase font-semibold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.heroTitle}
        </h1>
        <p className="max-w-[46ch] text-gray-300 text-base mb-8">{config.heroSubtitle}</p>
        <div className="flex gap-3.5 flex-wrap">
          <a
            href="#devis"
            className="inline-block px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--color-accent)' }}
          >
            Demander un devis
          </a>
          <a
            href="#services"
            className="inline-block px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white border border-white hover:bg-white hover:text-[var(--color-ink)] transition-colors"
          >
            Voir les prestations
          </a>
        </div>
      </div>
    </section>
  );
}
