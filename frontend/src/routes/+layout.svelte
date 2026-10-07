<script>
	import favicon from '#lib/assets/favicon.svg';
	/* importación del toast */
	import {Toaster} from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<Toaster/>

{@render children()}
