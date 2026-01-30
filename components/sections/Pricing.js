"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Zap, 
  Sparkles,
  Rocket,
  Award,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Gift
} from "lucide-react";

// Icon mapping helper
const iconMap = {
  CheckCircle, XCircle, Star, Zap, Sparkles, Rocket, Award, ChevronRight, 
  ShieldCheck, HelpCircle, ArrowRight, Gift
};

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
  card: {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      y: -12,
      scale: 1.03,
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
  pulse: {
    visible: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Helper functions
const getFallbackData = () => {
  return {
    page_settings: {
      title: "PRICING PLANS",
      subtitle: "Choose Your Plan",
      description: "Flexible pricing for teams of all sizes.",
      yearly_discount: 20,
      money_back_days: 30,
      trial_days: 14,
      cta_title: "Ready to Get Started?",
      cta_description: "Join thousands of teams..."
    },
    plans: [
      {
        id: 1,
        plan_name: "Basic",
        price: "$999",
        description: "Perfect for small teams",
        features: [
          "Up to 5 users",
          "10 GB storage",
          "Basic support",
          "Community forum access"
        ],
        is_popular: false,
        button_text: "Choose Basic",
        icon: "Star"
      },
      {
        id: 2,
        plan_name: "Pro",
        price: "$2499",
        description: "Best for growing businesses",
        features: [
          "Up to 50 users",
          "100 GB storage",
          "Priority support",
          "Advanced analytics",
          "Custom branding",
          "API access"
        ],
        is_popular: true,
        button_text: "Choose Pro",
        icon: "Rocket"
      }
    ],
    comparison_features: [],
    faqs: [],
    payment_methods: []
  };
};

// Safe feature parsing function - Strapi compatible
const parseFeatures = (featuresInput) => {
  
  

   if (!featuresInput) return [];
  
  // Agar array hai
   if (Array.isArray(featuresInput)) {
    const parsed = [];
    
    // Strapi dynamic zone ya components ke liye
    featuresInput.forEach((item) => {
      // ✅ STRAPI RICH TEXT SUPPORT
      if (item?.type === 'paragraph' && Array.isArray(item.children)) {
        const text = item.children
          .map(child => child.text)
          .join('')
          .trim();

        if (text) parsed.push(text);
      }

      // Normal string
      else if (typeof item === 'string') {
        parsed.push(item.trim());
      }

      // Generic object fallback
      else if (item && typeof item === 'object') {
        const text =
        item.features ||
          item.text ||
          item.feature ||
          item.name ||
          item.title ||
          item.description ||
          item.value;

        if (typeof text === 'string' && text.trim()) {
          parsed.push(text.trim());
        }
      }
    });

    return parsed.length > 0 ? parsed : [];
  }
  
  // Agar string hai
   if (typeof featuresInput === 'string') {
    return featuresInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);
  }

  return [];
};

// FeatureItem Component
const FeatureItem = ({ feature }) => {
  
  const [isHovered, setIsHovered] = useState(false);
  
  // Safely get feature text
  const getFeatureText = () => {
    if (!feature) return "Feature";
    
    if (typeof feature === 'string') {
      return feature;
    }
    
    if (feature && typeof feature === 'object') {
      return feature.text || feature.feature || feature.name || feature.title || 
             feature.description || feature.value || feature.content || "Feature";
    }
    
    return String(feature);
  };
  
  const featureText =
  typeof feature === "string"
    ? feature
    : feature?.features || feature?.text || feature?.title || feature?.name || "Feature";
  const isIncluded = feature.included !== false;
  
  return (
    <motion.div
      whileHover={{ x: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-start gap-3 py-3 ${isIncluded ? 'opacity-100' : 'opacity-50'}`}
    >
      <motion.div
        animate={{ 
          rotate: isHovered ? [0, 10, -10, 0] : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {isIncluded ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-300" />
        )}
      </motion.div>
      <span className={`text-sm ${isIncluded ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
        {featureText}
      </span>
    </motion.div>
  );
};

// Pricing Plan Card Component
const PlanCard = ({ plan, billingCycle, yearly_discount, index, selectedPlan, onSelect, globalSettings }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [features, setFeatures] = useState([]);
  const [defaultFeatures, setDefaultFeatures] = useState([]);





  
  // Color schemes for different plans
  const planColors = [
    { primary: "from-blue-500 to-cyan-500", accent: "border-blue-500" },
    { primary: "from-purple-500 to-pink-500", accent: "border-purple-500" },
    { primary: "from-green-500 to-emerald-500", accent: "border-green-500" }
  ];
  
  const colors = planColors[index % planColors.length];
  
  // Set default features based on plan type
  useEffect(() => {
    if (plan.plan_name?.toLowerCase().includes('basic')) {
      setDefaultFeatures([
        "Up to 5 users",
        "10 GB storage",
        "Basic support",
        "Email assistance",
        "Community forum access"
      ]);
    } else if (plan.plan_name?.toLowerCase().includes('pro')) {
      setDefaultFeatures([
        "Up to 50 users",
        "100 GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "24/7 phone support",
        "Custom integrations"
      ]);
    } else {
      setDefaultFeatures([
        "Up to 5 users",
        "10 GB storage",
        "Basic support",
        "Email assistance"
      ]);
    }
  }, [plan.plan_name]);
  
  // Parse features
  
  
  const getPlanIcon = () => {
    const IconComponent = plan.is_popular ? Rocket : Star;
    return <IconComponent className="w-8 h-8" />;
  };
  
  const isPopular = plan.is_popular;
  
  // Format price
 const formatPrice = () => {
    // Ab billingCycle yahan accessible hoga
    const isYearly = billingCycle === 'yearly';
    let price = parseFloat(plan.price?.replace(/[^\d.]/g, '') || 0);

    if (isYearly) {
      // Example: 20% discount on yearly
      price = (price * 12 * 0.8) / 12; 
    }

    return {
      amount: `$${Math.round(price)}`,
      period: isYearly ? "/mo (billed yearly)" : "/mo"
    };
  

  // Price se $ aur extra text hata kar number nikalna
  let basePrice = parseFloat(plan.price.replace(/[^\d.]/g, ''));
  let displayPrice = basePrice;

  if (billingCycle === 'yearly') {
    // Yearly calculation: (Monthly Price * 12) - Discount
    const discountFactor = (100 - (globalSettings.yearly_discount || 20)) / 100;
    displayPrice = (basePrice * 12 * discountFactor) / 12; // Per month equivalent dikhane ke liye
    
    // Agar aap total yearly price dikhana chahte hain toh:
    // displayPrice = basePrice * 12 * discountFactor;
  }

  return {
    amount: `$${Math.round(displayPrice)}`,
    period: billingCycle === 'yearly' ? "/mo (billed yearly)" : "/month"
  };
};
  const handleChoice = () => {
    // Option A: Specific section par scroll karwana
    const contactSection = document.getElementById('cta-banner-call-to-action');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Option B: Sirf console check ke liye
    console.log(`Selected Plan: ${plan.plan_name} during ${billingCycle} cycle`);
  };

  
  const priceData = formatPrice();
  
  // Get plan description
  const getPlanDescription = () => {
    if (plan.description) return plan.description;
    
    if (plan.plan_name?.toLowerCase().includes('basic')) {
      return "Perfect for small teams and startups";
    } else if (plan.plan_name?.toLowerCase().includes('pro')) {
      return "Best for growing businesses";
    }
    
    return "Complete solution for your team";
  };
  
  // Display features - agar parsed features empty hain toh default use karein
  const displayFeatures = Array.isArray(plan.features) 
  ? plan.features 
  : defaultFeatures;
  
  return (
    <motion.div
      variants={VARIANTS.card}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(index)}
      className={`relative cursor-pointer transition-all duration-300 ${isPopular ? 'z-10' : 'z-0'}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          initial={{ scale: 0, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="relative">
            <div className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 
              text-white font-bold rounded-full shadow-lg flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">MOST POPULAR</span>
              <Star className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 
              bg-gradient-to-r from-yellow-500 to-orange-500 rotate-45"
            />
          </div>
        </motion.div>
      )}
      
      {/* Card */}
      <div className={`relative bg-white rounded-3xl border-2 overflow-hidden
        ${isPopular ? 'border-blue-500 shadow-2xl' : 'border-gray-200 shadow-xl'} 
        hover:shadow-2xl transition-all duration-500 h-full`}
      >
        {/* Header */}
        <div className="p-8">
          {/* Plan icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className={`w-16 h-16 bg-gradient-to-br ${colors.primary} rounded-2xl 
              flex items-center justify-center mb-6 mx-auto`}
          >
            <div className="text-white">
              {getPlanIcon()}
            </div>
          </motion.div>
          
          {/* Plan name */}
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {plan.plan_name || `Plan ${index + 1}`}
          </h3>
          
          {/* Price */}
         <div className="flex flex-col items-center mb-2">
  <div className="flex items-end justify-center gap-1">
    <span className="text-5xl font-black text-gray-900 transition-all duration-300">
      {priceData.amount}
    </span>
    <span className="text-gray-600 text-lg mb-1">{priceData.period}</span>
  </div>
  
  {billingCycle === 'yearly' && (
    <motion.span 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-green-600 text-sm font-bold mt-1"
    >
      Save {yearly_discount}% with annual billing!
    </motion.span>
  )}
</div>
          
          {/* Description */}
          <p className="text-gray-600 text-center mb-8">
            {getPlanDescription()}
          </p>
        </div>
        
        {/* Features list */}
        <div className="px-8 pb-8">
          <div className="space-y-1">
            {displayFeatures.slice(0, 6).map((feature, i) => (
              <FeatureItem key={i} feature={feature} />
            ))}
          </div>
          
          {/* Show more indicator */}
          {displayFeatures.length > 6 && (
            <div className="text-center mt-4">
              <span className="text-blue-500 text-sm font-medium">
                +{displayFeatures.length - 6} more features
              </span>
            </div>
          )}
        </div>
        
        {/* CTA Button */}
        <div className="px-8 pb-8">
          <motion.button
          onClick={handleChoice}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-4 rounded-xl font-bold text-lg relative overflow-hidden
              ${isPopular 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              {plan.button_text || plan.cta_button_text || 'Choose Plan'}
              <ChevronRight className="w-5 h-5" />
            </span>
            
            {/* Button shine effect */}
            <motion.div
              animate={{ 
                x: isHovered ? '100%' : '-100%',
                opacity: isHovered ? 0.8 : 0
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.button>
          
          {/* Money back guarantee */}
          {globalSettings?.money_back_days && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                <span>{globalSettings.money_back_days}-day money-back guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// FAQ Component
// Optimized FAQ Component
const FAQSection = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0) return null;

  // Display order ke hisaab se sort karein
  const sortedFaqs = [...faqs].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {sortedFaqs.map((faq, index) => (
        <motion.div
          key={faq.id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );




  // Default FAQs
  const defaultFaqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial on all plans."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and PayPal."
    }
  ];
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {defaultFaqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 + index * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Pricing Component
export default function Pricing({ data }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [billingCycle, setBillingCycle] = useState('monthly');
  
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
  // Process incoming data
  const processData = (rawData) => {
  if (!rawData) return getFallbackData();

  return {
    title: rawData.title || "PRICING PLANS",
    subtitle: rawData.subtitle || "Choose Your Plan",
    description: rawData.description || "",
    yearly_discount: rawData.yearly_discount || 20,
    money_back_days: rawData.money_back_days || 30,
    trial_days: rawData.trial_days || 14,
    cta_title: rawData.cta_title || "",
    cta_description: rawData.cta_description || "",
    
    // Check karein 'faq' null na ho
    plans: rawData.plans || [],
    faqs: rawData.faq || [] 
  };




  

  try {
    const isStrapiStructure = rawData.data || rawData.attributes;

    if (isStrapiStructure) {
      const strapiData = rawData.data || rawData;
      const attributes = strapiData.attributes || strapiData;

      return {
        title: attributes.title || "PRICING PLANS",
        subtitle: attributes.subtitle || "Choose Your Plan",
        description: attributes.description || "",
        yearly_discount: attributes.yearly_discount || 20,
        money_back_days: attributes.money_back_days || 30,
        trial_days: attributes.trial_days || 14,
        cta_title: attributes.cta_title || "",
        cta_description: attributes.cta_description || "",
        plans: attributes.plans || [],
        faqs: attributes.faq?.data || attributes.faq || []
      };
    }

    return {
      title: rawData.title || "",
      subtitle: rawData.subtitle || "",
      description: rawData.description || "",
      yearly_discount: rawData.yearly_discount || 20,
      money_back_days: rawData.money_back_days || 30,
      trial_days: rawData.trial_days || 14,
      cta_title: rawData.cta_title || "",
      cta_description: rawData.cta_description || "",
      plans: rawData.plans || [],
      faqs: rawData.faq || []
    };

  } catch (err) {
    console.error("❌ processData error:", err);
    return getFallbackData();
  }

    
   
    
    try {
      // Strapi se aane wale data ke liye
      const isStrapiStructure = rawData.data || rawData.attributes;
      
      if (isStrapiStructure) {
        // Strapi v4 structure
        const strapiData = rawData.data || rawData;
        const attributes = strapiData.attributes || strapiData;
        
        return {
          title: attributes.title || "PRICING PLANS",
          subtitle: attributes.subtitle || "Choose Your Plan",
          description: attributes.description || "Flexible pricing for teams of all sizes.",
          yearly_discount: attributes.yearly_discount || 20,
          money_back_days: attributes.money_back_days || 30,
          trial_days: attributes.trial_days || 14,
          cta_title: attributes.cta_title || "Ready to Get Started?",
          cta_description: attributes.cta_description || "Join thousands of teams...",
          plans: attributes.plans?.data || attributes.plans || getFallbackData().plans,
          faqs: attributes.faq || []

        };
      }
      
      // Flat structure (direct data)
      return {
  title: rawData.title || "PRICING PLANS",
  subtitle: rawData.subtitle || "Choose Your Plan",
  description: rawData.description || "",
  yearly_discount: rawData.yearly_discount || 20,
  money_back_days: rawData.money_back_days || 30,
  trial_days: rawData.trial_days || 14,
  cta_title: rawData.cta_title || "",
  cta_description: rawData.cta_description || "",
  plans: rawData.plans || [],
  faqs: rawData.faq || []   // ✅ FIX
};
      
    } catch (error) {
     
      return getFallbackData();
    }
  };
  
  // Get display data
  const displayData = processData(data);
  const { 
    title, 
    subtitle, 
    description, 
    yearly_discount, 
    money_back_days, 
    trial_days, 
    cta_title, 
    cta_description,
    plans,
    faqs
  } = displayData;
  
  // Log plans data for debugging
// Main Pricing Component ke upar ya useEffect mein

  
  // Initialize animation
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Toggle billing cycle
  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
        />
      </div>
      
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 
              rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold tracking-wide">
              {title}
            </span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent">
              {subtitle}
            </span>
          </h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>
          
          {/* Billing cycle toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-4 bg-white p-2 rounded-2xl shadow-lg border border-gray-200 mb-12"
          >
            <button 
              className={`px-4 py-2 rounded-xl font-medium cursor-pointer transition-all
                ${billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            
            {/* Toggle switch */}
            <div 
              className="relative w-16 h-8 bg-gray-200 rounded-full cursor-pointer"
              onClick={toggleBillingCycle}
            >
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <span className="text-xs">💰</span>
                <span className="text-xs">🎁</span>
              </div>
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ x: billingCycle === 'yearly' ? 'calc(100% - 8px)' : '4px' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
            
            <button 
              className={`px-4 py-2 rounded-xl font-medium cursor-pointer transition-all
                ${billingCycle === 'yearly' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full ml-2">
                Save {yearly_discount}%
              </span>
            </button>
          </motion.div>
        </motion.div>
        
        {/* Pricing Cards */}
        <motion.div
          variants={VARIANTS.container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto"
        >
          {plans && Array.isArray(plans) ? (
            plans.map((plan, index) => {
              // Strapi data structure handle karein
              const planData = plan.attributes || plan;
              
              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  selectedPlan={selectedPlan}
                  onSelect={setSelectedPlan}
                  globalSettings={{ yearly_discount, money_back_days }}
                  billingCycle={billingCycle}
                  yearly_discount={yearly_discount} // Yeh line add karein
                />
              );
            })
          ) : (
            // Fallback agar plans nahi hain
            getFallbackData().plans.map((plan, index) => (
              <PlanCard
                key={plan.id || index}
                plan={plan}
                index={index}
                selectedPlan={selectedPlan}
                onSelect={setSelectedPlan}
                globalSettings={{ money_back_days }}
              />
            ))
          )}
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our pricing and plans
            </p>
          </div>
          
          <FAQSection faqs={faqs} />
        </motion.div>
        
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <motion.div
              variants={VARIANTS.pulse}
              animate="visible"
              className="inline-block mb-6"
            >
              <Gift className="w-12 h-12" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {cta_title}
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {cta_description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                 onClick={() => {
    
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Free Trial ({trial_days} days)
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                 onClick={() => {
    
    setTimeout(() => {
      scrollToCTA();
    }, 300); // Modal close hone ke baad
  }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  Schedule a Demo
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}