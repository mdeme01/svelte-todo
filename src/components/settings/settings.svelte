<script lang="ts">
	import { browser } from '$app/environment';
	import { colorTheme, darkTheme } from '@stores/theme-store';
	import { Button, Dropdown, DropdownDivider, Label, Select, Toggle } from 'flowbite-svelte';
	import { _, locale } from 'svelte-i18n';

	$: colorOptions = [
		{ value: 'default', name: $_('colorDefault') },
		{ value: 'pink', name: $_('colorPink') },
		{ value: 'fuchsia', name: $_('colorFuchsia') },
		{ value: 'purple', name: $_('colorPurple') },
		{ value: 'violet', name: $_('colorViolet') },
		{ value: 'indigo', name: $_('colorIndigo') },
		{ value: 'blue', name: $_('colorBlue') },
		{ value: 'sky', name: $_('colorSky') },
		{ value: 'cyan', name: $_('colorCyan') },
		{ value: 'teal', name: $_('colorTeal') },
		{ value: 'emerald', name: $_('colorEmerald') },
		{ value: 'green', name: $_('colorGreen') },
		{ value: 'lime', name: $_('colorLime') },
		{ value: 'yellow', name: $_('colorYellow') },
		{ value: 'amber', name: $_('colorAmber') },
		{ value: 'orange', name: $_('colorOrange') },
		{ value: 'red', name: $_('colorRed') },
		{ value: 'stone', name: $_('colorStone') },
		{ value: 'neutral', name: $_('colorNeutral') },
		{ value: 'zinc', name: $_('colorZinc') },
		{ value: 'gray', name: $_('colorGray') },
		{ value: 'slate', name: $_('colorSlate') }
	];

	$: localeOptions = [
		{ value: 'en', name: $_('langEn') },
		{ value: 'de', name: $_('langDe') },
		{ value: 'hu', name: $_('langHu') }
	];

	const toggleTheme = () => ($darkTheme = !$darkTheme);

	$: if (browser) {
		document.documentElement.removeAttribute('class');
		document.documentElement.classList.toggle('dark', $darkTheme);
		document.documentElement.classList.add(`theme-${$colorTheme}`);
		localStorage.setItem('colorPalette', $colorTheme);
		localStorage.setItem('darkMode', $darkTheme ? 'dark' : 'light');
		localStorage.setItem('locale', $locale as string);
	}
</script>

<Button outline>{$_('settingsBtnText')}</Button>
<Dropdown ulClass="p-5 bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200">
	<Toggle name="darkMode" checked={$darkTheme} on:change={toggleTheme}>{$_('darkMode')}</Toggle>
	<DropdownDivider class="mb-5 mt-5" />
	<Label class="mb-3" for="colorOptions">{$_('settingsColorText')}</Label>
	<Select
		class="bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200"
		items={colorOptions}
		bind:value={$colorTheme}
		id="colorOptions"
		name="colorOptions"
		placeholder=""
	/>
	<DropdownDivider class="mb-5 mt-5" />
	<Label class="mb-3" for="localeOptions">{$_('settingsLangText')}</Label>
	<Select
		class="bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200"
		items={localeOptions}
		bind:value={$locale}
		id="localeOptions"
		name="localeOptions"
		placeholder=""
	/>
</Dropdown>
