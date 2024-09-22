<template>
    <div class="main-page">
        <h1>Ваши заметки</h1>
        <button class="create-note-button" @click="createNote">
            Создать новую заметку
        </button>
        <div class="notes-grid">
            <TodoCard
                v-for="note in notes"
                :key="note.id"
                :title="note.title"
                :todos="note.todos"
                class="note-card"
                @updateTodo="updateNote(note)"
                @click.stop="editNote(note)"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    import noteService from '@/services/noteService';
    import {Note} from '@/types/types';
    import TodoCard from '@/components/TodoCard.vue';

    export default defineComponent({
        components: {
            TodoCard,
        },
        data() {
            return {
                notes: [] as Note[],
                showDialog: false,
                noteToDelete: null as Note | null,
            };
        },
        created() {
            this.notes = noteService.fetchNotes();
        },
        methods: {
            createNote() {
                this.$router.push({ name: 'NoteEdit' });
            },
            editNote(note: Note) {
                this.$router.push({ name: 'NoteEdit', params: { id: note.id } });
            },
            confirmDelete(note: Note) {
                this.noteToDelete = note;
                this.showDialog = true;
            },
            updateNote(note: Note) {
                return (index: number) => {
                    const noteIndex = this.notes.findIndex(n => n.id === note.id);
                    if (noteIndex !== -1) {
                        this.notes[noteIndex].todos[index].completed = !this.notes[noteIndex].todos[index].completed;

                        noteService.saveNotes(this.notes);
                    }
                };
            },
        },
    });
</script>

<style scoped>
    .main-page {
        padding: 20px;
        border-radius: 12px;
        color: white;
        max-width: 1000px;
        margin: 20px auto;
        text-align: center;
    }

    .main-page h1 {
        font-size: 28px;
        margin-bottom: 20px;
    }

    .create-note-button {
        background-color: #B2F63D;
        color: #3a3a3a;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        margin-bottom: 20px;
        transition: background-color 0.3s ease;
    }

    .create-note-button:hover {
        background-color: #80B12C;
    }

    .notes-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
</style>
