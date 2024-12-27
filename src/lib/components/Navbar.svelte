<style>
    .navbar {
        height: 7vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navbar a {
        text-decoration: none;
        color: var(--fg);
        margin: 4px 20px;
        font-size: 20px;
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

<div class = "navbar">
    <a href="/">Home</a>
    <a href="/docs">Docs</a>
    <a href="/blog">Blog</a>
</div>