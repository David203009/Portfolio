import { promises as fs } from "fs";
import path from "path";
import type { HeroData, Project, Experience, SkillCategory } from "@/types";

const dataDir = path.join(process.cwd(), "data");

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getHero(): Promise<HeroData> {
  return readJsonFile<HeroData>("hero.json");
}

export async function setHero(data: HeroData): Promise<void> {
  return writeJsonFile("hero.json", data);
}

export async function getProjects(): Promise<Project[]> {
  return readJsonFile<Project[]>("projects.json");
}

export async function setProjects(data: Project[]): Promise<void> {
  return writeJsonFile("projects.json", data);
}

export async function getExperiences(): Promise<Experience[]> {
  return readJsonFile<Experience[]>("experiences.json");
}

export async function setExperiences(data: Experience[]): Promise<void> {
  return writeJsonFile("experiences.json", data);
}

export async function getSkills(): Promise<SkillCategory[]> {
  return readJsonFile<SkillCategory[]>("skills.json");
}

export async function setSkills(data: SkillCategory[]): Promise<void> {
  return writeJsonFile("skills.json", data);
}
