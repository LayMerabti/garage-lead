import type { BusinessConfig } from '../config/types';

export function ContactInfo({ config }: { config: BusinessConfig }) {
  return (
    <div>
      <h3 className="text-lg mb-4 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Horaires</h3>
      {config.hours.map((row) => (
        <div key={row.day} className="flex justify-between py-2.5 border-b text-sm" style={{ borderColor: 'rgba(22,25,28,0.12)' }}>
          <span>{row.day}</span>
          <span className="text-gray-600">{row.hours}</span>
        </div>
      ))}
      <h3 className="text-lg mb-4 mt-8 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Adresse</h3>
      <p className="text-gray-600 text-sm">{config.address}</p>
      <h3 className="text-lg mb-4 mt-8 uppercase font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Contact</h3>
      <p className="text-gray-600 text-sm">{config.phone}<br />{config.email}</p>
    </div>
  );
}
