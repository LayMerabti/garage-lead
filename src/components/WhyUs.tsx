import type { BusinessConfig } from '../config/types';

export function WhyUs({ config }: { config: BusinessConfig }) {
  return (
    <section id="pourquoi" className="py-24 text-white" style={{ background: 'var(--color-ink)' }}>
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="flex justify-between items-end gap-6 mb-12 border-b-2 pb-6 border-white/15">
          <h2 className="text-[clamp(1.6rem,2.8vw,2.1rem)] uppercase font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Pourquoi nous faire confiance
          </h2>
          <p className="text-gray-400 max-w-[34ch] text-sm hidden md:block">
            Un atelier familial qui privilégie la transparence sur chaque intervention.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {config.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl mb-2" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
