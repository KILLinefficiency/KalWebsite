<script>
    let {
        word = "Tooltip Word",
        size = 3,
        children
    } = $props();

    let left = $derived.by(() => {
        switch(Number(size)) {
            case 3: return "-100%";
            case 2: return "-50%";
            case 1: return "0%";
        }
    });
</script>

<style>
    .word {
        position: relative;
        display: inline-block;
        color: var(--blue);
    }

    .tooltip {
        font-size: 20px;
        display: none;
        z-index: 1;
        position: absolute;
        border-radius: 5px;
        padding: 10px;
        color: var(--fg);
        background-color: var(--base);
        border-bottom: 5px solid var(--blue);
        bottom: 100%;
    }

    .word:hover .tooltip {
        display: block;
    }
</style>

<span class = "word">
    {word}
    <div class = "tooltip" style:width="{size * 100}px" style:left>
        {@render children()}
    </div>
</span>