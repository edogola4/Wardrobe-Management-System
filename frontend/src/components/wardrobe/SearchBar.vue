<!-- src/components/wardrobe/SearchBar.vue -->
<template>
    <div class="search-bar">
      <div class="search-input-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search your wardrobe..."
          @input="debounceSearch"
        >
        <button v-if="searchQuery" @click="clearSearch" class="clear-button">×</button>
        <button class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'SearchBar',
    emits: ['search'],
    setup(props, { emit }) {
      const searchQuery = ref('');
      let debounceTimeout = null;
      
      const debounceSearch = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          emit('search', searchQuery.value);
        }, 300);
      };
      
      const clearSearch = () => {
        searchQuery.value = '';
        emit('search', '');
      };
      
      // Clean up the debounce timeout when component is unmounted
      watch(() => searchQuery.value, (newVal) => {
        if (newVal === '') {
          emit('search', '');
        }
      });
      
      return {
        searchQuery,
        debounceSearch,
        clearSearch
      };
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    margin-bottom: 24px;
  }
  
  .search-input-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  input {
    flex: 1;
    padding: 12px 40px 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  
  input:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  }
  
  .clear-button {
    position: absolute;
    right: 40px;
    background: none;
    border: none;
    font-size: 20px;
    color: #999;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  
  .clear-button:hover {
    color: #333;
    background-color: #f0f0f0;
  }
  
  .search-button {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: #4caf50;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 640px) {
    input {
      padding: 10px 40px 10px 12px;
      font-size: 14px;
    }
  }
  </style>