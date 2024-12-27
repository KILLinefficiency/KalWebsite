<script>
    import Links from "$lib/data/links.js";

    let { children } = $props();
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 30% 60%;
        justify-content: center;
        height: 80vh;
        gap: 15px;
    }
    .panel, .content {
        /*background-color: tomato;*/
        overflow: auto;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
    }
    li {
        font-size: 25px;
        margin: 10px 0px;
    }
    a {
        text-decoration: none;
        color: var(--fg);
        font-size: 25px;
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