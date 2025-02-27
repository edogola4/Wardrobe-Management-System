
// src/stores/clothing.js
import { defineStore } from 'pinia';
import {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  updateClothingItem,
  deleteClothingItem,
  toggleFavorite,
} from '@/services/clothingService';

export const useClothingStore = defineStore('clothing', {
  state: () => ({
    items: [],
    currentItem: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      category: null,
      favorite: null,
    },
  }),
  
  getters: {
    filteredItems: (state) => {
      return state.items;
    },
  },
  
  actions: {
    setFilter(filterName, value) {
      this.filters[filterName] = value;
    },
    
    clearFilters() {
      this.filters = {
        search: '',
        category: null,
        favorite: null,
      };
    },
    
    async fetchItems() {
      this.loading = true;
      
      try {
        const params = {};
        if (this.filters.search) params.search = this.filters.search;
        if (this.filters.category) params.category = this.filters.category;
        if (this.filters.favorite !== null) params.favorite = this.filters.favorite;
        
        const items = await getClothingItems(params);
        this.items = items;
        return items;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch clothing items';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchItem(id) {
      this.loading = true;
      
      try {
        const item = await getClothingItem(id);
        this.currentItem = item;
        return item;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async createItem(itemData) {
      this.loading = true;
      
      try {
        const item = await createClothingItem(itemData);
        this.items.unshift(item);
        return item;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async updateItem(id, itemData) {
      this.loading = true;
      
      try {
        const updatedItem = await updateClothingItem(id, itemData);
        
        // Update the item in the items array
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
        
        // Update currentItem if it's the same item
        if (this.currentItem && this.currentItem.id === id) {
          this.currentItem = updatedItem;
        }
        
        return updatedItem;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteItem(id) {
      this.loading = true;
      
      try {
        await deleteClothingItem(id);
        
        // Remove the item from the items array
        this.items = this.items.filter(item => item.id !== id);
        
        // Clear currentItem if it's the same item
        if (this.currentItem && this.currentItem.id === id) {
          this.currentItem = null;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete clothing item';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async toggleItemFavorite(id) {
      this.loading = true;
      
      try {
        const updatedItem = await toggleFavorite(id);
        
        // Update the item in the items array
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
        
        // Update currentItem if it's the same item
        if (this.currentItem && this.currentItem.id === id) {
          this.currentItem = updatedItem;
        }
        
        return updatedItem;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to toggle favorite status';
        throw error;
      } finally {
        this.loading = false;