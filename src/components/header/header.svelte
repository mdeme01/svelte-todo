<script lang="ts">
	import Settings from '@components/settings/settings.svelte';
	import { _ } from 'svelte-i18n';
</script>

<header
	class="flex w-full items-center justify-around border-b border-primary-900 bg-slate-200 p-5 dark:bg-slate-900"
>
	<h1>{$_('title')}</h1>
	<Settings />
</header>
