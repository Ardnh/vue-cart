<template>
    <header>
        <Navbar/>
    </header>
    <main>
        <slot/>
    </main>
    <footer>

    </footer>
</template>
<script setup>
import Navbar from '../components/global/Navbar.vue';
</script>