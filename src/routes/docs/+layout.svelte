<script>
    let { children } = $props();
</script>
<style>
    .grid {
        display: grid;
        grid-template-columns: 30% 60%;
        justify-content: center;
        height: 90vh;
    }
    .panel {
        background-color: tomato;
        overflow: auto;
    }
    .content {
        background-color: lightgreen;
    }
</style>

<div class = "container">
    <div class = "grid">
        <div class = "panel">
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
            <h1>Panel</h1>
        </div>
        <div class = "content">
            {@render children()}
        </div>
    </div>
</div>