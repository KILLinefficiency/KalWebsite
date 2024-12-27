<script>
    let { children } = $props();
</script>
<style>
    .grid {
        display: grid;
        grid-template-columns: 30% 60%;
        justify-content: center;
        height: 90vh;
        gap: 15px;
    }
    .panel, .content {
        /*background-color: tomato;*/
        overflow: auto;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
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
        </div>
        <div class = "content">
            {@render children()}
        </div>
    </div>
</div>