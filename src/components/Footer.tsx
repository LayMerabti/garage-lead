import type { BusinessConfig } from '../config/types';

// Footer minimal : les coordonnées complètes vivent désormais dans
// ContactSection juste au-dessus, pas de duplication ici.
export function Footer({ config }: { config: BusinessConfig }) {
  return (
    <footer className="py-5 md:py-6 text-center text-xs text-gray-400" style={{ background: 'var(--color-ink)' }}>
      © {new Date().getFullYear()} {config.name}
    </footer>
  );
}
