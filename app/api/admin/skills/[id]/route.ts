import { NextResponse } from "next/server";
import { getSkills, setSkills } from "@/lib/data";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const categories = await getSkills();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    categories[index] = { ...categories[index], ...data, id };
    await setSkills(categories);

    return NextResponse.json(categories[index]);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const categories = await getSkills();
    const filtered = categories.filter((c) => c.id !== id);

    if (filtered.length === categories.length) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await setSkills(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
