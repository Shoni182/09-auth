// Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на реєстрацію нового користувача.
// Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на автентифікацію користувача.

// У разі успішної автентифікації має відбуватись автоматичний редірект користувача на сторінку профілю /profile.
// on succsess link

// Додавати специфічні meta-теги на сторінку реєстрації не потрібно (2)

// fetchNotes;
// fetchNoteById;
// createNote;
// deleteNote;
// register;
// login;
// logout;
// checkSession;
// getMe;
// updateMe;

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
  const res = await nextServer.get<FetchNotesResponse>('/app/api/notes', {
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
  const res = await nextServer.get<Note>(`/app/api/notes/[id]/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST request for add a note
export const createNote = async (taskData: NewNote) => {
  const res = await nextServer.post<Note>('/app/api/notes/', taskData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : DELETE request for delete a note
export const deleteNote = async (taskId: string) => {
  const res = await nextServer.delete<Note>(`/app/api/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST - register request on the nextServer

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
