<template>
    <div>
        <NoteItem
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @editNote="editNote"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import NoteItem from '@/components/NoteItem.vue';
    import { Note } from '@/types/types';

    export default defineComponent({
        components: { NoteItem },
        props: {
            notes: {
                type: Array as PropType<Note[]>,
                required: true,
            },
        },
        methods: {
            editNote(note: Note) {
                this.$router.push({ name: 'NoteEdit', params: { id: note.id } });
            },
        },
    });
</script>
