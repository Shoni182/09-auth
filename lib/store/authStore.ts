import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

type UserDraftStore = {
  draft: User;
  setDraft: (note: User) => void;
  clearDraft: () => void;
};

const initialDraft: User = {
  email: '',
  username: '',
  avatar: '',
};

export const useUserDraftStore = create<UserDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (user) => set(() => ({ draft: user })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: 'user-draft',
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
