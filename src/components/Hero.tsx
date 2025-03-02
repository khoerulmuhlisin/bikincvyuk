
import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center pt-16 section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <div className="inline-flex px-4 py-1.5 bg-black/5 rounded-full text-sm font-medium animate-fade-in">
            <span className="text-gray-700">Create professional CVs in minutes ✨</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight animate-fade-in animate-delay-100 text-balance">
            Craft Your Professional Identity
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animate-delay-200 text-balance">
            Build a standout CV that captures your unique skills and experience with our intuitive, design-focused CV generator.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in animate-delay-300">
            <Button 
              variant="premium" 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={() => document.getElementById('cv-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Create Your CV 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Templates
            </Button>
          </div>
          
          <div className="w-full max-w-4xl h-[350px] md:h-[450px] mt-16 rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 shadow-sm border border-gray-200 overflow-hidden animate-scale-in animate-delay-500">
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="w-full max-w-lg h-full bg-white rounded-xl shadow-lg border border-gray-100 animate-pulse-slow">
                {/* CV Preview Placeholder */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
