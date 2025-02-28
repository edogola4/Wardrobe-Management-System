<!-- src/components/wardrobe/WardrobeContainer.vue -->
<template>
    <div class="wardrobe-container">
      <div class="wardrobe-header">
        <h1>My Wardrobe</h1>
        <p>Manage and organize your clothing items</p>
      </div>
      
      <div class="search-filter-container">
        <search-bar @search="handleSearch" />
        <category-filter @filter-change="handleCategoryFilter" />
      </div>
      
      <clothing-list 
        @add-new="showAddForm = true" 
        @edit="editClothingItem" 
      />
      
      <div v-if="showAddForm" class="modal-overlay" @click.self="showAddForm = false">
        <div class="modal-content">
          <add-clothing-item 
            :edit-item="currentEditItem" 
            @close="closeAddForm" 
            @saved="handleItemSaved" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import SearchBar from './SearchBar.vue';
  import CategoryFilter from './CategoryFilter.vue';
  import ClothingList from './ClothingList.vue';
  import AddClothingItem from './AddClothingItem.vue';
  
  export default {
    name: 'WardrobeContainer',
    components: {
      SearchBar,
      CategoryFilter,
      ClothingList,
      AddClothingItem
    },
    setup() {
      const store = useStore();
      const showAddForm = ref(false);
      const currentEditItem = ref(null);
      
      const handleSearch = (query) => {
        if (query) {
          store.dispatch('wardrobe/searchClothingItems', query);
        } else {
          store.dispatch('wardrobe/fetchClothingItems');
        }
      };
      
      const handleCategoryFilter = (categoryId) => {
        if (categoryId) {
          store.dispatch('wardrobe/filterClothingItems', categoryId);
        } else {
          store.dispatch('wardrobe/fetchClothingItems');
        }
      };
      
      const editClothingItem = (item) => {
        currentEditItem.value = item;
        showAddForm.value = true;
      };
      
      const closeAddForm = () => {
        showAddForm.value = false;
        currentEditItem.value = null;
      };
      
      const handleItemSaved = (item) => {
        // Could display a success message or do additional actions
        // For now, we'll just refresh the list
        store.dispatch('wardrobe/fetchClothingItems');
      };
      
      return {
        showAddForm,
        currentEditItem,
        handleSearch,
        handleCategoryFilter,
        editClothingItem,
        closeAddForm,
        handleItemSaved
      };
    }
  };
  </script>
  
  <style scoped>
  .wardrobe-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
  
  .wardrobe-header {
    margin-bottom: 32px;
    text-align: center;
  }
  
  .wardrobe-header h1 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 28px;
  }
  
  .wardrobe-header p {
    margin: 0;
    color: #666;
    font-size: 16px;
  }
  
  .search-filter-container {
    margin-bottom: 32px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  
  .modal-content {
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .wardrobe-header h1 {
      font-size: 24px;
    }
    
    .wardrobe-container {
      padding: 16px;
    }
  }
  </style>