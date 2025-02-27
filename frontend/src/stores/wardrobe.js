import { defineStore } from 'pinia';
import api from '../services/api';

export const useWardrobeStore = defineStore('wardrobe', {
  state: () => ({
    categories: [],
    clothingItems: [],
    selectedCategory: null,
    searchQuery: '',
    loading: false,
    error: null
  }),
  
  getters: {
    filteredClothingItems(state) {
      let items = state.clothingItems;
      
      // Filter by category if selected
      if (state.selectedCategory) {
        items = items.filter(item => item.category_id === state.selectedCategory);
      }
      
      // Filter by search query if provided
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(query) ||
          (item.brand && item.brand.toLowerCase().includes(query)) ||
          (item.color && item.color.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query))
        );
      }
      
      return items;
    }
  },
  
  actions: {
    // Categories
    async fetchCategories() {
      try {
        this.loading = true;
        const response = await api.get('/categories');
        this.categories = response.data;
        return response;
      } catch (error) {
        this.error = 'Failed to fetch categories';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Clothing Items
    async fetchClothingItems() {
      try {
        this.loading = true;
        const params = {};
        
        if (this.selectedCategory) {
          params.category_id = this.selectedCategory;
        }
        
        if (this.searchQuery) {
          params.search = this.searchQuery;
        }
        
        const response = await api.get('/clothings', { params });
        this.clothingItems = response.data;
        return response;
      } catch (error) {
        this.error = 'Failed to fetch clothing items';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async addClothingItem(clothingData) {
      try {
        this.loading = true;
        const formData = new FormData();
        
        // Append all fields to formData
        Object.keys(clothingData).forEach(key => {
          if (key === 'image' && clothingData[key]) {
            formData.append(key, clothingData[key]);
          } else if (clothingData[key] !== null && clothingData[key] !== undefined) {
            formData.append(key, clothingData[key]);
          }
        });
        
        const response = await api.post('/clothings', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        await this.fetchClothingItems();
        return response;
      } catch (error) {
        this.error = 'Failed to add clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async updateClothingItem(id, clothingData) {
      try {
        this.loading = true;
        const formData = new FormData();
        
        // Append all fields to formData
        Object.keys(clothingData).forEach(key => {
          if (key === 'image' && clothingData[key]) {
            formData.append(key, clothingData[key]);
          } else if (clothingData[key] !== null && clothingData[key] !== undefined) {
            formData.append(key, clothingData[key]);
          }
        });
        
        // Add PUT method for Laravel
        formData.append('_method', 'PUT');
        
        const response = await api.post(`/clothings/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        await this.fetchClothingItems();
        return response;
      } catch (error) {
        this.error = 'Failed to update clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteClothingItem(id) {
      try {
        this.loading = true;
        const response = await api.delete(`/clothings/${id}`);
        await this.fetchClothingItems();
        return response;
      } catch (error) {
        this.error = 'Failed to delete clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Filters
    setSelectedCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.fetchClothingItems();
    },
    
    setSearchQuery(query) {
      this.searchQuery = query;
      this.fetchClothingItems();
    },
    
    clearFilters() {
      this.selectedCategory = null;
      this.searchQuery = '';
      this.fetchClothingItems();
    }
  }
});