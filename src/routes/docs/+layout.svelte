<script>
    import Links from "$lib/data/links.js";

    let { children } = $props();
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 10% 50%;
        justify-content: center;
        height: 93vh;
        color: var(--fg);
        background-color: var(--bg);
    }
    .panel, .content {
        color: var(--fg);
    }
    .contents-title {
        display: none;
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

    @media screen and (max-width: 1000px) {
        .grid {
            grid-template-columns: 100%;
        }
        .panel {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            scrollbar-width: none;
            background-color: var(--base);
            border-radius: 10px;
            width: 90%;
            height: 200px;
            margin: 0px auto;
        }
        /* Just for now, I might need to remove this if the text length is large. */
        /*.panel ol {
            display: grid;
            grid-template-columns: auto auto;
            column-gap: 60px;
        }*/
        .contents-title {
            display: block;
            text-align: center;
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
        }
        a, li {
            font-size: 16px;
        }
    }
</style>

<div class = "container">
    <div class = "grid">
        <div class = "panel">
            <div class = "contents-title">Contents</div>
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