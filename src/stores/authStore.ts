import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  email: string;
}

interface AuthState {
  token: string;
  user: UserInfo | null;
  meals: any[];

  setToken: (token: string) => void;
  setUser: (user: UserInfo) => void;
  addMeal: (meal: any) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      user: null,
      meals: [],

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
      clearAuth: () => set({ token: "", user: null, meals: [] }),
    }),
    {
      name: "auth-storage",
    }
  )
);
