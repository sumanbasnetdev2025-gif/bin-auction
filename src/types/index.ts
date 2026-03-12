export type ListingStatus = "active" | "ended" | "sold" | "cancelled";

export interface Listing {
  id: string;
  seller_id: string;
  category_id: number;
  title: string;
  description: string;
  starting_price: number;
  current_highest_bid: number | null;
  image_urls: string[];
  status: ListingStatus;
  auction_end_time: string;
  sold_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  seller?: UserProfile;
  category?: Category;
  bid_count?: number;
  highest_bidder_id?: string | null;
}

export interface Bid {
  id: string;
  listing_id: string;
  bidder_id: string;
  amount: number;
  is_highest: boolean;
  created_at: string;
  updated_at: string;
  bidder?: UserProfile;
  listing?: Listing;
}

export interface BidWithBidder extends Bid {
  bidder: UserProfile;
}

export interface CreateListingInput {
  title: string;
  description: string;
  category_id: number;
  starting_price: number;
  auction_end_time: string;
  image_urls: string[];
}

export interface UpdateListingInput extends Partial<CreateListingInput> {
  id: string;
}

export interface PlaceBidInput {
  listing_id: string;
  amount: number;
}

export interface UpdateBidInput {
  bid_id: string;
  amount: number;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile | null;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  phone?: string | null;
  location?: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export interface SellerStats {
  totalListings: number;
  activeListings: number;
  endedListings: number;
  totalBidsReceived: number;
  highestBidAmount: number;
}

export type PaymentMethod = "cash" | "qr";

export interface PaymentInfo {
  method: PaymentMethod;
  sellerPhone?: string;
  qrCodeUrl?: string;
  amount: number;
  listingTitle: string;
  sellerName: string;
}