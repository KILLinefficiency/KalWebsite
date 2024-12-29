<script>
    let theme = $state("dark");

    function switchTheme() {
        theme = (theme === "dark") ? "light" : "dark";
    }
</script>

<style>
    .top {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .navbar {
        height: 7vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 200px;
        font-weight: bold;
    }
    .navbar a {
        font-size: 25px;
        padding: 0px 10px;
        color: var(--fg);
        text-decoration: none;
    }

    .navbar a:hover {
        animation-name: highlight;
        animation-duration: 0.25s;
        color: var(--green);
    }

    button {
        width: 60px;
        height: 40px;
        color: var(--fg);
        background-color: var(--base);
        font-size: 15px;
        padding: 10px;
        border: none;
        border-radius: 10px;
    }

    @keyframes highlight {
        from {
            color: var(--fg);
        }
        to {
            color: var(--green);
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
        <button onclick={switchTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
    </div>
</div>