<!-- src/components/ClothingCard.vue -->
<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div class="relative">
        <img 
          :src="imageUrl" 
          :alt="item.name"
          class="w-full h-48 object-cover"
        />
        <button 
          @click.stop="toggleFavorite" 
          class="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm"
          :class="{ 'text-red-500': item.favorite, 'text-gray-400': !item.favorite }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
          <span 
            class="inline-block px-2 py-1 text-xs font-medium rounded-full"
            :style="{ backgroundColor: getColorBackground(item.color), color: getContrastColor(item.color) }"
          >
            {{ item.color }}
          </span>
        </div>
        
        <div class="mb-2 text-sm text-gray-500">
          <span class="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md mr-2">
            {{ getCategoryName(item.category_id) }}
          </span>
          <span v-if="item.size" class="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-md">
            Size: {{ item.size }}
          </span>
        </div>
        
        <p v-if="item.brand" class="mb-2 text-sm text-gray-700">
          <span class="font-medium">Brand:</span> {{ item.brand }}
        </p>
        
        <p v-if="item.description" class="mb-4 text-sm text-gray-600 line-clamp-2">
          {{ item.description }}
        </p>
        
        <div class="flex justify-between mt-4">
          <router-link :to="{ name: 'item-details', params: { id: item.id }}" class="text-indigo-600 hover:text-indigo-800">
            View Details
          </router-link>
          <div class="flex space-x-2">
            <router-link :to="{ name: 'edit-item', params: { id: item.id }}" class="text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </router-link>
            <button @click.stop="confirmDelete" class="text-red-600 hover:text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
          <p class="mb-4">Are you sure you want to delete "{{ item.name }}"? This action cannot be undone.</p>
          <div class="flex justify-end space-x-3">
            <button 
              @click="showDeleteModal = false" 
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button 
              @click="deleteItem" 
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useClothingStore } from '@/stores/clothing'
  import { useCategoryStore } from '@/stores/category'
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['deleted'])
  
  const clothingStore = useClothingStore()
  const categoryStore = useCategoryStore()
  const showDeleteModal = ref(false)
  
  // Compute the image URL, fallback to a placeholder if none exists
  const imageUrl = computed(() => {
    if (props.item.image_path) {
      return `${import.meta.env.VITE_API_URL}/storage/${props.item.image_path}`
    }
    return `https://via.placeholder.com/300x200?text=${encodeURIComponent(props.item.name)}`
  })
  
  // Get category name from category ID
  const getCategoryName = (categoryId) => {
    const category = categoryStore.categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Uncategorized'
  }
  
  // Get a color background based on the item color
  const getColorBackground = (color) => {
    // Simple function to determine a color-appropriate background
    const colorMap = {
      'black': '#333',
      'white': '#f8f8f8',
      'red': '#f87171',
      'blue': '#60a5fa',
      'green': '#4ade80',
      'yellow': '#fbbf24',
      'purple': '#a78bfa',
      'pink': '#f472b6',
      'orange': '#fb923c',
      'gray': '#9ca3af',
      'brown': '#92400e',
      'beige': '#e5e7eb',
    }
    
    // Try to match color name first, fallback to the color itself
    return colorMap[color.toLowerCase()] || color
  }
  
  // Get contrasting text color (white or black) based on background color
  const getContrastColor = (color) => {
    // Simple contrast determination based on common colors
    const darkColors = ['black', 'blue', 'purple', 'brown', 'green', 'red']
    
    if (darkColors.includes(color.toLowerCase())) {
      return '#ffffff' // White text for dark backgrounds
    }
    
    return '#000000' // Black text for light backgrounds
  }
  
  // Toggle favorite status
  const toggleFavorite = async () => {
    try {
      await clothingStore.toggleItemFavorite(props.item.id)
    } catch (error) {
      console.error('Error toggling favorite status:', error)
    }
  }
  
  // Show delete confirmation modal
  const confirmDelete = () => {
    showDeleteModal.value = true
  }
  
  // Delete item after confirmation
  const deleteItem = async () => {
    try {
      await clothingStore.deleteItem(props.item.id)
      showDeleteModal.value = false
      emit('deleted', props.item.id)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>