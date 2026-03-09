// Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на реєстрацію нового користувача.
// Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на автентифікацію користувача.

// У разі успішної автентифікації має відбуватись автоматичний редірект користувача на сторінку профілю /profile.
// on succsess link

// Додавати специфічні meta-теги на сторінку реєстрації не потрібно (2)

// lib/api/clientApi.ts — для функцій, які викликаються у клієнтських компонентах:

//: Imports
import { type Note } from '@/types/note';
import { type NewNote } from '@/types/note';
import { User, RegisterRequest } from '@/types/user';
import { nextServer } from '../api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type CheckSessionRequest = {
  success: boolean;
};

//: Key
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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
  const res = await nextServer.get<FetchNotesResponse>('/api/notes', {
    params: {
      page,
      search: query,
      tag: tag,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return res.data;
};

// : GET request of one note
export const fetchNoteById = async (noteId: string) => {
  const res = await nextServer.get<Note>(`/api/notes/[id]/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST request for add a note
export const createNote = async (taskData: NewNote) => {
  const res = await nextServer.post<Note>('/api/notes/', taskData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : DELETE request for delete a note
export const deleteNote = async (taskId: string) => {
  const res = await nextServer.delete<Note>(`/api/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST - register request on the nextServer

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('api/auth/register', data);
  return res.data;
};

// : POST - login request on the nextServer

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('api/auth/login', data);
  return res.data;
};

//: POST - logout;
export const logout = async (): Promise<void> => {
  await nextServer.post('api/auth/logout');
};

//: checkSession;
export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('api/auth/session');
  return res.data.success;
};

//: getMe;

export const getMe = async () => {
  const { data } = await nextServer.get<User>('api/users/me');
  return data;
};

//: updateMe;

export const updateMe = async () => {
  const res = await nextServer.patch<User>('api/users/me');
  return res.data;
};
