import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, BookOpen, HelpCircle } from "lucide-react";

const rules = [
  {
    id: "rule-1",
    question: "Who can participate?",
    answer:
      "ICONCODERZ-2K26 is open to engineering students from various colleges.Engineering students from 1st to 4th year can participate.Beginner Level for 1st & 2nd years and Expert Level for 3rd & 4th years.",
  },
  {
    id: "rule-2",
    question: "Is team participation allowed?",
    answer:
      "No, Iconcoderz-2k26 is an individual competition. Each participant must compete solo to showcase their personal coding skills.",
  },
  {
    id: "rule-3",
    question: "What is the registration fee?",
    answer:
      "The registration fee is ₹100 per participant, with a 50% discount for SRKR Coding Club affiliates.",
  },
  {
    id: "rule-4",
    question: "Which programming languages are supported?",
    answer:
      "Multiple languages are supported including C++, Python, Java, C, JavaScript, and more. You can choose your preferred language during the contest.",
  },
  {
    id: "rule-5",
    question: "What is the contest format?",
    answer:
      "The competition consists of a single round with multiple algorithmic problems of varying difficulty. You'll have a fixed time window to solve as many problems as possible.",
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "How will winners be decided?",
    answer:
      "Winners are determined based on the number of problems solved and the time taken. Tie-breakers are based on submission time and penalty points.",
  },
  {
    id: "faq-2",
    question: "Can I use online resources during the contest?",
    answer:
      "No, the use of online resources or external help is strictly prohibited during the contest.",
  },
  {
    id: "faq-3",
    question: "When will results be announced?",
    answer:
      "The results will be announced on the same day after the contest concludes.",
  },
  {
    id: "faq-4",
    question: "How do I prepare for the contest?",
    answer:
      "Practice on platforms like LeetCode, CodeChef, and Codeforces. Focus on data structures (arrays, trees, graphs) and algorithms (sorting, searching, dynamic programming).",
  },
];

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onToggle }: AccordionItemProps) => (
  <div className="glass-card rounded-xl overflow-hidden mb-3">
    <button
      onClick={onToggle}
      className="w-full px-5 py-4 flex items-center justify-between text-left font-medium hover:bg-muted/50 transition-colors"
    >
      <span>{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-4 text-muted-foreground">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const RulesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openRule, setOpenRule] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
<section id="rules" className="section-padding min-h-[75vh]" ref={ref}>
  <div className="container-custom">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center mb-12"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-secondary/10 text-secondary mb-4 text-lg sm:text-xl"
      >
        <BookOpen className="w-6 h-6" />
        <span className="font-medium">Rules & FAQ</span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4"
      >
        Everything You <span className="gradient-text">Need to Know</span>
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
      >
        Read the rules carefully and check out common questions before registering.
      </motion.p>
    </motion.div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="lg:mx-20 grid md:grid-cols-2 gap-8 lg:gap-12"
    >
      {/* Rules Column */}
      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-6 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          Competition Rules
        </h3>
        <div>
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem
                id={rule.id}
                question={rule.question}
                answer={rule.answer}
                isOpen={openRule === rule.id}
                onToggle={() =>
                  setOpenRule(openRule === rule.id ? null : rule.id)
                }
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Column */}
      <motion.div variants={itemVariants}>
        <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-6 flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-secondary" />
          Frequently Asked Questions
        </h3>
        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === faq.id}
                onToggle={() =>
                  setOpenFaq(openFaq === faq.id ? null : faq.id)
                }
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

  );
};

export default RulesSection;
