<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'App',
    });
</script>

<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #2b2b2b;
    }

    #app {
        padding-left: 40px;
        padding-right: 40px;
        min-height: 100vh;
        background-color: inherit;
    }
</style>
