"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Award, 
  Target, 
  Users, 
  TrendingUp,
  Rocket,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  CheckSquare,
  Star,
  Zap
} from "lucide-react";

export default function About({ data }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const isImageInView = useInView(imageRef, { once: true });

  // Check if data exists
  if (!data) return null;

  // Extract data from Strapi with default values
  const {
    heading = "Our Journey of Excellence",
    description = "<p>We are a team of passionate professionals dedicated to delivering exceptional results.</p>",
    experience_years = 10,
    side_image,
    primary_cta_text = "Explore Our Work",
    primary_cta_link = "#portfolio-showcase",
    badge_text = "ABOUT OUR COMPANY",
    tagline = "",
    show_stats = true,
    show_features = true,
    features = [], // Strapi se features array aaye to use karein
    stats = [] // Strapi se stats array aaye to use karein
  } = data;

  // Default features if not provided by Strapi
  const defaultFeatures = [
    { 
      icon: <Shield className="w-6 h-6" />, 
      text: "Industry Certified", 
      color: "bg-blue-500",
      bg_color: "bg-blue-100",
      text_color: "text-blue-600"
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      text: "Global Reach", 
      color: "bg-purple-500",
      bg_color: "bg-purple-100",
      text_color: "text-purple-600"
    },
    { 
      icon: <Rocket className="w-6 h-6" />, 
      text: "Innovation Driven", 
      color: "bg-cyan-500",
      bg_color: "bg-cyan-100",
      text_color: "text-cyan-600"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      text: "Expert Team", 
      color: "bg-pink-500",
      bg_color: "bg-pink-100",
      text_color: "text-pink-600"
    },
  ];
const renderRichText = (content) => {
  if (!content) return "";

  // Agar already HTML string hai
  if (typeof content === "string") return content;

  // Agar Strapi RichText array hai
  if (Array.isArray(content)) {
    return content
      .map(block =>
        block.children?.map(child => child.text).join("")
      )
      .join("<br />");
  }

  return "";
};

  // Use Strapi features if available, otherwise use defaults
  const displayFeatures = features && features.length > 0 
    ? features.map((feature, index) => ({
        ...feature,
        icon: getIconComponent(feature.icon_name || defaultFeatures[index]?.icon_name),
        color: feature.color || defaultFeatures[index]?.color,
        bg_color: feature.bg_color || defaultFeatures[index]?.bg_color,
        text_color: feature.text_color || defaultFeatures[index]?.text_color
      }))
    : defaultFeatures;

  // Default stats if not provided by Strapi
  const defaultStats = [
    { 
      value: experience_years, 
      label: "Years Experience", 
      suffix: "+", 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      icon: <Clock className="w-5 h-5 text-blue-500" />
    },
    { 
      value: 500, 
      label: "Projects Delivered", 
      suffix: "+", 
      color: "text-purple-600", 
      bg: "bg-purple-100",
      icon: <CheckSquare className="w-5 h-5 text-purple-500" />
    },
    { 
      value: 99, 
      label: "Client Satisfaction", 
      suffix: "%", 
      color: "text-green-600", 
      bg: "bg-green-100",
      icon: <Star className="w-5 h-5 text-green-500" />
    },
    { 
      value: 50, 
      label: "Team Members", 
      suffix: "+", 
      color: "text-orange-600", 
      bg: "bg-orange-100",
      icon: <Users className="w-5 h-5 text-orange-500" />
    },
  ];

  // Use Strapi stats if available, otherwise use defaults
  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  // Helper function to get icon component
  function getIconComponent(iconName) {
    const iconMap = {
      shield: <Shield className="w-6 h-6" />,
      globe: <Globe className="w-6 h-6" />,
      rocket: <Rocket className="w-6 h-6" />,
      users: <Users className="w-6 h-6" />,
      award: <Award className="w-6 h-6" />,
      target: <Target className="w-6 h-6" />,
      clock: <Clock className="w-6 h-6" />,
      check: <CheckSquare className="w-6 h-6" />,
      star: <Star className="w-6 h-6" />,
      zap: <Zap className="w-6 h-6" />
    };
    return iconMap[iconName] || <Sparkles className="w-6 h-6" />;
  }

  // Add Strapi URL prefix helper
  const getImageUrl = (url) => {
    if (!url) return '';
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    return `${STRAPI_URL}${url}`;
  };

  // Get image URL from Strapi
  const imageUrl = data?.side_image?.data?.attributes?.url
  ? getImageUrl(data.side_image.data.attributes.url)
  : null;



  // Handle CTA click
  const handleCTAClick = () => {
    if (!primary_cta_link) return;
    
    if (primary_cta_link.startsWith('#')) {
      const sectionId = primary_cta_link.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    } else if (primary_cta_link.startsWith('http')) {
      window.open(primary_cta_link, '_blank', 'noopener,noreferrer');
    } else if (primary_cta_link.startsWith('/')) {
      // For Next.js internal routing (if you have multiple pages)
      window.location.href = primary_cta_link;
    }
  };

  return (
    <section 
      id="about-agency"
      ref={containerRef} 
      className="relative py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Clean Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                             linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Soft Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur animate-pulse" />
          <div className="relative w-3 h-3 bg-blue-500 rounded-full" />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-400 rounded-full blur animate-pulse" />
          <div className="relative w-3 h-3 bg-purple-500 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header with Badge */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold tracking-wider">
                  {badge_text}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
              >
                {heading}
                <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
                  {experience_years}+ Years of Excellence
                </span>
                {tagline && (
                  <span className="block text-xl md:text-2xl text-gray-600 font-light mt-4">
                    {tagline}
                  </span>
                )}
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
    __html: renderRichText(description), }}
            />

            {/* Features Grid */}
            {show_features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {displayFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.03,
                      translateY: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className={`flex-shrink-0 p-3 ${feature.color || 'bg-blue-500'} rounded-lg`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <span className="font-semibold text-gray-800">{feature.text || `Feature ${index + 1}`}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Stats Section */}
            {show_stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
              >
                {displayStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 ${stat.bg || 'bg-blue-100'} rounded-full mb-3`}>
                      {stat.icon || <TrendingUp className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold ${stat.color || 'text-blue-600'}`}>
                      {stat.value}{stat.suffix || ''}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            {primary_cta_text && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <motion.button
                  onClick={handleCTAClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    {primary_cta_text}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container with Floating Effect */}
             <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
               {data.side_image?.url ? (
                <img
                  src={getImageUrl(data.side_image.url)}
                  alt={data.side_image.alternativeText || "About Us"}
                  className="w-full h-auto md:h-[500px] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-20 h-20 text-blue-300 mx-auto mb-4" />
                    <p className="text-blue-400 font-medium">About Us Image</p>
                  </div>
                </div>
              )}
              
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isImageInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5
                }}
                className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-white" />
                  <span className="text-white font-bold text-sm">EXCELLENCE</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: -30 }}
              animate={isImageInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 z-20 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {experience_years}+
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">Years Experience</div>
                </div>
              </div>
            </motion.div>

            {/* Additional Stats Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 30 }}
              animate={isImageInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 z-10 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs text-gray-600 font-medium">Projects Done</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Dots Pattern */}
            <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-16"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}