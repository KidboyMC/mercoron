<template>
	<div class="bg-[#FCF8F4] min-h-screen font-sans text-[#3A2A20] relative">
		<Navbar />

		<router-view />

		<CartSidebar />
		<FloatingCart />
	</div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import CartSidebar from './components/CartSidebar.vue';
import FloatingCart from './components/FloatingCart.vue';
</script>
