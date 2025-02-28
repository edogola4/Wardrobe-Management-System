<!-- src/components/wardrobe/ClothingItem.vue -->
<template>
    <div class="clothing-item">
      <div class="clothing-item-image">
        <img :src="item.image || getDefaultImage()" alt="Clothing item" @error="onImageError">
      </div>
      <div class="clothing-item-details">
        <h3>{{ item.name }}</h3>
        <p class="clothing-item-category">{{ getCategoryName(item.category_id) }}</p>
        <p v-if="item.description">{{ item.description }}</p>
        
        <div class="clothing-item-meta">
          <span class="clothing-item-color" :style="{ backgroundColor: item.color }"></span>
          <span v-if="item.season">Season: {{ item.season }}</span>
          <span v-if="item.brand">Brand: {{ item.brand }}</span>
        </div>
      </div>
      <div class="clothing-item-actions">
        <button @click="editItem" class="btn-edit">Edit</button>
        <button @click="confirmDelete" class="btn-delete">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  
  export default {
    name: 'ClothingItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    setup(props, { emit }) {
      const store = useStore();
      
      const categories = computed(() => store.getters['wardrobe/allCategories']);
      
      const getCategoryName = (categoryId) => {
        const category = categories.value.find(cat => cat.id === categoryId);
        return category ? category.name : 'Uncategorized';
      };
      
      const getDefaultImage = () => {
        return '/img/default-clothing.png';
      };
      
      const onImageError = (e) => {
        e.target.src = getDefaultImage();
      };
      
      const editItem = () => {
        emit('edit', props.item);
      };
      
      const confirmDelete = () => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItem();
        }
      };
      
      const deleteItem = async () => {
        try {
          await store.dispatch('wardrobe/deleteClothingItem', props.item.id);
          emit('deleted', props.item.id);
        } catch (error) {
          console.error('Failed to delete item:', error);
        }
      };
      
      return {
        getCategoryName,
        getDefaultImage,
        onImageError,
        editItem,
        confirmDelete
      };
    }
  };
  </script>
  
  <style scoped>
  .clothing-item {
    display: flex;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
  }
  
  .clothing-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .clothing-item-image {
    width: 120px;
    height: 120px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
  }
  
  .clothing-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .clothing-item-details {
    flex: 1;
    padding: 12px;
  }
  
  .clothing-item-details h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
  }
  
  .clothing-item-category {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }
  
  .clothing-item-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
    font-size: 14px;
    color: #666;
  }
  
  .clothing-item-color {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  
  .clothing-item-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 12px;
    gap: 8px;
  }
  
  .btn-edit, .btn-delete {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .btn-edit {
    background-color: #4caf50;
    color: white;
  }
  
  .btn-delete {
    background-color: #f44336;
    color: white;
  }
  
  @media (max-width: 640px) {
    .clothing-item {
      flex-direction: column;
    }
    
    .clothing-item-image {
      width: 100%;
      height: 180px;
    }
    
    .clothing-item-actions {
      flex-direction: row;
      padding: 12px;
    }
  }
  </style>