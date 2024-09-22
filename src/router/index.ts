import { createRouter, createWebHistory } from 'vue-router';
import NoteEdit from '@/pages/NoteEdit.vue';
import IndexHome from '@/pages/IndexHome.vue';

const routes = [
    { path: '/', name: 'IndexHome', component: IndexHome },
    { path: '/edit/:id?', name: 'NoteEdit', component: NoteEdit },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
