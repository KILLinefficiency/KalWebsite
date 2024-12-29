<script>
    let { type = "info", children } = $props();
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
    }
    .card {
        padding: 15px;
        margin: 25px;
        font-size: 22.5px;
    }
    .warn {
        color: var(--red);
        border-left: 5px solid var(--red);
    }
    .info {
        color: var(--yellow);
        border-left: 5px solid var(--yellow);
    }
</style>

<div class = "container">
    <div class = {`card ${type}`}>
        {@render children()}
    </div>
</div>