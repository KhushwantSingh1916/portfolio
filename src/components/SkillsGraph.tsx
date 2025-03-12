
import React, { useState, useEffect } from 'react';
import { SkillData } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const initialSkills: SkillData[] = [
  { id: '1', name: 'JavaScript', proficiency: 90, color: '#F7DF1E' },
  { id: '2', name: 'React', proficiency: 85, color: '#61DAFB' },
  { id: '3', name: 'Node.js', proficiency: 80, color: '#339933' },
  { id: '4', name: 'TypeScript', proficiency: 75, color: '#3178C6' },
  { id: '5', name: 'Python', proficiency: 70, color: '#3776AB' },
  { id: '6', name: 'MongoDB', proficiency: 65, color: '#47A248' },
  { id: '7', name: 'SQL', proficiency: 60, color: '#4479A1' },
  { id: '8', name: 'GraphQL', proficiency: 55, color: '#E10098' }
];

// Coding platform stats
interface CodingPlatform {
  name: string;
  username: string;
  url: string;
  stats: Array<{
    name: string;
    value: string | number;
    icon?: JSX.Element;
  }>;
  logo: JSX.Element;
  color: string;
}

const initialPlatforms: CodingPlatform[] = [
  {
    name: 'LeetCode',
    username: 'johndeveloper',
    url: 'https://leetcode.com/johndeveloper',
    stats: [
      { 
        name: 'Solved', 
        value: 350,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) 
      },
      { 
        name: 'Contest Rating', 
        value: 1850,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.21 13.89 7 23l9-9-8.99-9-.79 8.89z"/>
            <path d="m14.92 14.92 2.12 2.12"/>
            <path d="M2.26 9.39 9.39 2.26c.39-.39 1.02-.39 1.41 0l10.94 10.94c.39.39.39 1.02 0 1.41l-7.13 7.13c-.39.39-1.02.39-1.41 0L2.26 10.8c-.39-.39-.39-1.02 0-1.41z"/>
          </svg>
        ) 
      },
      { 
        name: 'Global Rank', 
        value: '5,342',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 13V2l8 4-8 4"/>
            <path d="M20.55 10.23A9 9 0 1 1 8 4.94"/>
          </svg>
        ) 
      }
    ],
    logo: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
      </svg>
    ),
    color: '#FFA116'
  },
  {
    name: 'HackerRank',
    username: 'johndeveloper',
    url: 'https://hackerrank.com/johndeveloper',
    stats: [
      { 
        name: 'Gold Badges', 
        value: 12,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7"/>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
          </svg>
        )
      },
      { 
        name: 'Certificates', 
        value: 5,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <path d="M3 9h18"/>
            <path d="M3 15h18"/>
            <path d="M9 3v18"/>
            <path d="M15 3v18"/>
          </svg>
        )
      },
      { 
        name: 'Algorithms Score', 
        value: '950/1000',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" x2="4" y1="22" y2="15"/>
          </svg>
        )
      }
    ],
    logo: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-6.5c-1.5 0-2.8-.8-3.5-2l1.7-1c.4.7 1 1.2 1.8 1.2.9 0 1.6-.6 1.6-1.4 0-.8-.6-1.3-1.6-1.3h-.5v-1.7h.5c.8 0 1.4-.5 1.4-1.2 0-.7-.6-1.2-1.4-1.2-.7 0-1.2.3-1.5.9l-1.7-1c.6-1.1 1.8-1.8 3.2-1.8 2 0 3.5 1.1 3.5 2.7 0 1-.6 1.8-1.5 2.2.9.3 1.6 1.2 1.6 2.3 0 1.8-1.5 3.1-3.6 3.1z" />
      </svg>
    ),
    color: '#38B000'
  }
];

