<script>
    let { title = "Title", desc = "Description", children } = $props();
</script>

<style>
    h1, h3 {
        text-align: center;
    }
    .body {
        padding: 10px;
    }
</style>

<div>
    <h1>{title}</h1>
    <h3>{desc}</h3>
    <div class = "body">
        {@render children()}
    </div>
</div>