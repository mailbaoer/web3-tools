import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        component: () => import('@/pages/layouts/AppLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/pages/Index.vue'),
            },
            {
                path: '/tools/:id',
                component: () => import('@/pages/Tool.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router };
