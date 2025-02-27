<!-- src/components/Navbar.vue -->
<template>
  <nav class="bg-indigo-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link :to="{ name: 'home' }" class="text-xl font-bold">
        Wardrobe Manager
      </router-link>
      
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <router-link 
            :to="{ name: 'dashboard' }" 
            class="hover:text-indigo-200"
            active-class="text-indigo-200 font-bold"
          >
            Dashboard
          </router-link>
          <router-link 
            :to="{ name: 'create-item' }" 
            class="hover:text-indigo-200"
            active-class="text-indigo-200 font-bold"
          >
            Add Item
          </router-link>
          <div class="relative" v-if="user">
            <button 
              @click="isProfileOpen = !isProfileOpen" 
              class="flex items-center hover:text-indigo-200"
            >
              <span>{{ user.name }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div v-if="isProfileOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button 
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
              >
                Logout
              </button>
            </div>
          </div>
        </template>
        
        <template v-else>
          <router-link 
            :to="{ name: 'login' }" 
            class="hover:text-indigo-200"
            active-class="text-indigo-200 font-bold"
          >
            Login
          </router-link>
          <router-link 
            :to="{ name: 'register' }" 
            class="hover:text-indigo-200"
            active-class="text-indigo-200 font-bold"
          >
            Register
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isProfileOpen = ref(false)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (isProfileOpen.value && !event.target.closest('button')) {
    isProfileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Logout handler
const logout = async () => {
  await authStore.logoutUser()
  isProfileOpen.value = false
  router.push({ name: 'login' })
}
</script>