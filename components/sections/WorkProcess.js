"use client";

import { memo, useMemo, useCallback, useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, useReducedMotion } from "framer-motion";
import { 
  Target,
  Search,
  Lightbulb,
  Palette,
  Code,
  Cpu,
  Rocket,
  CheckCircle,
  BarChart,
  Users,
  Shield,
  Award,
  TrendingUp,
  ChevronRight,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Layers,
  TestTube,
  Server,
  Globe,
  ArrowLeft,
  ArrowRight,
  Zap,
  Sparkles
} from "lucide-react";

// Icon mapping for Strapi icon names
const ICON_MAP = {
  Search, Target, Lightbulb, Palette, Code, Cpu, Rocket, CheckCircle, BarChart,
  Users, Shield, Award, TrendingUp, Calendar, Clock, FileText, MessageSquare,
  Layers, TestTube, Server, Globe, ArrowLeft, ArrowRight, Zap, Sparkles
};

// Get icon component from Strapi icon name
const getIconComponent = (iconName) => {
  return ICON_MAP[iconName] || Search;
};

// Default timeline colors
const DEFAULT_TIMELINE_COLORS = [
  "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#6366F1", "#14B8A6", "#F97316"
];

// Default statistics
const DEFAULT_STATISTICS = [
  { value: "100%", label: "Client Satisfaction", icon: "Users" },
  { value: "24/7", label: "Support", icon: "Shield" },
  { value: "50+", label: "Projects", icon: "Award" },
  { value: "99%", label: "On Time", icon: "TrendingUp" }
];

// Animation variants
const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  timelineItem: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  timelineItemRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};

