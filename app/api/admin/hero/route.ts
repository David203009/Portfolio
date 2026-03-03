import { NextResponse } from "next/server";
import { getHero, setHero } from "@/lib/data";

export async function GET() {
  const hero = await getHero();
  return NextResponse.json(hero);
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { name, status, bio } = data;

    if (!name || !status || !bio) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await setHero({ name, status, bio });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
