import { defineStore } from 'pinia';
import api from '../services/api';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  actions: {
    async register(userData) {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.post('/register', userData);
        this.user = response.data.user;
        this.token = response.data.token;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        router.push({ name: 'dashboard' });
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async login(credentials) {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.post('/login', credentials);
        this.user = response.data.user;
        this.token = response.data.token;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        router.push({ name: 'dashboard' });
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        this.loading = true;
        if (this.token) {
          await api.post('/logout');
        }
      } catch (error) {
        console.error('Logout API error:', error);
      } finally {
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.loading = false;
        router.push({ name: 'login' });
      }
    },
    
    async fetchUser() {
      if (!this.token) return;
      
      try {
        this.loading = true;
        const response = await api.get('/user');
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
      } catch (error) {
        if (error.response?.status === 401) {
          this.logout();
        }
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});