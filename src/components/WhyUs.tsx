import type { BusinessConfig } from '../config/types';

export function WhyUs({ config }: { config: BusinessConfig }) {
  return (
    <section id="pourquoi" className="py-10 md:py-24" style={{ background: '#e9e7e2' }}>
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="flex justify-between items-end gap-6 mb-6 md:mb-12 border-b-2 pb-3 md:pb-6" style={{ borderColor: 'var(--color-ink)' }}>
          <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Pourquoi nous faire confiance
          </h2>
          <p className="text-gray-600 max-w-[34ch] text-sm hidden md:block">
            Un atelier familial qui privilégie la transparence sur chaque intervention.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {config.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl mb-1.5 md:mb-2" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--color-ink)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
