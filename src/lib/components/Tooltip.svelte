<script>
    let { word = "Tooltip Word", width = "300px", children } = $props();

    let left = $derived.by(() => {
        switch(width) {
            case "300px":
                return "-100%";
            case "200px":
                return "-50%";
            case "100px":
                return "0%";
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
        /*left: -100%;*/
    }

    .word:hover .tooltip {
        display: block;
    }
</style>

<span class = "word">
    {word}
    <div class = "tooltip" style:width style:left>{@render children()}</div>
</span>