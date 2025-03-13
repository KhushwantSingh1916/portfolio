import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const textRef = useRef<HTMLHeadingElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 3; // Three photos only
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Images state with localStorage persistence
  const [heroImages, setHeroImages] = useState<string[]>(() => {
    const savedImages = localStorage.getItem('hero-images');
    return savedImages ? JSON.parse(savedImages) : [
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop"
    ];
  });
  
  // For a real app, this would be stored securely
  const correctPassword = "portfolio123";
  
  useEffect(() => {
    localStorage.setItem('hero-images', JSON.stringify(heroImages));
  }, [heroImages]);
  
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;
    
    const text = "John Developer";
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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setShowPasswordModal(false);
      setPassword('');
      
      // If we were trying to open the image upload, open it now
      if (selectedImageIndex !== null) {
        setShowImageUploadDialog(true);
      }
    } else {
      setPasswordError('Incorrect password');
    }
  };
  
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    if (!isAuthenticated) {
      setShowPasswordModal(true);
    } else {
      setShowImageUploadDialog(true);
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedImageIndex !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        const newImages = [...heroImages];
        newImages[selectedImageIndex] = imageDataUrl;
        setHeroImages(newImages);
        setShowImageUploadDialog(false);
        
        toast({
          title: "Image Updated",
          description: "Your profile image has been updated successfully."
        });
      };
      reader.readAsDataURL(file);
    }
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text"
          ></h1>
          <div className="h-1 w-24 bg-gradient-blue-purple rounded-full mt-6 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}></div>
        </div>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          I craft elegant solutions to complex problems through clean code and intuitive interfaces. Specializing in full-stack development with a passion for creating seamless user experiences.
        </p>
        
        {/* Improved Developer Photos Gallery - Three photos */}
        <div className="relative h-80 max-w-3xl mx-auto my-12 animate-fade-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <div className="perspective-1000 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex justify-center items-center">
              {/* Main image - centered and larger */}
              <div 
                className="absolute z-30 w-52 h-64 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => handleImageClick(0)}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <img 
                    src={heroImages[0]}
                    alt="Developer"
                    className={`w-full h-full object-cover ${imagesLoaded >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                    onLoad={handleImageLoad}
                  />
                  <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 1 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"></path>
                      <polyline points="10 12 15 12"></polyline>
                      <path d="M15 9l3 3-3 3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Left image */}
              <div 
                className="absolute left-10 z-20 w-40 h-48 -rotate-12 transition-all duration-500 hover:rotate-0 hover:z-40 hover:scale-110 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => handleImageClick(1)}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl overflow-hidden shadow-xl border-2 border-white/10">
                  <img 
                    src={heroImages[1]}
                    alt="Developer"
                    className={`w-full h-full object-cover ${imagesLoaded >= 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                    onLoad={handleImageLoad}
                  />
                  <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 2 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"></path>
                      <polyline points="10 12 15 12"></polyline>
                      <path d="M15 9l3 3-3 3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Right image */}
              <div 
                className="absolute right-10 z-20 w-40 h-48 rotate-12 transition-all duration-500 hover:rotate-0 hover:z-40 hover:scale-110 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => handleImageClick(2)}
              >
                <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-indigo-500/20 rounded-xl overflow-hidden shadow-xl border-2 border-white/10">
                  <img 
                    src={heroImages[2]}
                    alt="Developer"
                    className={`w-full h-full object-cover ${imagesLoaded >= 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                    onLoad={handleImageLoad}
                  />
                  <div className={`absolute inset-0 bg-dark-400 ${imagesLoaded >= 3 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"></path>
                      <polyline points="10 12 15 12"></polyline>
                      <path d="M15 9l3 3-3 3"></path>
                    </svg>
                  </div>
                </div>
              </div>
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
      </div>

      {/* Password Authentication Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter admin password to change profile images.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
              <Input 
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-dark-400 border-white/10"
                placeholder="Enter admin password"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowPasswordModal(false);
                  setSelectedImageIndex(null);
                }}
                className="bg-transparent border-white/10 hover:bg-dark-200 text-white"
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-blue-purple hover:opacity-90 text-white"
              >
                Login
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image Upload Dialog */}
      <Dialog open={showImageUploadDialog} onOpenChange={(open) => {
        setShowImageUploadDialog(open);
        if (!open) setSelectedImageIndex(null);
      }}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Update Profile Image</DialogTitle>
            <DialogDescription className="text-white/70">
              Upload a new image for your portfolio.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="image-upload" className="flex flex-col items-center gap-2 p-8 border-2 border-dashed border-white/20 rounded-lg hover:border-white/30 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" x2="22" y1="5" y2="5"></line>
                  <line x1="19" x2="19" y1="2" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <span className="text-sm text-white/70">Click to upload an image or drag and drop</span>
                <input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowImageUploadDialog(false);
                setSelectedImageIndex(null);
              }}
              className="bg-transparent border-white/10 hover:bg-dark-200 text-white"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
