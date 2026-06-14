<script>
    import { browser } from "$app/environment";

    let storageName = "KalTheme";
    let theme = $state("dark");

    $effect(() => {
        if(browser) {
            theme = localStorage.getItem(storageName) ?? "dark";
            localStorage.setItem(storageName, theme);
        }
    });

    function switchTheme() {
        theme = (theme === "dark") ? "light" : "dark";
        if(browser) {
            localStorage.setItem(storageName, theme);
        }
    }
</script>

<style>
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0px 100px;
    }
    .navbar {
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
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
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    button {
        width: 70px;
        height: 40px;
        color: var(--fg);
        background-color: var(--base);
        font-size: 15px;
        padding: 10px;
        border: none;
        border-radius: 10px;
    }

    .trailing {
        display: flex;
        gap: 20px;
    }

    @keyframes highlight {
        from {
            color: var(--fg);
        }
        to {
            color: var(--green);
            font-size: 30px;
            padding: 0px 5px;
        }
    }

    @media screen and (max-width: 1000px) {
        .top {
            justify-content: center;
        }
        .navbar {
            height: 10vh;
            gap: 50px;
        }
        .navbar a {
            font-size: 15px;
        }
        .leading, .trailing {
            display: none;
        }
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="/{theme}.css" />
</svelte:head>

<div id = "1" class = "top">
    <div class = "navbar">
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/blog">Blog</a>
    </div>

    <div class = "leading">
    </div>

    <div class = "trailing">
        <button onclick={switchTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
        <a target="_blank" href="https://www.github.com/KILLinefficiency/Kal/">
            <button>GitHub</button>
        </a>
    </div>
</div>