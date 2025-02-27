// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import views
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ClothingItemView from '@/views/ClothingItemView.vue'
import CreateItemView from '@/views/CreateItemView.vue'
import EditItemView from '@/views/EditItemView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/items/:id',
      name: 'item-details',
      component: ClothingItemView,
      meta: { requiresAuth: true }
    },
    {
      path: '/items/create',
      name: 'create-item',
      component: CreateItemView,
      meta: { requiresAuth: true }
    },
    {
      path: '/items/:id/edit',
      name: 'edit-item',
      component: EditItemView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    },
  ]
})

// Navigation guards for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  
  // Route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } 
  // Route requires guest (not authenticated)
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' })
  } 
  // No specific requirements or requirements are met
  else {
    next()
  }
})

export default router