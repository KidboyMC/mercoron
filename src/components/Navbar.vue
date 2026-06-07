<template>
	<nav
		class="container mx-auto px-6 py-6 flex justify-between items-center relative z-10"
	>
		<div class="flex items-center space-x-2">
			<div
				class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold italic"
			>
				M!
			</div>
			<span class="text-2xl font-extrabold tracking-tight"
				>Mercoron!</span
			>
		</div>

		<ul
			class="hidden md:flex space-x-8 text-sm font-semibold text-[#4A3B32]"
		>
			<li>
				<router-link
					to="/"
					class="hover:text-orange-500 transition"
					active-class="text-orange-500"
					>Beranda</router-link
				>
			</li>
			<li>
				<router-link
					to="/products"
					class="hover:text-orange-500 transition"
					active-class="text-orange-500"
					>Semua Menu</router-link
				>
			</li>
			<li>
				<router-link
					:to="{ path: '/', hash: '#about' }"
					class="hover:text-orange-500 transition"
					>Tentang Kami</router-link
				>
			</li>
			<li>
				<router-link
					:to="{ path: '/', hash: '#contact' }"
					class="hover:text-orange-500 transition"
					>Hubungi Admin</router-link
				>
			</li>
		</ul>

		<div class="flex items-center space-x-4">
			<form
				@submit.prevent="handleSearch"
				class="hidden lg:flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
			>
				<button
					type="submit"
					class="text-gray-400 hover:text-orange-500 transition"
				>
					<svg
						class="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</button>
				<input
					v-model="searchInput"
					type="text"
					placeholder="Cari cemilan..."
					class="ml-2 bg-transparent outline-none text-sm w-32 focus:w-48 transition-all duration-300"
				/>
			</form>

			<button
				@click="isCartOpen = true"
				class="relative p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
			>
				<svg
					class="w-5 h-5 text-gray-700"
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
					v-if="cartCount > 0"
					class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white"
				>
					{{ cartCount }}
				</span>
			</button>
		</div>
	</nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';

const { isCartOpen, cartCount } = useCart();
const router = useRouter();
const searchInput = ref('');

const handleSearch = () => {
	if (searchInput.value.trim()) {
		// Move to products page with the keyword
		router.push({
			path: '/products',
			query: { q: searchInput.value.trim() },
		});
		// Clear input after search
		searchInput.value = '';
	}
};
</script>
