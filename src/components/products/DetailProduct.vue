<template>
    <div class="modal-box w-11/12 max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div>
                <img :src="productItem.thumbnail" alt="">
            </div>
            <div class="p-7">
                <h2 class="font-bold text-xl">{{ productItem.title }}</h2>
                <p>{{ productItem.description }}</p>
                <div class="bg-violet-200 rounded-md my-2 p-5  shadow-sm">
                    <div class="flex flex-wrap justify-between">
                        <div class="font-bold text-xl">$ {{ productItem.price }}</div>
                        <div class="font-bold text-lg">Stock {{ productItem.stock }}</div>
                    </div>
                    <div class="flex flex-wrap mt-4 justify-center items-center">
                        <div class="mr-3">Quantity</div>
                        <input :disabled="props.isProductExist.status" type="number" min="1" v-model="quantity" :max="productItem.stock" placeholder="Type here" class="input w-3/4" />
                    </div>
                    <small class="text-red-700" v-if="props.isProductExist.status">{{ props.isProductExist.message }}</small>
                    <h2 class="mt-3 font-bold">Total ${{ totalPrice }}</h2>
                </div>
            </div>
        </div>
            <div class="modal-action">
                <button :disabled="props.isProductExist.status" @click="$emit('addToCart', productItem, quantity)" class="btn bg-violet-700 text-white">
                    <span v-if="props.isLoading" class="loading loading-spinner"></span>
                    Add to cart
                </button>
                <button @click="$emit('closeModal')" class="btn">Close</button>
            </div>
        </div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps(["product", "isLoading", "isProductExist"])
const emit = defineEmits(["closeModal", "addToCart"])
const quantity = ref(1)

const productItem = computed(() => {
    return props.product
})

const totalPrice = computed(() => {
    return quantity.value*props.product.price
})
</script>