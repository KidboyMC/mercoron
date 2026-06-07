<template>
	<section id="contact" class="container mx-auto px-6 pb-12 mt-20">
		<div
			class="bg-[#2A1E17] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10"
		>
			<div
				class="absolute -top-32 -right-32 w-96 h-96 bg-orange-500 rounded-full blur-[100px] opacity-20"
			></div>
			<div
				class="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-10"
			></div>

			<div class="relative z-10 w-full md:w-1/2 text-left">
				<span
					class="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block"
				>
					Pesan Sekarang
				</span>
				<h2
					class="text-4xl font-extrabold text-white mb-4 leading-tight"
				>
					Laper? Mager? <br />
					<span class="text-orange-400">Tinggal Klik Aja!</span>
				</h2>
				<p class="text-gray-300 text-sm mb-8 leading-relaxed max-w-md">
					Pesan satuan buat ngemil sendiri atau borongan buat acara
					kampus & nongkrong. Chat langsung ke admin kami untuk
					pemesanan.
				</p>

				<div class="flex flex-col sm:flex-row">
					<a
						:href="`https://wa.me/${adminPhone}?text=Halo%20Admin%20Mercoron!%20Saya%20mau%20tanya-tanya%20pesanan%20dong.`"
						target="_blank"
						class="bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#1ebd5a] gap-2 transition flex items-center justify-center shadow-lg shadow-green-900/50"
					>
						<Icon
							icon="logos:whatsapp-icon"
							class="w-4 h-4 hover:scale-110 transition"
						/>
						Chat Admin WA
					</a>
				</div>
			</div>

			<div
				class="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end"
			>
				<img
					src="/img/mercoron-logo.png"
					alt="Packaging"
					class="rounded-2xl w-[50%] h-auto transform rotate-10 hover:rotate-0 transition duration-500 shadow-2xl"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { Icon } from '@iconify/vue';
const countryCode = '62';
const operator = '812';
const number = '82313953';
const adminPhone = `${countryCode}${operator}${number}`;
</script>
