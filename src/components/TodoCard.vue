<template>
    <div class="todo-card">
        <h2>{{ title }}</h2>
        <div
            v-for="(item, index) in todos"
            :key="index"
            class="todo-item"
            :class="{ checked: item.completed }"
        >
            <input
                type="checkbox"
                v-model="item.completed"
                @click.stop
                @change="emitUpdate(index)"
                class="checkbox"
            />
            <span>{{ item.text }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType} from 'vue';

    export default defineComponent({
        name: 'TodoCard',
        props: {
            title: {
                type: String,
                required: true
            },
            todos: {
                type: Array as PropType<Array<{text: string; completed: boolean}>>,
                required: true
            }
        },
        methods: {
            emitUpdate(index: number) {
                this.$emit('updateTodo', index);
            }
        }
    });
</script>

<style scoped>
    .todo-card {
        background-color: #333;
        padding: 20px;
        border-radius: 16px;
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        color: white;
        align-items: flex-start;
        cursor: pointer;
    }

    h2 {
        margin-bottom: 20px;
        font-size: 20px;
        color: white;
    }

    .todo-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        color: white;
        margin-left: 15px;
    }

    .checkbox {
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

    .checkbox:checked {
        background-color: #0079bf;
        border-color: #0079bf;
    }

    .checkbox:checked::before {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: white;
    }

    .todo-item.checked span {
        text-decoration: line-through;
        color: #6c757d;
    }

    .todo-card:hover {
        background-color: rgba(51, 51, 51, 0.91);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
    }
</style>
