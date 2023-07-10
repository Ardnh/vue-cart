<template>
    <header>
        <Navbar/>
    </header>
    <main>
        <slot/>
    </main>
    <footer>
        <Footer/>
    </footer>
</template>
<script setup lang="ts">
import Navbar from "../components/global/Navbar.vue"
import Footer from "../components/global/Footer.vue"
</script>