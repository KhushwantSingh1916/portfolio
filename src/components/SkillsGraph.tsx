
import React, { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const webSkills: WebSkill[] = [
    { id: 'html', name: 'HTML', level: 95, color: '#E34F26' },
    { id: 'css', name: 'CSS', level: 90, color: '#1572B6' },
    { id: 'javascript', name: 'JavaScript', level: 92, color: '#F7DF1E' },
    { id: 'react', name: 'React', level: 88, color: '#61DAFB' },
    { id: 'typescript', name: 'TypeScript', level: 80, color: '#3178C6' },
    { id: 'nodejs', name: 'Node.js', level: 75, color: '#339933' },
    { id: 'tailwind', name: 'Tailwind CSS', level: 85, color: '#06B6D4' },
    { id: 'nextjs', name: 'Next.js', level: 70, color: '#000000' }
  ];

  const chartData = webSkills.map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 100,
    color: skill.color
  }));

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Web Development Skills</h2>
      
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
                className="bg-dark-400/60 hover:bg-dark-300/60 border border-white/5 rounded-lg p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
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
                    <div className="text-xs text-white/50">Web Development</div>
                  </div>
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
    </section>
  );
};

export default SkillsGraph;
