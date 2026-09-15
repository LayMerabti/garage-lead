import { useState } from 'react';
import type { BusinessConfig } from '../config/types';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import { submitForm } from '../lib/submitForm';
import { ContactInfo } from './ContactInfo';

const inputClass =
  'font-[var(--font-body)] text-sm px-3.5 py-3 border rounded-sm bg-white w-full focus:outline-2 focus:outline-[var(--color-accent)]';

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

  return (
    <section id="devis" className="py-24">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="flex justify-between items-end gap-6 mb-12 border-b-2 pb-6" style={{ borderColor: 'var(--color-ink)' }}>
          <h2 className="text-[clamp(1.6rem,2.8vw,2.1rem)] uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Demander un devis
          </h2>
          <p className="text-gray-600 max-w-[34ch] text-sm hidden md:block">
            Décrivez votre véhicule et le problème rencontré, on vous répond sous 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <ContactInfo config={config} />

          <div>
            <div className="flex gap-1.5 mb-6">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full"
                  style={{ background: i <= stepIndex ? 'var(--color-accent)' : 'rgba(22,25,28,0.12)' }}
                />
              ))}
            </div>

            {currentStep === 'vehicule' && (
              <StepBlock title="Votre véhicule">
                <input className={inputClass} placeholder="Marque" value={data.marque} onChange={(e) => update('marque', e.target.value)} />
                <input className={inputClass} placeholder="Modèle" value={data.modele} onChange={(e) => update('modele', e.target.value)} />
                <input className={inputClass} placeholder="Année" value={data.annee} onChange={(e) => update('annee', e.target.value)} />
                <input className={inputClass} placeholder="Plaque d'immatriculation" value={data.immatriculation} onChange={(e) => update('immatriculation', e.target.value)} />
              </StepBlock>
            )}

            {currentStep === 'prestation' && (
              <StepBlock title="Quelle prestation ?">
                <div className="grid grid-cols-2 gap-2">
                  {config.formOptions.prestations.map((p) => (
                    <ChoiceButton key={p} label={p} active={data.prestation === p} onClick={() => update('prestation', p)} />
                  ))}
                </div>
              </StepBlock>
            )}

            {currentStep === 'probleme' && (
              <StepBlock title="Décrivez le problème">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {config.formOptions.problemes.map((p) => (
                    <ChoiceButton key={p} label={p} active={data.probleme === p} onClick={() => update('probleme', p)} />
                  ))}
                </div>
                <textarea
                  className={inputClass + ' min-h-24 resize-y'}
                  placeholder="Détails supplémentaires (facultatif)"
                  value={data.message}
                  onChange={(e) => update('message', e.target.value)}
                />
              </StepBlock>
            )}

            {currentStep === 'urgence' && (
              <StepBlock title="Niveau d'urgence">
                <div className="flex flex-col gap-2">
                  {config.formOptions.urgences.map((u) => (
                    <button
                      key={u.value}
                      type="button"
                      onClick={() => update('urgence', u.value)}
                      className="flex items-center gap-3 px-4 py-3 text-sm border rounded-sm text-left transition-colors"
                      style={{
                        borderColor: data.urgence === u.value ? u.color : 'rgba(22,25,28,0.12)',
                        background: data.urgence === u.value ? `${u.color}15` : '#fff',
                      }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: u.color }} />
                      {u.label}
                    </button>
                  ))}
                </div>
              </StepBlock>
            )}

            {currentStep === 'photos' && (
              <StepBlock title="Photos (facultatif)">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className={inputClass}
                  onChange={(e) => update('photos', Array.from(e.target.files ?? []))}
                />
                <p className="text-xs text-gray-500 mt-2">{data.photos.length} photo(s) sélectionnée(s)</p>
              </StepBlock>
            )}

            {currentStep === 'contact' && (
              <StepBlock title="Vos coordonnées">
                <input className={inputClass} placeholder="Nom et prénom" value={data.nom} onChange={(e) => update('nom', e.target.value)} />
                <input className={inputClass} placeholder="Téléphone" value={data.telephone} onChange={(e) => update('telephone', e.target.value)} />
                <input className={inputClass} placeholder="Email (facultatif)" value={data.email} onChange={(e) => update('email', e.target.value)} />
              </StepBlock>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={back}
                disabled={isFirst}
                className="text-sm uppercase tracking-wide px-5 py-3 border disabled:opacity-30"
                style={{ borderColor: 'var(--color-ink)' }}
              >
                Retour
              </button>
              {isLast ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  className="text-sm font-semibold uppercase tracking-wide px-6 py-3 text-white"
                  style={{ background: 'var(--color-accent)' }}
                >
                  {status === 'sending' ? 'Envoi...' : 'Envoyer ma demande'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="text-sm font-semibold uppercase tracking-wide px-6 py-3 text-white"
                  style={{ background: 'var(--color-accent)' }}
                >
                  Continuer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm px-3.5 py-2.5 border rounded-sm text-left transition-colors"
      style={{
        borderColor: active ? 'var(--color-accent)' : 'rgba(22,25,28,0.12)',
        background: active ? 'var(--color-accent-soft)' : '#fff',
      }}
    >
      {label}
    </button>
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
