/*import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
*/



import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './routes'
import Axios from 'axios'

loadFonts()

const app = createApp(App)
app.use(vuetify)
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