<template>
	<div>
		<div
			v-if="isCartOpen"
			@click="isCartOpen = false"
			class="fixed inset-0 bg-black/50 z-40 transition-opacity"
		></div>

		<div
			:class="isCartOpen ? 'translate-x-0' : 'translate-x-full'"
			class="fixed top-0 right-0 h-full w-full md:w-100 bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col"
		>
			<div
				class="p-6 border-b flex justify-between items-center bg-[#FCF8F4]"
			>
				<h2 class="text-xl font-bold text-[#3A2A20]">
					Keranjang Saya ({{ cartCount }})
				</h2>
				<button
					@click="isCartOpen = false"
					class="text-gray-500 hover:text-red-500"
				>
					<component
						:is="HeroIcons.XMarkIcon"
						class="w-5 h-5 text-gray-700"
					/>
				</button>
			</div>

			<div class="flex-1 overflow-y-auto p-6 space-y-6">
				<div
					v-if="cart.length === 0"
					class="text-center text-gray-400 mt-10"
				>
					<p>Keranjang kamu masih kosong nih.</p>
					<p class="text-sm mt-2">Yuk tambah cemilan dulu!</p>
				</div>

				<div
					v-for="item in cart"
					:key="item.cartId"
					class="flex gap-4 border-b pb-4"
				>
					<img
						:src="item.image"
						class="w-20 h-20 rounded-xl object-cover"
					/>
					<div class="flex-1">
						<h4
							class="font-bold text-sm text-[#3A2A20] flex items-center"
						>
							{{ item.name }}
							<span
								v-if="item.selectedSize"
								class="text-xs text-gray-400 font-semibold ml-1.5 bg-gray-100 px-1.5 py-0.5 rounded"
							>
								{{ item.selectedSize }}
							</span>
						</h4>
						<p class="text-orange-500 font-bold text-sm mt-1">
							Rp{{ item.price }}.000
						</p>

						<div class="flex justify-between items-center mt-3">
							<div
								class="flex items-center bg-gray-100 rounded-lg"
							>
								<button
									@click="updateQty(item.cartId, -1)"
									class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-500"
								>
									-
								</button>
								<span class="w-8 text-center text-sm font-bold">
									{{ item.qty }}
								</span>
								<button
									@click="updateQty(item.cartId, 1)"
									class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-500"
								>
									+
								</button>
							</div>
							<button
								@click="removeFromCart(item.cartId)"
								class="text-xs text-red-500 hover:underline"
							>
								Hapus
							</button>
						</div>
					</div>
				</div>
			</div>

			<div v-if="cart.length > 0" class="p-6 bg-gray-50 border-t">
				<div class="space-y-3 mb-6">
					<input
						v-model="customer.name"
						type="text"
						placeholder="Nama Kamu"
						class="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-orange-500"
					/>
					<input
						v-model="customer.address"
						type="text"
						placeholder="Alamat / Tempat COD"
						class="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-orange-500"
					/>
					<textarea
						v-model="customer.notes"
						placeholder="Catatan (opsional)"
						class="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-orange-500 h-16"
					></textarea>
				</div>

				<div
					class="flex justify-between items-center mb-4 text-lg font-bold"
				>
					<span>Total:</span>
					<span class="text-orange-500">Rp{{ cartTotal }}.000</span>
				</div>

				<button
					@click="handleCheckout"
					class="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex justify-center items-center hover:bg-[#1ebd5a] transition gap-2"
				>
					<Icon
						icon="logos:whatsapp-icon"
						class="w-5 h-5 hover:scale-110 transition"
					/>
					Pesan ke WhatsApp
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useCart } from '../composables/useCart';
import * as HeroIcons from '@heroicons/vue/24/solid';
import { Icon } from '@iconify/vue';

const {
	isCartOpen,
	cart,
	cartCount,
	cartTotal,
	updateQty,
	removeFromCart,
	checkoutToWhatsApp,
} = useCart();

const customer = ref({
	name: '',
	address: '',
	notes: '',
});

const handleCheckout = () => {
	if (!customer.value.name || !customer.value.address) {
		alert('Mohon isi Nama dan Alamat terlebih dahulu ya!');
		return;
	}
	checkoutToWhatsApp(customer.value);
};
</script>
