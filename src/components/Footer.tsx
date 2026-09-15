import type { BusinessConfig } from '../config/types';

export function Footer({ config }: { config: BusinessConfig }) {
  return (
    <footer className="py-9 text-center text-sm text-gray-300" style={{ background: 'var(--color-steel)' }}>
      © {new Date().getFullYear()} {config.name} — {config.address}
    </footer>
  );
}
