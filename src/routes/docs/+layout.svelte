<script>
    import Links from "$lib/data/links.js";

    let { children } = $props();
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 30% 60%;
        justify-content: center;
        height: 85vh;
        gap: 15px;
        color: var(--fg);
        background-color: var(--bg);
    }
    .panel, .content {
        color: var(--fg);
        overflow: auto;
        scrollbar-width: none;
        background-color: var(--base);
        border-radius: 20px;
    }
    li {
        font-size: 25px;
        margin: 10px 0px;
    }
    a {
        text-decoration: none;
        font-size: 25px;
        color: var(--fg);
    }
    a:hover, li:hover {
        font-weight: bold;
        color: var(--green);
    }
</style>

<div class = "container">
    <div class = "grid">
        <div class = "panel">
            <ol>
            {#each Links as link}
                <li>
                    <a href={link[1]}>{link[0]}</a>
                </li>
            {/each}
            </ol>
        </div>
        <div class = "content">
            {@render children()}
        </div>
    </div>
</div>