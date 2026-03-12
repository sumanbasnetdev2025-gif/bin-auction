"use client";

import { create } from "zustand";
import type { UserProfile } from "@/types";

interface AuthState {
  user: UserProfile | null;
  isReady: boolean;
  setUser: (user: UserProfile | null) => void;
  clearUser: () => void;
  setReady: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isReady: false,
  setUser: (user) => set({ user, isReady: true }),
  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("bin-auth-storage");
    }
    set({ user: null, isReady: true });
  },
  setReady: () => set({ isReady: true }),
}));