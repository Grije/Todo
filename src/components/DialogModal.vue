<template>
    <div class="dialog-overlay">
        <div class="dialog">
            <slot></slot>
            <div class="dialog-actions">
                <button
                    class="dialog-button confirm"
                    @click="$emit('confirm')"
                >
                    ОК
                </button>
                <button
                    class="dialog-button cancel"
                    @click="$emit('cancel')"
                >
                    Отмена
                </button>
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
        background-color: rgba(0, 0, 0, 0.7); /* Более темный оверлей */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dialog {
        background-color: #2b2b2b; /* Темный фон диалога */
        padding: 20px;
        border-radius: 12px;
        width: 300px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        color: white; /* Белый текст */
    }

    .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }

    .dialog-button {
        background-color: #0079bf;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .dialog-button:hover {
        background-color: #0c9ff3;
    }

    .dialog-button.cancel {
        background-color: #eb5a46;
    }

    .dialog-button.cancel:hover {
        background-color: #ba2912;
    }
</style>
