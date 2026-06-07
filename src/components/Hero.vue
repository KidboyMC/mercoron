<template>
	<section
		class="container mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center gap-12 relative"
	>
		<div
			class="absolute top-10 right-20 w-8 h-8 bg-orange-200 rounded-full blur-sm opacity-50"
		></div>
		<div
			class="absolute bottom-10 left-10 w-12 h-12 bg-yellow-200 rounded-full blur-md opacity-40"
		></div>

		<div class="w-full md:w-1/2 relative z-10">
			<h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
				Bikin Harimu Makin <span class="text-orange-500">Renyah</span> &
				Manis!
			</h1>
			<p class="text-[#6B5A4E] mb-8 text-lg max-w-md leading-relaxed">
				Nikmati perpaduan seru makaroni pedas gurih dan roti goreng
				empuk lumer. Mood booster andalan buat nemenin nugas atau
				nongkrong!
			</p>
			<div class="flex items-center space-x-4">
				<button
					@click="router.push('/products')"
					class="bg-[#3A2A20] text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition shadow-lg flex items-center"
				>
					Pesan Sekarang
					<span
						class="ml-2 bg-orange-500 w-2 h-2 rounded-full"
					></span>
				</button>
			</div>
		</div>

		<div class="w-full md:w-1/2 relative flex justify-center">
			<div
				class="w-72 h-72 md:w-96 md:h-96 bg-[#4A3B32] rounded-full flex items-center justify-center relative shadow-2xl"
			>
				<div
					class="w-[90%] h-[90%] rounded-full border-8 border-white shadow-inner overflow-hidden"
				>
					<img
						src="/img/makaroni-balado.png"
						alt="Hero Product"
						class="w-full h-full object-cover scale-125"
					/>
				</div>

				<div
					class="absolute -top-4 left-4 bg-white px-4 py-2 rounded-full shadow-md font-bold text-sm flex items-center"
				>
					Makaroni Balado
				</div>
				<div
					class="absolute top-10 -right-6 bg-white px-3 py-1 rounded-full shadow-md font-bold text-sm flex items-center text-yellow-500"
				>
					Best Seller
				</div>
				<div
					class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-md font-bold text-orange-500"
				>
					5K
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
