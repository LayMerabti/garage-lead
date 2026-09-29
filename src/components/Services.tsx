import type { BusinessConfig } from '../config/types';
import { ServiceIcon } from './icons/ServiceIcon';

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
                <ServiceIcon name={service.icon} size={30} />
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
