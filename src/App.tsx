import { businessConfig } from './config/registry';
import { useBusinessTheme } from './hooks/useBusinessTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { DevisSection } from './components/DevisSection';
import { Footer } from './components/Footer';

function App() {
  useBusinessTheme(businessConfig);

  return (
    <div style={{ background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }} className="min-h-screen">
      <Header config={businessConfig} />
      <Hero config={businessConfig} />
      <TrustBar config={businessConfig} />
      <Services config={businessConfig} />
      <WhyUs config={businessConfig} />
      <DevisSection config={businessConfig} />
      <Footer config={businessConfig} />
    </div>
  );
}

export default App;
