<!-- src/views/WardrobeView.vue -->
<template>
    <div class="wardrobe-view">
      <wardrobe-container />
    </div>
  </template>
  
  <script>
  import WardrobeContainer from '@/components/wardrobe/WardrobeContainer.vue';
  
  export default {
    name: 'WardrobeView',
    components: {
      WardrobeContainer
    }
  };
  </script>
  
  <style scoped>
  .wardrobe-view {
    min-height: 100vh;
    background-color: #f9f9f9;
  }
  </style>