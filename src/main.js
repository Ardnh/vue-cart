import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import { registerPlugins } from './plugins'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
axios.defaults.headers.common["X-Master-Key"] = "$2b$10$5viUn8MJPVqcSZFsyVyPIuMKzRz5IpGtapcXRSzGoT6HuOr5uJaeW"
axios.defaults.headers.common["X-Access-Key"] = "64a3d7b5b89b1e2299b980d2"
// Import meta error on deployment
// axios.defaults.headers.common["X-Master-Key"] = import.meta.env.VITE_APP_MASTER_API_KEY
// axios.defaults.headers.common["X-Access-Key"] = import.meta.env.VITE_APP_ACCESS_API_KEY

registerPlugins(app)

app.mount('#app')
