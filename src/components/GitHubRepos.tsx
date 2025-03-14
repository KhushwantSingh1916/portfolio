
import React, { useState } from 'react';
import { Repository, Year } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Trash2, Plus } from 'lucide-react';

const initialRepos: Repository[] = [
  // 1st Year
  {
    id: '1',
    name: 'personal-website',
    description: 'My first personal website built with HTML and CSS',
    url: 'https://github.com/username/personal-website',
    year: 1,
    language: 'HTML/CSS'
  },
  {
    id: '2',
    name: 'todo-app',
    description: 'A simple to-do application built with vanilla JavaScript',
    url: 'https://github.com/username/todo-app',
    year: 1,
    language: 'JavaScript'
  },
  
  // 2nd Year
  {
    id: '3',
    name: 'weather-app',
    description: 'Weather application using public APIs and React',
    url: 'https://github.com/username/weather-app',
    year: 2,
    language: 'React'
  },
  {
    id: '4',
    name: 'algorithm-challenges',
    description: 'Collection of algorithm challenges and solutions',
    url: 'https://github.com/username/algorithm-challenges',
    year: 2,
    language: 'Python'
  },
  
  // 3rd Year
  {
    id: '5',
    name: 'e-commerce-platform',
    description: 'Full-stack e-commerce platform with React and Node.js',
    url: 'https://github.com/username/e-commerce-platform',
    year: 3,
    language: 'MERN Stack'
  },
  {
    id: '6',
    name: 'chat-application',
    description: 'Real-time chat application with WebSockets',
    url: 'https://github.com/username/chat-application',
    year: 3,
    language: 'Node.js'
  },
  
  // 4th Year
  {
    id: '7',
    name: 'ai-image-generator',
    description: 'AI-powered image generation tool using machine learning',
    url: 'https://github.com/username/ai-image-generator',
    year: 4,
    language: 'Python/TensorFlow'
  },
  {
    id: '8',
    name: 'blockchain-explorer',
    description: 'Blockchain explorer for visualizing transactions and smart contracts',
    url: 'https://github.com/username/blockchain-explorer',
    year: 4,
    language: 'TypeScript'
  }
];

