import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Sparkles } from "lucide-react";

const PrizesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      title: "Beginner Level",
      subtitle: "1st & 2nd Year",
      prizes: ["1st Prize", "2nd Prize"],
      icon: "🌟",
    },
    {
      title: "Expert Level",
      subtitle: "3rd & 4th Year",
      prizes: ["1st Prize", "2nd Prize"],
      icon: "🏆",
    },
  ];

  return (
    <section id="prizes" className="section-padding bg-muted" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
            Prizes & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compete for your share of the prize pool and earn recognition!
          </p>
        </motion.div>

        {/* Prize Grid - Pool + Categories */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Prize Pool Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl gradient-bg p-6 md:p-8 flex flex-col justify-center"
          >
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm mb-4"
              >
                <Trophy className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                ₹10,000
              </h3>
              <p className="text-lg text-white/90 font-medium mb-3">
                Prize Pool
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-white/60" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Prize Categories */}
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {category.prizes.map((prize, prizeIdx) => (
                  <div
                    key={prize}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <Award className={`w-5 h-5 ${prizeIdx === 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <span className="font-medium text-foreground">{prize}</span>
                    <span className="ml-auto text-sm text-muted-foreground">TBA</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Prize distribution will be announced soon. Stay tuned!
        </motion.p>
      </div>
    </section>
  );
};

export default PrizesSection;
