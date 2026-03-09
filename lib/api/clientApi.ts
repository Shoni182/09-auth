// Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на реєстрацію нового користувача.
// Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на автентифікацію користувача.

// У разі успішної автентифікації має відбуватись автоматичний редірект користувача на сторінку профілю /profile.
// on succsess link

// Додавати специфічні meta-теги на сторінку реєстрації не потрібно (2)

// lib/api/clientApi.ts — для функцій, які викликаються у клієнтських компонентах:

//: Imports
import { type Note } from '@/types/note';
import { type NewNote } from '@/types/note';
import { User } from '@/types/user';
import { clientApi } from '../api';

// import { nextServer } from '../api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type CheckSessionRequest = {
  success: boolean;
};

type RegisterRequest = {
  email: string;
  password: string;
};

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
  const res = await clientApi.get<FetchNotesResponse>('/notes', {
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
  const res = await clientApi.get<Note>(`/notes/[id]/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST request for add a note
export const createNote = async (taskData: NewNote) => {
  const res = await clientApi.post<Note>('/notes/', taskData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : DELETE request for delete a note
export const deleteNote = async (taskId: string) => {
  const res = await clientApi.delete<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST - register request on the nextserver

export const register = async (data: RegisterRequest) => {
  const res = await clientApi.post<User>('/auth/register', data);
  return res.data;
};

// : POST - login request on the nextserver

export const login = async (data: RegisterRequest) => {
  const res = await clientApi.post<User>('/auth/login', data);
  return res.data;
};

//: POST - logout;
export const logout = async (): Promise<void> => {
  await clientApi.post('/auth/logout');
};

//: checkSession;
export const checkSession = async () => {
  const res = await clientApi.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

//: getMe;

export const getMe = async () => {
  const { data } = await clientApi.get<User>('/users/me');
  return data;
};

//: updateMe;

export const updateMe = async () => {
  const res = await clientApi.patch<User>('/users/me');
  return res.data;
};
