"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingDetail from "@/components/listings/ListingDetail";
import { useListing } from "@/hooks/useListings";
import { Loader2 } from "lucide-react";

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: listing, isLoading, isError } = useListing(id);

  useEffect(() => {
    if (isError) router.replace("/listings");
  }, [isError]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#e74c3c" }} />
        </div>
        <Footer />
      </>
    );
  }

  if (!listing) return null;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ListingDetail listing={listing} />
      </main>
      <Footer />
    </>
  );
}