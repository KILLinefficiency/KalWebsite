<script>
    import { base } from "$app/paths";

    let { blog, last } = $props();
</script>

<style>
    .block {
        width: 50%;
        display: grid;
        grid-template-columns: 30% 70%;
    }

    @media screen and (max-width: 1000px) {
        .block {
            width: 100%;
        }
        h1, h3 {
            font-size: 12px;
        }
    }
    .header {
        margin: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .line {
        border-left: 2px solid var(--fg);
    }
    .space {
        height: 125px;
    }
    .point {
        position: relative;
        left: -6px;
        border-radius: 10px;
        border: 2px solid var(--fg);
        height: 10px;
        width: 10px;
    }
    a {
        text-decoration: none;
        color: var(--blue);
    }
    a:hover .point {
        background-color: var(--fg);
    }
</style>

<div class = "block">
    <h3 class = "header">{blog[0]}</h3>
    <a href={`${base}${blog[3]}`}>
        <div class = "point"></div>
        <h1 class = "header line">{blog[1]}</h1>
    </a>

    <div></div>
    <div>
        <h3 class = "header space line">{blog[2]}</h3>
        {#if last}
            <div class = "point"></div>
        {/if}
    </div>
</div>