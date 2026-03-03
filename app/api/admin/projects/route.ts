import { NextResponse } from "next/server";
import { getProjects, setProjects } from "@/lib/data";
import crypto from "crypto";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, tags, githubUrl, liveUrl } = data;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const projects = await getProjects();
    const newProject = {
      id: crypto.randomUUID(),
      title,
      description,
      tags: tags || [],
      githubUrl: githubUrl || "#",
      liveUrl: liveUrl || "#",
    };

    projects.push(newProject);
    await setProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
