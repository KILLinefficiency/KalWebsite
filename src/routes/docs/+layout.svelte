<script>
    import Links from "$lib/data/links.js";

    let ask = $state("");
    let { children } = $props();

    async function search(query) {
        query = query.trim();
        if(query === "") return Links;

        const queryTokens = query.toLowerCase().split(" ");
        return Links.filter(data => {
            const title = data[0].toLowerCase();
            return (
                title.includes(query) ||
                //data[2].some(tag => queryTokens.includes(tag)) ||
                title.split(" ").some(tag => queryTokens.includes(tag))
            );
        });
    }
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
    .panel {
        display: flex;
        flex-direction: column;
    }
    .contents-title {
        display: none;
    }
    li {
        margin: 10px 0px;
    }
    ol {
        padding-left: 25px;
    }
    a, li {
        text-decoration: none;
        font-size: 20px;
        color: var(--blue);
    }
    a:hover, li:hover {
        font-weight: bold;
    }

    input {
        border: none;
        outline: none;
        border-left: 3px solid var(--green);
        height: 30px;
        font-size: 20px;
        margin-top: 30px;
        margin-bottom: 10px;
        padding: 7.5px 20px;
        border-radius: 5px;
        color: var(--fg);
        background-color: var(--base);
        font-family: "Abel", serif;
    }

    .search-tag {
        text-align: center;
        font-size: 20px;
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
            <input bind:value={ask} placeholder="Search for topics!" />
            {#await search(ask)}
                <p class="search-tag">Searching...</p>
            {:then results}
                {#if results.length !== 0}
                    <ol>
                        {#each results as link}
                            <li>
                                <a href={link[1]}>{link[0]}</a>
                            </li>
                        {/each}
                    </ol>
                {:else}
                    <p class="search-tag">No results found.</p>
                {/if}
            {/await}
        </div>
        <div class = "content">
            {@render children()}
        </div>
    </div>
</div>