import { NextResponse } from "next/server";
import { getExperiences, setExperiences } from "@/lib/data";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const experiences = await getExperiences();
    const index = experiences.findIndex((e) => e.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    experiences[index] = { ...experiences[index], ...data, id };
    await setExperiences(experiences);

    return NextResponse.json(experiences[index]);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const experiences = await getExperiences();
    const filtered = experiences.filter((e) => e.id !== id);

    if (filtered.length === experiences.length) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    await setExperiences(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
