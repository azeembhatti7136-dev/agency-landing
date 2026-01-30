"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Rocket, 
  Star,
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  CheckCircle,
  Shield,
  Globe,
  Users,
  Clock,
  ExternalLink,
  Mail,
  Phone,
  MessageSquare,
  Calendar
} from "lucide-react";

// Animation variants
const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  pulse: {
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  float: {
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Floating Icon component
const FloatingIcon = ({ icon: Icon, index }) => {
  const position = [
    { top: "10%", left: "10%" },
    { top: "20%", right: "15%" },
    { bottom: "15%", left: "20%" },
    { bottom: "10%", right: "10%" },
    { top: "30%", left: "5%" },
    { top: "40%", right: "5%" }
  ][index % 6];

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={position}
      variants={VARIANTS.float}
      animate="visible"
      transition={{ duration: 4 + index, delay: index * 0.5 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 blur-lg rounded-full animate-pulse" />
        <Icon className="relative w-6 h-6 text-white/60" />
      </div>
    </motion.div>
  );
};

export default function CTA({ data }) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ 
  name: "", 
  email: "", 
  phone: "", 
  plan: "basic", // Default selection
  message: "" 
});

const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   
    await new Promise(resolve => setTimeout(resolve, 2000)); // Demo Delay
    setShowSuccess(true);
    setIsSubmitting(false);
  } catch (error) {
    alert("Something went wrong!");
    setIsSubmitting(false);
  }
};
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
  }
};

  // Background color from data or default
  const bgColor = data.background_color || '#2563eb';
  
  // Check if color is light for text contrast
  const isLightColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };
  
  const textColor = isLightColor(bgColor) ? 'text-gray-900' : 'text-white';
  const buttonBg = isLightColor(bgColor) ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-100';
  const buttonText = isLightColor(bgColor) ? 'text-white' : 'text-gray-900';
  
  // WhatsApp number and links
  const whatsappNumber = "+923007136735"; // Your WhatsApp number
  const whatsappMessage = "Hello! I'd like to schedule a demo for your services.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
  const phoneNumber = "tel:+923007136735"; // Your phone number for calling
  
  // Pricing page link (adjust according to your site)
  const pricingLink = "/pricing"; // Your pricing page URL
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Initialize animation
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Handle email form submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - Replace with your actual API
    try {
      // This is where you would integrate with your email service
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setIsSubmitting(false);
      setEmail("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };
  
  // Floating icons
  const floatingIcons = [Sparkles, Zap, Rocket, Star, TrendingUp, Target];
  
  // Benefits list
  const benefits = [
    { icon: CheckCircle, text: "No credit card required" },
    { icon: Shield, text: "Secure & private" },
    { icon: Clock, text: "Get started in minutes" },
    { icon: Users, text: "Join 10,000+ users" }
  ];
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: bgColor }}
      id="cta-section"
    >
      {/* Floating Icons */}
      {floatingIcons.map((Icon, index) => (
        <FloatingIcon 
          key={index} 
          icon={Icon} 
          index={index} 
        />
      ))}
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={VARIANTS.container}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={VARIANTS.fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm 
              rounded-full mb-8"
          >
            <Award className="w-4 h-4" />
            <span className={`text-sm font-semibold ${textColor}`}>
              LIMITED TIME OFFER
            </span>
            <Award className="w-4 h-4" />
          </motion.div>
          
          {/* Title */}
          <motion.h2
            variants={VARIANTS.fadeInUp}
            className={`text-4xl md:text-5xl lg:text-5xl font-bold mb-6 ${textColor}`}
          >
            {data.title}
            <motion.span
              variants={VARIANTS.pulse}
              animate="visible"
              className="inline-block ml-3"
            >
              🚀
            </motion.span>
          </motion.h2>
          
          {/* Description */}
          <motion.p
            variants={VARIANTS.fadeInUp}
            transition={{ delay: 0.2 }}
            className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${textColor} opacity-90`}
          >
            {data.description}
          </motion.p>
          
          {/* Stats */}
          <motion.div
            variants={VARIANTS.fadeInUp}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { value: "10K+", label: "Happy Users" },
              { value: "4.9/5", label: "Rating" },
              { value: "24/7", label: "Support" },
              { value: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`text-center px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm ${textColor}`}
              >
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          {/* Main CTA Button */}
          <motion.div
            variants={VARIANTS.fadeInUp}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
           
            
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className={`text-sm ${textColor}`}>
                  Success! We'll be in touch shortly.
                </span>
              </motion.div>
            )}
          </motion.div>
          
          {/* Email Capture Form */}
          <motion.div
            variants={VARIANTS.fadeInUp}
            transition={{ delay: 0.5 }}
            className="max-w-xl mx-auto mb-12 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl"
          >
            {showSuccess ? (
            <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10"
    >
      <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-12 h-12 text-green-400" />
      </div>
      <h3 className={`text-2xl font-bold ${textColor} mb-2`}>Message Sent!</h3>
      <p className={`${textColor} opacity-80`}>We Will Contact Very Soon.</p>
    </motion.div>
  ) : (
    <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/30 text-white focus:outline-none focus:border-white transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        {/* Email Field */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Email Address</label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/30 text-white focus:outline-none focus:border-white transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Phone Number</label>
          <input
            type="tel"
            required
            placeholder="+92 300 1234567"
            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/30 text-white focus:outline-none focus:border-white transition-all"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        {/* Plan Selection (Dropdown) */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Select Plan</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/30 text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer"
            style={{ backgroundColor: "#1a1a1a" }} // Dropdown list background
            value={formData.plan}
            onChange={(e) => setFormData({...formData, plan: e.target.value})}
          >
            <option value="basic">Basic Plan</option>
            <option value="pro">Pro Plan</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>
      
      {/* Message Field */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${textColor}`}>Message</label>
        <textarea
          rows="3"
          required
          placeholder="I want to discuss my project..."
          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/30 text-white focus:outline-none focus:border-white transition-all resize-none"
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2
          ${isLightColor(bgColor) ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} transition-all`}
      >
        {isSubmitting ? (
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Claim Your Plan Now</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </form>
  )}
</motion.div>
          
          {/* Benefits */}
          <motion.div
            variants={VARIANTS.fadeInUp}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm
                    ${isLightColor(bgColor) 
                      ? 'bg-white/20 text-gray-900' 
                      : 'bg-white/10 text-white'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </motion.div>
          
          {/* Alternative Actions - WITH WORKING LINKS */}
          <motion.div
            variants={VARIANTS.fadeInUp}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Schedule a Demo - Opens WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                ${isLightColor(bgColor) 
                  ? 'text-gray-900 hover:bg-white/20' 
                  : 'text-white hover:bg-white/10'
                } transition-colors`}
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule a Demo</span>
            </a>
            
            {/* Call Us Now - Makes phone call */}
            <a
              href={phoneNumber}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                ${isLightColor(bgColor) 
                  ? 'text-gray-900 hover:bg-white/20' 
                  : 'text-white hover:bg-white/10'
                } transition-colors`}
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </a>
            
            {/* View Pricing - Goes to pricing page */}
            <button
  onClick={() => scrollToSection('pricing-plans')}
  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer
    ${isLightColor(bgColor) 
      ? 'text-gray-900 hover:bg-white/20' 
      : 'text-white hover:bg-white/10'
    } transition-colors`}
>
  <ExternalLink className="w-5 h-5" />
  <span>View Pricing</span>
</button>
          </motion.div>
          
         
        </motion.div>
      </div>
    </section>
  );
}