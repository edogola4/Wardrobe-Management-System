// src/store/modules/wardrobe.js
import api from '@/services/api';

export default {
  namespaced: true,
  state: {
    clothingItems: [],
    categories: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_CLOTHING_ITEMS(state, items) {
      state.clothingItems = items;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_CLOTHING_ITEM(state, item) {
      state.clothingItems.push(item);
    },
    UPDATE_CLOTHING_ITEM(state, updatedItem) {
      const index = state.clothingItems.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.clothingItems.splice(index, 1, updatedItem);
      }
    },
    REMOVE_CLOTHING_ITEM(state, id) {
      state.clothingItems = state.clothingItems.filter(item => item.id !== id);
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchClothingItems({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await api.getClothingItems();
        commit('SET_CLOTHING_ITEMS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch clothing items');
        console.error('Error fetching clothing items:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await api.getCategories();
        commit('SET_CATEGORIES', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch categories');
        console.error('Error fetching categories:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async addClothingItem({ commit }, item) {
      commit('SET_LOADING', true);
      try {
        const response = await api.createClothingItem(item);
        commit('ADD_CLOTHING_ITEM', response.data);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to add clothing item');
        console.error('Error adding clothing item:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async updateClothingItem({ commit }, { id, item }) {
      commit('SET_LOADING', true);
      try {
        const response = await api.updateClothingItem(id, item);
        commit('UPDATE_CLOTHING_ITEM', response.data);
        commit('SET_ERROR', null);
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to update clothing item');
        console.error('Error updating clothing item:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async deleteClothingItem({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await api.deleteClothingItem(id);
        commit('REMOVE_CLOTHING_ITEM', id);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to delete clothing item');
        console.error('Error deleting clothing item:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async searchClothingItems({ commit }, query) {
      commit('SET_LOADING', true);
      try {
        const response = await api.searchClothingItems(query);
        commit('SET_CLOTHING_ITEMS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to search clothing items');
        console.error('Error searching clothing items:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async filterClothingItems({ commit }, categoryId) {
      commit('SET_LOADING', true);
      try {
        const response = await api.filterClothingItems(categoryId);
        commit('SET_CLOTHING_ITEMS', response.data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to filter clothing items');
        console.error('Error filtering clothing items:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    allClothingItems: state => state.clothingItems,
    allCategories: state => state.categories,
    isLoading: state => state.loading,
    hasError: state => !!state.error,
    errorMessage: state => state.error
  }
};
