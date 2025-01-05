<script>
    let {
        code,
        caption = null
    } = $props();

    let copyLabel = $state("Copy");

    const keywords = [/stdout/g];
    const string = /\".*\"/;
    const comments = [/;[\w\d\s]+;/, /;;.*/];

    async function copy() {
        await navigator.clipboard.writeText(code);
        copyLabel = "Copied";
        setTimeout(() => {
            copyLabel = "Copy";
        }, 2000);
    }

    function highlight(text) {
        for(let keyword of keywords) {
            text = text.replace(keyword, `<span style='color: var(--red)'>${(text.match(keyword) ?? [""])[0]}</span>`);
        }

        for(let comment of comments) {
            text = text.replace(comment, `<span style='color: var(--gray)'>${text.match(comment)}</span>`);
        }

        text = text.replace(string, `<span style='color: var(--green)'>${text.match(string)}</span>`);

        console.log(text);
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
        color: var(--fg);
        border-radius: 10px;
        font-size: 20px;
        max-width: 500px;
    }

    .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .decoration {
        display: flex;
        justify-content: start;
        gap: 10px;
    }

    .copy {
        border: none;
        color: var(--fg);
        background-color: var(--base);
        font-family: "Abel", serif;
        font-weight: bold;
        width: 50px;
        font-size: 14px;
    }

    .first, .second, .third {
        height: 16px;
        width: 16px;
        border-radius: 10px;
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
        font-family: "JetBrains Mono", serif;
    }
</style>

<div class = "box">
    <div class = "code">
        <div class = "top">
            <div class = "decoration">
                <div class = "first"></div>
                <div class = "second"></div>
                <div class = "third"></div>
            </div>
            <button class = "copy" onclick={copy}>
                {copyLabel}
            </button>
        </div>

        <pre>{@html highlight(code)}</pre>
    </div>

    {#if caption}
        <p>{caption}</p>
    {/if}
</div>