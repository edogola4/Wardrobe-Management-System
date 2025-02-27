<!-- src/components/FilterSidebar.vue -->
<template>
    <aside class="w-full md:w-64 bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-bold mb-4 text-gray-800">Filters</h2>
      
      <!-- Search input -->
      <div class="mb-6">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          placeholder="Search items..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          @input="debounceSearch"
        />
      </div>
      
      <!-- Category filter -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div class="space-y-2">
          <div class="flex items-center">
            <input
              type="radio"
              id="category-all"
              name="category"
              :checked="selectedCategory === null"
              @change="setCategory(null)"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="category-all" class="ml-2 text-sm text-gray-700">All Categories</label>
          </div>
          
          <div 
            v-for="category in categories" 
            :key="category.id" 
            class="flex items-center"
          >
            <input
              type="radio"
              :id="`category-${category.id}`"
              name="category"
              :checked="selectedCategory === category.id"
              @change="setCategory(category.id)"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label :for="`category-${category.id}`" class="ml-2 text-sm text-gray-700">{{ category.name }}</label>
          </div>
        </div>
      </div>
      
      <!-- Favorite filter -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <div class="space-y-2">
          <div class="flex items-center">
            <input
              type="radio"
              id="favorite-all"
              name="favorite"
              :checked="favoriteFilter === null"
              @change="setFavoriteFilter(null)"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="favorite-all" class="ml-2 text-sm text-gray-700">All Items</label>
          </div>
          
          <div class="flex items-center">
            <input
              type="radio"
              id="favorite-true"
              name="favorite"
              :checked="favoriteFilter === true"
              @change="setFavoriteFilter(true)"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="favorite-true" class="ml-2 text-sm text-gray-700">Favorites Only</label>
          </div>
          
          <div class="flex items-center">
            <input
              type="radio"
              id="favorite-false"
              name="favorite"
              :checked="favoriteFilter === false"
              @change="setFavoriteFilter(false)"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="favorite-false" class="ml-2 text-sm text-gray-700">Non-Favorites</label>
          </div>
        </div>
      </div>
      
      <!-- Reset filters button -->
      <button
        @click="resetFilters"
        class="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium transition"
      >
        Reset Filters
      </button>
    </aside>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useCategoryStore } from '@/stores/category'
  import { useClothingStore } from '@/stores/clothing'
  import { debounce } from '@/utils/helpers'
  
  const categoryStore = useCategoryStore()
  const clothingStore = useClothingStore()
  
  // Local state for form values
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const favoriteFilter = ref(null)
  
  // Get categories from store
  const categories = computed(() => categoryStore.categories)
  
  // Set up debounced search
  const debounceSearch = debounce(() => {
    applyFilters()
  }, 300)
  
  // Watch for store filter changes and update local state
  watch(() => clothingStore.filters, (newFilters) => {
    searchQuery.value = newFilters.search || ''
    selectedCategory.value = newFilters.category
    favoriteFilter.value = newFilters.favorite
  }, { deep: true })
  
  // Set category filter
  const setCategory = (categoryId) => {
    selectedCategory.value = categoryId
    applyFilters()
  }
  
  // Set favorite filter
  const setFavoriteFilter = (value) => {
    favoriteFilter.value = value
    applyFilters()
  }
  
  // Apply all filters to the store
  const applyFilters = () => {
    clothingStore.setFilter('search', searchQuery.value)
    clothingStore.setFilter('category', selectedCategory.value)
    clothingStore.setFilter('favorite', favoriteFilter.value)
    
    // Emit event to parent component
    emit('filters-applied')
  }
  
  // Reset all filters
  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    favoriteFilter.value = null
    clothingStore.clearFilters()
    
    // Emit event to parent component
    emit('filters-applied')
  }
  
  // Fetch categories on component mount
  onMounted(async () => {
    if (categories.value.length === 0) {
      await categoryStore.fetchCategories()
    }
  })
  
  // Define emits
  const emit = defineEmits(['filters-applied'])
  </script>