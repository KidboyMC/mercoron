import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AllProductsView from '../views/AllProductsView.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/products',
		name: 'products',
		component: AllProductsView,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth',
			};
		}
		return { top: 0 };
	},
});

export default router;
