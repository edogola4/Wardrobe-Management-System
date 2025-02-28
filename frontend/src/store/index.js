
// src/store/index.js
import { createStore } from 'vuex';
import wardrobeModule from './modules/wardrobe';

export default createStore({
  modules: {
    wardrobe: wardrobeModule
  }
});