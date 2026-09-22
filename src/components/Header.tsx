import type { BusinessConfig } from '../config/types';

export function Header({ config }: { config: BusinessConfig }) {
  const telHref = `tel:${config.phone.replace(/\s/g, '')}`;

  return (
    <header
      className="sticky top-0 z-50 border-b-[3px]"
      style={{ background: 'var(--color-ink)', borderColor: 'var(--color-accent)' }}
    >
      <nav className="max-w-[1080px] mx-auto flex items-center justify-between px-5 md:px-8 py-3 md:py-4 gap-3">
        <div
          className="uppercase tracking-wide text-white text-lg md:text-xl font-semibold shrink-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.logoLabel}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{config.logoAccent}</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm uppercase tracking-wide text-gray-300">
          <a href="#services" className="border-b-2 border-transparent hover:border-[var(--color-accent)] hover:text-white transition-colors pb-0.5">Prestations</a>
          <a href="#pourquoi" className="border-b-2 border-transparent hover:border-[var(--color-accent)] hover:text-white transition-colors pb-0.5">Pourquoi nous</a>
          <a href="#devis" className="border-b-2 border-transparent hover:border-[var(--color-accent)] hover:text-white transition-colors pb-0.5">Devis</a>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Bloc contact rapide : visible dès le header, à toute taille d'écran.
              Sur mobile, seul le logo du garage apparait */}
          <a href={telHref} className="hidden md:flex items-center gap-1.5 text-gray-300 text-sm whitespace-nowrap">
             <PinIcon />
            {config.city}
          </a>
          <span className="hidden md:flex items-center gap-1.5 text-gray-300 text-sm whitespace-nowrap">
           <PhoneIcon />
            <span>{config.phone}</span>
          </span>

          {/* Masqué sur mobile : redondant avec la barre CTA sticky en bas d'écran (MobileCTA) */}
          <a
            href="#devis"
            className="hidden md:inline-block text-white text-sm font-semibold uppercase tracking-wide px-5 py-2.5"
            style={{ background: 'var(--color-accent)' }}
          >
            Devis gratuit
          </a>
        </div>
      </nav>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
