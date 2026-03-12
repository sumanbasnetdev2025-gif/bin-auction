"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isReady = useAuthStore((s) => s.isReady);
  const router = useRouter();

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  // Waiting for AuthProvider to finish session check
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "hsl(20 14% 4%)" }}>
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#e74c3c" }} />
      </div>
    );
  }

  // isReady but no user — redirect in progress
  if (!user) return null;

  // User confirmed — render page
  return <>{children}</>;
}