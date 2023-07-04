<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>
<script setup>
import { onMounted } from 'vue';
import Layout from './layout/Layout.vue'
import { useCartStore } from './store/useCart'
const store = useCartStore()

onMounted(() => {
  store.getCart()
})
</script>
