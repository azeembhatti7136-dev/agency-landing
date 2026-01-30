"use client";

import { motion } from "framer-motion";
import React from "react"; // ✅ Import React
import { useId } from "react";
import Hero from "./sections/Hero";
import Logos from "./sections/Logos";
import About from "./sections/About";
import Services from "./sections/Services";
import Stats from "./sections/Stats";
import Portfolio from "./sections/Portfolio";
import Team from "./sections/Team";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import VideoIntro from "./sections/VideoIntro";
import WorkProcess from "./sections/WorkProcess";
import WhyChooseUs from "./sections/WhyChooseUs";
import Footer from "./sections/Footer";

const sectionMap = {
  "sections.hero-section": Hero,
  "sections.client-logos": Logos,
  "sections.about-agency": About,
  "sections.core-services": Services,
  "sections.stats-counter": Stats,
  "sections.video-intro": VideoIntro,
  "sections.portfolio-showcase": Portfolio,
  "sections.work-process": WorkProcess,
  "sections.why-choose-us": WhyChooseUs,
  "sections.team-members": Team,
  "sections.testimonials": Testimonials,
  "sections.pricing-plans": Pricing,
  "sections.faq": FAQ,
  "sections.cta-banner-call-to-action": CTA,
  "sections.newsletter-and-contact-info": Footer,
};

// Debug helper function - FIXED: Remove React.isValidElement check
const logSectionData = (section) => {
  if (section?.__component === 'sections.work-process') {

    
    
    
   
    
  }
};

export default function SectionRenderer({ section }) {
  const uniqueId = useId();
  // Debug log - only on client
  if (typeof window !== 'undefined') {
    logSectionData(section);
  }

  // Check if section is valid
  if (!section || typeof section !== 'object') {

    return null;
  }

  const Component = sectionMap[section.__component];
  
  if (!Component) {
   
    return null;
  }

  // Clean section data - SIMPLIFIED VERSION
  const cleanSectionData = { ...section };
  
  // Simple cleanup: Convert any non-serializable data
  Object.keys(cleanSectionData).forEach(key => {
    const value = cleanSectionData[key];
    
    // If value is object but not array or null
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      try {
        // Try to stringify to check if it's serializable
        JSON.stringify(value);
      } catch (error) {
      
        // Replace with string representation
        cleanSectionData[key] = String(value);
      }
    }
  });

  // ID for the section
  const sectionId = section.__component?.replace("sections.", "");

  return (
    <motion.div
      id={sectionId} // Random generation ki jagah fixed dynamic ID
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Component data={section} />
    </motion.div>
  );
}