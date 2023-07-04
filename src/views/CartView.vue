<template>
    <div class="text-center text-5xl my-20 font-semibold">Cart</div>
    <div v-if="isLoading" class="flex flex-wrap items-center justify-center w-full h-56">
        <span class="loading loading-ring loading-lg"></span>
        <p class="mx-3 text-xl">Loading cart...</p> 
    </div>
    <div v-else class="flex flex-wrap justify-center">
        <CartItem :is-delete-loading="isDeleteLoading" :carts="store.getCartList" @updated-cart="updateCart" @delete-cart="deleteCart"/>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import CartItem from "../components/carts/CartItem.vue";
import { useCartStore } from "../store/useCart"
const store =  useCartStore()

const isLoading = ref(false)
const isDeleteLoading = ref(false)

const updateCart = (data) => {
    store.updateCart(data)
}

const deleteCart = async (id) => {
    isDeleteLoading.value = true
    await store.removeCart(id)
        .then(() => isDeleteLoading.value = false)
        .catch(() => isDeleteLoading.value = false)
}

onMounted(async () => {
    isLoading.value = true
    await store.getCart()
        .then(() => isLoading.value = false)
        .catch(() => isLoading.value = false)
})

</script>