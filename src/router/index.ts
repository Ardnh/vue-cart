import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name:"products",
        components: {
            default : () => import("../view/ProductsView.vue")
        } 
    },
    {
        path: "/carts",
        name: "carts",
        components: {
            default: () => import("../view/CartView.vue")
        }
    }
] 

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router