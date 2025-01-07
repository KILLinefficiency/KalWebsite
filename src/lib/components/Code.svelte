<script>
    let {
        code,
        caption = null,
        output = null
    } = $props();

    let copyLabel = $state("Copy");
    let outputLabel = $state("Show");
    let outputDisplay = $state("none");

    const keywords = [/stdout/g];
    const string = /\".*\"/;
    const comments = [/;[\w\d\s]+;/, /;;.*/];

    function toggleOutput() {
        outputDisplay = (outputDisplay === "none") ? "block" : "none";
        outputLabel = (outputLabel === "Show") ? "Hide" : "Show";
    }

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
    }

    .decoration {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
    }

    .buttons {
        display: flex;
        justify-content: end;
        gap: 10px;
    }

    .copy, .output-button {
        border: none;
        color: var(--fg);
        background-color: var(--surface);
        border-radius: 5px;
        font-family: "Abel", serif;
        font-weight: bold;
        width: 60px;
        font-size: 14px;
        padding: 3px;
    }

    .output-button {
        width: 90px;
    }

    .output {
        font-family: "JetBrains Mono", serif;
        background-color: var(--surface);
        margin-top: 20px;
        border-radius: 10px;
        padding: 10px;
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
        margin-bottom: 10px;
        font-family: "JetBrains Mono", serif;
    }

    /*hr {
        margin: 15px 0px;
        border: 1px solid var(--gray);
    }*/
</style>

<div class = "box">
    <div class = "code">
        <div class = "top">
            <div class = "decoration">
                <div class = "first"></div>
                <div class = "second"></div>
                <div class = "third"></div>
            </div>
            <div class = "buttons">
                <button class = "copy" onclick={copy}>
                    {copyLabel}
                </button>
                {#if output}
                    <button class = "output-button" onclick={toggleOutput}>
                        {outputLabel} Output
                    </button>
                {/if}
            </div>
        </div>

        <pre>{@html highlight(code)}</pre>

        <div class = "output" style:display={outputDisplay}>
            <!-- <hr /> -->
            {output}
        </div>
    </div>

    {#if caption}
        <p>{caption}</p>
    {/if}
</div>