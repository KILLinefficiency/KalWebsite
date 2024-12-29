<script>
    import Links from "$lib/data/links.js";

    let { children } = $props();
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 10% 60%;
        justify-content: center;
        height: 93vh;
        color: var(--fg);
        background-color: var(--bg);
    }
    .panel, .content {
        color: var(--fg);
        overflow: auto;
        scrollbar-width: none;
        border-radius: 20px;
    }
    li {
        margin: 10px 0px;
    }
    a, li {
        text-decoration: none;
        font-size: 20px;
        color: var(--blue);
    }
    a:hover, li:hover {
        font-weight: bold;
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