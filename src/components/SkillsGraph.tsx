
import React, { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the coding platform interface
interface CodingPlatform {
  id: string;
  name: string;
  url: string;
  logo: JSX.Element | string;
  problems: number;
  total: number;
  color: string;
}

const SkillsGraph: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showToast = (platform: string) => {
    toast({
      title: `${platform} Selected`,
      description: `Redirecting to ${platform} profile page`,
    });
  };

  const codingPlatforms: CodingPlatform[] = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      url: 'https://leetcode.com/username',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5m-3.75 8.25v-3a3.75 3.75 0 1 1 7.5 0v3z" clipRule="evenodd" />
        </svg>
      ),
      problems: 389,
      total: 500,
      color: '#FFA116'
    },
    {
      id: 'hackerrank',
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/username',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25M15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0m-10.875 0a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0" clipRule="evenodd" />
        </svg>
      ),
      problems: 255,
      total: 300,
      color: '#2EC866'
    },
    {
      id: 'codechef',
      name: 'CodeChef',
      url: 'https://www.codechef.com/users/username',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0z" />
        </svg>
      ),
      problems: 142,
      total: 200,
      color: '#5B4638'
    },
    {
      id: 'codeforces',
      name: 'Codeforces',
      url: 'https://codeforces.com/profile/username',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" clipRule="evenodd" />
        </svg>
      ),
      problems: 89,
      total: 150,
      color: '#1F8ACB'
    },
    {
      id: 'atcoder',
      name: 'AtCoder',
      url: 'https://atcoder.jp/users/username',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433z" clipRule="evenodd" />
        </svg>
      ),
      problems: 64,
      total: 100,
      color: '#222222'
    }
  ];

  const handlePlatformClick = (platform: CodingPlatform) => {
    showToast(platform.name);
    window.open(platform.url, '_blank');
  };

  const chartData = codingPlatforms.map(platform => ({
    name: platform.name,
    progress: Math.round((platform.problems / platform.total) * 100),
    color: platform.color,
    problems: platform.problems,
    total: platform.total
  }));

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Coding Platforms & Skills</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-white/90">Problem Solving Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barSize={isMobile ? 20 : 30}
                onMouseMove={(data) => {
                  if (data.activeTooltipIndex !== undefined) {
                    setActiveIndex(data.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  stroke="#999" 
                  tick={{ fill: '#999' }}
                />
                <YAxis 
                  stroke="#999" 
                  tick={{ fill: '#999' }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="glass-card p-3 text-white border border-white/10">
                          <p className="font-medium">{data.name}</p>
                          <p>Progress: {data.progress}%</p>
                          <p>Problems: {data.problems}/{data.total}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="progress">
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === activeIndex ? `${entry.color}` : `${entry.color}80`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePlatformClick(codingPlatforms[index])}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Platforms Section */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-white/90">Connected Platforms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codingPlatforms.map((platform) => (
              <div 
                key={platform.id}
                className="bg-dark-400/60 hover:bg-dark-300/60 border border-white/5 rounded-lg p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handlePlatformClick(platform)}
              >
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-dark-300 rounded-full flex items-center justify-center text-white" style={{ color: platform.color }}>
                    {typeof platform.logo === 'string' ? (
                      <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
                    ) : (
                      platform.logo
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{platform.name}</h4>
                    <div className="text-xs text-white/50">Connected</div>
                  </div>
                </div>
                <div className="w-full bg-dark-500 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ 
                      width: `${(platform.problems / platform.total) * 100}%`,
                      backgroundColor: platform.color
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/60">
                  <span>{platform.problems} solved</span>
                  <span>{platform.total} total</span>
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
