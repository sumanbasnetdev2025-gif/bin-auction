import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { calculateMinBid } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { listing_id, amount } = await req.json();

  if (!listing_id || !amount) {
    return NextResponse.json({ error: "Missing listing_id or amount" }, { status: 400 });
  }

  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("id, seller_id, status, current_highest_bid, starting_price, auction_end_time")
    .eq("id", listing_id)
    .single();

  if (listingError || !listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  if (listing.status !== "active") return NextResponse.json({ error: "Auction has ended" }, { status: 400 });
  if (new Date(listing.auction_end_time) < new Date()) return NextResponse.json({ error: "Auction time has expired" }, { status: 400 });
  if (listing.seller_id === user.id) return NextResponse.json({ error: "You cannot bid on your own listing" }, { status: 400 });

  const minBid = calculateMinBid(listing.current_highest_bid, listing.starting_price);
  if (amount < minBid) {
    return NextResponse.json({ error: `Minimum bid is ${minBid} NPR` }, { status: 400 });
  }

  const { data: existingBid } = await supabase
    .from("bids")
    .select("id, bid_update_count")
    .eq("listing_id", listing_id)
    .eq("bidder_id", user.id)
    .single();

  if (existingBid) {
    return NextResponse.json(
      { error: "You already have a bid. Update your existing bid instead." },
      { status: 400 }
    );
  }

  const { data: bid, error: bidError } = await supabase
    .from("bids")
    .insert({
      listing_id,
      bidder_id: user.id,
      amount,
      is_highest: true,
      bid_update_count: 0,
    })
    .select()
    .single();

  if (bidError) return NextResponse.json({ error: bidError.message }, { status: 500 });

  await supabase
    .from("bids")
    .update({ is_highest: false })
    .eq("listing_id", listing_id)
    .neq("id", bid.id);

  await supabase
    .from("listings")
    .update({ current_highest_bid: amount, updated_at: new Date().toISOString() })
    .eq("id", listing_id);

  return NextResponse.json({ data: bid }, { status: 201 });
}