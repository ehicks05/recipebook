import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		host: '0.0.0.0',
	},
	plugins: [devtools(), nitro(), tailwindcss(), tanstackStart(), viteReact()],
	build: {
		// FOUC: https://github.com/TanStack/router/issues/5812#issuecomment-5853883254
		rollupOptions: {
			output: {
				assetFileNames: (info) =>
					info.names.some((n) => n.endsWith('.css'))
						? 'assets/[name][extname]'
						: 'assets/[name]-[hash][extname]',
			},
		},
	},
});

export default config;
