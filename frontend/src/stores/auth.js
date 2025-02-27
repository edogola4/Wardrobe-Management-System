// src/stores/auth.js
import { defineStore } from 'pinia';
import { register, login, logout, getCurrentUser } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  actions: {
    async registerUser(userData) {
      this.loading = true;
      this.error = null;
      
      try {
        const data = await register(userData);
        this.user = data.user;
        this.token = data.token;
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async loginUser(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        const data = await login(credentials);
        this.user = data.user;
        this.token = data.token;
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logoutUser() {
      this.loading = true;
      
      try {
        await logout();
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchCurrentUser() {
      if (!this.token) return;
      
      this.loading = true;
      
      try {
        const user = await getCurrentUser();
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});

