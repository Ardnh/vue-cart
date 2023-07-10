import { createApp } from 'vue'
import axios from 'axios'
import './style.css'
import App from './App.vue'
import { registerPlugins } from "./plugins/index"

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
axios.defaults.headers.common["X-Master-Key"] = "$2b$10$5viUn8MJPVqcSZFsyVyPIuMKzRz5IpGtapcXRSzGoT6HuOr5uJaeW"
axios.defaults.headers.common["X-Access-Key"] = "64a3d7b5b89b1e2299b980d2"

registerPlugins(app)
app.mount('#app')
