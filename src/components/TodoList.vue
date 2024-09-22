<template>
    <div>
        <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @updateTodo="updateTodo"
            @deleteTodo="deleteTodo"
        />
        <button class="add-todo-button" @click="addTodo">+</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import TodoItem from '@/components/TodoItem.vue';
    import { Todo } from '@/types/types';

    export default defineComponent({
        components: { TodoItem },
        props: {
            todos: {
                type: Array as PropType<Todo[]>,
                required: true,
            },
        },
        methods: {
            addTodo() {
                const newTodo: Todo = {
                    id: Date.now(),
                    text: '',
                    completed: false,
                };
                this.$emit('updateTodos', [...this.todos, newTodo]);
            },
            updateTodo(updatedTodo: Todo) {
                const todos = this.todos.map(todo =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                );
                this.$emit('updateTodos', todos);
            },
            deleteTodo(todoId: number) {
                const todos = this.todos.filter(todo => todo.id !== todoId);
                this.$emit('updateTodos', todos);
            },
        },
    });
</script>

<style scoped>
    .add-todo-button {
        background-color: #0079bf;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 6px;
        font-size: 24px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }

    .add-todo-button:hover {
        background-color: #0c9ff3;
    }

    .add-todo-button:focus {
        outline: none;
    }
</style>
