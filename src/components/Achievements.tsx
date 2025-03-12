
import React, { useState, useRef } from 'react';
import { Achievement } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Best Web App Award',
    description: 'Received recognition for developing an innovative web application that solved real-world problems at the annual developer conference.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1000&auto=format&fit=crop',
    date: '2022-05-15',
  },
  {
    id: '2',
    title: 'Open Source Contribution',
    description: 'Made significant contributions to a popular open-source project, implementing new features and fixing critical bugs.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1000&auto=format&fit=crop',
    date: '2022-08-22',
  },
  {
    id: '3',
    title: 'Hackathon Winner',
    description: 'Led a team to victory in a 48-hour hackathon, building a solution for environmental sustainability.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop',
    date: '2023-01-10',
  },
  {
    id: '4',
    title: 'Tech Conference Speaker',
    description: 'Invited to speak at a major tech conference about modern web development practices and emerging technologies.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    date: '2023-09-05',
  }
];

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // New achievement form state
  const [newAchievement, setNewAchievement] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleNext = () => {
    setIsImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };
  
  const handlePrev = () => {
    setIsImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length);
  };
  
  const handleAddAchievement = () => {
    const id = Date.now().toString();
    setAchievements([...achievements, { ...newAchievement, id }]);
    setNewAchievement({
      title: '',
      description: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAchievement({ ...newAchievement, [name]: value });
  };
  
  const currentAchievement = achievements[currentIndex];
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  return (
    <section id="achievements" className="section-container">
      <h2 className="section-title">Achievements</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
          <div className={`absolute inset-0 bg-dark-400 ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}></div>
          <img 
            ref={imageRef}
            src={currentAchievement.image}
            alt={currentAchievement.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-dark-500/90 to-transparent"></div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="bg-gradient-blue-purple text-white px-3 py-1 rounded-full inline-block text-sm mb-2">
              {new Date(currentAchievement.date).toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'short'
              })}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">{currentAchievement.title}</h3>
            <p className="text-white/70 leading-relaxed">{currentAchievement.description}</p>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              {achievements.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gradient-blue-purple w-8' : 'bg-white/20'}`}
                  aria-label={`Go to achievement ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={handlePrev}
                className="bg-dark-300 hover:bg-dark-200 p-2 rounded-full transition-all"
                aria-label="Previous achievement"
              >
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
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="bg-dark-300 hover:bg-dark-200 p-2 rounded-full transition-all"
                aria-label="Next achievement"
              >
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
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-dark-300 border border-white/10 px-6 py-3 rounded-lg hover:bg-dark-200 transition-all"
        >
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
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add New Achievement
        </button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add New Achievement</DialogTitle>
            <DialogDescription className="text-white/70">
              Share your latest accomplishment with the world.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title"
                name="title"
                placeholder="Achievement title"
                value={newAchievement.title}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Describe your achievement"
                value={newAchievement.description}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10 min-h-24"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input 
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={newAchievement.image}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input 
                id="date"
                name="date"
                type="date"
                value={newAchievement.date}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="bg-transparent border-white/10 hover:bg-dark-200 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddAchievement}
              className="bg-gradient-blue-purple hover:opacity-90 text-white"
              disabled={!newAchievement.title || !newAchievement.description || !newAchievement.image}
            >
              Add Achievement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Achievements;
