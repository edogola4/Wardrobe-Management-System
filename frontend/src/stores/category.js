// src/stores/category.js
import { defineStore } from 'pinia';
import { getCategories } from '@/services/categoryService';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    loading: false,
    error: null,
  }),
  
  actions: {
    async fetchCategories() {
      this.loading = true;
      
      try {
        const categories = await getCategories();
        this.categories = categories;
        return categories;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch categories';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
