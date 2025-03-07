import {create} from 'zustand';

interface User{
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
}
export const useUserStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user:User) => set({ isAuthenticated: true, user }),
    clearUser: () => set({ isAuthenticated: false, user: null }),
  }));