import type { ServiceItem } from '../../config/types';

// Icônes de prestations, partagées entre les cartes "Nos prestations" et
// l'étape 2 du formulaire de devis — une seule source pour rester cohérent.
export function ServiceIcon({ name, size = 24 }: { name: ServiceItem['icon']; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--color-accent)',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'shrink-0',
  };

  switch (name) {
    case 'oil':
      return (
        <svg {...common}>
          <path d="M9 3h4l1 3H8l1-3Z" />
          <path d="M7 6h8l1 15H6L7 6Z" />
          <path d="M9 11h4" />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path d="M4 5a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5Z" />
          <path d="M4 19a2 2 0 0 1 2-2h12" />
          <path d="M8 7h6M8 10h6" />
        </svg>
      );
    case 'diagnostic':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
          <circle cx="9" cy="10" r="1.4" />
          <path d="M13 8h5M13 11h3" />
        </svg>
      );
    case 'tire':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case 'brake':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M9 12.5 11.2 15 16 9.5" />
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z" />
        </svg>
      );
  }
}
