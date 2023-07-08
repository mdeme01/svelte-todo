import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Themes =
	| 'default'
	| 'pink'
	| 'fuchsia'
	| 'purple'
	| 'violet'
	| 'indigo'
	| 'blue'
	| 'sky'
	| 'cyan'
	| 'teal'
	| 'emerald'
	| 'green'
	| 'lime'
	| 'yellow'
	| 'amber'
	| 'orange'
	| 'red'
	| 'stone'
	| 'neutral'
	| 'zinc'
	| 'gray'
	| 'slate';

const initialColorTheme = browser
	? localStorage.getItem('colorPalette')
		? (localStorage.getItem('colorPalette') as Themes)
		: 'default'
	: 'default';
const initialDarkTheme = browser ? localStorage.getItem('darkMode') === 'dark' : false;

export const colorTheme = writable<Themes>(initialColorTheme);
export const darkTheme = writable<boolean>(initialDarkTheme);
