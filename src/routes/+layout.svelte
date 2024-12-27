<script>
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();
    let theme = $state("light");

    function switchTheme() {
        theme = (theme === "light") ? "dark" : "light";
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
    :global(html) {
        scroll-behavior: smooth;
    }
    :global(body) {
        margin: 0px;
        font-family: "Abel";
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="/src/lib/themes/{theme}.css" />
</svelte:head>

<Navbar />

{@render children()}