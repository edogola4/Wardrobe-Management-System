<!-- src/components/wardrobe/ClothingList.vue -->
<template>
    <div class="clothing-list">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading your wardrobe...</p>
      </div>
      
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchItems" class="retry-button">Try Again</button>
      </div>
      
      <div v-else-if="!items.length" class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
          </svg>
        </div>
        <h3>Your wardrobe is empty</h3>
        <p>Add your first clothing item to get started</p>
        <button @click="$emit('add-new')" class="add-item-button">
          Add Clothing Item
        </button>
      </div>
      
      <div v-else>
        <div class="list-header">
          <h2>Your Wardrobe <span class="item-count">({{ items.length }} items)</span></h2>
          <button @click="$emit('add-new')" class="add-button">
            + Add Item
          </button>
        </div>
        
        <div class="item-grid">
          <clothing-item 
            v-for="item in items" 
            :key="item.id" 
            :item="item"
            @edit="$emit('edit', item)"
            @deleted="handleDelete"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import ClothingItem from './ClothingItem.vue';
  
  export default {
    name: 'ClothingList',
    components: {
      ClothingItem
    },
    emits: ['add-new', 'edit'],
    setup() {
      const store = useStore();
      
      const items = computed(() => store.getters['wardrobe/allClothingItems']);
      const loading = computed(() => store.getters['wardrobe/isLoading']);
      const error = computed(() => store.getters['wardrobe/errorMessage']);
      
      const fetchItems = async () => {
        await store.dispatch('wardrobe/fetchClothingItems');
      };
      
      // eslint-disable-next-line no-unused-vars
      const handleDelete = (_itemId) => {
        // No need to do anything here as the item is removed from the store
        // We could trigger a notification or update to the parent if needed
      };
      
      onMounted(() => {
        fetchItems();
        store.dispatch('wardrobe/fetchCategories');
      });
      
      return {
        items,
        loading,
        error,
        fetchItems,
        handleDelete
      };
    }
  };
  </script>
  
  <style scoped>
  .clothing-list {
    min-height: 300px;
  }
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .list-header h2 {
    margin: 0;
    font-size: 22px;
    color: #333;
  }
  
  .item-count {
    color: #666;
    font-size: 16px;
    font-weight: normal;
  }
  
  .add-button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .add-button:hover {
    background-color: #388e3c;
  }
  
  .item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
  
  /* Empty state styles */
  .empty-state, .loading-state, .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 0;
    text-align: center;
  }
  
  .empty-icon, .loading-state .spinner {
    margin-bottom: 16px;
    color: #9e9e9e;
  }
  
  .empty-state h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 20px;
  }
  
  .empty-state p {
    margin: 0 0 24px 0;
    color: #666;
  }
  
  .add-item-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  /* Loading state styles */
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(76, 175, 80, 0.1);
    border-left-color: #4caf50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-state p {
    color: #666;
  }
  
  /* Error state styles */
  .error-state p {
    color: #f44336;
    margin-bottom: 16px;
  }
  
  .retry-button {
    padding: 8px 16px;
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  @media (max-width: 640px) {
    .item-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>