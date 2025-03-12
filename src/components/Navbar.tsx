
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        scrolled ? "py-3 bg-dark-500/80 backdrop-blur-md shadow-md" : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text">Portfolio</a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Achievements", "Skills", "Projects", "Hackathons", "Contact"].map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-blue-purple after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>
        
        <a 
          href="#contact" 
          className="hidden md:flex neo-button"
        >
          Contact
        </a>
        
        <button 
          className="md:hidden text-white/70 hover:text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed top-[60px] left-0 right-0 bg-dark-500/95 backdrop-blur-md transition-transform duration-300 ease-in-out transform z-50",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="p-6 flex flex-col space-y-4">
          {["Home", "Achievements", "Skills", "Projects", "Hackathons", "Contact"].map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-white py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="neo-button mt-4 w-full text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
