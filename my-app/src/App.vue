<template>
  <div id="app">
      <v-app>
          <router-view/>
      </v-app>
  </div>
</template>

<script>
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes'

createApp(App).use(vuetify).use(router).mount('#app')
</script>