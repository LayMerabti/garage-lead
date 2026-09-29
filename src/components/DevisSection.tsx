import { useState } from 'react';
import type { BusinessConfig } from '../config/types';
import { useMultiStepForm, STEP_LABELS, type ContactPreference } from '../hooks/useMultiStepForm';
import { submitForm } from '../lib/submitForm';
import { ServiceIcon } from './icons/ServiceIcon';

const inputClass =
  'font-[var(--font-body)] text-sm px-4 py-3.5 border border-slate-300 rounded-xl bg-white w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]';

const primaryBtnClass =
  'w-full text-center font-bold uppercase tracking-wide text-white rounded-xl px-6 py-4 shadow-lg transition-transform hover:-translate-y-0.5';

export function DevisSection({ config }: { config: BusinessConfig }) {
  const { currentStep, stepIndex, totalSteps, isFirst, isLast, data, update, next, back, reset } =
    useMultiStepForm();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'fallback'>('idle');

  async function handleSubmit() {
    setStatus('sending');
    const result = await submitForm(config, data);
    setStatus(result.status === 'success' ? 'success' : 'fallback');
  }

  if (status === 'success') {
    return (
      <ConfirmationMessage
        title="Demande transmise avec succès !"
        text="Le garage a bien reçu votre demande et vous recontactera sous 24h."
        onReset={() => { reset(); setStatus('idle'); }}
      />
    );
  }

  if (status === 'fallback') {
    return (
      <ConfirmationMessage
        title="Votre demande n'a pas pu être envoyée automatiquement"
        text={`Merci de nous contacter directement : ${config.phone} ou ${config.fallbackEmail}. Vos informations n'ont pas été perdues, mais notre système préfère vous le confirmer plutôt que de risquer une demande silencieusement égarée.`}
        onReset={() => { reset(); setStatus('idle'); }}
      />
    );
  }

  const vehicleRecap = data.vehiculeManuel
    ? [data.marque, data.modele].filter(Boolean).join(' ') || null
    : data.plaque || null;

  return (
    <section id="devis" className="py-10 md:py-24">
      <div className="max-w-[560px] mx-auto px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] uppercase font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Demander un devis
          </h2>

          {/* Badges de réassurance */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            <Badge icon={<LightningIcon />} text="Devis gratuit en 2 min" />
            <Badge icon={<LockIcon />} text="Sans engagement" />
            <Badge icon={<ClockIcon />} text="Réponse sous 24h" />
          </div>

          {/* Note Google — placeholder tant qu'aucune vraie note n'est branchée */}
          {config.googleRating && (
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5">
              <StarIcon /> {config.googleRating.value}/5 sur +{config.googleRating.count} avis
            </p>
          )}
        </div>

        {/* Étapes numérotées avec libellés */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['vehicule', 'prestation', 'contact'] as const).map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: i <= stepIndex ? 'var(--color-accent)' : '#cbd0d3' }}
              >
                {i + 1}
              </div>
              <span
                className="text-xs uppercase tracking-wide hidden sm:inline"
                style={{ color: i <= stepIndex ? 'var(--color-ink)' : '#9ca3af', fontWeight: i === stepIndex ? 600 : 400 }}
              >
                {STEP_LABELS[step]}
              </span>
              {i < totalSteps - 1 && <div className="w-6 md:w-10 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        {currentStep === 'vehicule' && (
          <div>
            {!data.vehiculeManuel ? (
              <div className="mb-4">
                <label className="block text-sm font-semibold uppercase tracking-wide mb-2">Plaque d'immatriculation</label>
                <div className="flex border-2 border-[var(--color-ink)] rounded-xl overflow-hidden shadow-sm">
                  <div className="w-3 bg-[#1a3a8f] shrink-0" />
                  <input
                    className="flex-1 px-4 py-4 text-2xl tracking-[0.15em] font-bold uppercase text-center focus:outline-none"
                    placeholder="AB-123-CD"
                    style={{ fontFamily: 'var(--font-display)' }}
                    value={data.plaque}
                    onChange={(e) => update('plaque', e.target.value.toUpperCase())}
                    maxLength={9}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Remplissage automatique de la marque et du modèle</p>
                <button
                  type="button"
                  onClick={() => update('vehiculeManuel', true)}
                  className="text-xs text-gray-500 underline block mx-auto mt-3"
                >
                  Vous n'avez pas votre plaque ? Renseigner manuellement
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Votre véhicule</h3>
                <div className="grid gap-3 mb-3">
                  <input className={inputClass} placeholder="Marque" autoComplete="off" value={data.marque} onChange={(e) => update('marque', e.target.value)} />
                  <input className={inputClass} placeholder="Modèle" autoComplete="off" value={data.modele} onChange={(e) => update('modele', e.target.value)} />
                  <input className={inputClass} placeholder="Année" inputMode="numeric" pattern="[0-9]*" maxLength={4} value={data.annee} onChange={(e) => update('annee', e.target.value)} />
                </div>
                <button
                  type="button"
                  onClick={() => update('vehiculeManuel', false)}
                  className="text-xs text-gray-500 underline"
                >
                  ↩ Utiliser ma plaque d'immatriculation à la place
                </button>
              </div>
            )}
          </div>
        )}

        {currentStep === 'prestation' && (
          <div>
            <h3 className="text-lg mb-4 uppercase font-semibold text-center" style={{ fontFamily: 'var(--font-display)' }}>Quelle est votre demande ?</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {config.formOptions.prestations.map((p) => {
                const active = data.prestation === p.label;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => update('prestation', p.label)}
                    className="flex flex-col items-start gap-2 p-4 border-2 rounded-xl text-left transition-colors"
                    style={{
                      borderColor: active ? 'var(--color-accent)' : '#e2e5e7',
                      background: active ? 'var(--color-accent-soft)' : '#fff',
                    }}
                  >
                    <ServiceIcon name={p.icon} size={26} />
                    <span className="text-sm font-semibold leading-tight">{p.label}</span>
                    {p.priceHint && <span className="text-xs text-gray-500">{p.priceHint}</span>}
                  </button>
                );
              })}
            </div>
            <textarea
              className={inputClass + ' min-h-20 resize-y mb-3'}
              placeholder="Précisez si besoin — décrivez le problème (optionnel)"
              value={data.message}
              onChange={(e) => update('message', e.target.value)}
            />
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Ajouter une photo (voyant, contrôle technique...) — optionnel</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className={inputClass}
                onChange={(e) => update('photos', Array.from(e.target.files ?? []))}
              />
            </div>
          </div>
        )}

        {currentStep === 'contact' && (
          <div>
            <h3 className="text-lg mb-4 uppercase font-semibold text-center" style={{ fontFamily: 'var(--font-display)' }}>Où envoyer votre devis ?</h3>

            {vehicleRecap && (
              <div className="mb-4 text-center">
                <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-ink)] font-medium">
                  {vehicleRecap}{data.prestation ? ` — ${data.prestation}` : ''}
                </span>
              </div>
            )}

            <div className="grid gap-3 mb-4">
              <input className={inputClass} placeholder="Prénom" autoComplete="given-name" value={data.prenom} onChange={(e) => update('prenom', e.target.value)} />
              <input className={inputClass} placeholder="Nom (optionnel)" autoComplete="family-name" value={data.nom} onChange={(e) => update('nom', e.target.value)} />
              <input className={inputClass} placeholder="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={data.telephone} onChange={(e) => update('telephone', e.target.value)} />
              <input className={inputClass} placeholder="Email" type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => update('email', e.target.value)} />
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">Je préfère être contacté par</p>
              <div className="flex gap-2">
                {(['sms', 'appel', 'email'] as ContactPreference[]).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => update('contactPreference', pref)}
                    className="flex-1 text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg border-2 transition-colors"
                    style={{
                      borderColor: data.contactPreference === pref ? 'var(--color-accent)' : '#e2e5e7',
                      background: data.contactPreference === pref ? 'var(--color-accent-soft)' : '#fff',
                    }}
                  >
                    {pref === 'sms' ? 'SMS' : pref === 'appel' ? 'Appel' : 'Email'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2">
          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className={primaryBtnClass}
              style={{ background: 'var(--color-accent)' }}
            >
              {status === 'sending' ? 'Envoi...' : 'Recevoir mon devis gratuit (sous 24h)'}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className={primaryBtnClass}
              style={{ background: 'var(--color-accent)' }}
            >
              {currentStep === 'vehicule' ? 'Voir mon devis gratuit →' : 'Continuer vers mes coordonnées →'}
            </button>
          )}

          {isLast && (
            <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1.5">
              <LockIcon /> Vos données restent 100% confidentielles. Aucun spam.
            </p>
          )}

          {!isFirst && (
            <button type="button" onClick={back} className="text-xs text-gray-500 underline mx-auto">
              Retour
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-ink)' }}>
      {icon}
      {text}
    </span>
  );
}

function ConfirmationMessage({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <section className="py-24">
      <div className="max-w-[560px] mx-auto px-8 text-center">
        <h2 className="text-xl mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
        <p className="text-gray-600 text-sm mb-6">{text}</p>
        <button onClick={onReset} className="text-sm uppercase tracking-wide underline">
          Faire une nouvelle demande
        </button>
      </div>
    </section>
  );
}

function LightningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="none">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 16.9 5.8 20.4l1.6-6.8L2.2 9l6.9-.7L12 2Z" />
    </svg>
  );
}
