<script>
	import { initLocalization } from '@i18n/i18n';
	import { Spinner } from 'flowbite-svelte';
	import '../app.postcss';

	const setup = async () => {
		return await Promise.allSettled([initLocalization]);
	};

	const setupResult = setup();
</script>

{#await setupResult}
	<div class="loading">
		<Spinner />
	</div>
{:then}
	<slot />
{/await}
