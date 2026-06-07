<template>
	<div
		class="bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 relative group border border-gray-50 flex flex-col justify-between"
	>
		<div>
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
				class="h-44 w-full bg-[#FCF8F4] rounded-2xl mb-4 overflow-hidden flex items-center justify-center"
			>
				<img
					:src="item.image"
					:alt="item.name"
					class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
				/>
			</div>
			<div class="flex flex-col mb-4">
				<div class="flex justify-between items-start mb-1 gap-2">
					<h3
						class="font-bold text-base text-[#3A2A20] leading-tight"
					>
						{{ item.name }}
					</h3>
					<span
						class="font-extrabold text-orange-500 text-lg whitespace-nowrap"
					>
						{{ activeSize ? activeSize.price : item.price }}K
					</span>
				</div>
				<p class="text-xs text-gray-400 line-clamp-2 min-h-8">
					{{ item.desc }}
				</p>

				<div v-if="item.sizes" class="flex gap-2 mt-3">
					<button
						v-for="size in item.sizes"
						:key="size.name"
						@click="activeSize = size"
						:class="[
							'text-[10px] font-bold px-3 py-1.5 rounded-lg border transition',
							activeSize.name === size.name
								? 'bg-orange-100 border-orange-500 text-orange-600'
								: 'bg-gray-50 border-gray-200 text-gray-400 hover:border-orange-300',
						]"
					>
						{{ size.name }}
					</button>
				</div>
			</div>
		</div>

		<div
			class="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto"
		>
			<span
				class="text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-gray-100 px-2 py-0.5 rounded-md"
			>
				{{ item.category }}
			</span>
			<button
				@click="handleAddToCart"
				class="w-9 h-9 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition shadow-sm"
			>
				<component :is="HeroIcons.PlusIcon" class="w-6 h-6" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useCart } from '../composables/useCart';
import * as HeroIcons from '@heroicons/vue/24/solid';

const { addToCart } = useCart();

const props = defineProps({
	item: { type: Object, required: true },
});

// Select first size as default
const activeSize = ref(props.item.sizes ? props.item.sizes[0] : null);

const handleAddToCart = () => {
	const productToAdd = { ...props.item };

	// If the product has sizes, change the price
	if (activeSize.value) {
		productToAdd.price = activeSize.value.price;
		productToAdd.selectedSize = activeSize.value.name;
	}

	addToCart(productToAdd);
};
</script>
