import React, { useState } from 'react';
import { HackathonResult } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';

const initialHackathons: HackathonResult[] = [
  {
    id: '1',
    name: 'Global Hackathon 2022',
    position: 1,
    date: '2022-03-15',
    description: 'Developed an AI-powered solution for sustainable agriculture.'
  },
  {
    id: '2',
    name: 'CodeFest 2022',
    position: 2,
    date: '2022-06-22',
    description: 'Built a real-time collaboration tool for remote teams.'
  },
  {
    id: '3',
    name: 'HealthTech Hackathon',
    position: 3,
    date: '2022-09-10',
    description: 'Created a mobile app for tracking mental health and providing resources.'
  },
  {
    id: '4',
    name: 'Blockchain Hackathon',
    position: null,
    date: '2022-12-05',
    description: 'Participated in developing a decentralized marketplace solution.'
  },
  {
    id: '5',
    name: 'AI Innovation Challenge',
    position: 1,
    date: '2023-02-18',
    description: 'Developed a natural language processing tool for content moderation.'
  },
  {
    id: '6',
    name: 'Mobile App Hackathon',
    position: null,
    date: '2023-05-20',
    description: 'Worked on creating an accessibility-focused navigation app.'
  },
  {
    id: '7',
    name: 'Cybersecurity Hackathon',
    position: 2,
    date: '2023-08-14',
    description: 'Built a security awareness training platform with gamification elements.'
  },
  {
    id: '8',
    name: 'EdTech Solutions Hackathon',
    position: 1,
    date: '2023-11-09',
    description: 'Created an adaptive learning platform for personalized education.'
  }
];

