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
    }
</style>

<div class = "fence">
    {@render children()}
</div>