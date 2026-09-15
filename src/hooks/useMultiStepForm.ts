import { useState } from 'react';

export type Step = 'vehicule' | 'prestation' | 'probleme' | 'urgence' | 'photos' | 'contact';

const STEPS: Step[] = ['vehicule', 'prestation', 'probleme', 'urgence', 'photos', 'contact'];

export interface FormData {
  marque: string;
  modele: string;
  annee: string;
  immatriculation: string;
  prestation: string;
  probleme: string;
  message: string;
  urgence: string;
  photos: File[];
  nom: string;
  telephone: string;
  email: string;
}

const initialData: FormData = {
  marque: '',
  modele: '',
  annee: '',
  immatriculation: '',
  prestation: '',
  probleme: '',
  message: '',
  urgence: '',
  photos: [],
  nom: '',
  telephone: '',
  email: '',
};

// State machine du parcours de demande de devis. Chaque étape ne dépend
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
