<script>
    let {
            title = "Title",
            desc = null,
            previous = null,
            next = null,
            children
    } = $props();
</script>

<style>
    .title {
        font-size: 40px;
    }
    .desc {
        font-size: 30px;
    }
    .title, .desc {
        text-align: center;
        margin-bottom: 0px;
    }
    .body {
        padding: 30px 40px;
        font-size: 22.5px;
    }
    .nav {
        display: flex;
        justify-content: center;
        gap: 10%;
        padding-bottom: 30px;
        /*justify-content: space-between;
        padding-left: 40px;
        padding-right: 40px;*/
    }
    a {
        font-size: 20px;
        font-weight: bold;
        color: var(--blue);
        text-decoration: none;
    }
</style>

<div>
    <h1 class = "title">{title}</h1>

    {#if desc}
        <h3 class = "desc">{desc}</h3>
    {/if}

    <div class = "body">
        {@render children()}
    </div>

    <div class = "nav">
        {#if previous}
            <a href = {previous}>Previous</a>
        {/if}

        {#if next}
            <a href = {next}>Next</a>
        {/if}
    </div>
</div>