const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>(() => {
    const saved = localStorage.getItem('github-repos');
    return saved ? JSON.parse(saved) : initialRepos;
  });
  const [activeYear, setActiveYear] = useState<Year>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // New repo form state
  const [newRepo, setNewRepo] = useState<Omit<Repository, 'id'>>({
    name: '',
    description: '',
    url: '',
    year: 1,
    language: ''
  });
  
  const correctPassword = "portfolio123";
  
  React.useEffect(() => {
    localStorage.setItem('github-repos', JSON.stringify(repos));
  }, [repos]);
  
  const filteredRepos = repos.filter(repo => repo.year === activeYear);
  
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'Python': '#3776AB',
      'HTML/CSS': '#E34F26',
      'React': '#61DAFB',
      'Node.js': '#339933',
      'MERN Stack': '#00D8FF',
      'Python/TensorFlow': '#FF6F00'
    };
    
    return colors[language] || '#3384FF';
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRepo({ ...newRepo, [name]: value });
  };
  
  const handleYearChange = (value: string) => {
    setNewRepo({ ...newRepo, year: parseInt(value) as Year });
  };
  
  const handleAddRepo = () => {
    const id = Date.now().toString();
    const updatedRepos = [...repos, { ...newRepo, id }];
    setRepos(updatedRepos);
    setIsDialogOpen(false);
    
    // Reset form
    setNewRepo({
      name: '',
      description: '',
      url: '',
      year: 1,
      language: ''
    });
    
    toast({
      title: "Repository Added",
      description: "Your GitHub repository has been added successfully."
    });
  };
  
  const handleDeleteRepo = (id: string) => {
    if (!isAuthenticated) {
      setRepoToDelete(id);
      setShowPasswordModal(true);
      return;
    }
    
    setRepoToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteRepo = () => {
    if (repoToDelete) {
      const updatedRepos = repos.filter(repo => repo.id !== repoToDelete);
      setRepos(updatedRepos);
      setShowDeleteConfirm(false);
      setRepoToDelete(null);
      
      toast({
        title: "Repository Deleted",
        description: "The GitHub repository has been removed successfully."
      });
    }
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setShowPasswordModal(false);
      setPassword('');

      if (repoToDelete) {
        setShowDeleteConfirm(true);
      } else {
        setIsDialogOpen(true);
      }
    } else {
      setPasswordError('Incorrect password');
    }
  };
  
  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">GitHub Repositories</h2>
      
      <Tabs defaultValue="1" className="w-full" onValueChange={(value) => setActiveYear(Number(value) as Year)}>
        <TabsList className="grid grid-cols-4 mb-8 bg-dark-300">
          {[1, 2, 3, 4].map((year) => (
            <TabsTrigger 
              key={year} 
              value={year.toString()}
              className="data-[state=active]:bg-gradient-blue-purple data-[state=active]:text-white"
            >
              Year {year}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {[1, 2, 3, 4].map((year) => (
          <TabsContent key={year} value={year.toString()} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRepos.map((repo) => (
                <a 
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 hover:bg-dark-300/50 transition-all hover:translate-y-[-5px] group relative"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteRepo(repo.id);
                    }}
                    className="absolute top-3 right-3 bg-red-500/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Delete repository"
                  >
                    <Trash2 size={16} className="text-red-300" />
                  </button>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
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
                        className="mr-2 text-white/60"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                      </svg>
                      <h3 className="text-xl font-semibold">{repo.name}</h3>
                    </div>
                    <div 
                      className="flex items-center px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${getLanguageColor(repo.language)}20`,
                        color: getLanguageColor(repo.language)
                      }}
                    >
                      <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                      {repo.language}
                    </div>
                  </div>
                  <p className="text-white/70 mb-4">{repo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm">Year {repo.year}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
                    >
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setNewRepo({ ...newRepo, year: year as Year });
                    setIsDialogOpen(true);
                  } else {
                    setNewRepo({ ...newRepo, year: year as Year });
                    setShowPasswordModal(true);
                  }
                }}
                className="flex items-center gap-2 bg-dark-300 border border-white/10 px-5 py-2 rounded-lg hover:bg-dark-200 transition-all"
              >
                <Plus size={18} />
                Add Year {year} Repository
              </button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-10 flex justify-center">
        <a 
          href="https://github.com/username"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-blue-purple rounded-lg hover:opacity-90 transition-all"
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
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
          View All Repositories
        </a>
      </div>
      
      {/* Authentication Dialog */}
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
      
      {/* Add Repository Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add GitHub Repository</DialogTitle>
            <DialogDescription className="text-white/70">
              Add details about your GitHub repository.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Repository Name</label>
              <Input 
                id="name"
                name="name"
                placeholder="e.g. personal-website"
                value={newRepo.name}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Describe your repository"
                value={newRepo.description}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10 min-h-24"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">Repository URL</label>
              <Input 
                id="url"
                name="url"
                placeholder="https://github.com/username/repo-name"
                value={newRepo.url}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-medium">Year</label>
              <Select
                value={newRepo.year.toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="bg-dark-400 border-white/10">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-dark-300 border-white/10">
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">Main Language/Technology</label>
              <Input 
                id="language"
                name="language"
                placeholder="e.g. React, JavaScript, Python"
                value={newRepo.language}
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
              onClick={handleAddRepo}
              className="bg-gradient-blue-purple hover:opacity-90 text-white"
              disabled={!newRepo.name || !newRepo.description || !newRepo.url || !newRepo.language}
            >
              Add Repository
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete Repository</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete this repository? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteConfirm(false);
                setRepoToDelete(null);
              }}
              className="bg-transparent border-white/10 hover:bg-dark-200 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteRepo}
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

export default GitHubRepos;
