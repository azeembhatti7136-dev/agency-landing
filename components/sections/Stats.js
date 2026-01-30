"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  BarChart,
  CheckCircle,
  Sparkles,
  Rocket,
  Globe,
  Shield,
  Zap
} from "lucide-react";

export default function Stats({ data }) {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [countedNumbers, setCountedNumbers] = useState(data.stats.map(() => 0));

  // Icon mapping based on label
  const getIcon = (label) => {
    const labelLower = label?.toLowerCase() || '';
    
    if (labelLower.includes('client') || labelLower.includes('customer')) return <Users className="w-8 h-8" />;
    if (labelLower.includes('project') || labelLower.includes('complete')) return <CheckCircle className="w-8 h-8" />;
    if (labelLower.includes('year') || labelLower.includes('experience')) return <Award className="w-8 h-8" />;
    if (labelLower.includes('hour') || labelLower.includes('support')) return <Clock className="w-8 h-8" />;
    if (labelLower.includes('growth') || labelLower.includes('increase')) return <TrendingUp className="w-8 h-8" />;
    if (labelLower.includes('target') || labelLower.includes('goal')) return <Target className="w-8 h-8" />;
    if (labelLower.includes('satisfaction') || labelLower.includes('rating')) return <BarChart className="w-8 h-8" />;
    if (labelLower.includes('country') || labelLower.includes('global')) return <Globe className="w-8 h-8" />;
    if (labelLower.includes('security') || labelLower.includes('safe')) return <Shield className="w-8 h-8" />;
    if (labelLower.includes('speed') || labelLower.includes('fast')) return <Zap className="w-8 h-8" />;
    if (labelLower.includes('team') || labelLower.includes('expert')) return <Users className="w-8 h-8" />;
    
    return <Rocket className="w-8 h-8" />;
  };

  // Color gradients for each stat
  const gradients = [
    "from-blue-400 to-cyan-400",
    "from-purple-400 to-pink-400",
    "from-green-400 to-emerald-400",
    "from-orange-400 to-yellow-400",
    "from-indigo-400 to-blue-400",
    "from-pink-400 to-rose-400",
  ];

  // Animate counting numbers
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Start counting animations
      const durations = [2000, 2500, 3000, 3500];
      data.stats.forEach((stat, index) => {
        const number = parseFloat(stat.number.replace(/[^0-9.]/g, ''));
        const suffix = stat.number.replace(/[0-9.]/g, '');
        
        if (isNaN(number)) return;
        
        const duration = durations[index % durations.length];
        const increment = number / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= number) {
            current = number;
            clearInterval(timer);
          }
          
          setCountedNumbers(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });
        }, 16);
        
        return () => clearInterval(timer);
      });
    }
  }, [isInView, controls, data.stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
        />
        
        {/* Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${20 + (i * 7)}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-white/50" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold tracking-wider">
              OUR ACHIEVEMENTS
            </span>
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Numbers That Speak
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Tracking our journey through milestones and achievements
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {data.stats.map((stat, index) => {
            const number = parseFloat(stat.number.replace(/[^0-9.]/g, ''));
            const suffix = stat.number.replace(/[0-9.]/g, '');
            const displayNumber = isNaN(number) ? stat.number : countedNumbers[index];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                className="group relative"
              >
                {/* Stat Card */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 30% 30%, white 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      delay: 0.5 + index * 0.1
                    }}
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                    className={`relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-r ${gradients[index % gradients.length]}`}
                  >
                    <div className="text-white">
                      {getIcon(stat.label)}
                    </div>
                    
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-30 blur-xl`} />
                  </motion.div>

                  {/* Number */}
                  <div className="mb-4">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="text-5xl md:text-6xl font-black text-white mb-2"
                    >
                      {displayNumber}{suffix}
                    </motion.div>
                    
                    {/* Animated Underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ delay: 0.9 + index * 0.1, duration: 1 }}
                      className={`h-1 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-full`}
                    />
                  </div>

                  {/* Label */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-lg font-semibold text-blue-100 uppercase tracking-wide"
                  >
                    {stat.label}
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0, y: 20 }}
                  animate={isInView ? { scale: 1, y: 0 } : {}}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: 1.1 + index * 0.1
                  }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-white to-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                >
                  <span className="font-bold text-gray-800">+</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block max-w-3xl">
            <div className="text-white/80 text-lg md:text-xl italic mb-4">
              "Success is not just about numbers, but the stories behind them"
            </div>
            <div className="text-blue-200 font-medium">
              — Our Commitment to Excellence
            </div>
          </div>
        </motion.div>

        {/* Progress Bar Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ delay: 1.8, duration: 2 }}
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
        />
      </div>
    </section>
  );
}