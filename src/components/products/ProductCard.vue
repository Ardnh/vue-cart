<template>

    <div v-for="item in productsList" :key="item.id" @click="showDetailProduct(item)" class="card w-96 m-3 cursor-pointer bg-base-100 hover:bg-base-200 shadow-xl">
        <figure class="h-56 object-cover"><img :src="item.thumbnail" /></figure>
        <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <div class="text-xl p-5">$ {{ item.price }}</div> 
            <div class="badge badge-outline">{{ item.category }}</div> 
            <p>{{ item.description }}</p>
        </div>
    </div>
    
    <dialog v-if="selectedProduct !== null" :open="showModal" class="modal bg-modal">
        <DetailProduct 
            :isProductExist="isProductExist" 
            :isLoading="isLoading" 
            :product="selectedProduct" 
            @close-modal="closeModal"
            @add-to-cart="addToCart"/>
    </dialog>

</template>
<script setup>
import { computed, ref, reactive } from "vue";
import { useCartStore } from "../../store/useCart"
import DetailProduct from "./DetailProduct.vue"
const props = defineProps(["products"])
const cartStore = useCartStore()
const isLoading = ref(false)
const isProductExist = reactive({
    status: false,
    message: ""
})
const showModal = ref(false)
const selectedProduct = ref(null)

const closeModal = () => {
    console.log("close modal run")
    showModal.value = false
    isProductExist.status = false
    isProductExist.message = ""
}

const showDetailProduct = (data) => {

    let product = cartStore.getCartList.find(item => item.id === data.id)

    if (product) {
        isProductExist.status = true
        isProductExist.message = "This product is already exist on cart"
    }

    showModal.value = true
    selectedProduct.value = data
}

const addToCart = async (data, quantity) => {

    isLoading.value = true

    const cartItem = {
        id : data.id,
        title: data.title,
        price: data.price,
        quantity : quantity,
        total: data.price * quantity
    }

    await cartStore.addToCart(cartItem)
    isLoading.value = false
    showModal.value = false
    isProductExist.status = false
    isProductExist.message = ""
}

const productsList = computed(() => {
    return props.products
})

</script>
<style scoped>
.bg-modal {
  background-color: rgba(19, 23, 24, 0.4);
}
</style>