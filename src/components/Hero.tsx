import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const codeSnippets = [
  "function solve(n) {",
  "  if (n <= 1) return n;",
  "  return solve(n-1) + solve(n-2);",
  "}",
  "class Graph {",
  "  constructor() {",
  "    this.adj = new Map();",
  "  }",
  "  bfs(start) { ... }",
  "}",
  "dp[i][j] = Math.max(",
  "  dp[i-1][j],",
  "  dp[i-1][j-w[i]] + v[i]",
  ");",
  "while (l < r) {",
  "  mid = (l + r) >> 1;",
  "  if (check(mid)) r = mid;",
  "  else l = mid + 1;",
  "}",
];

const FloatingCode = ({ code, index }: { code: string; index: number }) => {
  const positions = [
    { top: "10%", left: "5%" },
    { top: "20%", right: "8%" },
    { top: "35%", left: "3%" },
    { top: "45%", right: "5%" },
    { top: "60%", left: "7%" },
    { top: "70%", right: "3%" },
    { top: "80%", left: "5%" },
    { top: "15%", left: "85%" },
    { top: "55%", right: "10%" },
    { top: "85%", right: "8%" },
  ];

  const pos = positions[index % positions.length];

  return (
    <motion.div
      className="floating-code hidden lg:block"
      style={pos as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.03, 0.08, 0.03],
        y: [0, -30, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 8 + index * 0.5,
        repeat: Infinity,
        delay: index * 0.3,
      }}
    >
      <pre className="text-foreground whitespace-pre">{code}</pre>
    </motion.div>
  );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="glass-card w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center">
      <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [stage, setStage] = useState<'UPCOMING' | 'LIVE' | 'ENDED'>('UPCOMING');

  useEffect(() => {
    // Event Format: Feb 23, 2026, 1:30 PM (Starts) - 4:30 PM (Ends)
    const startTime = new Date("2026-02-23T13:30:00+05:30").getTime();
    const endTime = new Date("2026-02-23T16:30:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      let targetDate = startTime;
      let currentStage: 'UPCOMING' | 'LIVE' | 'ENDED' = 'UPCOMING';

      if (now >= endTime) {
        currentStage = 'ENDED';
      } else if (now >= startTime) {
        currentStage = 'LIVE';
        targetDate = endTime;
      }

      setStage(currentStage);

      if (currentStage !== 'ENDED') {
        const difference = targetDate - now;
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (stage === 'ENDED') {
    return (
      <div className="glass-card px-8 py-6 rounded-2xl text-center">
        <h3 className="font-heading text-2xl font-bold gradient-text mb-2">Competition Ended</h3>
        <p className="text-muted-foreground">Looking forward to seeing you next year!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3 sm:gap-4 md:gap-6">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
      <div className="uppercase tracking-widest text-sm font-medium animate-pulse text-primary">
        {stage === 'LIVE' ? 'Competition Ends In' : 'Competition Starts In'}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const registrationOpenDate = new Date("2026-01-25T00:00:00+05:30");
  const registrationCloseDate = new Date("2026-02-12T23:59:59+05:30");
  const now = new Date();
  const isRegistrationOpen = now >= registrationOpenDate && now <= registrationCloseDate;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero-bg"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {codeSnippets.slice(0, 10).map((code, index) => (
          <FloatingCode key={index} code={code} index={index} />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <span className="text-sm font-medium">SRKR Coding Club Presents</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="gradient-text">Iconcoderz</span>
              <span className="text-muted-foreground">-2k26</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4"
            >
              <span className="text-primary">Decode</span>
              <span className="mx-3">•</span>
              <span className="text-secondary">Compete</span>
              <span className="mx-3">•</span>
              <span className="text-primary">Dominate</span>
            </motion.p>

            {/* Date & Location */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground mb-10"
            >
              February 23, 2026 • 1:30 PM IST • SRKR Engineering College, Bhimavaram
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center lg:justify-start mb-12"
            >
              <CountdownTimer />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              {isRegistrationOpen ? (
                <button
                  onClick={() => scrollToSection("#register")}
                  className="btn-hero-primary animate-pulse-glow w-full sm:w-auto"
                >
                  Register Now
                </button>
              ) : now < registrationOpenDate ? (
                <span className="px-8 py-4 rounded-full glass-card text-lg font-medium text-muted-foreground">
                  Registrations open 25th Jan
                </span>
              ) : (
                <span className="px-8 py-4 rounded-full glass-card text-lg font-medium text-red-400">
                  Registrations Closed
                </span>
              )}
              <button
                onClick={() => scrollToSection("#about")}
                className="btn-hero-secondary w-full sm:w-auto"
              >
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Right Column - Event Poster */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="rounded-2xl p-2 glass-card w-full max-w-lg mx-auto lg:max-w-none transform rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <img 
              src="/banner.webp" 
              alt="Iconcoderz 2k26 Official Poster" 
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollToSection("#about")}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;