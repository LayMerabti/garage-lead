import type { BusinessConfig } from '../config/types';

// Section dédiée horaires/adresse/contact, placée en fin de page juste avant
// le Footer (qui reste minimal — copyright uniquement — pour éviter la
// duplication de ces mêmes infos).
export function ContactSection({ config }: { config: BusinessConfig }) {
  return (
    <section id="contact" className="py-10 md:py-24" style={{ background: 'var(--color-steel)' }}>
      <div className="max-w-[1080px] mx-auto px-8 text-white">
        <div className="flex justify-between items-end gap-6 mb-6 md:mb-12 border-b-2 pb-3 md:pb-6 border-white/15">
          <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Horaires & contact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
          <div>
            <h3 className="text-lg mb-3 md:mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Horaires</h3>
            {config.hours.map((row) => (
              <div key={row.day} className="flex justify-between py-2 md:py-2.5 border-b text-sm border-white/15">
                <span>{row.day}</span>
                <span className="text-gray-300">{row.hours}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg mb-3 md:mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Adresse</h3>
            <p className="text-gray-300 text-sm">{config.address}</p>
          </div>
          <div>
            <h3 className="text-lg mb-3 md:mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Contact</h3>
            <p className="text-gray-300 text-sm">{config.phone}<br />{config.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
