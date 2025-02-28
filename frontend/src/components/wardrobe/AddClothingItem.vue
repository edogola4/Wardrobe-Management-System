<!-- src/components/wardrobe/AddClothingItem.vue -->
<template>
    <div class="add-clothing-item">
      <h2>{{ isEditing ? 'Edit Clothing Item' : 'Add New Clothing Item' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required 
            placeholder="E.g., Blue Denim Jacket"
          >
        </div>
        
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="form.category_id" required>
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="description">Description (Optional)</label>
          <textarea 
            id="description" 
            v-model="form.description" 
            placeholder="Add a short description..."
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="color">Color</label>
            <input type="color" id="color" v-model="form.color">
          </div>
          
          <div class="form-group">
            <label for="season">Season (Optional)</label>
            <select id="season" v-model="form.season">
              <option value="">Any Season</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="All Seasons">All Seasons</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="brand">Brand (Optional)</label>
            <input 
              type="text" 
              id="brand" 
              v-model="form.brand" 
              placeholder="E.g., Nike, Zara"
            >
          </div>
          
          <div class="form-group">
            <label for="purchase_date">Purchase Date (Optional)</label>
            <input type="date" id="purchase_date" v-model="form.purchase_date">
          </div>
        </div>
        
        <div class="form-group">
          <label for="image">Image (Optional)</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*">
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Preview">
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="cancelForm" class="btn-cancel">Cancel</button>
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Item' : 'Add Item') }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'AddClothingItem',
    props: {
      editItem: {
        type: Object,
        default: null
      }
    },
    emits: ['close', 'saved'],
    setup(props, { emit }) {
      const store = useStore();
      const isSubmitting = ref(false);
      const imagePreview = ref(null);
      
      // Form data
      const form = reactive({
        name: '',
        category_id: '',
        description: '',
        color: '#000000',
        season: '',
        brand: '',
        purchase_date: '',
        image: null
      });
      
      // Computed properties
      const isEditing = computed(() => !!props.editItem);
      const categories = computed(() => store.getters['wardrobe/allCategories']);
      
      // Methods
      const resetForm = () => {
        Object.keys(form).forEach(key => {
          form[key] = key === 'color' ? '#000000' : '';
        });
        imagePreview.value = null;
      };
      
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        form.image = file;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = e => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      };
      
      const submitForm = async () => {
        try {
          isSubmitting.value = true;
          
          // Create FormData for file upload
          const formData = new FormData();
          Object.keys(form).forEach(key => {
            if (form[key] !== null && form[key] !== '') {
              formData.append(key, form[key]);
            }
          });
          
          let result;
          if (isEditing.value) {
            result = await store.dispatch('wardrobe/updateClothingItem', { 
              id: props.editItem.id,
              item: formData
            });
          } else {
            result = await store.dispatch('wardrobe/addClothingItem', formData);
          }
          
          emit('saved', result);
          resetForm();
          emit('close');
        } catch (error) {
          console.error('Error saving clothing item:', error);
          alert('Failed to save the clothing item. Please try again.');
        } finally {
          isSubmitting.value = false;
        }
      };
      
      const cancelForm = () => {
        resetForm();
        emit('close');
      };
      
      // Watchers
      watch(() => props.editItem, (newVal) => {
        if (newVal) {
          // Populate form with edit data
          Object.keys(form).forEach(key => {
            if (key !== 'image' && newVal[key] !== undefined) {
              form[key] = newVal[key];
            }
          });
          
          // Set image preview if available
          imagePreview.value = newVal.image || null;
        } else {
          resetForm();
        }
      }, { immediate: true });
      
      // Load categories on mounted if needed
      onMounted(async () => {
        if (categories.value.length === 0) {
          await store.dispatch('wardrobe/fetchCategories');
        }
      });
      
      return {
        form,
        isEditing,
        isSubmitting,
        imagePreview,
        categories,
        handleImageUpload,
        submitForm,
        cancelForm
      };
    }
  };
  </script>
  
  <style scoped>
  .add-clothing-item {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 24px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: #333;
    font-size: 20px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }
  
  .form-row .form-group {
    flex: 1;
    margin-bottom: 0;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #333;
  }
  
  input[type="text"],
  input[type="date"],
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  input[type="color"] {
    width: 100%;
    height: 42px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 2px;
  }
  
  .image-preview {
    margin-top: 8px;
    width: 100%;
    max-height: 200px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
  
  .btn-submit, .btn-cancel {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-submit {
    background-color: #4caf50;
    color: white;
  }
  
  .btn-submit:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
  
  .btn-cancel {
    background-color: #f5f5f5;
    color: #333;
  }
  
  @media (max-width: 640px) {
    .form-row {
      flex-direction: column;
      gap: 16px;
    }
  }
  </style>