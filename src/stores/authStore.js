import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // null when no user is logged in
  isLoggedIn: false,
  login: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
