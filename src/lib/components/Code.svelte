<script>
    let {
        code,
        lang = "kal",
        caption = null,
        output = null
    } = $props();

    let copyLabel = $state("Copy");
    let outputLabel = $state("Show");
    let outputDisplay = $state(false);

    const keywords = [/var/g, /stdout/g, /fn/g, /loop/g, /\sin\s/g, /if/g, /static/g];
    const preproc = /^@.+/g;
    const string = /\".*?\"/g;
    const comments = [/;[\w\d\s]+;/, /;;.*/];
    const fn = /(?<!pkg):[a-zA-Z0-9_]+/g;

    const bashCommands = [/(?<=\$\s)sudo/g, /(?<=\$\s)git/g, /(?<=\$\s)mkdir/g, /(?<=\$\s)export/g, /(?<=\$\s)echo/g, /(?<=\$\s)cd/g, /(?<=\$\s)kal/g];
    const flag = /-[-a-zA-z0-9=]+/g;
    const exec = /\.\/[\w\.]+/g;
    const sigil = /^\$/g;
    const bashStrings = [/\".*?\"/g, /\'.*?\'/g];

    function toggleOutput() {
        outputDisplay = !outputDisplay;
        outputLabel = (outputLabel === "Show") ? "Hide" : "Show";
    }

    async function copy() {
        await navigator.clipboard.writeText(code.join("\n"));
        copyLabel = "Copied";
        setTimeout(() => {
            copyLabel = "Copy";
        }, 2000);
    }

    function highlight(lines, lang) {
        let highlightedCode = [];

        for(let line of lines) {
            if(lang === "kal") {
                keywords.forEach((keyword) => {
                    line = line.replace(keyword, `<span style='color: var(--red)'>${(line.match(keyword) ?? [""])[0]}</span>`)
                });

                line = line.replace(fn, `<span style='color: var(--yellow)'>${line.match(fn)}</span>`);

                line = line.replace(preproc, `<span style='color: var(--blue)'>${line.match(preproc)}</span>`);

                comments.forEach((comment) => {
                    line = line.replace(comment, `<span style='color: var(--gray)'>${line.match(comment)}</span>`);
                });

                const strings = line.match(string);
                if(strings != null) {
                    strings.forEach((string) => {
                        line = line.replace(string, `<span style='color: var(--green)'>${string}</span>`);
                    });
                }
            }
            else if(lang === "bash") {
                line = line.replace(flag, `<span style='color: var(--blue)'>${line.match(flag)}</span>`);
                // bashStrings.forEach((string) => {
                //     line = line.replace(string, `<span style='color: var(--green)'>${line.match(string)}</span>`);
                // });

                line = line.replace(exec, `<span style='color: var(--yellow)'>${line.match(exec)}</span>`);
                bashCommands.forEach((command) => {
                    line = line.replace(command, `<span style='color: var(--red)'>${line.match(command)}</span>`);
                });
                line = line.replace(sigil, `<span style='color: var(--red); font-weight: bold;'>${line.match(sigil)}</span>`);
            }

            highlightedCode.push(line);
        }

        let text = highlightedCode.join("\n");
        console.log(text);
        return text;
    }
</script>

<style>
    .box {
        margin: 30px 0px;
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
        max-width: 1000px;
        min-width: 500px;
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
        font-variant-ligatures: none;
        overflow-x: auto;
    }

    @media screen and (max-width: 1000px) {
        .code {
            font-size: 13px;
            max-width: 300px;
            min-width: 250px;
            scrollbar-width: none;
        }
        .first, .second, .third {
            height: 13px;
            width: 13px;
        }
        .decoration {
            gap: 7px;
        }
        .copy, .output-button {
            font-size: 12px;
        }
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

        <pre>{@html highlight(code, lang)}</pre>

        {#if outputDisplay}
            <div class = "output">
                {@html output.replace(/\n/g, "<br />")}
            </div>
        {/if}
    </div>

    {#if caption}
        <p>{caption}</p>
    {/if}
</div>