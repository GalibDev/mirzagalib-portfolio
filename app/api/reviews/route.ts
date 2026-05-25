import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const relation = String(body.relation || "").trim();
    const message = String(body.message || "").trim();
    const projectLink = String(body.project_link || "").trim();
    const rating = Number(body.rating || 5);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email and review required" },
        { status: 400 }
      );
    }

    const safeRating = Number.isFinite(rating)
      ? Math.min(5, Math.max(1, Math.round(rating)))
      : 5;

    const { error } = await supabaseServer.from("reviews").insert([
      {
        name,
        email,
        relation: relation || null,
        rating: safeRating,
        message,
        project_link: projectLink || null,
        is_approved: false,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, error: "Review submit hoyni. Abar try koro." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review API error:", error);

    return NextResponse.json(
      { success: false, error: "Review submit failed" },
      { status: 500 }
    );
  }
}
