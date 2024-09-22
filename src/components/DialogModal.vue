<template>
    <div class="dialog-overlay">
        <div class="dialog">
            <slot></slot>
            <div class="dialog-actions">
                <button @click="$emit('confirm')">ОК</button>
                <button @click="$emit('cancel')">Отмена</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .dialog {
        background-color: #fff;
        padding: 20px;
        margin: 100px auto;
        width: 300px;
    }
    .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
</style>
