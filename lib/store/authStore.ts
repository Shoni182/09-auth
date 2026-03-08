import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

type AuthStore = {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
};

const initialDraft: User = {
  email: '',
  username: '',
  avatar: '',
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: false,
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  clearIsAuth: () => set(() => ({ user: initialDraft })),
}));
