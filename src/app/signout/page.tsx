"use client";

import { useEffect } from "react";
import { Gavel, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

export default function SignOutPage() {
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const run = async () => {
      clearUser(); // wipe store + localStorage immediately
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
      window.location.replace("/");
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "hsl(20 14% 4%)" }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bin-gradient shadow-lg">
        <Gavel className="w-7 h-7 text-white" />
      </div>
      <div className="text-center space-y-1.5">
        <h1 className="font-display font-bold text-2xl">Signing you out</h1>
        <p className="text-sm" style={{ color: "#7a6f6a" }}>Please wait...</p>
      </div>
      <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#e74c3c" }} />
    </div>
  );
}