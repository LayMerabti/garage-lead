import type { BusinessConfig } from './types';
import { atelierFerrand } from './businesses/atelier-ferrand';

// Registre central : pour dupliquer sur un nouveau métier, ajouter une ligne
// ici + un fichier dans /businesses. Aucun composant ne change.
const registry: Record<string, BusinessConfig> = {
  'atelier-ferrand': atelierFerrand,
};

// VITE_BUSINESS définit quel client est buildé (voir .env)
const businessId = import.meta.env.VITE_BUSINESS || 'atelier-ferrand';

export const businessConfig: BusinessConfig = registry[businessId] ?? atelierFerrand;
