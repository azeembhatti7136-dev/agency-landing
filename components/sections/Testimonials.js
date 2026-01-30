"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Zap,
  Award,
  Heart,
  ThumbsUp,
  TrendingUp,
  Users,
  CheckCircle,
  MessageSquare,
  Shield,
  Globe,
  Clock
} from "lucide-react";

// Animation variants
const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },
  card: {
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
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideIn: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  }
};

// Star rating component
const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          <Star className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
        </motion.div>
      ))}
    </div>
  );
};

// Floating testimonial card
const TestimonialCard = ({ review, index, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color gradients based on index
  const gradients = [
    "from-blue-500/10 to-cyan-500/10",
    "from-purple-500/10 to-pink-500/10",
    "from-green-500/10 to-emerald-500/10",
    "from-orange-500/10 to-amber-500/10",
    "from-indigo-500/10 to-blue-500/10",
    "from-pink-500/10 to-rose-500/10"
  ];
  
  const gradient = gradients[index % gradients.length];
  
  return (
    <motion.div
      variants={VARIANTS.card}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(index)}
      className={`relative cursor-pointer ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Card */}
      <div className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl 
        rounded-3xl border border-gray-700/50 p-8 shadow-2xl overflow-hidden
        ${isActive ? 'ring-2 ring-blue-500/30' : ''}`}>
        
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 
          ${isHovered ? 'opacity-10' : 'opacity-0'} transition-opacity duration-500`} />
        
        {/* Floating particles */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${10 + i * 15}%`
                }}
              />
            ))}
          </>
        )}
        
        {/* Quote icon */}
        <motion.div
          animate={{ rotate: isHovered ? [0, 5, -5, 0] : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-6"
        >
          <Quote className="w-12 h-12 text-blue-500/20" />
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Stars */}
          <div className="mb-6">
            <StarRating rating={review.rating || 5} />
          </div>
          
          {/* Feedback text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed relative"
          >
            <span className="absolute -top-2 -left-2 text-4xl text-blue-400/30">"</span>
            {review.feedback}
            <span className="absolute -bottom-2 -right-2 text-4xl text-blue-400/30">"</span>
          </motion.p>
          
          {/* Client info */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{review.client_name}</h3>
              {review.company && (
                <p className="text-blue-400 font-medium">{review.company}</p>
              )}
              {review.position && (
                <p className="text-gray-400 text-sm">{review.position}</p>
              )}
            </div>
            
            {/* Client avatar or icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 
                rounded-2xl flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">
                  {review.client_name?.charAt(0) || "C"}
                </span>
              </div>
              
              {/* Verified badge */}
              {review.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full 
                    flex items-center justify-center border-2 border-gray-900"
                >
                  <CheckCircle className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Tags */}
          {review.tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {review.tags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>
        
        {/* Hover glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
          rounded-3xl ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 
        rounded-tl-2xl" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 
        rounded-br-2xl" />
    </motion.div>
  );
};

export default function Testimonials({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [activeReview, setActiveReview] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(data.reviews.length / reviewsPerPage);
  const currentReviews = data.reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );
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
  // Initialize animation
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, totalPages]);
  
  // Navigation
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setAutoPlay(false);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setAutoPlay(false);
  };
  
  // Stats data
  const stats = [
    { value: "4.9", label: "Average Rating", icon: Star },
    { value: "500+", label: "Happy Clients", icon: Users },
    { value: "98%", label: "Satisfaction", icon: Heart },
    { value: "24/7", label: "Support", icon: Clock }
  ];
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        />
        
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
        {isClient && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            animate={{ 
              y: [0, -100, 0],
              x: [0, Math.sin(particle.id) * 50, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity
            }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
          />
        ))}
      </div>
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 hidden lg:block"
      >
        <Sparkles className="w-8 h-8 text-blue-400/50" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <Zap className="w-8 h-8 text-purple-400/50" />
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={VARIANTS.fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/30 
              rounded-full mb-6 backdrop-blur-sm"
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold tracking-wide">
              TESTIMONIALS
            </span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent">
              {data.heading}
            </span>
          </h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Hear what our clients say about working with us
          </motion.p>
          
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              rounded-full mx-auto mt-6"
          />
        </motion.div>
        
        {/* Stats */}
        <motion.div
          variants={VARIANTS.container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={VARIANTS.fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center 
                  border border-gray-700/30"
              >
                <div className="relative inline-flex items-center justify-center w-14 h-14 
                  bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-4"
                >
                  <Icon className="w-7 h-7 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Testimonials Grid */}
          <motion.div
            variants={VARIANTS.container}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {currentReviews.map((review, index) => (
              <TestimonialCard
                key={index}
                review={review}
                index={index}
                isActive={activeReview === index}
                onClick={setActiveReview}
              />
            ))}
          </motion.div>
          
          {/* Carousel Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-8 mt-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevPage}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-full 
                  backdrop-blur-sm border border-gray-700/50 transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-gray-300" />
              </motion.button>
              
              {/* Page indicators */}
              <div className="flex items-center gap-3">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(index);
                      setAutoPlay(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'w-2 bg-gray-700 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPage}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-full 
                  backdrop-blur-sm border border-gray-700/50 transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-gray-300" />
              </motion.button>
              
              {/* Auto-play toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setAutoPlay(!autoPlay)}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl 
                  backdrop-blur-sm border border-gray-700/50 transition-colors flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${autoPlay ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-300">
                  {autoPlay ? 'Auto ON' : 'Auto OFF'}
                </span>
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-20"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Trusted By Industry Leaders
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {['Google', 'Microsoft', 'Amazon', 'Apple', 'Netflix'].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 text-2xl font-bold hover:text-white transition-colors"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
             onClick={() => {
   
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-3xl 
              transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-3">
              Share Your Experience
              <MessageSquare className="w-5 h-5" />
            </span>
          </motion.button>
          <p className="text-gray-400 mt-4">
            Join hundreds of satisfied clients
          </p>
        </motion.div>
      </div>
    </section>
  );
}