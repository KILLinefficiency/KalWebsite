<script>
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();
    let theme = $state("light");
</script>

<style>
    :global(body) {
        margin: 0px;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="/src/lib/themes/{theme}.css" />
</svelte:head>

<Navbar />

{@render children()}