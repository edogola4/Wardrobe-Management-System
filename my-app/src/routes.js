import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/LandingPage.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./components/LoginPage.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./components/RegisterPage.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('./components/ProfilePage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/add-item',
        name: 'AddItem',
        component: () => import('./components/AddItemForm.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/edit-item/:id',
        name: 'EditItem',
        component: () => import('./components/EditItemForm.vue'),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token')
    if (to.meta.requiresAuth && !token) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router