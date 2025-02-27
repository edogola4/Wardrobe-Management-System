<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">Wardrobe Manager</router-link>
      
      <div class="flex space-x-4">
        <template v-if="authStore.isAuthenticated">
          <router-link to="/dashboard" class="hover:text-gray-300">Dashboard</router-link>
          <router-link to="/clothing/add" class="hover:text-gray-300">Add Item</router-link>
          <button @click="logout" class="hover:text-gray-300">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="hover:text-gray-300">Login</router-link>
          <router-link to="/register" class="hover:text-gray-300">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>