const HackathonStats: React.FC = () => {
  const [hackathons, setHackathons] = useState<HackathonResult[]>(initialHackathons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hackathonToDelete, setHackathonToDelete] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [newHackathon, setNewHackathon] = useState<Omit<HackathonResult, 'id'>>({
    name: '',
    position: null,
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const correctPassword = "portfolio123";
  
  const handleAddHackathon = () => {
    const id = Date.now().toString();
    setHackathons([...hackathons, { ...newHackathon, id }]);
    setNewHackathon({
      name: '',
      position: null,
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Hackathon Added",
      description: "Your hackathon result has been added successfully."
    });
  };
  
  const handleDeleteHackathon = (id: string) => {
    if (!isAuthenticated) {
      setShowPasswordModal(true);
      setHackathonToDelete(id);
      return;
    }
    
    setHackathonToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteHackathon = () => {
    if (hackathonToDelete) {
      const updatedHackathons = hackathons.filter(h => h.id !== hackathonToDelete);
      setHackathons(updatedHackathons);
      setShowDeleteConfirm(false);
      setHackathonToDelete(null);
      
      toast({
        title: "Hackathon Deleted",
        description: "The hackathon result has been removed successfully."
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewHackathon({ ...newHackathon, [name]: value });
  };
  
  const handlePositionChange = (value: string) => {
    const position = value === 'null' ? null : parseInt(value) as 1 | 2 | 3;
    setNewHackathon({ ...newHackathon, position });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setShowPasswordModal(false);
      setPassword('');

      if (hackathonToDelete) {
        setShowDeleteConfirm(true);
      } else {
        setIsDialogOpen(true);
      }
    } else {
      setPasswordError('Incorrect password');
    }
  };
  
  const totalHackathons = hackathons.length;
  const firstPlaceWins = hackathons.filter(h => h.position === 1).length;
  const secondPlaceWins = hackathons.filter(h => h.position === 2).length;
  const thirdPlaceWins = hackathons.filter(h => h.position === 3).length;
  const totalWins = firstPlaceWins + secondPlaceWins + thirdPlaceWins;
  const participationOnly = hackathons.filter(h => h.position === null).length;
  
  const sortedHackathons = [...hackathons].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <section id="hackathons" className="section-container">
      <h2 className="section-title">Hackathon Achievements</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-5xl font-bold mb-2 gradient-text">{totalHackathons}</div>
          <div className="text-lg text-white/70">Total Hackathons</div>
          <div className="mt-4 w-full bg-dark-400 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-blue-purple h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-5xl font-bold mb-2 gradient-text">{totalWins}</div>
          <div className="text-lg text-white/70">Total Wins</div>
          <div className="mt-4 w-full bg-dark-400 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-blue-purple h-full rounded-full" style={{ width: `${(totalWins/totalHackathons)*100}%` }}></div>
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="text-5xl font-bold mb-2 gradient-text">{firstPlaceWins}</div>
          <div className="text-lg text-white/70">First Place Wins</div>
          <div className="mt-4 w-full bg-dark-400 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-blue-purple h-full rounded-full" style={{ width: `${(firstPlaceWins/totalHackathons)*100}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold">Hackathon History</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-accent-blue-500 mr-1"></span>
              <span className="text-sm text-white/70">1st Place</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-accent-purple-500 mr-1"></span>
              <span className="text-sm text-white/70">2nd Place</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-white/40 mr-1"></span>
              <span className="text-sm text-white/70">3rd Place</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {sortedHackathons.map((hackathon) => (
            <div 
              key={hackathon.id} 
              className="flex flex-col md:flex-row md:items-center p-4 rounded-lg bg-dark-400/50 hover:bg-dark-400 transition-colors group"
            >
              <div className="flex-shrink-0 md:w-40 mb-2 md:mb-0">
                <div className="text-sm text-white/60">
                  {new Date(hackathon.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
              
              <div className="flex-grow md:ml-4">
                <h4 className="font-semibold">{hackathon.name}</h4>
                <p className="text-sm text-white/70">{hackathon.description}</p>
              </div>
              
              <div className="md:ml-4 mt-2 md:mt-0 flex items-center">
                {hackathon.position ? (
                  <div 
                    className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${
                      hackathon.position === 1
                        ? 'bg-accent-blue-500/20 text-accent-blue-300'
                        : hackathon.position === 2
                        ? 'bg-accent-purple-500/20 text-accent-purple-300'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
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
                      className="mr-1"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    {hackathon.position === 1 
                      ? '1st Place' 
                      : hackathon.position === 2 
                      ? '2nd Place' 
                      : '3rd Place'}
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-dark-300 text-white/50 inline-flex items-center">
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
                      className="mr-1"
                    >
                      <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"/>
                      <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"/>
                    </svg>
                    Participated
                  </div>
                )}
                
                <button
                  onClick={() => handleDeleteHackathon(hackathon.id)}
                  className="ml-3 bg-red-500/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete hackathon"
                >
                  <Trash2 size={16} className="text-red-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Win Distribution</h3>
          <div className="h-8 w-full bg-dark-400 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-accent-blue-500 transition-all duration-1000"
              style={{ width: `${(firstPlaceWins/totalHackathons)*100}%` }}
              title={`${firstPlaceWins} First Place Wins`}
            ></div>
            <div 
              className="h-full bg-accent-purple-500 transition-all duration-1000"
              style={{ width: `${(secondPlaceWins/totalHackathons)*100}%` }}
              title={`${secondPlaceWins} Second Place Wins`}
            ></div>
            <div 
              className="h-full bg-white/40 transition-all duration-1000"
              style={{ width: `${(thirdPlaceWins/totalHackathons)*100}%` }}
              title={`${thirdPlaceWins} Third Place Wins`}
            ></div>
            <div 
              className="h-full bg-dark-300 transition-all duration-1000"
              style={{ width: `${(participationOnly/totalHackathons)*100}%` }}
              title={`${participationOnly} Participations`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span>1st Place: {firstPlaceWins}</span>
            <span>2nd Place: {secondPlaceWins}</span>
            <span>3rd Place: {thirdPlaceWins}</span>
            <span>Participated: {participationOnly}</span>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => {
              if (isAuthenticated) {
                setIsDialogOpen(true);
              } else {
                setShowPasswordModal(true);
              }
            }}
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
            Add Hackathon Result
          </button>
        </div>
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
            <DialogTitle>Add Hackathon Result</DialogTitle>
            <DialogDescription className="text-white/70">
              Record your participation or win in a hackathon event.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Hackathon Name</label>
              <Input 
                id="name"
                name="name"
                placeholder="e.g. Global CodeFest 2023"
                value={newHackathon.name}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-medium">Result</label>
              <Select
                value={newHackathon.position === null ? 'null' : newHackathon.position.toString()}
                onValueChange={handlePositionChange}
              >
                <SelectTrigger className="bg-dark-400 border-white/10">
                  <SelectValue placeholder="Select your result" />
                </SelectTrigger>
                <SelectContent className="bg-dark-300 border-white/10">
                  <SelectItem value="1">1st Place</SelectItem>
                  <SelectItem value="2">2nd Place</SelectItem>
                  <SelectItem value="3">3rd Place</SelectItem>
                  <SelectItem value="null">Participated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input 
                id="date"
                name="date"
                type="date"
                value={newHackathon.date}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Describe your project or contribution"
                value={newHackathon.description}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10 min-h-24"
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
              onClick={handleAddHackathon}
              className="bg-gradient-blue-purple hover:opacity-90 text-white"
              disabled={!newHackathon.name || !newHackathon.description}
            >
              Add Hackathon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete Hackathon Result</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete this hackathon result? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteConfirm(false);
                setHackathonToDelete(null);
              }}
              className="bg-transparent border-white/10 hover:bg-dark-200 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteHackathon}
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

export default HackathonStats;
