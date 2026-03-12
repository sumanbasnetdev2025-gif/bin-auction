import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { MAX_BIDS_PER_USER } from "@/lib/constants";
import { calculateMinBid } from "@/lib/utils";

interface Params {
  params: Promise<{ listingId: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { listingId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bids")
    .select(`*, bidder:users!bidder_id(id, full_name, avatar_url)`)
    .eq("listing_id", listingId)
    .order("amount", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { listingId } = await params;
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bid_id, amount } = await req.json();

  const { data: existingBid, error: bidFetchError } = await supabase
    .from("bids")
    .select("*")
    .eq("id", bid_id)
    .eq("bidder_id", user.id)
    .single();

  if (bidFetchError || !existingBid) {
    return NextResponse.json({ error: "Bid not found" }, { status: 404 });
  }

  if (existingBid.bid_update_count >= MAX_BIDS_PER_USER) {
    return NextResponse.json(
      { error: `You can only update your bid ${MAX_BIDS_PER_USER} times` },
      { status: 400 }
    );
  }

  const { data: listing } = await supabase
    .from("listings")
    .select("current_highest_bid, starting_price, auction_end_time, status")
    .eq("id", listingId)
    .single();

  if (!listing || listing.status !== "active") {
    return NextResponse.json({ error: "Auction is not active" }, { status: 400 });
  }

  if (new Date(listing.auction_end_time) < new Date()) {
    return NextResponse.json({ error: "Auction has expired" }, { status: 400 });
  }

  const minBid = calculateMinBid(listing.current_highest_bid, listing.starting_price);
  if (amount < minBid) {
    return NextResponse.json({ error: `Minimum bid is ${minBid} NPR` }, { status: 400 });
  }

  const { data: updatedBid, error: updateError } = await supabase
    .from("bids")
    .update({
      amount,
      bid_update_count: existingBid.bid_update_count + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bid_id)
    .select()
    .single();

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  const { data: allBids } = await supabase
    .from("bids")
    .select("id, amount")
    .eq("listing_id", listingId)
    .order("amount", { ascending: false });

  if (allBids && allBids.length > 0) {
    const highestBidId = allBids[0].id;
    const highestAmount = allBids[0].amount;

    await supabase.from("bids").update({ is_highest: false }).eq("listing_id", listingId);
    await supabase.from("bids").update({ is_highest: true }).eq("id", highestBidId);

    await supabase
      .from("listings")
      .update({ current_highest_bid: highestAmount, updated_at: new Date().toISOString() })
      .eq("id", listingId);
  }

  return NextResponse.json({ data: updatedBid });
}