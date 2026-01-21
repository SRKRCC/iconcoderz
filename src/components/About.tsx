import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Trophy, Users, Clock, Target, Zap } from "lucide-react";

const facts = [
  {
    icon: Users,
    title: "Individual Participation",
    description: "Solo competition to showcase your personal coding skills",
  },
  {
    icon: Code,
    title: "Single Round Format",
    description: "One intensive round of algorithmic challenges",
  },
  {
    icon: Trophy,
    title: "Cash Prizes",
    description: "Exciting rewards for top performers",
  },
  {
    icon: Clock,
    title: "Feb 23, 9 AM IST",
    description: "Mark your calendar for the competition day",
  },
];

const AboutSection = () => {
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
    <section id="about" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">About The Event</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
              Test Your{" "}
              <span className="gradient-text">DSA Skills</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">iconcoderz-2k26</span> is a 
              single-round, online competitive programming contest exclusively for SRKR 
              Engineering College students. Whether you're a 1st, 2nd, or 3rd year student, 
              this is your chance to test your Data Structures and Algorithms skills against 
              your peers.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Organized by the <span className="text-primary font-semibold">SRKR Coding Club</span>, 
              this event aims to foster a culture of competitive programming on campus. 
              Prepare yourself for challenging problems that will push your problem-solving 
              abilities to the limit!
            </p>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-medium">Real-time Leaderboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-secondary" />
                <span className="font-medium">Multiple Languages</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {facts.map((fact, index) => (
              <motion.div
                key={fact.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 rounded-2xl card-hover group"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <fact.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {fact.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {fact.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
