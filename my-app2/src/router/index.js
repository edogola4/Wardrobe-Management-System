import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import ProfilePage from '../components/ProfilePage.vue'
import AddItemForm from '../components/AddItemForm.vue'
import EditItemForm from '../components/EditItemForm.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandingPage,
        meta: { requiresAuth: false },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { requiresAuth: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: { requiresAuth: false },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/add-item',
        name: 'AddItem',
        component: AddItemForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/edit-item/:id',
        name: 'EditItem',
        component: EditItemForm,
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