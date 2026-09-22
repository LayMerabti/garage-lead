import type { BusinessConfig } from '../config/types';

// Barre d'action fixe en bas d'écran (mobile uniquement). Effet glassmorphism
// (fond semi-transparent + flou) pour un rendu moins agressif qu'un aplat de
// couleur plein, tout en gardant une zone de clic large et un contraste net
// (icônes SVG blanches, jamais d'emoji dont le rendu varie selon l'OS).
export function MobileCTA({ config }: { config: BusinessConfig }) {
  return (
    <div
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 flex overflow-hidden rounded-2xl shadow-lg backdrop-blur-md"
      style={{
        marginBottom: 'env(safe-area-inset-bottom)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <a
        href={`tel:${config.phone.replace(/\s/g, '')}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wide text-white"
        style={{ background: 'rgba(43,58,69,0.88)' }}
      >
        <PhoneIcon />
        Appeler
      </a>
      <a
        href="#devis"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wide text-white"
        style={{ background: 'rgba(226,103,42,0.92)' }}
      >
        <QuoteIcon />
        Devis
      </a>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15h6M9 11h3" />
    </svg>
  );
}
