<script>
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

    :global(html) {
        scroll-behavior: smooth;
    }

    :global(body) {
        margin: 0px;
        font-family: "Abel";
        color: var(--fg);
        background-color: var(--bg);
    }
</style>

<Navbar />

{@render children()}