/*import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
*/


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

const app = createApp(App)
app.use(router)
app.mount('#app')

Axios.defaults.baseURL = 'http://localhost:8000'
Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})