const SkillsGraph: React.FC = () => {
  const [skills, setSkills] = useState<SkillData[]>(() => {
    const saved = localStorage.getItem('portfolio-skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });
  
  const [platforms, setPlatforms] = useState<CodingPlatform[]>(() => {
    const saved = localStorage.getItem('portfolio-platforms');
    return saved ? JSON.parse(saved) : initialPlatforms;
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [newSkill, setNewSkill] = useState<Omit<SkillData, 'id'>>({
    name: '',
    proficiency: 50,
    color: '#3384FF'
  });
  
  // For a real app, this would be stored securely
  const correctPassword = "portfolio123";
  
  useEffect(() => {
    // Save skills to localStorage when they change
    localStorage.setItem('portfolio-skills', JSON.stringify(skills));
    localStorage.setItem('portfolio-platforms', JSON.stringify(platforms));
  }, [skills, platforms]);
  
  const handleAddSkill = () => {
    const id = Date.now().toString();
    setSkills([...skills, { ...newSkill, id }]);
    setNewSkill({
      name: '',
      proficiency: 50,
      color: '#3384FF'
    });
    setIsDialogOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };
  
  const handleSliderChange = (value: number[]) => {
    setNewSkill({ ...newSkill, proficiency: value[0] });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setShowPasswordModal(false);
      setPassword('');
      
      // If we were trying to add a skill, open that dialog
      if (!isDialogOpen) {
        setIsDialogOpen(true);
      }
    } else {
      setPasswordError('Incorrect password');
    }
  };
  
  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Skills & Expertise</h2>
      
      <div className="glass-card p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6">Technical Proficiency</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: skill.color }}
                      ></div>
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-white/70">{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 w-full bg-dark-500 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${skill.proficiency}%`, 
                        backgroundColor: skill.color,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Skill Distribution</h3>
            <div className="flex-grow relative">
              <div className="aspect-square w-full relative">
                {/* Circular skill visualization */}
                <div className="absolute inset-0 rounded-full border border-white/10"></div>
                <div className="absolute inset-[10%] rounded-full border border-white/10"></div>
                <div className="absolute inset-[20%] rounded-full border border-white/10"></div>
                <div className="absolute inset-[30%] rounded-full border border-white/10"></div>
                <div className="absolute inset-[40%] rounded-full border border-white/10"></div>
                <div className="absolute inset-[50%] rounded-full border border-white/5"></div>
                
                {skills.map((skill, index) => {
                  const angle = (index * (360 / skills.length)) * (Math.PI / 180);
                  const distance = (skill.proficiency / 100) * 45; // 45% of the radius
                  const x = 50 + Math.cos(angle) * distance;
                  const y = 50 + Math.sin(angle) * distance;
                  
                  return (
                    <div 
                      key={skill.id}
                      className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-500 hover:scale-125"
                      style={{ 
                        left: `${x}%`, 
                        top: `${y}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 15px ${skill.color}80`,
                      }}
                      title={`${skill.name}: ${skill.proficiency}%`}
                    >
                      <span className="text-xs font-bold">{skill.name.charAt(0)}</span>
                    </div>
                  );
                })}
                
                <div className="absolute inset-[45%] rounded-full bg-gradient-blue-purple flex items-center justify-center">
                  <span className="text-xs font-bold">Skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Coding Platform Stats */}
        <div className="mt-10">
          <h3 className="text-xl md:text-2xl font-bold mb-6">Coding Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <div key={platform.name} className="bg-dark-400/50 backdrop-blur-sm rounded-xl border border-white/5 p-5 transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="text-2xl p-2 rounded-lg" 
                    style={{ color: platform.color }}
                  >
                    {platform.logo}
                  </div>
                  <div>
                    <h4 className="font-bold">{platform.name}</h4>
                    <a 
                      href={platform.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white"
                    >
                      @{platform.username}
                    </a>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {platform.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="text-white/60">{stat.icon}</div>
                      <div className="flex justify-between w-full">
                        <span className="text-white/70">{stat.name}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            Add New Skill
          </button>
        </div>
      </div>
      
      {/* Password Authentication Modal */}
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
      
      {/* Add Skill Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-300 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription className="text-white/70">
              Add a new programming language or technology to your skill set.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Skill Name</label>
              <Input 
                id="name"
                name="name"
                placeholder="e.g. JavaScript, Python, etc."
                value={newSkill.name}
                onChange={handleInputChange}
                className="bg-dark-400 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="proficiency" className="text-sm font-medium">
                Proficiency Level: {newSkill.proficiency}%
              </label>
              <Slider
                defaultValue={[newSkill.proficiency]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="color" className="text-sm font-medium">Color</label>
              <div className="flex gap-2">
                <Input 
                  id="color"
                  name="color"
                  type="color"
                  value={newSkill.color}
                  onChange={handleInputChange}
                  className="w-12 h-10 p-1 bg-dark-400 border-white/10"
                />
                <Input 
                  name="color"
                  value={newSkill.color}
                  onChange={handleInputChange}
                  className="bg-dark-400 border-white/10"
                />
              </div>
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
              onClick={handleAddSkill}
              className="bg-gradient-blue-purple hover:opacity-90 text-white"
              disabled={!newSkill.name}
            >
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SkillsGraph;
