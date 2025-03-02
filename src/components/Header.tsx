
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';
import { Link } from 'react-router-dom';
import { Hash, Layout, Download } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
      const sections = ['home', 'cv-form', 'cv-preview'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 py-4",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold">CV Generator</span>
          <span className="text-xs font-medium text-gray-500">by Khoirul Muhlisin</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('home')}
            className={activeSection === 'home' ? 'text-purple-600' : ''}
          >
            <Hash className="w-4 h-4 mr-1" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('cv-form')}
            className={activeSection === 'cv-form' ? 'text-purple-600' : ''}
          >
            <Layout className="w-4 h-4 mr-1" />
            Builder
          </Button>
          <Button 
            variant="premium" 
            size="sm"
            onClick={() => scrollToSection('cv-preview')}
          >
            <Download className="w-4 h-4 mr-1" />
            Get CV
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
