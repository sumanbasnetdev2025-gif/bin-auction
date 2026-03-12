-- =============================================
-- BIN — Row Level Security Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- =============================================
-- USERS policies
-- =============================================

-- Anyone can read user profiles (for showing seller info)
CREATE POLICY "users_public_read" ON public.users
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "users_own_update" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- CATEGORIES policies
-- =============================================

-- Anyone can read categories
CREATE POLICY "categories_public_read" ON public.categories
  FOR SELECT USING (true);

-- =============================================
-- LISTINGS policies
-- =============================================

-- Anyone can read listings
CREATE POLICY "listings_public_read" ON public.listings
  FOR SELECT USING (true);

-- Authenticated users can create listings
CREATE POLICY "listings_authenticated_insert" ON public.listings
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Only the seller can update their own listing
CREATE POLICY "listings_own_update" ON public.listings
  FOR UPDATE USING (auth.uid() = seller_id);

-- Only the seller can delete (cancel) their own listing
CREATE POLICY "listings_own_delete" ON public.listings
  FOR DELETE USING (auth.uid() = seller_id);

-- =============================================
-- BIDS policies
-- =============================================

-- Anyone can read bids (for bid history display)
CREATE POLICY "bids_public_read" ON public.bids
  FOR SELECT USING (true);

-- Authenticated users can place bids (not on own listings — enforced in API)
CREATE POLICY "bids_authenticated_insert" ON public.bids
  FOR INSERT WITH CHECK (auth.uid() = bidder_id);

-- Users can only update their own bids
CREATE POLICY "bids_own_update" ON public.bids
  FOR UPDATE USING (auth.uid() = bidder_id);

-- Users can only delete their own bids
CREATE POLICY "bids_own_delete" ON public.bids
  FOR DELETE USING (auth.uid() = bidder_id);

-- =============================================
-- STORAGE policies (run in Supabase dashboard)
-- =============================================
-- Create bucket: listing-images (public)
-- INSERT: authenticated users only
-- SELECT: public
-- UPDATE/DELETE: owner only (match path starts with user.id)