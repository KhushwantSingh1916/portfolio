
import React, { useEffect } from 'react';
import ThreeScene from '@/components/ThreeScene';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Achievements from '@/components/Achievements';
import SkillsGraph from '@/components/SkillsGraph';
import GitHubRepos from '@/components/GitHubRepos';
import HackathonStats from '@/components/HackathonStats';
import Contact from '@/components/Contact';

const Index = () => {
  // Lazy load the ThreeJS component for better performance
  useEffect(() => {
    const loadThreeJS = async () => {
      try {
        // Using dynamic import for Three.js
        await import('three');
        console.log('Three.js loaded successfully');
      } catch (error) {
        console.error('Failed to load Three.js:', error);
      }
    };
    
    loadThreeJS();
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 3D Background */}
      <ThreeScene />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Achievements Section */}
        <Achievements />
        
        {/* Skills Graph Section */}
        <SkillsGraph />
        
        {/* GitHub Repositories Section */}
        <GitHubRepos />
        
        {/* Hackathon Stats Section */}
        <HackathonStats />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-500/80 backdrop-blur-sm py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} John Developer. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
