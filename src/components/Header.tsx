import type { BusinessConfig } from '../config/types';

export function Header({ config }: { config: BusinessConfig }) {
  return (
    <header
      className="sticky top-0 z-50 border-b-[3px]"
      style={{ background: 'var(--color-ink)', borderColor: 'var(--color-accent)' }}
    >
      <nav className="max-w-[1080px] mx-auto flex items-center justify-between px-8 py-4">
        <div
          className="uppercase tracking-wide text-white text-xl font-semibold"
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
        <a
          href="#devis"
          className="text-white text-sm font-semibold uppercase tracking-wide px-5 py-2.5"
          style={{ background: 'var(--color-accent)' }}
        >
          Devis gratuit
        </a>
      </nav>
    </header>
  );
}
