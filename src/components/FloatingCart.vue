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
			<component
				:is="HeroIcons.ShoppingCartIcon"
				class="w-6 h-6"
			/>

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
import * as HeroIcons from '@heroicons/vue/24/solid';

const { cartCount, isCartOpen, isBumping } = useCart();
</script>
