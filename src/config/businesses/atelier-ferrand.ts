import type { BusinessConfig } from '../types';

export const atelierFerrand: BusinessConfig = {
  id: 'atelier-ferrand',
  name: 'Atelier Ferrand',
  tagline: 'Garage automobile — Toutes marques',
  heroTitle: "L'exigence du travail bien fait pour l'entretien et la réparation de votre auto.",
  heroSubtitle:
    "Entretien, révision, diagnostic électronique et pneumatiques — un travail sérieux, des devis clairs, et des délais tenus.",
  logoLabel: 'Atelier',
  logoAccent: 'Ferrand',

  theme: {
    colorInk: '#16191c',
    colorSteel: '#2b3a45',
    colorAccent: '#e2672a',
    colorAccentSoft: '#f6c7a8',
    colorBg: '#f2f1ee',
    fontDisplay: 'Oswald',
    fontBody: 'Inter',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
  },

  trustItems: [
    { label: "15 ans d'expérience", icon: 'award' },
    { label: 'Toutes marques acceptées', icon: 'car' },
    { label: 'Devis gratuit sous 24h', icon: 'clock' },
    { label: 'Véhicule de courtoisie disponible', icon: 'shield' },
  ],

  services: [
    { title: 'Vidange & entretien', description: 'Vidange complète, filtres, niveaux, contrôle des points de sécurité', price: 'À partir de 79€', icon: 'oil' },
    { title: 'Révision constructeur', description: "Suivi du carnet d'entretien, respect des préconisations", price: 'À partir de 149€', icon: 'book' },
    { title: 'Diagnostic électronique', description: 'Lecture des voyants moteur, détection de panne valise', price: 'À partir de 45€', icon: 'diagnostic' },
    { title: 'Pneumatiques', description: 'Montage, équilibrage, parallélisme, toutes marques', price: 'Sur devis', icon: 'tire' },
    { title: 'Freinage', description: 'Plaquettes, disques, contrôle du circuit hydraulique', price: 'À partir de 99€', icon: 'brake' },
    { title: 'Préparation contrôle technique', description: 'Contrôle des points de vigilance avant passage au CT', price: 'À partir de 39€', icon: 'check' },
  ],

  stats: [
    { value: '15', label: "ans d'expérience" },
    { value: '2400+', label: 'véhicules entretenus' },
    { value: '24h', label: 'délai de devis' },
    { value: '100%', label: 'devis avant intervention' },
  ],

  address: "8 rue de l'Industrie, 69100 Villeurbanne",
  city: 'Villeurbanne',
  phone: '04 78 XX XX XX',
  email: 'contact@atelierferrand-exemple.fr',

  hours: [
    { day: 'Lundi – Vendredi', hours: '8h–12h · 14h–18h30' },
    { day: 'Samedi', hours: '8h30–12h30' },
    { day: 'Dimanche', hours: 'Fermé' },
  ],

  formOptions: {
    prestations: [
      { label: 'Entretien / Vidange', icon: 'oil', priceHint: 'À partir de 79€' },
      { label: 'Révision constructeur', icon: 'book', priceHint: 'À partir de 149€' },
      { label: 'Diagnostic / Voyant', icon: 'diagnostic', priceHint: 'À partir de 45€' },
      { label: 'Freinage / Amortisseurs', icon: 'brake', priceHint: 'À partir de 99€' },
      { label: 'Pneumatiques', icon: 'tire', priceHint: 'Sur devis' },
      { label: 'Autre demande', icon: 'check' },
    ],
  },

  webhookUrl: 'http://localhost:5678/webhook-test/nouveau-devis',
  plateLookupUrl: 'http://localhost:5678/webhook/plaque',
  fallbackEmail: 'contact@atelierferrand-exemple.fr',
  // Pas de photo pour l'instant — le Hero utilise un fond texturé de secours.
  // Pour activer une vraie photo : déposer le fichier dans /public/images/
  // et renseigner heroImageUrl ci-dessous, ex: '/images/atelier-hero.jpg'.
  heroImageUrl: '/images/garage-mecanique.jpg',
  // PLACEHOLDER DE DÉMO — chiffres fictifs. À remplacer par la vraie note
  // Google du garage avant toute mise en ligne ou démo client.
  googleRating: { value: '4.8', count: 200 },
};
