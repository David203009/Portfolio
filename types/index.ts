export interface HeroData {
  name: string;
  status: string;
  bio: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string }[];
}
