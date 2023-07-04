import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import CartView from "../views/CartView.vue"

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: "/carts",
    component: CartView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
