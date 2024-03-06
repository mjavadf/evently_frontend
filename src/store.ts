import { create } from "zustand";

interface AuthStatusStore {
  isAtuhenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStatus = create<AuthStatusStore>((set) => ({
    isAtuhenticated: false,
    login: () => set(() => ({ isAtuhenticated: true })),
    logout: () => set(() => ({ isAtuhenticated: false })),
}))