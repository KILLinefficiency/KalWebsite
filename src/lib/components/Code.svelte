<script>
    let {
        code,
        caption = null
    } = $props();

    function highlight(text) {
        return text;
    }
</script>

<style>
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .code {
        padding: 20px;
        background-color: var(--base);
        border-radius: 10px;
        font-size: 20px;
        width: 400px;
    }

    .top-bar {
        display: flex;
        justify-content: start;
        gap: 10px;
    }

    .first, .second, .third {
        height: 16px;
        width: 16px;
        border-radius: 10px;
        margin-bottom: 15px;
        
    }

    .first {
        background-color: #FF605B;
    }

    .second {
        background-color: #FFBD2B;
    }

    .third {
        background-color: #28C740;
    }

    pre {
        margin: 0px;
    }
</style>

<div class = "box">
    <div class = "code">
        <div class = "top-bar">
            <div class = "first"></div>
            <div class = "second"></div>
            <div class = "third"></div>
        </div>

        <pre>{@html highlight(code)}</pre>
    </div>

    {#if caption}
        <p>{caption}</p>
    {/if}
</div>