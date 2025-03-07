import {create} from 'zustand';

interface User{
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
}
interface UserStore{
    isAuthenticated:boolean 
    user:User|null
    setUser:(user:User)=>void
    clearUser:()=>void
}
export const useUserStore = create<UserStore>((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user:User) => set({ isAuthenticated: true, user }),
    clearUser: () => set({ isAuthenticated: false, user: null }),
  }));