"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import React from "react";
import { 
  Rocket, Code, Palette, BarChart, Users, Shield, Zap, Globe,
  Target, TrendingUp, ChevronRight, Sparkles, CheckCircle, ArrowRight,
  Cpu, Database, Cloud, Smartphone, Search, MessageSquare, ShoppingBag,
  Lock, Headphones, Monitor, Server, FileText, Award, X, Clock,
  Calendar, Layers, PieChart, DollarSign, ExternalLink, Star
} from "lucide-react";

// Safe HTML parser component
const SafeHTML = ({ content, className = "" }) => {
  if (!content) return null;

 

  // CASE 1: Agar array hai (Strapi ka direct format)
  if (Array.isArray(content)) {
   
    
    const renderChildren = (children) => {
      if (!children || !Array.isArray(children)) return null;
      
      return children.map((child, idx) => {
        if (!child) return null;
        
        if (child.type === 'text') {
          let element = child.text || '';
          
          // Apply formatting
          if (child.bold) element = <strong key={idx} className="font-bold">{element}</strong>;
          if (child.italic) element = <em key={idx} className="italic">{element}</em>;
          if (child.underline) element = <span key={idx} className="underline">{element}</span>;
          if (child.code) element = <code key={idx} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
          
          return element;
        }
        
        // Agar nested element hai
        if (child.children) {
          return <span key={idx}>{renderChildren(child.children)}</span>;
        }
        
        return child.text || '';
      });
    };

    return (
      <div className={`strapi-rich-text ${className}`}>
        {content.map((block, index) => {
          if (!block) return null;
          
         
          
          switch (block.type) {
            case 'paragraph':
              // Check if paragraph is empty
              const hasContent = block.children?.some(child => 
                child.text && child.text.trim() !== ''
              );
              if (!hasContent) return null;
              
              return (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {renderChildren(block.children)}
                </p>
              );
            
            case 'heading':
              const HeadingTag = `h${block.level || 3}`;
              const headingSizes = {
                1: 'text-3xl md:text-4xl font-bold mb-6 mt-8',
                2: 'text-2xl md:text-3xl font-bold mb-5 mt-7',
                3: 'text-xl md:text-2xl font-bold mb-4 mt-6',
                4: 'text-lg md:text-xl font-bold mb-3 mt-5',
                5: 'text-base md:text-lg font-bold mb-2 mt-4',
                6: 'text-base font-bold mb-2 mt-4'
              };
              
              return (
                <HeadingTag 
                  key={index} 
                  className={`${headingSizes[block.level] || headingSizes[3]} text-gray-900`}
                >
                  {renderChildren(block.children)}
                </HeadingTag>
              );
            
            case 'list':
              const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
              const listStyles = block.format === 'ordered' 
                ? 'list-decimal pl-6 mb-4 space-y-2' 
                : 'list-disc pl-6 mb-4 space-y-2';
              
              return (
                <ListTag key={index} className={listStyles}>
                  {block.children?.map((listItem, i) => {
                    if (!listItem) return null;
                    return (
                      <li key={i} className="mb-2 text-gray-700">
                        {renderChildren(listItem.children)}
                      </li>
                    );
                  })}
                </ListTag>
              );
            
            case 'list-item':
              // Handle standalone list items
              return (
                <div key={index} className="flex items-start mb-2">
                  <span className="mr-2">•</span>
                  <span className="text-gray-700">
                    {renderChildren(block.children)}
                  </span>
                </div>
              );
            
            default:
              return (
                <div key={index} className="mb-4">
                  {renderChildren(block.children)}
                </div>
              );
          }
        })}
      </div>
    );
  }

  // CASE 2: Agar object hai aur blocks property hai
  if (content.blocks && Array.isArray(content.blocks)) {
    return <SafeHTML content={content.blocks} className={className} />;
  }

  // CASE 3: Agar HTML string hai
  if (typeof content === 'string') {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <div className={`text-gray-500 ${className}`}>No content available</div>;
};

// Function to extract text from Strapi description
const getDescriptionText = (description) => {
  if (!description) return "";
  
  // Agar string hai
  if (typeof description === 'string') return description;
  
  // Agar Strapi ke rich text format mein hai
  if (description.blocks && Array.isArray(description.blocks)) {
    let text = "";
    description.blocks.forEach(block => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => {
          if (child.text) text += child.text + " ";
        });
      }
    });
    return text.trim();
  }
  
  // Agar array format mein hai
  if (Array.isArray(description)) {
    return description.map(item => {
      if (typeof item === 'string') return item;
      if (item.children) {
        return item.children.map(child => child.text).join(' ');
      }
      return '';
    }).join(' ');
  }
  
  return JSON.stringify(description);
};

