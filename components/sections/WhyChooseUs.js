"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  CheckCircle, 
  Sparkles, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Award,
  TrendingUp,
  Globe,
  Heart,
  Star,
  Target,
  Rocket,
  Lightbulb,
  Brain,
  Cpu,
  Layers,
  Code,
  Palette,
  BarChart,
  Server,
  Cloud,
  Lock,
  Battery,
  Wifi,
  BatteryCharging
} from "lucide-react";

// Icon mapping for different benefits
const BENEFIT_ICONS = [
  <CheckCircle className="w-6 h-6" />,
  <Shield className="w-6 h-6" />,
  <Clock className="w-6 h-6" />,
  <Users className="w-6 h-6" />,
  <Award className="w-6 h-6" />,
  <TrendingUp className="w-6 h-6" />,
  <Globe className="w-6 h-6" />,
  <Heart className="w-6 h-6" />,
  <Star className="w-6 h-6" />,
  <Target className="w-6 h-6" />,
  <Rocket className="w-6 h-6" />,
  <Lightbulb className="w-6 h-6" />,
  <Brain className="w-6 h-6" />,
  <Cpu className="w-6 h-6" />,
  <Layers className="w-6 h-6" />,
  <Code className="w-6 h-6" />,
  <Palette className="w-6 h-6" />,
  <BarChart className="w-6 h-6" />,
  <Server className="w-6 h-6" />,
  <Cloud className="w-6 h-6" />,
  <Lock className="w-6 h-6" />,
  <Battery className="w-6 h-6" />,
  <Wifi className="w-6 h-6" />,
  <BatteryCharging className="w-6 h-6" />
];

// Color gradients for each benefit card
const CARD_GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-indigo-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-cyan-500",
  "from-yellow-500 to-orange-500"
];

// Default content for fallback
const DEFAULT_CONTENT = {
  heading: "Why Choose Our Digital Solutions?",
  subHeading: "Discover why thousands of clients trust us for exceptional results and unmatched expertise",
  benefits: [
    {
      title: "Industry Expertise",
      description: "10+ years of experience with certified professionals delivering cutting-edge solutions"
    },
    {
      title: "Customized Solutions",
      description: "Tailor-made strategies that align perfectly with your business goals"
    },
    {
      title: "Fast Delivery",
      description: "Agile development process ensuring timely delivery without compromising quality"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical support for uninterrupted operations"
    },
    {
      title: "Cost-Effective",
      description: "Competitive pricing with transparent billing and no hidden charges"
    },
    {
      title: "Proven Results",
      description: "Track record of increasing client revenue by 40-200% within first year"
    }
  ]
};

export default function WhyChooseUs({ data }) {
  // Use data or fallback to default
  const content = data || DEFAULT_CONTENT;
  
  // Safely extract values
  const heading = content?.heading || content?.title || DEFAULT_CONTENT.heading;
  const subHeading = content?.subHeading || content?.description || DEFAULT_CONTENT.subHeading;
  const benefits = Array.isArray(content?.benefits) ? content.benefits : 
                   Array.isArray(content?.benefit_items) ? content.benefit_items : 
                   DEFAULT_CONTENT.benefits;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

const scrollToCTA = () => {
  const ctaSection = document.getElementById('cta-banner-call-to-action');
  if (ctaSection) {
    ctaSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  } else {
    // Fallback: CTA section nahi mila to bottom scroll karo
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
};



  useEffect(() => {
    setMounted(true);
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Background particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 10,
  }));

  // Floating elements data
  const floatingElements = [
    { icon: Sparkles, color: "text-blue-400", position: "top-10 left-10" },
    { icon: Zap, color: "text-purple-400", position: "top-20 right-20" },
    { icon: Star, color: "text-yellow-400", position: "bottom-20 left-20" },
    { icon: Rocket, color: "text-pink-400", position: "bottom-10 right-10" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black"
    >
      {/* Animated Background Particles */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`,
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            x: [`${particle.x}vw`, `${particle.x + 20}vw`, `${particle.x}vw`],
            y: [`${particle.y}vh`, `${particle.y - 20}vh`, `${particle.y}vh`],
            opacity: [0, 0.2, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/5 to-pink-400/5 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Decorative Elements */}
      {mounted && floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.position} hidden lg:block`}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            <div className="relative">
              <div className={`absolute inset-0 ${element.color.replace('text', 'bg')} rounded-full blur-lg opacity-20`} />
              <Icon className={`relative w-8 h-8 ${element.color}`} />
            </div>
          </motion.div>
        );
      })}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        {/* Header Section */}
<motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, type: "spring" }}
  className="text-center mb-20"
>

  {/* WHY CHOOSE US - LINE STYLE */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.2 }}
    className="flex items-center justify-center gap-4 mb-6"
  >
    <span className="h-px w-20 bg-gradient-to-r from-blue-500 to-purple-500" />

    <div className="inline-flex items-center gap-2 px-5 py-2 
      bg-gradient-to-r from-blue-500 to-purple-500 
      rounded-full shadow-lg shadow-blue-500/30"
    >
      <Star className="w-4 h-4 text-white animate-pulse" />
      <span className="text-white text-xs md:text-sm font-semibold tracking-widest">
        WHY CHOOSE US
      </span>
      <Star className="w-4 h-4 text-white animate-pulse" />
    </div>

    <span className="h-px w-20 bg-gradient-to-l from-blue-500 to-purple-500" />
  </motion.div>

  {/* TITLE */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.35 }}
    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
  >
    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      {heading}
    </span>
  </motion.h2>

  {/* UNDERLINE */}
  <motion.div
    initial={{ width: 0 }}
    animate={isInView ? { width: "140px" } : {}}
    transition={{ delay: 0.5, duration: 1 }}
    className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto"
  />

  {/* DESCRIPTION */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : {}}
    transition={{ delay: 0.6 }}
    className="text-2xl text-white-600 max-w-3xl mx-auto mt-8 leading-relaxed"
  >
    {subHeading}
  </motion.p>
</motion.div>


        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, index) => {
            const colorGradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            const iconIndex = index % BENEFIT_ICONS.length;
            
            // Extract benefit data safely
            const benefitTitle = benefit?.title || benefit?.label || `Benefit ${index + 1}`;
            const benefitDescription = benefit?.description || benefit?.text || '';
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Connection Lines (for desktop) */}
                {index < benefits.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isInView ? { opacity: 0.3, scaleX: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 hidden lg:block"
                  />
                )}
                
                {/* Benefit Card */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 p-8 h-full">
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                  
                  {/* Floating Icon Container */}
                  <motion.div
                    animate={hoveredIndex === index ? { 
                      rotate: 360,
                      scale: 1.1 
                    } : {}}
                    transition={{ duration: 0.6 }}
                    className={`relative w-20 h-20 bg-gradient-to-br ${colorGradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-30 blur-xl`} />
                    
                    {/* Icon */}
                    <div className="text-white relative z-10">
                      {BENEFIT_ICONS[iconIndex]}
                    </div>
                    
                    {/* Pulsing Ring */}
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                      />
                    )}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="text-center relative z-10">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                    >
                      {benefitTitle}
                    </motion.h3>
                    
                    {benefitDescription && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        className="text-gray-600 leading-relaxed"
                      >
                        {benefitDescription}
                      </motion.p>
                    )}
                    
                    {/* Progress/Status Indicator */}
                    <div className="mt-6">
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${colorGradient} text-white`}
                        >
                          #{index + 1} Priority
                        </motion.div>
                        
                        {/* Animated Checkmark for hover */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={hoveredIndex === index ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                          transition={{ type: "spring" }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400/30 rounded-tr-2xl" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400/30 rounded-bl-2xl" />
                </div>
                
                {/* Floating Dots Connection (for desktop) */}
                {index < benefits.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block"
                  >
                    <div className="flex flex-col gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: i * 0.2 
                          }}
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${colorGradient}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, type: "spring" }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Happy Clients", icon: Users, color: "from-blue-500 to-cyan-500" },
                { value: "99.9%", label: "Uptime", icon: Server, color: "from-green-500 to-emerald-500" },
                { value: "24/7", label: "Support", icon: Shield, color: "from-purple-500 to-pink-500" },
                { value: "5⭐", label: "Rating", icon: Star, color: "from-yellow-500 to-orange-500" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`relative w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <div className="text-white">
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-30 blur-xl`} />
                  </motion.div>
                  <div className="text-4xl font-bold text-white-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-white-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, type: "spring" }}
          className="mt-20 text-center"
        >
          <motion.button
           onClick={() => {
    
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl"
          >
            <span className="flex items-center gap-3">
              Join Our Success Story
              <Rocket className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
            className="text-white-600 mt-6"
          >
            Experience the difference with our proven approach and expert team
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}