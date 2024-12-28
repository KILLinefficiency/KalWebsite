<script>
    let theme = $state("dark");

    let themeName = $derived.by(() => {
        return theme === "light" ? "Dark" : "Light";
    });

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
        font-size: 30px;
        padding: 0px 10px;
        color: var(--fg);
        text-decoration: none;
    }

    .navbar a:hover {
        animation-name: underline;
        animation-duration: 0.5s;
        border-bottom: 4px solid var(--green);
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

    @keyframes underline {
        from {
            border-bottom: 1px solid var(--bg);
        }
        to {
            border-bottom: 4px solid var(--green);
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
        <button onclick={switchTheme}>{themeName}</button>
    </div>
</div>