export default function Services({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
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
  useEffect(() => { 
    setIsClient(true); 
  }, []);

  const serviceData = data || {};
  const serviceItems = serviceData.service_items || [];

  // Icon library
  const iconLibrary = {
    'rocket': <Rocket className="w-6 h-6" />,
    'code': <Code className="w-6 h-6" />,
    'palette': <Palette className="w-6 h-6" />,
    'bar-chart': <BarChart className="w-6 h-6" />,
    'users': <Users className="w-6 h-6" />,
    'shield': <Shield className="w-6 h-6" />,
    'zap': <Zap className="w-6 h-6" />,
    'globe': <Globe className="w-6 h-6" />,
    'target': <Target className="w-6 h-6" />,
    'trending-up': <TrendingUp className="w-6 h-6" />,
    'cpu': <Cpu className="w-6 h-6" />,
    'database': <Database className="w-6 h-6" />,
    'cloud': <Cloud className="w-6 h-6" />,
    'smartphone': <Smartphone className="w-6 h-6" />,
    'search': <Search className="w-6 h-6" />,
    'message-square': <MessageSquare className="w-6 h-6" />,
    'shopping-bag': <ShoppingBag className="w-6 h-6" />,
    'lock': <Lock className="w-6 h-6" />,
    'headphones': <Headphones className="w-6 h-6" />,
  };

  // Get icon
  const getServiceIcon = (item) => {
    const iconType = item?.icon_type?.toLowerCase()?.trim();
    return iconType && iconLibrary[iconType] ? iconLibrary[iconType] : <Code className="w-6 h-6" />;
  };

  // Get features from Strapi - IMPROVED
  const getServiceFeatures = (item) => {
    // Check if Strapi has features array
    if (item?.features && Array.isArray(item.features)) {
      return item.features.map(f => {
        // Different possible formats from Strapi
        let featureText = "";
        
        if (typeof f === 'string') {
          featureText = f;
        } else if (f.feature_text) {
          featureText = f.feature_text;
        } else if (f.text) {
          featureText = f.text;
        } else if (f.children) {
          // Rich text format
          featureText = f.children.map(child => child.text).join(' ');
        } else if (typeof f === 'object') {
          // Try to extract text from any object
          featureText = JSON.stringify(f);
        }
        
        return {
          text: featureText || "Feature",
          icon: <CheckCircle className="w-4 h-4 text-green-500" />
        };
      });
    }
    
    // Default features based on title
    const title = item?.title?.toLowerCase() || '';
    if (title.includes('web') || title.includes('development')) {
      return [
        { text: "Custom Development", icon: <Code className="w-4 h-4" /> },
        { text: "Performance Optimized", icon: <Zap className="w-4 h-4" /> },
        { text: "SEO Friendly", icon: <Search className="w-4 h-4" /> },
        { text: "24/7 Support", icon: <Headphones className="w-4 h-4" /> }
      ];
    }
    if (title.includes('design') || title.includes('ui')) {
      return [
        { text: "UI/UX Design", icon: <Palette className="w-4 h-4" /> },
        { text: "Responsive Layout", icon: <Smartphone className="w-4 h-4" /> },
        { text: "User Testing", icon: <Users className="w-4 h-4" /> },
        { text: "Modern Trends", icon: <TrendingUp className="w-4 h-4" /> }
      ];
    }
    if (title.includes('marketing')) {
      return [
        { text: "SEO Strategy", icon: <Search className="w-4 h-4" /> },
        { text: "Content Marketing", icon: <FileText className="w-4 h-4" /> },
        { text: "Analytics Reports", icon: <BarChart className="w-4 h-4" /> },
        { text: "Social Media", icon: <MessageSquare className="w-4 h-4" /> }
      ];
    }
    
    return [
      { text: "Professional Service", icon: <Award className="w-4 h-4" /> },
      { text: "Expert Team", icon: <Users className="w-4 h-4" /> },
      { text: "Quality Guaranteed", icon: <CheckCircle className="w-4 h-4" /> },
      { text: "Timely Delivery", icon: <Clock className="w-4 h-4" /> }
    ];
  };

  // Gradient colors
  const getGradient = (index) => {
    const gradients = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-emerald-500", "from-orange-500 to-red-500"];
    return gradients[index % gradients.length];
  };

  // Handle Learn More
  const handleLearnMore = (service, index) => {
    setSelectedService({ 
      ...service, 
      index, 
      features: getServiceFeatures(service),
      description: getDescriptionText(service.description)
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Modal content
  const renderModalContent = () => {
    if (!selectedService) return null;

    const features = getServiceFeatures(selectedService);

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={closeModal}
        />
        {selectedService && (
  <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded z-50 opacity-75">
    <pre className="text-xs">
      Content Type: {typeof selectedService.learn_more_content}
      Has blocks: {selectedService.learn_more_content?.blocks ? 'Yes' : 'No'}
      Is array: {Array.isArray(selectedService.learn_more_content) ? 'Yes' : 'No'}
    </pre>
  </div>
)}
        {/* Modal */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className={`p-6 md:p-8 bg-gradient-to-r ${getGradient(selectedService.index)} text-white`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {getServiceIcon(selectedService)}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">{selectedService.title}</h3>
                    <p className="text-white/90 mt-2">{selectedService.description || getDescriptionText(selectedService.description)}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh]">
              {/* Learn More Content from Strapi */}
              <div className="mb-8">
                {selectedService.learn_more_content ? (
    <div className="text-gray-800">
      <style jsx>{`
        .strapi-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .strapi-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .strapi-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        .strapi-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .strapi-content strong {
          font-weight: 700;
          color: #1f2937;
        }
      `}</style>
      
      
                    <div className="prose prose-lg max-w-none">
        <SafeHTML content={selectedService.learn_more_content} />
        {/* Ya phir: */}
        {/* {renderStrapiContent(selectedService.learn_more_content)} */}
      </div>
    </div>
                ) : (
                  <><div className="text-center p-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No detailed content available yet.</p>
                      <p className="text-sm text-gray-400 mt-2">Please add content in Strapi CMS</p>
                    </div><>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Service Overview</h4>
                        <p className="text-gray-600 mb-6">
                          Detailed information about {selectedService.title}. We provide comprehensive solutions
                          tailored to your specific business needs with industry-best practices.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-bold text-gray-900 mb-2">What We Offer</h5>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Customized solutions for your business</li>
                              <li>• Latest technology stack</li>
                              <li>• Scalable architecture</li>
                              <li>• Ongoing maintenance & support</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-bold text-gray-900 mb-2">Benefits</h5>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Increased efficiency</li>
                              <li>• Better ROI</li>
                              <li>• Enhanced user experience</li>
                              <li>• Competitive advantage</li>
                            </ul>
                          </div>
                        </div>
                      </></>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {feature.icon}
                      </div>
                      <div>
                        <span className="text-gray-800 font-medium block">
                          {feature.text}
                        </span>
                        <span className="text-sm text-gray-500 mt-1">Included in all plans</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              

              {/* CTA */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h5 className="text-lg font-bold text-gray-900 mb-2">Ready to get started with {selectedService.title}?</h5>
                    <p className="text-gray-600">Contact us today for a free consultation and quote</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
  onClick={() => {
    closeModal();
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
>
  Get Free Quote
</button>
                    <button 
                      onClick={closeModal}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  // Only render modal on client side
  const renderModal = () => {
    if (!isClient || !isModalOpen) return null;
    return renderModalContent();
  };

  return (
    <>
      <section ref={containerRef} className="relative py-16 md:py-24 bg-white" id="services">
        {/* Background */}
        <div className="absolute inset-0 " />
        
        {/* Header */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold tracking-wider">
                {serviceData.badge_text || "OUR SERVICES"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {serviceData.section_title || "Our Services"}
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-xl text-white max-w-3xl mx-auto"
            >
              {serviceData.section_subtitle || ""}
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {serviceItems.map((item, index) => {
              const features = getServiceFeatures(item);
              
              return (
                <motion.div
                  key={item.id || index}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }
                  }}
                  className="group relative"
                >
                  <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    
                    {/* Data Source Indicator */}
                    {isClient && item?.features && item.features.length > 0 && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          ✓ Strapi Features
                        </span>
                      </div>
                    )}
                    
                    {/* Gradient Border */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradient(index)}`} />
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${getGradient(index)}`}
                      >
                        <div className="text-white">
                          {getServiceIcon(item)}
                        </div>
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Description - UPDATED */}
                      <div className="text-gray-600 leading-relaxed mb-6">
                        {item.description ? (
                          typeof item.description === 'string' ? (
                            <p>{item.description}</p>
                          ) : (
                            <p>{getDescriptionText(item.description)}</p>
                          )
                        ) : (
                          <p>No description available</p>
                        )}
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-2 mb-8">
                        {features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <div className="flex-shrink-0 p-1 bg-green-50 rounded">
                              {feature.icon}
                            </div>
                            <span className="text-gray-700 font-medium">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Button */}
                    <div className="px-8 pb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLearnMore(item, index)}
                        className={`w-full py-3 px-6 bg-gradient-to-r ${getGradient(index)} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        {item.learn_more_button_text || "Learn More"}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center border border-gray-200">
                    <span className="font-bold text-gray-800">0{index + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-block p-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl backdrop-blur-sm">
              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-200/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {serviceData.cta_title || "Need a Custom Solution?"}
                    </h3>
                    <p className="text-gray-600">
                      {serviceData.cta_description || "Let's discuss your specific requirements and create a tailored plan"}
                    </p>
                  </div>
                  <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={scrollToCTA}
  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
>
  <span className="flex items-center gap-3">
    {serviceData.cta_button_text || "Get Started"}
    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
  </span>
</motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal (client-side only) */}
      {renderModal()}
    </>
  );
}