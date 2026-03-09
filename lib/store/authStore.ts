import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
};

// const initialDraft: User = {
//   email: '',
//   username: '',
//   avatar: '',
// };

//- тут була помилка в тому, що не були передані стани isAuth. бекенд працював
//- але навігація не поновлювалась
export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuth: true }));
  },
  clearIsAuth: () => {
    set(() => ({ user: null, isAuth: false }));
  },
}));

// setUser: (user) => set(() => ({ user: user })),
// clearIsAuth: () => set(() => ({ user: initialDraft })),
