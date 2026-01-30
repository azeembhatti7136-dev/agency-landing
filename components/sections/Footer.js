"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Youtube,
  Globe,
  ArrowUp,
  Send,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Award,
  Users
} from "lucide-react";

// Social icon mapping
const SOCIAL_ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  website: Globe
};

// Animation variants
const VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  float: {
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Newsletter Subscription Component
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      variants={VARIANTS.fadeInUp}
      className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm 
        rounded-2xl p-6 border border-gray-700/50"
    >
      <div className="flex items-start gap-3 mb-4">
        <Send className="w-6 h-6 text-blue-400 flex-shrink-0" />
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Stay Updated</h4>
          <p className="text-gray-400 text-sm">
            Get the latest news and updates
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 
              rounded-xl text-white placeholder-gray-500 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting || isSubscribed}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSubscribed || !email}
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2
            ${isSubmitting || isSubscribed || !email
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90'
            } transition-all duration-300`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : isSubscribed ? (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Subscribed! 🎉</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <p className="text-gray-500 text-xs mt-4 text-center">
        No spam, unsubscribe anytime
      </p>
    </motion.div>
  );
};

// Services Links Component
const ServicesLinks = () => {
  const services = [
    { label: "Web Development" },
    { label: "Mobile Apps" },
    { label: "UI/UX Design" },
    { label: "Digital Marketing" },
    { label: "Consulting" }
  ];

  return (
    <motion.div variants={VARIANTS.fadeInUp}>
      <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
        Services
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
      </h3>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <a
              href="#services"
              className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors group"
            >
              <ChevronRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>{service.label}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

// Contact Info Component
const ContactInfo = ({ email, phone, address, hours }) => {
  const contactItems = [
    { icon: Mail, text: email, href: `mailto:${email}` },
    { icon: Phone, text: phone, href: `tel:${phone}` },
    { icon: MapPin, text: address },
    { icon: Clock, text: hours }
  ];

  return (
    <motion.div variants={VARIANTS.fadeInUp}>
      <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
        Contact Info
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
      </h3>
      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const isLink = item.href;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                {isLink ? (
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.text}
                  </a>
                ) : (
                  <p className="text-gray-400">{item.text}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Social Links Component - FIXED VERSION
const SocialLinks = ({ social_links }) => {
  if (!social_links || !Array.isArray(social_links) || social_links.length === 0) {
    return (
      <motion.div variants={VARIANTS.fadeInUp}>
        <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
          Connect With Us
          <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
        </h3>
        <div className="flex flex-wrap gap-3">
          {/* Default social links */}
          {[
            { platform_name: "Facebook", url: "https://facebook.com" },
            { platform_name: "Twitter", url: "https://twitter.com" },
            { platform_name: "Instagram", url: "https://instagram.com" },
            { platform_name: "Linkedin", url: "https://linkedin.com" }
          ].map((link, index) => {
            const Icon = SOCIAL_ICONS[link.platform_name.toLowerCase()] || Globe;
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 
                  rounded-xl transition-all duration-300 group"
                aria-label={link.platform_name}
              >
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={VARIANTS.fadeInUp}>
      <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
        Connect With Us
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
      </h3>
      <div className="flex flex-wrap gap-3">
        {social_links.map((link, index) => {
          const Icon = SOCIAL_ICONS[link.platform_name.toLowerCase()] || Globe;
          return (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 
                rounded-xl transition-all duration-300 group"
              aria-label={link.platform_name}
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5
      }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 
        text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
};

export default function Footer({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <footer className="bg-black h-20" />;
  }

  return (
    <>
      {/* Back to Top Button */}
      <BackToTop />

      {/* Main Footer */}
      <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(90deg, #374151 1px, transparent 1px),
                               linear-gradient(180deg, #374151 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Floating particles */}
          {mounted && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 10 + Math.random() * 10,
                delay: i * 0.5,
                repeat: Infinity
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Single Section - All 4 in One Line */}
        <div className="relative z-10 border-b border-gray-800/50">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Contact Information - Column 1 */}
              <ContactInfo
                email={data.email}
                phone={data.phone}
                address={data.address || "123 Innovation Street, Tech City, TC 12345"}
                hours={data.hours || "Mon-Fri: 9AM-6PM"}
              />

              {/* Services Links - Column 2 */}
              <motion.div
                variants={VARIANTS.fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <ServicesLinks />
              </motion.div>

              {/* Social Links - Column 3 - FIXED */}
              <SocialLinks social_links={data.social_links || []} />

              {/* Newsletter Signup - Column 4 */}
              <motion.div
                variants={VARIANTS.fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <NewsletterSignup />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-500 text-sm text-center md:text-left"
              >
                © {new Date().getFullYear()} {data.company_name || "Your Brand"}. All rights reserved.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 text-gray-500 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span>Trusted by 10K+</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}