<script>
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

    :global(html) {
        scroll-behavior: smooth;
        scrollbar-width: none;
    }

    :global(body) {
        margin: 0px;
        color: var(--fg);
        background-color: var(--bg);
        font-family: "Abel", serif;
    }

    :global(::selection) {
        color: var(--blue);
        background-color: var(--base);
        text-decoration: underline;
    }

    :global(a) {
        font-size: 20px;
        font-weight: bold;
        color: var(--blue);
        text-decoration: none;
    }

    @media screen and (max-width: 1000px) {
        :global(a) {
            font-size: 15px;
        }
    }
</style>

<Navbar />

{@render children()}