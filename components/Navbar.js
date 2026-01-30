"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero-section");

  // Saare links Mobile ke liye
  const allLinks = [
    { name: "Home", id: "hero-section", icon: "🏠" },
    { name: "About", id: "about-agency", icon: "ℹ️" },
    { name: "Services", id: "core-services", icon: "⚙️" },
    { name: "Stats", id: "stats-counter", icon: "📊" },
    { name: "Portfolio", id: "portfolio-showcase", icon: "🎨" },
    { name: "Process", id: "work-process", icon: "🔄" },
    { name: "Team", id: "team-members", icon: "👥" },
    { name: "Reviews", id: "testimonials", icon: "⭐" },
    { name: "Pricing", id: "pricing-plans", icon: "💰" },
    { name: "FAQ", id: "faq", icon: "❓" },
    { name: "Contact", id: "cta-banner-call-to-action", icon: "📞" },
  ];

  // Desktop par sirf main links (Top 5)
  const desktopLinks = allLinks.filter(link => 
    ["hero-section", "about-agency", "core-services", "portfolio-showcase", "pricing-plans"].includes(link.id)
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const currentSection = allLinks.find(link => {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (currentSection) setActiveLink(currentSection.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveLink(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold transition-all duration-300">
            <span className={isScrolled ? "text-blue-600" : "text-white"}>AZEEM CODES</span>
            <span className="text-blue-500">.</span>
          </div>

          {/* Desktop Links (Filtered) */}
          <div className="hidden lg:flex items-center gap-1">
            {desktopLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeLink === link.id
                    ? isScrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/20"
                    : isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Toggle & CTA */}
          <div className="flex items-center gap-4">
             <button 
              onClick={() => scrollToSection('cta-banner-call-to-action')}
              className="hidden md:block px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
            >
              Contact Us
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${isScrolled ? "text-gray-700" : "text-white"}`}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (All Links) */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-500 overflow-y-auto ${
          isMobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}>
          <div className="p-4 grid grid-cols-2 gap-2">
            {allLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-left ${
                  activeLink === link.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium text-sm">{link.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* Spacer removed because Hero section is usually full screen */}
    </>
  );
}