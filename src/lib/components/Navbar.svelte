<script>
    let theme = $state("dark");
    
    function switchTheme() {
        theme = (theme === "light") ? "dark" : "light";
    }
</script>

<style>
    .top {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .navbar {
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 200px;
        font-weight: bold;
    }
    .navbar a {
        text-decoration: none;
        font-size: 30px;
        color: var(--fg);
    }

    .navbar a:hover {
        animation-name: underline;
        animation-duration: 1s;
    }

    @keyframes underline {
        from {
            border-bottom: 2px solid white;
        }
        to {
            border-bottom: 4px solid red;
        }
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="/src/lib/themes/{theme}.css" />
</svelte:head>

<div class = "top">
    <div class = "leading">
    </div>

    <div class = "navbar">
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/blog">Blog</a>
    </div>

    <div class = "trailing">
        <button onclick={switchTheme}>Theme</button>
    </div>
</div>