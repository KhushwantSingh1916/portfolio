
import React, { useState } from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Define the web skill interface
interface WebSkill {
  id: string;
  name: string;
  level: number;
  color: string;
}

const SkillsGraph: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 75 });
  const [password, setPassword] = useState('');
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const [webSkills, setWebSkills] = useState<WebSkill[]>([
    { id: 'html', name: 'HTML', level: 95, color: '#E34F26' },
    { id: 'css', name: 'CSS', level: 90, color: '#1572B6' },
    { id: 'javascript', name: 'JavaScript', level: 92, color: '#F7DF1E' },
    { id: 'react', name: 'React', level: 88, color: '#61DAFB' },
    { id: 'typescript', name: 'TypeScript', level: 80, color: '#3178C6' },
    { id: 'nodejs', name: 'Node.js', level: 75, color: '#339933' },
    { id: 'tailwind', name: 'Tailwind CSS', level: 85, color: '#06B6D4' },
    { id: 'nextjs', name: 'Next.js', level: 70, color: '#000000' }
  ]);

  const chartData = webSkills.map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 100,
    color: skill.color,
    id: skill.id
  }));

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  const handleAddSkill = () => {
    if (password !== 'admin123') {
      toast({
        title: "Incorrect Password",
        description: "You need admin access to add skills",
        variant: "destructive"
      });
      return;
    }

    if (!newSkill.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a skill name",
        variant: "destructive"
      });
      return;
    }

    const id = newSkill.name.toLowerCase().replace(/\s+/g, '-');
    
    if (webSkills.some(skill => skill.id === id)) {
      toast({
        title: "Skill Exists",
        description: "This skill already exists in your profile",
        variant: "destructive"
      });
      return;
    }

    const skillToAdd: WebSkill = {
      id,
      name: newSkill.name,
      level: newSkill.level,
      color: generateRandomColor()
    };

    setWebSkills([...webSkills, skillToAdd]);
    setNewSkill({ name: '', level: 75 });
    setPassword('');
    setIsAddSkillOpen(false);

    toast({
      title: "Skill Added",
      description: `${newSkill.name} has been added to your skills`,
    });
  };

  const handleRemoveSkill = (id: string) => {
    if (password !== 'admin123') {
      toast({
        title: "Incorrect Password",
        description: "You need admin access to remove skills",
        variant: "destructive"
      });
      return;
    }

    setWebSkills(webSkills.filter(skill => skill.id !== id));
    
    toast({
      title: "Skill Removed",
      description: "The skill has been removed from your profile",
    });
  };

  return (
    <section id="skills" className="section-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Skills</h2>
        <Button 
          onClick={() => setIsAddSkillOpen(true)}
          variant="outline" 
          className="bg-dark-400/60 hover:bg-dark-300/60 border border-white/10 text-white"
        >
          <Plus className="mr-2" /> Add Skill
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart Section */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-white/90">Skill Proficiency</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={chartData}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#bbb' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#999' }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.5}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="glass-card p-3 text-white border border-white/10">
                          <p className="font-medium">{data.subject}</p>
                          <p>Proficiency: {data.A}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Skills List Section */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-white/90">Technology Stack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {webSkills.map((skill) => (
              <div 
                key={skill.id}
                className="bg-dark-400/60 hover:bg-dark-300/60 border border-white/5 rounded-lg p-4 transition-all hover:-translate-y-1 hover:shadow-lg relative"
                onMouseEnter={() => setIsHovering(skill.id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="flex items-center mb-3">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}30`, color: skill.color }}
                  >
                    <span className="text-lg font-bold">{skill.name.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{skill.name}</h4>
                  </div>
                  {isHovering === skill.id && (
                    <Button
                      onClick={() => {
                        const enteredPassword = window.prompt("Enter admin password to remove skill:");
                        setPassword(enteredPassword || '');
                        if (enteredPassword) {
                          handleRemoveSkill(skill.id);
                        }
                      }}
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 w-7 h-7 p-0 text-white hover:text-red-500 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="w-full bg-dark-500 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-right text-sm text-white/70">
                  <span>{skill.level}% Proficiency</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Skill Dialog */}
      <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
        <DialogContent className="bg-dark-400/95 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Skill Name</label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                placeholder="e.g. Vue.js, Python, Docker"
                className="bg-dark-500/60 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Proficiency Level ({newSkill.level}%)</label>
              <input
                type="range"
                min="1"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-dark-500/60 border-white/10 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSkillOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkill}>
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SkillsGraph;
