//: lib/api.ts

// imports
import axios from 'axios';

//: interface
import { type Note } from '../types/note';
import { type NewNote } from '../types/note';
// import { NoteTag } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

//: Key
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// : Instants axios (module 9)
const nextServer = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});

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
  const res = await nextServer.get<FetchNotesResponse>('/notes', {
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
  const res = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : POST request for add a note
export const createNote = async (taskData: NewNote) => {
  const res = await nextServer.post<Note>('/notes', taskData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};

// : DELETE request for delete a note
export const deleteNote = async (taskId: string) => {
  const res = await nextServer.delete<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
};
