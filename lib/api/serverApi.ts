// lib/api/serverApi.ts — для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers):
import { FetchNotesResponse } from './clientApi';

import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

// import { nextServer } from "../api";
// type CheckSessionRequest = {
//   success: boolean;
// };

// : GET Request for all notes
export const fetchNotes = async ({
  page,
  query,
  tag,
}: {
  page: number;
  query: string;
  tag?: string;
}) => {
  const cookieStore = await cookies();
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search: query,
      tag: tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

// : GET request of one note
export const fetchNoteById = async (noteId: string) => {
  const cookieStore = await cookies();
  const res = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

//: checkSession;
export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

//: getMe;

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
