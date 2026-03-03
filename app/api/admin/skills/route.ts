import { NextResponse } from "next/server";
import { getSkills, setSkills } from "@/lib/data";
import crypto from "crypto";

export async function GET() {
  const skills = await getSkills();
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, skills: skillItems } = data;

    if (!title) {
      return NextResponse.json({ error: "Category title is required" }, { status: 400 });
    }

    const categories = await getSkills();
    const newCategory = {
      id: crypto.randomUUID(),
      title,
      skills: skillItems || [],
    };

    categories.push(newCategory);
    await setSkills(categories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
