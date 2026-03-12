# BIN — Bid In Nepal 🇳🇵

Nepal's premier second-hand auction marketplace. Buy and sell with confidence.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **State**: Zustand, TanStack Query
- **UI**: shadcn/ui, Radix UI, Lucide Icons

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/sumanbasnetdev2025-gif/bin-auction.git
cd bin-auction
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL and anon key in `.env.local`.

### 4. Set up Supabase
- Run `supabase/schema.sql` in your Supabase SQL Editor
- Run `supabase/rls.sql` for Row Level Security policies
- Run `supabase/seed.sql` for category seed data
- Run `supabase/migrations/add_sold_status.sql` for sold feature

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 🔐 Auth (signup, login, signout)
- 🏷️ Create & manage auction listings
- ⏱️ Real-time countdown timers
- 💰 Live bidding with bid history
- 📦 10 categories with filtered browsing
- 🏆 Ending-soon trending section
- ✅ Mark as Sold with 6-hour claim banner
- 📱 Fully responsive design
- 🌙 Dark theme

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `NEXT_PUBLIC_APP_URL` | App URL (http://localhost:3000 for dev) |
