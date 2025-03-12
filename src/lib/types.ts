
export interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface SkillData {
  id: string;
  name: string;
  proficiency: number; // 0-100
  color: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  year: number;
  language: string;
}

export interface HackathonResult {
  id: string;
  name: string;
  position: 1 | 2 | 3 | null; // 1st, 2nd, 3rd, or participated
  date: string;
  description: string;
}

export type Year = 1 | 2 | 3 | 4;
