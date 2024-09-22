import { Note } from '@/types/types';

const STORAGE_KEY = 'notes_app';

export default {
    fetchNotes(): Note[] {
        const notes = localStorage.getItem(STORAGE_KEY);
        return notes ? JSON.parse(notes) : [];
    },
    saveNotes(notes: Note[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    },
};
