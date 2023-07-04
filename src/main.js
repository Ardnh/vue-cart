import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import { registerPlugins } from './plugins'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
console.log(import.meta.env.VITE_APP_MASTER_KEY)
console.log(import.meta.env.VITE_APP_ACCESS_KEY)
axios.defaults.headers.common["X-Access-Key"] = import.meta.env.VITE_APP_ACCESS_KEY
axios.defaults.headers.common["X-Master-Key"] = import.meta.env.VITE_APP_MASTER_KEY

registerPlugins(app)
app.mount('#app')
