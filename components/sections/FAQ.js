"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageSquare,
  Sparkles,
  Zap,
  Star,
  Shield,
  Globe,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Users,
  Award,
  Rocket,
  Brain,
  Target
} from "lucide-react";

// Animation variants
const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  },
  faqItem: {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8
      }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  rotate: {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  },
  scaleIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  }
};

// FAQ Item Component
const FAQItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <motion.div
      variants={VARIANTS.faqItem}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)"
      }}
      className={`relative overflow-hidden rounded-2xl transition-all duration-500
        ${isOpen 
          ? 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-2 border-blue-200/80 shadow-2xl' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-200/80 shadow-lg hover:shadow-xl'
        }`}
    >
      {/* Glow effect when open */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
        />
      )}
      
      {/* Floating dots background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full" />
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-500 rounded-full" />
      </div>
      
      <button
        onClick={onToggle}
        className="w-full p-8 text-left flex items-center justify-between relative z-10 group"
      >
        <div className="flex items-start gap-6 flex-1">
          {/* Animated number circle */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center
              ${isOpen 
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-md group-hover:from-blue-100 group-hover:to-purple-100'
              }`}
          >
            <span className={`text-xl font-bold ${isOpen ? 'text-white' : 'text-gray-700'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Corner accent */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full
              ${isOpen ? 'bg-yellow-400' : 'bg-blue-400/30'}`}
            />
          </motion.div>
          
          {/* Question content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-2xl font-bold ${isOpen ? 'text-gray-900' : 'text-gray-800'}`}>
                {item.question}
              </h3>
              
              {/* Status indicator */}
              {isOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-green-700">Open</span>
                </motion.div>
              )}
            </div>
            
            {/* Category badge */}
            {item.category && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100/50 to-purple-100/50 
                  rounded-full border border-blue-200/50"
              >
                <Target className="w-3 h-3 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">{item.category}</span>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Animated icon */}
        <motion.div
          variants={VARIANTS.rotate}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.4, type: "spring" }}
          className={`ml-4 p-3 rounded-xl ${isOpen 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
            : 'bg-gray-100 group-hover:bg-blue-100'
          }`}
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-blue-600" />
          ) : (
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-blue-500" />
            </motion.div>
          )}
        </motion.div>
      </button>
      
      {/* Answer with slide animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 ml-20 relative">
              {/* Connecting line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400" />
              
              <div className="pl-8">
                {/* Answer text */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
                
                {/* Additional info */}
                {item.additional_info && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-5 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl 
                      border border-blue-200/50 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Pro Tip</h4>
                        <p className="text-blue-800">{item.additional_info}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 pt-6 border-t border-gray-200/50"
                  >
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 
                            text-gray-700 rounded-lg text-sm font-medium border border-gray-300/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom gradient border when open */}
      {isOpen && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        />
      )}
    </motion.div>
  );
};

// Stats Component
const Stats = ({ faqs }) => {
  const stats = [
    { icon: Users, value: faqs.length, label: "Total Questions", color: "from-blue-500 to-cyan-500" },
    { icon: Award, value: "24/7", label: "Support Available", color: "from-purple-500 to-pink-500" },
    { icon: Clock, value: "< 2h", label: "Avg Response", color: "from-green-500 to-emerald-500" },
    { icon: CheckCircle, value: "100%", label: "Satisfaction", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 
            shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} 
            flex items-center justify-center mb-4 shadow-lg`}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-br bg-clip-text text-transparent bg-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default function FAQ({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveLink(id);
      setIsMobileMenuOpen(false);
    }
  };
  // Initialize animation
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = data?.faqs || [];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50/30"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-300/10 to-orange-300/10 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={VARIANTS.fadeInUp}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/90 to-white/80 
              backdrop-blur-sm border border-gray-300/30 rounded-full mb-8 shadow-2xl"
          >
            <div className="relative">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent tracking-wider">
              KNOWLEDGE BASE
            </span>
            <Rocket className="w-4 h-4 text-blue-500 animate-bounce" />
          </motion.div>
          
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 
              bg-clip-text text-transparent">
              Questions
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent">
              Answered
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Find instant solutions to common queries. Our comprehensive FAQ section covers 
            everything you need to know about our services and features.
          </motion.p>
          
          {/* Stats */}
          <Stats faqs={faqs} />
        </motion.div>
        
        {/* FAQ Grid */}
        <motion.div
          variants={VARIANTS.container}
          initial="hidden"
          animate={controls}
          className="max-w-5xl mx-auto mb-24"
        >
          {faqs.length > 0 ? (
            <div className="space-y-6">
              {faqs.map((item, index) => (
                <FAQItem
                  key={index}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl 
                flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <HelpCircle className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Questions Yet</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                We're preparing helpful answers for your questions. Check back soon!
              </p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
            
            {/* Main content */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/40 
              p-12 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        Still Need Help?
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Our expert team is ready to assist you 24/7
                      </p>
                    </div>
                  </div>
                  
                  {/* Contact options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[
                      { icon: Mail, title: "Email Support", desc: "support@example.com", color: "bg-blue-500" },
                      { icon: Phone, title: "Phone", desc: "+1 (555) 123-4567", color: "bg-green-500" },
                      { icon: Clock, title: "Live Chat", desc: "24/7 Available", color: "bg-purple-500" },
                      { icon: Globe, title: "Community", desc: "Join Discussions", color: "bg-orange-500" }
                    ].map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-gray-200/50"
                      >
                        <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center`}>
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{option.title}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                 <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Scroll to contact section
            const contactSection = document.getElementById('cta-banner-call-to-action');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              // If contact section doesn't exist, scroll to bottom
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
              });
            }
          }}
          className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
            font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-2xl 
            hover:shadow-blue-500/40 transition-all duration-300 text-lg"
        >
          <span className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            Contact Support
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>
              </div>
            </div>
          </div>
          
          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-gray-500 text-sm mt-8"
          >
            💫 Over 95% of questions are answered within our comprehensive FAQ section
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}