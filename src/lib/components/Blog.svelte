<script>
    let {
        title,
        datePublished,
        dateUpdated,
        children
    } = $props();
</script>

<style>
    .content {
        margin: 0px auto;
        width: 50vw;
        font-size: 22.5px;
    }

    .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .top h1 {
        font-size: 40px;
    }

    .dates {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .body {
        margin-top: 50px;
    }

    @media screen and (max-width: 1000px) {
        .content {
            width: auto;
            font-size: 15px;
            margin: 10px 50px;
        }

        .dates {
            flex-direction: column;
            justify-content: flex-start;
        }

        .body {
            margin-top: 20px;
        }
    }
</style>

<div class = "content">
    <div class = "top">
        <h1>{title}</h1>

        <div class = "dates">
            <p><strong>Published:</strong> {datePublished}</p>

            {#if dateUpdated}
                <p><strong>Updated:</strong> {dateUpdated}</p>
            {/if}
        </div>
    </div>

    <div class = "body">
        {@render children()}
    </div>
</div>