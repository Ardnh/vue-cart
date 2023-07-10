<template>
    <div v-for="(item) in cartList" :key="item.id" class="card bg-violet-700 w-96 m-3 text-primary-content">
        <div class="card-body">
            <h2 class="card-title text-white">{{item.title}}</h2>
            <div class="flex flex-wrap justify-around items-center">
                <div class="text-lg font-medium text-white">Quantity</div>
                <input @input="updateCart(item.id, item.quantity)"  v-model="item.quantity" type="number" placeholder="Quantity" class="input" />
            </div>
            <p class="text-white text-lg">Price - $ {{ item.price }}</p>
            <h2 class="text-white text-lg">Total ${{ item.price*item.quantity }}</h2>
            <div class="card-actions justify-end">
                <button @click="showSelectedCart(item)" class="btn bg-violet-900 border-none text-white">
                    Delete
                </button>
                <button class="btn">Buy Now</button>
            </div>
        </div>
    </div>
    <dialog class="modal bg-modal" :open="isModalOpen">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Delete {{ selectedCart?.title }} from cart</h3>
            <p class="py-4">Are you sure you want to delete this cart?</p>
            <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button @click="deleteCart" class="btn bg-red-700 text-white">
                <span v-if="isDeleteLoading" class="loading loading-spinner"></span>
                Delete
            </button>
            <button @click="closeModal" class="btn">Close</button>
            </div>
        </form>
    </dialog>
</template>
<script setup lang="ts">
import { Cart } from '../../model/carts';
import { computed, ref } from 'vue';
import { useCartsStore } from '../../store/useCarts'
const props = defineProps(["carts", "isDeleteLoading"])
const emit = defineEmits(['updatedCart'])
const store = useCartsStore()

const isDeleteLoading = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)

const selectedCart = ref<Cart | null>(null)

const updateCart = (id:number, q:number) => {
    let updatedCart = store.getCartList?.map(item => {
        if ( item.id === id ) {
            return { ...item, quantity: q, price: item.price }
        }

        return item
    })

    emit("updatedCart", updatedCart)
}

const closeModal = () => {
    isModalOpen.value = false
    selectedCart.value = null
}

const showSelectedCart = (item: Cart) => {
    isModalOpen.value = true
    selectedCart.value = item
}

const deleteCart = async () => {
    isDeleteLoading.value = true
    let cartId = selectedCart.value?.id
    if(cartId !== undefined) {
        await store.removeFromCart(cartId)
            .then(() => {
                selectedCart.value = null
                isDeleteLoading.value = false
                isModalOpen.value = false
            })
            .catch(() => {
                selectedCart.value = null
                isDeleteLoading.value = false
                isModalOpen.value = false
            })
    }
}

const cartList = computed(() => {
    return props.carts
})

</script>
<style scoped>
.bg-modal {
  background-color: rgba(19, 23, 24, 0.4);
}
</style>