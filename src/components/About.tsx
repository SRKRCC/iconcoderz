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
    <section
      id="about"
      className="section-padding bg-muted min-h-[80vh] flex items-center"
      ref={ref}
    >
      <div className="container-custom w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary/10 text-primary text-md sm:text-xl">
              <Target className="w-4 h-4 sm:w-6 sm:h-6" />
              <span className="font-medium">About The Event</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight">
              Test Your <span className="gradient-text">DSA Skills</span>
            </h2>

            <p className="text-lg sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Iconcoderz-2k26</span> is a 
              single-round, online competitive programming contest exclusively for SRKR 
              Engineering College students. Whether you're a 1st, 2nd, or 3rd year student, 
              this is your chance to test your Data Structures and Algorithms skills against 
              your peers.
            </p>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Organized by the <span className="text-primary font-semibold">SRKR Coding Club</span>, 
              this event aims to foster a culture of competitive programming on campus. 
              Prepare yourself for challenging problems that will push your problem-solving 
              abilities to the limit!
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 text-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-medium">Real-time Leaderboard</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-secondary" />
                <span className="font-medium">Multiple Languages</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {facts.map((fact) => (
              <motion.div
                key={fact.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="glass-card p-8 sm:p-10 rounded-2xl card-hover group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <fact.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-semibold mb-3">
                  {fact.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
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
