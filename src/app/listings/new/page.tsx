import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingForm from "@/components/listings/ListingForm";

export const metadata: Metadata = {
  title: "List an Item",
};

export default function NewListingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl mb-2">List Your Item</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create your auction listing
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <ListingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}