import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	base: './',
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate', // Automatically updates without user prompt
			injectRegister: 'auto', // Automatically injects registration code
			strategies: 'generateSW', // Let Workbox generate the service worker
			includeAssets: [
				'favicon.svg',
				'robots.txt',
				'offline.html',
				'icons/web-app-manifest-192x192.png',
				'icons/web-app-manifest-512x512.png',
				'disable-workbox-logs.js',
			],
			manifest: {
				name: ' Health Care',
				short_name: 'Vhc',
				description: 'Access trusted,  doctors anytime, anywhere.',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#0f172a',
				icons: [
					{
						src: '/icons/web-app-manifest-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icons/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: '/icons/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
				],
				screenshots: [
					{
						src: '/public/vdrDesktop.png',
						sizes: '1280x800',
						type: 'image/png',
						form_factor: 'wide',
						label: 'Desktop view of  Doctor App',
					},
					{
						src: '/public/vdrMobile.png',
						sizes: '750x1334',
						type: 'image/png',
						label: 'Mobile view of  Doctor App',
					},
				],
			},
			workbox: {
				importScripts: ['disable-workbox-logs.js'],
				globDirectory: 'dev-dist',
				globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,avif}'],
				navigateFallback: '/index.html',
				navigateFallbackDenylist: [/^\/api\//, /\.jsx$/],
				skipWaiting: true,
				clientsClaim: true,
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'google-fonts-stylesheets',
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-webfonts',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
						},
					},
					{
						urlPattern: ({ request }) => request.destination === 'document',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'pages',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
							},
						},
					},
					{
						urlPattern: ({ request }) =>
							['style', 'script', 'worker'].includes(request.destination),
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'assets',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
							},
						},
					},
					{
						urlPattern: ({ url, request }) =>
							url.origin === self.location.origin &&
							request.destination === 'image',
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
							},
						},
					},
					{
						urlPattern: /\.jsx$/,
						handler: 'NetworkOnly',
					},
				],
			},
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: 'index.html',
			},
		}),
	],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.js',
	},
	server: {
		proxy: {
			'/doctorverfication': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
