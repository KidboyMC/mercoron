<template>
	<section class="container mx-auto px-6 py-16">
		<div class="text-center max-w-xl mx-auto mb-12">
			<h1 class="text-4xl font-extrabold mb-4 text-[#3A2A20]">
				Semua Menu <span class="text-orange-500">Mercoron!</span>
			</h1>
			<p class="text-[#6B5A4E] text-sm">
				Jelajahi semua varian makaroni pedas gurih dan roti goreng empuk
				lumer favoritmu.
			</p>
		</div>

		<div
			class="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-3xl shadow-sm border border-orange-50/50"
		>
			<div
				class="flex items-center bg-[#FCF8F4] px-4 py-2.5 rounded-2xl border border-orange-100 w-full md:w-72"
			>
				<svg
					class="w-5 h-5 text-gray-400 shrink-0"
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
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Cari cemilan..."
					class="ml-2 bg-transparent outline-none text-sm w-full text-[#3A2A20]"
				/>
			</div>

			<div
				class="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar"
			>
				<button
					v-for="category in categories"
					:key="category"
					@click="selectedCategory = category"
					:class="[
						'px-5 py-2 rounded-xl text-sm font-bold transition',
						selectedCategory === category
							? 'bg-orange-500 text-white shadow-md'
							: 'bg-[#FCF8F4] text-[#4A3B32] border border-orange-100/50',
					]"
				>
					{{ category }}
				</button>
			</div>

			<div
				class="flex items-center space-x-2 w-full md:w-auto justify-end"
			>
				<select
					v-model="sortBy"
					class="bg-[#FCF8F4] text-sm font-semibold text-[#4A3B32] px-3 py-2.5 rounded-2xl border border-orange-100 outline-none cursor-pointer"
				>
					<option value="default">Rekomendasi</option>
					<option value="price-low">Harga: Rendah ke Tinggi</option>
					<option value="price-high">Harga: Tinggi ke Rendah</option>
				</select>
			</div>
		</div>

		<div
			v-if="filteredProducts.length === 0"
			class="text-center py-20 bg-white rounded-3xl border border-dashed border-orange-200"
		>
			<p class="text-gray-400">
				Menu tidak ditemukan. Coba kata kunci lain ya!
			</p>
		</div>
		<div
			v-else
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
		>
			<ProductCard
				v-for="item in filteredProducts"
				:key="item.id"
				:item="item"
			/>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import productsData from '../data/products.json';

const route = useRoute();
const searchQuery = ref('');
const selectedCategory = ref('Semua');
const sortBy = ref('default');
const categories = ['Semua', 'Makaroni', 'Roti Goreng'];

// Input data to ref
const products = ref(productsData);

const syncSearchFromUrl = () => {
	if (route.query.q) {
		searchQuery.value = route.query.q;
	}
};

onMounted(() => {
	syncSearchFromUrl();
});

watch(
	() => route.query.q,
	(newQuery) => {
		if (newQuery !== undefined) {
			searchQuery.value = newQuery;
		}
	},
);

const filteredProducts = computed(() => {
	let result = [...products.value];
	if (selectedCategory.value !== 'Semua')
		result = result.filter((p) => p.category === selectedCategory.value);
	if (searchQuery.value.trim() !== '') {
		const query = searchQuery.value.toLowerCase();
		result = result.filter(
			(p) =>
				p.name.toLowerCase().includes(query) ||
				p.desc.toLowerCase().includes(query),
		);
	}
	if (sortBy.value === 'price-low') result.sort((a, b) => a.price - b.price);
	if (sortBy.value === 'price-high') result.sort((a, b) => b.price - a.price);
	return result;
});
</script>
