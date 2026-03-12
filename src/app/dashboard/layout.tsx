"use client";

import Navbar from "@/components/layout/Navbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import AuthGuard from "@/components/shared/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col" style={{ background: "hsl(20 14% 4%)" }}>
        <Navbar />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 p-6 lg:p-8 max-w-5xl">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}