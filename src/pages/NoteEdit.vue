<template>
    <div class="note-editor">
        <h1>{{ isNewNote ? 'Создать заметку' : 'Редактировать заметку' }}</h1>
        <div>
            Имя заметки
        </div>
        <input
            v-model="note.title"
            placeholder="Название заметки"
            class="note-title-input"
        />
        <div>
            Пункты
        </div>
        <TodoList
            :todos="note.todos"
            @updateTodos="updateTodos"
        />
        <div class="editor-actions">
            <button @click="saveNote">Сохранить</button>
            <button @click="confirmCancel">Отменить</button>
            <button
                @click="confirmDelete"
                class="delete-button"
            >Удалить
            </button>
        </div>

        <div class="editor-history">
            <button
                @click="undoChange"
                :disabled="!canUndo"
            >
                Отменить изменение
            </button>
            <button
                @click="redoChange"
                :disabled="!canRedo"
            >
                Повторить изменение
            </button>
        </div>

        <DialogModal
            v-if="showDialog"
            @confirm="handleDialogConfirm"
            @cancel="showDialog = false"
        >
            {{ dialogMessage }}
        </DialogModal>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import TodoList from '@/components/TodoList.vue';
    import DialogModal from '@/components/DialogModal.vue';
    import noteService from '@/services/noteService';
    import {Note, Todo} from '@/types/types';

    export default defineComponent({
        components: {TodoList, DialogModal},
        data() {
            return {
                notes: [] as Note[],
                note: {} as Note,
                originalNote: {} as Note,
                showDialog: false,
                dialogMessage: '',
                dialogAction: '',
                history: [] as Note[],
                future: [] as Note[],
            };
        },
        computed: {
            isNewNote(): boolean {
                return !this.$route.params.id;
            },
            canUndo(): boolean {
                return this.history.length > 0;
            },
            canRedo(): boolean {
                return this.future.length > 0;
            },
        },
        created() {
            this.notes = noteService.fetchNotes();
            const noteId = this.$route.params.id;
            if (noteId) {
                const existingNote = this.notes.find(n => n.id === Number(noteId));
                if (existingNote) {
                    this.note = JSON.parse(JSON.stringify(existingNote));
                    this.originalNote = JSON.parse(JSON.stringify(existingNote));
                } else {
                    this.$router.push('/');
                }
            } else {
                this.note = {
                    id: Date.now(),
                    title: '',
                    todos: [],
                };
            }
        },
        methods: {
            saveNote() {
                if (this.isNewNote) {
                    this.notes.push(this.note);
                } else {
                    const index = this.notes.findIndex(n => n.id === this.note.id);
                    this.notes.splice(index, 1, this.note);
                }
                noteService.saveNotes(this.notes);
                this.$router.push('/');
            },
            confirmCancel() {
                this.dialogMessage = 'Вы уверены, что хотите отменить изменения?';
                this.dialogAction = 'cancel';
                this.showDialog = true;
            },
            confirmDelete() {
                this.dialogMessage = 'Вы уверены, что хотите удалить заметку?';
                this.dialogAction = 'delete';
                this.showDialog = true;
            },
            handleDialogConfirm() {
                if (this.dialogAction === 'cancel') {
                    this.$router.push('/');
                } else if (this.dialogAction === 'delete') {
                    this.notes = this.notes.filter(n => n.id !== this.note.id);
                    noteService.saveNotes(this.notes);
                    this.$router.push('/');
                }
                this.showDialog = false;
            },
            updateTodos(todos: Todo[]) {
                this.saveHistory();
                this.note.todos = todos;
            },
            saveHistory() {
                this.history.push(JSON.parse(JSON.stringify(this.note)));
                this.future = [];
            },
            undoChange() {
                if (this.canUndo) {
                    this.future.push(JSON.parse(JSON.stringify(this.note)));
                    this.note = this.history.pop() as Note;
                }
            },
            redoChange() {
                if (this.canRedo) {
                    this.history.push(JSON.parse(JSON.stringify(this.note)));
                    this.note = this.future.pop() as Note;
                }
            },
        },
    });
</script>

<style scoped>
    .note-editor {
        background-color: #333;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        border-radius: 12px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        margin: 5% auto;
        color: #B6C2CF;
    }

    .note-editor h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .note-title-input {
        width: calc(100% - 40px);
        padding: 10px;
        font-size: 16px;
        border: 1px solid #252525;
        border-radius: 6px;
        background-color: #3a3a3a;
        color: #B6C2CF;
        transition: border 0.3s ease;
    }

    .note-title-input:focus {
        border-color: #0079bf;
        outline: none;
        color: white;
    }

    .editor-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
    }

    .editor-history {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .editor-actions button,
    .editor-history button {
        flex: 1;
        background-color: #B2F63D;
        color: #3a3a3a;
        border: none;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
        text-align: center;
    }

    .editor-actions button:hover,
    .editor-history button:hover {
        background-color: #80B12C;
    }

    .editor-actions button:disabled,
    .editor-history button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .delete-button {
        background-color: #FF4E40
    }

    .delete-button:hover {
        background-color: #ba2912;
    }

    .editor-actions,
    .editor-history {
        justify-content: center;
        gap: 10px;
    }

    .editor-actions button,
    .editor-history button {
        width: 30%;
    }
</style>
