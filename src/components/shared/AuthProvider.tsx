"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";
import type { UserProfile } from "@/types";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const setReady = useAuthStore((s) => s.setReady);

  useEffect(() => {
    const supabase = createClient();

    const loadProfile = async (userId: string, email?: string) => {
      try {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (profile) {
          setUser(profile as UserProfile); // also sets isReady: true
        } else {
          const fallback = {
            id: userId,
            email: email ?? "",
            full_name: email?.split("@")[0] ?? "User",
            role: "buyer",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as UserProfile;
          await supabase.from("users").insert(fallback);
          setUser(fallback); // also sets isReady: true
        }
      } catch {
        setReady(); // error — mark ready so app doesn't hang
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email);
      } else {
        setReady(); // no session — mark ready immediately
      }
    }).catch(() => {
      setReady(); // network error — mark ready so app doesn't hang
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        loadProfile(session.user.id, session.user.email);
      } else if (event === "SIGNED_OUT") {
        clearUser(); // also sets isReady: true
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}