// components/sections/Hero.js
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ data }) {
  if (!data) return null;

  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Extract data
  const {
    badge,
    title,
    subtitle,
    primary_cta_text,
    secondary_cta_text,
    primary_cta_link,
    secondary_cta_link,
    background_image,
    stats,
    trusted_by,
    primary_cta_new_tab = false,
    secondary_cta_new_tab = false,
    show_scroll_indicator = true
  } = data;

  // Check if client-side
  useEffect(() => {
    setIsClient(true);
    
    // Generate particles only on client
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 100 + 20,
      height: Math.random() * 100 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    
    setParticles(generatedParticles);
  }, []);

  // Mouse move effect
  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  // Construct image URL
  const imageUrl = background_image?.data?.attributes?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${background_image.data.attributes.url}`
    : null;

  // Handle internal section navigation
  const scrollToSection = (sectionId) => {
    if (!isClient) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle CTA clicks
  const handlePrimaryCTAClick = () => {
    if (!primary_cta_link) return;
    
    // Check if it's an internal section link
    if (primary_cta_link.startsWith('#')) {
      const sectionId = primary_cta_link.substring(1);
      scrollToSection(sectionId);
    } 
    // Check if it's a full URL
    else if (primary_cta_link.startsWith('http')) {
      if (primary_cta_new_tab) {
        window.open(primary_cta_link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = primary_cta_link;
      }
    }
    // If it's a relative path (like /contact) and no such page exists
    else {
      
      // Fallback to contact section if available
      const contactSection = document.getElementById('contact') || 
                            document.getElementById('cta-banner-call-to-action') ||
                            document.getElementById('newsletter-and-contact-info');
      
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSecondaryCTAClick = () => {
    if (!secondary_cta_link) return;
    
    // Check if it's an internal section link
    if (secondary_cta_link.startsWith('#')) {
      const sectionId = secondary_cta_link.substring(1);
      scrollToSection(sectionId);
    }
    // Check if it's a full URL
    else if (secondary_cta_link.startsWith('http')) {
      if (secondary_cta_new_tab) {
        window.open(secondary_cta_link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = secondary_cta_link;
      }
    }
    // If it's a relative path
    else {
   
      // Fallback to contact section
      const contactSection = document.getElementById('contact') || 
                            document.getElementById('cta-banner-call-to-action') ||
                            document.getElementById('newsletter-and-contact-info');
      
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Smart CTA Link Generator (Based on available sections)
  const getSmartPrimaryLink = () => {
    if (!primary_cta_link) return null;
    
    if (primary_cta_link.startsWith('#') || primary_cta_link.startsWith('http')) {
      return primary_cta_link;
    }
    
    // Check what sections are available
    if (primary_cta_link.includes('contact')) {
      // Try to find contact sections
      if (document.querySelector('#contact') || 
          document.querySelector('#cta-banner-call-to-action') ||
          document.querySelector('#newsletter-and-contact-info')) {
        return '#contact';
      }
    } else if (primary_cta_link.includes('project') || primary_cta_link.includes('start')) {
      // Try to find contact or form sections
      return '#contact';
    }
    
    return null;
  };

  // Render CTA buttons
  const renderPrimaryCTA = () => {
    const smartLink = getSmartPrimaryLink();
    
    if (smartLink && smartLink.startsWith('#')) {
      return (
        <button 
          onClick={() => scrollToSection(smartLink.substring(1))}
          className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg md:text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 overflow-hidden"
          aria-label={primary_cta_text || 'Start a Project'}
        >
          <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <span className="relative z-10 flex items-center justify-center gap-3">
            {primary_cta_text || 'Start a Project'}
            <svg 
              className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
        </button>
      );
    }
    const handlePrimaryCTAClick = () => {

  
  if (!isClient) {
 
    return;
  }
  

  
  const contactSections = [
    'contact',
    'cta-banner-call-to-action', 
    'newsletter-and-contact-info',
    'footer'
  ];
  
  // Log all available sections for debugging
  const allSections = document.querySelectorAll('[id]');
  console.log('Available sections with IDs:', 
    Array.from(allSections).map(el => el.id)
  );
  
  for (const sectionId of contactSections) {
    const element = document.getElementById(sectionId);

    
    if (element) {
     
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      return;
    }
  }
  
 
  window.scrollTo({ 
    top: document.body.scrollHeight, 
    behavior: 'smooth' 
  });
};
    return (
      <button 
      onClick={handlePrimaryCTAClick}
      className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg md:text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 overflow-hidden"
      aria-label={primary_cta_text || 'Start a Project'}
    >
      <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <span className="relative z-10 flex items-center justify-center gap-3">
        {primary_cta_text || 'Start a Project'}
        <svg 
          className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
    </button>
    );
  };
  

  const renderSecondaryCTA = () => {
    if (!secondary_cta_text) return null;
    
    // Always treat secondary CTA as internal navigation to contact section
    const handleContactClick = () => {
      const contactSection = document.getElementById('contact') || 
                            document.getElementById('cta-banner-call-to-action') ||
                            document.getElementById('newsletter-and-contact-info');
      
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If no contact section found, scroll to bottom
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };
    
    return (
      <button 
        onClick={handleContactClick}
        className="group relative px-10 py-5 rounded-2xl border-2 border-white/30 hover:border-white/60 text-white font-bold text-lg md:text-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 active:scale-95"
        aria-label={secondary_cta_text}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {secondary_cta_text}
          <svg 
            className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </button>
    );
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Background Image */}
      {imageUrl && (
        <>
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? 'opacity-30 blur-[1px]' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.1)`,
            }}
            onLoad={() => setIsLoaded(true)}
            role="img"
            aria-label="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        </>
      )}
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-black/30"
          >
            
            {/* Badge */}
            {badge && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 mb-10"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-purple-400"></span>
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {badge}
                </span>
              </motion.div>
            )}
            
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 relative group">
                {title || 'We Build Digital Masterpieces'}
                <span className="absolute -bottom-4 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-200/90 mb-10 md:mb-12 leading-relaxed font-light max-w-4xl mx-auto"
            >
              {subtitle || 'Innovative solutions for forward-thinking brands. We specialize in Design, Dev, and Growth.'}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12"
            >
              {renderPrimaryCTA()}
              {renderSecondaryCTA()}
            </motion.div>
            
            {/* Stats Section */}
            {stats && stats.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-12 border-t border-white/10"
              >
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="group text-center p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mt-3 mx-auto rounded-full"></div>
                  </div>
                ))}
              </motion.div>
            )}
            
            {/* Trust Badges */}
            {trusted_by && trusted_by.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-gray-400 text-sm mb-6">Trusted by industry leaders</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
                  {trusted_by.map((company, index) => (
                    <div 
                      key={index} 
                      className="text-2xl font-bold text-gray-300/80 hover:text-white transition-colors"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {show_scroll_indicator && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 animate-pulse">Scroll</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(180deg); 
          }
        }
      `}</style>
    </section>
  );
}