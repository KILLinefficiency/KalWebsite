<script>
    let {
        children
    } = $props();
</script>

<style>
    .fence {
        background-color: var(--base);
        display: inline-block;
        padding: 5px 10px;
        margin: 3px 0px;
        border-radius: 10px;
        font-family: "Jetbrains Mono", serif;
        font-variant-ligatures: none;
        font-size: 18.5px;
    }

    @media screen and (max-width: 1000px) {
        .fence {
            font-size: 12px;
        }
    }
</style>

<div class = "fence">
    {@render children()}
</div>