// Updated getImageUrl function with better debugging
export const getImageUrl = (image) => {
  if (!image?.url) return null;
  // Localhost ki jagah base URL use karein
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://agency-backend-production-270b.up.railway.app";
  return `${STRAPI_URL}${image.url}`;
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

// Get appropriate icon based on step
const getStepIcon = (step, index) => {
  if (step.icon) return getIconComponent(step.icon);
  
  // Default icons based on step number
  const defaultIcons = [
    Search,     // Step 1: Discovery
    Lightbulb,  // Step 2: Planning
    Palette,    // Step 3: Design
    Code,       // Step 4: Development
    TestTube,   // Step 5: Testing
    Server,     // Step 6: Deployment
    Users,      // Step 7: Training
    Award       // Step 8: Support
  ];
  
  return defaultIcons[index] || Search;
};

// Timeline Card Component
const TimelineCard = memo(({ 
  step, 
  index, 
  isRight = false,
  color,
  isActive,
  onHover 
}) => {
  const Icon = useMemo(() => getStepIcon(step, index), [step, index]);
  const [imgError, setImgError] = useState(false);
  
  // Get image URL with detailed debugging
const imageUrl = useMemo(() => {
    if (!step.image?.url) return null;
    if (step.image.url.startsWith('http')) return step.image.url;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://agency-backend-production-270b.up.railway.app";
    return `${baseUrl}${step.image.url}`;
  }, [step]);

  
  // Get icon component
  const Icon = useMemo(() => getStepIcon(step, index), [step, index]);
  
  // Parse tags from JSON string or array
  const tags = useMemo(() => {
    if (!step.tags) return [];
    if (typeof step.tags === 'string') {
      try {
        return JSON.parse(step.tags);
      } catch {
        return [step.tags];
      }
    }
    return step.tags;
  }, [step.tags]);

  // Parse milestones from JSON string or array
  const milestones = useMemo(() => {
    if (!step.milestones) return [];
    if (typeof step.milestones === 'string') {
      try {
        return JSON.parse(step.milestones);
      } catch {
        return [step.milestones];
      }
    }
    return step.milestones;
  }, [step.milestones]);

   return (
    <motion.div
      variants={isRight ? VARIANTS.timelineItemRight : VARIANTS.timelineItem}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`relative ${isRight ? 'md:ml-auto' : 'md:mr-auto'} w-full md:w-5/12`}
    >
      {/* Timeline Node (OUTSIDE THE CARD) */}
      <div className={`absolute top-0 md:top-1/2 -translate-y-1/2 z-20 ${isRight ? 'md:left-0 md:-translate-x-12' : 'md:right-0 md:translate-x-12'} left-1/2 -translate-x-1/2 md:translate-x-0`}>
        <div className="relative flex flex-col items-center">
          {/* Step number - ABOVE ICON */}
          <div className="mb-2">
            <div className="px-3 py-1 bg-white rounded-full shadow-lg text-sm font-bold 
              text-gray-700 border border-gray-200 whitespace-nowrap">
              Step {step.step_number || index + 1}
            </div>
          </div>
          
          {/* Icon circle */}
          <motion.div
            animate={{ 
              scale: isActive ? 1.2 : 1,
              boxShadow: isActive ? `0 0 20px ${color}40` : '0 4px 12px rgba(0,0,0,0.1)'
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center
              border-4 border-white shadow-lg"
            style={{ backgroundColor: color }}
          >
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            
            {/* Pulse effect for active step */}
            {isActive && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: color }}
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: color }}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Timeline Line Connection */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-0.5 md:w-6 
        ${isRight ? 'left-0 md:-left-6' : 'right-0 md:-right-6'} hidden md:block`}
        style={{ backgroundColor: color }}
      />
      
      {/* Card Content */}
      <motion.div
        animate={{ 
          y: isActive ? -5 : 0,
          borderColor: isActive ? color : '#E5E7EB'
        }}
        className="relative bg-white rounded-2xl shadow-lg border-2 p-6 mt-24 md:mt-0 ml-0 md:ml-12"
      >
        {/* Card header WITHOUT step number */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {step.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{step.label || `Phase ${index + 1}`}</span>
              <span className="mx-1">•</span>
              <Calendar className="w-4 h-4" />
              <span>{step.week || `Week ${index + 1}`}</span>
              {step.duration && (
                <>
                  <span className="mx-1">•</span>
                  <span>{step.duration}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold" style={{ color: color }}>
              {Math.round((index + 1) / 8 * 100)}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          {step.description}
        </p>
        
        {/* Milestones if available */}
        {milestones.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-700 font-medium mb-2">Key Milestones:</div>
            <div className="flex flex-wrap gap-2">
              {milestones.slice(0, 3).map((milestone, i) => (
                <span 
                  key={`milestone-${index}-${i}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                >
                  {milestone}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">Progress:</span>
            <span className="px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: color }}>
              {index + 1}/8
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(index + 1) / 8 * 100}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, i) => (
              <span 
                key={`${step.id || index}-${i}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

TimelineCard.displayName = 'TimelineCard';

// Debug component to show API response
const DebugPanel = ({ data, steps }) => {
  const [showDebug, setShowDebug] = useState(false);
  
  if (!data || process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
      >
        {showDebug ? 'Hide Debug' : 'Show Debug'}
      </button>
      
      {showDebug && (
        <div className="mt-2 bg-white p-4 rounded-lg shadow-xl border max-w-md max-h-96 overflow-auto">
          <h3 className="font-bold mb-2">API Response Debug</h3>
          <div className="text-sm">
            <p><strong>Total Steps:</strong> {steps?.length || 0}</p>
            <p><strong>Steps with images:</strong> {steps?.filter(s => s.image).length || 0}</p>
            
            {steps?.map((step, idx) => (
              <div key={idx} className="mt-2 p-2 border rounded">
                <p><strong>Step {idx}:</strong> {step.title}</p>
                <p><strong>Has image field:</strong> {!!step.image ? 'Yes' : 'No'}</p>
                {step.image && (
                  <>
                    <p><strong>Image type:</strong> {typeof step.image}</p>
                    <p><strong>Image keys:</strong> {Object.keys(step.image).join(', ')}</p>
                    <pre className="text-xs bg-gray-100 p-1 mt-1 overflow-auto">
                      {JSON.stringify(step.image, null, 2)}
                    </pre>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Timeline Component
export default function WorkProcess({ data }) {
  
  
  // Detailed step analysis
  useEffect(() => {
    if (data?.steps && data.steps.length > 0) {
      
      data.steps.forEach((step, idx) => {
        
        if (step.image) {
      
        }
      });
    }
  }, [data]);

  // Extract data based on Strapi structure
  const header = data?.header || {};
  const config = data?.configuration || {};
  const cta = data?.call_to_action || {};
  
  // Extract values with fallbacks
  const header_badge = header.header_badge || "🚀 PROCESS TIMELINE";
  const header_title = header.header_title || "Our Step-by-Step Development Journey";
  const header_description = header.header_description || "From initial concept to final deployment, follow our proven 8-phase development methodology that ensures quality, transparency, and timely delivery";
  
  const steps = data?.steps || [];
  const timeline_colors = config.timeline_colors || DEFAULT_TIMELINE_COLORS;
  const enable_auto_rotate = config.enable_auto_rotate !== undefined ? config.enable_auto_rotate : true;
  const auto_rotate_interval = config.auto_rotate_interval || 3000;
  const show_progress_bar = config.show_progress_bar !== undefined ? config.show_progress_bar : true;
  const show_stats = config.show_stats !== undefined ? config.show_stats : true;
  const show_cta = config.show_cta !== undefined ? config.show_cta : true;
  
  const cta_button_text = cta.cta_button_text || "Start Your Project Timeline";
  const cta_description = cta.cta_description || "Ready to begin your journey? Let's get started.";
  const cta_button_link = cta.cta_button_link || "";
  const cta_features = cta.cta_features || ["No upfront costs", "30-day free support", "Flexible timelines"];
  
  const stats_title = data?.stats_title || "Our Track Record";
  const statistics = data?.statistics || DEFAULT_STATISTICS;

  // Refs and State
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.05,
    margin: "-100px"
  });
  
  const controls = useAnimation();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Animation control
  useEffect(() => {
    if (isInView && steps.length > 0) {
      controls.start("visible");
      
      // Animate progress
      const timer = setTimeout(() => {
        setProgress(100);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [controls, isInView, steps.length]);

  // Auto rotate through steps
  useEffect(() => {
    if (!shouldReduceMotion && enable_auto_rotate && steps.length > 0) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, parseInt(auto_rotate_interval) || 3000);
      
      return () => clearInterval(interval);
    }
  }, [steps.length, shouldReduceMotion, enable_auto_rotate, auto_rotate_interval]);

  // Calculate current phase based on active step
  useEffect(() => {
    const phase = Math.floor(activeStep / 2);
    setCurrentPhase(phase);
  }, [activeStep]);

  // Handle step hover
  const handleStepHover = useCallback((index) => {
    if (!shouldReduceMotion) {
      setActiveStep(index !== null ? index : 0);
    }
  }, [shouldReduceMotion]);

  // Scroll to active step
  const scrollToStep = useCallback((index) => {
    const stepElements = timelineRef.current?.querySelectorAll('.timeline-step');
    if (stepElements && stepElements[index]) {
      stepElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

  // Show loading/empty state if no steps
  if (steps.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Timeline Coming Soon
            </h3>
            <p className="text-gray-500">
              Our development process timeline is currently being configured.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b 
        from-gray-50 to-white"
      aria-label="Our Work Process Timeline"
    >
     
      
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-400/5 rounded-full 
          blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-400/5 
          rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(90deg, #9CA3AF 1px, transparent 1px),
                             linear-gradient(180deg, #9CA3AF 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={VARIANTS.fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 
              border border-blue-200 rounded-full mb-6"
          >
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold tracking-wide">
              {header_badge}
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent">
              {header_title}
            </span>
          </h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              rounded-full mx-auto"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6 md:mt-8"
          >
            {header_description}
          </motion.p>
        </motion.header>

        {/* Timeline Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12 md:mb-20"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Current Phase: {steps[currentPhase]?.label || 'Discovery'}
                </h3>
                <p className="text-gray-600 text-sm">
                  Step {activeStep + 1} of {steps.length}
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="flex-1 max-w-2xl">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Start</span>
                  <span>Completion</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newStep = activeStep > 0 ? activeStep - 1 : steps.length - 1;
                    setActiveStep(newStep);
                    scrollToStep(newStep);
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg 
                    transition-colors flex items-center gap-2"
                  aria-label="Previous step"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  onClick={() => {
                    const newStep = (activeStep + 1) % steps.length;
                    setActiveStep(newStep);
                    scrollToStep(newStep);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                    text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  aria-label="Next step"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 md:w-0.5 
            bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 
            -translate-x-1/2 hidden md:block"
            aria-hidden="true"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            />
          </div>
          
          {/* Timeline Items */}
         <motion.div
  variants={VARIANTS.container}
  initial="hidden"
  animate={controls}
  className="space-y-32 md:space-y-40"
>
            {steps.map((step, index) => {
    const isRight = index % 2 === 1;
    const color = timeline_colors[index % timeline_colors.length] || DEFAULT_TIMELINE_COLORS[index % DEFAULT_TIMELINE_COLORS.length];
              
              return (
                <div 
                  key={step.id || step.step_number || index}
                  className={`timeline-step relative ${isRight ? 'md:flex justify-end' : ''}`}
                >
                  {/* Date/Time indicator */}
                  <div className={`absolute top-0 ${isRight ? 'md:left-1/2 md:translate-x-6' : 'md:right-1/2 md:-translate-x-6'} 
                    md:w-32 text-center z-20`}
                  >
                    <div className="bg-white px-3 py-1 rounded-full shadow-sm border 
                      border-gray-200 text-sm font-medium text-gray-700 inline-block">
                      {step.week || `Week ${index + 1}`}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 hidden md:block">
                      Phase {index + 1}
                    </div>
                  </div>
                  
                  <TimelineCard
          step={step}
          index={index}
          isRight={isRight}
          color={color}
          isActive={activeStep === index}
          onHover={handleStepHover}
        />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        {show_stats && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-24 md:mt-32"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 
              border border-gray-200 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                {stats_title}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {statistics.map((stat, index) => {
                  const Icon = getIconComponent(stat.icon);
                  
                  return (
                    <motion.div
                      key={stat.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="text-center"
                    >
                      <div className="relative inline-flex items-center justify-center w-14 h-14 
                        md:w-16 md:h-16 bg-white rounded-2xl shadow-sm mb-4"
                      >
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-base text-gray-600">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* CTA */}
        {show_cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 text-center"
          >
            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 
                text-white font-semibold text-lg md:text-xl rounded-xl shadow-lg 
                hover:shadow-xl transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
               onClick={() => {
    
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
            >
              <span className="flex items-center justify-center gap-3">
                {cta_button_text}
                <Rocket className="w-5 h-5 md:w-6 md:h-6" />
              </span>
            </motion.button>
            
            <p className="text-gray-600 mt-4 md:mt-6">
              {cta_description}
            </p>
            
            {/* CTA Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              {cta_features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
