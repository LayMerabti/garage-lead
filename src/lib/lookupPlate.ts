export interface Vehicle {
  marque: string;
  modele: string;
  motorisation: string;
  annee: number;
}

export type PlateLookupResult =
  | { status: 'found'; vehicle: Vehicle }
  | { status: 'invalid' | 'not_found' | 'error' };

// Appelle n8n et renvoie TOUJOURS un résultat simple, jamais une exception.
export async function lookupPlate(
  webhookUrl: string,
  plaque: string
): Promise<PlateLookupResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000); // abandon après 8 s

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plaque }),
      signal: controller.signal,
    });
    if (!res.ok) return { status: 'error' };

    const data = await res.json();
    if (data.success) return { status: 'found', vehicle: data.vehicle as Vehicle };
    if (data.error === 'format_invalide') return { status: 'invalid' };
    if (data.error === 'plaque_inconnue') return { status: 'not_found' };
    return { status: 'error' };
  } catch {
    return { status: 'error' }; // n8n éteint, réseau coupé, délai dépassé
  } finally {
    clearTimeout(timer);
  }
}