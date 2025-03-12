
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const textRef = useRef<HTMLHeadingElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 4;
  
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;
    
    const text = textElement.innerText;
    textElement.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.animationDelay = `${index * 0.05}s`;
      span.className = 'inline-block opacity-0 animate-fade-in';
      span.style.animationFillMode = 'forwards'; // Keep visible after animation
      textElement.appendChild(span);
    });
  }, []);
  
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  return (
    <section id="home" className="min-h-screen relative flex flex-col justify-center items-center pt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-accent-blue-900/20 via-transparent to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-dark-500/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-white/5 backdrop-blur-sm px-4 py-1 rounded-full text-sm tracking-wider text-white/70 mb-2 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            FULL STACK DEVELOPER
          </div>
          <h1 
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            John Developer
          </h1>
          <div className="h-1 w-24 bg-gradient-blue-purple rounded-full mt-6 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}></div>
        </div>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          I craft elegant solutions to complex problems through clean code and intuitive interfaces. Specializing in full-stack development with a passion for creating seamless user experiences.
        </p>
        
        {/* Developer Photos Gallery */}
        <div className="relative h-72 max-w-3xl mx-auto my-12 animate-fade-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          {/* Main image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-48 h-64 rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40">
            <div className="w-full h-full bg-dark-300 rounded-xl overflow-hidden shadow-xl border-4 border-dark-200">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop"
                alt="John Developer"
                className={`w-full h-full object-cover ${imagesLoaded >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                onLoad={handleImageLoad}
              />
              <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 1 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
            </div>
          </div>
          
          {/* Side images */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-20 w-44 h-56 -rotate-6 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40">
            <div className="w-full h-full bg-dark-300 rounded-xl overflow-hidden shadow-xl border-4 border-dark-200">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Coding Session"
                className={`w-full h-full object-cover ${imagesLoaded >= 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                onLoad={handleImageLoad}
              />
              <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 2 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 z-20 w-44 h-56 rotate-6 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40">
            <div className="w-full h-full bg-dark-300 rounded-xl overflow-hidden shadow-xl border-4 border-dark-200">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop"
                alt="Working on projects"
                className={`w-full h-full object-cover ${imagesLoaded >= 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                onLoad={handleImageLoad}
              />
              <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 3 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 z-10 w-40 h-52 rotate-12 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40">
            <div className="w-full h-full bg-dark-300 rounded-xl overflow-hidden shadow-xl border-4 border-dark-200">
              <img 
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1000&auto=format&fit=crop"
                alt="Developer setup"
                className={`w-full h-full object-cover ${imagesLoaded >= 4 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                onLoad={handleImageLoad}
              />
              <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 4 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 animate-fade-in opacity-0" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
          <a 
            href="#achievements" 
            className="px-8 py-3 bg-gradient-blue-purple rounded-full text-white font-medium transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-lg"
          >
            Explore Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 bg-dark-300 border border-white/10 rounded-full text-white/90 font-medium transition-transform hover:scale-[1.03] active:scale-[0.98] hover:bg-dark-200"
          >
            Get in Touch
          </a>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white/50"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
