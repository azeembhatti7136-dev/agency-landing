"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Mail, 
  Globe,
  Award,
  Briefcase,
  MapPin,
  Calendar,
  Star,
  Sparkles,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  Coffee,
  Target,
  Rocket,
  Lightbulb
} from "lucide-react";
import Image from "next/image";

// Social icon mapping - Strapi se JSON format mein aane ke liye
const SOCIAL_ICONS = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  website: Globe,
  email: Mail
};

// Animation variants
const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      y: -10,
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
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

// Modal Component
const TeamMemberModal = ({ member, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Social links ko parse karna - Strapi se JSON format mein aata hai
  const parseSocialLinks = () => {
    try {
      if (typeof member.socialLinks === 'string') {
        return JSON.parse(member.socialLinks);
      }
      return member.socialLinks || {};
    } catch {
      return {};
    }
  };

  const socialLinks = parseSocialLinks();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <span className="text-2xl">×</span>
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image */}
            <div className="lg:w-2/5 relative">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={member.photo?.url ? `http://127.0.0.1:1337${member.photo.url}` : '/default-avatar.jpg'}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  unoptimized={true}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none" />
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:bottom-4">
                <div className="flex gap-3">
                  {[
                    { icon: Briefcase, label: "Experience", value: member.experience || "Not specified" },
                    { icon: Award, label: "Projects", value: member.projects ? `${member.projects}+` : "N/A" },
                    { icon: Star, label: "Rating", value: member.rating || "N/A" }
                  ].map((stat, index) => (
                    <div key={index} className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                      <stat.icon className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                    <p className="text-blue-600 text-xl font-semibold">{member.designation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.joinDate && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Since {member.joinDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                {member.location && (
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              {/* Department */}
              {member.department && (
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {member.department}
                  </div>
                </div>
              )}

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  {member.bio || member.shortBio || "Passionate professional with extensive experience in their field. Dedicated to delivering exceptional results and driving innovation."}
                </p>
              </div>

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {typeof skill === 'object' ? skill.skills || skill.name : skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect</h3>
                <div className="flex gap-3">
                  {Object.entries(socialLinks).map(([platform, url]) => {
                    const Icon = SOCIAL_ICONS[platform];
                    if (!Icon || !url) return null;
                    
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 hover:bg-blue-100 rounded-xl transition-colors group"
                        aria-label={`${platform} profile`}
                      >
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Fun Facts */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Fun Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Coffee, label: "Experience", value: member.experience || "N/A" },
                    { icon: Heart, label: "Department", value: member.department || "N/A" },
                    { icon: Target, label: "Projects", value: member.projects ? `${member.projects}+` : "N/A" },
                    { icon: Rocket, label: "Location", value: member.location || "N/A" }
                  ].map((fact, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-white rounded-lg">
                        <fact.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{fact.value}</div>
                        <div className="text-sm text-gray-600">{fact.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Team({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Filter members by department
  const filteredMembers = activeFilter === "all" 
    ? data.members 
    : data.members.filter(member => 
        member.department?.toLowerCase() === activeFilter.toLowerCase()
      );

  // Carousel functionality for mobile
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % filteredMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + filteredMembers.length) % filteredMembers.length);
  };

  // Departments for filtering - unique departments extract karna
  const departments = ["all", ...new Set(
    data.members
      .map(m => m.department)
      .filter(Boolean)
      .map(dept => dept.trim())
  )];

  // Social links ko parse karne ka function
  const parseSocialLinks = (member) => {
    try {
      if (typeof member.socialLinks === 'string') {
        return JSON.parse(member.socialLinks);
      }
      return member.socialLinks || {};
    } catch {
      return {};
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(90deg, #9CA3AF 1px, transparent 1px),
                             linear-gradient(180deg, #9CA3AF 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 hidden lg:block"
      >
        <Sparkles className="w-8 h-8 text-blue-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <Zap className="w-8 h-8 text-purple-400" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header - Strapi se heading use karna */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold">MEET THE TEAM</span>
          </motion.div>

          {/* Title - Strapi se heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {data.heading || "Our Amazing Team"}
            </span>
          </h2>
          
          {/* Description - Strapi se text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {data.text || "Meet the talented individuals who make our success possible"}
          </motion.p>

          {/* Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Department Filter */}
        {departments.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setActiveFilter(dept);
                  setCurrentSlide(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === dept
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </motion.div>
        )}

        {/* Team Grid - Desktop */}
        <motion.div
          variants={VARIANTS.container}
          initial="hidden"
          animate={controls}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredMembers.map((member, index) => {
            const socialLinks = parseSocialLinks(member);
            
            return (
              <motion.div
                key={member.id || index}
                variants={VARIANTS.card}
                whileHover="hover"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
                className="relative group"
              >
                {/* Team Member Card */}
                <div 
                  className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-500"
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.photo?.url ? `http://127.0.0.1:1337${member.photo.url}` : '/default-avatar.jpg'}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized={true}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Social Links on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={hoveredMember === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      className="absolute bottom-4 left-0 right-0 flex justify-center gap-3"
                    >
                      {Object.entries(socialLinks).map(([platform, url]) => {
                        const Icon = SOCIAL_ICONS[platform];
                        if (!Icon || !url) return null;
                        
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${platform} profile`}
                          >
                            <Icon className="w-4 h-4 text-gray-700" />
                          </a>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.designation}</p>
                    
                    {/* Department */}
                    {member.department && (
                      <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                        {member.department}
                      </div>
                    )}
                    
                    {/* Short Bio */}
                    {member.shortBio && (
                      <p className="text-gray-600 text-sm line-clamp-2">{member.shortBio}</p>
                    )}
                    
                    {/* Skills Preview */}
                    {member.skills && member.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {member.skills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                          >
                            {typeof skill === 'object' ? skill.skills || skill.name : skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Additional Info */}
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      {member.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{member.location}</span>
                        </div>
                      )}
                      {member.experience && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          <span>{member.experience}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      View Profile
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Floating Elements */}
                {hoveredMember === index && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Star className="w-4 h-4 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 }}
                      className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Heart className="w-4 h-4 text-white" />
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Team Carousel - Mobile */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {filteredMembers.map((member, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={member.photo?.url ? `http://127.0.0.1:1337${member.photo.url}` : '/default-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mb-2">{member.designation}</p>
                      {member.department && (
                        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-3">
                          {member.department}
                        </div>
                      )}
                      {member.shortBio && (
                        <p className="text-gray-600 text-sm">{member.shortBio}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center gap-2">
              {filteredMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500" 
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next member"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, type: "spring" }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: data.members?.length || 0, label: "Team Members", icon: Users },
                { value: "50+", label: "Projects", icon: Briefcase },
                { value: "10+", label: "Years Experience", icon: Award },
                { value: "100%", label: "Client Satisfaction", icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 mx-auto">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
           onClick={() => {
    
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <Lightbulb className="w-12 h-12 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our growing team.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>

      {/* Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}