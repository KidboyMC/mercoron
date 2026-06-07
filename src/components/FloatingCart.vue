<template>
	<transition
		enter-active-class="transition ease-out duration-300"
		enter-from-class="opacity-0 translate-y-10"
		enter-to-class="opacity-100 translate-y-0"
		leave-active-class="transition ease-in duration-200"
		leave-from-class="opacity-100 translate-y-0"
		leave-to-class="opacity-0 translate-y-10"
	>
		<button
			v-if="cartCount > 0"
			@click="isCartOpen = true"
			:class="[
				'fixed bottom-8 right-8 z-40 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 transition-all duration-300 flex items-center justify-center',
				{ 'animate-bounce scale-110': isBumping },
			]"
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
				></path>
			</svg>

			<span
				:class="[
					'absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm transition-transform',
					{ 'scale-150': isBumping },
				]"
			>
				{{ cartCount }}
			</span>
		</button>
	</transition>
</template>

<script setup>
import { useCart } from '../composables/useCart';

const { cartCount, isCartOpen, isBumping } = useCart();
</script>
