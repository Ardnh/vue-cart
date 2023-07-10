<template>
    <div class="text-center text-5xl my-20 font-semibold">Cart</div>
    <div v-if="isLoading" class="flex flex-wrap items-center justify-center w-full h-56">
        <span class="loading loading-ring loading-lg"></span>
        <p class="mx-3 text-xl">Loading cart...</p> 
    </div>
    <div v-else class="flex flex-wrap justify-center">
        <CartItem :carts="store.getCartList" @updated-cart="updateCart"/>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import CartItem from "../components/cart/CartItem.vue";
import { useCartsStore } from "../store/useCarts"
import { Cart } from "../model/carts";
const store = useCartsStore()

const isLoading = ref(false)

const updateCart = (data: Cart[]) => {
    store.updateCart(data)
}

onMounted(async () => {
    isLoading.value = true
    await store.getCart()
        .then(() => isLoading.value = false)
        .catch(() => isLoading.value = false)
})
</script>