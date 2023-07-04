<template>
    <div v-for="(item, index) in cartList" :key="index" class="card bg-violet-700 w-96 m-3 text-primary-content">
        <div class="card-body">
            <h2 class="card-title text-white">{{item.title}}</h2>
            <div class="flex flex-wrap justify-around items-center">
                <div class="text-lg font-medium text-white">Quantity</div>
                <input @input="updateCart(item.id, item.quantity)"  v-model="item.quantity" type="number" placeholder="Quantity" class="input" />
            </div>
            <p class="text-white text-lg">Price - $ {{ item.price }}</p>
            <h2 class="text-white text-lg">Total ${{ item.price*item.quantity }}</h2>
            <div class="card-actions justify-end">
                <button @click="deleteCart(item.id)" class="btn bg-violet-900 border-none text-white">
                    <span v-if="props.isDeleteLoading" class="loading loading-spinner"></span>
                    Delete
                </button>
                <button class="btn">Buy Now</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useCartStore } from '../../store/useCart'
const props = defineProps(["carts", "isDeleteLoading"])
const emit = defineEmits(['updatedCart', 'deleteCart'])
const store = useCartStore()


const updateCart = (id, q) => {
    let updatedCart = store.getCartList.map(item => {
        if ( item.id === id ) {
            return { ...item, quantity: q, price: item.price }
        }

        return item
    })

    emit("updatedCart", updatedCart)
}

const deleteCart = (id) => {
    emit("deleteCart", id)
}

const cartList = computed(() => {
    return props.carts
})

</script>