"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Target,
  ChevronRight,
  Shield,
  Star,
  Globe,
  Award,
  Rocket,
  Users
} from "lucide-react";

export default function Logos({ data }) {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || !data.logos) return null;

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const heading = data.heading || "Trusted by Industry Leaders";
  const description = data.description || "Join thousands of companies that trust our solutions";

  // Logo extraction function
  const getLogoUrl = (logo) => {
    const paths = [
      logo.logo_image?.url,
      logo.logo_image?.data?.attributes?.url,
      logo.image?.url,
      logo.image?.data?.attributes?.url,
      logo.attributes?.logo_image?.data?.attributes?.url,
      logo.attributes?.image?.data?.attributes?.url
    ];
    return paths.find(path => path) || null;
  };

  // Featured icons for hover effect
  const featureIcons = [
    <Zap key="zap" className="w-4 h-4 text-yellow-400" />,
    <Shield key="shield" className="w-4 h-4 text-blue-400" />,
    <Star key="star" className="w-4 h-4 text-purple-400" />,
    <TrendingUp key="trend" className="w-4 h-4 text-green-400" />,
    <Globe key="globe" className="w-4 h-4 text-cyan-400" />,
    <Award key="award" className="w-4 h-4 text-red-400" />,
    <Rocket key="rocket" className="w-4 h-4 text-orange-400" />,
    <Users key="users" className="w-4 h-4 text-pink-400" />
  ];

  // FIXED: Use deterministic positions for particles
  const particlePositions = useMemo(() => {
    // Use fixed positions instead of random
    return Array.from({ length: 15 }, (_, i) => ({
      left: (i * 6.66) % 100, // Deterministic calculation
      top: (i * 7.33) % 100,
      delay: i * 0.05
    }));
  }, []);

  // Animate logos when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Stagger animation variants
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
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: [0.3, 0.7, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        delay: i * 0.05,
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Particles - FIXED: Deterministic positions */}
      {mounted && particlePositions.map((pos, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={glowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold tracking-wider">
              TRUSTED PARTNERS
            </span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {heading}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Stats Counter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {data.logos.length}+
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Trusted Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                99%
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          {data.logos.map((logo, index) => {
            const imgUrl = getLogoUrl(logo);
            const brandName = logo.brand_name || `Partner ${index + 1}`;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Card Container */}
                <div className="relative p-8 bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  
                  {/* Glow Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Logo Container */}
                  <div className="relative h-20 flex items-center justify-center">
                    {imgUrl ? (
                      <>
                        {/* Hover Effect Layer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        
                        {/* FIXED: Use regular img tag to avoid Next.js Image hydration issues */}
                        <img
                          src={`${STRAPI_URL}${imgUrl}`}
                          alt={brandName}
                          className={`relative z-10 w-auto h-auto max-h-16 object-contain transition-all duration-500 
                            ${hoveredIndex === index 
                              ? 'filter-none opacity-100 scale-110' 
                              : 'grayscale opacity-70 hover:grayscale-0'}`}
                          loading="lazy"
                          onError={(e) => {
                            console.error('Image load failed:', brandName);
                            e.target.style.display = 'none';
                          }}
                        />
                      </>
                    ) : (
                      <div className="relative z-10">
                        {/* Animated Placeholder */}
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute inset-0 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full"
                        />
                        <div className="relative p-4">
                          <Target className="w-8 h-8 text-gray-400 mx-auto" />
                          <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            {brandName}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Floating Features on Hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1"
                  >
                    {featureIcons.slice(0, 4).map((Icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={hoveredIndex === index ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                      >
                        {Icon}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-50"
                >
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-2xl whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{brandName}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

       
        
        
      </div>
    </section>
  );
}