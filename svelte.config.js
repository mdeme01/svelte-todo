import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],

	kit: {
		adapter: adapter(),
		alias: {
			'@components/*': './src/components/*',
			'@stores/*': './src/stores/*',
			'@i18n/*': './src/i18n/*'
		}
	}
};

export default config;
