import type { FormData } from '../hooks/useMultiStepForm';
import type { BusinessConfig } from '../config/types';

export type SubmitResult =
  | { status: 'success' }
  | { status: 'fallback'; reason: string };

// Principe fail-safe : si le webhook n8n échoue, on ne perd jamais la
// demande côté UX — on affiche au client un message clair l'invitant à
// appeler ou écrire directement, avec les coordonnées du garage.
export async function submitForm(
  config: BusinessConfig,
  data: FormData,
): Promise<SubmitResult> {
  const payload = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'photos') {
      (value as File[]).forEach((file) => payload.append('photos', file));
    } else {
      payload.append(key, String(value));
    }
  });

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Webhook a répondu ${response.status}`);
    return { status: 'success' };
  } catch (err) {
    // On ne bloque jamais l'utilisateur : la demande reste visible via le
    // message de fallback (appel / email direct au garage).
    return { status: 'fallback', reason: (err as Error).message };
  }
}
