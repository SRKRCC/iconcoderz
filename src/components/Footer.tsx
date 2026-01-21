import { motion } from "framer-motion";
import { Code2, Instagram, Github, Linkedin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Rules", href: "#rules" },
  { name: "Register", href: "#register" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/srkr_coding_club", label: "Instagram" },
  { icon: Github, href: "https://github.com/Srkr-Coding-Club", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/srkr-coding-club", label: "LinkedIn" },
];

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                SRKR Coding Club
              </span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Fostering a culture of competitive programming and algorithmic 
              thinking at SRKR Engineering College, Bhimavaram.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg">Connect With Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-background/70 text-sm">
              Follow us for updates on Iconcoderz-2k26 and more!
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        {/* Divider */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              © 2026 SRKR Coding Club. All rights reserved.
            </p>
            
            {/* Privacy & Terms */}
            <div className="flex gap-4 text-sm">
              <a
                href="/privacy-policy"
                className="text-background/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-background/60">|</span>
              <a
                href="/terms"
                className="text-background/60 hover:text-primary transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
