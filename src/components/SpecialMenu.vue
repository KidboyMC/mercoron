<template>
	<section class="container mx-auto px-6 py-16">
		<h2 class="text-3xl font-extrabold mb-10">
			Menu
			<span
				class="text-orange-500 underline decoration-4 underline-offset-4"
				>Spesial</span
			>
		</h2>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="item in specialMenu"
				:key="item.id"
				class="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition relative group border border-gray-100 flex flex-col"
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
					class="h-40 w-full bg-gray-100 rounded-2xl mb-4 overflow-hidden"
				>
					<img
						:src="item.image"
						:alt="item.name"
						class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
					/>
				</div>

				<div class="flex flex-col flex-1 mb-4">
					<h3 class="font-bold text-lg leading-tight mb-1">
						{{ item.name }}
					</h3>
					<p class="text-xs text-gray-500 mb-3">{{ item.desc }}</p>

					<div v-if="item.sizes" class="flex gap-2 mt-auto">
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
				</div>

				<div
					class="flex justify-between items-center mt-auto pt-3 border-t border-gray-50"
				>
					<span class="font-extrabold text-orange-500 text-lg">
						{{
							getActiveSize(item)
								? getActiveSize(item).price
								: item.price
						}}K
					</span>
					<button
						@click="handleAddToCart(item)"
						class="w-8 h-8 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
					>
						<component :is="HeroIcons.PlusIcon" class="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCart } from '../composables/useCart';
import productsData from '../data/products.json'; // IMPORT DATA JSON
import * as HeroIcons from '@heroicons/vue/24/solid';

const { addToCart } = useCart();

// Filter special products
const specialMenu = computed(() => {
	return productsData.filter((item) => item.isSpecial);
});

// State to get active size per id
const activeSizes = ref({});

const getActiveSize = (item) => {
	if (!item.sizes) return null;
	if (!activeSizes.value[item.id]) {
		activeSizes.value[item.id] = item.sizes[0]; // Default first size
	}
	return activeSizes.value[item.id];
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
