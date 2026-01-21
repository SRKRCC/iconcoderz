import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Users,
  Instagram,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Club Address",
    content: ["SRKR Engineering College", "Bhimavaram, Andhra Pradesh"],
  },
  {
    icon: Phone,
    title: "Reach Out",
    content: ["+91 98765 43210", "srkrcodingclub@srkr.ac.in"],
  },
  {
    icon: Users,
    title: "Follow Us",
    social: true,
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/srkr_coding_club", label: "Instagram" },
  { icon: Github, href: "https://github.com/Srkr-Coding-Club", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/srkr-coding-club", label: "LinkedIn" },
  // { icon: MessageCircle, href: "https://chat.whatsapp.com/srkrcodingclub", label: "WhatsApp" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="contact" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Contact Us</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Need Help?{" "}
            <span className="gradient-text">We're Here!</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Reach out to us for any queries regarding the competition.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title || index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl p-8 text-center card-hover"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">
                {info.title}
              </h3>
              {info.social ? (
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {info.content?.map((line, i) => (
                    <p key={i} className="text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
