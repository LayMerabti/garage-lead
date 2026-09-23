import type { BusinessConfig, TrustItem } from '../config/types';

// Carte flottante qui chevauche légèrement le bas du Hero (margin négative),
// plutôt qu'une bande plate classique — reprend l'effet du mockup fourni.
export function TrustBar({ config }: { config: BusinessConfig }) {
  return (
    <div className="relative z-10 px-4 md:px-8 -mt-6 md:-mt-8">
      <div
        className="max-w-[1080px] mx-auto rounded-2xl shadow-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10"
        style={{ background: 'rgba(43,58,69,0.96)' }}
      >
        <div className="flex flex-col md:flex-row">
          {config.trustItems.map((item) => (
            <div
              key={item.label}
              className="flex-1 flex items-center gap-2.5 text-white text-sm px-4 py-3 md:py-4 md:justify-center border-b md:border-b-0 last:border-b-0 border-white/10"
            >
              <TrustIcon name={item.icon} />
              <span className="uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustIcon({ name }: { name: TrustItem['icon'] }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--color-accent)',
    strokeWidth: 2.1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'shrink-0',
  };

  switch (name) {
    case 'award':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
        </svg>
      );
    case 'car':
      return (
        <svg {...common}>
          <path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M3 11l1.5-4.5A2 2 0 0 1 6.4 5h11.2a2 2 0 0 1 1.9 1.5L21 11M3 11v4a1 1 0 0 0 1 1h1M21 11v4a1 1 0 0 1-1 1h-1M3 11h18" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}
