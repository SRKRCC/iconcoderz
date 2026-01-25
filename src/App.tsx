import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import AboutSection from "./components/About";
import RulesSection from "./components/RulesAndFaq";
import PrizesSection from "./components/PrizesComingSoon";
import RegistrationForm from "./components/RegistrationForm";
import ContactSection from "./components/Contact";
import Footer from "./components/Footer";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/TermsAndConditions";

import AdminLogin from "./admin/AdminLogin";
import AdminRoutes from "./routes/AdminRoutes";

import DocsLayout from "./layouts/DocsLayout";
import DocIntro from "./pages/docs/DocIntro";
import DocGettingStarted from "./pages/docs/DocGettingStarted";
import DocCICD from "./pages/docs/DocCICD";
import DocRunbook from "./pages/docs/DocRunbook";
import DocTesting from "./pages/docs/DocTesting";
import DocArchitecture from "./pages/docs/DocArchitecture";
import DocTerraform from "./pages/docs/DocTerraform";
import DocDeployment from "./pages/docs/DocDeployment";
import DocCustomDomain from "./pages/docs/DocCustomDomain";
import DocDataModel from "./pages/docs/DocDataModel";
import DocProblemSetting from "./pages/docs/DocProblemSetting";
import DocSupport from "./pages/docs/DocSupport";
import DocRoadmap from "./pages/docs/DocRoadmap";

import ThreeBackground from "./components/ThreeBackground";

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
);

const App = () => {
  return (
    <div className="min-h-screen scroll-smooth relative isolate">
      <ThreeBackground />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin Auth */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Routes */}
        {AdminRoutes}

        {/* Documentation Routes */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocIntro />} />
          <Route path="getting-started" element={<DocGettingStarted />} />
          <Route path="cicd" element={<DocCICD />} />
          <Route path="runbook" element={<DocRunbook />} />
          <Route path="testing" element={<DocTesting />} />
          <Route path="architecture" element={<DocArchitecture />} />
          <Route path="terraform" element={<DocTerraform />} />
          <Route path="deployment" element={<DocDeployment />} />
          <Route path="custom-domain" element={<DocCustomDomain />} />
          <Route path="data-model" element={<DocDataModel />} />
          <Route path="problem-setting" element={<DocProblemSetting />} />
          <Route path="support" element={<DocSupport />} />
          <Route path="roadmap" element={<DocRoadmap />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
