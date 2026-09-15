import { useEffect } from 'react';
import type { BusinessConfig } from '../config/types';

// Injecte les couleurs de la config comme variables CSS + charge la Google
// Font du client au runtime. Permet de changer totalement l'identité visuelle
// sans toucher aux composants.
export function useBusinessTheme(config: BusinessConfig) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-ink', config.theme.colorInk);
    root.style.setProperty('--color-steel', config.theme.colorSteel);
    root.style.setProperty('--color-accent', config.theme.colorAccent);
    root.style.setProperty('--color-accent-soft', config.theme.colorAccentSoft);
    root.style.setProperty('--color-bg', config.theme.colorBg);
    root.style.setProperty('--font-display', `'${config.theme.fontDisplay}', sans-serif`);
    root.style.setProperty('--font-body', `'${config.theme.fontBody}', sans-serif`);

    const linkId = 'business-google-font';
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = config.theme.googleFontsUrl;

    document.title = `${config.name} — ${config.tagline}`;
  }, [config]);
}
