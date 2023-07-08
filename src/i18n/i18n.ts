import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

register('en', () => import('./languages/en.json'));
register('de', () => import('./languages/de.json'));
register('hu', () => import('./languages/hu.json'));

export const initLocalization = init({
	fallbackLocale: 'en',
	initialLocale: browser ? localStorage.getItem('locale') ?? 'en' : 'en'
});
