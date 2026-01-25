import { useNavigate } from "react-router-dom";
import ThemeToggle from "../context/ThemeToggle";

const terms = [
  {
    title: "Eligibility",
    content: [
      "Participants must be registered students or professionals as specified by the event guidelines.",
      "Any false information may result in disqualification.",
    ],
  },
  {
    title: "Registration",
    content: [
      "Registration is mandatory to participate in Iconcoderz 2K26.",
      "Once registered, details cannot be changed after the deadline.",
    ],
  },
  {
    title: "Code of Conduct",
    content: [
      "Participants must maintain professionalism and ethical behavior.",
      "Any form of plagiarism or cheating will lead to immediate disqualification.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All submissions must be original work created during the competition.",
      "Organizers reserve the right to showcase projects for promotional purposes.",
    ],
  },
  {
    title: "Disqualification",
    content: [
      "Violation of rules may lead to disqualification without prior notice.",
      "Decisions made by the organizers are final and binding.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Organizers are not responsible for technical failures or data loss.",
      "Participants take part at their own risk.",
    ],
  },
];

const TermsAndConditions = () => {
  const router = useNavigate();

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => router("/")}
            className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
          >
            ← Back to Home
          </button>

          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading gradient-text mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-lg">
            Please read carefully before participating
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8">
          {terms.map((term, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-6 md:p-8 card-hover"
            >
              <h2 className="text-2xl font-heading text-primary mb-4">
                {term.title}
              </h2>

              <ul className="space-y-3">
                {term.content.map((point, i) => (
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

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Iconcoderz 2K26. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
