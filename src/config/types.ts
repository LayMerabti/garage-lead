// Contrat de configuration : chaque métier (garage, coiffeur, plombier...)
// fournit un objet conforme à ce type. Aucun composant ne doit être modifié
// pour ajouter un nouveau client — seulement un nouveau fichier de config.

export interface ThemeConfig {
  colorInk: string;      // fond sombre / texte principal
  colorSteel: string;    // bandeau confiance / footer
  colorAccent: string;   // couleur d'accent (CTA, liens actifs)
  colorAccentSoft: string;
  colorBg: string;       // fond général clair
  fontDisplay: string;   // Google Font pour les titres
  fontBody: string;      // Google Font pour le texte courant
  googleFontsUrl: string;
}

export interface TrustItem {
  label: string;
  icon: 'award' | 'car' | 'clock' | 'shield';
}

export interface ServiceItem {
  title: string;
  description: string;
  price: string; // ex: "À partir de 79€" ou "Sur devis"
  icon: 'oil' | 'book' | 'diagnostic' | 'tire' | 'brake' | 'check';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HoursRow {
  day: string;
  hours: string;
}

// Catégories utilisées par le formulaire multi-étapes.
export interface PrestationOption {
  label: string;
  icon: ServiceItem['icon'];
  priceHint?: string; // ex: "À partir de 79€" — affiché sur la carte pour lever l'incertitude budgétaire
}

export interface FormOptions {
  prestations: PrestationOption[];  // étape "prestation" — cartes cliquables avec icône + prix indicatif
}

export interface BusinessConfig {
  id: string;                 // identifiant technique, ex: "atelier-ferrand"
  name: string;                // ex: "Atelier Ferrand"
  tagline: string;             // accroche courte (hero eyebrow)
  heroTitle: string;
  heroSubtitle: string;
  logoLabel: string;           // texte du logo, ex: "Atelier"
  logoAccent: string;          // partie colorée du logo, ex: "Ferrand"
  theme: ThemeConfig;
  trustItems: TrustItem[];
  services: ServiceItem[];
  stats: StatItem[];
  address: string;
  city: string;                // ex: "Villeurbanne" — affiché dans le header pour un contact rapide
  phone: string;
  email: string;
  hours: HoursRow[];
  formOptions: FormOptions;
  webhookUrl: string;          // endpoint n8n (ou vide en attendant)
  fallbackEmail: string;       // adresse de secours si webhook échoue
  heroImageUrl?: string;       // photo d'arrière-plan du Hero (ex: "/images/hero.jpg"). Si absent, un fond texturé de secours est utilisé.
  // Note avis Google — PLACEHOLDER DE DÉMO. Remplacer par la vraie note et
  // le vrai nombre d'avis avant toute présentation client ou mise en ligne :
  // afficher un chiffre inventé à un vrai client serait trompeur.
  googleRating?: { value: string; count: number };
}
