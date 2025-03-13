import React, { useState, useRef, useEffect } from 'react';
import { Achievement } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';

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
  },
  {
    id: '5',
    title: 'Industry Recognition Award',
    description: 'Recognized by industry leaders for contributions to innovative technology solutions and community engagement.',
    image: 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?q=80&w=1000&auto=format&fit=crop',
    date: '2023-11-15',
  },
  {
    id: '6',
    title: 'Published Research Paper',
    description: 'Co-authored a research paper on advanced web technologies that was published in a prestigious technical journal.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    date: '2024-01-22',
  },
  {
    id: '7',
    title: 'Mentorship Program Leader',
    description: 'Led a mentorship program helping junior developers improve their skills and advance their careers in tech.',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop',
    date: '2024-03-10',
  },
  {
    id: '8',
    title: 'Technology Innovation Prize',
    description: 'Received an innovation prize for developing a novel approach to solving complex programming challenges.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
    date: '2024-05-05',
  }
];

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('portfolio-achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });
  
  const [newAchievement, setNewAchievement] = useState<{
    title: string;
    description: string;
    image: string | File;
    date: string;
  }>({
    title: '',
    description: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const correctPassword = "portfolio123";

  useEffect(() => {
    localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
  }, [achievements]);

  const handleNext = () => {
    const maxPage = Math.ceil(achievements.length / 4) - 1;
    setCurrentPage(prev => (prev < maxPage ? prev + 1 : 0));
  };

  const handlePrev = () => {
    const maxPage = Math.ceil(achievements.length / 4) - 1;
    setCurrentPage(prev => (prev > 0 ? prev - 1 : maxPage));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAchievement({ ...newAchievement, image: file });
    }
  };

  const handleAddAchievement = () => {
    if (!isAuthenticated) {
      setShowPasswordModal(true);
      return;
    }

    const id = Date.now().toString();

    if (newAchievement.image instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        const achievementWithImage = {
          ...newAchievement,
          id,
          image: imageDataUrl
        };

        setAchievements([...achievements, achievementWithImage]);
        resetForm();

        toast({
          title: "Achievement Added",
          description: "Your new achievement has been added successfully."
        });
      };
      reader.readAsDataURL(newAchievement.image);
    } else {
      setAchievements([...achievements, { ...newAchievement, id, image: newAchievement.image as string }]);
      resetForm();

      toast({
        title: "Achievement Added",
        description: "Your new achievement has been added successfully."
      });
    }
  };

  const handleDeleteAchievement = (id: string) => {
    if (!isAuthenticated) {
      setShowPasswordModal(true);
      setAchievementToDelete(id);
      return;
    }

    setAchievementToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAchievement = () => {
    if (achievementToDelete) {
      const updatedAchievements = achievements.filter(a => a.id !== achievementToDelete);
      setAchievements(updatedAchievements);
      setShowDeleteConfirm(false);
      setAchievementToDelete(null);

      const maxPage = Math.ceil(updatedAchievements.length / 4) - 1;
      if (currentPage > maxPage && maxPage >= 0) {
        setCurrentPage(maxPage);
      }

      toast({
        title: "Achievement Deleted",
        description: "The achievement has been removed successfully."
      });
    }
  };

  const resetForm = () => {
    setNewAchievement({
      title: '',
      description: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAchievement({ ...newAchievement, [name]: value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setShowPasswordModal(false);
      setPassword('');

      if (!isDialogOpen && !achievementToDelete) {
        setIsDialogOpen(true);
      } else if (achievementToDelete) {
        setShowDeleteConfirm(true);
      }
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const indexOfLastAchievement = (currentPage + 1) * 4;
  const indexOfFirstAchievement = indexOfLastAchievement - 4;
  const currentAchievements = achievements.slice(indexOfFirstAchievement, indexOfLastAchievement);
  const totalPages = Math.ceil(achievements.length / 4);

  return (
    <section id="achievements" className="section-container">
      <h2 className="section-title">Achievements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentAchievements.map((achievement) => (
          <div key={achievement.id} className="glass-card overflow-hidden rounded-xl transition-all hover:translate-y-[-5px] hover:shadow-lg group">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-sm opacity-100 transition-opacity duration-500" />
              <img 
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover transition-all duration-500 scale-105"
                onLoad={() => setIsImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/20 to-transparent"></div>
              
              <div className="absolute top-3 left-3 bg-gradient-blue-purple text-white px-3 py-1 rounded-full inline-block text-sm">
                {new Date(achievement.date).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'short'
                })}
              </div>
              
              {isAuthenticated && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAchievement(achievement.id);
                  }}
                  className="absolute top-3 right-3 bg-red-500/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete achievement"
                >
                  <Trash2 size={16} className="text-red-300" />
                </button>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 gradient-text line-clamp-1">{achievement.title}</h3>
              <p className="text-white/70 line-clamp-3">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mb-10">
        <button 
          onClick={handlePrev}
          className="bg-dark-300 hover:bg-dark-200 p-2 rounded-full transition-all shadow-lg"
          aria-label="Previous achievements"
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
        
        <div className="text-white/70">
          Page {currentPage + 1} of {totalPages}
        </div>
        
        <button 
          onClick={handleNext}
          className="bg-dark-300 hover:bg-dark-200 p-2 rounded-full transition-all shadow-lg"
          aria-label="Next achievements"
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
      
      <div className="flex justify-center">
        <button 
          onClick={() => {
            if (isAuthenticated) {
              setIsDialogOpen(true);
            } else {
              setShowPasswordModal(true);
            }
          }}
          className="flex items-center gap-2 bg-dark-300 border border-white/10 px-6 py-3 rounded-lg hover:bg-dark-200 transition-all shadow-lg"
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

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter admin password to add or edit content.
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
                onClick={() => setShowPasswordModal(false)}
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
              <label htmlFor="image" className="text-sm font-medium">Upload Image</label>
              <div className="flex flex-col gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-dark-400 hover:bg-dark-200 text-white border border-white/10"
                >
                  Choose Image
                </Button>
                
                {newAchievement.image instanceof File && (
                  <div className="mt-2 p-2 bg-dark-400/50 rounded flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    <span className="text-sm truncate">{newAchievement.image.name}</span>
                  </div>
                )}
                
                {typeof newAchievement.image === 'string' && newAchievement.image && (
                  <div className="mt-2 aspect-video bg-dark-400/50 rounded overflow-hidden">
                    <img 
                      src={newAchievement.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
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

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete Achievement</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete this achievement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteConfirm(false);
                setAchievementToDelete(null);
              }}
              className="bg-transparent border-white/10 hover:bg-dark-200 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteAchievement}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Achievements;

