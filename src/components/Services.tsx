import type { BusinessConfig } from '../config/types';

export function Services({ config }: { config: BusinessConfig }) {
  return (
    <section id="services" className="py-10 md:py-24">
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
          {config.services.map((service, i) => (
            <div key={service.title} className="bg-white p-5 md:p-7 border-t-[3px]" style={{ borderColor: 'var(--color-accent)' }}>
              <div className="text-sm mb-2 md:mb-2.5" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-lg mb-2 md:mb-2.5 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                {service.title}
              </div>
              <div className="text-sm text-gray-600 mb-3 md:mb-3.5">{service.description}</div>
              <div className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>{service.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
