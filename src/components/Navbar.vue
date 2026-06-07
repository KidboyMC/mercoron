<template>
	<nav class="container mx-auto px-6 py-6 relative z-50">
		<div class="flex justify-between items-center">
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

			<div class="flex items-center space-x-3 md:space-x-4">
				<form
					@submit.prevent="handleSearch"
					class="hidden lg:flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
				>
					<button
						type="submit"
						class="text-gray-400 hover:text-orange-500 transition"
					>
						<component
							:is="HeroIcons.MagnifyingGlassIcon"
							class="w-5 h-5 text-gray-700"
						/>
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
					<component
						:is="HeroIcons.ShoppingCartIcon"
						class="w-5 h-5 text-gray-700"
					/>
					<span
						v-if="cartCount > 0"
						class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white"
					>
						{{ cartCount }}
					</span>
				</button>

				<button
					@click="isMobileMenuOpen = !isMobileMenuOpen"
					class="md:hidden p-2 text-[#3A2A20] hover:text-orange-500 transition focus:outline-none"
				>
					<component
						:is="HeroIcons.Bars3Icon"
						class="w-5 h-5 text-gray-700"
					/>
				</button>
			</div>
		</div>

		<transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="opacity-0 -translate-y-4"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 -translate-y-4"
		>
			<div
				v-if="isMobileMenuOpen"
				class="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-3xl border-t border-gray-50 py-5 px-6 flex flex-col space-y-4 text-base font-bold text-[#4A3B32]"
			>
				<router-link
					to="/"
					@click="isMobileMenuOpen = false"
					class="hover:text-orange-500 transition block border-b border-gray-50 pb-2"
					active-class="text-orange-500"
					>Beranda</router-link
				>
				<router-link
					to="/products"
					@click="isMobileMenuOpen = false"
					class="hover:text-orange-500 transition block border-b border-gray-50 pb-2"
					active-class="text-orange-500"
					>Semua Menu</router-link
				>
				<router-link
					:to="{ path: '/', hash: '#about' }"
					@click="isMobileMenuOpen = false"
					class="hover:text-orange-500 transition block border-b border-gray-50 pb-2"
					>Tentang Kami</router-link
				>
				<router-link
					:to="{ path: '/', hash: '#contact' }"
					@click="isMobileMenuOpen = false"
					class="hover:text-orange-500 transition block"
					>Hubungi Admin</router-link
				>
			</div>
		</transition>
	</nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import * as HeroIcons from '@heroicons/vue/24/solid';

const { isCartOpen, cartCount } = useCart();
const router = useRouter();
const searchInput = ref('');

// State untuk mengatur buka/tutup menu di HP
const isMobileMenuOpen = ref(false);

const handleSearch = () => {
	if (searchInput.value.trim()) {
		router.push({
			path: '/products',
			query: { q: searchInput.value.trim() },
		});
		searchInput.value = '';
	}
};
</script>
