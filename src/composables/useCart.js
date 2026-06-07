import { ref, computed, watch } from 'vue';

// Global state (placed outside the function so that the state is the same in all components)
const cart = ref([]);
const isCartOpen = ref(false);
const isBumping = ref(false);

export function useCart() {
	// Load data from local storage
	if (cart.value.length === 0 && localStorage.getItem('mercoron_cart')) {
		cart.value = JSON.parse(localStorage.getItem('mercoron_cart'));
	}

	// Autosave to local storage whenever there is a change
	watch(
		cart,
		(newCart) => {
			localStorage.setItem('mercoron_cart', JSON.stringify(newCart));
		},
		{ deep: true },
	);

	const cartCount = computed(() => {
		return cart.value.reduce((total, item) => total + item.qty, 0);
	});

	const cartTotal = computed(() => {
		return cart.value.reduce(
			(total, item) => total + item.price * item.qty,
			0,
		);
	});

	const addToCart = (product) => {
		// Create unique ID, if there are sizes, append ID and Size
		const cartId = product.selectedSize
			? `${product.id}-${product.selectedSize}`
			: product.id;

		const existingItem = cart.value.find((item) => item.cartId === cartId);
		if (existingItem) {
			existingItem.qty++;
		} else {
			// Save cartId into item
			cart.value.push({ ...product, cartId: cartId, qty: 1 });
		}

		isBumping.value = true;
		setTimeout(() => {
			isBumping.value = false;
		}, 300);
	};

	const removeFromCart = (cartId) => {
		cart.value = cart.value.filter((item) => item.cartId !== cartId);
	};

	const updateQty = (cartId, amount) => {
		const item = cart.value.find((item) => item.cartId === cartId);
		if (item) {
			item.qty += amount;
			if (item.qty <= 0) removeFromCart(cartId);
		}
	};

	const checkoutToWhatsApp = (customerData) => {
		const countryCode = '62';
		const operator = '812';
		const number = '82313953';
		const adminPhone = `${countryCode}${operator}${number}`;
		let message = `Halo Admin Mercoron! 👋\nSaya mau pesan cemilan dong:\n\n`;

		cart.value.forEach((item, index) => {
			// Size if it's available
			const sizeText = item.selectedSize ? ` (${item.selectedSize})` : '';
			message += `${index + 1}. ${item.name}${sizeText}\n   ${item.qty}x @ Rp${item.price}.000 = Rp${item.price * item.qty}.000\n`;
		});

		message += `\n*Total Pesanan: Rp${cartTotal.value}.000*\n\n`;
		message += `*Data Pemesan:*\n`;
		message += `Nama: ${customerData.name}\n`;
		message += `Lokasi / Alamat: ${customerData.address}\n`;
		if (customerData.notes) message += `Catatan: ${customerData.notes}\n`;

		message += `\nMohon info total ongkir/pembayarannya ya min. Terima kasih!`;

		// Redirect to whatsapp
		const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
		window.open(waUrl, '_blank');
	};

	return {
		cart,
		isCartOpen,
		isBumping,
		cartCount,
		cartTotal,
		addToCart,
		removeFromCart,
		updateQty,
		checkoutToWhatsApp,
	};
}
