import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import AboutSection from './components/About';
import RulesSection from './components/RulesAndFaq';
import PrizesSection from './components/PrizesComingSoon';
import RegistrationForm from './components/RegistrationForm';
import ContactSection from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <RulesSection />
        <PrizesSection />
        <RegistrationForm />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
