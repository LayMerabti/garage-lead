import type { BusinessConfig, TrustItem } from '../config/types';

export function TrustBar({ config }: { config: BusinessConfig }) {
  return (
    <div className="py-3 md:py-5 text-white" style={{ background: 'var(--color-steel)' }}>
      <div className="max-w-[1080px] mx-auto px-8 flex flex-col md:flex-row justify-between flex-wrap gap-2.5 md:gap-4">
        {config.trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-sm uppercase tracking-wide">
            <TrustIcon name={item.icon} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustIcon({ name }: { name: TrustItem['icon'] }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--color-accent)',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
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
