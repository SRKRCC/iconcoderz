import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import AboutSection from './components/About'
import RulesSection from './components/RulesAndFaq'
import PrizesSection from './components/PrizesComingSoon'
import RegistrationForm from './components/RegistrationForm'
import ContactSection from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/TermsAndConditions'



const Home = () => (
  <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <RulesSection />
    <PrizesSection />
    <RegistrationForm />
    <ContactSection />
    <Footer />
  </>
)

const App = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      
    </div>
  )
}

export default App
