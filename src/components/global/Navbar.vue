<template>
    <div class="navbar bg-violet-700">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><router-link to="/">Products</router-link></li>
          <li><router-link to="/carts">Carts</router-link></li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl text-white">daisyUI</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 text-white font-bold text-xl">
        <li><router-link to="/">Products</router-link></li>
        <li><router-link to="/carts" class="indicator">
          <span class="indicator-item badge badge-white">{{ store.getCartLength }}</span> 
          Carts
        </router-link></li>
      </ul>
    </div>
    <div class="navbar-end">
    </div>
</div>
</template>
<script setup lang="ts">
import { useCartsStore } from '../../store/useCarts'
const store = useCartsStore()
</script>