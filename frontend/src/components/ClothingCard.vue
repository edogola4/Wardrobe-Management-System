<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          v-if="item.image_path" 
          :src="`http://localhost:8000/storage/${item.image_path}`" 
          :alt="item.name" 
          class="w-full h-full object-cover"
        >
        <div v-else