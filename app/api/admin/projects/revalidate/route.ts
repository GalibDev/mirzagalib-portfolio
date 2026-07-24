import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser(accessToken);

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("projects", "max");
  revalidateTag("public-content", "max");
  revalidatePath("/");
  revalidatePath("/projects/[id]", "page");

  return NextResponse.json({ success: true });
}
