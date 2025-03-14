
import React, { useState } from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip,
  Legend
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
  DialogDescription,
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

  // Vibrant color palette for skills
  const colorPalette = [
    '#FF6B6B', // Vibrant red
    '#48dbfb', // Bright cyan
    '#1dd1a1', // Emerald
    '#feca57', // Golden yellow
    '#5f27cd', // Royal purple
    '#ff9ff3', // Pink
    '#54a0ff', // Blue
    '#00d2d3', // Teal
    '#ff9f43', // Orange
    '#10ac84', // Green
    '#5f27cd', // Purple
    '#00cec9', // Turquoise
    '#fd79a8', // Pink
    '#6c5ce7'  // Indigo
  ];

  const [webSkills, setWebSkills] = useState<WebSkill[]>([
    { id: 'html', name: 'HTML', level: 95, color: colorPalette[0] },
    { id: 'css', name: 'CSS', level: 90, color: colorPalette[1] },
    { id: 'javascript', name: 'JavaScript', level: 92, color: colorPalette[2] },
    { id: 'react', name: 'React', level: 88, color: colorPalette[3] },
    { id: 'typescript', name: 'TypeScript', level: 80, color: colorPalette[4] },
    { id: 'nodejs', name: 'Node.js', level: 75, color: colorPalette[5] },
    { id: 'tailwind', name: 'Tailwind CSS', level: 85, color: colorPalette[6] },
    { id: 'nextjs', name: 'Next.js', level: 70, color: colorPalette[7] }
  ]);

  const chartData = webSkills.map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 100,
    color: skill.color,
    id: skill.id
  }));

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
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
        {/* Radar Chart Section - Increased size and vibrancy */}
        <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-dark-300/80 to-dark-400/80">
          <h3 className="text-xl font-semibold mb-6 text-white/90">Skill Proficiency</h3>
          <div className="h-[400px]"> {/* Increased height for larger chart */}
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                outerRadius="80%" 
                data={chartData}
                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
              >
                <PolarGrid strokeOpacity={0.3} stroke="#aaa" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#fff', fontSize: 12 }} 
                  tickLine={{ stroke: '#fff' }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#ddd' }} 
                  axisLine={{ stroke: '#aaa' }}
                  tickCount={5}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="rgba(255, 255, 255, 0.8)"
                  fill="rgba(134, 65, 244, 0.7)"
                  fillOpacity={0.6}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="glass-card p-3 text-white border border-white/10" style={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
                          <p className="font-medium" style={{ color: data.color }}>{data.subject}</p>
                          <p>Proficiency: <span className="font-bold">{data.A}%</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  content={() => (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {webSkills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-1 mr-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                          <span className="text-xs text-white/80">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Skills List Section */}
        <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-dark-300/80 to-dark-400/80">
          <h3 className="text-xl font-semibold mb-6 text-white/90">Technology Stack</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
            {webSkills.map((skill) => (
              <div 
                key={skill.id}
                className="bg-dark-400/60 hover:bg-dark-300/60 border border-white/5 rounded-lg p-4 transition-all hover:-translate-y-1 hover:shadow-lg relative"
                onMouseEnter={() => setIsHovering(skill.id)}
                onMouseLeave={() => setIsHovering(null)}
                style={{ 
                  background: `linear-gradient(145deg, rgba(20,20,20,0.7) 0%, rgba(30,30,30,0.5) 100%)`,
                  borderLeft: `3px solid ${skill.color}`
                }}
              >
                <div className="flex items-center mb-3">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${skill.color}30`, 
                      color: skill.color,
                      boxShadow: `0 0 10px ${skill.color}50`
                    }}
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
                <div className="w-full bg-dark-500/70 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 8px ${skill.color}`
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-right text-sm">
                  <span style={{ color: skill.color }}>{skill.level}%</span>
                  <span className="text-white/70"> Proficiency</span>
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
            <DialogDescription className="text-white/60">
              Add a new skill to showcase your expertise.
            </DialogDescription>
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
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/70">1</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                  className="w-full accent-accent-blue-500"
                />
                <span className="text-xs text-white/70">100</span>
              </div>
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
            <Button 
              onClick={handleAddSkill}
              className="bg-gradient-blue-purple hover:opacity-90"
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
