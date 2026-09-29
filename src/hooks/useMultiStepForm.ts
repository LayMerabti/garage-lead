import { useState } from 'react';

export type Step = 'vehicule' | 'prestation' | 'contact';
export type ContactPreference = 'sms' | 'appel' | 'email';

const STEPS: Step[] = ['vehicule', 'prestation', 'contact'];
export const STEP_LABELS: Record<Step, string> = {
  vehicule: 'Véhicule',
  prestation: 'Prestation',
  contact: 'Coordonnées',
};

export interface FormData {
  // Étape véhicule — mode plaque (collecte simple, pas d'auto-remplissage
  // réel : nécessiterait une API SIV/Cartegrise payante non branchée) ou
  // mode manuel.
  plaque: string;
  vehiculeManuel: boolean;
  marque: string;
  modele: string;
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

// State machine du tunnel de devis (3 étapes). Chaque étape ne dépend
// d'aucune donnée métier — les libellés viennent de la config business.
export function useMultiStepForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<FormData>(initialData);

  const currentStep = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (!isLast) setStepIndex((i) => i + 1);
  }

  function back() {
    if (!isFirst) setStepIndex((i) => i - 1);
  }

  function reset() {
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
    update,
    next,
    back,
    reset,
  };
}
