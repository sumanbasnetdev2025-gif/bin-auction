export const CATEGORIES = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    icon: "Zap",
    description: "TVs, cameras, audio, accessories",
  },
  {
    id: 2,
    name: "Mobiles",
    slug: "mobiles",
    icon: "Smartphone",
    description: "Phones, tablets, smartwatches",
  },
  {
    id: 3,
    name: "Bikes",
    slug: "bikes",
    icon: "Bike",
    description: "Motorcycles, bicycles, scooters",
  },
  {
    id: 4,
    name: "Furniture",
    slug: "furniture",
    icon: "Sofa",
    description: "Chairs, tables, beds, storage",
  },
  {
    id: 5,
    name: "Computers",
    slug: "computers",
    icon: "Monitor",
    description: "Laptops, desktops, peripherals",
  },
  {
    id: 6,
    name: "Fashion",
    slug: "fashion",
    icon: "Shirt",
    description: "Clothing, shoes, bags, jewellery",
  },
  {
    id: 7,
    name: "Home Appliances",
    slug: "home-appliances",
    icon: "WashingMachine",
    description: "Kitchen, laundry, cooling, heating",
  },
  {
    id: 8,
    name: "Books",
    slug: "books",
    icon: "BookOpen",
    description: "Textbooks, novels, magazines",
  },
  {
    id: 9,
    name: "Gaming",
    slug: "gaming",
    icon: "Gamepad2",
    description: "Consoles, games, accessories",
  },
  {
    id: 10,
    name: "Others",
    slug: "others",
    icon: "Package",
    description: "Anything else",
  },
] as const;

export const MAX_BIDS_PER_USER = 3;

export const APP_NAME = "BIN";
export const APP_FULL_NAME = "Bid In Nepal";
export const APP_DESCRIPTION = "Nepal's premier second-hand auction marketplace";

export const CURRENCY = "NPR";
export const CURRENCY_SYMBOL = "रू";

export const LISTING_STATUSES = {
  ACTIVE: "active",
  ENDED: "ended",
  CANCELLED: "cancelled",
} as const;

export const ITEMS_PER_PAGE = 12;

export const SUPABASE_STORAGE_BUCKET = "listing-images";

export const AUCTION_DURATIONS = [
  { label: "1 Day", hours: 24 },
  { label: "3 Days", hours: 72 },
  { label: "5 Days", hours: 120 },
  { label: "7 Days", hours: 168 },
  { label: "14 Days", hours: 336 },
  { label: "30 Days", hours: 720 },
];