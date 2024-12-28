<script>
    let { type = "info", children } = $props();
</script>

<style>
    .card {
        padding: 10px;
        margin: 25px;
        font-size: 20px;
    }
    .warn {
        color: var(--red);
        border-left: 3px solid var(--red);
    }
    .info {
        color: var(--yellow);
        border-left: 3px solid var(--yellow);
    }
</style>

<div class = {`card ${type}`}>
    {@render children()}
</div>