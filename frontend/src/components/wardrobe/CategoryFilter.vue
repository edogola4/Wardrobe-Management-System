<!-- src/components/wardrobe/CategoryFilter.vue -->
<template>
    <div class="category-filter">
      <h3>Categories</h3>
      <div class="category-list">
        <button 
          class="category-item" 
          :class="{ active: selectedCategory === null }"
          @click="selectCategory(null)"
        >
          All Items
        </button>
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-item"
          :class="{ active: selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
          <span class="category-count">{{ getCategoryCount(category.id) }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'CategoryFilter',
    emits: ['filter-change'],
    setup(props, { emit }) {
      const store = useStore();
      const selectedCategory = ref(null);
      
      const categories = computed(() => store.getters['wardrobe/allCategories']);
      const clothingItems = computed(() => store.getters['wardrobe/allClothingItems']);
      
      const getCategoryCount = (categoryId) => {
        return clothingItems.value.filter(item => item.category_id === categoryId).length;
      };
      
      const selectCategory = (categoryId) => {
        selectedCategory.value = categoryId;
        emit('filter-change', categoryId);
      };
      
      return {
        categories,
        selectedCategory,
        getCategoryCount,
        selectCategory
      };
    }
  };
  </script>
  
  <style scoped>
  .category-filter {
    margin-bottom: 24px;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 18px;
    color: #333;
  }
  
  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .category-item {
    padding: 8px 16px;
    border-radius: 20px;
    background-color: #f5f5f5;
    border: 1px solid #eaeaea;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
  }
  
  .category-item:hover {
    background-color: #e0e0e0;
  }
  
  .category-item.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
  
  .category-count {
    margin-left: 6px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 12px;
  }
  
  .category-item.active .category-count {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 640px) {
    .category-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>