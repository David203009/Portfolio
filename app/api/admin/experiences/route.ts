import { NextResponse } from "next/server";
import { getExperiences, setExperiences } from "@/lib/data";
import crypto from "crypto";

export async function GET() {
  const experiences = await getExperiences();
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, company, period, description, technologies } = data;

    if (!title || !company) {
      return NextResponse.json({ error: "Title and company are required" }, { status: 400 });
    }

    const experiences = await getExperiences();
    const newExperience = {
      id: crypto.randomUUID(),
      title,
      company,
      period: period || "",
      description: description || "",
      technologies: technologies || [],
    };

    experiences.push(newExperience);
    await setExperiences(experiences);

    return NextResponse.json(newExperience, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
