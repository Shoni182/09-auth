// lib/api/serverApi.ts — для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers):
import { FetchNotesResponse } from './clientApi';

import { cookies } from 'next/headers';
import { serverApi } from '@/app/api/api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

// import { nextServer } from "../api";
// type CheckSessionRequest = {
//   success: boolean;
// };

//: Key
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_URL;
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
  const res = await serverApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search: query,
      tag: tag,
      //   cookies: '',
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return res.data;
};

// : GET request of one note
export const fetchNoteById = async (noteId: string) => {
  const res = await serverApi.get<Note>(`/notes/[id]/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

//: checkSession;
export const checkSession = async () => {
  const res = await serverApi.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

//: getMe;

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
