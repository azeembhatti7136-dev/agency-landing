"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Eye,
  ExternalLink,
  Sparkles,
  Filter,
  ChevronRight,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Heart,
  Share2,
  Maximize2,
  Image as ImageIcon,
  Star,
  Zap,
  Layers,
  Palette,
  Code,
  Rocket,
  Globe,
  Github,
  Users,
  Tag,
  Briefcase,
  CheckCircle,
  Clock,
  Cpu,
  Link
} from "lucide-react";

export default function Portfolio({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedStates, setExpandedStates] = useState({});

const handleLiveDemo = (url) => {
    if (!url) {
      alert("Live demo URL not available");
      return;
    }
    
    // Ensure URL starts with http:// or https://
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };
  
 
  // Server par same random values ke liye
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Client side par hi particles generate karo
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    })));
    
    setMounted(true);
  }, []);
const toggleExpand = (projectId) => {
 
  
  if (expandedProject === projectId) {
    setExpandedProject(null);
  } else {
    setExpandedProject(projectId);
  }
};

  // Get unique categories
  const categories = ["all", ...new Set(data.projects?.map(p => p.category) || [])];
  
  // Filter projects
  const filteredProjects = activeFilter === "all" 
    ? (data.projects || []) 
    : (data.projects || []).filter(p => p.category === activeFilter);

  // Featured projects
  const featuredProjects = (data.projects || []).filter(p => p.featured === true);
  
  // Color schemes for categories
  const categoryColors = {
    all: "from-blue-500 via-cyan-500 to-purple-500",
    web: "from-purple-500 via-pink-500 to-rose-500",
    mobile: "from-green-500 via-emerald-500 to-teal-500",
    design: "from-orange-500 via-amber-500 to-yellow-500",
    branding: "from-red-500 via-pink-500 to-rose-500",
    ecommerce: "from-indigo-500 via-blue-500 to-cyan-500",
  };

  const categoryIcons = {
    all: <Globe className="w-5 h-5" />,
    web: <Code className="w-5 h-5" />,
    mobile: <Rocket className="w-5 h-5" />,
    design: <Palette className="w-5 h-5" />,
    branding: <Layers className="w-5 h-5" />,
    ecommerce: <Zap className="w-5 h-5" />,
  };

  // Project status colors
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    planned: "bg-blue-100 text-blue-800",
    on_hold: "bg-gray-100 text-gray-800",
  };

  const statusIcons = {
    completed: <CheckCircle className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    planned: <Target className="w-4 h-4" />,
    on_hold: <Clock className="w-4 h-4" />,
  };
  
  // Get image URL helper
  const getImageUrl = (image) => {
    if (!image) return null;
    
    let imageUrl = null;
    
    if (Array.isArray(image)) {
      const firstImage = image[0];
      imageUrl = firstImage?.attributes?.url || firstImage?.url || firstImage?.data?.attributes?.url;
    } else if (image && typeof image === 'object') {
      imageUrl = image.attributes?.url || image.url || image.data?.attributes?.url;
    }
    
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) return imageUrl;
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    return `${STRAPI_URL}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  };

  // Format date - SERVER SAFE
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };
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
  // Get description text - FIXED FUNCTION
const getDescriptionText = (description) => {
  if (!description) return "";
  
  
  
  // Agar string hai to wahi return karo
  if (typeof description === 'string') {
    return description.trim();
  }
  
  // Agar object hai to text field dekho
  if (description && typeof description === 'object') {
    // Strapi rich text format
    if (description.text) return description.text.trim();
    
    // Agar array of objects hai (Strapi ka common format)
    if (Array.isArray(description)) {
      // String array hai to join karo
      if (description.every(item => typeof item === 'string')) {
        return description.join(' ').trim();
      }
      
      // Object array hai to text extract karo
      if (description.every(item => item && typeof item === 'object')) {
        const texts = description.map(item => {
          if (item.text) return item.text;
          if (item.children) return item.children.map(child => 
            typeof child === 'string' ? child : child?.text || ""
          ).join(' ');
          return "";
        }).filter(text => text.trim());
        
        return texts.join(' ').trim();
      }
    }
    
    // Direct text access
    if (description.data?.text) return description.data.text.trim();
    if (description.data?.attributes?.text) return description.data.attributes.text.trim();
  }
  
  // Last resort - stringify karo
  try {
    return String(description).trim();
  } catch {
    return "";
  }
};

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-white">
      {/* Animated Background Particles - CLIENT ONLY */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`,
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            x: [`${particle.x}vw`, `${particle.x + 20}vw`, `${particle.x}vw`],
            y: [`${particle.y}vh`, `${particle.y - 30}vh`, `${particle.y}vh`],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
      
      {/* Gradient Orbs - CLIENT ANIMATION ONLY */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted ? (
          <>
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            />
          </>
        ) : (
          // Server side rendering ke liye static divs
          <>
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
          </>
        )}
      </div>
      
      {/* Animated Grid Pattern - STATIC */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-gray-400" />
        </svg>
      </div>

      {/* Floating Elements - CLIENT ONLY */}
      {mounted && (
        <>
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 z-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg" />
              <Star className="relative w-8 h-8 text-blue-400" />
            </div>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -180, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-10 z-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg" />
              <Sparkles className="relative w-8 h-8 text-purple-400" />
            </div>
          </motion.div>
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section with Beautiful Animations */}
        <motion.div
          initial={mounted ? { opacity: 0, y: -50 } : false}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          <motion.div
  initial={mounted ? { scale: 0, rotate: -180 } : false}
  animate={isInView && mounted ? { scale: 1, rotate: 0 } : false}
  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg shadow-blue-500/30"
>
  <Sparkles className="w-5 h-5 text-white" />
  <span className="text-white text-sm font-semibold tracking-wider">
    CREATIVE PORTFOLIO
  </span>
  <Sparkles className="w-5 h-5 text-white" />
</motion.div>

{/* 2. My Portfolio Title (Lower Position) */}
<div className="relative inline-block block w-full">
  <motion.h2
    initial={mounted ? { opacity: 0, y: 30 } : false}
    animate={isInView && mounted ? { opacity: 1, y: 0 } : false}
    transition={{ delay: 0.3 }}
    className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4"
  >
    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      {data?.title || "My Portfolio"}
    </span>
  </motion.h2>
  
  {/* Title Underline Animation */}
  {mounted && (
    <motion.div
      initial={{ width: 0 }}
      animate={isInView ? { width: "200px" } : {}} // Aap isay 100% bhi rakh sakte hain
      transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
      className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto"
    />
  )}
</div>
          
          {/* Animated Description */}
          <motion.p
            initial={mounted ? { opacity: 0 } : false}
            animate={isInView && mounted ? { opacity: 1 } : false}
            transition={{ delay: 0.6 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            Where <span className="font-bold text-blue-600">innovation</span> meets{" "}
            <span className="font-bold text-purple-600">excellence</span> in every pixel
          </motion.p>
        </motion.div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={isInView && mounted ? { opacity: 1, y: 0 } : false}
            transition={{ delay: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Featured Projects</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => {
                const imageUrl = getImageUrl(project.image);
                const descriptionText = getDescriptionText(project.description);
                
                return (
                  <motion.div
                    key={`featured-${project.id || index}`}
                    initial={mounted ? { opacity: 0, x: -50 } : false}
                    animate={mounted ? { opacity: 1, x: 0 } : false}
                    transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
                    whileHover={mounted ? { y: -10 } : false}
                    className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
                  >
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                        <Star className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-bold">FEATURED</span>
                      </div>
                    </div>
                    
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={project.project_name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-bold text-gray-900">{project.project_name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.project_status] || statusColors.completed}`}>
                          {project.project_status?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {descriptionText || "Complete e-commerce solution..."}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(project.date)}</span>
                        </div>
                        <motion.button
                          whileHover={mounted ? { scale: 1.05 } : false}
          whileTap={mounted ? { scale: 0.95 } : false}
          onClick={() => {
           
             if (project.live_demo || project.link) {
             handleLiveDemo(project.live_demo || project.link);
            } else {
              // Ya phir modal open karo
              alert(`Viewing details for: ${project.project_name}`);
            }
          }}
                           className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer"
        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Animated Filter Buttons */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={isInView && mounted ? { opacity: 1, y: 0 } : false}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <motion.div
            whileHover={mounted ? { scale: 1.05 } : false}
            className="inline-flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Browse by:</span>
          </motion.div>
          
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={mounted ? { opacity: 0, scale: 0.8, x: -20 } : false}
              animate={isInView && mounted ? { opacity: 1, scale: 1, x: 0 } : false}
              transition={{ delay: 1.0 + index * 0.1, type: "spring" }}
              whileHover={mounted ? { 
                scale: 1.1,
                y: -5,
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)"
              } : false}
              whileTap={mounted ? { scale: 0.95 } : false}
              onClick={() => setActiveFilter(category)}
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === category
                  ? "text-white shadow-2xl"
                  : "bg-white/50 backdrop-blur-sm text-gray-700 border border-gray-200/50 hover:border-gray-300 hover:shadow-lg"
              }`}
            >
              {/* Animated Background */}
              {activeFilter === category && mounted && (
                <motion.div
                  layoutId="activeFilter"
                  className={`absolute inset-0 bg-gradient-to-r ${categoryColors[category] || categoryColors.all} rounded-full -z-10`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              {mounted ? (
                <motion.span
                  animate={activeFilter === category ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                  className={activeFilter === category ? "text-white" : "text-gray-500"}
                >
                  {categoryIcons[category] || <Globe className="w-4 h-4" />}
                </motion.span>
              ) : (
                <span className={activeFilter === category ? "text-white" : "text-gray-500"}>
                  {categoryIcons[category] || <Globe className="w-4 h-4" />}
                </span>
              )}
              
              {/* Text */}
              <span className="font-semibold">
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"}
              </span>
              
              {/* Count Badge */}
              <motion.span
                initial={mounted ? { scale: 0 } : false}
                animate={mounted ? { scale: 1 } : false}
                className={`px-2 py-1 text-xs rounded-full ${
                  activeFilter === category
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {category === "all" 
                  ? filteredProjects.length 
                  : filteredProjects.filter(p => p.category === category).length}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        {/* Animated Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
  {filteredProjects.map((project, index) => {
    const imageUrl = getImageUrl(project.image);
    const keyId = project.id ?? index;
    const isExpanded = expandedProject === keyId;
    const descriptionText = getDescriptionText(project.description) || "";
   
    const shortDescription = descriptionText.length > 100 
      ? descriptionText.substring(0, 100) + "..." 
      : descriptionText;
              
              return (
                <motion.div
                  key={project.id || index}
                  layout={mounted}
                  initial={mounted ? { opacity: 0, scale: 0.8, y: 50 } : false}
                  animate={mounted ? { opacity: 1, scale: 1, y: 0 } : false}
                  exit={mounted ? { opacity: 0, scale: 0.8, y: -50 } : false}
                  transition={mounted ? { 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  } : {}}
                  whileHover={mounted ? { 
                    y: -10,
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }
                  } : false}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative"
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute -top-2 -right-2 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg" />
                        <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-2">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Project Card */}
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 h-full">
                    {/* Glow Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[project.category] || categoryColors.all} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                    
                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden">
                      {imageUrl ? (
                        <>
                          {mounted && (
                            <motion.img
                              initial={{ scale: 1.1 }}
                              animate={{ scale: hoveredProject === index ? 1.05 : 1 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              src={imageUrl}
                              alt={project.project_name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}
                          
                          {/* Animated Overlay */}
                          {mounted && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                            />
                          )}
                          
                          {/* Image without animation for SSR */}
                          {!mounted && (
                            <img
                              src={imageUrl}
                              alt={project.project_name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          {mounted ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="text-center p-8"
                            >
                              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 font-medium">Coming Soon</p>
                            </motion.div>
                          ) : (
                            <div className="text-center p-8">
                              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 font-medium">Coming Soon</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Floating Category Badge */}
                      {mounted && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredProject === index ? 0 : 20,
                            opacity: hoveredProject === index ? 1 : 0
                          }}
                          className="absolute top-6 left-6"
                        >
                          <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${categoryColors[project.category] || categoryColors.all} shadow-lg`}>
                            {project.category}
                          </span>
                        </motion.div>
                      )}
                      
                      {/* Static Category Badge for SSR */}
                      {!mounted && (
                        <div className="absolute top-6 left-6">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${categoryColors[project.category] || categoryColors.all} shadow-lg`}>
                            {project.category}
                          </span>
                        </div>
                      )}
                      
                      {/* Animated Action Buttons */}
                      {mounted && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredProject === index ? 0 : 20,
                            opacity: hoveredProject === index ? 1 : 0
                          }}
                          className="absolute top-6 right-6 flex gap-2"
                        >
                          {[Heart, Share2, Maximize2].map((Icon, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                      
                      {/* Quick View Overlay */}
                      {mounted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredProject === index ? 1 : 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setExpandedProject(isExpanded ? null : (project.id ?? index))}
                            className="p-4 bg-white/20 backdrop-blur-lg rounded-full"
                          >
                            <Eye className="w-8 h-8 text-white" />
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {mounted ? (
                            <motion.h3
                              whileHover={{ x: 5 }}
                              className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                            >
                              {project.project_name}
                            </motion.h3>
                          ) : (
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {project.project_name}
                            </h3>
                          )}
                          
                          {/* Client Info */}
                          {project.client && (
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">{project.client}</span>
                            </div>
                          )}
                          
                          {/* Date and Status */}
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            {project.date && (
                              <div className="text-gray-600 text-sm flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(project.date)}</span>
                              </div>
                            )}
                            
                            {project.project_status && (
                              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.project_status] || statusColors.completed}`}>
                                {statusIcons[project.project_status] || <CheckCircle className="w-4 h-4" />}
                                <span>{project.project_status.replace('_', ' ').toUpperCase()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                       {/* TEST BUTTONS */}
<div className="flex flex-col gap-2 relative z-[9] pointer-events-auto">
  {/* Test 1: Simple window.open */}
  <button
    onClick={() => {
      console.log("Test button clicked");
      console.log("LIVE DEMO:", project.live_demo);
console.log("GITHUB:", project.github);
console.log("LINK:", project.link);
      window.open("https://github.com", '_blank');
    }}
    className="p-2 bg-red-100 rounded-xl"
  >
    <Github className="w-5 h-5 text-green-600" />
  </button>
  
  {/* Test 2: With project data */}
  <button
    onClick={() => handleLiveDemo(project.live_demo || project.github)}
    className="p-2 bg-green-100 rounded-xl"
  >
    <ExternalLink className="w-5 h-5 text-red-600" />
    
  </button>
</div>
                        
                      </div>
                      
                      {/* Description */}
                      {descriptionText && descriptionText.trim() !== "" ? (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={isExpanded ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                            className="text-gray-600 mb-4 text-sm leading-relaxed overflow-hidden "
                          >
                            {isExpanded ? descriptionText : shortDescription}
                          </motion.p>
                        ) : (
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed overflow-hidden">
                            {shortDescription}
                          </p>
                        )}
                      
                      {/* Read More Button */}
                       {descriptionText.length > 100 && (
                        <motion.button
                          onClick={() => toggleExpand(project.id ?? index)}
                          whileHover={mounted ? { scale: 1.05 } : false}
                          whileTap={mounted ? { scale: 0.95 } : false}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 relative z-[9] pointer-events-auto"
                        >
                          {expandedProject === (project.id ?? index) ? "Read Less" : "Read More"}
                        </motion.button>
                      )}
                      
                      {/* Technologies/Tags */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2 text-gray-700">
                            <Cpu className="w-4 h-4" />
                            <span className="text-sm font-medium">Technologies:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(project.technologies) 
                              ? project.technologies.map((tech, i) => (
                                  tech && (
                                    mounted ? (
                                      <motion.span
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-full"
                                      >
                                        {tech}
                                      </motion.span>
                                    ) : (
                                      <span
                                        key={i}
                                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-full"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )
                                ))
                              : <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-full">
                                  {project.technologies}
                                </span>
                            }
                          </div>
                        </div>
                      )}
                      
                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2 text-gray-700">
                            <Tag className="w-4 h-4" />
                            <span className="text-sm font-medium">Tags:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(project.tags) 
                              ? project.tags.map((tag, i) => (
                                  tag && (
                                    mounted ? (
                                      <motion.span
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full"
                                      >
                                        {tag}
                                      </motion.span>
                                    ) : (
                                      <span
                                        key={i}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )
                                ))
                              : <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full">
                                  {project.tags}
                                </span>
                            }
                          </div>
                        </div>
                      )}
                      
                      {/* Progress Bar Animation */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-bold text-green-600">
                            {project.project_status === 'completed' ? '100%' : 
                             project.project_status === 'in_progress' ? '65%' : 
                             project.project_status === 'planned' ? '10%' : '0%'}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          {mounted ? (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: 
                                project.project_status === 'completed' ? '100%' : 
                                project.project_status === 'in_progress' ? '65%' : 
                                project.project_status === 'planned' ? '10%' : '0%'
                              }}
                              transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                project.project_status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                project.project_status === 'in_progress' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                                project.project_status === 'planned' ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                                'bg-gradient-to-r from-gray-400 to-gray-500'
                              }`}
                            />
                          ) : (
                            <div 
                              className={`h-full rounded-full ${
                                project.project_status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                project.project_status === 'in_progress' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                                project.project_status === 'planned' ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                                'bg-gradient-to-r from-gray-400 to-gray-500'
                              }`}
                              style={{
                                width: project.project_status === 'completed' ? '100%' : 
                                       project.project_status === 'in_progress' ? '65%' : 
                                       project.project_status === 'planned' ? '10%' : '0%'
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-blue-50/0 to-purple-50/0 group-hover:from-white/10 group-hover:via-blue-50/20 group-hover:to-purple-50/10 transition-all duration-500 pointer-events-none" />
                  </div>
                  
                  {/* Floating Number Badge */}
                  {mounted && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        delay: 0.7 + index * 0.1
                      }}
                      whileHover={{ rotate: 360 }}
                      className="absolute -top-3 -left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-2xl border-4 border-white z-10"
                    >
                      <span className="font-bold text-sm">0{index + 1}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section with Beautiful Animation */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={mounted ? { opacity: 0, y: 50 } : false}
            animate={isInView && mounted ? { opacity: 1, y: 0 } : false}
            transition={{ delay: 1.5, type: "spring" }}
            className="mt-32"
          >
            <div className="relative bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-1 overflow-hidden">
              {/* Animated Border */}
              {mounted && (
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #8B5CF6, #3B82F6)",
                    backgroundSize: "300% 300%",
                  }}
                  className="absolute inset-0 opacity-30"
                />
              )}
              
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      Ready to create something{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        amazing
                      </span>
                      ?
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Let's bring your vision to life with our expert team
                    </p>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap gap-8 mt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {filteredProjects.length}+
                        </div>
                        <div className="text-gray-600">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {categories.length - 1}
                        </div>
                        <div className="text-gray-600">Categories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600">
                          {featuredProjects.length}
                        </div>
                        <div className="text-gray-600">Featured Works</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      initial={mounted ? { scale: 0 } : false}
                      onClick={() => {
    
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
                      animate={mounted ? { scale: 1 } : false}
                      transition={{ delay: 0.4, type: "spring" }}
                      whileHover={mounted ? { 
                        scale: 1.05,
                        boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)"
                      } : false}
                      whileTap={mounted ? { scale: 0.95 } : false}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl"
                    >
                      <span className="flex items-center gap-3">
                        Start Your Project
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </motion.button>
                    
                   
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Projects Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {activeFilter !== "all" 
                ? `No projects found in the ${activeFilter} category. Try selecting a different filter.`
                : "No projects have been added yet. Check back soon!"}
            </p>
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
              >
                View All Projects
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}