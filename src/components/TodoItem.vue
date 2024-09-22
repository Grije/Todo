<template>
    <div class="todo-item">
        <input
            type="checkbox"
            v-model="localTodo.completed"
            @change="emitUpdate"
            class="todo-checkbox"
        />
        <input
            v-model="localTodo.text"
            @input="emitUpdate"
            placeholder="Текст задачи"
            class="todo-input"
        />
        <button
            v-if="hasDelete"
            @click="$emit('deleteTodo', todo.id)"
            class="delete-button"
        >Удалить
        </button>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType} from 'vue';
    import {Todo} from '@/types/types';

    export default defineComponent({
        props: {
            todo: {
                type: Object as PropType<Todo>,
                required: true,
            },
            hasDelete: {
                type: Boolean,
                required: false,
                default: true,
            },
        },
        data() {
            return {
                localTodo: {...this.todo},
            };
        },
        methods: {
            emitUpdate() {
                this.$emit('updateTodo', this.localTodo);
            },
        },
    });
</script>

<style scoped>
    .todo-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .todo-checkbox {
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

    .todo-checkbox:checked {
        background-color: #0079bf; /* Цвет при активном состоянии */
        border-color: #0079bf;
    }

    .todo-checkbox:checked::before {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: white;
    }

    .todo-input {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #252525;
        border-radius: 6px;
        background-color: #3a3a3a;
        color: #B6C2CF;
        transition: border 0.3s ease;
    }

    .todo-input:focus {
        border-color: #0079bf;
        outline: none;
        color: white;
    }

    .delete-button {
        background-color: #FF4E40;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .delete-button:hover {
        background-color: #BF3A30;
    }
</style>
