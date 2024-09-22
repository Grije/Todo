<template>
    <div>
        <h1>Заметки</h1>
        <button
            @click="createNote">
            Создать новую заметку
        </button>
        <NoteList
            :notes="notes"
            @deleteNote="confirmDelete"
        />
        <Dialog
            v-if="showDialog"
            @confirm="deleteNote"
            @cancel="showDialog = false
">
            Вы уверены, что хотите удалить заметку?
        </Dialog>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import NoteList from '@/components/NoteList.vue';
    import Dialog from '@/components/Dialog.vue';
    import noteService from '@/services/noteService';
    import { Note } from '@/types/types';

    export default defineComponent({
        components: { NoteList, Dialog },
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
            confirmDelete(note: Note) {
                this.noteToDelete = note;
                this.showDialog = true;
            },
            deleteNote() {
                this.notes = this.notes.filter(n => n.id !== this.noteToDelete?.id);
                noteService.saveNotes(this.notes);
                this.showDialog = false;
            },
        },
    });
</script>
