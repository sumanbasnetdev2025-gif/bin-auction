"use client";

import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isReady = useAuthStore((s) => s.isReady);

  const signOut = () => {
    window.location.href = "/signout";
  };

  return {
    user,
    isLoading: !isReady,
    signOut,
    isAuthenticated: !!user,
  };
}