import { useCallback, useState } from 'react';
import type { Vehicle } from '../lib/lookupPlate';

export type Step = 'vehicule' | 'prestation' | 'contact';
export type ContactPreference = 'sms' | 'appel' | 'email';

const STEPS: Step[] = ['vehicule', 'prestation', 'contact'];
export const STEP_LABELS: Record<Step, string> = {
  vehicule: 'Véhicule',
  prestation: 'Prestation',
  contact: 'Coordonnées',
};

export interface FormData {
  // Étape véhicule — mode plaque (remplissage automatique via le webhook n8n
  // de recherche de plaque) ou mode manuel.
  plaque: string;
  vehiculeManuel: boolean;
  marque: string;
  modele: string;
  motorisation: string;
  annee: string;
  // Étape prestation
  prestation: string;
  message: string;
  photos: File[];
  // Étape contact
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  contactPreference: ContactPreference;
}

const initialData: FormData = {
  plaque: '',
  vehiculeManuel: false,
  marque: '',
  modele: '',
  motorisation: '',
  annee: '',
  prestation: '',
  message: '',
  photos: [],
  prenom: '',
  nom: '',
  telephone: '',
  email: '',
  contactPreference: 'appel',
};

// ───────── Plaque d'immatriculation ─────────

// Met en forme la saisie au fil de la frappe : "ab123cd" → "AB-123-CD".
export function formatPlate(input: string): string {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  return [raw.slice(0, 2), raw.slice(2, 5), raw.slice(5, 7)].filter(Boolean).join('-');
}

// Format SIV : 2 lettres, 3 chiffres, 2 lettres.
export function isValidPlate(plaque: string): boolean {
  return /^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(plaque);
}

// ───────── Validation des étapes ─────────

export type FieldErrors = Partial<
  Record<'plaque' | 'marque' | 'modele' | 'annee' | 'prestation' | 'prenom' | 'nom' | 'telephone' | 'email', string>
>;

// Fonction pure : renvoie les erreurs d'une étape (objet vide = étape valide).
export function getStepErrors(step: Step, data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 'vehicule') {
    if (!data.vehiculeManuel) {
      if (!isValidPlate(data.plaque)) {
        errors.plaque = 'Entrez une plaque valide (ex. AB-123-CD) ou renseignez votre véhicule manuellement.';
      } else if (!data.marque || !data.modele) {
        // Plaque valide mais véhicule pas encore identifié : la recherche est en cours.
        errors.plaque = 'Identification de votre véhicule en cours, un instant...';
      }
    } else {
      if (!data.marque.trim()) errors.marque = 'Indiquez la marque de votre véhicule.';
      if (!data.modele.trim()) errors.modele = 'Indiquez le modèle de votre véhicule.';
      const year = Number(data.annee);
      if (!/^\d{4}$/.test(data.annee) || year < 1950 || year > new Date().getFullYear() + 1) {
        errors.annee = 'Indiquez une année valide (ex. 2018).';
      }
    }
  }

  if (step === 'prestation') {
    if (!data.prestation) errors.prestation = 'Choisissez la prestation dont vous avez besoin.';
  }

  if (step === 'contact') {
    if (!data.prenom.trim()) errors.prenom = 'Indiquez votre prénom.';

    /* if (!data.nom.trim()) errors.nom = 'Indiquez votre nom.'; */

    const phone = data.telephone.replace(/[\s.\-()]/g, '');
    if (!/^(?:\+33|0033|0)[1-9]\d{8}$/.test(phone)) {
      errors.telephone = 'Indiquez un numéro de téléphone valide (ex. 06 12 34 56 78).';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
      errors.email = 'Indiquez une adresse email valide.';
    }
  }

  return errors;
}

// State machine du tunnel de devis (3 étapes). Chaque étape ne dépend
// d'aucune donnée métier — les libellés viennent de la config business.
export function useMultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  // Les erreurs ne s'affichent qu'après une tentative de passage à la suite.
  const [showErrors, setShowErrors] = useState(false);

  const currentStep = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  const stepErrors = getStepErrors(currentStep, data);
  const canProceed = Object.keys(stepErrors).length === 0;
  const errors: FieldErrors = showErrors ? stepErrors : {};

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  // Saisie de la plaque : on la formate et on efface tout véhicule
  // précédemment identifié (il ne correspond plus à la plaque saisie).
  const setPlaque = useCallback((value: string) => {
    setData((prev) => ({
      ...prev,
      plaque: formatPlate(value),
      marque: '',
      modele: '',
      motorisation: '',
      annee: '',
    }));
  }, []);

  // Bascule plaque ↔ manuel. Les champs véhicule repartent de zéro pour
  // éviter qu'un véhicule périmé passe la validation.
  const setVehicleMode = useCallback((manual: boolean) => {
    setData((prev) => ({
      ...prev,
      vehiculeManuel: manual,
      plaque: manual ? prev.plaque : '',
      marque: '',
      modele: '',
      motorisation: '',
      annee: '',
    }));
  }, []);

  // Applique le véhicule renvoyé par la recherche de plaque.
  const applyLookup = useCallback((vehicle: Vehicle) => {
    setData((prev) => ({
      ...prev,
      marque: vehicle.marque,
      modele: vehicle.modele,
      motorisation: vehicle.motorisation,
      annee: String(vehicle.annee),
    }));
  }, []);

  // Vérifie l'étape courante. Si invalide : affiche les erreurs et bloque.
  function validate(): boolean {
    if (!canProceed) {
      setShowErrors(true);
      return false;
    }
    setShowErrors(false);
    return true;
  }

  function next() {
    if (!validate()) return;
    if (!isLast) setStepIndex((i) => i + 1);
  }

  function back() {
    setShowErrors(false);
    if (!isFirst) setStepIndex((i) => i - 1);
  }

  function reset() {
    setShowErrors(false);
    setStepIndex(0);
    setData(initialData);
  }

  return {
    currentStep,
    stepIndex,
    totalSteps: STEPS.length,
    isFirst,
    isLast,
    data,
    errors,
    canProceed,
    update,
    setPlaque,
    setVehicleMode,
    applyLookup,
    validate,
    next,
    back,
    reset,
  };
}
