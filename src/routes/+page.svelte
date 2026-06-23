<script>
    import { base } from "$app/paths";
    import Code from "$lib/components/Code.svelte";

    let current = 1;
    let total = 4;
    function setNext() {
        if(current === total) current = 1;
        else current++;
    }
</script>

<style>
    .main {
        height: 90vh;
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }
    .title {
        font-size: 250px;
        margin: 0px;
    }
    .line {
        font-size: 50px;
    }

    .box {
        display: flex;
        flex-direction: row;
        gap: 10%;
        margin-top: 30px;
        margin-bottom: 100px;
        height: 90vh;
    }

    .box-no-gap {
        gap: 0%;
    }

    .points {
        font-size: 22.5px;
        width: 500px;
    }

    .points li {
        margin: 20px;
    }

    .hpoints {
        font-size: 22.5px;
        width: 540px;
    }

    .hpoints li {
        margin: 20px;
    }

    .docs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .docs a {
        font-size: 100px;
    }

    .heading {
        font-size: 50px;
        padding: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .heading p {
        margin: 0px;
        font-weight: bold;
    }

    .stack {
        display: flex;
        flex-direction: column;
    }

    .hstack {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .code {
        padding: 0px;
    }

    .scroll {
        position: fixed;
        bottom: 25px;
        right: 50px;
        font-size: 20px;
        padding: 12px 24px;
        border-radius: 40px;
    }
    .scroll a {
        text-decoration: none;
        color: var(--fg);
    }
    .scroll a:hover {
        font-weight: bold;
        color: var(--green);
    }

    @media screen and (max-width: 1000px) {
        .main {
            width: 100vw;
            height: 85vh;
        }
        .title {
            font-size: 100px;
        }
        .line {
            font-size: 20px;
        }
        .code {
            display: none;
        }
        .points, .hpoints {
            width: 100vw;
            font-size: 14px;
        }
        .docs a {
            font-size: 35px;
        }
    }
</style>

<svelte:head>
    <title>Home | Kal</title>
</svelte:head>

<p class = "scroll">
    <a href={"#" + String(current)} onclick={setNext}>
        Scroll
    </a>
</p>

<div class = "main">
    <p class = "title">Kal</p>
    <p class = "line">A general purpose programming language!</p>
</div>

<div id = "2" class = "container">
    <div class = "heading">
        <p>Features</p>

        <div class = "box">
            <div class = "points">
                <ul>
                    <li>
                        <strong>Lightweight:</strong> Fast with extremely low memory usage. Kal takes care of garbage collection.
                    </li>
                    <li>
                        <strong>Dynamic:</strong> No boundaries on types. Reassign a variable to a value of a completely different type.
                    </li>
                    <li>
                        <strong>Procedural:</strong> Abstract your code into reusable functions and split them across files.
                    </li>
                    <li>
                        <strong>Batteries Included:</strong> There is no separate standard library. All features are interpreter intrinsic.
                    </li>
                    <li>
                        <strong>Package Management:</strong> Manage third party / reusable packages centrally and share them across projects.
                    </li>
                    <li>
                        <strong>Embeddable:</strong> Embed Kal into existing C++, Python and JavaScript applications seamlessly via official bindings.
                    </li>
                    <li>
                        <strong>Independent: </strong> Kal is written completely from ground up without utilizing any third party library.
                    </li>
                </ul>
            </div>

            <div class = "code">
                <Code
                    lang="kal"
                    code={[
                        "fn sort -> data {",
                        "    var i = 0.\n",
                        "    loop i < $(len data) {",
                        "        var j = i.\n",
                        "        loop j < $(len data) {",
                        "            if data[i] > data[j] {",
                        "                var [data[i], data[j]]",
                        "                    = [data[j], data[i]].",
                        "            }",
                        "            j = j + 1.",
                        "        }\n",
                        "        i = i + 1.",
                        "    }\n",
                        "    <- data.",
                        "}\n",
                        ":sort [3, 1, 5, 4, 2] -> sorted.",
                        "stdout \"Sorted: \" sorted \"\\n\"."
                    ]}
                    output={"Sorted: [1, 2, 3, 4, 5]"}
                />
            </div>
        </div>
    </div>
</div>

<div id = "3" class = "container">
    <div class = "heading">
        <p>Embeddable</p>

        <div class = "box box-no-gap">

            <div class = "stack">
                <div class = "hstack">
            <div class = "hpoints">
                <ul>
                    <li>Kal is not just an interpreter. It is possible to embed Kal into other languages. With seamless integration, Kal can enhance the host language.</li>
                    <li>Embeddable Kal allows passing values bi-directionally, to and from the host language.</li>
                    <li>During installation, Kal compiles into static and dynamic object files that link with the host program.</li>
                    <li>Kal can be embedded in C++, Python and JavaScript programs.</li>
                </ul>
            </div>
                    <div class = "code">
                        <Code
                            lang="cpp"
                            code={[
                                "#include <kal>\n",
                                "int main(int argc, const char** argv) {",
                                "    Kal kal = Kal();",
                                "    kal.exec(R\"(stdout \"Hello World\\n\".)\");",
                                "    return 0;",
                                "}"
                            ]}
                        />
                    </div>
                </div>

                <div class = "hstack">
                <div class = "code">
                    <Code
                        lang="py"
                        code={[
                            "from pykal import Kal\n",
                            "kal = Kal()",
                            "kal.exec('stdout \"Hello PyKal\\n\".')"
                        ]}
                    />
                </div>

                <div class = "code">
                    <Code
                        lang="js"
                        code={[
                            "import Kal from 'jskal';",
                            "const kal = new Kal();",
                            "kal.exec('stdout \"Hello JSKal\\n\".');",
                            "kal.close();"
                        ]}
                    />
                </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id = "4" class = "container">
    <div class = "docs">
        <a href="{base}/docs">Dive into action!</a>
    </div>
</div>