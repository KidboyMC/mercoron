<template>
	<section class="container mx-auto px-6 py-16">
		<h2 class="text-3xl font-extrabold mb-8 flex items-center">
			Paling
			<span
				class="text-orange-500 ml-2 underline decoration-4 underline-offset-4"
				>Laris</span
			>
		</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			<div
				v-for="item in popularItems"
				:key="item.id"
				class="bg-white p-5 rounded-4xl shadow-sm hover:shadow-xl transition duration-300 relative group flex flex-col"
			>
				<div
					v-if="item.label"
					class="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-extrabold text-[#3A2A20] shadow-sm inline-flex items-center gap-1 border border-white/50"
				>
					<component
						v-if="item.icon"
						:is="HeroIcons[item.icon]"
						class="w-3.5 h-3.5 text-orange-500 shrink-0"
					/>
					<span class="leading-none mt-px">{{ item.label }}</span>
				</div>

				<div
					class="h-48 w-full bg-gray-100 rounded-2xl mb-4 overflow-hidden"
				>
					<img
						:src="item.image"
						:alt="item.name"
						class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
					/>
				</div>

				<div v-if="item.sizes" class="flex gap-2 mb-3">
					<button
						v-for="size in item.sizes"
						:key="size.name"
						@click="changeSize(item.id, size)"
						:class="[
							'text-[10px] font-bold px-3 py-1.5 rounded-lg border transition',
							getActiveSize(item)?.name === size.name
								? 'bg-orange-100 border-orange-500 text-orange-600'
								: 'bg-gray-50 border-gray-200 text-gray-400 hover:border-orange-300',
						]"
					>
						{{ size.name }}
					</button>
				</div>

				<div class="flex justify-between items-end mt-auto pt-2">
					<div class="flex flex-col pr-4">
						<h3 class="text-xl font-bold leading-tight mb-1">
							{{ item.name }}
						</h3>
						<span class="text-lg font-extrabold text-orange-500">
							{{
								getActiveSize(item)
									? getActiveSize(item).price
									: item.price
							}}K
						</span>
					</div>

					<button
						@click="handleAddToCart(item)"
						class="w-10 h-10 shrink-0 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 shadow-lg transition"
					>
						<component
							:is="HeroIcons.PlusIcon"
							class="w-6 h-6"
						/>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCart } from '../composables/useCart';
import productsData from '../data/products.json';
import * as HeroIcons from '@heroicons/vue/24/solid';

const { addToCart } = useCart();

// Filter popular products
const popularItems = computed(() => {
	return productsData.filter((item) => item.isPopular);
});

// State to get active size per id
const activeSizes = ref({});

const getActiveSize = (item) => {
	if (!item.sizes) return null;
	return activeSizes.value[item.id] || item.sizes[0];
};

const changeSize = (itemId, size) => {
	activeSizes.value[itemId] = size;
};

const handleAddToCart = (item) => {
	const productToAdd = { ...item };
	const size = getActiveSize(item);

	if (size) {
		productToAdd.price = size.price;
		productToAdd.selectedSize = size.name;
	}

	addToCart(productToAdd);
};
</script>
