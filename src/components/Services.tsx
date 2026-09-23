import type { BusinessConfig, ServiceItem } from '../config/types';

export function Services({ config }: { config: BusinessConfig }) {
  return (
    <section id="services" className="py-10 md:py-24" style={{ background: 'linear-gradient(180deg, rgba(226,103,42,0.05), rgba(22,25,28,0.02))' }}>
      <div className="max-w-[1080px] mx-auto px-8">
        <div
          className="flex justify-between items-end gap-6 mb-6 md:mb-12 border-b-2 pb-3 md:pb-6"
          style={{ borderColor: 'var(--color-ink)' }}
        >
          <h2
            className="text-[clamp(1.5rem,2.8vw,2.1rem)] uppercase font-semibold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nos prestations
          </h2>
          <p className="text-gray-600 max-w-[34ch] text-sm hidden md:block">
            Un atelier équipé pour l'entretien courant comme les réparations plus techniques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {config.services.map((service) => (
            <div
              key={service.title}
              className="p-5 md:p-6 rounded-2xl border shadow-sm backdrop-blur-sm"
              style={{
                background: 'rgba(255,255,255,0.7)',
                borderColor: 'var(--color-accent-soft)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-lg uppercase font-semibold pr-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.title}
                </div>
                <ServiceIcon name={service.icon} />
              </div>
              <div className="text-sm text-gray-600 mb-4">{service.description}</div>
              <div className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>
                {service.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ name }: { name: ServiceItem['icon'] }) {
  const common = {
    width: 30,
    height: 30,
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
