<template>
    <div
        class="note-card"
        @click="$emit('editNote', note)"
    >
        <h2>
            {{ note.title }}
        </h2>
        <div
            v-for="(todo) in previewTodos"
            :key="todo.id"
            class="note-item"
            :class="{'checked': todo.completed}"
        >
            <input
                type="checkbox"
                v-model="todo.completed"
                @click.stop
                @change="emitUpdate(todo)"
            />
            <span>{{ todo.text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';

    import { Note, Todo } from '@/types/types';

    export default defineComponent({
        name: 'NoteItem',
        props: {
            note: {
                type: Object as PropType<Note>,
                required: true,
            },
        },
        computed: {
            previewTodos(): Todo[] {
                return this.note.todos.slice(0, 5);
            },
        },
        methods: {
            emitUpdate(updatedTodo: Todo) {
                this.$emit('updateNote', {
                    ...this.note,
                    todos: this.note.todos.map(todo =>
                        todo.id === updatedTodo.id ? updatedTodo : todo
                    ),
                });
            },
        },
    });
</script>

<style scoped>
    .note-card {
        background-color: #2b2b2b;
        border-radius: 12px;
        padding: 20px;
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        color: white;
        cursor: pointer;
    }

    .note-card:hover {
        background-color: rgba(43, 43, 43, 0.87);
    }


    .note-card h2 {
        font-size: 22px;
        margin-bottom: 15px;
    }

    .note-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
    }

    input[type="checkbox"] {
        width: 24px;
        height: 24px;
        appearance: none;
        background-color: #eee;
        border: 2px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        position: relative;
    }

    input[type="checkbox"]:checked {
        background-color: #0079bf;
        border-color: #0079bf;
    }

    input[type="checkbox"]:checked::before {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: white;
    }

    .checked {
        text-decoration: line-through;
        color: #6c757d;
    }
</style>
