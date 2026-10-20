import { NextRequest, NextResponse } from "next/server";
import { mockUniversities } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  if (!hasSupabase) {
    const normalized = query.toLowerCase();
    return NextResponse.json(
      mockUniversities
        .filter(
          (university) =>
            university.name.toLowerCase().includes(normalized) ||
            university.domain?.toLowerCase().includes(normalized),
        )
        .slice(0, 8),
    );
  }

  const supabase = await createClient();
  const escaped = query.replaceAll("%", "\\%").replaceAll("_", "\\_");
  const { data, error } = await supabase
    .from("university")
    .select("university_id,name,domain")
    .or(`name.ilike.%${escaped}%,domain.ilike.%${escaped}%`)
    .order("name")
    .limit(8);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
