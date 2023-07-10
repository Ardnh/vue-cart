<template>
    <div class="text-center text-5xl my-20 font-semibold">Product Repository</div>
    <div v-if="isLoading" class="flex flex-wrap items-center justify-center w-full h-56">
        <span class="loading loading-ring loading-lg"></span>
        <p class="mx-3 text-xl">Loading product...</p> 
    </div>
    <div v-else class="flex flex-wrap justify-center w-full">
        <ProductCard :products="productsStore.getProductsList"></ProductCard>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductsStore } from '../store/useProducts'
import { useCartsStore } from "../store/useCarts"
import ProductCard from '../components/products/ProductCard.vue';

const productsStore = useProductsStore()
const cartStore = useCartsStore()

const isLoading =  ref(false)

onMounted(async () => {
    isLoading.value = true
    Promise.all([productsStore.getAllProducts(), cartStore.getCart()])
        .then(() => isLoading.value = false)
        .catch(() => isLoading.value = false)
})

</script>