import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createListingSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "active";
  const categorySlug = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 12;

  let query = supabase
    .from("listings")
    .select(`*, seller:users!seller_id(*), category:categories!category_id(*)`)
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (categorySlug) {
    query = query.eq("category.slug", categorySlug);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createListingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("listings")
    .insert({ ...parsed.data, seller_id: user.id, status: "active" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}