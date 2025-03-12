
import React, { useState } from 'react';
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

const SkillsGraph: React.FC = () => {
  const [skills, setSkills] = useState<SkillData[]>(initialSkills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<SkillData, 'id'>>({
    name: '',
    proficiency: 50,
    color: '#3384FF'
  });
  
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
        
        <div className="mt-8 flex justify-center">
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
            Add New Skill
          </button>
        </div>
      </div>
      
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
