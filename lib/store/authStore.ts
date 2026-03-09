import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearisAuthenticated: () => void;
};

//- тут була помилка в тому, що не були передані стани isAuthenticated. бекенд працював
//- але навігація не поновлювалась
export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearisAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));

// setUser: (user) => set(() => ({ user: user })),
// clearIsAuth: () => set(() => ({ user: initialDraft })),
