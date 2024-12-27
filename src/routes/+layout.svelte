<script>
    import Navbar from "$lib/Navbar.svelte";

    let { children } = $props();
</script>

<style>
    :global(body) {
        margin: 0px;
    }
</style>

<Navbar />

{@render children()}