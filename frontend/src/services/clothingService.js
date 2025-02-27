import api from './api';

export const getClothingItems = async (params = {}) => {
  const response = await api.get('/clothing-items', { params });
  return response.data;
};

export const getClothingItem = async (id) => {
  const response = await api.get(`/clothing-items/${id}`);
  return response.data;
};

export const createClothingItem = async (itemData) => {
  // Use FormData for file uploads
  const formData = new FormData();
  
  Object.keys(itemData).forEach(key => {
    if (key === 'image' && itemData[key]) {
      formData.append(key, itemData[key]);
    } else if (itemData[key] !== null && itemData[key] !== undefined) {
      formData.append(key, itemData[key]);
    }
  });
  
  const response = await api.post('/clothing-items', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const updateClothingItem = async (id, itemData) => {
  // Use FormData for file uploads
  const formData = new FormData();
  
  Object.keys(itemData).forEach(key => {
    if (key === 'image' && itemData[key]) {
      formData.append(key, itemData[key]);
    } else if (itemData[key] !== null && itemData[key] !== undefined) {
      formData.append(key, itemData[key]);
    }
  });
  
  formData.append('_method', 'PUT'); // Laravel form method spoofing
  
  const response = await api.post(`/clothing-items/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const deleteClothingItem = async (id) => {
  const response = await api.delete(`/clothing-items/${id}`);
  return response.data;
};

export const toggleFavorite = async (id) => {
  const response = await api.patch(`/clothing-items/${id}/toggle-favorite`);
  return response.data;
};