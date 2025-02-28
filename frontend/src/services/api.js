// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Your Laravel backend URL
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include auth token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Clothing items
  getClothingItems() {
    return apiClient.get('/clothing-items');
  },
  getClothingItem(id) {
    return apiClient.get(`/clothing-items/${id}`);
  },
  createClothingItem(item) {
    return apiClient.post('/clothing-items', item);
  },
  updateClothingItem(id, item) {
    return apiClient.put(`/clothing-items/${id}`, item);
  },
  deleteClothingItem(id) {
    return apiClient.delete(`/clothing-items/${id}`);
  },
  
  // Categories
  getCategories() {
    return apiClient.get('/categories');
  },
  
  // Search and filter
  searchClothingItems(query) {
    return apiClient.get(`/clothing-items/search?q=${query}`);
  },
  filterClothingItems(categoryId) {
    return apiClient.get(`/clothing-items?category=${categoryId}`);
  }
};