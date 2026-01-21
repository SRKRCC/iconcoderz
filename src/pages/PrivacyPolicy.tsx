import { useNavigate } from "react-router-dom";
import ThemeToggle from "../context/ThemeToggle";

const sections = [
  {
    title: "Introduction",
    content: [
      "IconCoderz 2K26 is a coding competition organized to promote problem-solving, innovation, and technical excellence.",
      "This Privacy Policy explains how we collect, use, and protect participant information during registration and event participation.",
    ],
  },
  {
    title: "Information We Collect",
    content: [
      "Personal details such as name, email address, phone number, college name, and year of study.",
      "Technical details submitted during registration and competition participation.",
      "Communication details required for event updates and notifications.",
    ],
  },
  {
    title: "Purpose of Data Collection",
    content: [
      "To manage event registrations and participant verification.",
      "To communicate important announcements, schedules, and results.",
      "To improve the quality of future IconCoderz events.",
    ],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "Essential cookies are used for authentication, session management, and platform functionality.",
      "Analytics cookies help us understand participant engagement and improve user experience.",
      "Preference cookies store user choices for convenience.",
      "You may disable cookies in your browser, but some features may not function correctly.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "Participant data is stored securely using industry-standard practices.",
      "Access is restricted to authorized event administrators and volunteers only.",
      "All communications are protected using secure HTTPS encryption.",
      "While we strive for strong security, no system is entirely immune to breaches.",
    ],
  },
  {
    title: "Data Sharing",
    content: [
      "Participant data is not sold, rented, or shared with third-party organizations.",
      "Information may only be shared internally for event coordination purposes.",
      "Legal disclosure may occur if required by law.",
    ],
  },
  {
    title: "Participant Responsibilities",
    content: [
      "Participants are responsible for maintaining the confidentiality of their account details.",
      "Any misuse of the platform or false information may lead to disqualification.",
    ],
  },
  {
    title: "Policy Updates",
    content: [
      "This Privacy Policy may be updated periodically to reflect changes in practices or regulations.",
      "Participants are encouraged to review this page regularly for updates.",
    ],
  },
];

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding">
      <div className="container-custom">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border text-sm font-medium hover:scale-[1.02] transition"
          >
            ← Back
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading gradient-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            IconCoderz 2K26 — Coding Competition
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-6 md:p-8 card-hover"
            >
              <h2 className="text-2xl font-heading text-primary mb-4">
                {section.title}
              </h2>

              <ul className="space-y-3">
                {section.content.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} IconCoderz 2K26. All rights reserved.
          </p>
        </div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;
