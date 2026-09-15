import type { BusinessConfig } from '../config/types';

export function TrustBar({ config }: { config: BusinessConfig }) {
  return (
    <div className="py-5 text-white" style={{ background: 'var(--color-steel)' }}>
      <div className="max-w-[1080px] mx-auto px-8 flex flex-col md:flex-row justify-between flex-wrap gap-4">
        {config.trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-sm uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--color-accent)' }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
